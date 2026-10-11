import s from './charts.module.css';
import { linearScale, niceTicks } from '@/lib/projects/scale';
import { W, H, M, fmt } from './frame';
import Legend from './Legend';

// series: [{ name, color, points: [[x, y]], band?: [[x, lo, hi]], emphasis? }]
export default function LineChart({ series, xLabel, yLabel, yDomain, xDomain, ariaLabel, refLines = [] }) {
  const allX = series.flatMap((se) => se.points.map((p) => p[0]));
  const allY = series.flatMap((se) => [...se.points.map((p) => p[1]), ...(se.band ?? []).flatMap((b) => [b[1], b[2]])]);
  const xd = xDomain ?? [Math.min(...allX), Math.max(...allX)];
  const yTicks = niceTicks(yDomain?.[0] ?? Math.min(...allY), yDomain?.[1] ?? Math.max(...allY), 5);
  const yd = [yTicks[0], yTicks[yTicks.length - 1]];
  const sx = linearScale(xd, [M.left, W - M.right]);
  const sy = linearScale(yd, [H - M.bottom, M.top]);
  const path = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join('');
  const area = (band) =>
    `${band.map((b, i) => `${i ? 'L' : 'M'}${sx(b[0]).toFixed(1)},${sy(b[2]).toFixed(1)}`).join('')}` +
    `${[...band].reverse().map((b) => `L${sx(b[0]).toFixed(1)},${sy(b[1]).toFixed(1)}`).join('')}Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className={s.chart} role="img" aria-label={ariaLabel}>
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line x1={M.left} x2={W - M.right} y1={sy(t)} y2={sy(t)} className={s.grid} />
            <text x={M.left - 8} y={sy(t) + 4} textAnchor="end" className={s.tick}>{fmt(t)}</text>
          </g>
        ))}
        {niceTicks(xd[0], xd[1], 5).filter((t) => t >= xd[0] && t <= xd[1]).map((t) => (
          <text key={`x${t}`} x={sx(t)} y={H - M.bottom + 18} textAnchor="middle" className={s.tick}>{fmt(t)}</text>
        ))}
        <line x1={M.left} x2={W - M.right} y1={H - M.bottom} y2={H - M.bottom} stroke="var(--ink)" />
        <text x={(M.left + W - M.right) / 2} y={H - 6} textAnchor="middle" className={s.axisLabel}>{xLabel}</text>
        <text transform={`translate(14 ${(M.top + H - M.bottom) / 2}) rotate(-90)`} textAnchor="middle" className={s.axisLabel}>{yLabel}</text>
        {refLines.map((r) => (
          <g key={r.label}>
            <line x1={M.left} x2={W - M.right} y1={sy(r.y)} y2={sy(r.y)} stroke="var(--muted)" strokeDasharray="4 4" />
            <text x={W - M.right} y={sy(r.y) - 6} textAnchor="end" className={s.markLabelMuted}>{r.label}</text>
          </g>
        ))}
        {series.map((se) => se.band && <path key={`b${se.name}`} d={area(se.band)} fill={se.color} opacity="0.15" />)}
        {series.map((se) => (
          <path key={se.name} d={path(se.points)} fill="none" stroke={se.color} strokeWidth={se.emphasis ? 2.5 : 1.6} strokeLinejoin="round">
            <title>{se.name}</title>
          </path>
        ))}
      </svg>
      <Legend items={series.map((se) => ({ label: se.name, color: se.color }))} />
    </div>
  );
}
