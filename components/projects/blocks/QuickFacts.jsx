import s from './blocks.module.css';

export default function QuickFacts({ facts }) {
  return (
    <dl className={s.facts}>
      {facts.map((f) => (
        <div key={f.label}>
          <dt className={s.factLabel}>{f.label}</dt>
          <dd className={s.factValue}>
            {f.href ? (
              <a href={f.href} target={f.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {f.value}
              </a>
            ) : (
              f.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
