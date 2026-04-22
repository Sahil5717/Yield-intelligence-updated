/* eslint-disable */
// Generated from 03-performance.html. Preserves the original markup verbatim.

import { forwardRef } from 'react';

export const PerformanceBody = forwardRef<HTMLElement>(function PerformanceBody(_props, ref) {
  return (
<main className="main" ref={ref}>
    <div className="topbar">
      <div className="topbar-left">
        <div className="screen-num">03</div>
        <div>
          <div className="screen-title">Performance</div>
          <div className="screen-sub">Diagnostic view — channels and campaigns under the lens</div>
        </div>
      </div>
      <div className="topbar-right">
        <div className="pill">May 1 – May 31, 2024 ▾</div>
        <div className="pill">Compare to: Apr 2024 ▾</div>
        <div className="pill">⇪ Export</div>
      </div>
    </div>

    {/* ============================================================
         BEAT 1 — THESIS
         The whole-page argument in one sentence.
         ============================================================ */}
    <div className="hero-light">
      <div>
        <div className="hero-light-eyebrow">The argument · Performance</div>
        <div className="hero-light-headline">
          78% of your <span className="num">$30.19M revenue</span> is concentrated in <span className="num">three channels</span> — but <span className="warn">two of them have hit the wall</span>, and the next dollar of growth has to come from somewhere else.
        </div>
      </div>
      <div className="hero-light-meta">
        <strong>9 channels · 42 campaigns</strong>
        Analyzed · 90-day window
      </div>
    </div>

    {/* ============================================================
         BEAT 2 — CONCENTRATION
         "78% of ROI lives in 3 channels." Pareto chart proves it.
         ============================================================ */}
    <section id="concentration" className="sec-anchor beat">
      <div className="beat-num">Beat 1 · Concentration</div>
      <div className="beat-headline">Three channels — <em>Brand Search, Organic, LinkedIn B2B</em> — carry <span className="accent">78% of your ROI</span>.</div>
      <div className="beat-sub">The other six channels combined contribute the remaining 22%. This is a healthy long-tail shape — but it means your portfolio is leveraged on a small number of bets. If those bets stop scaling, you have a growth problem.</div>

      <div className="pareto-card">
        <div className="pareto-head">
          <div>
            <div className="pareto-title">ROI contribution by channel</div>
            <div className="pareto-tag">9 channels · ranked by attributed revenue · last 90 days</div>
          </div>
          <div>
            <div className="pareto-keystat">78%</div>
            <div className="pareto-keystat-label">From top 3</div>
          </div>
        </div>

        <div className="pareto-chart">
          <svg viewBox="0 0 720 240" preserveAspectRatio="none">
            {/* Geometry: x from 50 to 700, y from 20 to 200; bottom labels at 220 */}
            {/* 9 bars, equal spacing. Bar width ~50px, gap ~15px */}

            {/* Horizontal gridlines + y-axis labels (left axis: % contribution) */}
            <line x1="50" y1="200" x2="700" y2="200" stroke="#E5E7EF" strokeWidth="1" />
            <line x1="50" y1="155" x2="700" y2="155" stroke="#F0F1F6" strokeWidth="1" strokeDasharray="2,3" />
            <line x1="50" y1="110" x2="700" y2="110" stroke="#F0F1F6" strokeWidth="1" strokeDasharray="2,3" />
            <line x1="50" y1="65" x2="700" y2="65" stroke="#F0F1F6" strokeWidth="1" strokeDasharray="2,3" />
            <line x1="50" y1="20" x2="700" y2="20" stroke="#F0F1F6" strokeWidth="1" strokeDasharray="2,3" />

            <text x="44" y="204" textAnchor="end" fontSize="9" fill="#8C92AC" fontFamily="Plus Jakarta Sans">0%</text>
            <text x="44" y="159" textAnchor="end" fontSize="9" fill="#8C92AC" fontFamily="Plus Jakarta Sans">10%</text>
            <text x="44" y="114" textAnchor="end" fontSize="9" fill="#8C92AC" fontFamily="Plus Jakarta Sans">20%</text>
            <text x="44" y="69" textAnchor="end" fontSize="9" fill="#8C92AC" fontFamily="Plus Jakarta Sans">30%</text>
            <text x="44" y="24" textAnchor="end" fontSize="9" fill="#8C92AC" fontFamily="Plus Jakarta Sans">40%</text>

            {/* Right Y axis: cumulative % (0-100%) */}
            <text x="708" y="204" textAnchor="start" fontSize="9" fill="#8C92AC" fontFamily="Plus Jakarta Sans">0%</text>
            <text x="708" y="69" textAnchor="start" fontSize="9" fill="#8C92AC" fontFamily="Plus Jakarta Sans">75%</text>
            <text x="708" y="24" textAnchor="start" fontSize="9" fill="#8C92AC" fontFamily="Plus Jakarta Sans">100%</text>

            {/* Bars: 9 channels, ROI contribution as % of total revenue.
                 Brand 31, Organic 24, LinkedIn 23, NB Search 8, Meta P 5, YouTube 4, Email 2, Meta RT 2, Display RT 1 = 100%
                 % heights from y=200 baseline. y= 200 - (val/40)*180 */}

            {/* 1. Brand Search 31% -> y = 200 - (31/40)*180 = 60.5; height = 139.5 */}
            <rect x="60" y="60" width="50" height="140" rx="3" fill="#7C5CFF" />
            <text x="85" y="55" textAnchor="middle" fontSize="10" fill="#0F1535" fontFamily="Fraunces" fontStyle="italic" fontWeight="600">31%</text>
            <text x="85" y="218" textAnchor="middle" fontSize="9" fill="#0F1535" fontFamily="Plus Jakarta Sans" fontWeight="600">Brand Sch</text>

            {/* 2. Organic 24% -> y = 200 - (24/40)*180 = 92; height = 108 */}
            <rect x="125" y="92" width="50" height="108" rx="3" fill="#7C5CFF" />
            <text x="150" y="87" textAnchor="middle" fontSize="10" fill="#0F1535" fontFamily="Fraunces" fontStyle="italic" fontWeight="600">24%</text>
            <text x="150" y="218" textAnchor="middle" fontSize="9" fill="#0F1535" fontFamily="Plus Jakarta Sans" fontWeight="600">Organic</text>

            {/* 3. LinkedIn B2B 23% -> y = 200 - (23/40)*180 = 96.5; height = 103.5 */}
            <rect x="190" y="96" width="50" height="104" rx="3" fill="#7C5CFF" />
            <text x="215" y="91" textAnchor="middle" fontSize="10" fill="#0F1535" fontFamily="Fraunces" fontStyle="italic" fontWeight="600">23%</text>
            <text x="215" y="218" textAnchor="middle" fontSize="9" fill="#0F1535" fontFamily="Plus Jakarta Sans" fontWeight="600">LinkedIn</text>

            {/* Vertical separator after top 3 */}
            <line x1="252" y1="20" x2="252" y2="200" stroke="#B8893B" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <text x="252" y="14" textAnchor="middle" fontSize="9" fill="#B8893B" fontStyle="italic" fontWeight="700" fontFamily="Plus Jakarta Sans">↓ 78% line</text>

            {/* 4. NB Search 8% -> y = 200 - (8/40)*180 = 164; height = 36 */}
            <rect x="263" y="164" width="50" height="36" rx="3" fill="#D8DCE8" />
            <text x="288" y="159" textAnchor="middle" fontSize="10" fill="#5C6280" fontFamily="Plus Jakarta Sans" fontWeight="600">8%</text>
            <text x="288" y="218" textAnchor="middle" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">NB Sch</text>

            {/* 5. Meta Prospecting 5% -> y = 200 - (5/40)*180 = 177.5; height = 22.5 */}
            <rect x="328" y="178" width="50" height="22" rx="3" fill="#D8DCE8" />
            <text x="353" y="173" textAnchor="middle" fontSize="10" fill="#5C6280" fontFamily="Plus Jakarta Sans" fontWeight="600">5%</text>
            <text x="353" y="218" textAnchor="middle" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">Meta P.</text>

            {/* 6. YouTube 4% -> y = 200 - (4/40)*180 = 182; height = 18 */}
            <rect x="393" y="182" width="50" height="18" rx="3" fill="#D8DCE8" />
            <text x="418" y="177" textAnchor="middle" fontSize="10" fill="#5C6280" fontFamily="Plus Jakarta Sans" fontWeight="600">4%</text>
            <text x="418" y="218" textAnchor="middle" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">YouTube</text>

            {/* 7. Email 3% -> y = 200 - (3/40)*180 = 186.5; height = 13.5 */}
            <rect x="458" y="187" width="50" height="13" rx="3" fill="#D8DCE8" />
            <text x="483" y="182" textAnchor="middle" fontSize="10" fill="#5C6280" fontFamily="Plus Jakarta Sans" fontWeight="600">3%</text>
            <text x="483" y="218" textAnchor="middle" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">Email</text>

            {/* 8. Meta RT 1% -> y = 200 - (1/40)*180 = 195.5; height = 4.5 */}
            <rect x="523" y="195" width="50" height="5" rx="3" fill="#D8DCE8" />
            <text x="548" y="190" textAnchor="middle" fontSize="10" fill="#5C6280" fontFamily="Plus Jakarta Sans" fontWeight="600">1%</text>
            <text x="548" y="218" textAnchor="middle" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">Meta RT</text>

            {/* 9. Display RT 1% -> y = 200 - (1/40)*180 = 195.5; height = 4.5 */}
            <rect x="588" y="195" width="50" height="5" rx="3" fill="#D8DCE8" />
            <text x="613" y="190" textAnchor="middle" fontSize="10" fill="#5C6280" fontFamily="Plus Jakarta Sans" fontWeight="600">1%</text>
            <text x="613" y="218" textAnchor="middle" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">Display RT</text>

            {/* Cumulative % line (right axis 0-100% mapped to chart area)
                 Cumulative: 31, 55, 78, 86, 91, 95, 98, 99, 100
                 y_cum = 200 - (cum/100)*180.  31->144.2, 55->101, 78->59.6, 86->45.2, 91->36.2, 95->29, 98->23.6, 99->21.8, 100->20 */}
            <polyline points="85,144 150,101 215,60 288,45 353,36 418,29 483,24 548,22 613,20" fill="none" stroke="#B8893B" strokeWidth="2" strokeDasharray="4,3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Endpoint dots on cumulative line */}
            <circle cx="85" cy="144" r="3" fill="#B8893B" />
            <circle cx="150" cy="101" r="3" fill="#B8893B" />
            <circle cx="215" cy="60" r="4" fill="#B8893B" stroke="#fff" strokeWidth="1.5" />
            <circle cx="288" cy="45" r="3" fill="#B8893B" />
            <circle cx="353" cy="36" r="3" fill="#B8893B" />
            <circle cx="418" cy="29" r="3" fill="#B8893B" />
            <circle cx="483" cy="24" r="3" fill="#B8893B" />
            <circle cx="548" cy="22" r="3" fill="#B8893B" />
            <circle cx="613" cy="20" r="3" fill="#B8893B" />

            {/* Annotation at the 78% crossing */}
            <g>
              <rect x="220" y="49" width="60" height="20" rx="4" fill="#FFF7E8" stroke="#B8893B" strokeWidth="1" />
              <text x="250" y="63" textAnchor="middle" fontSize="11" fill="#7A5A1F" fontFamily="Fraunces" fontStyle="italic" fontWeight="600">78%</text>
            </g>
          </svg>
        </div>

        <div className="pareto-legend">
          <div className="pareto-legend-item"><span className="pareto-legend-swatch top"></span>Top 3 (78%)</div>
          <div className="pareto-legend-item"><span className="pareto-legend-swatch tail"></span>Long tail (22%)</div>
          <div className="pareto-legend-item"><span className="pareto-legend-line"></span>Cumulative %</div>
        </div>
      </div>

      <div className="beat-bridge">If your top 3 carry 78% of value, the natural question is: <em>can those three keep growing?</em> Two of them can't. Here's why.</div>
    </section>

    {/* ============================================================
         BEAT 3 — THE WALL (saturation diagnosis)
         The Efficient Frontier proves the top channels can't scale.
         ============================================================ */}
    <section id="frontier-beat" className="sec-anchor beat">
      <div className="beat-num">Beat 2 · The wall</div>
      <div className="beat-headline"><span className="warn">Brand Search and Organic are saturated.</span> Every next dollar earns less than the last.</div>
      <div className="beat-sub">Marginal ROI vs. spend curves show diminishing returns. Two of your top three channels sit at the right edge of their curve — adding budget there won't move the needle. The good news: there are three channels well below their frontier with real headroom.</div>

      {/* Efficient frontier — full-width, landscape layout */}
      <div id="frontier" className="frontier-section sec-anchor">
        <div className="frontier-card">
          <div className="frontier-head">
            <div className="frontier-head-left">
              <div className="frontier-h">Efficient Frontier</div>
              <div className="frontier-tag">Marginal ROI vs. spend · current state · 9 channels</div>
            </div>
            <div className="frontier-categories">
              <div className="frontier-cat">
                <span className="frontier-cat-dot" style={{background: "#10B981"}}></span>
                <div className="frontier-cat-text"><span className="frontier-cat-label">On frontier</span><span className="frontier-cat-val">3</span></div>
              </div>
              <div className="frontier-cat">
                <span className="frontier-cat-dot" style={{background: "#F59E0B"}}></span>
                <div className="frontier-cat-text"><span className="frontier-cat-label">Room to grow</span><span className="frontier-cat-val">3</span></div>
              </div>
              <div className="frontier-cat">
                <span className="frontier-cat-dot" style={{background: "#EF4444"}}></span>
                <div className="frontier-cat-text"><span className="frontier-cat-label">Near peak</span><span className="frontier-cat-val">2</span></div>
              </div>
              <div className="frontier-cat">
                <span className="frontier-cat-dot" style={{background: "#DC2626"}}></span>
                <div className="frontier-cat-text"><span className="frontier-cat-label">Losing money</span><span className="frontier-cat-val">1</span></div>
              </div>
            </div>
          </div>

          <div className="frontier-body">
            <div className="frontier-chart">
              <svg viewBox="0 0 720 340" preserveAspectRatio="xMidYMid meet">
                {/* Axes */}
                <line x1="60" y1="290" x2="700" y2="290" stroke="#E5E7EF" strokeWidth="1" />
                <line x1="60" y1="20" x2="60" y2="290" stroke="#E5E7EF" strokeWidth="1" />
                {/* Horizontal gridlines */}
                <line x1="60" y1="80" x2="700" y2="80" stroke="#F0F1F6" strokeWidth="1" strokeDasharray="2,3" />
                <line x1="60" y1="155" x2="700" y2="155" stroke="#F0F1F6" strokeWidth="1" strokeDasharray="2,3" />
                <line x1="60" y1="230" x2="700" y2="230" stroke="#F0F1F6" strokeWidth="1" strokeDasharray="2,3" />
                {/* Y-axis labels (Marginal ROI) */}
                <text x="52" y="84" textAnchor="end" fontSize="10" fill="#8C92AC" fontFamily="Plus Jakarta Sans">High</text>
                <text x="52" y="159" textAnchor="end" fontSize="10" fill="#8C92AC" fontFamily="Plus Jakarta Sans">Mid</text>
                <text x="52" y="234" textAnchor="end" fontSize="10" fill="#8C92AC" fontFamily="Plus Jakarta Sans">Low</text>
                <text x="52" y="294" textAnchor="end" fontSize="10" fill="#8C92AC" fontFamily="Plus Jakarta Sans">0</text>
                {/* X-axis labels (Spend tiers) */}
                <text x="120" y="308" textAnchor="middle" fontSize="10" fill="#8C92AC" fontFamily="Plus Jakarta Sans">$50K</text>
                <text x="280" y="308" textAnchor="middle" fontSize="10" fill="#8C92AC" fontFamily="Plus Jakarta Sans">$500K</text>
                <text x="440" y="308" textAnchor="middle" fontSize="10" fill="#8C92AC" fontFamily="Plus Jakarta Sans">$1M</text>
                <text x="600" y="308" textAnchor="middle" fontSize="10" fill="#8C92AC" fontFamily="Plus Jakarta Sans">$1.5M+</text>

                {/* Saturation zone (right side) */}
                <rect x="540" y="20" width="160" height="270" fill="#FEE9E9" opacity="0.22" />
                <text x="620" y="38" textAnchor="middle" fontSize="10" fill="#B91C1C" fontWeight="700" letter-spacing="1.5" fontFamily="Plus Jakarta Sans">SATURATED ZONE</text>

                {/* Frontier curve (theoretical maximum) */}
                <path d="M60,30 Q200,55 380,135 T700,255" fill="none" stroke="#7C5CFF" strokeWidth="2" strokeDasharray="5,4" opacity="0.6" />
                <text x="430" y="178" fontSize="9" fontStyle="italic" fill="#5B3FD9" fontFamily="Plus Jakarta Sans" fontWeight="600">Efficient frontier (theoretical max)</text>

                {/* Channel points (sized by spend, colored by status) */}
                {/* Organic: $96K, top-left, on frontier */}
                <circle cx="105" cy="40" r="7" fill="#10B981" stroke="#fff" strokeWidth="2" />
                <text x="116" y="36" fontSize="11" fill="#0F1535" fontWeight="700" fontFamily="Plus Jakarta Sans">Organic</text>
                <text x="116" y="48" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">31.58× · $120K</text>

                {/* Brand Search: $576K, mid-left, on frontier but saturating */}
                <circle cx="290" cy="80" r="9" fill="#10B981" stroke="#fff" strokeWidth="2" />
                <text x="304" y="76" fontSize="11" fill="#0F1535" fontWeight="700" fontFamily="Plus Jakarta Sans">Brand Search</text>
                <text x="304" y="88" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">7.08× · $715K</text>

                {/* Email: $48K, far left, headroom */}
                <circle cx="80" cy="155" r="6" fill="#F59E0B" stroke="#fff" strokeWidth="2" />
                <text x="92" y="151" fontSize="11" fill="#0F1535" fontWeight="700" fontFamily="Plus Jakarta Sans">Email</text>
                <text x="92" y="163" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">2.83× · $60K</text>

                {/* LinkedIn B2B: $984K, mid-mid, headroom (the star opportunity) */}
                <circle cx="395" cy="125" r="11" fill="#F59E0B" stroke="#fff" strokeWidth="2.5" />
                <text x="412" y="121" fontSize="11" fill="#0F1535" fontWeight="700" fontFamily="Plus Jakarta Sans">LinkedIn B2B</text>
                <text x="412" y="133" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">4.20× · $1.23M · ↑</text>

                {/* YouTube: $744K, mid, headroom */}
                <circle cx="345" cy="180" r="9" fill="#F59E0B" stroke="#fff" strokeWidth="2" />
                <text x="358" y="176" fontSize="11" fill="#0F1535" fontWeight="700" fontFamily="Plus Jakarta Sans">YouTube</text>
                <text x="358" y="188" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">2.40× · $925K</text>

                {/* Non-brand Search: $1.49M, right, near peak */}
                <circle cx="510" cy="155" r="11" fill="#EF4444" stroke="#fff" strokeWidth="2" />
                <text x="525" y="151" fontSize="11" fill="#0F1535" fontWeight="700" fontFamily="Plus Jakarta Sans">NB Search</text>
                <text x="525" y="163" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">3.21× · $1.86M</text>

                {/* Meta Prospecting: $1.75M, right, near peak */}
                <circle cx="595" cy="195" r="12" fill="#EF4444" stroke="#fff" strokeWidth="2" />
                <text x="612" y="191" fontSize="11" fill="#0F1535" fontWeight="700" fontFamily="Plus Jakarta Sans">Meta Prosp.</text>
                <text x="612" y="203" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">2.70× · $2.18M ↓</text>

                {/* Meta Retargeting: $612K, right-mid, declining */}
                <circle cx="320" cy="240" r="9" fill="#64748B" stroke="#fff" strokeWidth="2" />
                <text x="248" y="252" fontSize="11" fill="#0F1535" fontWeight="700" fontFamily="Plus Jakarta Sans">Meta RT</text>
                <text x="248" y="264" fontSize="9" fill="#5C6280" fontFamily="Plus Jakarta Sans">1.71× · $760K ↓</text>

                {/* Display Retargeting: losing money */}
                <circle cx="478" cy="270" r="8" fill="#DC2626" stroke="#fff" strokeWidth="2" />
                <text x="490" y="266" fontSize="11" fill="#B91C1C" fontWeight="700" fontFamily="Plus Jakarta Sans">Display RT ✕</text>
                <text x="490" y="278" fontSize="9" fill="#B91C1C" fontFamily="Plus Jakarta Sans">0.85× · $565K</text>

                {/* Axis titles */}
                <text x="380" y="328" textAnchor="middle" fontSize="11" fill="#5C6280" fontWeight="700" fontFamily="Plus Jakarta Sans" letter-spacing=".05em">SPEND →</text>
                <text x="22" y="155" textAnchor="middle" fontSize="11" fill="#5C6280" fontWeight="700" fontFamily="Plus Jakarta Sans" letter-spacing=".05em" transform="rotate(-90 22 155)">MARGINAL ROI →</text>
              </svg>
            </div>

            <div className="frontier-insights">
              <div className="frontier-insights-h">What the chart says</div>

              <div className="frontier-insight scale">
                <div className="frontier-insight-head">
                  <span className="frontier-insight-label">Scale</span>
                  <span className="frontier-insight-amt">+$620K → +$2.56M rev</span>
                </div>
                <div className="frontier-insight-text"><strong>LinkedIn B2B</strong> is well below its frontier at $1.23M spend. Marginal ROI 4.20× says room to push.</div>
              </div>

              <div className="frontier-insight shift">
                <div className="frontier-insight-head">
                  <span className="frontier-insight-label">Shift</span>
                  <span className="frontier-insight-amt">$225K reallocated</span>
                </div>
                <div className="frontier-insight-text"><strong>Meta Prospecting + NB Search</strong> are past their inflection. Each next dollar earns less than the previous one.</div>
              </div>

              <div className="frontier-insight cut">
                <div className="frontier-insight-head">
                  <span className="frontier-insight-label">Cut</span>
                  <span className="frontier-insight-amt">$565K saved</span>
                </div>
                <div className="frontier-insight-text"><strong>Display Retargeting</strong> returns $0.85 per dollar spent. Below break-even — pause and redeploy.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="beat-bridge">The frontier shows <em>where</em> each channel sits on its diminishing-returns curve. Now let's rank channels by <em>how much headroom is left</em> — that's where your next dollar should go.</div>
    </section>

    {/* ============================================================
         BEAT 4 — WHERE THE HEADROOM IS
         Channel table re-sorted by gap-to-frontier.
         ============================================================ */}
    <section id="headroom" className="sec-anchor beat">
      <div className="beat-num">Beat 3 · The opportunity</div>
      <div className="beat-headline"><span className="good">LinkedIn B2B, YouTube, and Email</span> have real room to grow. Together, they could absorb <span className="accent">$1M+ more spend</span> at marginal ROI ≥ 3×.</div>
      <div className="beat-sub">Sorted by headroom — the percentage of additional spend each channel could absorb before hitting its frontier. The top three rows are where reallocation should go. The bottom rows are where it should come from.</div>

      <div className="tbl-card">
        <div className="tbl-head">
          <div style={{fontSize: "12px", fontWeight: "700"}}>Channel headroom <span style={{fontWeight: "500", color: "var(--text-3)", marginLeft: "8px"}}>9 channels · ranked by gap to frontier · <span style={{color: "var(--accent-deep)", fontWeight: "600"}}>click any row to drill into campaigns ▸</span></span></div>
          <div className="tbl-controls">
            <span className="tbl-toggle active">Headroom</span>
            <span className="tbl-toggle">ROI</span>
            <span className="tbl-toggle">Spend</span>
            <span className="tbl-toggle">Δ vs Apr</span>
          </div>
        </div>
        <table className="perf-tbl">
          <thead>
            <tr>
              <th>Channel</th>
              <th className="r">Spend</th>
              <th className="r">Revenue</th>
              <th className="r">ROI</th>
              <th className="r">Marginal ROI</th>
              <th>Headroom</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Sorted by headroom (highest first) */}
            {/* 1. LinkedIn B2B — biggest opportunity */}
            <tr className="channel-row" data-id="linkedin">
              <td><div className="ch-name"><span className="ch-toggle">▸</span><span className="ch-dot" style={{background: "#F59E0B"}}></span><div>LinkedIn B2B<div className="ch-sub">LinkedIn · 6 campaigns</div></div></div></td>
              <td className="r">$1.23M</td><td className="r">$5.33M</td>
              <td className="r"><span className="roi-val good">4.20×</span></td>
              <td className="r"><span className="roi-val good" style={{fontSize: "13px"}}>4.20×</span></td>
              <td><div className="headroom-cell"><div className="headroom-bar"><div className="headroom-fill lots" style={{width: "78%"}}></div></div><span className="headroom-pct lots">+$620K</span></div></td>
              <td><span className="sat-chip head">Headroom</span></td>
            </tr>
            <tr className="campaign-subrow" data-parent="linkedin">
              <td colSpan={7}>
                <div className="subrow-inner">
                  <div className="subrow-h">
                    <div className="subrow-title"><strong>LinkedIn B2B campaigns</strong> · 6 of 6 shown</div>
                    <div className="subrow-meta">3 winners ready to scale · 2 saturating · 1 fixable</div>
                  </div>
                  <table className="subrow-tbl">
                    <thead>
                      <tr><th>Campaign</th><th className="r">Spend</th><th className="r">Revenue</th><th className="r">ROI</th><th className="r">CVR</th><th className="r">Δ 30d</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="subrow-camp">LinkedIn_B2B_Decision_Makers</div><div className="subrow-camp-sub">Sponsored InMail · senior titles</div></td>
                        <td className="r">$252K</td><td className="r">$1.78M</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>7.05×</span></td>
                        <td className="r">2.1%</td><td className="r"><span className="delta up">+1.4</span></td>
                        <td><span className="camp-tag scale">Scale</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">LinkedIn_CXO_SponsoredContent</div><div className="subrow-camp-sub">Sponsored content · C-suite</div></td>
                        <td className="r">$216K</td><td className="r">$948K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>4.38×</span></td>
                        <td className="r">1.7%</td><td className="r"><span className="delta up">+0.6</span></td>
                        <td><span className="camp-tag scale">Scale</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">LinkedIn_B2B_Engineering</div><div className="subrow-camp-sub">Audience: VP Eng / CTO</div></td>
                        <td className="r">$184K</td><td className="r">$762K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>4.14×</span></td>
                        <td className="r">1.9%</td><td className="r"><span className="delta up">+0.4</span></td>
                        <td><span className="camp-tag scale">Scale</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">LinkedIn_Industry_Targeting</div><div className="subrow-camp-sub">Vertical-specific creative</div></td>
                        <td className="r">$148K</td><td className="r">$522K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>3.53×</span></td>
                        <td className="r">1.4%</td><td className="r"><span className="delta neu">±0.0</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">LinkedIn_MidMarket_Lead</div><div className="subrow-camp-sub">Lead-gen forms · 50–200 emp</div></td>
                        <td className="r">$112K</td><td className="r">$348K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>3.11×</span></td>
                        <td className="r">1.2%</td><td className="r"><span className="delta down">−0.2</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">LinkedIn_Retarget_Visitors</div><div className="subrow-camp-sub">Site visitor retarget · 30d</div></td>
                        <td className="r">$72K</td><td className="r">$148K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>2.06×</span></td>
                        <td className="r">0.9%</td><td className="r"><span className="delta down">−0.5</span></td>
                        <td><span className="camp-tag fix">Fix creative</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            {/* 2. YouTube */}
            <tr className="channel-row" data-id="youtube">
              <td><div className="ch-name"><span className="ch-toggle">▸</span><span className="ch-dot" style={{background: "#F97316"}}></span><div>YouTube<div className="ch-sub">Google · video · 5 campaigns</div></div></div></td>
              <td className="r">$925K</td><td className="r">$2.22M</td>
              <td className="r"><span className="roi-val warn">2.40×</span></td>
              <td className="r"><span className="roi-val warn" style={{fontSize: "13px"}}>2.40×</span></td>
              <td><div className="headroom-cell"><div className="headroom-bar"><div className="headroom-fill lots" style={{width: "62%"}}></div></div><span className="headroom-pct lots">+$430K</span></div></td>
              <td><span className="sat-chip head">Headroom</span></td>
            </tr>
            <tr className="campaign-subrow" data-parent="youtube">
              <td colSpan={7}>
                <div className="subrow-inner">
                  <div className="subrow-h">
                    <div className="subrow-title"><strong>YouTube campaigns</strong> · 5 of 5 shown</div>
                    <div className="subrow-meta">2 winners · 2 saturating · 1 fixable</div>
                  </div>
                  <table className="subrow-tbl">
                    <thead>
                      <tr><th>Campaign</th><th className="r">Spend</th><th className="r">Revenue</th><th className="r">ROI</th><th className="r">CVR</th><th className="r">Δ 30d</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="subrow-camp">YouTube_AwarenessSkippable</div><div className="subrow-camp-sub">15s skippable · top of funnel</div></td>
                        <td className="r">$336K</td><td className="r">$888K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>2.64×</span></td>
                        <td className="r">0.8%</td><td className="r"><span className="delta up">+0.5</span></td>
                        <td><span className="camp-tag scale">Scale</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">YouTube_ProductDemo_15s</div><div className="subrow-camp-sub">Bumper · product launch</div></td>
                        <td className="r">$148K</td><td className="r">$402K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>2.72×</span></td>
                        <td className="r">1.0%</td><td className="r"><span className="delta up">+0.3</span></td>
                        <td><span className="camp-tag scale">Scale</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">YouTube_RetailHowTo</div><div className="subrow-camp-sub">In-stream · how-to content</div></td>
                        <td className="r">$112K</td><td className="r">$248K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>2.21×</span></td>
                        <td className="r">0.7%</td><td className="r"><span className="delta neu">±0.0</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">YouTube_Bumper_BrandLift</div><div className="subrow-camp-sub">6s bumper · awareness</div></td>
                        <td className="r">$96K</td><td className="r">$182K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>1.90×</span></td>
                        <td className="r">0.4%</td><td className="r"><span className="delta neu">±0.0</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">YouTube_NonSkippable_Premium</div><div className="subrow-camp-sub">Forced view · premium inventory</div></td>
                        <td className="r">$52K</td><td className="r">$0K</td>
                        <td className="r"><span className="roi-val bad" style={{fontSize: "12px"}}>0.00×</span></td>
                        <td className="r">0.1%</td><td className="r"><span className="delta down">−1.2</span></td>
                        <td><span className="camp-tag fix">Fix LP</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            {/* 3. Email */}
            <tr className="channel-row" data-id="email">
              <td><div className="ch-name"><span className="ch-toggle">▸</span><span className="ch-dot" style={{background: "#8B5CF6"}}></span><div>Email<div className="ch-sub">HubSpot · 3 automations</div></div></div></td>
              <td className="r">$60K</td><td className="r">$170K</td>
              <td className="r"><span className="roi-val good">2.83×</span></td>
              <td className="r"><span className="roi-val good" style={{fontSize: "13px"}}>2.85×</span></td>
              <td><div className="headroom-cell"><div className="headroom-bar"><div className="headroom-fill lots" style={{width: "55%"}}></div></div><span className="headroom-pct lots">+$185K</span></div></td>
              <td><span className="sat-chip head">Headroom</span></td>
            </tr>
            <tr className="campaign-subrow" data-parent="email">
              <td colSpan={7}>
                <div className="subrow-inner">
                  <div className="subrow-h">
                    <div className="subrow-title"><strong>Email automations</strong> · 3 of 3 shown</div>
                    <div className="subrow-meta">2 winners · 1 hold</div>
                  </div>
                  <table className="subrow-tbl">
                    <thead>
                      <tr><th>Campaign</th><th className="r">Spend</th><th className="r">Revenue</th><th className="r">ROI</th><th className="r">CVR</th><th className="r">Δ 30d</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="subrow-camp">Email_WeeklyNewsletter</div><div className="subrow-camp-sub">Weekly · all subscribers</div></td>
                        <td className="r">$12K</td><td className="r">$72K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>6.00×</span></td>
                        <td className="r">2.8%</td><td className="r"><span className="delta up">+0.4</span></td>
                        <td><span className="camp-tag scale">Scale</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Email_Drip_NewSignup</div><div className="subrow-camp-sub">7-touch onboarding sequence</div></td>
                        <td className="r">$18K</td><td className="r">$42K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>2.33×</span></td>
                        <td className="r">1.6%</td><td className="r"><span className="delta up">+0.2</span></td>
                        <td><span className="camp-tag scale">Scale</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Email_Reactivation_30day</div><div className="subrow-camp-sub">Win-back · dormant 30+ days</div></td>
                        <td className="r">$18K</td><td className="r">$18K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>1.00×</span></td>
                        <td className="r">0.3%</td><td className="r"><span className="delta neu">±0.0</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            {/* 4. Brand Search — saturating */}
            <tr className="channel-row" data-id="brand">
              <td><div className="ch-name"><span className="ch-toggle">▸</span><span className="ch-dot" style={{background: "#7C5CFF"}}></span><div>Brand Search<div className="ch-sub">Google · 3 campaigns</div></div></div></td>
              <td className="r">$715K</td><td className="r">$5.06M</td>
              <td className="r"><span className="roi-val good">7.08×</span></td>
              <td className="r"><span className="roi-val warn" style={{fontSize: "13px"}}>2.10×</span></td>
              <td><div className="headroom-cell"><div className="headroom-bar"><div className="headroom-fill some" style={{width: "18%"}}></div></div><span className="headroom-pct some">+$60K</span></div></td>
              <td><span className="sat-chip satu">Saturating</span></td>
            </tr>
            <tr className="campaign-subrow" data-parent="brand">
              <td colSpan={7}>
                <div className="subrow-inner">
                  <div className="subrow-h">
                    <div className="subrow-title"><strong>Brand Search campaigns</strong> · 3 of 3 shown</div>
                    <div className="subrow-meta">All saturating · defending share, not growing</div>
                  </div>
                  <table className="subrow-tbl">
                    <thead>
                      <tr><th>Campaign</th><th className="r">Spend</th><th className="r">Revenue</th><th className="r">ROI</th><th className="r">CVR</th><th className="r">Δ 30d</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="subrow-camp">Brand_Search_Exact_May</div><div className="subrow-camp-sub">Exact match · brand terms</div></td>
                        <td className="r">$168K</td><td className="r">$1.58M</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>9.42×</span></td>
                        <td className="r">8.2%</td><td className="r"><span className="delta up">+0.8</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Brand_Search_Phrase</div><div className="subrow-camp-sub">Phrase match · brand+modifier</div></td>
                        <td className="r">$248K</td><td className="r">$1.62M</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>6.53×</span></td>
                        <td className="r">5.4%</td><td className="r"><span className="delta up">+0.2</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Brand_Search_Misspellings</div><div className="subrow-camp-sub">Misspellings + variants</div></td>
                        <td className="r">$160K</td><td className="r">$724K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>4.53×</span></td>
                        <td className="r">3.6%</td><td className="r"><span className="delta neu">±0.0</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            {/* 5. Organic Search — saturating */}
            <tr className="channel-row" data-id="organic">
              <td><div className="ch-name"><span className="ch-toggle">▸</span><span className="ch-dot" style={{background: "#10B981"}}></span><div>Organic Search<div className="ch-sub">SEO · 3 page groups</div></div></div></td>
              <td className="r">$120K</td><td className="r">$3.79M</td>
              <td className="r"><span className="roi-val good">31.58×</span></td>
              <td className="r"><span className="roi-val warn" style={{fontSize: "13px"}}>1.80×</span></td>
              <td><div className="headroom-cell"><div className="headroom-bar"><div className="headroom-fill some" style={{width: "12%"}}></div></div><span className="headroom-pct some">+$20K</span></div></td>
              <td><span className="sat-chip satu">Saturating</span></td>
            </tr>
            <tr className="campaign-subrow" data-parent="organic">
              <td colSpan={7}>
                <div className="subrow-inner">
                  <div className="subrow-h">
                    <div className="subrow-title"><strong>Organic Search · page groups</strong> · 3 of 3 shown</div>
                    <div className="subrow-meta">Spend = SEO content + tooling cost · effort proxy</div>
                  </div>
                  <table className="subrow-tbl">
                    <thead>
                      <tr><th>Page group</th><th className="r">Cost (proxy)</th><th className="r">Revenue</th><th className="r">ROI</th><th className="r">CVR</th><th className="r">Δ 30d</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="subrow-camp">Organic_Brand_Term_Pages</div><div className="subrow-camp-sub">Branded queries · home + product</div></td>
                        <td className="r">$24K</td><td className="r">$1.48M</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>61.7×</span></td>
                        <td className="r">7.2%</td><td className="r"><span className="delta up">+1.2</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Organic_Product_Pages</div><div className="subrow-camp-sub">Category + product detail</div></td>
                        <td className="r">$36K</td><td className="r">$1.02M</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>28.3×</span></td>
                        <td className="r">3.8%</td><td className="r"><span className="delta up">+0.4</span></td>
                        <td><span className="camp-tag scale">Invest more</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Organic_Blog_HowTo</div><div className="subrow-camp-sub">Top-funnel content · how-to</div></td>
                        <td className="r">$36K</td><td className="r">$444K</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>12.3×</span></td>
                        <td className="r">1.9%</td><td className="r"><span className="delta neu">±0.0</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            {/* 6. NB Search — near peak */}
            <tr className="channel-row" data-id="nb-search">
              <td><div className="ch-name"><span className="ch-toggle">▸</span><span className="ch-dot" style={{background: "#EF4444"}}></span><div>Non-brand Search<div className="ch-sub">Google · 4 campaigns</div></div></div></td>
              <td className="r">$1.86M</td><td className="r">$5.96M</td>
              <td className="r"><span className="roi-val good">3.21×</span></td>
              <td className="r"><span className="roi-val warn" style={{fontSize: "13px"}}>1.40×</span></td>
              <td><div className="headroom-cell"><div className="headroom-bar"><div className="headroom-fill tapped" style={{width: "6%"}}></div></div><span className="headroom-pct tapped">−$145K</span></div></td>
              <td><span className="sat-chip near">Near peak</span></td>
            </tr>
            <tr className="campaign-subrow" data-parent="nb-search">
              <td colSpan={7}>
                <div className="subrow-inner">
                  <div className="subrow-h">
                    <div className="subrow-title"><strong>Non-brand Search campaigns</strong> · 4 of 4 shown</div>
                    <div className="subrow-meta">1 winner · 1 hold · 2 saturating</div>
                  </div>
                  <table className="subrow-tbl">
                    <thead>
                      <tr><th>Campaign</th><th className="r">Spend</th><th className="r">Revenue</th><th className="r">ROI</th><th className="r">CVR</th><th className="r">Δ 30d</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="subrow-camp">NB_Search_HighIntent_May</div><div className="subrow-camp-sub">High-intent commercial queries</div></td>
                        <td className="r">$456K</td><td className="r">$2.18M</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>4.79×</span></td>
                        <td className="r">3.9%</td><td className="r"><span className="delta up">+0.3</span></td>
                        <td><span className="camp-tag scale">Scale</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">NB_Search_Comparison_Queries</div><div className="subrow-camp-sub">"vs competitor" + "best X"</div></td>
                        <td className="r">$372K</td><td className="r">$1.18M</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>3.17×</span></td>
                        <td className="r">2.4%</td><td className="r"><span className="delta neu">±0.0</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">NB_Search_Generic_Category</div><div className="subrow-camp-sub">Broad category terms</div></td>
                        <td className="r">$418K</td><td className="r">$894K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>2.14×</span></td>
                        <td className="r">1.6%</td><td className="r"><span className="delta down">−0.4</span></td>
                        <td><span className="camp-tag fix">Cap spend</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">NB_Search_Long_Tail</div><div className="subrow-camp-sub">Long-tail · low volume</div></td>
                        <td className="r">$244K</td><td className="r">$372K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>1.52×</span></td>
                        <td className="r">0.9%</td><td className="r"><span className="delta down">−0.6</span></td>
                        <td><span className="camp-tag fix">Cap spend</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            {/* 7. Meta Prospecting — past peak */}
            <tr className="channel-row" data-id="meta-pros">
              <td><div className="ch-name"><span className="ch-toggle">▸</span><span className="ch-dot" style={{background: "#0EA5E9"}}></span><div>Meta Prospecting<div className="ch-sub">Meta · 8 campaigns</div></div></div></td>
              <td className="r">$2.18M</td><td className="r">$5.88M</td>
              <td className="r"><span className="roi-val warn">2.70×</span></td>
              <td className="r"><span className="roi-val bad" style={{fontSize: "13px"}}>1.10×</span></td>
              <td><div className="headroom-cell"><div className="headroom-bar"><div className="headroom-fill tapped" style={{width: "4%"}}></div></div><span className="headroom-pct tapped">−$300K</span></div></td>
              <td><span className="sat-chip near">Past peak</span></td>
            </tr>
            <tr className="campaign-subrow" data-parent="meta-pros">
              <td colSpan={7}>
                <div className="subrow-inner">
                  <div className="subrow-h">
                    <div className="subrow-title"><strong>Meta Prospecting campaigns</strong> · top 4 of 8 by spend</div>
                    <div className="subrow-meta">2 holds · 2 fixable · structural audience burn detected</div>
                  </div>
                  <table className="subrow-tbl">
                    <thead>
                      <tr><th>Campaign</th><th className="r">Spend</th><th className="r">Revenue</th><th className="r">ROI</th><th className="r">CVR</th><th className="r">Δ 30d</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="subrow-camp">Meta_Prospecting_Lookalike_1pct</div><div className="subrow-camp-sub">1% LAL of high-LTV customers</div></td>
                        <td className="r">$552K</td><td className="r">$1.96M</td>
                        <td className="r"><span className="roi-val good" style={{fontSize: "12px"}}>3.54×</span></td>
                        <td className="r">1.2%</td><td className="r"><span className="delta neu">±0.0</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Meta_Pros_Interest_Finance</div><div className="subrow-camp-sub">Interest targeting · finance</div></td>
                        <td className="r">$384K</td><td className="r">$852K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>2.22×</span></td>
                        <td className="r">1.0%</td><td className="r"><span className="delta down">−0.4</span></td>
                        <td><span className="camp-tag fix">Refresh creative</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Meta_Pros_Lookalike_5pct</div><div className="subrow-camp-sub">5% LAL · broader reach</div></td>
                        <td className="r">$432K</td><td className="r">$854K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>1.98×</span></td>
                        <td className="r">0.8%</td><td className="r"><span className="delta down">−0.3</span></td>
                        <td><span className="camp-tag fix">Cap spend</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Meta_Pros_Broad_Audience</div><div className="subrow-camp-sub">Broad targeting · open</div></td>
                        <td className="r">$336K</td><td className="r">$312K</td>
                        <td className="r"><span className="roi-val bad" style={{fontSize: "12px"}}>0.93×</span></td>
                        <td className="r">0.7%</td><td className="r"><span className="delta down">−0.6</span></td>
                        <td><span className="camp-tag cut">Cut</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            {/* 8. Meta RT — past peak */}
            <tr className="channel-row" data-id="meta-rt">
              <td><div className="ch-name"><span className="ch-toggle">▸</span><span className="ch-dot" style={{background: "#64748B"}}></span><div>Meta Retargeting<div className="ch-sub">Meta · 4 campaigns</div></div></div></td>
              <td className="r">$760K</td><td className="r">$1.30M</td>
              <td className="r"><span className="roi-val warn">1.71×</span></td>
              <td className="r"><span className="roi-val bad" style={{fontSize: "13px"}}>0.90×</span></td>
              <td><div className="headroom-cell"><div className="headroom-bar"><div className="headroom-fill tapped" style={{width: "2%"}}></div></div><span className="headroom-pct tapped">−$225K</span></div></td>
              <td><span className="sat-chip near">Past peak</span></td>
            </tr>
            <tr className="campaign-subrow" data-parent="meta-rt">
              <td colSpan={7}>
                <div className="subrow-inner">
                  <div className="subrow-h">
                    <div className="subrow-title"><strong>Meta Retargeting campaigns</strong> · 4 of 4 shown</div>
                    <div className="subrow-meta">1 fixable (frequency cap) · 3 saturating</div>
                  </div>
                  <table className="subrow-tbl">
                    <thead>
                      <tr><th>Campaign</th><th className="r">Spend</th><th className="r">Revenue</th><th className="r">ROI</th><th className="r">CVR</th><th className="r">Δ 30d</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="subrow-camp">Meta_Retarget_Cart_Abandoners</div><div className="subrow-camp-sub">Abandoned cart · 7d window</div></td>
                        <td className="r">$228K</td><td className="r">$456K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>2.00×</span></td>
                        <td className="r">4.1%</td><td className="r"><span className="delta down">−0.3</span></td>
                        <td><span className="camp-tag fix">Cap frequency</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Meta_RT_Site_Visitors_30d</div><div className="subrow-camp-sub">All site visitors · 30d</div></td>
                        <td className="r">$184K</td><td className="r">$272K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>1.48×</span></td>
                        <td className="r">2.2%</td><td className="r"><span className="delta down">−0.5</span></td>
                        <td><span className="camp-tag fix">Cap spend</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Meta_RT_Email_List_Match</div><div className="subrow-camp-sub">CRM list match · existing leads</div></td>
                        <td className="r">$132K</td><td className="r">$172K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>1.30×</span></td>
                        <td className="r">1.8%</td><td className="r"><span className="delta down">−0.4</span></td>
                        <td><span className="camp-tag fix">Cap spend</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">Meta_RT_Video_Viewers</div><div className="subrow-camp-sub">Video 75% completers</div></td>
                        <td className="r">$68K</td><td className="r">$110K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>1.62×</span></td>
                        <td className="r">2.0%</td><td className="r"><span className="delta neu">±0.0</span></td>
                        <td><span className="camp-tag hold">Hold</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            {/* 9. Display RT — losing money */}
            <tr className="channel-row" data-id="display-rt">
              <td><div className="ch-name"><span className="ch-toggle">▸</span><span className="ch-dot" style={{background: "#DC2626"}}></span><div>Display Retargeting<div className="ch-sub">GDN · 3 campaigns</div></div></div></td>
              <td className="r">$565K</td><td className="r">$480K</td>
              <td className="r"><span className="roi-val bad">0.85×</span></td>
              <td className="r"><span className="roi-val bad" style={{fontSize: "13px"}}>0.45×</span></td>
              <td><div className="headroom-cell"><div className="headroom-bar"><div className="headroom-fill tapped" style={{width: "0%"}}></div></div><span className="headroom-pct tapped">−$565K</span></div></td>
              <td><span className="sat-chip satu">Losing money</span></td>
            </tr>
            <tr className="campaign-subrow" data-parent="display-rt">
              <td colSpan={7}>
                <div className="subrow-inner">
                  <div className="subrow-h">
                    <div className="subrow-title"><strong>Display Retargeting campaigns</strong> · 3 of 3 shown</div>
                    <div className="subrow-meta">All below break-even · cut and redeploy $565K</div>
                  </div>
                  <table className="subrow-tbl">
                    <thead>
                      <tr><th>Campaign</th><th className="r">Spend</th><th className="r">Revenue</th><th className="r">ROI</th><th className="r">CVR</th><th className="r">Δ 30d</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="subrow-camp">GDN_Retarget_SiteVisitors</div><div className="subrow-camp-sub">GDN · all site visitors</div></td>
                        <td className="r">$252K</td><td className="r">$276K</td>
                        <td className="r"><span className="roi-val warn" style={{fontSize: "12px"}}>1.10×</span></td>
                        <td className="r">0.3%</td><td className="r"><span className="delta down">−0.4</span></td>
                        <td><span className="camp-tag cut">Cut</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">GDN_Prospecting_Contextual</div><div className="subrow-camp-sub">Contextual targeting</div></td>
                        <td className="r">$204K</td><td className="r">$96K</td>
                        <td className="r"><span className="roi-val bad" style={{fontSize: "12px"}}>0.47×</span></td>
                        <td className="r">0.1%</td><td className="r"><span className="delta down">−0.5</span></td>
                        <td><span className="camp-tag cut">Cut immediately</span></td>
                      </tr>
                      <tr>
                        <td><div className="subrow-camp">GDN_Generic_Display</div><div className="subrow-camp-sub">Generic placements · open</div></td>
                        <td className="r">$0K</td><td className="r">$0K</td>
                        <td className="r"><span className="roi-val" style={{fontSize: "12px", color: "var(--text-3)"}}>—</span></td>
                        <td className="r">—</td><td className="r"><span className="delta neu">paused</span></td>
                        <td><span className="camp-tag cut">Already off</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="annot" style={{marginTop: "14px"}}>
          <strong>Reading the headroom column —</strong> green bars (top three rows) show channels with room to grow. Red values at the bottom show channels you should pull from. Net: <em>$1.0M shifted from the bottom four into the top three would lift portfolio ROI from 3.60× to ~3.95×</em> (modeled, ±0.15×).
        </div>
      </div>

      <div className="beat-bridge"><strong style={{color: "var(--text)", fontStyle: "normal"}}>The argument, end-to-end:</strong> 78% of your $30.19M revenue lives in three channels — but two of them (Brand Search, Organic) are saturated. The next dollar of growth has to come from <em>LinkedIn B2B, YouTube, or Email</em>, where you have $1.24M+ of headroom at marginal ROI ≥ 2.4×. The bottom four channels are leaking $1.24M that should be reallocated. Click any row above for the campaign-level evidence.</div>
    </section>

    {/* Bridge to Screen 03 */}
    <a href="/attribution" className="bridge" style={{marginTop: "32px"}}>
      <div>
        <div className="bridge-eyebrow">Continue · Screen 04</div>
        <div className="bridge-h">Before you act on this — can you trust these numbers? Let's inspect the attribution models, the data quality, and the confidence intervals behind every claim above.</div>
      </div>
      <div className="bridge-arrow">→</div>
    </a>

  </main>
  );
});
