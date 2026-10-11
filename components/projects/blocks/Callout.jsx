import s from './blocks.module.css';

const KIND = { challenge: 'Hardest problem', failure: 'What didn’t work', note: 'Note' };

export default function Callout({ kind = 'note', title, children }) {
  return (
    <aside className={s.callout} data-kind={kind}>
      <span className={s.calloutKind}>{KIND[kind]}</span>
      {title && <p className={s.calloutTitle}>{title}</p>}
      {children}
    </aside>
  );
}
