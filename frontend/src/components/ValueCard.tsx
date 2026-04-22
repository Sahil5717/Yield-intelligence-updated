import { CARD_META, VALUE_DATA, type CardKey, type SortKey } from '../pages/ExecutiveSummary/valueData';
import { fmtMoneyK } from '../lib/format';

export function ValueCard({ cardKey, sort }: { cardKey: CardKey; sort: SortKey }) {
  const meta = CARD_META[cardKey];
  const data = VALUE_DATA[cardKey][sort];
  const totalCount =
    cardKey === 'rev' ? 12 : cardKey === 'cx' ? 4 : 5;

  return (
    <div className={'vcard ' + meta.cls}>
      <div className="vcard-label">{meta.label}</div>
      <div className="vcard-amt">{meta.total}</div>
      <div className="vcard-opps">{meta.opps}</div>

      <div className="vbar-list">
        {data.bars.map((b) => (
          <div key={b.name} className="vbar-row">
            <div className="vbar-name">{b.name}</div>
            <div className="vbar-track">
              <div className="vbar-fill" style={{ width: b.pct + '%' }} />
            </div>
            <div className="vbar-val">{fmtMoneyK(b.valK)}</div>
          </div>
        ))}
      </div>

      <div className="vcard-divider" />
      <div className="vactions-label">
        Top actions <span className="vactions-count">3 of {totalCount}</span>
      </div>

      {data.actions.map((a, i) => (
        <div key={i} className="vaction">
          <div className="vaction-amt">{fmtMoneyK(a.amtK)}</div>
          <div className="vaction-text">{a.text}</div>
        </div>
      ))}

      <a href="#" className="vcard-foot">
        {meta.footLabel}
      </a>
    </div>
  );
}
