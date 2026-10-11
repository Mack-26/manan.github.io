import ProjectPage from '@/components/projects/blocks/ProjectPage';
import Hero from '@/components/projects/blocks/Hero';
import Section, { Prose } from '@/components/projects/blocks/Section';
import StatRow from '@/components/projects/blocks/StatRow';
import Figure from '@/components/projects/blocks/Figure';
import Flow from '@/components/projects/blocks/Flow';
import Callout from '@/components/projects/blocks/Callout';
import PhoneCarousel from './PhoneCarousel';
import LayerDiagram from './LayerDiagram';
import s from './hrms.module.css';

const PROCESS = [
  { title: 'Stakeholder interviews', body: 'Sponsor, field staff, managers and HR: what worked, what didn’t, what was in scope.' },
  { title: 'Map the desktop system', body: 'Walked every existing workflow so the mobile app kept what already worked.' },
  { title: 'Benchmark', body: 'Studied leading HR apps: key actions on the home screen, a shared calendar.' },
  { title: 'Reframe', body: 'How might we make attendance easy for remote staff while avoiding false logs?', accent: true },
  { title: 'Design → test → ship', body: 'Two-week sprints: design, evaluate with users, build and deploy.' },
];

export default function Page() {
  return (
    <ProjectPage reachOut="Need someone who can talk to users and ship the app? Let’s talk.">
      <Hero
        eyebrow="Product · mobile · lead developer"
        title="Field HRMS"
        subtitle="The company’s HR system only worked on a desktop, and many of its people worked remotely or on site. I led a team of four to rebuild it as a mobile app that field staff actually use."
        facts={[
          { label: 'Role', value: 'Founder & Lead Developer' },
          { label: 'Client', value: 'A telecom equipment manufacturer' },
          { label: 'Timeline', value: 'Jan – Jul 2024' },
          { label: 'Team', value: 'Me, 1 UX designer, 2 front-end devs' },
          { label: 'Stack', value: 'Flutter · BLoC · Hive' },
        ]}
        media={
          <Figure provenance="real" caption="Screens from the shipped app. Scroll sideways, or use the arrows." bare>
            <PhoneCarousel />
          </Figure>
        }
      />

      <Section n={1} label="Problem" title="“Everything needs to be handled on the go”">
        <Prose>
          <p>
            Remote and on-site employees didn’t have laptops, but attendance, leave, travel and expenses all lived in
            a desktop HR system. So staff sent photos to their managers as proof of attendance, managers verified
            them by hand, and urgent requests waited until someone got back to a desk.
          </p>
          <p>
            Managers had a second worry: without verification, people could log attendance they hadn’t earned. And
            employees kept their daily task lists in the Notes app, one more place to check.
          </p>
        </Prose>
      </Section>

      <Section n={2} label="Product process" title="Before writing code, find out what people actually do">
        <Figure caption="How we scoped the product, working with our UX designer.">
          <Flow steps={PROCESS} label="Product process" />
        </Figure>
      </Section>

      <Section n={3} label="One feature, two versions" title="Selfie attendance, and what testing changed">
        <div className={s.iter}>
          <div>
            <span className={s.tag}>v1 · photo proof, built into the app</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.iterImg} src="/projects/hrms/screens/selfie-v1-flow.jpg" alt="Version 1: clock in, take a selfie, confirm, done" loading="lazy" />
          </div>
          <div className={s.iterPhone}>
            <span className={s.tag}>v2 · after evaluation</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.iterImg} src="/projects/hrms/screens/clockin-v2.jpg" alt="Version 2: choose office or on tour, with selfie guidance" loading="lazy" />
          </div>
        </div>
        <Callout kind="challenge" title="Two kinds of feedback, one screen">
          <p>
            Employees didn’t know what a “good” selfie was, so v2 adds framing and two plain rules: good light, look
            straight. Managers wanted to know where people were, so v2 asks for location up front (office or on
            tour) and tags it with the clock-in.
          </p>
        </Callout>
      </Section>

      <Section n={4} label="Architecture" title="Six modules, one structure">
        <Prose>
          <p>
            The codebase follows Clean Architecture: every module (attendance, leave, travel, expenses, employee,
            events) has the same three layers, so features could be built in parallel and new ones follow a known
            path.
          </p>
        </Prose>
        <Figure caption="Each feature module follows the same three layers. Dependencies are wired with get_it.">
          <LayerDiagram />
        </Figure>
        <Prose>
          <p>
            <strong>Why Flutter:</strong> one codebase for iOS and Android with a small team. <strong>Why Hive:</strong>{' '}
            field sites have patchy signal, so profile data is cached on the device and the app stays usable offline.
          </p>
        </Prose>
      </Section>

      <Section n={5} label="Outcome" title="Shipped, and still growing">
        <StatRow
          stats={[
            { value: '400+', label: 'employees at launch', note: 'July 2024' },
            { value: '1000+', label: 'internal users', note: 'as of February 2026' },
            { value: '~30%', label: 'fewer disputed or incorrect attendance entries', note: 'before vs after launch' },
          ]}
        />
        <Prose>
          <p>
            <strong>What I took away:</strong> keep what already works. The biggest wins came from moving existing
            workflows to the phone faithfully, then fixing the few that hurt, not from redesigning everything.
          </p>
        </Prose>
      </Section>
    </ProjectPage>
  );
}
