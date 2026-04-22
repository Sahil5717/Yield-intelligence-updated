import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRegisterAtlasScreen } from '../../atlas/AtlasProvider';
import { useOppSelection } from './useOppSelection';
import { OpportunitiesBody } from './OpportunitiesBody';
import { fmtImpactSigned } from '../../lib/format';
import { useRecommendations } from '../../lib/hooks';
import { LiveDataBanner } from '../../components/LiveDataBanner';

const ATLAS_CONFIG = {
  screen: '02',
  screenTitle: 'Opportunities',
  openingNote:
    "I've pre-selected 11 moves based on your data — the tactical plays with high confidence, the quick-payback cost reductions, and the server-side tagging capability. <strong>Toggle them to build your scenario</strong>. The sticky bar at the bottom sums the standalone impacts; the real optimizer will compose them with overlap-awareness on the next screen.",
  prompts: [
    'What rule drove the auto-selection?',
    'Which opportunities have the shortest payback?',
    'What are the risks of stacking these?',
    'Compare "Recommended" vs picking everything',
  ],
};

export function Opportunities() {
  useRegisterAtlasScreen(ATLAS_CONFIG);
  const mainRef = useRef<HTMLElement>(null);
  const { selected, totalImpactK, clear, resetToDefaults } = useOppSelection(mainRef);
  const recs = useRecommendations();

  const autoHint = (
    <div className="auto-hint">
      <div className="auto-hint-icon">◈</div>
      <div className="auto-hint-text">
        <strong>11 opportunities pre-selected</strong> based on your data + rules — tactical moves with high confidence, quick-payback cost reductions, and the server-side tagging capability play.{' '}
        <em>Toggle any of them off, or add bigger strategic bets from below.</em>
      </div>
      <button className="auto-hint-btn" onClick={resetToDefaults}>
        Reset to defaults
      </button>
    </div>
  );

  const scenarioBar = (
    <div className={'scenario-bar' + (selected.length > 0 ? ' visible' : '')}>
      <div className="scenario-bar-left">
        <div className="scenario-bar-count">
          <div className="scenario-bar-count-val">{selected.length}</div>
          <div className="scenario-bar-count-label">opportunities selected</div>
        </div>
        <div className="scenario-bar-divider" />
        <div className="scenario-bar-impact">
          <div className="scenario-bar-impact-val">
            {selected.length === 0 ? '+$0' : fmtImpactSigned(totalImpactK)}
          </div>
          <div className="scenario-bar-impact-label">
            sum of standalone impacts · annualized
          </div>
        </div>
      </div>
      <div className="scenario-bar-cta">
        <button className="scenario-btn secondary" onClick={clear}>
          Clear
        </button>
        <Link to="/optimize" className="scenario-btn primary">
          Continue to Optimize →
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <LiveDataBanner
        label="Opportunities"
        resource={recs}
        stats={(d) => {
          const increases = d.filter((r) => r.action === 'increase').length;
          const decreases = d.filter((r) => r.action === 'decrease').length;
          const totalLift = d.reduce(
            (sum, r) => sum + (Number(r.expected_revenue_lift) || 0),
            0,
          );
          return [
            { label: 'Recommendations', value: String(d.length) },
            { label: 'Increases', value: String(increases) },
            { label: 'Decreases', value: String(decreases) },
            {
              label: 'Expected lift',
              value:
                totalLift
                  ? '$' + (totalLift / 1_000_000).toFixed(1) + 'M'
                  : '—',
            },
          ];
        }}
      />
      <OpportunitiesBody ref={mainRef} autoHint={autoHint} scenarioBar={scenarioBar} />
    </>
  );
}
