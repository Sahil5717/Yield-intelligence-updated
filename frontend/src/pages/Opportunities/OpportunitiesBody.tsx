/* eslint-disable */
// This file was generated from 02-opportunities.html and preserves the original
// markup verbatim. Interactivity (selection, scenario bar) is wired by the page
// wrapper via event delegation — see index.tsx in this folder.

import { forwardRef, type ReactNode } from 'react';

interface Props {
  autoHint: ReactNode;
  scenarioBar: ReactNode;
}

export const OpportunitiesBody = forwardRef<HTMLElement, Props>(
  function OpportunitiesBody({ autoHint, scenarioBar }, ref) {
    return (
<main className="main" ref={ref}>
    <div className="topbar">
      <div className="topbar-left">
        <div className="screen-num">02</div>
        <div>
          <div className="screen-title">Opportunities</div>
          <div className="screen-sub">Detected moves — browse, stack, and carry forward to Optimize</div>
        </div>
      </div>
      <div className="topbar-right">
        <div className="pill">May 1 – May 31, 2024 ▾</div>
        <div className="pill">⇪ Share</div>
      </div>
    </div>

    {/* ===== Opportunities body ===== */}

    {/* Hero strip */}
    <div className="opps-hero">
      <div className="opps-hero-text">
        <div className="opps-hero-eyebrow"><strong>⚡</strong> DETECTED · 24 MOVES · $6.8M POTENTIAL</div>
        <div className="opps-hero-h">Every strategic and tactical move the system has found for you — <strong>ranked, evidenced, stackable</strong>.</div>
        <div className="opps-hero-sub">Opportunities are detected from your MMM data, the five external signal streams, and the catalog. Check the ones you want to include in your scenario. When you continue to Optimize, the system composes them all into a single modeled portfolio outcome.</div>
      </div>
      <div className="opps-hero-stats">
        <div className="opps-hero-stat">
          <div className="opps-hero-stat-val green">$6.8M</div>
          <div className="opps-hero-stat-label">Annualized potential</div>
        </div>
        <div className="opps-hero-stat">
          <div className="opps-hero-stat-val gold">12</div>
          <div className="opps-hero-stat-label">Quick wins (&lt;30d)</div>
        </div>
      </div>
    </div>

    {/* Auto-selection hint banner */}
    {autoHint}

    {/* Filter chips */}
    <div className="opps-filters">
      <span className="opps-filters-label">Filter:</span>
      <span className="filter-chip active">All <span className="filter-chip-count">24</span></span>
      <span className="filter-chip-divider"></span>
      <span className="filter-chip">Quick wins <span className="filter-chip-count">12</span></span>
      <span className="filter-chip">High confidence <span className="filter-chip-count">9</span></span>
      <span className="filter-chip">$500K+ impact <span className="filter-chip-count">8</span></span>
      <span className="filter-chip-divider"></span>
      <span className="filter-chip">CMO-level <span className="filter-chip-count">7</span></span>
      <span className="filter-chip">Channel lead <span className="filter-chip-count">13</span></span>
      <span className="filter-chip">Ops/IT <span className="filter-chip-count">4</span></span>
    </div>

    {/* ============================================================
         CATEGORY 1 — TACTICAL MOVES
         ============================================================ */}
    <section className="opps-category cat-tactical">
      <div className="opps-category-head">
        <div className="opps-category-title"><span className="opps-category-title-dot"></span>Tactical reallocations</div>
        <div className="opps-category-meta"><strong>6 opportunities</strong> · $1.24M shift value · mostly 0-day implementation</div>
      </div>
      <div className="opp-list">

        <div className="opp-row" data-opp="OPP-001" data-impact="960">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Shift saturated-channel budget to headroom channel</div>
              <span className="opp-id">OPP-001</span>
              <span className="opp-badge mag-l">L · $300K–$500K</span>
              <span className="opp-badge conf-high">High confidence</span>
            </div>
            <div className="opp-desc">Move $300K from Meta Prospecting (past peak, marginal ROI 1.10×) into LinkedIn B2B (well below frontier, marginal ROI 4.20×). Expected incremental revenue ~$960K at steady state. Identified by channel-level MMM curves — highest-confidence move in the catalog.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>Immediate</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Fully reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$960K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Channel-level MMM analysis shows Meta Prospecting past peak (marginal ROI 1.10× · $2.18M spend on $5.88M revenue), while LinkedIn B2B sits well below its efficient frontier (marginal ROI 4.20× · $1.23M spend). Shifting $300K closes ~60% of the visible gap. Expected equilibrium: LinkedIn scales to $1.55M spend at ~3.1× marginal, Meta Pros rebalances to $1.88M at 1.35× marginal.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type spend_shift">spend shift</span><span className="effect-chip-detail">Meta Prospecting → LinkedIn B2B · $300K</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>immediate</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>4 weeks to equilibrium</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Channel MMM · 87% confidence.</strong> Hill curve fit on 90-day spend/revenue window. LinkedIn curve inflection at ~$1.8M, Meta Pros saturation at ~$2.0M.</div><div className="evidence-block signal"><strong>Industry CPM benchmarks (eMarketer).</strong> LinkedIn B2B CPM $52-78 for senior-title audiences; our current effective CPM $61 suggests room to push volume without material CPM inflation.</div>

                
                <div className="evidence-block composition">Compounds multiplicatively with OPP-036 (in-house creative) and OPP-049 (server-side tagging) — both lift the Meta Pros curve so the shifted spend recovers differently. If all three are selected, the net movement shrinks as Meta becomes more efficient.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-003" data-impact="565">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Cut sub-1× ROI campaign at zero</div>
              <span className="opp-id">OPP-003</span>
              <span className="opp-badge mag-l">L · $565K recovered</span>
              <span className="opp-badge conf-high">High confidence</span>
              <span className="opp-badge ready">Quick win</span>
            </div>
            <div className="opp-desc">Eliminate Display Retargeting entirely — the full $565K of current spend. Channel has returned 0.85× for three consecutive quarters with no improvement trajectory. Lowest-risk move in the catalog; freed budget available for redeployment.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>Immediate</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Fully reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$565K</div>
            <div className="opp-impact-label">Waste recovered</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Display Retargeting has returned 0.82×–0.85× ROI for three consecutive quarters — consistently below break-even. Campaign-level diagnostic shows no single underperformer; the entire channel is structurally unprofitable at Acme's current CPM × CVR economics. Cutting eliminates the loss, recovers $565K of budget, and lifts portfolio ROI ~0.05×.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type spend_shift">spend shift</span><span className="effect-chip-detail">Display Retargeting → (unallocated) · $565K</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>immediate</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>next billing cycle</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Channel MMM · 94% confidence.</strong> Incrementality test Mar 2024 confirmed lift was 0.3× — consistent with holdout.</div><div className="evidence-block signal"><strong>Brand safety audit (OPP-080 pending).</strong> ~4-7% of DSP impressions land on MFA sites, inflating the reported ROI further.</div>

                
                <div className="evidence-block composition">Standalone — does not interact with other effects. Cut spend becomes available for redeployment (optional) or net portfolio spend reduction.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-008" data-impact="180">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Scale top-decile LinkedIn campaign</div>
              <span className="opp-id">OPP-008</span>
              <span className="opp-badge mag-m">M · $100K–$300K</span>
              <span className="opp-badge conf-high">High confidence</span>
              <span className="opp-badge ready">Quick win</span>
            </div>
            <div className="opp-desc">LinkedIn_B2B_Decision_Makers campaign is returning 7.05× ROI on $252K spend — 68% above channel average. Adding $180K incremental spend should sustain ROI above 5× based on campaign-level Hill curve.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>Immediate</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Fully reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$720K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">LinkedIn_B2B_Decision_Makers is the top-decile campaign across the portfolio — 7.05× ROI on $252K spend, compared to portfolio average 3.59×. Campaign-level Hill curve suggests adding $180K should sustain ROI above 5× before approaching saturation at ~$500K.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type spend_shift">spend shift</span><span className="effect-chip-detail">Portfolio reserve → LinkedIn_B2B_Decision_Makers · $180K</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>immediate</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 weeks</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Campaign-level MMM · 88% confidence.</strong> 12 weeks of data, stable CVR (2.1%), no creative fatigue signal.</div><div className="evidence-block signal"><strong>Search trend data.</strong> Brand + vertical search interest up 18% YoY per Google Trends — demand is expanding faster than our current spend captures.</div>

                
                <div className="evidence-block composition">Increments the LinkedIn channel total alongside OPP-001. If both selected, aggregate LinkedIn spend rises by $480K — model rechecks saturation to avoid over-scaling.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-012" data-impact="80">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Cap Meta Retargeting frequency</div>
              <span className="opp-id">OPP-012</span>
              <span className="opp-badge mag-s">S · $50K–$100K</span>
              <span className="opp-badge conf-high">High confidence</span>
              <span className="opp-badge ready">Quick win</span>
            </div>
            <div className="opp-desc">Frequency cap reduction from 8/week to 4/week on Meta Retargeting. Analytics show 40% of impressions after 4th view drive no incremental conversion. Frees ~$80K while lifting channel marginal ROI ~5%.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>1 week</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$140K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Meta Retargeting frequency cap at 8/week is industry-high. Impression logs show 40% of impressions after 4th view drive zero incremental conversion. Dropping to 4/week returns ~$80K of budget and lifts channel marginal ROI ~5% by concentrating spend on higher-incremental reach.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type spend_shift">spend shift</span><span className="effect-chip-detail">Meta Retargeting (cut wasteful frequency) · $80K</span></span><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Meta RT · +5% marginal ROI</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>1 week</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>immediate</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Frequency diminishing-returns study.</strong> Holdout group exposed at 4/week converted at 0.98× vs. 8/week group — no meaningful lift from additional impressions.</div>

                
                <div className="evidence-block composition">Standalone. Does interact mildly with OPP-049 (server-side tagging) — both affect Meta RT, so curve shifts compose multiplicatively.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-014" data-impact="145">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Trim NB Search low-intent keywords</div>
              <span className="opp-id">OPP-014</span>
              <span className="opp-badge mag-m">M · $100K–$200K</span>
              <span className="opp-badge conf-high">High confidence</span>
            </div>
            <div className="opp-desc">Cut $145K from NB Search keywords scoring below 1.5× conversion-rate index. Analysis of 847-keyword portfolio shows bottom 18% contributes 4% of revenue but consumes 14% of spend. Lifts channel marginal ROI ~4%.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>1 week</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Fully reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$280K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">NB Search keyword portfolio (847 keywords) has a long tail — bottom 18% of keywords by conversion-rate-index contribute 4% of revenue but consume 14% of spend. Negative-match these terms and reallocate $145K. Channel marginal ROI lifts ~4%.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type spend_shift">spend shift</span><span className="effect-chip-detail">NB Search low-intent keywords (cut) · $145K</span></span><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">NB Search · +4% marginal ROI</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>1 week</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 weeks</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Campaign-level quality score regression.</strong> Low-CVR-index keywords are also low Quality Score — suggesting the problem is both audience-intent fit and ad-platform penalty.</div><div className="evidence-block signal"><strong>Search trend data.</strong> Bottom 18% terms show declining search volume (−12% trailing 90 days), confirming they are dying-tail queries.</div>

                
                <div className="evidence-block composition">Standalone. Frees budget that can redeploy elsewhere or reduce portfolio spend.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-018" data-impact="60">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Geo adjustment — expand Email program to Tier-2 markets</div>
              <span className="opp-id">OPP-018</span>
              <span className="opp-badge mag-s">S · $40K–$80K</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Email program currently concentrated in NY/LA/Chicago. Tier-2 markets (Austin, Denver, Seattle, Phoenix) show 2.1× purchase propensity on first-party data but under-indexed send volume. Expansion adds ~$60K spend, expected $170K return.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>2 weeks</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$170K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">First-party data shows Tier-2 markets (Austin, Denver, Seattle, Phoenix) have 2.1× purchase propensity vs. Tier-1 (NY/LA/Chicago) — but receive only 14% of email send volume despite being 31% of active subscribers. Expanding program adds $60K annualized spend (templates + ESP tier) and targets $170K incremental revenue.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Email · +12% marginal ROI (higher-propensity audience mix)</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$10K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 weeks</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>1 month</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>First-party purchase data · Shopify + HubSpot.</strong> Tier-2 conversion rate 4.2% vs. 2.0% Tier-1.</div><div className="evidence-block signal"><strong>Calendar / seasonality signal.</strong> Tier-2 markets over-index on summer-seasonal categories, aligning with mid-year promo calendar.</div>

                
                <div className="evidence-block composition">Standalone. Compounds slightly with OPP-067 (lifecycle email upgrade) — both lift the Email channel curve.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ============================================================
         CATEGORY 2 — REVENUE UPLIFT / STRATEGIC-CHANNEL
         ============================================================ */}
    <section className="opps-category cat-revenue">
      <div className="opps-category-head">
        <div className="opps-category-title"><span className="opps-category-title-dot"></span>Revenue uplift — new channels</div>
        <div className="opps-category-meta"><strong>4 opportunities</strong> · $2.1M total potential · 2-6 month ramp</div>
      </div>
      <div className="opp-list">

        <div className="opp-row" data-opp="OPP-021" data-impact="1120">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Launch CTV/streaming TV testing on Hulu/Roku/Pluto</div>
              <span className="opp-id">OPP-021</span>
              <span className="opp-badge mag-xl">XL · $800K–$1.4M</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Connected TV is absent from your current mix. Industry CPM benchmarks (eMarketer) and competitor spend data (Pathmatics) indicate category fit. $400K test budget to validate curve shape; peak marginal ROI estimated 2.80×, saturation at ~$1.2M annual. External signal dependency: industry CPM data + competitor CTV spend estimates.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>2 weeks setup · 3mo ramp</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Reversible after test</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>CMO + Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$1.12M</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Connected TV is absent from the current mix. Category fit validated by three signals: (1) competitor CTV spend up 34% YoY per Pathmatics, (2) industry CPM benchmark $38-52 in target verticals, (3) Acme audience overlap with CTV viewership ~67% per Nielsen panel. $400K test budget over 3 months to validate curve shape; if curve confirms, scale to ~$1.2M at saturation.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type new_channel">new channel</span><span className="effect-chip-detail">Connected TV · test $400K · peak mROI 2.80× · saturation $1.2M</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$40K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 weeks setup</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>3 months to curve validation</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Industry CPM/CPC benchmarks (eMarketer).</strong> CTV CPM $38-52 for our vertical; competitor inventory available on Hulu/Roku/Pluto at benchmark rates.</div><div className="evidence-block signal"><strong>Competitor promo intel (Pathmatics).</strong> 4 of 7 tracked competitors running CTV; 2 increased spend 2-3× YoY.</div><div className="evidence-block signal"><strong>Nielsen/Comscore audience.</strong> 67% overlap between Acme first-party audience and adults 18-49 CTV daily reach.</div>

                
                <div className="evidence-block composition">NEW_CHANNEL adds a 10th curve to the portfolio. Test spend can be sourced from the $565K freed by OPP-003 (Display RT cut) without raising total spend.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-024" data-impact="420">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Launch Pinterest paid program for visual categories</div>
              <span className="opp-id">OPP-024</span>
              <span className="opp-badge mag-m">M · $300K–$500K</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Pinterest absent from current mix despite strong vertical fit (home, beauty, apparel lines account for 62% of revenue). Peak marginal ROI estimated 2.80× based on similar-vertical benchmarks. $80K test budget, $350K saturation. Cohort likely overlaps &lt;15% with existing Meta Prospecting audience.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>2 weeks setup</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$420K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Pinterest is absent from current mix despite strong vertical fit — home, beauty, apparel lines drive 62% of revenue, and Pinterest skews heavily toward those categories. Peer benchmarks (eMarketer) show peak marginal ROI ~2.80× for verticals like Acme's. $80K test budget; saturation near $350K.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type new_channel">new channel</span><span className="effect-chip-detail">Pinterest · test $80K · peak mROI 2.80× · saturation $350K</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$15K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 weeks setup</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 months</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Industry CPM benchmarks (Statista).</strong> Pinterest CPM $18-26 for visual-shopper audience; lower than Meta for equivalent intent.</div><div className="evidence-block signal"><strong>First-party product-affinity analysis.</strong> 62% of current revenue from Pinterest-affinity categories (home, beauty, apparel).</div><div className="evidence-block signal"><strong>Audience overlap estimate.</strong> &lt;15% overlap with existing Meta Prospecting audience — largely incremental reach.</div>

                
                <div className="evidence-block composition">NEW_CHANNEL adds a curve. Overlap with Meta Prospecting is modest, so net incremental revenue retains &gt;85% of the projected curve.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-026" data-impact="280">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Launch affiliate / partnership channel</div>
              <span className="opp-id">OPP-026</span>
              <span className="opp-badge mag-m">M · $200K–$400K</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Partnership/affiliate channel underutilized. $100K test with ShareASale + 2 premium partners; peak marginal ROI ~3.20×, $400K saturation. Partner revenue-share model caps downside; payments only on attributed sales. Accumulates value over 6-month ramp.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>3 month ramp</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Contract cancellable</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$280K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Partnership / affiliate channel underutilized. ShareASale integration with 2 premium partners can activate performance-based partner revenue share. $100K test budget (partner payouts only on attributed sales). Peak marginal ROI estimated 3.20× based on industry benchmarks for mid-market DTC. Ramp over 6 months as partner catalog stabilizes.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type new_channel">new channel</span><span className="effect-chip-detail">Affiliate · test $100K · peak mROI 3.20× · saturation $400K</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$25K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>6 weeks setup</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>6 months to stable curve</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Industry benchmarks (Forrester affiliate report 2024).</strong> Mid-market DTC affiliate ROI range 2.8-3.6× at similar scale.</div><div className="evidence-block signal"><strong>Partner pipeline diligence.</strong> 2 premium partners pre-qualified with audience fit &gt;70%.</div>

                
                <div className="evidence-block composition">NEW_CHANNEL. Partner revenue-share model caps downside — payments only trigger on attributed sales, so worst-case loss is bounded by integration cost.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-028" data-impact="240">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Launch SMS/messaging program</div>
              <span className="opp-id">OPP-028</span>
              <span className="opp-badge mag-s">S · $80K–$200K</span>
              <span className="opp-badge conf-high">High confidence</span>
              <span className="opp-badge ready">Quick win</span>
            </div>
            <div className="opp-desc">SMS channel not launched. Post-purchase + cart-abandon SMS drives strong ROI (peer benchmarks 3.20× peak marginal). First-party data from Shopify ready. Small initial spend ($40K); scales to $180K at saturation within 2 months.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>2 week setup</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$240K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">SMS / messaging program not launched. Post-purchase + cart-abandon SMS drives strong ROI across peer benchmarks (3.20× peak marginal). First-party opt-in database from Shopify already contains 187K consented numbers. Small initial spend ($40K/mo at launch); scales to $180K at saturation within 2 months.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type new_channel">new channel</span><span className="effect-chip-detail">SMS/messaging · test $40K · peak mROI 3.20× · saturation $180K</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$8K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 weeks setup</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 months</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>First-party consent base (Shopify).</strong> 187K opted-in subscribers; avg. 2.1 orders per customer-year.</div><div className="evidence-block signal"><strong>Industry benchmarks.</strong> Klaviyo/Attentive benchmarks: SMS ROI 4-6× for retail at post-purchase/abandon triggers.</div>

                
                <div className="evidence-block composition">NEW_CHANNEL. Independent of other effects — SMS audience cohort has minimal overlap with other acquisition channels.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ============================================================
         CATEGORY 3 — COST REDUCTION / STRATEGIC-COST
         ============================================================ */}
    <section className="opps-category cat-cost">
      <div className="opps-category-head">
        <div className="opps-category-title"><span className="opps-category-title-dot"></span>Cost reduction — operating savings</div>
        <div className="opps-category-meta"><strong>3 opportunities</strong> · $620K annual savings · mostly within this quarter</div>
      </div>
      <div className="opp-list">

        <div className="opp-row" data-opp="OPP-052" data-impact="400" data-mutex="OPP-053">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Renegotiate media agency contract</div>
              <span className="opp-id">OPP-052</span>
              <span className="opp-badge mag-l">L · $350K–$500K</span>
              <span className="opp-badge conf-high">High confidence</span>
              <span className="opp-badge ready">Quick win</span>
            </div>
            <div className="opp-desc">Current agency fee percentage (6.2% of media spend) is above industry benchmark (4.1% for $8M spend tier per Forrester 2024 Marketing Services Survey). Renegotiate to benchmark or move to performance-based structure. Saves ~$400K annually. Realizes at next contract renewal in 3 months.</div>
            <div className="opp-warn">⚠ Mutex with OPP-053 — can renegotiate or replace, not both</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>3 months · contract renewal</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>One-time decision</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>CMO</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt cost">−$400K</div>
            <div className="opp-impact-label">Annual savings</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Current agency fee percentage is 6.2% of media spend — above industry benchmark 4.1% for the $8M spend tier (Forrester 2024 Marketing Services Survey). Renegotiate to benchmark or move to performance-based structure. Annual savings ~$400K. Realizes at next contract renewal in 3 months. Mutex with OPP-053 (replace agency) — can renegotiate OR replace, not both.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type cost_reduction">cost reduction</span><span className="effect-chip-detail">Agency fees · −$400K annual</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$10K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>3 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>savings realize at contract renewal</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Forrester 2024 Marketing Services Survey.</strong> Median agency fee at $8M spend tier: 4.1%; Acme currently 6.2%.</div><div className="evidence-block signal"><strong>Contract renewal timing.</strong> Current MSA expires 90 days out; leverage window is open.</div>

                <div className="evidence-block dependency"><strong>Mutex: OPP-053 (replace agency).</strong> Selecting both is invalid — system auto-deselects one when the other is selected.</div>
                <div className="evidence-block composition">Cost reduction reduces portfolio spend denominator. Does not affect channel curves.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-053" data-impact="300" data-mutex="OPP-052">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Replace media agency (performance-based RFP)</div>
              <span className="opp-id">OPP-053</span>
              <span className="opp-badge mag-m">M · $200K–$400K</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Alternative to OPP-052. RFP new agency on performance-based structure (fee tied to marginal-ROI improvements). Higher potential savings long-term but ~6 month transition cost. Saves ~$300K annually after ramp. Choose this if current agency is unresponsive.</div>
            <div className="opp-warn">⚠ Mutex with OPP-052 — can renegotiate or replace, not both</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>6 month transition</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Difficult to reverse</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>CMO</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt cost">−$300K</div>
            <div className="opp-impact-label">Annual savings</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Alternative to OPP-052: RFP a new agency on performance-based structure (fee tied to marginal-ROI improvements, not spend percentage). Higher potential savings long-term but ~6 month transition cost, including onboarding, knowledge transfer, and creative handoff. Annual savings ~$300K after ramp.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type cost_reduction">cost reduction</span><span className="effect-chip-detail">Agency fees · −$300K annual (after transition)</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$100K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>6 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>savings realize after transition complete</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Peer reference (industry network).</strong> 3 referenceable performance-based agency engagements in similar verticals.</div>

                <div className="evidence-block dependency"><strong>Mutex: OPP-052 (renegotiate current agency).</strong> Replace is more disruptive; choose this if current agency is unresponsive to renegotiation.</div>
                <div className="evidence-block composition">Cost reduction. 6-month transition introduces execution risk — model this opp in pessimistic risk scenario.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-055" data-impact="120">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Consolidate measurement tool stack</div>
              <span className="opp-id">OPP-055</span>
              <span className="opp-badge mag-s">S · $80K–$150K</span>
              <span className="opp-badge conf-high">High confidence</span>
              <span className="opp-badge ready">Quick win</span>
            </div>
            <div className="opp-desc">Currently paying for 3 overlapping measurement platforms (Supermetrics + Fivetran + Segment). Consolidate to Fivetran + Segment; migrate 7 Supermetrics flows. Saves $100K annual subscriptions + $20K in internal maintenance.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>3 months</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Ops / IT</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt cost">−$120K</div>
            <div className="opp-impact-label">Annual savings</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Currently paying for 3 overlapping measurement platforms: Supermetrics, Fivetran, Segment. Audit of data flows shows Supermetrics is redundant — all 7 Supermetrics flows can migrate to Fivetran + Segment. Migration effort ~3 months for Ops/IT. Saves $100K annual subscription + $20K internal maintenance.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type cost_reduction">cost reduction</span><span className="effect-chip-detail">Tool subscription · −$120K annual</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$20K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>3 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>savings realize as Supermetrics sunset</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Internal vendor audit.</strong> Data-flow mapping shows 100% coverage via Fivetran + Segment post-migration.</div>

                
                <div className="evidence-block composition">Cost reduction. Independent of channel curves.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ============================================================
         CATEGORY 4 — CX UPLIFT / STRATEGIC-CX
         ============================================================ */}
    <section className="opps-category cat-cx">
      <div className="opps-category-head">
        <div className="opps-category-title"><span className="opps-category-title-dot"></span>CX uplift — conversion & LTV</div>
        <div className="opps-category-meta"><strong>4 opportunities</strong> · $2.4M lift potential · 3-6 month ramp</div>
      </div>
      <div className="opp-list">

        <div className="opp-row" data-opp="OPP-062" data-impact="1810">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Implement one-page / accelerated checkout</div>
              <span className="opp-id">OPP-062</span>
              <span className="opp-badge mag-xl">XL · $1.5M–$2.1M</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Multi-step checkout drives mobile cart abandonment. One-page checkout with Shop Pay + Apple Pay default lifts conversion rate 6% across all channels proportionally. Does not change channel acquisition performance — multiplies how well acquired traffic converts. Applies to $30.19M revenue base.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>3 month implementation</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>CMO + Product</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$1.81M</div>
            <div className="opp-impact-label">CVR lift · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Multi-step checkout (4 steps, 2.1% mobile CVR) drives significant mobile cart abandonment. Implementing one-page checkout with Shop Pay + Apple Pay default is a well-studied intervention — lifts CVR ~6% across all acquisition channels proportionally. Does not change channel acquisition performance; multiplies how well acquired traffic converts. Applied to $30.19M revenue base, yields ~$1.81M annualized.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type cx_lift">cx lift</span><span className="effect-chip-detail">CVR · 1.06× across all channels</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$120K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">$12K/yr</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>3 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>full effect at launch</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Industry study (Baymard Institute 2024).</strong> One-page checkout lifts CVR 4-8% in ecommerce across 13 referenced case studies.</div><div className="evidence-block signal"><strong>Current mobile CVR diagnostic.</strong> 61% of traffic is mobile, mobile CVR 2.1% vs. desktop 3.4% — the gap is checkout-flow-attributable.</div>

                
                <div className="evidence-block composition">CX_LIFT multiplies post-acquisition revenue. Compounds with ALL channel-curve shifts — if in-house creative lifts Meta ROI 15% and one-page checkout lifts CVR 6%, combined Meta channel revenue multiplier is 1.15 × 1.06 = 1.22 (not additive).</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-064" data-impact="0">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Launch or restructure loyalty program</div>
              <span className="opp-id">OPP-064</span>
              <span className="opp-badge mag-xl">XL · $3M+ LTV</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Loyalty program drives repeat purchase and lifts LTV 15% across all channels. Shifts the LTV/CAC framework — unlocks profitable spend at channels that were marginal on first-purchase economics alone. Note: LTV lift affects future-period ROI, not current-period portfolio ROI (separate metric in Optimize).</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>6 month ramp</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Difficult to reverse</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>CMO</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+15% LTV</div>
            <div className="opp-impact-label">Future-period metric</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Loyalty program drives repeat purchase. Launch or restructure to lift customer LTV 15% via tiered rewards, referral mechanics, and lifecycle integration. Note: LTV lift affects future-period ROI (by making profitable CAC higher, which enables profitable scale at additional channels), not current-period portfolio ROI. Separate metric in Optimize — shown as +15% LTV rather than direct revenue uplift.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type cx_lift">cx lift</span><span className="effect-chip-detail">LTV · 1.15× across all channels</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$200K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">$80K/yr</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>6 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>6 months to mature</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Peer loyalty benchmarks.</strong> Well-designed retail loyalty programs lift LTV 12-18% at maturity.</div>

                
                <div className="evidence-block composition">CX_LIFT on LTV does not flow into current-period portfolio ROI. It shifts the LTV/CAC frame — enables profitable spend at channels that were marginal on first-purchase economics alone. See Optimize LTV/CAC panel.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-067" data-impact="420">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Upgrade lifecycle email program</div>
              <span className="opp-id">OPP-067</span>
              <span className="opp-badge mag-l">L · $350K–$500K</span>
              <span className="opp-badge conf-high">High confidence</span>
              <span className="opp-badge ready">Quick win</span>
            </div>
            <div className="opp-desc">Current email program uses 6 lifecycle triggers; benchmark for vertical is 18. Adding abandoned-browse, post-purchase cross-sell, replenishment, birthday, and winback flows lifts repeat-purchase rate ~12%. Translates to $420K incremental annualized.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>3 month buildout</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$420K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Current email program uses 6 lifecycle triggers; benchmark for vertical is 18. Adding abandoned-browse, post-purchase cross-sell, replenishment, birthday, winback, and 2 onboarding flows lifts repeat-purchase rate ~12%. Translates to $420K incremental annualized on the email channel.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Email · +12% marginal ROI (more triggers = more incremental revenue per send)</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$30K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">$8K/yr</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>3 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>3 months to full trigger catalog live</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Lifecycle benchmark (Klaviyo 2024 benchmarks).</strong> 18 triggers is median for retail &gt;$10M GMV; Acme has 6.</div><div className="evidence-block signal"><strong>First-party behavioral data.</strong> Abandoned-browse events alone represent 340K weekly untriggered opportunities.</div>

                
                <div className="evidence-block composition">Email curve shift compounds with OPP-018 (Tier-2 expansion) — both lift the same channel. Composition is multiplicative.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-069" data-impact="180">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Optimize mobile site speed (Core Web Vitals)</div>
              <span className="opp-id">OPP-069</span>
              <span className="opp-badge mag-s">S · $120K–$250K</span>
              <span className="opp-badge conf-high">High confidence</span>
            </div>
            <div className="opp-desc">Mobile LCP currently 3.8s (benchmark 2.5s). Each 100ms improvement lifts conversion ~1% per industry studies. Engineering effort estimated 2 months. Conservative 4% CVR lift on mobile traffic (61% of total); $180K annualized.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>2 months</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Permanent improvement</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Product / Eng</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$180K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Mobile Largest Contentful Paint (LCP) currently 3.8s; Google benchmark 2.5s. Each 100ms improvement lifts conversion ~1% per HTTP Archive + Shopify internal studies. Engineering effort 2 months (image optimization, JS bundle reduction, CDN). Conservative 4% CVR lift on mobile traffic (61% of total) = $180K annualized.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type cx_lift">cx lift</span><span className="effect-chip-detail">CVR · 1.04× across all channels (mobile-weighted)</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$60K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>improvements ship incrementally</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>HTTP Archive + Shopify studies.</strong> LCP improvement drives ~1% CVR lift per 100ms in ecommerce.</div><div className="evidence-block signal"><strong>Current Core Web Vitals.</strong> LCP 3.8s (poor threshold), FID 88ms (good), CLS 0.12 (needs improvement).</div>

                
                <div className="evidence-block composition">CX_LIFT on CVR. Compounds multiplicatively with OPP-062 (one-page checkout) — both lift CVR for the same post-acquisition funnel.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ============================================================
         CATEGORY 5 — CAPABILITY / STRATEGIC-CAPABILITY
         ============================================================ */}
    <section className="opps-category cat-capability">
      <div className="opps-category-head">
        <div className="opps-category-title"><span className="opps-category-title-dot"></span>Capability — compounds with other moves</div>
        <div className="opps-category-meta"><strong>3 opportunities</strong> · lift multiple channel curves · 2-9 month ramp</div>
      </div>
      <div className="opp-list">

        <div className="opp-row" data-opp="OPP-049" data-impact="1380">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Implement server-side tagging (CAPI + sGTM)</div>
              <span className="opp-id">OPP-049</span>
              <span className="opp-badge mag-l">L · $1.2M–$1.6M</span>
              <span className="opp-badge conf-high">High confidence</span>
            </div>
            <div className="opp-desc">Recover conversions lost to iOS 14+ browser blocking. Server-side tagging restores attribution signal. Lifts attributed marginal ROI 12% for Meta Prospecting, 15% for Meta Retargeting, 5% for Non-brand Search. Compounds with in-house creative (OPP-036) — both affect Meta channels multiplicatively.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>2 month implementation</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Permanent improvement</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Ops / IT</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$1.38M</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">iOS 14+ Safari/Firefox privacy changes block ~15-20% of web-based conversion signals. Server-side tagging (Meta CAPI + server-side GTM) routes conversion events through Acme's server, bypassing browser restrictions. Recovers attributed revenue: Meta Prospecting +12% marginal ROI, Meta Retargeting +15%, Non-brand Search +5%. Compounds with in-house creative — both lift Meta curves.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Meta Prospecting · +12% marginal ROI</span></span><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Meta Retargeting · +15% marginal ROI</span></span><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Non-brand Search · +5% marginal ROI</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$80K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">$24K/yr</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>2 months to stable signal</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Meta CAPI benchmarks (Meta-published).</strong> CAPI recovers 10-20% of iOS-lost conversions; our current attribution gap on Meta is ~18%.</div><div className="evidence-block signal"><strong>Industry CPM benchmarks.</strong> Effective CPM drops 8-15% post-CAPI as Meta's model gets fuller signal — a secondary benefit beyond just attribution recovery.</div>

                
                <div className="evidence-block composition">CURVE_SHIFT on 3 channels. Compounds multiplicatively with OPP-036 (in-house creative, also lifts Meta). If both selected, combined Meta Pros lift is 1.12 × 1.15 = 1.288 (28.8% not 27%).</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-036" data-impact="980">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Build in-house creative team for paid social</div>
              <span className="opp-id">OPP-036</span>
              <span className="opp-badge mag-l">L · $800K–$1.2M</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Agency creative cycle is bottlenecking iteration (2-3 week cycle vs. peer benchmark 3-5 days). In-house team of 3 (Creative Lead + 2 producers) enables test-and-learn at platform speed. Lifts Meta Prospecting marginal ROI ~15% and Meta Retargeting ~12% at every spend level. $80K one-time + $380K annual team cost.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>6 month ramp</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Difficult to reverse</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>CMO</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$980K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Agency creative cycle 2-3 weeks vs. peer benchmark 3-5 days is bottlenecking iteration on Meta. In-house team (Creative Lead + 2 producers + motion designer) enables daily iteration. Lifts Meta Prospecting marginal ROI ~15% and Meta Retargeting ~12% at every spend level via faster creative-market-fit loops. $80K one-time (hiring + setup) + $380K annual team cost.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Meta Prospecting · +15% marginal ROI</span></span><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Meta Retargeting · +12% marginal ROI</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$80K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">$380K/yr</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>6 month ramp</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>lift builds gradually over 6 months</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Peer reference study.</strong> 4 referenceable in-housing engagements — median Meta lift 14% at maturity (6 months post-hire).</div><div className="evidence-block signal"><strong>Creative velocity diagnostic.</strong> Current creative tests: 2.1/week. Post-in-housing target: 8-10/week.</div>

                
                <div className="evidence-block composition">CURVE_SHIFT on 2 channels. Compounds with OPP-049 (server-side tagging) multiplicatively — both lift the same Meta curves.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-088" data-impact="540">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Build editorial/content engine for organic growth</div>
              <span className="opp-id">OPP-088</span>
              <span className="opp-badge mag-m">M · $400K–$700K</span>
              <span className="opp-badge conf-low">Low confidence</span>
            </div>
            <div className="opp-desc">Organic Search is a top-3 revenue channel but nearly saturated at current content volume. Investing in editorial engine (2 writers + SEO lead + content ops) lifts Organic Search curve ~25% over 12 months. $30K one-time + $200K annual team cost. Long ramp; lowest-confidence move in this category.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>12 month buildout</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Difficult to reverse</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>CMO</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt">+$540K</div>
            <div className="opp-impact-label">Standalone · annualized</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Organic Search is top-3 revenue channel but nearly saturated at current content output (12 pieces/month). Editorial engine investment (2 writers + SEO lead + content ops) lifts Organic Search curve ~25% over 12 months by expanding addressable keyword surface. $30K one-time + $200K annual team cost. Long ramp; this is the lowest-confidence bet in the Capability category.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Organic Search · +25% marginal ROI (over 12 months)</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$30K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">$200K/yr</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>12 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>content compounds; lift materializes Q3-Q4</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Search trend data.</strong> Addressable keyword volume in vertical has grown 28% YoY; our current content captures ~11% vs. peer median 18%.</div><div className="evidence-block signal"><strong>Peer content engines.</strong> 3 referenceable content-engine builds — median Organic lift 22% at 12 months.</div>

                
                <div className="evidence-block composition">CURVE_SHIFT on Organic. Long ramp makes it a multi-quarter commitment; pessimistic risk scenario should assume 12% lift vs. 25% target.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ============================================================
         CATEGORY 6 — DEFENSIVE
         ============================================================ */}
    <section className="opps-category cat-defensive">
      <div className="opps-category-head">
        <div className="opps-category-title"><span className="opps-category-title-dot"></span>Defensive — risk reduction</div>
        <div className="opps-category-meta"><strong>4 opportunities</strong> · protects $1.2M+ of current revenue from known risks</div>
      </div>
      <div className="opp-list">

        <div className="opp-row" data-opp="OPP-071" data-impact="600">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Achieve full GDPR/CCPA/state-law privacy compliance</div>
              <span className="opp-id">OPP-071</span>
              <span className="opp-badge mag-m">M · $400K–$800K at-risk</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Current consent-management implementation misses ~12% of required state-law-specific flows (Colorado, Virginia, Connecticut, Texas). Regulatory risk ~$600K in potential fines + 40% exposure to consent-gated retargeting revenue. Fix takes 3-6 month rollout via OneTrust + internal eng.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>3-6 months</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Must-have</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Legal + Ops</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt defensive">$600K</div>
            <div className="opp-impact-label">Revenue protected</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Current consent-management implementation misses ~12% of required state-law-specific flows (Colorado, Virginia, Connecticut, Texas). Regulatory risk: ~$600K in potential fines (based on per-violation maximums × estimated non-compliant events). Fix is 3-6 month rollout via OneTrust + internal eng. Protects 40% of consent-gated retargeting revenue from audit-triggered disablement.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Portfolio · +2% (prevents erosion from mandated retargeting restrictions)</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$60K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">$30K/yr</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>3-6 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>fix is step-function at rollout</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>External counsel review (Q1 2024).</strong> 12% state-law gap identified across 4 states.</div><div className="evidence-block signal"><strong>Regulatory precedent.</strong> 2 peer retailers received $400K-$900K fines for similar gaps in 2023-2024.</div>

                
                <div className="evidence-block composition">Defensive — prevents future loss rather than creating upside. Current-period ROI impact minimal; risk-adjusted NPV positive.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-074" data-impact="400">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Cookieless measurement readiness</div>
              <span className="opp-id">OPP-074</span>
              <span className="opp-badge mag-m">M · $300K–$500K at-risk</span>
              <span className="opp-badge conf-med">Medium confidence</span>
            </div>
            <div className="opp-desc">Third-party cookies are phasing out. Current measurement stack relies on 3P cookies for 34% of cross-channel attribution. Migrate to first-party ID graph + modeled conversions before sunset. Protects ~$400K of attributed revenue from measurement gap.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>9 month rollout</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Must-have by Q4</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Ops / IT</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt defensive">$400K</div>
            <div className="opp-impact-label">Revenue protected</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Third-party cookies phasing out. Current measurement stack relies on 3P cookies for 34% of cross-channel attribution. Migrate to first-party ID graph + modeled conversions before sunset (Chrome H2 2024, others earlier). Protects ~$400K of attributed revenue from measurement gap that would otherwise lead to misallocated budget.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Portfolio · +4% (restores lost attribution signal)</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$80K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">$40K/yr</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>9 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>rollout in stages</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Attribution dependency audit.</strong> 34% of cross-channel attribution currently traverses 3P cookies.</div><div className="evidence-block signal"><strong>Industry cookieless timeline.</strong> Chrome Q3 2024, Safari/Firefox already enforced.</div>

                
                <div className="evidence-block composition">Defensive + Capability blend. Prevents measurement-gap erosion; compounds mildly with OPP-049 (server-side tagging).</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-077" data-impact="180">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Diversify vendor concentration on Meta</div>
              <span className="opp-id">OPP-077</span>
              <span className="opp-badge mag-s">S · $150K–$250K at-risk</span>
              <span className="opp-badge conf-low">Low confidence</span>
            </div>
            <div className="opp-desc">Meta (Prospecting + Retargeting) represents 34% of paid media spend. Platform policy changes, ad-account suspensions, or algorithm shifts could drop attributed ROI 10-20% overnight. Launching CTV or Pinterest (see Revenue Uplift category) reduces concentration. Defensive benefit: ~$180K.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>6 month diversification</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Reversible</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>CMO</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt defensive">$180K</div>
            <div className="opp-impact-label">Concentration risk</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Meta (Prospecting + Retargeting) represents 34% of paid media spend. Platform-concentration risk: policy changes, ad-account suspensions, or algorithm shifts could drop attributed ROI 10-20% overnight. Launching CTV (OPP-021) or Pinterest (OPP-024) diversifies concentration. Defensive benefit: ~$180K protected vs. worst-case platform event.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type curve_shift">curve shift</span><span className="effect-chip-detail">Portfolio · +2% (reduces single-platform tail risk)</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">—</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>6 months</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>benefit builds as alternate channels scale</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>Concentration analysis.</strong> Meta share 34%; healthy portfolio benchmark &lt;25% in any single platform.</div><div className="evidence-block signal"><strong>Platform event history.</strong> 2 peer retailers lost 15-22% of Meta ROI in 2023 platform policy changes.</div>

                
                <div className="evidence-block composition">Defensive — overlapping benefit with OPP-021 and OPP-024 (both launch alternative channels). If either is selected, most of this defensive benefit is already captured; selecting all three double-counts slightly.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="opp-row" data-opp="OPP-080" data-impact="120">
          <div className="opp-check"></div>
          <div className="opp-body">
            <div className="opp-title-row">
              <div className="opp-title">Brand safety audit on programmatic placements</div>
              <span className="opp-id">OPP-080</span>
              <span className="opp-badge mag-s">S · $80K–$150K at-risk</span>
              <span className="opp-badge conf-high">High confidence</span>
              <span className="opp-badge ready">Quick win</span>
            </div>
            <div className="opp-desc">Audit 2024 programmatic placements (Display Retargeting + historical DSP spend) for brand-unsafe contexts via IAS or DoubleVerify. Estimated 4-7% of impressions on MFA (made-for-advertising) sites. One-time $12K audit cost; ongoing ~$20K/year monitoring.</div>
            <div className="opp-meta">
              <span className="opp-meta-item">⏱ <strong>1 month audit + ongoing</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">↺ <strong>Ongoing monitor</strong></span>
              <span className="opp-meta-dot"></span>
              <span className="opp-meta-item">👤 <strong>Channel lead</strong></span>
            </div>
          </div>
          <div className="opp-impact">
            <div className="opp-impact-amt defensive">$120K</div>
            <div className="opp-impact-label">Waste prevented</div>
            <a href="#" className="opp-details-link">Details →</a>
          </div>
        
          <div className="opp-details">
            <div className="opp-details-grid">
              <div className="opp-details-section">
                <div className="opp-details-h">Full rationale</div>
                <div className="opp-details-body">Audit 2024 programmatic placements (Display Retargeting + historical DSP spend) for brand-unsafe contexts via IAS or DoubleVerify. Estimated 4-7% of impressions landing on MFA (made-for-advertising) sites. One-time $12K audit cost + $20K/year ongoing monitoring. Recovers waste + protects brand.</div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Schema effects</div>
                <div className="opp-details-body"><span className="effect-chip"><span className="effect-chip-type cost_reduction">cost reduction</span><span className="effect-chip-detail">Display RT waste · −$120K annual</span></span></div>
              </div>

              <div className="opp-details-section">
                <div className="opp-details-h">Implementation</div>
                <div className="details-meta-grid">
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">One-time cost</div>
                    <div className="details-meta-item-val">$12K</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Annual cost</div>
                    <div className="details-meta-item-val">$20K/yr</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Timing</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>1 month audit</div>
                  </div>
                  <div className="details-meta-item">
                    <div className="details-meta-item-label">Ramp</div>
                    <div className="details-meta-item-val" style={{fontSize: "12px"}}>ongoing monitoring</div>
                  </div>
                </div>

                <div className="opp-details-h" style={{marginTop: "12px"}}>Evidence</div>
                <div className="evidence-block signal"><strong>ANA MFA study 2024.</strong> ~15% of open-exchange programmatic spend lands on MFA sites industry-wide; 4-7% after basic vendor screening.</div><div className="evidence-block signal"><strong>Current vendor pre-bid filtering.</strong> Basic category blocking in place but no MFA-specific filter — gap in coverage.</div>

                
                <div className="evidence-block composition">Becomes moot if OPP-003 (cut Display RT entirely) is selected — the waste being audited is already eliminated. Not mutex but highly correlated.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* Sticky scenario bar (appears when any opportunity selected) */}
    {scenarioBar}
    </main>
    );
  },
);
