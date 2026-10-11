import s from './blocks.module.css';
import Stat from './Stat';

export default function StatRow({ stats }) {
  return (
    <div className={s.statRow}>
      {stats.map((st) => (
        <Stat key={st.label} {...st} />
      ))}
    </div>
  );
}
