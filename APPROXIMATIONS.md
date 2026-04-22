# Frontend approximations — backend gaps

This document tracks every place in the frontend where the design calls for a piece of data the backend doesn't currently expose. Each entry lists:

- **Where** the approximation appears in the UI
- **What** the backend would need to provide to make it real
- **How** it's currently approximated (if at all)

Kept separate from `INTEGRATION.md` so that the list of data gaps can be used as a backend-work punchlist without the integration context around it. When a backend endpoint lands that closes one of these, delete the corresponding entry here and any `see APPROXIMATIONS.md` pointer in the code.

Scope: covers the work done in the body rewrites of **Optimize & Simulate** and **Attribution & Data Trust**. Anything in Performance, Opportunities, Executive Summary (`KpiTrendChart` / `ValueCard`) is out of scope for this document — those rewrites are still deferred.

---

## Optimize & Simulate (Screen 05)

### 1. Preset scenarios (Conservative / Aggressive)

**Where:** Beat 2 — three preset cards above the optimizer table.

**What's live:** The Recommended preset is bound to `/api/plan.summary` directly. Its ROI delta and revenue delta are computed from the real optimizer output.

**What's approximated:** Conservative and Aggressive don't exist in the backend. Only one plan comes back per engagement. The frontend derives them:

- **Conservative** — filter `plan.moves` to `reliability === "reliable"` AND `|change_pct| <= 25`, sum the `revenue_delta` across those moves, derive an ROI delta by dividing by `plan.summary.total_budget`.
- **Aggressive** — multiply the Recommended revenue delta by 1.15 and the ROI delta by 1.10. This is a fixed heuristic, not a second optimizer run at a higher budget.

**What's needed on the backend:** Either (a) a new endpoint `/api/plan?risk_profile=conservative|recommended|aggressive` that runs the optimizer under different constraint settings (budget ceiling, max per-channel shift cap, reliability filter), or (b) a `/api/plan/scenarios` endpoint that returns an array of pre-computed scenarios with distinct `summary` and `moves` blocks.

Suggested profile semantics (so the backend and UI stay aligned):

- `conservative` — cap `|change_pct| <= 25` per channel, exclude `near_linear_fit` channels
- `recommended` — current default, no additional constraints
- `aggressive` — permit +15% budget headroom, no reliability filter

Location in code: `derivePresets()` in `OptimizeSimulateBody.tsx`.

---

### 2. Optimizer sliders — interactive reflow

**Where:** Beat 3 — per-channel slider rows.

**What's live:** Every numeric value in each row (current spend, proposed spend, Δ, %, marginal ROI) is bound to `PlanMove` fields directly from `/api/plan`. The reliability warning (`⚠ inconclusive fit`) is bound to `move.reliability === 'inconclusive'`.

**What's approximated:** The slider track itself is cosmetic. Dragging a slider does nothing. The two knob positions reflect the committed optimizer output; moving them would require client-side recomputation of projected revenue, ROI, and marginal ROI as spend shifts along each channel's saturation curve.

**What's needed on the backend:** Expose per-channel saturation curve coefficients so the frontend can evaluate `revenue(spend)` locally. Something like:

```
GET /api/response-curves?engagement_id=...
→ [
    { channel, curve_type: "power_law" | "hill", params: {...},
      valid_range: [min_spend, max_spend], marginal_roi_at: (spend) => number }
    ...
  ]
```

With this, a `useOptimizerModel` hook can compute projected revenue + ROI on every drag locally (fast) and only hit the backend when the user commits. Until then, sliders stay visual.

Location in code: `SliderRow` in `OptimizeSimulateBody.tsx`. The HTML original (screen 05) had a ~300-line IIFE that did this math; porting it is tracked separately.

---

### 3. Risk bands — optimistic / expected / pessimistic

**Where:** Beat 5 — three risk cards.

**What's live:** The Expected card is bound to `plan.summary` directly (optimized ROI and incremental revenue).

**What's approximated:** Optimistic and Pessimistic are computed as `±12%` and `±48%` of the incremental revenue respectively. These aren't probabilistic bounds — they're illustrative brackets to preserve the visual structure. The narrative text in each card names specific scenarios (headroom holds, saturation earlier, cannibalization) but those aren't tied to actual backend signals.

**What's needed on the backend:** A proper uncertainty quantification output. The easiest starting point is to expose the Bayesian HDI that already exists on individual `PlanMove`s (`bayes_delta_hdi_90`) at the portfolio level too — sum across moves weighted by the joint uncertainty, and return something like:

```
plan.summary.revenue_uplift_hdi_80: [lo, hi]
plan.summary.revenue_uplift_hdi_95: [lo, hi]
```

Alternatively, a Monte Carlo over the response curves at the proposed allocation would give an actual probability distribution and let us label bands with meaningful percentiles.

Location in code: `deriveRiskBands()` in `OptimizeSimulateBody.tsx`.

---

## Attribution & Data Trust (Screen 04)

### 4. Overall trust score (hero number)

**Where:** Beat 1 — the big percentage in the trust hero.

**What's live:** The score is derived from the diagnosis payload — specifically `kpis.plan_confidence.display` (High/Directional/Inconclusive) combined with the convergence flags and R² on `methodology[]` entries.

**What's approximated:** There is no single "overall model confidence" number computed on the backend. The derivation formula in the frontend is:

```
base = 95 if plan_confidence == "High"
       78 if plan_confidence == "Directional"
       55 if plan_confidence == "Inconclusive"

convergenceBonus = (fraction_converged − 0.8) × 15
rSqBonus         = (mmm_r_squared − 0.8) × 40   (when MMM is present)

score = clip(base + convergenceBonus + rSqBonus, 40, 99)
```

**What's needed on the backend:** A single computed `model_confidence_score: {value: 0-100, tier: "high"|"med"|"low", drivers: [...]}` attached to the diagnosis payload, with the same transparent formula decided at the backend layer. Would also unblock this surfacing anywhere else (e.g. executive summary hero).

Location in code: `deriveTrustScore()` in `AttributionTrustBody.tsx`.

---

### 5. External signal streams (health cards)

**Where:** Beat 2 — the 5-card grid below the methodology pipeline.

**What's live:** Nothing. The card contents are static copy.

**What's approximated:** All five stream descriptions are hardcoded. Source names (`eMarketer`, `Google Trends`, etc.) and the "Feeds → ..." labels come from the old design, not from the backend.

**What's needed on the backend:** An endpoint that returns the current state of each external signal stream:

```
GET /api/external-data-status
→ {
    streams: [
      { key: "industry_cpm", name: "Industry CPM/CPC benchmarks",
        source: "eMarketer", last_update_iso: "...",
        freshness: "fresh" | "stale" | "degraded",
        coverage: { fitted: 9, total: 9 },
        feeds: ["response_curves"] }
      ...
    ]
  }
```

The backend already has `engines/external_data.py` + an `/api/external-data-status` route (line 418 in `api.py` per earlier grep); the data is likely available, just not plumbed to this screen.

Location in code: `EXTERNAL_SIGNALS_APPROX` constant at the bottom of `AttributionTrustBody.tsx`.

---

### 6. Holdout-test / predicted-vs-actual scatter

**Where:** Beat 3 — the original design had a scatter plot with ±5% tolerance band and per-channel points labelled by their prediction error (e.g. `+1.8% NB Search +10.0% Display RT −11.9%`).

**What's live:** The design has been replaced with a "Findings summary" block that renders the actual `/api/diagnosis.findings[]` with their confidence tiers, impact, and prescribed actions. That's the authoritative "what the model is telling us" view.

**What's approximated:** Nothing in the new version — the old scatter is gone. The "holdout" framing is kept because the `.holdout-card` class and the beat narrative still make sense as "here's the evidence the model's output is trustworthy."

**What's needed on the backend:** A holdout-test endpoint:

```
GET /api/holdout-test?engagement_id=…
→ {
    holdout_period: { start, end },
    training_period: { start, end },
    mean_abs_pct_error: 0.032,
    r_squared_out_of_sample: 0.94,
    channels: [
      { channel, predicted: 3850000, actual: 3920000,
        pct_error: +0.018, within_tolerance: true },
      ...
    ]
  }
```

Once that lands, the scatter can be rendered as real data, and the "±3% across the portfolio" number becomes live.

Location in code: Beat 3 in `AttributionTrustBody.tsx`.

---

### 7. Per-channel confidence table

**Where:** Beat 4 — the confidence table.

**What's live:** The table renders per-**finding** confidence, which is what `findings[].confidence` actually reports. Each row is one diagnosis finding, its confidence tier, and the driving narrative.

**What's approximated:** The original design was per-**channel** (Brand Search 96%, Organic 93%, etc.). That aggregate doesn't exist in the backend — confidence is reported per finding, and a channel can appear across multiple findings with different tiers.

**What's needed on the backend:** Either (a) a per-channel confidence aggregate endpoint:

```
GET /api/channel-confidence?engagement_id=…
→ [
    { channel, score: 96, tier: "high",
      drivers: { data_history_months: 72, spend_variation: "4x",
                 attribution_cleanliness: "high" },
      source_engines: ["response_curves", "mmm"] }
    ...
  ]
```

or (b) include a `channel_confidence: {channel: score}` map on the diagnosis payload.

Location in code: Beat 4 in `AttributionTrustBody.tsx`.

---

### 8. Data source health cards

**Where:** Beat 5 — the 4-card grid of source health.

**What's live:** Nothing. All four cards show "—" values and "Placeholder" badges with a pointer to the intended endpoint.

**What's approximated:** Entire section is stub data.

**What's needed on the backend:** A data-source health endpoint that surfaces ingestion telemetry:

```
GET /api/data-readiness?engagement_id=…
→ {
    sources: [
      { name: "Google Ads", key: "gads",
        last_sync_iso: "...", freshness_badge: "healthy" | "stale" | "degraded",
        completeness_pct: 1.0, anomalies_7d: 0,
        matched: { metric: "spend", observed: 2160000, expected: 2160000 },
        foot_note: "All campaigns reporting nominal." }
      ...
    ]
  }
```

Route stub `/api/data-readiness` exists on the backend (`api.py` line 824 from earlier grep) — likely just needs wiring through to this screen's payload.

Location in code: `DATA_SOURCES_APPROX` constant at the bottom of `AttributionTrustBody.tsx`.

---

## Summary — punchlist for the backend

Ordered roughly by impact on credibility, not effort:

1. **`/api/response-curves`** — unlocks live slider reflow on Optimize & Simulate (gap #2)
2. **`/api/data-readiness`** — unlocks all source-health cards on Attribution & Data Trust (gap #8); a stub route already exists
3. **`/api/external-data-status`** — unlocks external-signal health grid (gap #5); also has a stub route
4. **`/api/holdout-test`** — unlocks the predicted-vs-actual scatter (gap #6); nothing exists yet
5. **Plan scenarios (`?risk_profile=…` or `/api/plan/scenarios`)** — unlocks real Conservative/Aggressive presets (gap #1)
6. **`plan.summary.revenue_uplift_hdi_80`** — unlocks real optimistic/pessimistic bands (gap #3)
7. **`/api/channel-confidence`** — unlocks per-channel confidence aggregate (gap #7)
8. **Derived `model_confidence_score`** on diagnosis payload — replaces the hero-score formula (gap #4)

Items 1, 2, 3, 4, 6 are standalone endpoints that can be added without touching existing ones. Items 5 and 7 extend the existing plan / diagnosis payloads. Item 8 is a new field on diagnosis.
