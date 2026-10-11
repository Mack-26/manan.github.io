import s from './charts.module.css';
import { linearScale, logScale, niceTicks } from '@/lib/projects/scale';
import { W, H, M, fmt } from './frame';
import Legend from './Legend';

// points: [{ x, y, label, group, dy? }] (dy nudges a label vertically to avoid overlaps); groups: { [group]: { color, label } }
export default function ScatterChart({ points, groups, xLog, xLabel, yLabel, xTicks, yDomain, ariaLabel }) {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xd = xLog ? [Math.min(...xs) / 1.5, Math.max(...xs) * 1.5] : [Math.min(...xs), Math.max(...xs)];
  const pad = (Math.max(...ys) - Math.min(...ys)) * 0.12 || 1;
  const yTicks = niceTicks(yDomain?.[0] ?? Math.min(...ys) - pad, yDomain?.[1] ?? Math.max(...ys) + pad, 5);
  const yd = [yTicks[0], yTicks[yTicks.length - 1]];
  const sx = (xLog ? logScale : linearScale)(xd, [M.left, W - M.right]);
  const sy = linearScale(yd, [H - M.bottom, M.top]);
  const xt = xTicks ?? (xLog ? [1, 2, 5, 10, 20, 50, 100].filter((t) => t >= xd[0] && t <= xd[1]) : niceTicks(xd[0], xd[1], 5));

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className={s.chart} role="img" aria-label={ariaLabel}>
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line x1={M.left} x2={W - M.right} y1={sy(t)} y2={sy(t)} className={s.grid} />
            <text x={M.left - 8} y={sy(t) + 4} textAnchor="end" className={s.tick}>{fmt(t)}</text>
          </g>
        ))}
        {xt.map((t) => (
          <text key={`x${t}`} x={sx(t)} y={H - M.bottom + 18} textAnchor="middle" className={s.tick}>{fmt(t)}</text>
        ))}
        <line x1={M.left} x2={W - M.right} y1={H - M.bottom} y2={H - M.bottom} stroke="var(--ink)" />
        <text x={(M.left + W - M.right) / 2} y={H - 6} textAnchor="middle" className={s.axisLabel}>{xLabel}</text>
        <text transform={`translate(14 ${(M.top + H - M.bottom) / 2}) rotate(-90)`} textAnchor="middle" className={s.axisLabel}>{yLabel}</text>
        {points.map((p) => {
          const g = groups[p.group];
          const cx = sx(p.x);
          const right = cx < W - 120;
          return (
            <g key={p.label}>
              <title>{`${p.label}: ${p.y}`}</title>
              <circle cx={cx} cy={sy(p.y)} r={g.emphasis ? 7 : 5} fill={g.color} stroke="var(--paper)" strokeWidth="2" />
              <text x={cx + (right ? 11 : -11)} y={sy(p.y) + 4 + (p.dy ?? 0)} textAnchor={right ? 'start' : 'end'} className={g.emphasis ? s.markLabel : s.markLabelMuted}>
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
      <Legend items={Object.values(groups)} />
    </div>
  );
}
