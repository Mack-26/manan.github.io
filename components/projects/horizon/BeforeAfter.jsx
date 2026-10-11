import s from './horizon.module.css';

const ROWS = [
  ['Answers from the open web', 'Answers from your course’s own materials, cited to the page'],
  ['Every student asks alone, in private', 'One shared feed: a confusion asked once helps the whole group'],
  ['Nobody checks the answer', 'Classmates vote and comment; shaky answers get flagged'],
  ['Instructors can’t see any of it', 'TAs see which topics are confusing, while there’s still time'],
];

export default function BeforeAfter() {
  return (
    <div className={s.compare}>
      <div className={s.col}>
        <div className={s.colHead}>Private chatbot</div>
        {ROWS.map(([before]) => <div key={before} className={s.item}>{before}</div>)}
      </div>
      <div className={s.col}>
        <div className={s.colHead}>Horizon</div>
        {ROWS.map(([, after]) => <div key={after} className={s.item}><strong>{after}</strong></div>)}
      </div>
    </div>
  );
}
