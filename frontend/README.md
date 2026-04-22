# Yield Intelligence — React port

Vite + React 18 + TypeScript port of the five-screen Yield Intelligence mockup that was previously distributed as standalone HTML files (`01-executive-summary.html` through `05-optimize-simulate.html`).

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:5173. Routes:

| Route             | Screen                       |
| ----------------- | ---------------------------- |
| `/`               | 01 · Executive Summary       |
| `/opportunities`  | 02 · Opportunities           |
| `/performance`    | 03 · Performance             |
| `/attribution`    | 04 · Attribution & Data Trust |
| `/optimize`       | 05 · Optimize & Simulate     |

Screens 06 (Plan) and 07 (Track & Report) appear disabled in the sidebar — the source HTML for those wasn't supplied.

Other scripts:
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — serve the production build locally
- `npm run typecheck` — TypeScript check without emit

## Structure

```
src/
├── main.tsx                      # entry point, wraps BrowserRouter
├── App.tsx                       # routes + AtlasProvider + AtlasWidget
├── styles/shared.css             # all screen styles, deduped by rule
├── layout/
│   └── AppShell.tsx              # sidebar + main grid
├── atlas/
│   ├── AtlasProvider.tsx         # thread state, sessionStorage sync
│   ├── AtlasWidget.tsx           # bubble + panel UI
│   └── types.ts
├── components/
│   ├── KpiTrendChart.tsx         # SVG line chart (ROI/CAC/Revenue/Spend tabs)
│   └── ValueCard.tsx             # "Where the value is" card
├── lib/
│   ├── usePersistentState.ts     # useState that syncs to sessionStorage
│   └── format.ts                 # money formatters
└── pages/
    ├── ExecutiveSummary/         # fully rewritten in React
    │   ├── index.tsx
    │   ├── valueData.ts
    │   └── kpiData.ts
    ├── Opportunities/
    │   ├── index.tsx             # wrapper with selection + scenario bar
    │   ├── OpportunitiesBody.tsx # markup preserved from source HTML
    │   └── useOppSelection.ts    # click delegation + persistence hook
    ├── Performance/
    │   ├── index.tsx             # wrapper with expandable channel rows
    │   └── PerformanceBody.tsx
    ├── AttributionTrust/
    │   ├── index.tsx
    │   └── AttributionTrustBody.tsx
    └── OptimizeSimulate/
        ├── index.tsx
        └── OptimizeSimulateBody.tsx
```

## Migration notes

### What was faithfully ported

- **Visual design** — the CSS from all five HTML files was merged rule-by-rule into `shared.css`. Pixel-identical output.
- **Atlas chat widget** — persistent thread across screens via `sessionStorage` (keys: `yi_atlas_thread_v1`, `yi_atlas_seen_screens_v1`). Each screen auto-posts its opening note the first time it's visited. ESC closes. Each page registers its config via `useRegisterAtlasScreen(...)`.
- **Executive Summary** — rewritten as idiomatic React. The "Where the value is" sort tabs (Impact / Urgency / Confidence) and the KPI trend chart (ROI / CAC / Revenue / Spend) are real components backed by real state.
- **Opportunities** — the 24-row list markup is preserved verbatim, but selection is fully reactive: click any row to toggle, click "Reset to defaults" to re-apply the auto-selected 11, or "Clear" to empty the selection. The scenario bar at the bottom sums `data-impact` from selected rows live. State persists to `sessionStorage` (key `yi_selected_opps`).
- **Performance** — expandable channel rows work. Click any channel row to toggle its campaign sub-row.
- **Navigation** — the `01-executive-summary.html` → `02-opportunities.html` filesystem links are rewritten as React Router routes. The two-path fork on the Executive Summary uses `<Link>`.

### Known limitations

**The Optimize & Simulate page's slider logic is NOT ported.** The original HTML ships ~300 lines of JS that maintain per-channel marginal-ROI curves and recompute total revenue / ROI / CAC as the user drags sliders. The markup renders, but the sliders are visual-only — numbers don't reflow. See the comment at the top of `src/pages/OptimizeSimulate/index.tsx` for the reference implementation's location in the original source (lines 1276–1588 of `05-optimize-simulate.html`). Recommended follow-up: port as `useOptimizerModel` hook with the `CHANNELS` dataset and `getMarginalROI()` interpolator.

**Opportunities "Details" panels**: the row-level detail expand/collapse is wired via event delegation (looking for `.opp-details-btn` or `[data-toggle-details]`). If the source HTML has a different mechanism for a specific row type, individual inspection may be needed — but the common pattern is supported.

**The page-body files are machine-converted** from the original HTML (`<main>` blocks only). They preserve every div, span, and class name from the source. If you want clean, componentized React for pages 2–5 going forward, treat those body files as a temporary bridge: extract recurring markup (`.opp-row`, `.channel-row`, `.beat-section`, etc.) into typed components and drive them from data modules. The Executive Summary folder shows the target shape.

### Reset behavior

Open the browser console and call `window.__yiAtlasReset()` to clear Atlas thread state and reload. To clear opportunity selection: `sessionStorage.removeItem('yi_selected_opps'); location.reload();` — this triggers the "first visit" auto-selection again.
