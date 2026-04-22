# Yield Intelligence

FastAPI backend + React frontend, deployable to Railway as two services from this one repo.

---

## 🚂 Deploying to Railway — read this first

> **This is a monorepo with two services.** Railway cannot auto-detect that. You must tell Railway where each service lives. Skip this and your build will fail with `Railpack could not determine how to build the app`.

### One-time setup (≈ 10 min)

1. **Push this repo to GitHub** (you've done this part).

2. **Go to Railway → New Project → Deploy from GitHub repo** → pick this repo.

3. Railway creates *one* service pointed at the repo root. **Delete it** — you'll create two proper ones.

4. Click **+ New → Empty Service** twice. Rename them `backend` and `frontend`.

5. For the **backend** service:
   - **Settings → Source → Connect Repo** → pick this repo, branch `main`
   - **Settings → Source → Root Directory** → type `backend`  *(no slash)*
   - **Settings → Build → Builder** → `Dockerfile` (should auto-detect)
   - **Variables** tab → add:
     - `JWT_SECRET` = (run `openssl rand -hex 32` locally and paste)
     - `YI_ENV` = `production`
   - **Settings → Volumes → + New Volume** → mount path `/data`, size 1 GB
   - Click **Deploy**. Wait ~2 min.
   - Once green, **Settings → Networking → Generate Domain**. Copy the URL (e.g. `https://backend-production.up.railway.app`).

6. For the **frontend** service:
   - **Settings → Source → Connect Repo** → same repo, branch `main`
   - **Settings → Source → Root Directory** → type `frontend`
   - **Variables** tab → add:
     - `VITE_API_BASE_URL` = (paste the backend URL from step 5)
   - Click **Deploy**. Wait ~2 min.
   - **Settings → Networking → Generate Domain**. Copy the URL.

7. Go back to the **backend** service → **Variables** → add:
   - `CORS_ORIGINS` = (paste the frontend URL from step 6)
   - This triggers a backend redeploy. Wait ~1 min.

8. Open the frontend URL in your browser. Log in with `ey.partner` / `demo1234`. Done.

### Why these specific steps

- **Root Directory per service** is how Railway handles monorepos. Without it, Railway looks at the repo root, finds no Dockerfile, and bails. See `backend/railway.toml` and `frontend/railway.toml` — both assume their own folder is the build context.
- **`VITE_API_BASE_URL` is baked into the JS bundle at build time**, not read at runtime. If you change the backend URL later, you must redeploy the frontend.
- **`CORS_ORIGINS` has to match the frontend URL exactly** (scheme + host, no trailing slash). Mismatch → browsers silently block every API call with no useful error in the UI.

### Every subsequent push

Just `git push` to `main`. Railway auto-deploys both services. No CLI, no dashboard clicking.

For the full reference with troubleshooting, see [DEPLOY.md](./DEPLOY.md).

---

## What's in here

```
yi-deploy/
├── backend/              FastAPI service (Python 3.12, SQLite on volume)
│   ├── Dockerfile        ← Railway builds this when Root Directory = backend
│   ├── railway.toml      Service config (volume, healthcheck, start cmd)
│   └── …                 Routes, engines, auth, tests
│
├── frontend/             React + Vite SPA (Node build → nginx serve)
│   ├── Dockerfile        ← Railway builds this when Root Directory = frontend
│   ├── railway.toml      Service config (build args, nginx start cmd)
│   ├── .env.example      Template — copy to .env for local dev
│   └── src/              Pages, hooks, auth, API client
│
├── .gitignore            Protects against committing node_modules, .env, etc.
├── README.md             ← You are here
├── DEPLOY.md             Full Railway deploy reference with troubleshooting
└── APPROXIMATIONS.md     Notes on backend-shape assumptions in wired pages
```

---

## Local development

No Docker needed.

```bash
# Terminal 1 — backend
cd backend
pip install -r requirements.txt
uvicorn api:app --reload --port 8000

# Terminal 2 — frontend
cd frontend
npm install
cp .env.example .env          # points at localhost:8000
npm run dev                   # opens http://localhost:5173
```

Log in with `ey.partner` / `demo1234`.

---

## Status (which pages are wired end-to-end)

| Screen                   | Backend endpoint                            | Status                       |
| ------------------------ | ------------------------------------------- | ---------------------------- |
| Executive Summary        | `/api/executive-summary`                    | ✅ Fully wired               |
| Performance              | `/api/channel-performance`                  | 🟡 Banner live; body hardcoded |
| Opportunities            | `/api/recommendations`                      | 🟡 Banner live; body hardcoded |
| Attribution & Trust      | `/api/diagnosis`                            | ✅ Fully wired               |
| Optimize & Simulate      | `/api/budget-optimization`, `/api/plan`     | ✅ Fully wired               |

Yellow rows show real numbers in the `LiveDataBanner` at the top of the page; the body below still renders hardcoded design. Backend-shape approximations in the wired pages are documented in [APPROXIMATIONS.md](./APPROXIMATIONS.md).

---

## What was hardened for deploy

- CORS locked to `CORS_ORIGINS` — no wildcard.
- JWT secret refuses to boot with the dev default when `YI_ENV=production` or `RAILWAY_ENVIRONMENT` is set.
- SQLite DB path configurable via `YIELD_DB_PATH`, mounted on Railway volume at `/data`.
- Slim core `requirements.txt` excludes heavy Bayesian / forecasting stack (lazy-imported inside their endpoints).
- Multi-stage frontend Dockerfile with nginx SPA fallback and `$PORT` binding.
- `NGINX_ENVSUBST_TEMPLATE_VARS=PORT` scopes env substitution so nginx's own `$uri`/`$host` variables survive.
