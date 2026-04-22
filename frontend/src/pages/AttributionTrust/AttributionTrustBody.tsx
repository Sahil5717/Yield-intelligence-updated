/**
 * Attribution & Data Trust — Screen 04.
 *
 * Wired to:
 *   GET /api/diagnosis?engagement_id=…
 *
 * The diagnosis endpoint covers the *narrative* trust layer (findings,
 * hero segments, KPIs, methodology metadata). It does NOT yet cover the
 * *operational* trust layer that the original design calls for —
 * holdout test results, per-channel confidence scoring, data-source
 * freshness telemetry, external-signal health. Those sections are kept
 * with live-where-possible data and clearly-flagged approximations
 * elsewhere. See APPROXIMATIONS.md.
 *
 * Live sections:
 *   - Hero trust score: derived from plan_confidence + methodology convergence
 *   - Methodology pipeline: uses methodology[] entries from backend
 *   - Findings row: full list from findings[], rendered in the holdout
 *     block as "what the diagnosis found"
 *
 * Approximated sections:
 *   - Predicted-vs-actual scatter: needs a holdout endpoint
 *   - Per-channel confidence table: needs per-channel confidence endpoint
 *   - Data source health cards: needs an ingestion-telemetry endpoint
 *   - External signals health: needs an external-data-status endpoint
 */

import { useMemo } from 'react';
import { useDiagnosis } from '../../lib/hooks';
import type {
  DiagnosisFinding,
  DiagnosisMethodologyEntry,
  DiagnosisPayload,
  HeroSegment,
} from '../../lib/api';

// ─── Helpers ────────────────────────────────────────────────────────────

function fmtDollars(v: number | null | undefined): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return '$' + (v / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (abs >= 1_000) return '$' + (v / 1_000).toFixed(0) + 'K';
  return '$' + Math.round(v);
}

/**
 * Derive an overall trust score (0-100) from the diagnosis payload.
 * This is an approximation; the backend doesn't compute an "overall
 * confidence number" directly. Weighted combination of:
 *   - plan_confidence string → High=95, Directional=78, Inconclusive=55
 *   - methodology convergence ratio (converged / total)
 *   - R² from MMM methodology entry if present
 */
function deriveTrustScore(d: DiagnosisPayload): { score: number; tier: 'high' | 'med' | 'low' } {
  const planConf = String(d.kpis?.plan_confidence?.display || '').toLowerCase();
  let base = 78;
  if (planConf.includes('high')) base = 95;
  else if (planConf.includes('directional')) base = 78;
  else if (planConf.includes('inconclusive')) base = 55;

  const meth = d.methodology || [];
  const convergedCount = meth.filter((m) => m.converged !== false).length;
  const convergenceBonus = meth.length
    ? (convergedCount / meth.length - 0.8) * 15
    : 0;
  const mmm = meth.find((m) => m.engine?.toLowerCase().includes('mix'));
  const rSqBonus =
    mmm && typeof mmm.r_squared === 'number'
      ? (mmm.r_squared - 0.8) * 40
      : 0;

  let score = Math.round(base + convergenceBonus + rSqBonus);
  score = Math.max(40, Math.min(99, score));
  const tier = score >= 85 ? 'high' : score >= 70 ? 'med' : 'low';
  return { score, tier };
}

/**
 * Build a methodology pipeline from backend methodology entries.
 * The original HTML described 4 fixed stages (Raw signals / Adstock /
 * MMM / Shapley); the backend only returns what actually ran. We map
 * known engine names to a "stage" role so the pipeline still tells a
 * coherent story, then fall through to "unstaged" for anything else.
 */
const STAGE_ORDER: Array<[string, string]> = [
  ['response curves', 'Adstock + saturation curves'],
  ['marketing mix', 'Bayesian MMM'],
  ['budget optimizer', 'Budget optimization'],
  ['pillars', 'Value-at-risk decomposition'],
];
function buildPipeline(methodology: DiagnosisMethodologyEntry[]): Array<{
  stage: string;
  name: string;
  method: string;
  detail: string;
  converged?: boolean;
}> {
  if (!methodology || methodology.length === 0) return [];
  const out: Array<{
    stage: string;
    name: string;
    method: string;
    detail: string;
    converged?: boolean;
  }> = [];
  methodology.forEach((m, i) => {
    const lower = (m.engine || '').toLowerCase();
    const mapped = STAGE_ORDER.find(([key]) => lower.includes(key));
    const bits: string[] = [];
    if (m.channels_fitted !== undefined) bits.push(`${m.channels_fitted} channels fitted`);
    if (m.r_squared !== undefined && m.r_squared !== null) bits.push(`R² = ${m.r_squared.toFixed(2)}`);
    if (m.converged === false) bits.push('did not converge');
    else if (m.converged === true) bits.push('converged');
    if (m.total_var !== undefined) bits.push(`VaR $${(m.total_var / 1_000_000).toFixed(1)}M`);
    out.push({
      stage: `Stage ${i + 1}`,
      name: mapped ? mapped[1] : m.engine,
      method: m.method,
      detail: bits.join(' · ') || '—',
      converged: m.converged,
    });
  });
  return out;
}

// Confidence → tier + color (used for the "per-channel" (really per-finding) table)
function confidenceTier(c: string | number | null | undefined): 'high' | 'med' | 'low' {
  if (c === null || c === undefined) return 'med';
  if (typeof c === 'number') {
    if (c >= 85) return 'high';
    if (c >= 70) return 'med';
    return 'low';
  }
  const s = c.toLowerCase();
  if (s.includes('high')) return 'high';
  if (s.includes('low') || s.includes('inconclusive')) return 'low';
  return 'med';
}

function confidencePct(c: string | number | null | undefined): number {
  if (typeof c === 'number') return Math.round(c);
  const s = String(c || '').toLowerCase();
  if (s.includes('high')) return 92;
  if (s.includes('directional')) return 78;
  if (s.includes('inconclusive')) return 58;
  if (s.includes('low')) return 58;
  return 75;
}

// Channel palette for the per-finding table dots.
const CHANNEL_PALETTE = [
  '#7C5CFF', '#10B981', '#F59E0B', '#F97316', '#0EA5E9',
  '#8B5CF6', '#64748B', '#EF4444', '#DC2626', '#3B82F6',
];

// Render the structured hero segments the backend returns.
function HeroSegments({ segments }: { segments: HeroSegment[] }) {
  return (
    <>
      {segments.map((s, i) =>
        s.emphasis ? (
          <strong
            key={i}
            style={{
              fontStyle: 'italic',
              color: 'var(--accent, #7C5CFF)',
              fontWeight: 600,
            }}
          >
            {s.text}
          </strong>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

// ─── Component ──────────────────────────────────────────────────────────

export function AttributionTrustBody() {
  const { data, loading, error } = useDiagnosis();

  const trustScore = useMemo(
    () => (data ? deriveTrustScore(data) : null),
    [data],
  );
  const pipeline = useMemo(
    () => (data ? buildPipeline(data.methodology || []) : []),
    [data],
  );

  if (loading) {
    return (
      <main className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div className="screen-num">04</div>
            <div>
              <div className="screen-title">Attribution &amp; Data Trust</div>
              <div className="screen-sub">
                The credibility layer — methodology, model fit, and data quality
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: 48, color: '#8C92AC' }}>Loading diagnosis…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div className="screen-num">04</div>
            <div>
              <div className="screen-title">Attribution &amp; Data Trust</div>
              <div className="screen-sub">
                The credibility layer — methodology, model fit, and data quality
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: 48 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Couldn't load diagnosis
          </div>
          <div style={{ color: '#8C92AC', fontSize: 14 }}>{error}</div>
        </div>
      </main>
    );
  }

  if (!data) return null;

  const coverage = data.data_coverage;
  const findings = data.findings || [];
  const hero = data.hero;
  const roasKpi = data.kpis.portfolio_roas;
  const varKpi = data.kpis.value_at_risk;

  // Split findings by type for the trust hero's confidence summary line.
  const warnFindings = findings.filter(
    (f) => f.type === 'warning' || f.type === 'risk',
  );
  const strongFindings = findings.filter(
    (f) => f.type === 'positive' || f.type === 'opportunity',
  );

  const highConfNames = strongFindings
    .filter((f) => confidenceTier(f.confidence) === 'high')
    .map((f) => extractSubject(f.headline))
    .filter(Boolean)
    .slice(0, 3);
  const lowConfNames = warnFindings
    .filter((f) => confidenceTier(f.confidence) === 'low')
    .map((f) => extractSubject(f.headline))
    .filter(Boolean)
    .slice(0, 2);

  return (
    <main className="main">
      <div className="topbar">
        <div className="topbar-left">
          <div className="screen-num">04</div>
          <div>
            <div className="screen-title">Attribution &amp; Data Trust</div>
            <div className="screen-sub">
              The credibility layer — methodology, model fit, and data quality
            </div>
          </div>
        </div>
        <div className="topbar-right">
          <div className="pill">⇪ Export</div>
        </div>
      </div>

      {/* ============================================================
           BEAT 1 — TRUST HERO
           ============================================================ */}
      <div className="trust-hero">
        {trustScore && (
          <div className="trust-score-block">
            <div className="trust-score-eyebrow">Model confidence</div>
            <div className="trust-score">
              {trustScore.score}
              <sup>%</sup>
            </div>
            <div className="trust-score-label">Derived · plan + methodology</div>
          </div>
        )}
        <div className="trust-hero-text">
          {hero && hero.segments && hero.segments.length > 0 ? (
            <HeroSegments segments={hero.segments} />
          ) : (
            <>{data.headline_paragraph}</>
          )}
          {(highConfNames.length > 0 || lowConfNames.length > 0) && (
            <div style={{ marginTop: 10 }}>
              {highConfNames.length > 0 && (
                <>
                  Highest confidence on{' '}
                  <strong>{highConfNames.join(', ')}</strong>
                  {lowConfNames.length > 0 ? '. ' : '.'}
                </>
              )}
              {lowConfNames.length > 0 && (
                <>
                  Treat <strong className="warn">{lowConfNames.join(', ')}</strong>{' '}
                  with more caution — saturation fits or attribution signal are
                  thinner here.
                </>
              )}
            </div>
          )}
        </div>
        <div className="trust-hero-meta">
          <div className="trust-hero-meta-item">
            <span
              className={
                'trust-hero-meta-dot ' +
                (trustScore?.tier === 'high' ? 'green' : trustScore?.tier === 'med' ? 'amber' : 'red')
              }
            />
            Plan confidence: {String(data.kpis.plan_confidence.display || '—')}
          </div>
          <div className="trust-hero-meta-item">
            <span className="trust-hero-meta-dot green" />
            Portfolio ROAS: {String(roasKpi.display || '—')}
          </div>
          <div className="trust-hero-meta-item">
            <span
              className={
                'trust-hero-meta-dot ' +
                (varKpi.tone === 'warning' ? 'amber' : 'green')
              }
            />
            Value at risk: {String(varKpi.display || '—')}
            {typeof varKpi.pct_of_revenue === 'number' && (
              <> · {varKpi.pct_of_revenue.toFixed(1)}% of revenue</>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================
           BEAT 2 — METHODOLOGY PIPELINE
           ============================================================ */}
      <section id="methodology" className="sec-anchor beat">
        <div className="beat-num">Beat 1 · How we know</div>
        <div className="beat-headline">
          {pipeline.length > 0 ? (
            <>
              {pipeline.length} stage{pipeline.length === 1 ? '' : 's'} turn{' '}
              {coverage ? `${coverage.n_channels} channels` : 'your channels'}{' '}
              of raw data into diagnosis-grade numbers.
            </>
          ) : (
            'The methodology stack hasn\'t reported yet.'
          )}
        </div>
        <div className="beat-sub">
          Each stage is a separately-fitted engine; together they produce the
          findings below. External-signal priors (industry CPM benchmarks,
          search trends, macro indicators, seasonality, competitor activity) are
          included as approximated context until the{' '}
          <code>/api/external-data-status</code> endpoint exposes their
          freshness directly.
        </div>

        {pipeline.length > 0 && (
          <div className="method-card">
            <div className="method-pipeline">
              {pipeline.map((s, i) => (
                <div className="method-step" key={i}>
                  <div className="method-step-num">{s.stage}</div>
                  <div className="method-step-name">{s.name}</div>
                  <div className="method-step-what">
                    <strong>{s.method}</strong>
                    {s.detail && s.detail !== '—' && <> · {s.detail}</>}
                  </div>
                  {s.converged === false && (
                    <div className="method-step-why">
                      <strong className="warn">Did not converge</strong> —
                      treat outputs from this stage as directional only.
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="ext-signals-label">
              <div className="ext-signals-label-eyebrow">External signals</div>
              <div className="ext-signals-label-text">
                Five streams feed into the methodology stack as <strong>priors</strong>
                . Coverage data shown below is an <em>approximation</em> — the
                real freshness telemetry isn't wired to this screen yet.
              </div>
            </div>

            <div className="ext-signals-grid">
              {EXTERNAL_SIGNALS_APPROX.map((s, i) => (
                <div className="ext-signal" key={i}>
                  <div className="ext-signal-num">Stream {i + 1}</div>
                  <div className="ext-signal-name">{s.name}</div>
                  <div className="ext-signal-src">{s.src}</div>
                  <div className="ext-signal-foot">{s.feeds}</div>
                </div>
              ))}
            </div>

            <div className="method-foot">
              {coverage && (
                <>
                  Analysis covers {coverage.n_channels} channels and{' '}
                  {coverage.n_campaigns} campaigns across {coverage.period_rows}{' '}
                  rows of data. Total spend {fmtDollars(coverage.total_spend)} ·
                  revenue {fmtDollars(coverage.total_revenue)}.
                </>
              )}
            </div>
          </div>
        )}

        <div className="beat-bridge">
          A sound methodology is necessary but not sufficient. What did the
          diagnosis actually find?
        </div>
      </section>

      {/* ============================================================
           BEAT 3 — DIAGNOSIS FINDINGS
           The authoritative "what the model is telling us" section.
           ============================================================ */}
      <section id="holdout" className="sec-anchor beat">
        <div className="beat-num">Beat 2 · What the model found</div>
        <div className="beat-headline">
          {findings.length} diagnosis{findings.length === 1 ? '' : ' items'}{' '}
          surfaced — ranked by impact and confidence.
        </div>
        <div className="beat-sub">
          Each item is a self-contained finding with its own confidence tier
          and prescribed follow-up action. Cards marked <em>warning</em> point
          at specific risks the model identified; <em>opportunity</em> and{' '}
          <em>positive</em> cards flag value that's there to capture.{' '}
          <em>
            The predicted-vs-actual holdout chart from the design is kept as a
            visual placeholder until a holdout-test endpoint lands — see
            APPROXIMATIONS.md.
          </em>
        </div>

        {findings.length > 0 ? (
          <div className="holdout-card">
            <div className="holdout-head">
              <div>
                <div className="holdout-h">Findings summary</div>
                <div className="holdout-tag">
                  {findings.length} ranked item{findings.length === 1 ? '' : 's'} ·
                  from diagnosis engine
                </div>
              </div>
              <div className="holdout-stats">
                <div className="holdout-stat">
                  <div className="holdout-stat-label">Warnings</div>
                  <div
                    className={
                      'holdout-stat-val ' +
                      (warnFindings.length > 0 ? 'warn' : 'good')
                    }
                  >
                    {warnFindings.length}
                  </div>
                </div>
                <div className="holdout-stat">
                  <div className="holdout-stat-label">Opportunities</div>
                  <div className="holdout-stat-val good">
                    {strongFindings.length}
                  </div>
                </div>
                <div className="holdout-stat">
                  <div className="holdout-stat-label">High confidence</div>
                  <div className="holdout-stat-val good">
                    {
                      findings.filter(
                        (f) => confidenceTier(f.confidence) === 'high',
                      ).length
                    }{' '}
                    of {findings.length}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '18px 22px' }}>
              {findings.map((f, i) => (
                <FindingCard finding={f} key={f.key || i} />
              ))}
            </div>
          </div>
        ) : (
          <div
            className="annot"
            style={{ marginTop: 12, fontSize: 13, color: '#5C6280' }}
          >
            No findings returned from the diagnosis endpoint. Run analysis on a
            populated dataset to populate this section.
          </div>
        )}

        <div className="beat-bridge">
          Findings alone aren't enough — each one has a different confidence
          tier. Here's where to trust the model strongly vs. where to be
          cautious.
        </div>
      </section>

      {/* ============================================================
           BEAT 4 — PER-FINDING CONFIDENCE
           (Rendered as "per-finding" not "per-channel" since that's
           what the backend actually reports. See APPROXIMATIONS.md.)
           ============================================================ */}
      <section id="confidence" className="sec-anchor beat">
        <div className="beat-num">Beat 3 · Where confidence is high vs. low</div>
        <div className="beat-headline">
          Not every finding is equally trustworthy.
        </div>
        <div className="beat-sub">
          Confidence is reported per finding, not per channel — a single
          channel can show up in multiple findings with different confidence
          tiers. Below, each finding gets a row with its confidence score and
          the reason the engine reported it that way.{' '}
          <em>
            A per-channel confidence aggregate is deferred until the backend
            exposes it; see APPROXIMATIONS.md.
          </em>
        </div>

        {findings.length > 0 && (
          <div className="conf-card">
            <table className="conf-table">
              <thead>
                <tr>
                  <th>Finding</th>
                  <th>Confidence</th>
                  <th className="r">Score</th>
                  <th>Driver</th>
                </tr>
              </thead>
              <tbody>
                {findings.map((f, i) => {
                  const tier = confidenceTier(f.confidence);
                  const pct = confidencePct(f.confidence);
                  return (
                    <tr key={f.key || i}>
                      <td>
                        <div className="conf-channel">
                          <span
                            className="ch-dot"
                            style={{
                              background: CHANNEL_PALETTE[i % CHANNEL_PALETTE.length],
                              display: 'inline-block',
                              width: 8,
                              height: 8,
                              borderRadius: 4,
                            }}
                          />
                          {f.headline}
                        </div>
                      </td>
                      <td>
                        <div className="conf-bar-wrap">
                          <div className="conf-bar">
                            <div
                              className={'conf-bar-fill ' + tier}
                              style={{ width: pct + '%' }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="r">
                        <span className={'conf-pct ' + tier}>
                          {typeof f.confidence === 'string' && Number.isNaN(Number(f.confidence))
                            ? f.confidence
                            : `${pct}%`}
                        </span>
                      </td>
                      <td>
                        <div className="conf-reason">
                          {f.source_engines && f.source_engines.length > 0
                            ? `Source: ${f.source_engines.join(' + ')}. `
                            : ''}
                          {truncate(f.narrative, 140)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="beat-bridge">
          Confidence comes from method <em>and</em> data. Method's covered
          above — the data layer is next.
        </div>
      </section>

      {/* ============================================================
           BEAT 5 — DATA SOURCE HEALTH  (approximation — see doc)
           Entire section is stub data until an ingestion-telemetry
           endpoint exists. Kept in to preserve design shape.
           ============================================================ */}
      <section id="data-quality" className="sec-anchor beat">
        <div className="beat-num">Beat 4 · Are the inputs clean?</div>
        <div className="beat-headline">
          Data-source freshness, completeness, and anomaly telemetry.
        </div>
        <div className="beat-sub">
          <em>
            This section renders placeholder source cards. A data-source health
            endpoint is on the roadmap — see APPROXIMATIONS.md.
          </em>{' '}
          Monitoring dimensions once live will be freshness (last successful
          sync), completeness (did all expected events arrive), and anomalies
          (volume drops, schema changes, duplicates). Same monitoring applies
          to external signals that feed the methodology as priors.
        </div>

        <div className="source-grid">
          {DATA_SOURCES_APPROX.map((s, i) => (
            <div
              className={'source-card ' + (s.healthy ? 'healthy' : 'warn')}
              key={i}
            >
              <div className="source-head">
                <div className="source-name">{s.name}</div>
                <div
                  className={'source-badge ' + (s.healthy ? 'healthy' : 'warn')}
                >
                  {s.badge}
                </div>
              </div>
              {s.metrics.map((m, j) => (
                <div className="source-metric" key={j}>
                  <span className="source-metric-label">{m.label}</span>
                  <span
                    className={
                      'source-metric-val' + (m.warn ? ' warn' : '')
                    }
                  >
                    {m.val}
                  </span>
                </div>
              ))}
              <div className="source-foot">{s.foot}</div>
            </div>
          ))}
        </div>

        <div className="beat-bridge">
          <strong style={{ color: 'var(--text)', fontStyle: 'normal' }}>
            The trust argument, end-to-end:
          </strong>{' '}
          {pipeline.length} methodology stage{pipeline.length === 1 ? '' : 's'}{' '}
          ran; {findings.length} finding{findings.length === 1 ? '' : 's'}{' '}
          surfaced at varying confidence tiers. Plan confidence is{' '}
          {String(data.kpis.plan_confidence.display || '—')}. The Screen 01
          and 05 numbers are decision-grade with the caveats flagged above.
        </div>
      </section>

      <a href="/optimize" className="bridge" style={{ marginTop: 32 }}>
        <div>
          <div className="bridge-eyebrow">Continue · Screen 05</div>
          <div className="bridge-h">
            Now let's act on this — model what happens when you reallocate
            budget from saturated channels into headroom channels.
          </div>
        </div>
        <div className="bridge-arrow">→</div>
      </a>
    </main>
  );
}

// ─── Finding card ───────────────────────────────────────────────────────

function FindingCard({ finding }: { finding: DiagnosisFinding }) {
  const tier = confidenceTier(finding.confidence);
  const typeColor =
    finding.type === 'warning' || finding.type === 'risk'
      ? '#F59E0B'
      : finding.type === 'positive' || finding.type === 'opportunity'
      ? '#10B981'
      : '#7C5CFF';

  return (
    <div
      style={{
        padding: '14px 0',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gap: 24,
        alignItems: 'start',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: typeColor,
              borderRadius: 3,
            }}
          />
          <strong style={{ fontSize: 14 }}>{finding.headline}</strong>
          <span
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '.08em',
              padding: '2px 8px',
              borderRadius: 4,
              background:
                tier === 'high' ? '#D1FAE5' : tier === 'med' ? '#FEF3C7' : '#FEE2E2',
              color:
                tier === 'high' ? '#065F46' : tier === 'med' ? '#92400E' : '#B91C1C',
            }}
          >
            {String(finding.confidence)}
          </span>
        </div>
        <div style={{ fontSize: 13, color: '#5C6280', lineHeight: 1.5 }}>
          {finding.narrative}
        </div>
        {finding.prescribed_action && (
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: '#0F1535',
              background: '#F4F6FB',
              padding: '6px 10px',
              borderRadius: 4,
              display: 'inline-block',
            }}
          >
            <strong>Recommended:</strong> {finding.prescribed_action}
          </div>
        )}
      </div>
      <div style={{ textAlign: 'right' }}>
        {finding.impact_dollars !== null && finding.impact_dollars !== undefined && (
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: 18,
              color: '#0F1535',
            }}
          >
            {fmtDollars(finding.impact_dollars)}
          </div>
        )}
        {finding.source_engines && finding.source_engines.length > 0 && (
          <div style={{ fontSize: 10, color: '#8C92AC', marginTop: 4 }}>
            Source: {finding.source_engines.join(' + ')}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Utilities ──────────────────────────────────────────────────────────

function truncate(s: string, max: number): string {
  if (!s) return '';
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trim() + '…';
}

/**
 * Pull the subject of a diagnosis headline — heuristically, the first
 * channel-like noun phrase. "Paid Search is underspent relative to its
 * response curve" → "Paid Search". If no candidate is found, returns "".
 */
function extractSubject(headline: string): string {
  if (!headline) return '';
  const parts = headline.split(/\s+(?:is|are|has|have|show|shows|underperform|underperforms|at|drives)\s+/i);
  if (parts.length > 1) {
    return parts[0].trim();
  }
  // Fall back to first 3 words.
  return headline.split(/\s+/).slice(0, 3).join(' ');
}

// ─── Stub data (clearly labelled — swap when endpoints land) ───────────

const EXTERNAL_SIGNALS_APPROX = [
  {
    name: 'Industry CPM/CPC benchmarks',
    src: 'eMarketer · WordStream · Statista',
    feeds: 'Feeds → response curves',
  },
  {
    name: 'Search trend data',
    src: 'Google Trends + Semrush',
    feeds: 'Feeds → demand priors',
  },
  {
    name: 'Macro indicators',
    src: 'Consumer Confidence + Fed data',
    feeds: 'Feeds → response curves',
  },
  {
    name: 'Calendar & seasonality',
    src: 'Vertical-specific events',
    feeds: 'Feeds → adstock/seasonal prior',
  },
  {
    name: 'Competitor promo intel',
    src: 'SimilarWeb + Pathmatics',
    feeds: 'Feeds → response curves',
  },
];

const DATA_SOURCES_APPROX = [
  {
    name: 'Ad platforms',
    badge: 'Placeholder',
    healthy: true,
    metrics: [
      { label: 'Last sync', val: '—', warn: false },
      { label: 'Completeness', val: '—', warn: false },
      { label: 'Anomalies (7d)', val: '—', warn: false },
    ],
    foot: 'Awaiting /api/data-readiness integration.',
  },
  {
    name: 'CRM / Marketing',
    badge: 'Placeholder',
    healthy: true,
    metrics: [
      { label: 'Last sync', val: '—', warn: false },
      { label: 'Completeness', val: '—', warn: false },
      { label: 'Anomalies (7d)', val: '—', warn: false },
    ],
    foot: 'Awaiting /api/data-readiness integration.',
  },
  {
    name: 'Commerce',
    badge: 'Placeholder',
    healthy: true,
    metrics: [
      { label: 'Last sync', val: '—', warn: false },
      { label: 'Completeness', val: '—', warn: false },
      { label: 'Anomalies (7d)', val: '—', warn: false },
    ],
    foot: 'Awaiting /api/data-readiness integration.',
  },
  {
    name: 'Analytics',
    badge: 'Placeholder',
    healthy: true,
    metrics: [
      { label: 'Last sync', val: '—', warn: false },
      { label: 'Completeness', val: '—', warn: false },
      { label: 'Anomalies (7d)', val: '—', warn: false },
    ],
    foot: 'Awaiting /api/data-readiness integration.',
  },
];
