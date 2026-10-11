import s from './charts.module.css';

// values[r][c]; colour intensity by rank within each column (1 = best).
export default function Heatmap({ rows, cols, values, format = (v) => v, ariaLabel, highlightRow }) {
  const cw = 120;
  const ch = 34;
  const left = 150;
  const top = 30;
  const W = left + cols.length * cw;
  const H = top + rows.length * ch + 4;
  const shade = (v) => ['var(--olive)', 'var(--sage)', 'var(--sage-light)', 'var(--stone)', 'var(--stone)', 'var(--paper)'][v - 1] ?? 'var(--paper)';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={s.chart} role="img" aria-label={ariaLabel}>
      {cols.map((c, j) => (
        <text key={c} x={left + j * cw + cw / 2} y={top - 10} textAnchor="middle" className={s.tick}>{c}</text>
      ))}
      {rows.map((r, i) => (
        <g key={r}>
          <text x={left - 10} y={top + i * ch + ch / 2 + 4} textAnchor="end" className={r === highlightRow ? s.markLabel : s.markLabelMuted}>{r}</text>
          {cols.map((c, j) => {
            const v = values[i][j];
            return (
              <g key={c}>
                <title>{`${r} · ${c}: ${format(v)}`}</title>
                <rect x={left + j * cw + 2} y={top + i * ch + 2} width={cw - 4} height={ch - 4} rx="3" fill={shade(v)} stroke="var(--hairline)" strokeWidth="0.5" />
                <text x={left + j * cw + cw / 2} y={top + i * ch + ch / 2 + 4} textAnchor="middle" className={s.cell} fill={v === 1 ? 'var(--paper)' : 'var(--ink)'}>{format(v)}</text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
