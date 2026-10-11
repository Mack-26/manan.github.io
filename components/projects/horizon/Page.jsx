import ProjectPage from '@/components/projects/blocks/ProjectPage';
import Hero from '@/components/projects/blocks/Hero';
import Section, { Prose } from '@/components/projects/blocks/Section';
import StatRow from '@/components/projects/blocks/StatRow';
import Figure from '@/components/projects/blocks/Figure';
import Video from '@/components/projects/blocks/Video';
import Callout from '@/components/projects/blocks/Callout';
import QuestionFlow from './QuestionFlow';
import BeforeAfter from './BeforeAfter';
import evaluation from './data/eval.json';

export default function Page() {
  return (
    <ProjectPage reachOut="Teaching, building for students, or just curious about grounded RAG? Let’s talk.">
      <Hero
        eyebrow="Product · AI for learning"
        title="Horizon"
        subtitle="A shared study space where AI answers come from your own course materials, cited to the page, and where classmates and TAs can see and check them."
        facts={[
          { label: 'Role', value: 'Founder · built the full stack' },
          { label: 'When', value: '2026' },
          { label: 'Stack', value: 'React · FastAPI · Postgres + pgvector · OpenAI · Azure' },
          { label: 'Live', value: 'horizonlabs.live ↗', href: 'https://www.horizonlabs.live' },
        ]}
        media={
          <Figure provenance="real" caption="The real product: a study group working on SVD homework. Answers cite the lecture notes and the homework PDF; a student forks a thread into a private space to go deeper." bare>
            <Video src="/projects/horizon/demo.mp4" poster="/projects/horizon/demo.jpg" label="Product walkthrough" />
          </Figure>
        }
      />

      <Section n={1} label="Problem" title="Students already ask AI. Nobody can see the answers.">
        <Prose>
          <p>
            In a 300-person lecture, most confusion never becomes a question. Students don’t want to look slow in
            front of the room, office hours are at the wrong time, and so they ask a chatbot instead, alone.
          </p>
          <p>
            That answer comes from the open internet, not the course. It might be wrong, nobody checks it, and the
            professor never learns that half the class was stuck on the same idea.
          </p>
        </Prose>
        <StatRow
          stats={[
            { value: '48%', label: 'of undergrads in large science lectures never ask a question all term', note: 'Nadile et al., PLOS ONE, 2021' },
            { value: '6–10×', label: 'more questions when students could ask anonymously', note: 'Perry Samson’s backchannel, U-M lectures' },
            { value: '86%', label: 'of students already use AI in their studies', note: 'Digital Education Council, 2024' },
          ]}
        />
      </Section>

      <Section n={2} label="Why this" title="Make the AI conversation shared, grounded and checkable">
        <Prose>
          <p>
            Banning chatbots doesn’t work, and a better private chatbot keeps the same blind spots. The fix is
            structural: put the AI inside the course, where answers come from the course’s own materials and the
            conversation is visible to the people who can correct it.
          </p>
        </Prose>
        <Figure bare>
          <BeforeAfter />
        </Figure>
      </Section>

      <Section n={3} label="How it works" title="What happens to one question">
        <QuestionFlow />
        <Callout kind="challenge" title="Citations a student can actually check">
          <p>
            A citation is only useful if clicking it opens the right page. Each retrieved chunk is numbered in the
            prompt, and the number the model sees is the number saved with that chunk and its page, so [2] in the
            answer always points to the same passage in the PDF.
          </p>
          <p>
            Course materials are messy: scanned PDFs, slides, pasted text. Documents without usable embeddings are
            still included, ranked after the vector matches, so nothing a professor uploads silently disappears.
          </p>
        </Callout>
        <Prose>
          <p>
            Under the hood: a FastAPI backend on Postgres with pgvector, with documents, chunks, questions, answers
            and citations as first-class tables, so every answer can be traced to its sources. The frontend is
            React, and the whole thing deploys to Azure.
          </p>
        </Prose>
      </Section>

      <Section n={4} label="Evaluation" title="How I’m measuring it">
        <Prose>
          <p>
            Two kinds of evidence matter: is the AI grounded, and do students actually use the shared feed? These are
            the metrics I’m tracking. Values tagged <em>prelim.</em> are placeholders, not yet measured, and will be
            replaced with real numbers.
          </p>
        </Prose>
        <StatRow stats={evaluation.metrics.map((m) => ({ value: m.value, label: m.label, note: m.how, placeholder: m.placeholder }))} />
      </Section>

      <Section n={5} label="Next" title="What’s next">
        <Prose>
          <ul>
            <li>A department pilot: a few courses, one term, measured on whether students use the shared feed.</li>
            <li>LMS integration (LTI 1.3, Canvas roster sync), so instructors don’t invite 400 students by hand.</li>
            <li>Topic-level reports that tell a TA what to re-teach before the exam, not after.</li>
          </ul>
        </Prose>
      </Section>
    </ProjectPage>
  );
}
