# Featured Projects: Design Spec

Date: 2026-10-11 · Status: approved in conversation, awaiting spec review

## Goal

Add five featured projects to `/projects`, each with a bespoke page that shows something real (demo, diagram, plot, video) before explaining, in the site's editorial lab-notebook style. Success = a recruiter or AI engineer reads a page and wants to reach out (PRODUCT.md). Existing seven projects stay, below the featured five, on the current generic template.

Featured, in build order:
1. LilSeeGround (first; establishes the shared blocks)
2. Adaptive MAPPO
3. Horizon
4. HRMS
5. Battery lifetime prediction (PGML)

## Architecture (Approach A)

```
data/projects.js                 + featured: true, card fields (metric, thumb) for the 5
app/projects/page.js             featured grid (5 large cards) on top, "More work" list below
app/projects/[slug]/page.js      if project.featured → render featured page component, else current template
components/projects/blocks/      shared building blocks (one purpose each)
  Hero.jsx          title, subtitle, media slot (video / image / interactive), quick facts
  QuickFacts.jsx    Role · Timeline · Team · Stack · Links
  Section.jsx       numbered editorial section with label + heading
  Stat.jsx          value + label + "how measured"; supports { placeholder: true }
  StatRow.jsx       2–4 Stats
  Figure.jsx        image/SVG with caption + "real" / "illustrative" label
  Video.jsx         muted autoplay loop, poster, reduced-motion → poster only
  DataTable.jsx     results table with highlighted rows/cells
  Callout.jsx       "toughest problem" / "what didn't work" aside
  ReachOut.jsx      closing CTA (email, X, résumé)
components/projects/charts/      hand-written SVG, no new dependency
  ScatterChart.jsx  (log-x option)   LineChart.jsx (bands)   BarChart.jsx (threshold line)   Heatmap.jsx
components/projects/<slug>/      Page.jsx + project-specific interactive pieces + data/*.json
public/projects/<slug>/          compressed media (mp4/webm ≤3 MB each, webp images)
```

Rules:
- Every chart plots data copied from the source repos into `components/projects/<slug>/data/*.json` (with a comment noting the source file). No hand-typed curves.
- Figures carry an honest label: "real model output", "re-plotted from experiment logs", or "illustrative".
- Theming uses existing CSS tokens (paper, stone, sage, olive, ink; Geist + Plex Mono). Charts read tokens, work in light theme, and at 360px width.
- `prefers-reduced-motion` disables autoplay and animations.
- Every page ends with `ReachOut`.

### Placeholder metrics

`Stat` accepts `{ value, placeholder: true }`. Placeholder values are invented stand-ins chosen by Manan to be replaced later. They ship to production (decision 2026-10-11: deploy everything now, edit later) but render with a small "prelim." tag so they never read as measured results. Flipping to `placeholder: false` removes the tag. `npm run build` prints a warning listing every remaining placeholder (does not fail). Used for Horizon evaluation and Battery results.

## Per-project content

### 1. LilSeeGround: research + show-and-tell
Source: `~/Desktop/Manan/SeeGroundProj/LilSeeGround` (README, `paper.pdf`, `examples.csv`, `seeground_comparison/`, `ECE 504 Project Video.mp4`).
Credit: led by Manan; co-authors Vu Nguyen, Sarang Rajeev named. Do NOT reuse `figs/teaser.png`, `arch_1.png`, gifs (from original SeeGround); redraw.
Headline: Qwen3-VL-4B (8 GB) beats SeeGround's 72B backbone (144 GB) on Nr3D: 47.23 vs 44.1 Acc@25, 42.84 vs 39.4 Acc@50; 2B matches 72B at Acc@50 with 36× fewer params.
Sections:
1. Hero: interactive grounding demo. ~8 hand-picked real cases (4B wins, 2B wins, both wrong). Query text → rendered scene with object IDs → 2B and 4B picks highlighted, ✓/✗, IoU. Prev/next + case-type filter.
2. The question: scale or architecture? (SeeGround ablation: 72B → 7B drops 46.1 → 33.3).
3. Pipeline: redrawn 4-stage SVG (query parsing → viewpoint selection → render with IDs → VLM selects), "swapped backbone" callout; Interleaved-MRoPE note.
4. Results: params-vs-Acc@25 scatter (log x), VRAM bars with Jetson AGX Orin line, full Nr3D table.
5. Where it fails: gallery of both-wrong and 2B-beats-4B cases.
6. Links: paper PDF, repo, short video clip; ReachOut.

### 2. Adaptive MAPPO: research with visualizations
Source: `~/Desktop/Manan/ECE 567 - Reinforcement Learning/RLProject/` (`adaptive-mappo/`, `567_share/eval_results/aggregate.csv`, `summary.csv`, run logs with α per frame, 138 rollout mp4s).
Credit: team course project; Manan designed the adaptive-α critic and led the method.
Framing: lead with wins (multiwalker, navigation); full 4-task table available but de-emphasized.
Sections:
1. Hero: side-by-side rollouts, MAPPO vs Adaptive, multiwalker best seeds.
2. The question: centralized vs local critic. Interactive α slider showing v_mix = α·v_global + (1−α)·v_local; re-plotted IPPO vs MAPPO motivation curves.
3. Method: α-network diagram (6 features: global, local, disagree, team_var, risk, ratio → sigmoid → blend → PPO loss) + forward-pass snippet. Baselines: MAPPO, IPPO, fixed α ∈ {0.25, 0.5, 0.75}. 4 tasks × 6 algos × 3 seeds = 72 runs.
4. Results: learned-α trajectories (multiwalker → ~0.94, navigation → ~0.24) as the hero chart; stability (relative drop) bars for the winning tasks; expandable full rank/stability heatmap.
5. Next steps; link to homepage football demo labelled "illustrative, separate demo"; ReachOut.

### 3. Horizon: Problem → Why this → How → Evaluation
Source: `~/Desktop/Manan/AIHackathon/learnpool` (backend, `db/migrations/001_schema.sql`, `research.txt`, `docs/demo/horizon-student-demo.mp4`, `docs/gtm-strategy.md`).
Exclusions: no hackathon mention, no commit counts. Replaces the existing `learnpool` entry (slug redirect `learnpool` → `horizon`).
Sections:
1. Hero: demo video + quick facts + live link (horizonlabs.live).
2. Problem: stat strip with cited figures (48% never ask a question; anonymous Q&A 6–10× more questions at U-M; 86% of students use AI).
3. Why this: shared, course-grounded workspace vs private ChatGPT; before/after visual restyled to site tokens.
4. How: animated question path: question → embed (text-embedding-3-small, 1536-d) → pgvector top-k over session docs → grounded answer with citations → shared feed → peer verification → TA dashboard. Toughest-problem callout.
5. Evaluation (placeholders): retrieval hit@5, grounded-sentence %, p50/p95 latency, % answers with a verification vote, questions per student per session.
6. Next (LMS integration, pilot); ReachOut.

### 4. HRMS: Founder & Lead Developer / product
Source: `public/artifacts/hrms-casestudy.pdf` (23 pages, ~150 screen images), `~/Desktop/Manan/hrms-app`.
Facts: Founder & Lead Developer; client anonymized ("a telecom equipment manufacturer"); Flutter (BLoC/Cubit, Clean Architecture, Hive offline cache, get_it DI); team of 4 (lead, 1 UX, 2 front-end); Jan–Jul 2024; deployed to 1000+ internal users. Remove "acquired", "80%", React Native, geofencing/hybrid-positioning claims from existing copy.
Sections:
1. Hero: phone-frame carousel of real screens; quick facts.
2. Problem: desktop HRMS failed field staff; quote "Everything needs to be handled on the go."
3. Product process strip: stakeholders → workflow map → benchmarking → How-might-we → IA.
4. Feature deep-dive: selfie attendance v1 → evaluation feedback → v2 (guidance + location), before/after screens.
5. Architecture: Clean Architecture layer diagram, 6 modules (attendance, employee, events, expenses, leave, travel); why Flutter + offline cache.
6. Outcome (1000+ users), lessons; links: case study PDF, repo; ReachOut.

### 5. Battery lifetime prediction (PGML): MLE framing
Source: `~/Desktop/Manan/SLB_Final/Second-life-battery-project/pipeline25`, `Artifacts/Battery/flow_diagram.png`. No lab or PI mention. Replaces the commented-out `battery-ml` entry.
Content: predict second-life lifetime (EFC) from usage-profile features + physics degradation modes (LLI, LAM_PE, LAM_NE); train on ≤25% of data via Optuna subset selection → CatBoost surrogate augmentation → six PGML candidates → best on held-out data; distribution checks at each stage.
Sections:
1. Hero: result statement (placeholder value) + animated pipeline.
2. Problem: expensive aging data; why physics features.
3. Pipeline: interactive redraw of flow diagram (hover → what/why).
4. Engineering deep-dive: subset search. Binary mask (2^53, ~5–10% valid trials) vs k + priority top-k (~100% valid). Animated comparison.
5. Results (placeholders): MAPE vs data fraction, real vs synthetic distributions, final model comparison. Stack note (CatBoost on small tabular data, Optuna TPE).
6. Lessons; ReachOut.

## Projects index

- Featured: 5 large cards (thumbnail/loop, title, one-line hook, one key metric, 3–4 tags). Metric uses `Stat` placeholder rules.
- "More work": existing list for smart-investigator, blockchain, piml (climate review), vlm-research, so101 (LearnPool and battery-ml entries removed/replaced).

## Testing

- `npm run build` passes; placeholder warning lists remaining TBD values.
- Deploy: push to the branch Vercel deploys from; verify live URLs for all 5 pages.
- Manual check per page at 360px, 768px, 1280px; reduced-motion; keyboard navigation of interactive demos (slider, case navigator).
- Charts verified against source CSV values (spot-check 3 points per chart).

## Out of scope

- New eval runs (Horizon RAG eval, battery final results): numbers come later from Manan.
- Rewriting the seven non-featured projects.
- Blog/writing pages.
