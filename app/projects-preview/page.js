import { notFound } from 'next/navigation';
import ProjectPage from '@/components/projects/blocks/ProjectPage';
import Hero from '@/components/projects/blocks/Hero';
import Section, { Prose } from '@/components/projects/blocks/Section';
import StatRow from '@/components/projects/blocks/StatRow';
import Figure from '@/components/projects/blocks/Figure';
import DataTable from '@/components/projects/blocks/DataTable';
import Callout from '@/components/projects/blocks/Callout';
import ScatterChart from '@/components/projects/charts/ScatterChart';
import LineChart from '@/components/projects/charts/LineChart';
import BarChart from '@/components/projects/charts/BarChart';
import Heatmap from '@/components/projects/charts/Heatmap';

// Dev-only gallery of the shared blocks. Sample data below is not real.
export default function Preview() {
  if (process.env.NODE_ENV === 'production') notFound();
  return (
    <ProjectPage>
      <Hero eyebrow="Preview" title="Block gallery" subtitle="Every shared block with sample data." facts={[{ label: 'Role', value: 'Lead' }, { label: 'Link', value: 'GitHub', href: 'https://github.com' }]} />
      <Section n={1} label="Stats" title="Stat row">
        <StatRow stats={[{ value: '47.2', label: 'Real stat', note: 'measured' }, { value: '91%', label: 'Placeholder', placeholder: true }]} />
      </Section>
      <Section n={2} label="Charts" title="Charts">
        <Figure provenance="illustrative" caption="Scatter, log x">
          <ScatterChart xLog xLabel="params (B)" yLabel="acc" points={[{ x: 2, y: 42, label: 'A', group: 'o' }, { x: 72, y: 44, label: 'B', group: 'p' }]} groups={{ o: { color: 'var(--olive)', label: 'ours', emphasis: true }, p: { color: 'var(--muted)', label: 'prior' } }} />
        </Figure>
        <Figure provenance="replotted"><LineChart xLabel="frame" yLabel="α" series={[{ name: 's1', color: 'var(--olive)', points: [[0, 0.5], [50, 0.7], [100, 0.9]], band: [[0, 0.4, 0.6], [50, 0.6, 0.8], [100, 0.85, 0.95]] }]} /></Figure>
        <Figure><BarChart unit=" GB" threshold={{ value: 32, label: 'Jetson' }} bars={[{ label: 'Big', value: 144 }, { label: 'Small', value: 8, emphasis: true }]} /></Figure>
        <Figure><Heatmap rows={['a', 'b']} cols={['x', 'y']} values={[[1, 2], [2, 1]]} /></Figure>
      </Section>
      <Section n={3} label="Text">
        <Prose><p>Paragraph text <strong>bold</strong>.</p></Prose>
        <Callout kind="challenge" title="Callout"><p>Body</p></Callout>
        <DataTable columns={[{ key: 'a', label: 'Model' }, { key: 'b', label: 'Acc', align: 'right' }, { key: 'c', label: 'VRAM', align: 'right' }, { key: 'd', label: 'Params', align: 'right' }]} rows={[{ a: 'x', b: 1, c: 2, d: 3 }, { a: 'y', b: 2, c: 3, d: 4 }]} highlight={(r) => r.a === 'y'} />
      </Section>
    </ProjectPage>
  );
}
