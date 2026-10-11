import ProjectPage from '@/components/projects/blocks/ProjectPage';
import Hero from '@/components/projects/blocks/Hero';
import Section, { Prose } from '@/components/projects/blocks/Section';
import StatRow from '@/components/projects/blocks/StatRow';
import Figure from '@/components/projects/blocks/Figure';
import Callout from '@/components/projects/blocks/Callout';
import LineChart from '@/components/projects/charts/LineChart';
import BarChart from '@/components/projects/charts/BarChart';
import PipelineFlow from './PipelineFlow';
import SubsetSearchViz from './SubsetSearchViz';
import results from './data/results.json';

const { search, headline, mapeVsFraction, models } = results;

export default function Page() {
  return (
    <ProjectPage reachOut="Working on ML for energy, batteries or small-data problems? I’d like to hear about it.">
      <Hero
        eyebrow="ML engineering · physics-guided ML"
        title="Battery Lifetime Prediction"
        subtitle="Millions of EV batteries will retire with plenty of life left for grid storage, if you can tell which ones. I built a pipeline that predicts remaining lifetime from usage and physical degradation signals, training on a quarter of the expensive data."
        facts={[
          { label: 'Role', value: 'ML engineer · designed and built the pipeline' },
          { label: 'When', value: '2025' },
          { label: 'Stack', value: 'Python · CatBoost · XGBoost · Optuna · scikit-learn' },
          { label: 'Target', value: 'Lifetime in equivalent full cycles' },
        ]}
        media={
          <StatRow
            stats={[
              { value: headline.value, label: headline.label, placeholder: headline.placeholder },
              { value: '≤ 25%', label: 'of the labelled data used for training', note: 'a hard cap, enforced by the search' },
              { value: '3', label: 'physical degradation modes as features', note: 'LLI, LAM_PE, LAM_NE' },
            ]}
          />
        }
      />

      <Section n={1} label="Problem" title="Good predictions need data that is expensive to make">
        <Prose>
          <p>
            A retired EV battery might have years of useful life in stationary storage, or it might be close to
            failing. Testing each pack is slow and expensive, so the decision has to come from a model.
          </p>
          <p>
            Two things make that hard. Purely data-driven models learn correlations that break on batteries used
            differently from the training set. And labelled lifetime data is costly to produce, whether from long
            cycling tests or heavy electrochemical simulation. So the questions were: which physical signals make
            the model generalize, and how little data can it learn from?
          </p>
        </Prose>
      </Section>

      <Section n={2} label="Pipeline" title="Small data in, checked at every step">
        <Figure caption="Hover or tap a stage. Stages marked ↺ compare feature distributions against the full data before moving on.">
          <PipelineFlow />
        </Figure>
      </Section>

      <Section n={3} label="Engineering deep-dive" title="Making the search space actually searchable">
        <Prose>
          <p>
            The subset search decides which of {search.segments} data segments ({search.samples.toLocaleString('en-US')} samples)
            to train on, with at most 25% of the data allowed. The first version gave Optuna one include/exclude
            switch per segment. That’s 2<sup>{search.segments}</sup> combinations, and since each switch is a coin
            flip, a typical trial picks about half the segments: far over the cap. Almost every trial was wasted.
          </p>
          <p>
            I rewrote the search as two decisions: <strong>how many</strong> segments to take (k between{' '}
            {search.minK} and {search.maxK}, computed from the cap) and a <strong>priority score</strong> for every
            segment; the top-k are kept. Every trial is valid by construction, and Optuna’s TPE sampler can learn
            gradual preferences (“segment 17 tends to help”) instead of on/off guesses.
          </p>
        </Prose>
        <Figure provenance="illustrative" caption="A live simulation of the two search spaces with the real sizes. Rose = a trial that breaks the 25% cap.">
          <SubsetSearchViz />
        </Figure>
        <Callout kind="challenge" title="Why not just penalize invalid trials?">
          <p>
            A penalty still spends a full training run to learn “too big,” and TPE learns little from a wall of
            identical penalties. Encoding the constraint in the parameterization moves it from something the
            optimizer has to discover to something it can’t violate.
          </p>
        </Callout>
      </Section>

      <Section n={4} label="Results" title="How much data is enough?">
        <Prose>
          <p>
            Values tagged <em>prelim.</em> are placeholders, not yet measured on the final held-out set, and will be
            replaced with the real results.
          </p>
        </Prose>
        <Figure provenance="illustrative" caption="Lifetime error on held-out batteries as the training fraction grows (prelim.).">
          <LineChart
            series={[{ name: 'MAPE on held-out data', color: 'var(--olive)', emphasis: true, points: mapeVsFraction.points }]}
            xDomain={[0, 100]}
            yDomain={[0, 8]}
            xLabel="% of labelled data used for training"
            yLabel="MAPE (%)"
            ariaLabel="Error falls as more data is used, flattening after 25 percent."
          />
        </Figure>
        <Figure provenance="illustrative" caption="Final candidates on the same held-out set (prelim.). Lower is better.">
          <BarChart
            bars={models.rows.map((r, i) => ({ label: r.label, value: r.value, emphasis: i === 0 }))}
            unit="%"
            ariaLabel="Model comparison by MAPE"
          />
        </Figure>
        <Prose>
          <p>
            <strong>Why gradient-boosted trees for the surrogate:</strong> the data is small and tabular, where
            CatBoost and XGBoost are hard to beat and train in seconds, which matters inside a search loop that runs
            hundreds of trials.
          </p>
          <p>
            <strong>What I took away:</strong> constraints belong in the parameterization, not the penalty. Make
            invalid states unrepresentable and the optimizer gets smarter for free.
          </p>
        </Prose>
      </Section>
    </ProjectPage>
  );
}
