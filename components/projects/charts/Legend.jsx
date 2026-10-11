import s from './charts.module.css';

export default function Legend({ items }) {
  return (
    <div className={s.legend}>
      {items.map((it) => (
        <span key={it.label}>
          <span className={s.swatch} style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}
