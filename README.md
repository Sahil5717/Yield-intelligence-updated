# Yield Intelligence — Deploy Package

Frontend + backend ready to ship to Railway.

## What's in here

```
deploy/
├── backend/              FastAPI service
│   ├── Dockerfile        Python 3.12 slim, ~600 MB image
│   ├── railway.toml      Volume-mounted SQLite config
│   ├── requirements.txt  Core runtime deps (no PyMC/Prophet)
│   ├── requirements-heavy.txt  Optional Bayesian MMM stack
│   └── ...               All engines, routes, mock data
│
├── frontend/             React + Vite SPA
│   ├── Dockerfile        Multi-stage: Node build → nginx serve
│   ├── nginx.conf.template  SPA fallback, asset caching, $PORT
│   ├── railway.toml      VITE_API_BASE_URL wiring
│   └── src/              Pages, hooks, auth, API client
│
├── DEPLOY.md             Step-by-step Railway deploy guide
└── README.md             This file
```

## Quick start

**Local dev** (no Docker needed):
```bash
# Terminal 1 — backend
cd backend
pip install -r requirements.txt
uvicorn api:app --reload --port 8000

# Terminal 2 — frontend
cd frontend
npm install
cp .env.example .env       # points at localhost:8000
npm run dev                # opens http://localhost:5173
```

Log in with `ey.partner` / `demo1234`.

**Deploy to Railway:** see [DEPLOY.md](./DEPLOY.md).

## Status

| Screen | Backend endpoint | Status |
|---|---|---|
| Executive Summary | `/api/executive-summary` | ✅ Fully wired |
| Performance | `/api/channel-performance` | 🟡 Live data banner; body hardcoded |
| Opportunities | `/api/recommendations` | 🟡 Live data banner; body hardcoded |
| Attribution & Trust | `/api/diagnosis` | ✅ Fully wired (see APPROXIMATIONS.md) |
| Optimize & Simulate | `/api/budget-optimization`, `/api/plan` | ✅ Fully wired (see APPROXIMATIONS.md) |

Yellow rows render real numbers at the top of each page (via `LiveDataBanner`) while the body below still shows the hardcoded design. Full body rewrites are deferred — see the "Deferred work" section in `frontend/INTEGRATION.md`. Rewritten pages document backend-shape approximations in `APPROXIMATIONS.md` at the deploy root.

## What was hardened for deploy

- CORS locked to `CORS_ORIGINS` env var; no wildcard
- JWT secret refuses to boot with dev default when `YI_ENV=production` or `RAILWAY_ENVIRONMENT` is set
- SQLite DB path configurable via `YIELD_DB_PATH`, mounted on Railway volume at `/data`
- Slim core `requirements.txt` excludes heavy Bayesian/forecasting stack (lazy-imported inside their endpoints)
- Multi-stage frontend Dockerfile with nginx SPA fallback and `$PORT` binding
- `NGINX_ENVSUBST_TEMPLATE_VARS=PORT` scopes env substitution so nginx's `$uri` variables survive

## Verified in sandbox

Before shipping this package I verified (using real HTTP requests against the actual code):
- Backend boots cleanly with all production env vars
- CORS allows the configured origin, blocks all others (HTTP 400, no ACAO header)
- Login → `/api/auth/me` flow works through production CORS config
- JWT production guard refuses dev default, accepts real secret
- Frontend Vite build with `VITE_API_BASE_URL` bakes the URL into the JS bundle

## Not verified

- Docker images weren't actually built (no Docker in the sandbox I developed this in). Configs are correct to the best of my ability but there's residual risk of a small issue at first `docker build`. Most likely failures and fixes are listed in DEPLOY.md's Troubleshooting section.
