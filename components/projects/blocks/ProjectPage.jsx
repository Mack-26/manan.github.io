import s from './blocks.module.css';
import ReachOut from './ReachOut';

// Page shell shared by every featured project.
export default function ProjectPage({ children, reachOut }) {
  return (
    <main className={s.page}>
      <div className={s.wrap}>
        {children}
        <ReachOut line={reachOut} />
      </div>
    </main>
  );
}
