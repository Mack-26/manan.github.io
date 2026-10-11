import ProjectPage from '@/components/projects/blocks/ProjectPage';
import Hero from '@/components/projects/blocks/Hero';
import Section, { Prose } from '@/components/projects/blocks/Section';
import StatRow from '@/components/projects/blocks/StatRow';
import Figure from '@/components/projects/blocks/Figure';
import DataTable from '@/components/projects/blocks/DataTable';
import Callout from '@/components/projects/blocks/Callout';
import ScatterChart from '@/components/projects/charts/ScatterChart';
import BarChart from '@/components/projects/charts/BarChart';
import GroundingDemo from './GroundingDemo';
import PipelineDiagram from './PipelineDiagram';
import results from './data/results.json';
import cases from './data/cases.json';
import s from './lilseeground.module.css';

const OURS = new Set(['Qwen3-VL-2B', 'Qwen3-VL-4B']);

const scatterPoints = results.rows.map((r) => ({
  x: r.params,
  y: r.acc25,
  label: r.model,
  group: OURS.has(r.model) ? 'ours' : 'prior',
  dy: r.model === 'InternVL2-8B' ? -10 : r.model === 'Qwen2-VL-7B' ? 8 : 0,
}));

const vramBars = [...results.rows]
  .sort((a, b) => b.vram - a.vram)
  .map((r) => ({ label: r.model, value: r.vram, emphasis: OURS.has(r.model) }));

const fmt = (v) => (v == null ? '—' : v.toFixed(2));
const tableRows = results.rows.map((r) => ({
  model: OURS.has(r.model) ? `${r.model} (ours)` : `${r.model} †`,
  params: `${r.params}B`,
  vram: `${r.vram} GB`,
  u25: fmt(r.u25),
  u50: fmt(r.u50),
  m25: fmt(r.m25),
  m50: fmt(r.m50),
  acc25: fmt(r.acc25),
  acc50: fmt(r.acc50),
  _model: r.model,
}));

export default function Page() {
  return (
    <ProjectPage reachOut="Working on perception for robots or edge devices? I’d love to compare notes.">
      <Hero
        eyebrow="Research · 3D visual grounding"
        title="LilSeeGround"
        subtitle={
          <>
            Can a vision-language model small enough to ride on a robot find “the chair left of the TV” in a 3D scan?
            I swapped the 72B model inside a state-of-the-art pipeline for 2B and 4B ones. The 4B model did <em>better</em>.
          </>
        }
        facts={[
          { label: 'Role', value: 'Led the project · team of 3' },
          { label: 'With', value: 'Vu Nguyen, Sarang Rajeev' },
          { label: 'When', value: 'Winter 2026 · University of Michigan' },
          { label: 'Stack', value: 'Qwen3-VL · vLLM · PyTorch3D' },
          { label: 'Paper', value: 'Read the PDF ↗', href: '/projects/lilseeground/paper.pdf' },
          { label: 'Code', value: 'GitHub ↗', href: 'https://github.com/Vu-Nguyen19/LilSeeGround' },
        ]}
        media={
          <Figure
            provenance="real"
            caption="Real answers from both models on ScanRefer validation scenes. Every object in the render carries a number; the rings show which number each model chose. Green ring = right (IoU ≥ 0.25 with the true box). Use ← → to step through."
            bare
          >
            <GroundingDemo />
          </Figure>
        }
      />

      <Section n={1} label="The question" title="Is the accuracy cliff about size, or about age?">
        <Prose>
          <p>
            <strong>3D visual grounding</strong> means pointing at the right object in a 3D scene from a sentence: “the
            brown ottoman in front of the sofa.” A home robot or an AR headset needs it before it can act on an
            instruction.
          </p>
          <p>
            SeeGround (CVPR 2025) does this without training any 3D model. It renders the scene into an image, numbers
            every object, and asks a vision-language model which number matches. It’s clever, and it runs on
            Qwen2-VL-72B: about 144 GB of GPU memory, four A100s, a kilowatt or two. No robot carries that.
          </p>
          <p>
            SeeGround’s own ablation shows that shrinking the model hurts: a 7B model from the same family loses about
            11 points. But that compares models of the <em>same generation</em>. I wanted to know whether a newer,
            much smaller model could close the gap.
          </p>
        </Prose>
        <StatRow
          stats={[
            { value: '144 GB', label: 'GPU memory for the 72B backbone', note: 'bfloat16, about 4× A100 80 GB' },
            { value: '64 GB', label: 'memory on the biggest Jetson AGX Orin', note: 'the edge budget' },
            { value: '−10.8', label: 'points of Acc@25 going 72B → 7B', note: 'SeeGround’s own ablation, same model family' },
          ]}
        />
      </Section>

      <Section n={2} label="Method" title="Swap one part, hold everything else fixed">
        <Figure caption="SeeGround’s four stages, redrawn. Only stage 4 changes.">
          <PipelineDiagram />
        </Figure>
        <Prose>
          <p>
            I replaced Qwen2-VL-72B with <strong>Qwen3-VL at 2B and 4B</strong>, served with vLLM. Prompts, viewpoint
            selection, rendering and the object table (built from Mask3D instance predictions) stayed identical, so
            any change in accuracy comes from the backbone.
          </p>
          <p>
            Why Qwen3-VL? It’s a drop-in successor with the same input format, and it changes how the model encodes
            position: <strong>Interleaved-MRoPE</strong> spreads height, width and time signals across attention heads
            instead of splitting them. SeeGround’s whole trick is a picture with small numbers at precise pixel
            locations, so finer spatial encoding should matter more here than raw size.
          </p>
        </Prose>
      </Section>

      <Section n={3} label="Results" title="The 4B model beats the 72B baseline">
        <StatRow
          stats={[
            { value: '47.2', label: 'Acc@25 on Nr3D for the 4B model', note: 'vs 44.1 for the 72B baseline' },
            { value: '+4.1', label: 'points on “Multiple” queries', note: 'the hard split: several look-alike objects in the room' },
            { value: '18×', label: 'fewer parameters', note: '4B vs 72B; the 2B model is 36× smaller' },
          ]}
        />
        <Figure provenance="real" caption="Accuracy against model size (log scale). Grey points are SeeGround’s published backbones; green are mine. Both new models sit well above the trend the older models set.">
          <ScatterChart
            points={scatterPoints}
            groups={{
              prior: { color: 'var(--muted)', label: 'SeeGround paper' },
              ours: { color: 'var(--olive)', label: 'Qwen3-VL (this project)', emphasis: true },
            }}
            xLog
            xTicks={[2, 5, 10, 20, 50, 100]}
            xLabel="parameters (billions, log)"
            yLabel="Acc@25 on Nr3D (%)"
            ariaLabel="Scatter of accuracy versus parameters. Qwen3-VL 4B reaches 47.2 at 4 billion parameters, above Qwen2-VL 72B at 44.1."
          />
        </Figure>
        <Figure provenance="real" caption="GPU memory at bfloat16, no quantization. Both new models fit inside a Jetson AGX Orin with room to spare.">
          <BarChart
            bars={vramBars}
            unit=" GB"
            threshold={{ value: 64, label: 'Jetson AGX Orin, 64 GB' }}
            ariaLabel="GPU memory per model: 72B needs 144 GB, 4B needs 8 GB, 2B needs 4 GB."
          />
        </Figure>
        <DataTable
          caption="Nr3D grounding accuracy (%) at IoU 0.25 and 0.50. † from the SeeGround paper. Unique: one object of that class in the room. Multiple: several."
          columns={[
            { key: 'model', label: 'Backbone' },
            { key: 'params', label: 'Params', align: 'right' },
            { key: 'vram', label: 'VRAM', align: 'right' },
            { key: 'u25', label: 'Unique@25', align: 'right' },
            { key: 'u50', label: 'Unique@50', align: 'right' },
            { key: 'm25', label: 'Multiple@25', align: 'right' },
            { key: 'm50', label: 'Multiple@50', align: 'right' },
            { key: 'acc25', label: 'Acc@25', align: 'right' },
            { key: 'acc50', label: 'Acc@50', align: 'right' },
          ]}
          rows={tableRows}
          highlight={(r) => r._model === 'Qwen3-VL-4B'}
        />
      </Section>

      <Section n={4} label="Where it fails" title="Crowded rooms and look-alike objects">
        <Prose>
          <p>
            Both models still miss when a room is full of near-identical things and the sentence leans on fine spatial
            detail. And the smaller model isn’t strictly worse: switch the demo above to “2B right” to see queries the
            2B model got and the 4B model didn’t.
          </p>
        </Prose>
        <div className={s.failGrid}>
          {cases.failures.map((f) => (
            <figure key={f.id} className={s.failCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.img} alt="Rendered point cloud with numbered objects" loading="lazy" />
              <p>“{f.query}”</p>
              <span className={s.mono}>
                Both wrong · IoU 4B {f.iou4b.toFixed(2)} · 2B {f.iou2b.toFixed(2)}
              </span>
            </figure>
          ))}
        </div>
        <Callout kind="note" title="What this result can’t tell you yet">
          <p>
            Qwen3-VL-4B vs Qwen2-VL-72B changes size <em>and</em> generation at once. The clean test is Qwen3-VL-72B or
            Qwen2-VL-4B in the same pipeline. That’s the next experiment, along with measuring real latency and power
            on a Jetson rather than estimating from memory.
          </p>
        </Callout>
      </Section>
    </ProjectPage>
  );
}
