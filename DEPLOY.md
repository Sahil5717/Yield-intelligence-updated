# Deploying Yield Intelligence to Railway

End-to-end guide for getting the backend and frontend live on Railway.
You need: a Railway account, the `railway` CLI installed (`npm i -g @railway/cli`), and about 30 minutes.

## Architecture

Two separate Railway services from one repo:

```
┌──────────────────────────┐         ┌──────────────────────────┐
│  Frontend service        │  HTTPS  │  Backend service         │
│  Docker: node → nginx    │ ──────► │  Docker: python:3.12     │
│  Serves static SPA on    │         │  FastAPI on $PORT        │
│  $PORT                   │         │  SQLite on /data volume  │
│                          │         │                          │
│  VITE_API_BASE_URL       │         │  JWT_SECRET              │
│  (build arg, baked in)   │         │  CORS_ORIGINS            │
└──────────────────────────┘         └──────────────────────────┘
```

Key things to know before you start:

- `VITE_API_BASE_URL` is a **build-time** arg, not runtime. If you change the backend URL later, the frontend must be redeployed.
- SQLite is mounted on a Railway volume at `/data`. The DB survives deploys but not account resets.
- CORS is locked to the exact frontend origin. If it doesn't match, browsers will silently block requests.
- Demo users are seeded automatically on first boot (`ey.partner`, `ey.analyst`, `client.cmo`, `client.analyst` — all password `demo1234`).

---

## Step 1 — Create the backend service

From the `backend/` directory:

```bash
cd backend
railway login
railway init                    # create a new project, name it "yi-backend"
railway link                    # link to the project you just created
```

### Set required env vars

```bash
# JWT_SECRET: strong random 32-byte hex
railway variables set JWT_SECRET="$(openssl rand -hex 32)"

# Production marker — enables the "refuse to boot with dev secret" guard
railway variables set YI_ENV=production

# CORS_ORIGINS: leave blank for now. We'll set it in Step 3 after we know
# the frontend URL. Until then the backend allows only localhost:5173,
# which means the deployed frontend can't reach it yet — that's fine,
# we'll fix it in a moment.
```

### Attach a persistent volume

In the Railway dashboard for this service:

1. **Settings → Volumes → + New Volume**
2. Mount path: `/data`
3. Size: 1 GB (plenty for SQLite; you can grow later)

Or via CLI if you prefer:
```bash
railway volume create --name yi-data --mount-path /data
```

### Deploy

```bash
railway up
```

Wait for the build to finish (~2 minutes for core deps). Then:

```bash
railway domain          # generates a public HTTPS URL, e.g. https://yi-backend.up.railway.app
```

**Verify** by hitting the health endpoint in your browser or via curl:
```bash
curl https://<your-backend>.up.railway.app/api/health
```
Expected: `{"status":"ready","data_loaded":false,...}`

---

## Step 2 — Create the frontend service

Open a new terminal. From the `frontend/` directory:

```bash
cd frontend
railway init                    # same Railway account — new project "yi-frontend"
railway link
```

### Set the backend URL as a build variable

This is the critical one. The URL must point at the backend service you just deployed:

```bash
railway variables set VITE_API_BASE_URL="https://<your-backend>.up.railway.app"
```

### Deploy

```bash
railway up
railway domain          # generates e.g. https://yi-frontend.up.railway.app
```

Wait for the build (~1 minute). The Dockerfile passes `VITE_API_BASE_URL` as a build arg so the URL gets baked into the JS bundle.

---

## Step 3 — Close the CORS loop

Now go back to the backend project and set the real frontend origin:

```bash
cd ../backend
railway variables set CORS_ORIGINS="https://<your-frontend>.up.railway.app"
# Trigger a redeploy so the new env var takes effect
railway redeploy
```

If you have multiple frontend environments (staging, production, etc.), comma-separate:
```bash
railway variables set CORS_ORIGINS="https://yi-frontend.up.railway.app,https://yi-staging.up.railway.app"
```

---

## Step 4 — Verify end-to-end

1. Open `https://<your-frontend>.up.railway.app` in a browser
2. You'll be redirected to `/login`
3. Click any demo-user row to prefill (e.g. `ey.partner`)
4. Click **Sign in**
5. You should land on the Executive Summary page

If it works: you're live. If it doesn't: see Troubleshooting below.

---

## Step 5 — Load real mock data (optional but recommended)

The Executive Summary renders empty-state JSON until someone loads data. Signed in as an editor:

```bash
# From any machine with curl
TOKEN=$(curl -s -X POST https://<your-backend>.up.railway.app/api/auth/login-v2 \
  -H "Content-Type: application/json" \
  -d '{"username":"ey.partner","password":"demo1234"}' \
  | python -c "import sys,json;print(json.load(sys.stdin)['token'])")

curl -X POST -H "Authorization: Bearer $TOKEN" \
  https://<your-backend>.up.railway.app/api/load-mock-data

curl -X POST -H "Authorization: Bearer $TOKEN" \
  https://<your-backend>.up.railway.app/api/run-analysis
```

Reload the frontend. The KPIs, pillars, and opportunities should now show real numbers.

**Important gotcha:** state is in-process memory on the backend. If Railway restarts the container (which it will — deploys, crashes, scaling), you need to re-run `/api/load-mock-data`. The SQLite volume persists *user accounts and saved scenarios* but not the loaded analysis state. This is the `_read_state()` multi-tenancy issue you already know about, and it's the #1 thing worth fixing after launch.

---

## Environment variable reference

### Backend

| Variable | Required | Example | Notes |
|---|---|---|---|
| `JWT_SECRET` | **yes** | `openssl rand -hex 32` | Refuses to boot with default in production |
| `CORS_ORIGINS` | **yes** | `https://yi-frontend.up.railway.app` | Comma-separated, exact-match |
| `YI_ENV` | recommended | `production` | Enables JWT secret guard |
| `YIELD_DB_PATH` | no | `/data/yield_intelligence.db` | Dockerfile defaults to this |
| `PORT` | auto | injected by Railway | Don't set manually |
| `RAILWAY_ENVIRONMENT` | auto | injected by Railway | Triggers JWT guard too |

### Frontend

| Variable | Required | Example | Notes |
|---|---|---|---|
| `VITE_API_BASE_URL` | **yes** | `https://yi-backend.up.railway.app` | Build-time only; redeploy to change |
| `PORT` | auto | injected by Railway | Nginx listens on this |

---

## Troubleshooting

### "CORS error" in browser console

The exact origin in `CORS_ORIGINS` must match the frontend URL including the protocol and with no trailing slash. Common mistakes:
- Set `http://` instead of `https://`
- Trailing slash (`https://yi-frontend.up.railway.app/`)
- Different subdomain (Railway gives you `*.up.railway.app`; if you attached a custom domain, you need both)

Check the actual origin in DevTools → Network → any failed request → Request Headers → `Origin:`. Paste that value verbatim into `CORS_ORIGINS`.

### Frontend shows "Network error: could not reach..."

`VITE_API_BASE_URL` was wrong at build time. Verify by opening the deployed frontend, viewing page source, searching for your backend URL — it should appear in the JS bundle. If it doesn't, `railway variables set VITE_API_BASE_URL=...` and `railway redeploy` on the frontend service.

### Backend healthcheck fails / container restarts in a loop

Check Railway logs. The two most common causes:
1. **JWT guard triggered** — means `JWT_SECRET` wasn't set. `railway variables set JWT_SECRET=...`
2. **Volume not mounted** — means SQLite can't write to `/data`. Check dashboard → Volumes → confirm mount path is `/data`.

### "Refusing to boot with the default development secret"

Intentional guard. Set `JWT_SECRET` to a real random value. Do not reuse the dev default anywhere.

### Login works but pages are blank / spinning forever

Open DevTools → Network. Check what the `/api/executive-summary` call is doing:
- `401 Unauthorized` → token validation failing, check `JWT_SECRET` hasn't rotated
- `CORS blocked` → see above
- `200 with empty data` → that's the empty-state payload, run `/api/load-mock-data`

### After a deploy, everyone is logged out

Expected if you rotated `JWT_SECRET`. Existing tokens are signed with the old key and won't validate. Users just log in again.

### Heavy endpoints (`/api/mmm`, `/api/forecast`) return import errors

By design — the slim `requirements.txt` excludes PyMC and Prophet to keep image size sane. If you need them, edit the backend Dockerfile:
1. Uncomment the `build-essential libopenblas-dev` line in the apt install
2. Change `pip install -r requirements.txt` to `pip install -r requirements.txt -r requirements-heavy.txt`
3. Expect ~3x image size and ~10x build time.

---

## What to harden after launch

Things that are fine for a demo but not for real users:

1. **Multi-tenancy** — backend `_read_state()` is process-global; uploaded data disappears on restart and is shared across all users. Fix is the refactor you've already planned.
2. **Postgres migration** — SQLite on a volume works until concurrent write load gets real. `persistence.py` needs a SQLAlchemy abstraction.
3. **Rate limiting** — login endpoint has no throttling. Add slowapi or put Railway's built-in in front.
4. **Structured logging** — current logging is human-readable; Railway's log search works better with JSON.
5. **Separate frontend from Railway** — once you have traffic, serving the static bundle from Cloudflare Pages or Vercel is faster and free. The backend stays on Railway.

---

## Redeploy checklist

Any time you push changes:

```bash
# Backend changes
cd backend && railway up

# Frontend changes (also when VITE_API_BASE_URL changes)
cd frontend && railway up
```

Both services auto-deploy from git if you connect the repo in the Railway dashboard. CLI `railway up` is for manual deploys from local.
