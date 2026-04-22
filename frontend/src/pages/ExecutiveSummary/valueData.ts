export type SortKey = 'impact' | 'urgency' | 'confidence';
export type CardKey = 'rev' | 'cx' | 'cost';

export interface VBar {
  name: string;
  valK: number;
  pct: number;
}
export interface VAction {
  amtK: number;
  text: string;
}
export interface VCardData {
  bars: VBar[];
  actions: VAction[];
}

export const VALUE_DATA: Record<CardKey, Record<SortKey, VCardData>> = {
  rev: {
    impact: {
      bars: [
        { name: 'LinkedIn B2B scale', valK: 520, pct: 80 },
        { name: 'NB Search expand', valK: 420, pct: 64 },
        { name: 'Email automation', valK: 300, pct: 46 },
      ],
      actions: [
        { amtK: 520, text: 'Double LinkedIn_B2B_DM spend (4.2× ROI, headroom confirmed)' },
        { amtK: 420, text: 'Expand NB_Search_HighIntent into 14 new keyword groups' },
        { amtK: 300, text: 'Launch behavior-triggered email sequence for cart abandons' },
      ],
    },
    urgency: {
      bars: [
        { name: 'Email automation', valK: 300, pct: 95 },
        { name: 'LinkedIn B2B scale', valK: 520, pct: 78 },
        { name: 'Brand Search defend', valK: 180, pct: 64 },
      ],
      actions: [
        { amtK: 300, text: 'Launch email sequence — 14d of compounding lift if shipped this week' },
        { amtK: 520, text: 'Scale LinkedIn before competitor enters — window closes in 5 weeks' },
        { amtK: 180, text: 'Defend Brand Search keyword bids before quarterly spend reset' },
      ],
    },
    confidence: {
      bars: [
        { name: 'NB Search expand', valK: 420, pct: 92 },
        { name: 'Brand Search defend', valK: 180, pct: 86 },
        { name: 'LinkedIn B2B scale', valK: 520, pct: 78 },
      ],
      actions: [
        { amtK: 420, text: 'Expand NB_Search_HighIntent — 92% conf based on 6mo geo-lift test' },
        { amtK: 180, text: 'Defend Brand Search bids — 86% conf, repeated playbook' },
        { amtK: 520, text: 'Scale LinkedIn — 78% conf, headroom inferred from saturation curve' },
      ],
    },
  },
  cx: {
    impact: {
      bars: [
        { name: 'Mobile checkout', valK: 920, pct: 90 },
        { name: 'Form abandonment', valK: 510, pct: 50 },
        { name: 'Cart recovery flow', valK: 370, pct: 36 },
      ],
      actions: [
        { amtK: 920, text: 'Fix mobile checkout — 4.5× higher drop-off vs desktop on payment step' },
        { amtK: 510, text: 'Reduce form fields on the lead-gen flow from 12 to 6' },
        { amtK: 370, text: 'Add 2-step cart recovery (24h email + 72h SMS)' },
      ],
    },
    urgency: {
      bars: [
        { name: 'Mobile checkout', valK: 920, pct: 98 },
        { name: 'Cart recovery flow', valK: 370, pct: 72 },
        { name: 'Form abandonment', valK: 510, pct: 60 },
      ],
      actions: [
        { amtK: 920, text: 'Fix mobile checkout — bleeding daily, every week of delay = ~$25K lost' },
        { amtK: 370, text: 'Cart recovery flow — competitive baseline, ship in next sprint' },
        { amtK: 510, text: 'Reduce form fields — slower fix but compounding once shipped' },
      ],
    },
    confidence: {
      bars: [
        { name: 'Mobile checkout', valK: 920, pct: 94 },
        { name: 'Form abandonment', valK: 510, pct: 88 },
        { name: 'Cart recovery flow', valK: 370, pct: 70 },
      ],
      actions: [
        { amtK: 920, text: 'Mobile checkout fix — 94% conf, A/B test on similar SKU showed +42%' },
        { amtK: 510, text: 'Form reduction — 88% conf, well-established UX literature' },
        { amtK: 370, text: "Cart recovery — 70% conf, your audience's behavior is atypical" },
      ],
    },
  },
  cost: {
    impact: {
      bars: [
        { name: 'Cut Display RT', valK: 420, pct: 88 },
        { name: 'Meta CPM renegot.', valK: 310, pct: 64 },
        { name: 'Frequency cap', valK: 180, pct: 38 },
      ],
      actions: [
        { amtK: 420, text: 'Cut Display Retargeting to zero (returning $0.82 per $1)' },
        { amtK: 310, text: 'Renegotiate Meta CPM rate — currently 22% above benchmark' },
        { amtK: 180, text: 'Cap Meta Retargeting frequency at 6/week (currently 11/week)' },
      ],
    },
    urgency: {
      bars: [
        { name: 'Cut Display RT', valK: 420, pct: 100 },
        { name: 'Frequency cap', valK: 180, pct: 80 },
        { name: 'Meta CPM renegot.', valK: 310, pct: 48 },
      ],
      actions: [
        { amtK: 420, text: 'Cut Display RT immediately — every day costs ~$1.4K in negative ROI' },
        { amtK: 180, text: 'Cap Meta frequency this week — audience fatigue compounds fast' },
        { amtK: 310, text: 'Meta CPM renegotiation — depends on Q3 contract cycle, ~6 weeks' },
      ],
    },
    confidence: {
      bars: [
        { name: 'Cut Display RT', valK: 420, pct: 96 },
        { name: 'Frequency cap', valK: 180, pct: 82 },
        { name: 'Meta CPM renegot.', valK: 310, pct: 64 },
      ],
      actions: [
        { amtK: 420, text: 'Cut Display RT — 96% conf, return is unambiguous below 1×' },
        { amtK: 180, text: 'Frequency cap — 82% conf based on industry diminishing-returns data' },
        { amtK: 310, text: "CPM renegotiation — 64% conf, depends on Meta's account-level decision" },
      ],
    },
  },
};

export const CARD_META: Record<
  CardKey,
  { label: string; total: string; opps: string; footLabel: string; cls: string }
> = {
  rev: {
    label: 'Revenue Uplift',
    total: '+$1.5M',
    opps: '12 opportunities',
    footLabel: 'Open all 12 actions →',
    cls: 'rev',
  },
  cx: {
    label: 'CX Uplift',
    total: '+$1.8M',
    opps: '4 opportunities',
    footLabel: 'Open all 4 actions →',
    cls: 'cx',
  },
  cost: {
    label: 'Cost Reduction',
    total: '+$1.0M',
    opps: '5 opportunities',
    footLabel: 'Open all 5 actions →',
    cls: 'cost',
  },
};
