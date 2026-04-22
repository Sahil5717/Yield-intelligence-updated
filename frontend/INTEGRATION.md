# Frontend ↔ Backend Integration

This document covers the changes made to connect the React frontend to the FastAPI backend, and what's left to do.

## Running it locally

### 1. Backend (FastAPI, port 8000)

```bash
cd backend
pip install -r requirements.txt
uvicorn api:app --reload --port 8000
```

On first boot the demo users are seeded automatically. Load mock data + run engines once so the endpoints return populated payloads (otherwise they return empty-state JSON, which the frontend renders gracefully but is less interesting):

```bash
# After logging in through the app as an editor, or via curl:
TOKEN=$(curl -s -X POST http://localhost:8000/api/auth/login-v2 \
  -H "Content-Type: application/json" \
  -d '{"username":"ey.partner","password":"demo1234"}' \
  | python -c "import sys,json;print(json.load(sys.stdin)['token'])")

curl -X POST -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/load-mock-data
curl -X POST -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/run-analysis
```

### 2. Frontend (Vite, port 5173)

```bash
cd yi
cp .env.example .env          # or edit to point at a deployed backend
npm install
npm run dev
```

Open `http://localhost:5173`. You'll be redirected to `/login`. Click any demo-user row to prefill — all demo accounts use password `demo1234`:

| Username | Role |
|---|---|
| `ey.partner` | editor |
| `ey.analyst` | editor |
| `client.cmo` | client |
| `client.analyst` | client |

## What was added

### New files

- `src/lib/api.ts` — Typed HTTP client. Reads `VITE_API_BASE_URL`, attaches `Authorization: Bearer <token>`, parses JSON, surfaces `ApiError` with status code, auto-clears token on 401.
- `src/lib/auth.tsx` — `AuthProvider`, `useAuth()` hook, `RequireAuth` route guard. Validates stored token via `/api/auth/me` on mount; on failure clears and sends to `/login`.
- `src/lib/engagement.tsx` — `EngagementProvider` + `useEngagement()`. Fetches `/api/engagements` once after login, picks `default_id`, exposes current engagement for API calls that need `?engagement_id=`.
- `src/lib/hooks.ts` — Per-screen resource hooks: `useExecutiveSummary`, `useChannelPerformance`, `useBudgetOptimization`, `usePlan`, `useDiagnosis`, `useRecommendations`, `useCurrentState`, `usePillars`, `useMarketContext`. All return `{ data, loading, error, refresh }`.
- `src/pages/Login/index.tsx` — Login page with demo-user prefill.
- `src/components/LiveDataBanner.tsx` — Compact strip showing live stats from a resource, used on pages whose body is still hardcoded.
- `src/vite-env.d.ts` — Types for `import.meta.env`.
- `.env`, `.env.example` — `VITE_API_BASE_URL`.

### Changed files

- `src/App.tsx` — Wrapped in `AuthProvider` + `EngagementProvider`, login route added, all app routes gated by `RequireAuth`.
- `src/pages/ExecutiveSummary/index.tsx` — **Fully wired.** Hero, KPIs, 3 pillars, opportunities overlay, top-actions overlay, right-rail market context, and Atlas prompts all come from backend. Known gaps called out in code comments.
- `src/pages/AttributionTrust/{index.tsx, AttributionTrustBody.tsx}` — **Fully wired.** Body consumes `/api/diagnosis` directly: hero segments, trust score (derived), methodology pipeline, findings cards, per-finding confidence table. Placeholder sections for holdout / data-source health documented in `APPROXIMATIONS.md`.
- `src/pages/OptimizeSimulate/{index.tsx, OptimizeSimulateBody.tsx}` — **Fully wired.** Body consumes `/api/budget-optimization` + `/api/plan`: scenario hero, preset cards (Recommended live, Conservative/Aggressive derived), per-channel optimizer table, compare grid, risk bands (Expected live, optimistic/pessimistic approximated), tradeoffs. Interactive slider math deferred — see `APPROXIMATIONS.md`.
- `src/pages/Performance/index.tsx` — Banner from `useChannelPerformance`.
- `src/pages/Opportunities/index.tsx` — Banner from `useRecommendations`.

## Endpoint map

| Endpoint | Hook | Used on |
|---|---|---|
| `POST /api/auth/login-v2` | `useAuth().login` | Login page |
| `GET /api/auth/me` | mount validation | everywhere |
| `GET /api/auth/demo-users` | — | Login page hint |
| `GET /api/engagements` | `useEngagement` | app-wide |
| `GET /api/executive-summary?engagement_id=` | `useExecutiveSummary` | Executive Summary |
| `GET /api/market-context?engagement_id=` | `useMarketContext` | Executive Summary rail |
| `GET /api/channel-performance?engagement_id=` | `useChannelPerformance` | Performance |
| `GET /api/budget-optimization?engagement_id=` | `useBudgetOptimization` | Optimize & Simulate |
| `GET /api/plan?engagement_id=` | `usePlan` | Optimize & Simulate |
| `GET /api/diagnosis?engagement_id=` | `useDiagnosis` | Attribution & Trust |
| `GET /api/recommendations` | `useRecommendations` | Opportunities |
| `GET /api/current-state` | `useCurrentState` | (available, unused) |
| `GET /api/pillars` | `usePillars` | (available, unused) |

## Deferred work (intentional)

These were left untouched to keep the diff reviewable and avoid rewriting ~3500 lines of tightly-designed JSX:

1. **`PerformanceBody`, `OpportunitiesBody`** still render hardcoded data. The `LiveDataBanner` above each body proves the backend hook works; a future pass should pipe `resource.data` into props and replace the inline literals.
2. **`KpiTrendChart`** renders hardcoded 12-month point arrays from `kpiData.ts`. Needs either a new backend endpoint returning 12-month KPI series, or derivation from `/api/current-state.monthly_trends`.
3. **`ValueCard`** bars + ranked actions don't map 1:1 to `/api/executive-summary.opportunities`. Left as-is with a live overlay of top opportunities + top actions beneath the cards.
4. **Executive Summary right-rail "Cost alert" block** was replaced with the live `atlas_narration` from `/api/market-context`. If the backend narration is empty it hides cleanly.

## Body rewrites completed

`AttributionTrustBody` and `OptimizeSimulateBody` have been fully rewritten to consume their backend payloads. The `LiveDataBanner` wrapper was removed from their `index.tsx`. Backend-shape mismatches and UI approximations are documented in `APPROXIMATIONS.md` at the deploy root — that doc doubles as the backend work punchlist.

While rewriting, the TypeScript types in `src/lib/api.ts` were corrected to match what the backend actually returns. Notable fixes:

- `BudgetOptimizationPayload.impact.*` fields are `{value, delta}` objects, not strings. An existing banner access in `OptimizeSimulate/index.tsx` was reading these as strings — it rendered `[object Object]` at runtime but was masked by the `_read_state()` empty-state path. The access was fixed; then the banner was removed entirely when the body rewrite landed.
- `BudgetOptimizationPayload.moves[]` has a richer shape than the prior types described — `num` is a zero-padded string `"01."`, `why` is `{who, text}`, and fields like `revenue_lift_display` / `confidence` / `confidence_display` are present.
- `PlanMove` now describes the full `build_moves()` output including `reliability`, `near_linear_fit`, Bayesian HDI fields, `change_pct`, and separate `current_roi` / `optimized_roi` / `marginal_roi`.
- `PlanPayload.kpis` and `DiagnosisPayload.kpis` use a `KpiPill` shape (`{value, display, label, tone, context, ...}`) instead of `unknown`.
- `StructuredHero`, `HeroSegment`, `Tradeoff`, `DiagnosisFinding` are now proper typed interfaces.

## Backend notes worth knowing

1. **CORS is wide open** (`allow_origins=["*"]`). Fine for dev; tighten to your frontend origin(s) before deploying, especially if you later switch to cookie auth.
2. **Single-tenant state.** `_read_state()` in `routes_executive_summary.py` reads from `api._state`, a module-level dict. That means the exec-summary endpoint returns empty-state JSON until someone hits `/api/load-mock-data` (or real upload routes) in the *same process*. The known multi-tenancy refactor plan addresses this.
3. **Two login endpoints coexist.** `/api/auth/login` takes query params (legacy analyst app); `/api/auth/login-v2` takes a JSON body. The frontend uses v2.
4. **Heavy-dep imports are lazy.** PyMC and Prophet are imported inside specific endpoint functions, so the API boots without them — but `/api/mmm` and `/api/forecast` will fail unless they're installed.

## Verifying end-to-end

With backend running on :8000 and frontend on :5173:

1. Visit `http://localhost:5173` → redirected to `/login`.
2. Click `ey.partner` → form prefilled → click "Sign in".
3. Redirected to `/` (Executive Summary). You should see:
   - Top bar showing `Default Engagement · USD`
   - Hero with loss/gain coloring from backend headline
   - 4 KPI cells pulled from backend `kpis` array
   - 3 pillars with amounts from backend
   - Opportunities overlay beneath pillars
   - Top actions overlay beneath ValueCards
   - Market Trends rail populated from `/api/market-context`
4. Navigate to `/performance`, `/opportunities`, `/attribution`, `/optimize` — each shows a "● live" banner at the top with real stats. Bodies below are the existing hardcoded designs.
