export const projects = [
  {
    slug: 'learnpool',
    title: 'LearnPool',
    type: 'Project',
    meta: 'Ross AI Hackathon · 2025',
    summary:
      'A shared, course-aware AI workspace that replaces isolated ChatGPT usage in classrooms with a collaborative Q&A platform — giving professors live visibility into student struggles.',
    tags: ['AI', 'EdTech', 'RAG', 'Next.js', 'Hackathon Winner'],
    problem:
      'Generative AI has quietly fragmented the classroom: students query ChatGPT independently, each session is private, and every answer is untethered from actual course material. Professors are left flying blind — no visibility into which concepts are causing confusion, no signal to adapt lectures, and no way to intervene before an exam. The bottleneck is structural: existing AI tools are built for individuals, not cohorts. The objective was to replace isolated AI usage with a shared, course-grounded workspace that creates a continuous feedback loop between students and instructors — built in 24 hours at the University of Michigan Ross Business+Tech AI Hackathon.',
    solution:
      'Built LearnPool as a full-stack Next.js application with a RAG pipeline. Professors upload course materials (syllabi, lecture notes, PDFs), which are chunked and indexed into a vector store; every student query is routed through retrieval before reaching the LLM, ensuring answers stay grounded in the actual course rather than generic knowledge. All Q&A flows into a shared, upvotable feed so the most common confusions surface naturally. A live professor dashboard aggregates trending questions, flags misconceptions by topic, and lets instructors mark issues as addressed — closing the loop. The hardest engineering challenge was maintaining retrieval accuracy across heterogeneous document formats (PDFs, slides, scanned notes) under hackathon time pressure — solved with a format-aware chunking strategy that preserved semantic context. LearnPool earned a an honourable mention at the hackathon.',
    links: [
      { label: 'GitHub', href: 'https://github.com/Mack-26/learnpool', external: true },
    ],
    artifact: { type: 'image', src: '/artifacts/learnpool-architecture.png', alt: 'LearnPool system architecture diagram', darkBg: true },
    htmlArtifact: { src: '/artifacts/learnpool-before-after.html', title: 'Problem vs Solution' },
  },
  // {
  //   slug: 'battery-ml',
  //   title: 'ML for Second-Life EV Batteries',
  //   type: 'Research',
  //   meta: 'Ziyou Song Lab, UMich · 2025 – Present',
  //   summary:
  //     'Modeling degradation mechanisms and predicting remaining useful life of EV batteries using electrochemical impedance spectroscopy data.',
  //   tags: ['Battery ML', 'EIS Analysis', 'PyTorch', 'Sustainability'],
  //   problem:
  //     'The global EV transition is producing millions of lithium-ion packs that will reach end-of-vehicle-life within the decade. Repurposing them for second-life stationary storage is economically and environmentally critical, but, hinges on accurately assessing each pack\'s remaining useful life. The challenge is that degradation is driven by multiple concurrent electrochemical mechanisms (SEI growth, lithium plating, particle cracking) that interact non-linearly over thousands of cycles. Purely data-driven models fail to generalize across chemistries and operating conditions because they capture statistical correlations, not the underlying physics. The objective is to develop physics-informed ML models that embed electrochemical knowledge directly into the learning process, enabling accurate and interpretable degradation prediction from impedance data.',
  //   solution:
  //     'Working with Prof. Ziyou Song at UMich to design a physics-informed ML pipeline for EIS-based state-of-health prediction. Electrochemical Impedance Spectroscopy measurements encode a battery\'s internal state as a frequency-domain impedance spectrum; equivalent circuit models (ECMs) are first fit to extract physically meaningful parameters — charge transfer resistance, double-layer capacitance, diffusion coefficients — which are then combined with raw spectral features as inputs to PyTorch neural networks. This hybrid representation lets the model learn residual degradation patterns that the physics cannot fully account for, while remaining interpretable. PyTorch was chosen for its flexibility in defining custom loss terms that penalize physically inconsistent predictions, a capability that is far more ergonomic than TensorFlow for research-stage work. The central challenge has been handling distribution shift across different chemistries and operating temperatures — an ongoing effort involving domain adaptation techniques and targeted data collection. Research is active and results are being prepared for publication.',
  //   links: [],
  //   artifact: null,
  // },
  {
    slug: 'hrms',
    title: 'Field HRMS Mobile App',
    type: 'Project',
    meta: 'Founder · AuxoAI · 2022–2024',
    summary:
      'Founded AuxoAI and built a field HRMS from zero — recruited the team, closed enterprise contracts, and shipped a product adopted by 500+ employees. Acquired by a leading defence manufacturing firm.',
    tags: ['Founder', 'React Native', 'iOS', 'Android', 'Geofencing', 'Acquired'],
    problem:
      'I founded AuxoAI after observing that large field-deployed workforces — construction sites, manufacturing yards, logistics networks — were still managing attendance and compliance through spreadsheets and phone calls. The gap wasn\'t just operational inefficiency; it was a genuine liability. Without verifiable location data and audit trails, companies faced payroll fraud, labour law exposure, and zero real-time visibility into where their people were. Existing enterprise HRMS platforms were built for desk workers: expensive, desktop-heavy, and completely unequipped for intermittent connectivity and distributed field environments. The objective was to build a mobile-first HRMS from the ground up — and then sell, deploy, and scale it as a business.',
    solution:
      'Recruited and led a team of 4 engineers, defined the product roadmap, and closed the first enterprise contracts before a line of production code was written. We built a cross-platform mobile app in React Native — a single codebase targeting iOS and Android — with geofenced clock-in/out (employees could only mark attendance within GPS-verified radii of their site), biometric authentication to eliminate proxy attendance, real-time manager dashboards, compliance alert push notifications, and automated payroll-ready exports. I handled everything from architecture decisions and sprint planning to customer calls and contract negotiations. The hardest engineering problem was geofence reliability in dense environments where GPS drift caused false rejections — solved by a hybrid positioning algorithm that weighted cell-tower and Wi-Fi signals as fallbacks. The harder business problem was earning trust from enterprise procurement teams as a first-time founder — solved by leading with a focused pilot, tight feedback loops, and measurable outcomes. The product reduced manual attendance overhead by 80%, scaled to 500+ active field employees, and was ultimately acquired by a leading company in the defence manufacturing industry.',
    links: [
      { label: 'Case Study (PDF)', href: '/artifacts/hrms-casestudy.pdf', external: false },
      { label: 'GitHub', href: 'https://github.com/Mack-26/hrms-app', external: true },
    ],
    artifact: null,
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
      'Industrial equipment failures at AuxoAI\'s clients generated investigation reports that routinely exceeded 1,000 pages — sensor logs, maintenance histories, incident reports, and regulatory filings spread across multiple document versions. Root-cause analysis required engineers to manually cross-reference all of it, a process that consumed three to five engineering days per incident. The bottleneck was the absence of any system capable of understanding technical domain language, correlating evidence across documents, and producing a structured causal summary. The objective was to build an agentic AI system that could autonomously ingest these reports and surface root causes with production-grade accuracy.',
    solution:
      'Designed and built a multi-step agentic pipeline on Google Cloud Vertex AI. Documents are preprocessed using a domain-aware segmentation strategy that preserves semantic boundaries — sensor tables are never split mid-row, failure timelines stay contiguous — and indexed into a managed vector store. An LLM agent orchestrates a multi-turn retrieval loop: it formulates targeted sub-queries, retrieves and evaluates evidence, iteratively refines its causal hypothesis, and produces a structured root-cause report with source citations. Vertex AI was chosen over self-hosted alternatives for its managed vector search and native LLM integration, enabling rapid iteration without infrastructure overhead. The hardest problem was handling conflicting evidence across document versions, where sensor logs and maintenance records sometimes contradicted each other — solved by a confidence-scoring module that ranks competing claims by recency and source authority and explicitly flags ambiguity for human review. The system achieved 96% root-cause accuracy on a held-out test set of historical cases and reduced average investigation time from days to under 30 minutes.',
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
      'Birth registration systems in many developing regions remain paper-based — slow to process, prone to forgery, and disconnected from downstream civil services. Early digitization efforts typically replaced paper with centralized databases, which introduced a new class of vulnerabilities: single points of failure, insider fraud risk, and reliance on continuously available government servers. The technical bottleneck was designing a certificate issuance system that was simultaneously forgery-proof, cheap enough for large-scale government adoption, and functional without a trusted central authority. The research objective was to design and empirically validate a blockchain-based PKI architecture that satisfied all three constraints.',
    solution:
      'Designed a decentralized Public Key Infrastructure on a permissioned blockchain where authorized government nodes act as certificate authorities. Each birth certificate is issued as a cryptographically signed on-chain record: the issuing authority signs the certificate payload with their private key, and both the signature and a hash of the payload are stored immutably on-chain. Verification requires only the issuing authority\'s public key — no central server, no trusted intermediary. A permissioned chain was chosen over public networks like Ethereum specifically to keep gas costs negligible and maintain regulatory control over who can issue certificates, while still preserving the immutability and auditability properties of a distributed ledger. Smart contracts enforce issuance rules and reject unauthorized modifications at the protocol level. The core engineering challenge was designing a certificate schema compact enough for cost-effective on-chain storage while containing all legally required civil registration fields — resolved through a commitment scheme that stores only a hash and signature on-chain, with the full record retrievable off-chain via IPFS. The system achieved sub-$0.01 issuance cost and reduced certificate turnaround from days to under 30 seconds. Published at IEEE AIC 2024.',
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
      'Climate science faces a fundamental compute-accuracy tradeoff that standard deep learning cannot resolve. High-fidelity numerical models — general circulation models, ocean solvers — are prohibitively expensive to run at the spatial and temporal resolutions needed for regional impact assessment. Pure ML surrogates are fast but physically unreliable: they can produce predictions that look statistically plausible while violating conservation of mass, energy, or momentum. The bottleneck is the absence of a principled framework for combining the speed of learned models with the physical fidelity of numerical methods. The objective of this research was to survey the state of Physics-Informed Neural Networks applied to climate problems, synthesize the key design decisions and benchmark results across sub-fields, and produce a reference that helps practitioners navigate the space.',
    solution:
      'Conducted an independent systematic review of PINN architectures across climate science domains: atmospheric dynamics, ocean circulation, hydrology, and extreme event prediction. The review analyzes how physical laws are embedded into models — as hard architectural constraints, as soft PDE-residual penalties in the loss function, or as structural priors via Neural ODEs and universal differential equations — and evaluates the tradeoffs of each approach. Key findings include the persistent tension between tight constraint satisfaction and training stability, the strong empirical performance of hybrid architectures that combine PINNs with data assimilation, and the significant gap between benchmark accuracy and real-world deployment readiness. The paper synthesizes results across 60+ publications and proposes a taxonomy for categorizing physics-ML integration strategies by the mechanism, depth, and fidelity of physical supervision. A preprint is in preparation.',
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
      'Assembled a 6-DOF SO101 robot arm and trained reinforcement learning policies directly on hardware — achieving autonomous pick-and-place without simulation.',
    tags: ['Robotics', 'Reinforcement Learning', 'Python', 'LeRobot', 'Sim-to-Real'],
    problem:
      'Training RL policies for real robot manipulation is hard in a way that simulated benchmarks obscure: real hardware has motor backlash, sensor noise, and non-stationary dynamics that break policies trained in clean simulators. The sim-to-real gap has been a dominant failure mode in manipulation research — policies that achieve near-perfect scores in MuJoCo or Isaac Gym often collapse on contact with physical objects. The SO101 is a ~$150 open-source 6-DOF arm that is genuinely capable, but using it as a real-hardware RL testbed — where the robot is both the training environment and the deployment target — requires solving the sample efficiency problem: RL algorithms that take millions of environment steps in simulation become impractical when each step involves a physical actuator. The objective was to train RL policies directly on the SO101 without simulation, using sample-efficient algorithms and safe exploration constraints.',
    solution:
      'Assembled the SO101 from hardware, calibrated each servo\'s torque limits and joint ranges, and integrated the arm with the HuggingFace LeRobot framework for policy training and evaluation. Implemented a Soft Actor-Critic (SAC) agent for its off-policy sample efficiency — critical when environment interactions are physically bounded. To enable safe on-hardware exploration, the state space was constrained using joint-limit penalty shaping and an episode-termination safety wrapper that cut rollouts before dangerous configurations could develop. Reward functions were designed around contact-based task success signals captured via wrist-mounted force feedback and overhead camera state estimation. The central challenge was reward sparsity during early training — the robot rarely made contact with targets by random exploration — addressed by a curriculum that progressively narrowed the initial object placement distribution as policy performance improved. Training converged to reliable autonomous pick-and-place performance after approximately 4 hours of on-hardware interaction. The result is a fully on-robot RL pipeline running on commodity hardware for under $150.',
    links: [
      { label: 'GitHub', href: 'https://github.com/Mack-26/so101', external: true },
    ],
    artifact: { type: 'image', src: '/artifacts/so101/robot_arm.jpg', alt: 'SO101 robot arm' },
  },
];

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug) ?? null;
}
