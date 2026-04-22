import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegisterAtlasScreen } from '../../atlas/AtlasProvider';
import { ValueCard } from '../../components/ValueCard';
import { KpiTrendChart } from '../../components/KpiTrendChart';
import { useExecutiveSummary, useMarketContext } from '../../lib/hooks';
import type { ExecutiveSummaryPayload } from '../../lib/api';
import type { SortKey } from './valueData';

/**
 * Executive Summary — Screen 01.
 *
 * Wired to:
 *   GET /api/executive-summary?engagement_id=...  (hero, KPIs, 3 pillars, opportunities, top_actions, atlas)
 *   GET /api/market-context?engagement_id=...      (right-rail peaks + narration)
 *
 * Still hardcoded (known gaps):
 *   - KpiTrendChart 12-month point arrays (kpiData.ts). The shape the
 *     chart renders isn't exposed on /executive-summary; would need a
 *     new endpoint or to derive from /current-state.monthly_trends.
 *   - ValueCard sort/bars/actions. Backend's `opportunities` is a flat
 *     3-item list; the frontend card has sort modes and ranked bars
 *     that don't map 1:1. Left as-is with a live overlay.
 *   - "Two ways to continue" fork — navigation, no data.
 */

// Stable copy that belongs to the screen, not the data.
const STATIC = {
  eyebrow: 'Where you stand this quarter',
  screenTitle: 'Executive Summary',
  screenSub: 'Where you stand this quarter',
};

// Build the Atlas config dynamically from the payload, so the widget
// reflects what the server actually said.
function buildAtlasConfig(data: ExecutiveSummaryPayload | null) {
  const openingNote =
    data?.atlas?.paragraphs?.map((p) => p.text).join(' ') ||
    "I'm reviewing your performance data. When it's loaded, I'll walk you through where the recoverable value sits.";
  const prompts = data?.atlas?.suggested_questions?.length
    ? data.atlas.suggested_questions
    : [
        'Why is the recovery ratio so high?',
        'Which channel is leaking the most?',
        'How confident are you in this number?',
        'What would the CFO push back on?',
      ];
  return {
    screen: '01',
    screenTitle: STATIC.screenTitle,
    openingNote,
    prompts,
  };
}

// Render the headline which may come back as either a string (populated)
// or an object with prefix/loss/middle/gain/suffix (cold-start template).
function HeroHeadline({ headline }: { headline: ExecutiveSummaryPayload['hero']['headline'] }) {
  if (typeof headline === 'string') {
    return <>{headline}</>;
  }
  return (
    <>
      {headline.prefix && <>{headline.prefix} </>}
      {headline.loss && <span className="bad">{headline.loss}</span>}
      {headline.middle && <> {headline.middle} </>}
      {headline.gain && <span className="good">{headline.gain}</span>}
      {headline.suffix || ''}
    </>
  );
}

export function ExecutiveSummary() {
  const { data, loading, error } = useExecutiveSummary();
  const market = useMarketContext();
  const [sort, setSort] = useState<SortKey>('impact');

  // Atlas config has to be stable across renders to avoid re-registering.
  // useMemo keyed on the slice of payload we actually read.
  const atlasConfig = useMemo(
    () => buildAtlasConfig(data),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.atlas?.source, data?.atlas?.paragraphs?.length, data?.has_data],
  );
  useRegisterAtlasScreen(atlasConfig);

  if (loading) {
    return (
      <main className="main">
        <div style={{ padding: 48, color: '#8C92AC' }}>Loading executive summary…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main">
        <div style={{ padding: 48 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Couldn't load executive summary</div>
          <div style={{ color: '#8C92AC', fontSize: 14 }}>{error}</div>
        </div>
      </main>
    );
  }
  if (!data) return null;

  const { hero, kpis, pillars, opportunities, top_actions } = data;
  const pillarsByIndex = pillars.pillars; // already ordered leak / drop / avoid

  return (
    <main className="main">
      <div className="topbar">
        <div className="topbar-left">
          <div className="screen-num">01</div>
          <div>
            <div className="screen-title">{STATIC.screenTitle}</div>
            <div className="screen-sub">{STATIC.screenSub}</div>
          </div>
        </div>
        <div className="topbar-right">
          <div className="pill">{data.engagement.name} · {data.engagement.currency}</div>
          <div className="pill">⇪ Share</div>
        </div>
      </div>

      <div className="body-cols">
        <div className="left-col">
          {/* HERO — from backend */}
          <div className="hero-insight">
            <div>
              <div className="hero-eyebrow bad">{hero.eyebrow}</div>
              <div className="hero-headline">
                <HeroHeadline headline={hero.headline} />
              </div>
              <div className="hero-sub">{hero.sub}</div>
            </div>
            <div className="hero-cta">
              <button className="hero-cta-btn">{hero.cta.label}</button>
              <div className="hero-cta-meta">{hero.cta.meta}</div>
            </div>
          </div>

          {/* KPI STRIP — from backend. Backend returns 5, design has 4 — we render first 4. */}
          <div className="kpi-strip four">
            {kpis.slice(0, 4).map((k) => {
              const delta = k.delta || '';
              // Backend delta strings come with ▲ / ▼ prefixes baked in; we infer direction from that.
              const dir = delta.includes('▲') ? 'up' : delta.includes('▼') ? 'down' : '';
              return (
                <div className="kpi" key={k.label}>
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-val">{k.value}</div>
                  {delta && <div className={'kpi-delta ' + dir}>{delta}</div>}
                </div>
              );
            })}
          </div>

          {/* 3-PILLAR PANEL — from backend */}
          <div className="pillars-panel">
            <div className="pillars-head">
              <div className="pillars-title">
                <div className="pillars-title-h">The Cost of Bad Allocation</div>
                <div className="pillars-title-tag">Three pillars · Quantified</div>
              </div>
              <div className="pillars-total">
                <div className="pillars-total-label">{pillars.total_cost.label}</div>
                <div className="pillars-total-amt">{pillars.total_cost.display}</div>
              </div>
            </div>
            <div className="pillars">
              {pillarsByIndex.map((p) => (
                <div className={'pillar ' + p.id} key={p.id}>
                  <div className="pillar-roman">{p.roman.replace(/\./g, '').toUpperCase()}</div>
                  <div className="pillar-name">{p.name}</div>
                  <div className="pillar-amt">{p.display}</div>
                  <div className="pillar-impact">{p.impact || p.tag}</div>
                  <div className="pillar-desc">{p.description}</div>
                  <div className="pillar-tag">View breakdown →</div>
                </div>
              ))}
            </div>

            {/* Live opportunities overlay — backend returns 3 top opportunities */}
            {opportunities.length > 0 && (
              <div className="annot" style={{ marginTop: 14 }}>
                <strong>Top opportunities —</strong>{' '}
                {opportunities
                  .map((o) => `${o.name} (${o.display})`)
                  .join(' · ')}
              </div>
            )}
          </div>

          {/* WHERE THE VALUE IS — static ValueCards + live top_actions under */}
          <div className="value-section">
            <div className="value-head">
              <div className="value-title">Where the value is</div>
              <div className="value-sort">
                {(['impact', 'urgency', 'confidence'] as const).map((k) => (
                  <button
                    key={k}
                    className={'value-sort-tab' + (sort === k ? ' active' : '')}
                    onClick={() => setSort(k)}
                  >
                    {k === 'impact' ? '$ Impact' : k === 'urgency' ? 'Urgency' : 'Confidence'}
                  </button>
                ))}
              </div>
            </div>
            <div className="value-grid">
              <ValueCard cardKey="rev" sort={sort} />
              <ValueCard cardKey="cx" sort={sort} />
              <ValueCard cardKey="cost" sort={sort} />
            </div>

            {top_actions.length > 0 && (
              <div className="annot" style={{ marginTop: 14 }}>
                <strong>Next best actions —</strong>{' '}
                {top_actions
                  .map((a) => `${a.num}. ${a.text} (${a.impact})`)
                  .join(' · ')}
              </div>
            )}
          </div>

          <KpiTrendChart />
        </div>

        {/* RIGHT RAIL — market context from backend, falls back to static framing */}
        <aside className="rail">
          <div className="rail-panel">
            <div className="rail-panel-h">Market Trends</div>
            <div className="rail-panel-tag">Demand signals · 30 day</div>

            {(() => {
              const peaks = market.data?.upcoming_peaks || [];
              if (market.loading) {
                return <div style={{ padding: 12, color: '#8C92AC' }}>Loading signals…</div>;
              }
              if (peaks.length === 0) {
                return (
                  <div style={{ padding: 12, color: '#8C92AC', fontSize: 13 }}>
                    No upcoming demand peaks in the current macro baseline.
                  </div>
                );
              }
              return (
                <>
                  <div className="rail-section-label">
                    Upcoming windows <span className="rail-section-count">· {peaks.length}</span>
                  </div>
                  {peaks.map((e) => {
                    const dir = e.direction === 'up' ? 'up' : 'down';
                    const pct =
                      (e.direction === 'up' ? '+' : '−') +
                      Math.abs(e.impact_pct).toFixed(0) +
                      '%';
                    return (
                      <div className="event-row" key={e.label}>
                        <div className={'event-dot ' + dir} />
                        <div className="event-body">
                          <div className="event-name">{e.label}</div>
                          <div className="event-meta">
                            In {e.weeks_out} weeks · <strong>{pct}</strong> {e.detail}
                          </div>
                        </div>
                        <div className={'event-impact ' + dir}>{pct}</div>
                      </div>
                    );
                  })}
                </>
              );
            })()}

            {market.data?.atlas_narration && (
              <div className="alert-block">
                <div className="alert-block-h">{market.data.atlas_narration.headline}</div>
                <div className="alert-block-text">{market.data.atlas_narration.detail}</div>
              </div>
            )}

            <div className="rail-foot">
              {market.data?.source
                ? `Source · ${market.data.source}`
                : 'Updated · auto-refreshed'}
            </div>
          </div>
        </aside>
      </div>

      {/* FORK — navigation, no data */}
      <div className="fork">
        <div className="fork-eyebrow-row">
          Two ways to continue · pick the path that matches what you want to do next
        </div>

        <Link to="/opportunities" className="branch opp">
          <div className="branch-eyebrow">
            <span className="branch-icon">◈</span> Path A · Explore moves
          </div>
          <div className="branch-h">
            Browse the opportunities the system has detected for you — and stack the ones worth acting on.
          </div>
          <div className="branch-desc">
            Every strategic and tactical move the tool has found, grouped by category and ranked by impact. Check the ones
            you want to include in your scenario. Each opportunity has a full evidence page behind it.
          </div>
          <div className="branch-foot">
            <div className="branch-stats">
              <span><strong>{opportunities.length || 0}</strong> detected</span>
              <span><strong>{pillars.total_cost.display}</strong> potential</span>
              <span><strong>{top_actions.length}</strong> top actions</span>
            </div>
            <div className="branch-arrow">→</div>
          </div>
        </Link>

        <Link to="/performance" className="branch perf">
          <div className="branch-eyebrow">
            <span className="branch-icon">◆</span> Path B · Diagnose current state
          </div>
          <div className="branch-h">
            See the channel-by-channel diagnosis — where your money goes, where it's working, where it isn't.
          </div>
          <div className="branch-desc">
            The current-state evidence. Pareto of revenue by channel, marginal-ROI frontier, per-channel headroom and
            saturation, campaign drill-in. Pick this path when you want to understand the portfolio before deciding what to do.
          </div>
          <div className="branch-foot">
            <div className="branch-stats">
              <span><strong>channels</strong></span>
              <span><strong>campaigns</strong></span>
              <span><strong>at frontier</strong></span>
            </div>
            <div className="branch-arrow">→</div>
          </div>
        </Link>
      </div>
    </main>
  );
}
