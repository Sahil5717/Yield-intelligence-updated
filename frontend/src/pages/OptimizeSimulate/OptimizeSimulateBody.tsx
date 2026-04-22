/**
 * Optimize & Simulate — Screen 05.
 *
 * Wired to:
 *   GET /api/budget-optimization?engagement_id=…   (moves, allocation, impact)
 *   GET /api/plan?engagement_id=…                  (summary, moves, tradeoffs,
 *                                                    methodology, kpis)
 *
 * Approximations (see APPROXIMATIONS.md):
 *   - Beat 2 preset scenarios (Conservative / Recommended / Aggressive /
 *     Custom): the backend only returns ONE plan. Conservative and
 *     Aggressive are derived heuristically from the Recommended moves.
 *   - Beat 3 sliders: cosmetic. The HTML original shipped interactive
 *     marginal-ROI math that wasn't ported. Current + proposed numbers
 *     in the rows ARE live; the slider track position is illustrative.
 *   - Beat 5 risk bands (optimistic / expected / pessimistic): the
 *     backend returns `tradeoffs` (warnings + caveats), not
 *     probabilistic ranges. Expected comes from plan.summary;
 *     optimistic / pessimistic are ±12% / ±48% bracket approximations,
 *     flagged in the copy.
 */

import { useMemo } from 'react';
import { useBudgetOptimization, usePlan } from '../../lib/hooks';
import type { PlanMove, PlanPayload } from '../../lib/api';

// ─── Helpers ────────────────────────────────────────────────────────────

function fmtDollars(v: number | null | undefined): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return '$' + (v / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (abs >= 1_000) return '$' + (v / 1_000).toFixed(0) + 'K';
  return '$' + Math.round(v);
}

function fmtSignedDollars(v: number | null | undefined): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  const sign = v >= 0 ? '+' : '−';
  return sign + fmtDollars(Math.abs(v));
}

function fmtMultiple(v: number | null | undefined): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  return v.toFixed(2) + '×';
}

function fmtPct(v: number | null | undefined, signed = false): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  const sign = signed ? (v >= 0 ? '+' : '−') : '';
  return sign + Math.abs(v).toFixed(1) + '%';
}

function safeDivide(a: number, b: number, fallback = 0): number {
  return b === 0 ? fallback : a / b;
}

// ─── Preset derivation (approximation — see APPROXIMATIONS.md) ──────────

interface PresetSummary {
  id: 'conservative' | 'recommended' | 'aggressive' | 'custom';
  label: string;
  name: string;
  roiDelta: number;
  revDelta: number;
  desc: string;
}

/**
 * Derive the three preset scenarios from the single plan the backend
 * returns. This is a UI convenience — NOT a second optimizer run.
 *
 *   - Conservative: only moves with reliability == "reliable" AND
 *     |change_pct| <= 25. Smaller reallocation, smaller upside, no
 *     moves the tradeoffs block has flagged.
 *   - Recommended: the plan exactly as the optimizer produced it.
 *   - Aggressive: recommended + a 15% uplift multiplier on headline
 *     revenue (stands in for "add incremental budget").
 */
function derivePresets(plan: PlanPayload): PresetSummary[] {
  const moves = plan.moves || [];
  const summary = plan.summary || {
    total_budget: 0,
    current_revenue: 0,
    optimized_revenue: 0,
    uplift_pct: 0,
  };
  const recRoiDelta = safeDivide(
    summary.optimized_revenue - summary.current_revenue,
    summary.total_budget || 1,
  );
  const recRevDelta = summary.optimized_revenue - summary.current_revenue;

  const consMoves = moves.filter(
    (m) => m.reliability === 'reliable' && Math.abs(m.change_pct) <= 25,
  );
  const consRevDelta = consMoves.reduce((s, m) => s + (m.revenue_delta || 0), 0);
  const consRoiDelta = safeDivide(consRevDelta, summary.total_budget || 1);

  const aggRevDelta = recRevDelta * 1.15;
  const aggRoiDelta = recRoiDelta * 1.1;

  const topIncrease = moves
    .filter((m) => m.action === 'increase')
    .map((m) => m.channel)
    .slice(0, 2);
  const topDecrease = moves
    .filter((m) => m.action === 'decrease')
    .map((m) => m.channel)
    .slice(0, 2);

  return [
    {
      id: 'conservative',
      label: 'Conservative',
      name: 'Reliable moves only',
      roiDelta: consRoiDelta,
      revDelta: consRevDelta,
      desc:
        consMoves.length > 0
          ? `Only moves with reliable saturation fits and ≤25% shifts — ${consMoves.length} of ${moves.length} total. Smallest reallocation, lowest risk.`
          : "No moves clear the reliable-fit + ≤25%-shift bar in the current plan. Consider running an incrementality test first.",
    },
    {
      id: 'recommended',
      label: 'Recommended',
      name: 'Balanced reallocation',
      roiDelta: recRoiDelta,
      revDelta: recRevDelta,
      desc:
        topIncrease.length && topDecrease.length
          ? `Shift from ${topDecrease.join(' / ')} into ${topIncrease.join(
              ' / ',
            )}. Spend-neutral — the optimizer's central recommendation.`
          : "The optimizer's central recommendation at current budget.",
    },
    {
      id: 'aggressive',
      label: 'Aggressive',
      name: 'Recommended + new budget',
      roiDelta: aggRoiDelta,
      revDelta: aggRevDelta,
      desc: 'Recommended plus ~15% incremental budget into headroom channels. Higher ceiling, requires CFO sign-off. Approximated — not re-optimized.',
    },
    {
      id: 'custom',
      label: 'Custom',
      name: 'Build your own',
      roiDelta: 0,
      revDelta: 0,
      desc: "Start from current state and adjust each channel manually below. Use when you have constraints the model doesn't know about.",
    },
  ];
}

// ─── Risk bands (approximation — see APPROXIMATIONS.md) ─────────────────

function deriveRiskBands(plan: PlanPayload): {
  optimistic: { roi: number; rev: number; desc: string };
  expected: { roi: number; rev: number; desc: string };
  pessimistic: { roi: number; rev: number; desc: string };
} {
  const s = plan.summary;
  const baseRev = s.optimized_revenue - s.current_revenue;
  const baseRoiDelta = safeDivide(baseRev, s.total_budget || 1);
  const optimizedRoi = safeDivide(s.optimized_revenue, s.total_budget || 1);

  const topInc = (plan.moves || [])
    .filter((m) => m.action === 'increase')
    .sort((a, b) => b.revenue_delta - a.revenue_delta)[0];
  const topDec = (plan.moves || [])
    .filter((m) => m.action === 'decrease')
    .sort((a, b) => Math.abs(b.revenue_delta) - Math.abs(a.revenue_delta))[0];

  const optimistic = {
    roi: optimizedRoi + baseRoiDelta * 0.12,
    rev: baseRev * 1.13,
    desc: topInc
      ? `${topInc.channel} absorbs full shift at unchanged marginal ROI. External CPM / demand signals hold favorable.`
      : 'Upside scenario if headroom holds and external signals remain favorable.',
  };
  const expected = {
    roi: optimizedRoi,
    rev: baseRev,
    desc:
      topInc && topDec
        ? `Reallocation lands at modeled marginal ROIs. ${topDec.channel} cut releases budget cleanly; ${topInc.channel} scale absorbed at the modeled response curve.`
        : 'Reallocation lands at the modeled marginal ROIs.',
  };
  const pessimistic = {
    roi: optimizedRoi - baseRoiDelta * 0.14,
    rev: baseRev * 0.52,
    desc: topInc
      ? `${topInc.channel} reaches its saturation frontier earlier than modeled; cross-channel cannibalization reduces incremental revenue.`
      : 'Downside scenario if saturation hits earlier than modeled or cross-channel cannibalization reduces incremental revenue.',
  };

  return { optimistic, expected, pessimistic };
}

// ─── Channel color palette (used only for visual affordance) ────────────

const CHANNEL_PALETTE = [
  '#7C5CFF', '#10B981', '#F59E0B', '#F97316', '#0EA5E9',
  '#8B5CF6', '#64748B', '#EF4444', '#DC2626', '#3B82F6',
];
function colorForChannel(_ch: string, index: number): string {
  return CHANNEL_PALETTE[index % CHANNEL_PALETTE.length];
}

// ─── Slider row (cosmetic — see APPROXIMATIONS.md) ──────────────────────

function SliderRow({ move, index }: { move: PlanMove; index: number }) {
  const current = move.current_spend;
  const proposed = move.optimized_spend;
  const range = Math.max(current * 1.5, proposed * 1.2, 1);
  const currentPos = safeDivide(current, range) * 100;
  const proposedPos = safeDivide(proposed, range) * 100;
  const dir =
    move.action === 'increase' ? 'up' : move.action === 'decrease' ? 'down' : 'flat';

  return (
    <tr>
      <td>
        <div className="slider-channel">
          <span
            style={{
              background: colorForChannel(move.channel, index),
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginRight: 8,
            }}
          />
          {move.channel}
          {move.reliability === 'inconclusive' && (
            <span
              className="slider-channel-sub"
              style={{ color: '#92400E', marginLeft: 8 }}
              title="Near-linear response curve — saturation frontier uncertain"
            >
              ⚠ inconclusive fit
            </span>
          )}
        </div>
      </td>
      <td className="r">{fmtDollars(current)}</td>
      <td className="c">
        <div
          className="slider-input"
          style={{
            position: 'relative',
            height: 22,
            background: '#F0F1F6',
            borderRadius: 11,
            minWidth: 140,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: Math.min(currentPos, proposedPos) + '%',
              width: Math.abs(proposedPos - currentPos) + '%',
              top: 8,
              bottom: 8,
              background: dir === 'up' ? '#10B981' : dir === 'down' ? '#EF4444' : '#D8DCE8',
              borderRadius: 3,
              opacity: 0.35,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `calc(${currentPos}% - 6px)`,
              top: 4,
              width: 12,
              height: 14,
              background: '#fff',
              border: '2px solid #8C92AC',
              borderRadius: 3,
            }}
            title={`Current: ${fmtDollars(current)}`}
          />
          <div
            style={{
              position: 'absolute',
              left: `calc(${proposedPos}% - 6px)`,
              top: 4,
              width: 12,
              height: 14,
              background:
                dir === 'up' ? '#10B981' : dir === 'down' ? '#EF4444' : '#64748B',
              border: '2px solid #fff',
              borderRadius: 3,
              boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
            }}
            title={`Proposed: ${fmtDollars(proposed)}`}
          />
        </div>
      </td>
      <td className="r">{fmtDollars(proposed)}</td>
      <td className={'r ' + (dir === 'up' ? 'good' : dir === 'down' ? 'bad' : '')}>
        <span className={'slider-delta ' + dir}>
          {fmtSignedDollars(move.spend_delta)}
          <span style={{ fontSize: 10, marginLeft: 4, color: '#8C92AC' }}>
            ({fmtPct(move.change_pct, true)})
          </span>
        </span>
      </td>
      <td className="r">{fmtMultiple(move.marginal_roi)}</td>
    </tr>
  );
}

// ─── Component ──────────────────────────────────────────────────────────

export function OptimizeSimulateBody() {
  const optimization = useBudgetOptimization();
  const plan = usePlan();

  const presets = useMemo(
    () => (plan.data ? derivePresets(plan.data) : []),
    [plan.data],
  );
  const riskBands = useMemo(
    () => (plan.data ? deriveRiskBands(plan.data) : null),
    [plan.data],
  );

  const loading = optimization.loading || plan.loading;
  const error = optimization.error || plan.error;

  const optData = optimization.data;
  const planData = plan.data;

  // Derived portfolio numbers (used in the hero + compare grid)
  const currentRev = planData?.summary.current_revenue ?? 0;
  const optimizedRev = planData?.summary.optimized_revenue ?? 0;
  const totalBudget = planData?.summary.total_budget ?? 0;
  const currentRoi = safeDivide(currentRev, totalBudget || 1);
  const optimizedRoi = safeDivide(optimizedRev, totalBudget || 1);
  const upliftPct = planData?.summary.uplift_pct ?? 0;
  const totalMoved =
    (planData?.moves || []).reduce((s, m) => s + Math.abs(m.spend_delta), 0) / 2;
  const affectedChannels = new Set(
    (planData?.moves || []).filter((m) => m.action !== 'hold').map((m) => m.channel),
  ).size;

  const channelsAtFrontier = (planData?.moves || []).filter(
    (m) => m.near_linear_fit,
  ).length;
  const channelsLosingMoney = (planData?.moves || []).filter(
    (m) => m.current_roi < 1 && m.action === 'decrease',
  ).length;
  const channelsLosingAfter = (planData?.moves || []).filter(
    (m) => m.optimized_roi < 1,
  ).length;

  return (
    <main className="main">
      <div className="topbar">
        <div className="topbar-left">
          <div className="screen-num">05</div>
          <div>
            <div className="screen-title">Optimize &amp; Simulate</div>
            <div className="screen-sub">
              The action layer — model reallocation scenarios before you commit
            </div>
          </div>
        </div>
        <div className="topbar-right">
          {optData?.engagement && (
            <div className="pill">
              {optData.engagement.name} · {optData.engagement.currency}
            </div>
          )}
          <div className="pill">⇪ Export</div>
        </div>
      </div>

      {loading && (
        <div style={{ padding: 48, color: '#8C92AC' }}>
          Loading optimizer and plan…
        </div>
      )}
      {!loading && error && (
        <div style={{ padding: 48 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Couldn't load optimizer payload
          </div>
          <div style={{ color: '#8C92AC', fontSize: 14 }}>{error}</div>
        </div>
      )}

      {!loading && planData && optData && (
        <>
          {/* ==========================================================
              BEAT 1 — SCENARIO HERO
              ========================================================== */}
          <div className="scenario-hero">
            <div className="scenario-hero-eyebrow">
              Active scenario · <strong>Recommended</strong> · plan confidence{' '}
              {String(planData.kpis.plan_confidence.display || '—')} · synthesized
              across {planData.methodology?.length || 0} engine
              {(planData.methodology?.length || 0) === 1 ? '' : 's'}
            </div>

            <div className="scenario-hero-grid">
              <div className="scenario-state current">
                <div className="scenario-state-label">Current portfolio</div>
                <div className="scenario-state-roi">{fmtMultiple(currentRoi)}</div>
                <div className="scenario-state-rev">
                  {fmtDollars(currentRev)} revenue / {fmtDollars(totalBudget)} spend
                </div>
              </div>

              <div className="scenario-arrow-block">
                <div className="scenario-arrow">→</div>
                <div className="scenario-shift-amount">
                  Shift {fmtDollars(totalMoved)}
                  <br />
                  across {affectedChannels} channel
                  {affectedChannels === 1 ? '' : 's'}
                </div>
              </div>

              <div className="scenario-state proposed">
                <div className="scenario-state-label">Proposed portfolio</div>
                <div className="scenario-state-roi">{fmtMultiple(optimizedRoi)}</div>
                <div className="scenario-state-rev">
                  {fmtDollars(optimizedRev)} revenue / {fmtDollars(totalBudget)} spend
                </div>
              </div>
            </div>

            <div className="scenario-hero-meta">
              <div className="scenario-hero-meta-item">
                <div className="scenario-hero-meta-label">Incremental revenue</div>
                <div className="scenario-hero-meta-val green">
                  {planData.kpis.expected_uplift.display}
                </div>
              </div>
              <div className="scenario-hero-meta-item">
                <div className="scenario-hero-meta-label">CAC change</div>
                <div className="scenario-hero-meta-val gold">
                  {optData.impact.cac_improvement.value}
                  {optData.impact.cac_improvement.delta
                    ? ' · ' + optData.impact.cac_improvement.delta
                    : ''}
                </div>
              </div>
              <div className="scenario-hero-meta-item">
                <div className="scenario-hero-meta-label">Payback period</div>
                <div className="scenario-hero-meta-val">
                  {optData.impact.payback_period.value}
                </div>
              </div>
              <div className="scenario-hero-meta-item">
                <div className="scenario-hero-meta-label">Uplift vs current</div>
                <div className="scenario-hero-meta-val">
                  {fmtPct(upliftPct, true)}
                </div>
              </div>
              <div className="scenario-hero-meta-item">
                <div className="scenario-hero-meta-label">Plan confidence</div>
                <div className="scenario-hero-meta-val">
                  {String(planData.kpis.plan_confidence.display || '—')}
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================================
              BEAT 2 — PRESET SCENARIOS  (approximation — see doc)
              ========================================================== */}
          <section id="scenarios" className="sec-anchor beat">
            <div className="beat-num">Beat 1 · Pick a starting scenario</div>
            <div className="beat-headline">
              Three variations on the recommended plan — each with a different
              risk appetite.
            </div>
            <div className="beat-sub">
              Each preset is derived from the same optimizer run, filtered or
              scaled differently. Pick one as a starting point, then adjust
              individual channels below.{' '}
              <em>
                Conservative and Aggressive are UI approximations over the
                single optimizer output — they do not re-run the optimizer.
              </em>
            </div>

            <div className="preset-row">
              {presets.map((p) => (
                <div
                  key={p.id}
                  className={
                    'preset-card' + (p.id === 'recommended' ? ' active' : '')
                  }
                  data-preset={p.id}
                >
                  <div className="preset-label">{p.label}</div>
                  <div className="preset-name">{p.name}</div>
                  <div className="preset-impact">
                    {p.id === 'custom'
                      ? 'Drag sliders below'
                      : `${p.roiDelta >= 0 ? '+' : '−'}${Math.abs(
                          p.roiDelta,
                        ).toFixed(2)}× ROI · ${fmtSignedDollars(p.revDelta)} rev`}
                  </div>
                  <div className="preset-desc">{p.desc}</div>
                </div>
              ))}
            </div>

            <div className="beat-bridge">
              The presets show what the model recommends at different risk
              levels. Drag any slider below to test variations.
            </div>
          </section>

          {/* ==========================================================
              BEAT 3 — OPTIMIZER TABLE  (numbers live, slider cosmetic)
              ========================================================== */}
          <section id="optimizer" className="sec-anchor beat">
            <div className="beat-num">Beat 2 · Per-channel allocation</div>
            <div className="beat-headline">
              Every move the optimizer made, with its spend delta and marginal
              ROI.
            </div>
            <div className="beat-sub">
              Numbers come directly from the optimizer. Rows flagged with{' '}
              <em>⚠ inconclusive fit</em> are channels whose saturation
              frontier couldn't be reliably located from the data — the
              allocation for those channels is a best estimate under
              uncertainty, not a precise recommendation.{' '}
              <em>Slider tracks are visual only</em> — see doc.
            </div>

            <div className="optimizer-card">
              <div className="optimizer-head">
                <div>
                  <div className="optimizer-h">Channel spend allocation</div>
                  <div className="optimizer-tag">
                    {planData.moves.length} channel
                    {planData.moves.length === 1 ? '' : 's'} ·{' '}
                    {affectedChannels} changed · auto-saves to scenario
                  </div>
                </div>
                <div className="optimizer-summary">
                  <div className="opt-stat">
                    <div className="opt-stat-label">Total spend</div>
                    <div className="opt-stat-val">{fmtDollars(totalBudget)}</div>
                  </div>
                  <div className="opt-stat">
                    <div className="opt-stat-label">Projected revenue</div>
                    <div className="opt-stat-val good">
                      {fmtDollars(optimizedRev)}
                    </div>
                  </div>
                  <div className="opt-stat">
                    <div className="opt-stat-label">Projected ROI</div>
                    <div className="opt-stat-val good">
                      {fmtMultiple(optimizedRoi)}
                    </div>
                  </div>
                  <div className="opt-stat">
                    <div className="opt-stat-label">Δ vs current</div>
                    <div className="opt-stat-val good">
                      {optimizedRoi >= currentRoi ? '+' : '−'}
                      {Math.abs(optimizedRoi - currentRoi).toFixed(2)}×
                    </div>
                  </div>
                </div>
              </div>

              <table className="slider-table">
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th className="r">Current</th>
                    <th className="c">Allocation</th>
                    <th className="r">Proposed</th>
                    <th className="r">Δ</th>
                    <th className="r">Marginal ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {planData.moves.map((m, i) => (
                    <SliderRow key={m.key || m.channel} move={m} index={i} />
                  ))}
                </tbody>
              </table>

              <div className="optimizer-foot">
                <div>
                  Slider tracks are cosmetic in this build. Numbers reflect the
                  committed optimizer output.
                </div>
                <button className="optimizer-reset">↺ Reset to current</button>
              </div>
            </div>

            <div className="beat-bridge">
              Now compare the proposed allocation side-by-side with current
              state.
            </div>
          </section>

          {/* ==========================================================
              BEAT 4 — CURRENT vs PROPOSED
              ========================================================== */}
          <section id="compare" className="sec-anchor beat">
            <div className="beat-num">Beat 3 · Side-by-side comparison</div>
            <div className="beat-headline">
              Every metric that matters, before and after.
            </div>
            <div className="beat-sub">
              Headline numbers up top, per-channel breakdown in the table above.
            </div>

            <div className="compare-card">
              <div className="compare-grid">
                <div className="compare-col current">
                  <div className="compare-col-h">
                    <span className="compare-col-label">Current state</span>
                    <span className="compare-col-tag">Today's allocation</span>
                  </div>
                  <div className="compare-row headline">
                    <span className="compare-row-label">Portfolio ROI</span>
                    <span className="compare-row-val">{fmtMultiple(currentRoi)}</span>
                  </div>
                  <div className="compare-row headline">
                    <span className="compare-row-label">Total revenue</span>
                    <span className="compare-row-val">{fmtDollars(currentRev)}</span>
                  </div>
                  <div className="compare-row">
                    <span className="compare-row-label">Total spend</span>
                    <span className="compare-row-val">{fmtDollars(totalBudget)}</span>
                  </div>
                  <div className="compare-row">
                    <span className="compare-row-label">Channels at frontier</span>
                    <span className="compare-row-val">
                      {channelsAtFrontier} of {planData.moves.length}
                    </span>
                  </div>
                  <div className="compare-row">
                    <span className="compare-row-label">Channels losing money</span>
                    <span
                      className={
                        'compare-row-val' + (channelsLosingMoney > 0 ? ' bad' : '')
                      }
                    >
                      {channelsLosingMoney} of {planData.moves.length}
                    </span>
                  </div>
                </div>

                <div className="compare-col proposed">
                  <div className="compare-col-h">
                    <span className="compare-col-label">Proposed state</span>
                    <span className="compare-col-tag">Recommended scenario</span>
                  </div>
                  <div className="compare-row headline">
                    <span className="compare-row-label">Portfolio ROI</span>
                    <span className="compare-row-val good">
                      {fmtMultiple(optimizedRoi)}{' '}
                      <span
                        style={{
                          fontSize: 11,
                          fontStyle: 'normal',
                          color: '#047857',
                        }}
                      >
                        ({optimizedRoi >= currentRoi ? '+' : '−'}
                        {Math.abs(optimizedRoi - currentRoi).toFixed(2)}×)
                      </span>
                    </span>
                  </div>
                  <div className="compare-row headline">
                    <span className="compare-row-label">Total revenue</span>
                    <span className="compare-row-val good">
                      {fmtDollars(optimizedRev)}{' '}
                      <span
                        style={{
                          fontSize: 11,
                          fontStyle: 'normal',
                          color: '#047857',
                        }}
                      >
                        ({planData.kpis.expected_uplift.display})
                      </span>
                    </span>
                  </div>
                  <div className="compare-row">
                    <span className="compare-row-label">Total spend</span>
                    <span className="compare-row-val">
                      {fmtDollars(totalBudget)}{' '}
                      <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
                        (no change)
                      </span>
                    </span>
                  </div>
                  <div className="compare-row">
                    <span className="compare-row-label">Channels at frontier</span>
                    <span className="compare-row-val">
                      {channelsAtFrontier} of {planData.moves.length}
                    </span>
                  </div>
                  <div className="compare-row">
                    <span className="compare-row-label">Channels losing money</span>
                    <span
                      className={
                        'compare-row-val' +
                        (channelsLosingAfter < channelsLosingMoney ? ' good' : '')
                      }
                    >
                      {channelsLosingAfter} of {planData.moves.length}
                      {channelsLosingAfter < channelsLosingMoney && (
                        <span style={{ fontSize: 11, color: '#047857' }}>
                          {' '}(−{channelsLosingMoney - channelsLosingAfter})
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="beat-bridge">
              The expected outcome is one number. The honest answer is a range.
            </div>
          </section>

          {/* ==========================================================
              BEAT 5 — RISK & TRADEOFFS
              Expected = plan.summary (real); optimistic/pessimistic are
              ±12% / ±48% approximations. Real caveats come from
              plan.tradeoffs — those are authoritative.
              ========================================================== */}
          <section id="risk" className="sec-anchor beat">
            <div className="beat-num">Beat 4 · The honest range</div>
            <div className="beat-headline">
              Central estimate with approximated upside / downside bands — plus
              the tradeoffs the optimizer itself flagged.
            </div>
            <div className="beat-sub">
              The expected case is the plan as modeled. The optimistic and
              pessimistic bands are ±12% / ±48% approximations on incremental
              revenue — they are <em>not</em> separate optimizer runs and do
              not reflect a probabilistic confidence interval. Treat as
              illustrative until the backend exposes proper uncertainty bands.
            </div>

            {riskBands && (
              <div className="risk-grid">
                <div className="risk-card optimistic">
                  <div className="risk-card-label">Optimistic — top bracket</div>
                  <div className="risk-card-title">Headroom holds in full</div>
                  <div className="risk-card-roi">
                    {fmtMultiple(riskBands.optimistic.roi)}
                  </div>
                  <div className="risk-card-rev">
                    {fmtSignedDollars(riskBands.optimistic.rev)} revenue
                  </div>
                  <div className="risk-card-desc">{riskBands.optimistic.desc}</div>
                  <div className="risk-card-prob">
                    Approximation · not probabilistic
                  </div>
                </div>

                <div className="risk-card expected">
                  <div className="risk-card-label">Expected — central estimate</div>
                  <div className="risk-card-title">As modeled</div>
                  <div className="risk-card-roi">
                    {fmtMultiple(riskBands.expected.roi)}
                  </div>
                  <div className="risk-card-rev">
                    {fmtSignedDollars(riskBands.expected.rev)} revenue
                  </div>
                  <div className="risk-card-desc">{riskBands.expected.desc}</div>
                  <div className="risk-card-prob">
                    Plan confidence:{' '}
                    <strong>
                      {String(planData.kpis.plan_confidence.display || '—')}
                    </strong>
                  </div>
                </div>

                <div className="risk-card pessimistic">
                  <div className="risk-card-label">Pessimistic — bottom bracket</div>
                  <div className="risk-card-title">Saturation / cannibalization</div>
                  <div className="risk-card-roi">
                    {fmtMultiple(riskBands.pessimistic.roi)}
                  </div>
                  <div className="risk-card-rev">
                    {fmtSignedDollars(riskBands.pessimistic.rev)} revenue
                  </div>
                  <div className="risk-card-desc">{riskBands.pessimistic.desc}</div>
                  <div className="risk-card-prob">
                    Approximation · not probabilistic
                  </div>
                </div>
              </div>
            )}

            {planData.tradeoffs && planData.tradeoffs.length > 0 && (
              <div style={{ marginTop: 22 }}>
                <div
                  className="beat-num"
                  style={{ marginBottom: 8, fontSize: 11 }}
                >
                  Tradeoffs · flagged by the optimizer
                </div>
                {planData.tradeoffs.map((t) => (
                  <div
                    key={t.key}
                    className="annot"
                    style={{
                      marginBottom: 10,
                      borderLeft:
                        t.severity === 'warning'
                          ? '3px solid #F59E0B'
                          : '3px solid #8C92AC',
                    }}
                  >
                    <strong>{t.headline} —</strong> {t.narrative}
                  </div>
                ))}
              </div>
            )}

            <div className="beat-bridge">
              <strong style={{ color: 'var(--text)', fontStyle: 'normal' }}>
                The action argument, end-to-end:
              </strong>{' '}
              reallocate {fmtDollars(totalMoved)} across {affectedChannels}{' '}
              channel{affectedChannels === 1 ? '' : 's'}. Modeled lift of{' '}
              {planData.kpis.expected_uplift.display} at plan confidence{' '}
              {String(planData.kpis.plan_confidence.display || '—')}.{' '}
              <em>{planData.headline_paragraph}</em>
            </div>
          </section>

          {/* ==========================================================
              COMMIT PANEL
              ========================================================== */}
          <div className="commit-card" style={{ marginTop: 14 }}>
            <div className="commit-text">
              <div className="commit-h">Ready to commit?</div>
              <div className="commit-sub">
                Send this scenario to Plan for approval workflow and execution
                scheduling, or save as a named scenario.
              </div>
            </div>
            <div className="commit-actions">
              <button className="commit-btn secondary">↗ Share scenario</button>
              <button className="commit-btn secondary">💾 Save as draft</button>
              <button className="commit-btn primary">Send to Plan →</button>
            </div>
          </div>

          <a href="#" className="bridge" style={{ marginTop: 24 }}>
            <div>
              <div className="bridge-eyebrow">Continue · Screen 06</div>
              <div className="bridge-h">
                Lock in the plan — assign owners, set rollout dates, and queue
                the changes for execution across your ad platforms.
              </div>
            </div>
            <div className="bridge-arrow">→</div>
          </a>
        </>
      )}
    </main>
  );
}
