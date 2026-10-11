import s from './Flow.module.css';

// A left-to-right flow of steps that stacks vertically on narrow screens.
// steps: [{ title, body, accent?, tag? }]
export default function Flow({ steps, label }) {
  return (
    <ol className={s.flow} aria-label={label}>
      {steps.map((st, i) => (
        <li key={st.title} className={s.step} data-accent={st.accent ? 'true' : undefined}>
          <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
          <span className={s.title}>{st.title}</span>
          <span className={s.body}>{st.body}</span>
          {st.tag && <span className={s.tag}>{st.tag}</span>}
        </li>
      ))}
    </ol>
  );
}
