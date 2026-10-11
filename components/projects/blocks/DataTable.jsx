import s from './blocks.module.css';

export default function DataTable({ columns, rows, highlight, caption }) {
  return (
    <div className={s.tableScroll}>
      <table className={s.table}>
        {caption && <caption className={s.tableCaption}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} data-align={c.align} scope="col">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} data-highlight={highlight ? String(Boolean(highlight(row))) : undefined}>
              {columns.map((c) => (
                <td key={c.key} data-align={c.align}>{row[c.key] ?? '—'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
