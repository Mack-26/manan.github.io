import s from './blocks.module.css';

export default function Section({ n, label, title, children, id }) {
  return (
    <section className={s.section} id={id}>
      <div className={s.sectionHead}>
        {n != null && <span className={s.sectionNum}>{String(n).padStart(2, '0')}</span>}
        {label && <span className={s.sectionLabel}>{label}</span>}
      </div>
      {title && <h2 className={s.sectionTitle}>{title}</h2>}
      {children}
    </section>
  );
}

export function Prose({ children }) {
  return <div className={s.prose}>{children}</div>;
}
