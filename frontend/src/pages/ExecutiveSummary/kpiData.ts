export type MetricKey = 'roi' | 'cac' | 'revenue' | 'spend';

export interface MetricSeries {
  title: string;
  tag: string;
  legendMetric: string;
  legendBenchmark: string;
  currentLabel: string;
  delta: string;
  deltaDir: 'up' | 'down';
  yMin: number;
  yMax: number;
  benchmark: number;
  points: number[];
  formatY: (v: number) => string;
}

export const MONTHS = [
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
  'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May',
];

export const KPI_DATA: Record<MetricKey, MetricSeries> = {
  roi: {
    title: 'Return on marketing investment · 12 months',
    tag: 'May 2024 · 12 months trailing · monthly',
    legendMetric: 'ROI · Acme Retail',
    legendBenchmark: 'Industry benchmark · 2.40×',
    currentLabel: '3.60×',
    delta: '+8.4% vs Apr',
    deltaDir: 'up',
    yMin: 1.8,
    yMax: 4.2,
    benchmark: 2.4,
    points: [2.85, 2.92, 3.05, 3.18, 3.42, 3.95, 4.1, 3.65, 3.2, 3.28, 3.32, 3.6],
    formatY: (v) => v.toFixed(2) + '×',
  },
  cac: {
    title: 'Customer acquisition cost · 12 months',
    tag: 'May 2024 · 12 months trailing · monthly',
    legendMetric: 'CAC · Acme Retail',
    legendBenchmark: 'Industry benchmark · $245',
    currentLabel: '$285',
    delta: '+4.8% vs Apr',
    deltaDir: 'down',
    yMin: 220,
    yMax: 320,
    benchmark: 245,
    points: [262, 258, 255, 248, 240, 235, 232, 245, 268, 275, 272, 285],
    formatY: (v) => '$' + Math.round(v),
  },
  revenue: {
    title: 'Marketing-attributed revenue · 12 months',
    tag: 'May 2024 · monthly · $30.2M trailing 12mo',
    legendMetric: 'Revenue · Acme Retail',
    legendBenchmark: 'Industry pace · $2.4M / mo',
    currentLabel: '$2.52M',
    delta: '+5.0% vs Apr',
    deltaDir: 'up',
    yMin: 1.6,
    yMax: 4.4,
    benchmark: 2.4,
    points: [2.05, 2.18, 2.32, 2.45, 2.62, 3.85, 4.12, 2.45, 2.2, 2.28, 2.4, 2.52],
    formatY: (v) => '$' + v.toFixed(1) + 'M',
  },
  spend: {
    title: 'Marketing spend · 12 months',
    tag: 'May 2024 · 12 months trailing · monthly',
    legendMetric: 'Spend · Acme Retail',
    legendBenchmark: 'Plan pace · $700K / mo',
    currentLabel: '$702K',
    delta: '−3.0% vs Apr',
    deltaDir: 'up',
    yMin: 500,
    yMax: 950,
    benchmark: 700,
    points: [650, 660, 670, 685, 705, 880, 920, 720, 700, 715, 725, 702],
    formatY: (v) => '$' + Math.round(v) + 'K',
  },
};
