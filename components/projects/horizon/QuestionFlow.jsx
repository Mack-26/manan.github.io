import s from './horizon.module.css';

// One question's path through Horizon, as implemented in backend/services/rag_service.py.
const STEPS = [
  { who: 'student', title: 'A question in the group chat', body: <>Asked in the shared study-group feed, optionally anonymous, or forked into a private space to dig deeper.</> },
  { who: 'system', title: 'Embed it', body: <>OpenAI <code>text-embedding-3-small</code> turns the question into a 1536-d vector.</> },
  { who: 'system', title: 'Search only this course’s materials', body: <>pgvector cosine search over the chunks of documents active in this session, top 20. If the student points at one file (“this homework”), that file is searched first and the rest fill in behind it.</>, ai: true },
  { who: 'system', title: 'Fit the context budget', body: <>Chunks are taken in relevance order until a token budget runs out, so long PDFs can’t crowd out the best passage.</> },
  { who: 'ai', title: 'Answer with numbered citations', body: <>GPT-4o sees the chunks numbered [1], [2]… and must cite them inline. Each citation is saved with its chunk and page, so clicking it opens the exact page of the professor’s PDF.</>, ai: true },
  { who: 'class', title: 'Classmates verify', body: <>Anyone in the group can vote on an answer or comment on it. Wrong answers surface during the term, not on course evaluations.</> },
  { who: 'instructor', title: 'Instructors see the pattern', body: <>A report view groups questions by topic and shows answer-quality votes, so a TA knows what to re-teach on Monday.</> },
];

export default function QuestionFlow() {
  return (
    <ol className={s.path} aria-label="What happens to one question">
      {STEPS.map((st, i) => (
        <li key={st.title} className={s.step} data-ai={st.ai ? 'true' : undefined}>
          <span className={s.dot}>{i + 1}</span>
          <div>
            <div className={s.stepTitle}>
              {st.title}
              <span className={s.who}>{st.who}</span>
            </div>
            <div className={s.stepBody}>{st.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
