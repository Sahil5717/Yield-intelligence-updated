import { useState } from 'react';
import { KPI_DATA, MONTHS, type MetricKey } from '../pages/ExecutiveSummary/kpiData';

const X0 = 50,
  X1 = 700,
  Y0 = 24,
  Y1 = 196;
const GRID_LINES = 4;

const scaleX = (i: number) => X0 + (i / (MONTHS.length - 1)) * (X1 - X0);
const scaleY = (v: number, yMin: number, yMax: number) =>
  Y1 - ((v - yMin) / (yMax - yMin)) * (Y1 - Y0);

function buildPath(points: number[], yMin: number, yMax: number): string {
  return points
    .map(
      (v, i) =>
        (i === 0 ? 'M' : 'L') +
        scaleX(i).toFixed(1) +
        ',' +
        scaleY(v, yMin, yMax).toFixed(1),
    )
    .join(' ');
}

function buildAreaPath(points: number[], yMin: number, yMax: number): string {
  const top = buildPath(points, yMin, yMax);
  return (
    top +
    ' L ' +
    scaleX(points.length - 1).toFixed(1) +
    ',' +
    Y1 +
    ' L ' +
    scaleX(0).toFixed(1) +
    ',' +
    Y1 +
    ' Z'
  );
}

export function KpiTrendChart() {
  const [metric, setMetric] = useState<MetricKey>('roi');
  const d = KPI_DATA[metric];
  const { yMin, yMax } = d;

  const gridLines = Array.from({ length: GRID_LINES + 1 }, (_, i) => {
    const v = yMax - (i / GRID_LINES) * (yMax - yMin);
    const y = Y0 + (i / GRID_LINES) * (Y1 - Y0);
    return { v, y };
  });

  const benchY = scaleY(d.benchmark, yMin, yMax);
  const lastIdx = d.points.length - 1;
  const lastX = scaleX(lastIdx);
  const lastY = scaleY(d.points[lastIdx], yMin, yMax);
  const annotY = Math.max(lastY - 18, Y0 + 4);

  return (
    <div className="kpi-chart-panel" id="kpi-chart">
      <div className="kpi-chart-head">
        <div className="kpi-chart-titlewrap">
          <div className="kpi-chart-title">{d.title}</div>
          <div className="kpi-chart-headline">
            <span className="kpi-chart-headline-val">{d.currentLabel}</span>
            <span
              className={
                'kpi-chart-headline-delta ' +
                (d.deltaDir === 'up' ? 'up' : 'down')
              }
            >
              {d.delta}
            </span>
          </div>
          <div className="kpi-chart-tag">{d.tag}</div>
        </div>
        <div className="kpi-chart-controls">
          <div className="kpi-chart-selector">
            {(['roi', 'cac', 'revenue', 'spend'] as const).map((k) => (
              <button
                key={k}
                className={
                  'kpi-chart-selector-tab' + (k === metric ? ' active' : '')
                }
                onClick={() => setMetric(k)}
              >
                {k === 'roi' ? 'ROI' : k === 'cac' ? 'CAC' : k === 'revenue' ? 'Revenue' : 'Spend'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="kpi-chart-svg-wrap">
        <svg viewBox="0 0 720 240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="kpiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {gridLines.map(({ v, y }, i) => (
            <g key={i}>
              <line x1={X0} y1={y} x2={X1} y2={y} stroke="#F0F1F6" strokeWidth={1} />
              <text
                x={X0 - 8}
                y={y + 3}
                textAnchor="end"
                fontSize={10}
                fill="#8C92AC"
                fontFamily="Plus Jakarta Sans"
              >
                {d.formatY(v)}
              </text>
            </g>
          ))}

          {MONTHS.map((m, i) => {
            const isCurrent = i === MONTHS.length - 1;
            return (
              <text
                key={m + i}
                x={scaleX(i).toFixed(1)}
                y={220}
                textAnchor="middle"
                fontSize={10}
                fill={isCurrent ? '#0F1535' : '#8C92AC'}
                fontFamily="Plus Jakarta Sans"
                fontWeight={isCurrent ? 700 : 500}
              >
                {m}
              </text>
            );
          })}

          <path d={buildAreaPath(d.points, yMin, yMax)} fill="url(#kpiGrad)" opacity={0.18} />
          <line
            x1={X0}
            y1={benchY.toFixed(1)}
            x2={X1}
            y2={benchY.toFixed(1)}
            stroke="#8C92AC"
            strokeWidth={1.5}
            strokeDasharray="5,4"
            opacity={0.7}
          />
          <path
            d={buildPath(d.points, yMin, yMax)}
            fill="none"
            stroke="#7C5CFF"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {d.points.map((v, i) => {
            const x = scaleX(i);
            const y = scaleY(v, yMin, yMax);
            const isCurrent = i === d.points.length - 1;
            return isCurrent ? (
              <g key={i}>
                <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={6} fill="#7C5CFF" opacity={0.18} />
                <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={4} fill="#7C5CFF" stroke="#fff" strokeWidth={2} />
              </g>
            ) : (
              <circle
                key={i}
                cx={x.toFixed(1)}
                cy={y.toFixed(1)}
                r={3}
                fill="#fff"
                stroke="#7C5CFF"
                strokeWidth={1.5}
              />
            );
          })}

          <text
            x={X0 + 4}
            y={(benchY - 6).toFixed(1)}
            textAnchor="start"
            fontSize={9}
            fill="#5C6280"
            fontFamily="Plus Jakarta Sans"
            fontWeight={600}
            fontStyle="italic"
          >
            {d.formatY(d.benchmark)} benchmark
          </text>

          <g>
            <rect
              x={(lastX - 38).toFixed(1)}
              y={(annotY - 14).toFixed(1)}
              width={76}
              height={18}
              rx={4}
              fill="#0F1535"
            />
            <text
              x={lastX.toFixed(1)}
              y={(annotY - 1).toFixed(1)}
              textAnchor="middle"
              fontSize={11}
              fill="#fff"
              fontFamily="Fraunces"
              fontStyle="italic"
              fontWeight={600}
            >
              {d.currentLabel}
            </text>
          </g>
        </svg>
      </div>

      <div className="kpi-chart-legend">
        <div className="kpi-chart-legend-item">
          <span className="kpi-chart-legend-line metric" />
          <span>{d.legendMetric}</span>
        </div>
        <div className="kpi-chart-legend-item">
          <span className="kpi-chart-legend-line benchmark" />
          <span>{d.legendBenchmark}</span>
        </div>
      </div>
    </div>
  );
}
