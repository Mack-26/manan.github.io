export const projects = [
  {
    slug: 'learnpool',
    title: 'LearnPool',
    type: 'Project',
    meta: 'Ross AI Hackathon · 2026',
    summary:
      'A shared, course-aware AI workspace that replaces isolated ChatGPT usage with a collaborative Q&A platform. Professors get live visibility into what students are struggling with.',
    tags: ['AI', 'EdTech', 'RAG', 'Next.js', 'Hackathon Winner'],
    problem:
      'Generative AI has quietly fragmented the classroom: students query ChatGPT independently, each session is private, and every answer is untethered from actual course material. Professors are left flying blind with no visibility into which concepts are causing confusion, no signal to adapt lectures, and no way to intervene before an exam. The bottleneck is structural: existing AI tools are built for individuals, not cohorts. The objective was to replace isolated AI usage with a shared, course-grounded workspace that creates a continuous feedback loop between students and instructors. Built in 24 hours at the University of Michigan Ross Business+Tech AI Hackathon.',
    solution:
      'Built LearnPool as a full-stack Next.js application with a RAG pipeline. Professors upload course materials (syllabi, lecture notes, PDFs), which are chunked and indexed into a vector store; every student query is routed through retrieval before reaching the LLM, ensuring answers stay grounded in the actual course rather than generic knowledge. All Q&A flows into a shared, upvotable feed so the most common confusions surface naturally. A live professor dashboard aggregates trending questions, flags misconceptions by topic, and lets instructors mark issues as addressed, completing the feedback loop. The hardest engineering challenge was maintaining retrieval accuracy across heterogeneous document formats (PDFs, slides, scanned notes) under hackathon time pressure. I solved this with a format-aware chunking strategy that preserved semantic context. LearnPool earned an honourable mention at the hackathon.',
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
  //     'Working with Prof. Ziyou Song at UMich to design a physics-informed ML pipeline for EIS-based state-of-health prediction. Electrochemical Impedance Spectroscopy measurements encode a battery\'s internal state as a frequency-domain impedance spectrum; equivalent circuit models (ECMs) are first fit to extract physically meaningful parameters  -  charge transfer resistance, double-layer capacitance, diffusion coefficients  -  which are then combined with raw spectral features as inputs to PyTorch neural networks. This hybrid representation lets the model learn residual degradation patterns that the physics cannot fully account for, while remaining interpretable. PyTorch was chosen for its flexibility in defining custom loss terms that penalize physically inconsistent predictions, a capability that is far more ergonomic than TensorFlow for research-stage work. The central challenge has been handling distribution shift across different chemistries and operating temperatures  -  an ongoing effort involving domain adaptation techniques and targeted data collection. Research is active and results are being prepared for publication.',
  //   links: [],
  //   artifact: null,
  // },
  {
    slug: 'hrms',
    title: 'Field HRMS Mobile App',
    type: 'Project',
    meta: 'Founder · 2022–2024',
    summary:
      'Founded a field workforce management startup from scratch. Recruited the team, closed enterprise contracts, and shipped a product adopted by 500+ employees. Acquired by a leading defence manufacturing firm.',
    tags: ['Founder', 'React Native', 'iOS', 'Android', 'Geofencing', 'Acquired'],
    problem:
      'Large field-deployed workforces across construction sites, manufacturing yards, and logistics networks were still managing attendance and compliance through spreadsheets and phone calls. The gap wasn\'t just operational inefficiency; it was a genuine liability. Without verifiable location data and audit trails, companies faced payroll fraud, labour law exposure, and zero real-time visibility into where their people were. Existing enterprise HRMS platforms were built for desk workers: expensive, desktop-heavy, and completely unequipped for intermittent connectivity and distributed field environments. The objective was to build a mobile-first HRMS from the ground up, then sell, deploy, and scale it as a business.',
    solution:
      'Recruited and led a team of 4 engineers, defined the product roadmap, and closed the first enterprise contracts before a line of production code was written. Built a cross-platform mobile app in React Native targeting iOS and Android from a single codebase, with geofenced clock-in/out (employees could only mark attendance within GPS-verified radii of their site), biometric authentication to eliminate proxy attendance, real-time manager dashboards, compliance alert push notifications, and automated payroll-ready exports. I handled everything from architecture decisions and sprint planning to customer calls and contract negotiations. The hardest engineering problem was geofence reliability in dense environments where GPS drift caused false rejections. I solved this with a hybrid positioning algorithm that weighted cell-tower and Wi-Fi signals as fallbacks. The harder business problem was earning trust from enterprise procurement teams as a first-time founder. I addressed this by leading with a focused pilot, maintaining tight feedback loops, and delivering measurable outcomes. The product reduced manual attendance overhead by 80%, scaled to 500+ active field employees, and was ultimately acquired by a leading company in the defence manufacturing industry.',
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
    videos: [
      { src: '/artifacts/so101/robot_1.mp4', label: 'Teleoperation demo' },
      { src: '/artifacts/so101/robot_2.mp4', label: 'Pick and place' },
      { src: '/artifacts/so101/robot_3.mp4', label: 'Autonomous task' },
    ],
  },
];

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug) ?? null;
}
