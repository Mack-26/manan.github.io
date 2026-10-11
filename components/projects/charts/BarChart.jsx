import s from './charts.module.css';
import { linearScale, niceTicks } from '@/lib/projects/scale';
import { W, M, fmt, labelGutter } from './frame';

// Horizontal bars: [{ label, value, color?, emphasis? }]; optional threshold line.
export default function BarChart({ bars, unit = '', threshold, ariaLabel, max }) {
  const rowH = 34;
  const left = labelGutter(bars.map((b) => b.label));
  const top = threshold ? 30 : M.top;
  const H = top + bars.length * rowH + 36;
  const ticks = niceTicks(0, max ?? Math.max(...bars.map((b) => b.value), threshold?.value ?? 0), 4);
  const sx = linearScale([0, ticks[ticks.length - 1]], [left, W - M.right - 40]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={s.chart} role="img" aria-label={ariaLabel}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={sx(t)} x2={sx(t)} y1={top} y2={H - 30} className={s.grid} />
          <text x={sx(t)} y={H - 12} textAnchor="middle" className={s.tick}>{fmt(t)}{unit}</text>
        </g>
      ))}
      {bars.map((b, i) => {
        const y = top + i * rowH;
        return (
          <g key={b.label}>
            <title>{`${b.label}: ${b.value}${unit}`}</title>
            <text x={left - 10} y={y + rowH / 2 + 4} textAnchor="end" className={b.emphasis ? s.markLabel : s.markLabelMuted}>{b.label}</text>
            <rect x={left} y={y + 6} width={Math.max(2, sx(b.value) - left)} height={rowH - 12} rx="3" fill={b.color ?? (b.emphasis ? 'var(--olive)' : 'var(--hairline)')} />
            <text x={sx(b.value) + 6} y={y + rowH / 2 + 4} className={b.emphasis ? s.markLabel : s.markLabelMuted}>{fmt(b.value)}{unit}</text>
          </g>
        );
      })}
      {threshold && (
        <g>
          <line x1={sx(threshold.value)} x2={sx(threshold.value)} y1={top - 4} y2={H - 30} stroke="var(--accent)" strokeDasharray="4 3" strokeWidth="1.5" />
          <text x={sx(threshold.value) + 5} y={14} className={s.markLabel} fill="var(--accent)">{threshold.label}</text>
        </g>
      )}
    </svg>
  );
}
