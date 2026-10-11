import s from './blocks.module.css';

// placeholder: an invented stand-in value; shown with a "prelim." tag until replaced.
export default function Stat({ value, label, note, placeholder }) {
  return (
    <div className={s.stat}>
      <span className={s.statValue}>
        {value}
        {placeholder && (
          <span className={s.prelim} title="Preliminary value, to be replaced">prelim.</span>
        )}
      </span>
      <span className={s.statLabel}>{label}</span>
      {note && <span className={s.statNote}>{note}</span>}
    </div>
  );
}
