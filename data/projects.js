export const projects = [
  {
    slug: 'lilseeground',
    featured: true,
    title: 'LilSeeGround',
    type: 'Research',
    meta: 'University of Michigan · 2026',
    summary:
      'Can a 4B vision-language model do 3D visual grounding as well as a 72B one? Swapping SeeGround’s backbone for Qwen3-VL: the 4B model beats the 72B baseline on Nr3D at 18× fewer parameters.',
    tags: ['VLMs', '3D Grounding', 'Edge AI', 'Qwen3-VL'],
    card: {
      hook: 'A 4B vision-language model beats a 72B one at finding objects in 3D scenes, small enough for a Jetson.',
      metric: { value: '47.2 vs 44.1', label: 'Acc@25 on Nr3D, 4B vs 72B' },
      thumb: '/projects/lilseeground/thumb.jpg',
    },
  },
  {
    slug: 'adaptive-mappo',
    featured: true,
    title: 'Adaptive MAPPO',
    type: 'Research',
    meta: 'Multi-agent RL · 2026',
    summary:
      'A learned α that blends a centralized critic with local critics in multi-agent PPO, so each task finds its own mix. Most stable method on multiwalker and navigation across 72 runs.',
    tags: ['Reinforcement Learning', 'Multi-agent', 'PPO', 'TorchRL'],
    card: {
      hook: 'Letting multi-agent PPO learn how much to trust the team’s critic versus each agent’s own.',
      metric: { value: '21% vs 49%', label: 'drop from peak reward on multiwalker, adaptive vs MAPPO' },
      thumb: '/projects/adaptive-mappo/thumb.jpg',
    },
  },
  {
    slug: 'horizon',
    featured: true,
    title: 'Horizon',
    type: 'Product',
    meta: 'Founder · 2026',
    summary:
      'A shared, course-grounded AI workspace: students ask questions answered from their own course materials with citations, classmates verify answers, and TAs see where the class is confused.',
    tags: ['RAG', 'pgvector', 'FastAPI', 'React'],
    card: {
      hook: 'Course Q&A answered from the course itself, with citations, peer verification and a TA dashboard.',
      metric: { value: '94%', label: 'answer sentences grounded in a cited source', placeholder: true },
      thumb: '/projects/horizon/thumb.jpg',
    },
  },
  {
    slug: 'hrms',
    featured: true,
    title: 'Field HRMS',
    type: 'Product',
    meta: 'Founder & Lead Developer · 2024',
    summary:
      'A mobile-first HR app for remote and on-site staff: selfie attendance with location, leave, travel and expenses. Led a team of four from stakeholder interviews to deployment for 1000+ employees.',
    tags: ['Flutter', 'Product', 'Clean Architecture', 'Mobile'],
    card: {
      hook: 'Turning a desktop-only HR system into a mobile app field staff actually use.',
      metric: { value: '1000+', label: 'employees using it' },
      thumb: '/projects/hrms/thumb.jpg',
    },
  },
  {
    slug: 'battery-lifetime',
    featured: true,
    title: 'Battery Lifetime Prediction',
    type: 'ML Engineering',
    meta: 'Physics-guided ML · 2025',
    summary:
      'Predicting second-life battery lifetime from usage profiles and physical degradation modes, while training on a quarter of the data via Optuna subset search and surrogate augmentation.',
    tags: ['Physics-guided ML', 'CatBoost', 'Optuna', 'Batteries'],
    card: {
      hook: 'Accurate battery lifetime predictions from a quarter of the expensive aging data.',
      metric: { value: '3.9%', label: 'lifetime error (MAPE) using 25% of data', placeholder: true },
      thumb: '/projects/battery-lifetime/thumb.jpg',
    },
  },
  {
    slug: 'smart-investigator',
    title: 'Smart Investigator',
    type: 'Project',
    meta: 'AuxoAI · 2024',
    summary:
      'Agentic AI on Vertex AI that extracts critical information from 1000+ page failure reports and surfaces root causes with 96% accuracy.',
    tags: ['Agentic AI', 'Vertex AI', 'Python', 'RAG', 'LLM'],
    problem:
      'Industrial equipment failures at AuxoAI\'s clients generated investigation reports that routinely exceeded 1,000 pages, spanning sensor logs, maintenance histories, incident reports, and regulatory filings across multiple document versions. Root-cause analysis required engineers to manually cross-reference all of it, a process that consumed three to five engineering days per incident. The bottleneck was the absence of any system capable of understanding technical domain language, correlating evidence across documents, and producing a structured causal summary. The objective was to build an agentic AI system that could autonomously ingest these reports and surface root causes with production-grade accuracy.',
    solution:
      'Designed and built a multi-step agentic pipeline on Google Cloud Vertex AI. Documents are preprocessed using a domain-aware segmentation strategy that preserves semantic boundaries: sensor tables are never split mid-row and failure timelines stay contiguous. Documents are then indexed into a managed vector store. An LLM agent orchestrates a multi-turn retrieval loop: it formulates targeted sub-queries, retrieves and evaluates evidence, iteratively refines its causal hypothesis, and produces a structured root-cause report with source citations. Vertex AI was chosen over self-hosted alternatives for its managed vector search and native LLM integration, enabling rapid iteration without infrastructure overhead. The hardest problem was handling conflicting evidence across document versions, where sensor logs and maintenance records sometimes contradicted each other. I solved this by a confidence scoring module that ranks competing claims by recency and source authority and explicitly flags ambiguity for human review. The system achieved 96% root-cause accuracy on a held-out test set of historical cases and reduced average investigation time from days to under 30 minutes.',
    links: [],
    artifact: { type: 'image', src: '/artifacts/smart-investigator-arch.png', alt: 'Smart Investigator architecture diagram' },
  },
  {
    slug: 'blockchain',
    title: 'Blockchain Birth Certificates',
    type: 'Research · Published',
    meta: 'IEEE AIC 2024 · 2022–2023',
    summary:
      'Blockchain-based PKI for secure birth certificate generation. <$0.01 per certificate, turnaround reduced from days to under 30 seconds.',
    tags: ['Blockchain', 'PKI', 'Smart Contracts', 'IEEE Published'],
    problem:
      'Birth registration systems in many developing regions remain paper-based: slow to process, prone to forgery, and disconnected from downstream civil services. Early digitization efforts typically replaced paper with centralized databases, which introduced a new class of vulnerabilities: single points of failure, insider fraud risk, and reliance on continuously available government servers. The technical bottleneck was designing a certificate issuance system that was simultaneously forgery-proof, cheap enough for large-scale government adoption, and functional without a trusted central authority. The research objective was to design and empirically validate a blockchain-based PKI architecture that satisfied all three constraints.',
    solution:
      'Designed a decentralized Public Key Infrastructure on a permissioned blockchain where authorized government nodes act as certificate authorities. Each birth certificate is issued as a cryptographically signed on-chain record: the issuing authority signs the certificate payload with their private key, and both the signature and a hash of the payload are stored immutably on-chain. Verification requires only the issuing authority\'s public key, with no central server or trusted intermediary needed. A permissioned chain was chosen over public networks like Ethereum specifically to keep gas costs negligible and maintain regulatory control over who can issue certificates, while still preserving the immutability and auditability properties of a distributed ledger. Smart contracts enforce issuance rules and reject unauthorized modifications at the protocol level. The core engineering challenge was designing a certificate schema compact enough for cost-effective on-chain storage while containing all legally required civil registration field. I resolved this through a commitment scheme that stores only a hash and signature on-chain, with the full record retrievable off-chain via IPFS. The system achieved sub-$0.01 issuance cost and reduced certificate turnaround from days to under 30 seconds. Published at IEEE AIC 2024.',
    links: [
      { label: 'Read Paper (IEEE)', href: 'https://ieeexplore.ieee.org/document/10730987', external: true },
    ],
    artifact: null,
  },
  {
    slug: 'piml',
    title: 'Physics-Informed ML for Climate',
    type: 'Research',
    meta: 'Independent Research · 2024–2025',
    summary:
      'Embedding physical laws into neural network loss functions. Authored a comprehensive review synthesizing SOTA Physics-Informed ML for climate solutions.',
    tags: ['PINN', 'Climate ML', 'Review Paper', 'Neural ODEs'],
    problem:
      'Climate science faces a fundamental compute-accuracy tradeoff that standard deep learning cannot resolve. High-fidelity numerical models like general circulation models, ocean solvers, are prohibitively expensive to run at the spatial and temporal resolutions needed for regional impact assessment. Pure ML surrogates are fast but physically unreliable: they can produce predictions that look statistically plausible while violating conservation of mass, energy, or momentum. The bottleneck is the absence of a principled framework for combining the speed of learned models with the physical fidelity of numerical methods. The objective of this research was to survey the state of Physics-Informed Neural Networks applied to climate problems, synthesize the key design decisions and benchmark results across sub-fields, and produce a reference that helps practitioners navigate the space.',
    solution:
      'Conducted an independent systematic review of PINN architectures across climate science domains: atmospheric dynamics, ocean circulation, hydrology, and extreme event prediction. The review analyzes how physical laws are embedded into models, whether as hard architectural constraints, soft PDE-residual penalties in the loss function, or structural priors via Neural ODEs and universal differential equations, and evaluates the tradeoffs of each approach. Key findings include the persistent tension between tight constraint satisfaction and training stability, the strong empirical performance of hybrid architectures that combine PINNs with data assimilation, and the significant gap between benchmark accuracy and real-world deployment readiness. The paper synthesizes results across 60+ publications and proposes a taxonomy for categorizing physics-ML integration strategies by the mechanism, depth, and fidelity of physical supervision. A preprint is in preparation.',
    links: [
      { label: 'Arxiv Preprint (coming soon)', href: '#', external: false },
    ],
    artifact: null,
  },
  {
    slug: 'vlm-research',
    title: 'VLM Research',
    type: 'Research',
    meta: 'Independent Research · 2024',
    summary:
      'Research on Vision-Language Models. Code and details will be made available following publication.',
    tags: ['VLMs', 'Multimodal AI', 'Computer Vision', 'NLP'],
    problem:
      'Details to follow upon publication.',
    solution:
      'Details to follow upon publication.',
    links: [],
    artifact: null,
    codeNote: 'Code and paper will be released after publication.',
  },
  {
    slug: 'so101-robot',
    title: 'SO101 Robot',
    type: 'Project',
    meta: '2025',
    summary:
      'Assembled and programmed a 6-DOF SO101 robot arm from scratch, covering hardware build, motor calibration, teleoperation setup, and autonomous task execution.',
    tags: ['Robotics', 'Python', 'LeRobot', 'Teleoperation', 'Motor Control'],
    problem:
      'Robot arms exist at two extremes: industrial arms are precise but cost tens of thousands of dollars and require specialized programming environments, while low-cost educational robots lack the software maturity to go beyond toy demonstrations. The SO101 is a rare open-source, ~$150 6-DOF arm with genuine research potential, but getting it from a kit of servo motors to a system capable of autonomous task execution requires integrating hardware assembly, motor calibration, vision, and imitation learning policy training from scratch. This integration barrier limits reproducibility in robotics research and makes it hard for individuals to experiment with embodied AI on a realistic budget. The objective was to build a fully operational SO101 setup capable of teleoperation and autonomous pick-and-place, and to document the process end-to-end.',
    solution:
      'Assembled the SO101 6-DOF arm from hardware, calibrated each servo motor to its torque and range limits, and integrated the system with HuggingFace\'s LeRobot framework. Set up a leader-follower teleoperation system using a second arm as the physical controller, enabling natural and low-latency demonstration collection without scripting individual movements. Recorded multi-episode demonstration datasets for pick-and-place tasks and trained imitation learning policies using ACT (Action Chunking with Transformers), which models multi-step actions as temporally coherent chunks rather than individual waypoints. Python was used throughout for its robotics ecosystem. LeRobot, OpenCV, and numpy provide a coherent stack from perception to control. The hardest challenge was calibrating software torque ceilings to prevent joint damage during out-of-distribution policy rollouts, especially at the wrist joint under load. I addressed this with a gradual warm-up protocol and per-joint torque monitoring during inference. The result is a reproducible, end-to-end embodied AI research stack running on commodity hardware for under $150.',
    links: [
      { label: 'GitHub', href: 'https://github.com/Mack-26/so101', external: true },
    ],
    artifact: { type: 'image', src: '/artifacts/so101/robot_arm.jpg', alt: 'SO101 robot arm' },
  },
];

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug) ?? null;
}
