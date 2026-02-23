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
      'Students use AI tools like ChatGPT in isolation — asking the same questions independently, getting answers untethered from course material. Professors have zero visibility into what students are struggling with, and no feedback loop to improve lectures.',
    solution:
      'Built LearnPool: a shared AI workspace where student questions feed into a course-aware, RAG-powered AI grounded in uploaded course materials. All Q&A flows into a searchable, upvotable feed. Professors get a live dashboard showing trending questions, common misconceptions, and can mark topics as addressed — creating a continuous feedback loop between students and instructors.',
    links: [
      { label: 'GitHub', href: 'https://github.com/Mack-26/learnpool', external: true },
    ],
    artifact: { type: 'image', src: '/artifacts/learnpool-architecture.png', alt: 'LearnPool system architecture diagram', darkBg: true },
    htmlArtifact: { src: '/artifacts/learnpool-before-after.html', title: 'Problem vs Solution' },
  },
  {
    slug: 'battery-ml',
    title: 'ML for Second-Life EV Batteries',
    type: 'Research',
    meta: 'Ziyou Song Lab, UMich · 2025 – Present',
    summary:
      'Modeling degradation mechanisms and predicting remaining useful life of EV batteries using electrochemical impedance spectroscopy data.',
    tags: ['Battery ML', 'EIS Analysis', 'PyTorch', 'Sustainability'],
    problem:
      'Lithium-ion batteries degrade over time, but the relationship between internal electrochemical state and remaining life is complex and hard to model. Repurposing EV batteries for second-life applications requires accurate degradation prediction.',
    solution:
      'Applied physics-informed machine learning to electrochemical impedance spectroscopy (EIS) data to predict battery state of health. Combined classical equivalent circuit models with neural networks to capture degradation mechanisms that pure data-driven approaches miss.',
    links: [],
    artifact: null,
  },
  {
    slug: 'hrms',
    title: 'Field HRMS Mobile App',
    type: 'Project',
    meta: 'AuxoAI · 2023–2024',
    summary:
      'Led a team of 4 to build a mobile HRMS with geofenced attendance, biometric auth, and compliance alerts. Adopted by 500+ field employees.',
    tags: ['iOS', 'Android', 'React Native', 'Product Lead', 'Geofencing'],
    problem:
      'Field workforce management at scale is hard — tracking attendance for employees spread across geographies, ensuring compliance, and providing managers with real-time visibility was done manually via spreadsheets.',
    solution:
      'Built a cross-platform mobile HRMS with geofenced clock-in/out, biometric authentication, push notification alerts for compliance, and a manager dashboard. Reduced manual attendance overhead by 80% and onboarded 500+ field employees.',
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
      'Investigating equipment failure requires reading hundreds-of-pages technical reports, cross-referencing logs, and synthesizing root causes — a task that takes engineers days.',
    solution:
      'Built a multi-step agentic pipeline on Vertex AI: documents are chunked and indexed, then an LLM agent iteratively retrieves relevant sections, synthesizes findings, and produces a structured root-cause report. Reduced investigation time from days to under 30 minutes at 96% accuracy.',
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
      'Birth certificate systems in many regions are paper-based, slow, and susceptible to forgery. Centralized digital systems create single points of failure.',
    solution:
      'Designed a decentralized PKI system on a permissioned blockchain where government authorities issue cryptographically signed birth certificates as on-chain records. Zero forgery risk, sub-$0.01 issuance cost, and instant verification.',
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
      'Climate models require enormous compute and still struggle to capture sub-grid-scale physics. Pure ML models lack interpretability and can violate physical conservation laws.',
    solution:
      'Conducted a comprehensive survey of Physics-Informed Neural Networks (PINNs) applied to climate science — from ocean circulation to atmospheric modeling. Synthesized key architectural choices, benchmark results, and open challenges. Preprint in preparation.',
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
      'Built and programmed a 6-DOF SO101 low-cost robot arm — from hardware assembly to teleoperation and autonomous task execution.',
    tags: ['Robotics', 'Python', 'LeRobot', 'Teleoperation', 'Motor Control'],
    problem:
      'Consumer-grade robot arms are either expensive or lack good software ecosystems. The SO101 is an open-source low-cost arm, but getting it from hardware to meaningful tasks requires integrating motor control, vision, and policy training from scratch.',
    solution:
      'Assembled the SO101 6-DOF arm and integrated it with the HuggingFace LeRobot framework. Set up teleoperation via a leader arm, recorded demonstrations, and trained imitation learning policies for pick-and-place tasks. Enables reproducible robotics research on a $150 budget.',
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
