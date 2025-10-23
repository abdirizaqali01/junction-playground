'use client'

import { useCallback, useMemo } from 'react'

export type PartnerChallengeType = 'main' | 'side'

export interface PartnerChallengeResource {
  label: string
  value: string
  url?: string
}

export interface PartnerChallengeJudgingCriterion {
  title: string
  description: string
}

export interface PartnerChallengeCompanyInfo {
  name: string
  summary: string
  description: string
  website?: string
  contactEmail?: string
  location?: string
  heroImage?: string
}

export interface PartnerChallengeDetail {
  heroSubtitle?: string
  challenge: string[]
  insight: string[]
  whatWeBring: string[]
  judgingCriteria: PartnerChallengeJudgingCriterion[]
  company: PartnerChallengeCompanyInfo
  resources?: PartnerChallengeResource[]
}

export interface PartnerChallenge {
  id: string
  title: string
  summary: string
  category: string
  sponsor: string
  type: PartnerChallengeType
  tags: string[]
  prizes: {
    first: string
    second?: string
    third?: string
    bonus?: string
  }
  status?: string
  trackLabel?: string
  iconLabel?: string
  coverImage?: string
  thumbnail?: string
  detail: PartnerChallengeDetail
}

interface GroupedChallenges {
  category: string
  challenges: PartnerChallenge[]
}

interface DetailInput {
  heroSubtitle?: string
  challenge: string[]
  insight: string[]
  whatWeBring: string[]
  company: PartnerChallengeCompanyInfo
  judgingCriteria?: PartnerChallengeJudgingCriterion[]
  resources?: PartnerChallengeResource[]
}

const defaultJudgingCriteria: PartnerChallengeJudgingCriterion[] = [
  {
    title: 'Business Impact',
    description:
      'Demonstrates a measurable benefit for the partner organisation and a clear understanding of the target user.',
  },
  {
    title: 'Technical Execution',
    description:
      'Solid architecture, smart use of partner assets and clear reasoning about scalability, security and maintenance.',
  },
  {
    title: 'User Experience',
    description:
      'Communicates complex workflows simply, with thoughtful storytelling and accessible interactions.',
  },
  {
    title: 'Delivery & Pitch',
    description:
      'Candid about assumptions, trade-offs and open questions while outlining a realistic path to production.',
  },
]

const defaultResources: PartnerChallengeResource[] = [
  { label: 'Office Hours', value: 'Daily mentor drop-ins at 11:00 and 16:00' },
  { label: 'Data Room', value: 'Access to sanitised partner datasets under NDA-lite terms' },
]

const createDetail = (detail: DetailInput): PartnerChallengeDetail => ({
  heroSubtitle: detail.heroSubtitle,
  challenge: detail.challenge,
  insight: detail.insight,
  whatWeBring: detail.whatWeBring,
  judgingCriteria: detail.judgingCriteria ?? defaultJudgingCriteria,
  company: detail.company,
  resources: detail.resources ?? defaultResources,
})

const CHALLENGE_DATA: PartnerChallenge[] = [
  {
    id: 'ai-01',
    title:
      'Utilizing Generative AI For Real-Time Insights That Drive Sustainable Business Decisions',
    summary:
      'Build an intelligence layer that translates streaming sustainability data into concise next actions for executive teams.',
    category: 'Artificial Intelligence',
    sponsor: 'CoreOptics',
    type: 'main',
    tags: ['AI', 'Machine Learning', 'Data Science'],
    prizes: {
      first: '€10 000',
      second: '€5 000',
      third: '€2 000',
    },
    status: 'Hacking Ongoing',
    trackLabel: 'Artificial Intelligence (Track)',
    iconLabel: 'CO',
    coverImage: '/placeholder.jpg',
    detail: createDetail({
      heroSubtitle: 'CoreOptics Partner Challenge',
      company: {
        name: 'CoreOptics',
        summary: 'Climate intelligence for enterprise operators.',
        description:
          'CoreOptics captures carbon, logistics and energy telemetry and turns it into live sustainability reporting for Fortune 500 teams.',
        website: 'https://partners.coreoptics.example',
        contactEmail: 'partnerships@coreoptics.com',
        location: 'Helsinki, Finland',
        heroImage: '/placeholder.jpg',
      },
      challenge: [
        'CoreOptics operates climate-intelligence control rooms for manufacturing and retail clients. They receive high-frequency energy, freight and supply chain data yet most decision makers still receive resynthesised PowerPoints days later.',
        'We want you to build a decision surface that condenses streaming signals into confident, time-bound recommendations. Think dashboards that speak the language of finance and operations, not data science.',
      ],
      insight: [
        'Sustainability leads juggle dozens of data sources and spend hours translating insights for commercial stakeholders.',
        'Executives demand “tell me what to do” guidance that balances cost, emissions and risk.',
        'We are providing three months of anonymised telemetry covering energy loads, fleet utilisation and emissions baselines.',
      ],
      whatWeBring: [
        'High-frequency energy and supply chain telemetry in CSV and API form.',
        'Weekly white-board sessions with our senior sustainability strategists.',
        'Sandbox access to our alerting engine for experimentation.',
      ],
      judgingCriteria: [
        {
          title: 'Operational Impact',
          description: 'How directly does the solution unlock faster or better sustainability decisions?',
        },
        {
          title: 'Explainability',
          description: 'Reasoning and confidence levels are surfaced for non-technical audiences.',
        },
        {
          title: 'Integration Readiness',
          description: 'Clear plan for plugging into existing BI stacks or workflow tools.',
        },
        defaultJudgingCriteria[3],
      ],
      resources: [
        { label: 'Primary Dataset', value: 'Live energy load + logistics telemetry streams' },
        { label: 'Mentors', value: '2 climate intelligence strategists on-site' },
        { label: 'Sandbox', value: 'CoreOptics API access keys with test tenants' },
      ],
    }),
  },
  {
    id: 'ai-02',
    title: 'Responsible AI Assistants For High-Stakes Industries',
    summary:
      'Design a responsible AI teammate that documents every decision and keeps humans in the loop for regulated environments.',
    category: 'Artificial Intelligence',
    sponsor: 'CoreOptics',
    type: 'main',
    tags: ['AI', 'Ethics', 'Explainability'],
    prizes: {
      first: '€6 000',
      second: '€3 000',
      third: '€1 000',
    },
    trackLabel: 'Artificial Intelligence (Track)',
    iconLabel: 'CO',
    coverImage: '/placeholder.jpg',
    detail: createDetail({
      heroSubtitle: 'Regulation-ready agent design',
      company: {
        name: 'CoreOptics',
        summary: 'Risk-sensitive AI tooling built with auditability first.',
        description:
          'From algorithmic risk registers to continuous red teaming, CoreOptics helps customers run AI safely in regulated industries.',
        website: 'https://responsible.coreoptics.example',
        contactEmail: 'compliance@coreoptics.com',
        heroImage: '/placeholder.jpg',
      },
      challenge: [
        'Build an assistant that can support healthcare or finance practitioners without creating new risk. Every recommendation must be traceable back to source data and model decisions.',
        'Think beyond chat. We expect a workflow that combines document retrieval, structured reasoning and collaboration hooks so humans remain accountable.',
      ],
      insight: [
        'Regulated teams fear black boxes. They need structured audit trails and a way to challenge recommendations.',
        'Model drift is inevitable, so monitoring and recertification workflows must be part of your story.',
        'We provide synthetic but realistic case files, risk policies and example audit playbooks.',
      ],
      whatWeBring: [
        'Responsible AI policy templates and assessment checklists.',
        'Synthetic healthcare and finance case datasets with risk tagging.',
        'Mentorship from our AI governance and security advisors.',
      ],
      resources: [
        { label: 'Dataset', value: 'Redacted case files + policy libraries' },
        { label: 'Governance Toolkit', value: 'Risk register schema + report templates' },
        defaultResources[0],
      ],
    }),
  },
  {
    id: 'bio-01',
    title: 'Biotech Pipelines For Rapid Lab Automation',
    summary:
      'Prototype a control plane that lets scientists orchestrate lab robotics, scheduling and data capture in one interface.',
    category: 'Biotech',
    sponsor: 'Helix Labs',
    type: 'main',
    tags: ['Automation', 'Biotech', 'Robotics'],
    prizes: {
      first: '€7 500',
      second: '€3 500',
      third: '€1 500',
    },
    trackLabel: 'Biotech (Track)',
    iconLabel: 'HL',
    coverImage: '/placeholder.jpg',
    detail: createDetail({
      heroSubtitle: 'Helix Labs automation sprint',
      company: {
        name: 'Helix Labs',
        summary: 'Full-stack wet lab automation studio.',
        description:
          'Helix Labs provides robotics, scheduling and analytics for next-generation therapeutics companies.',
        website: 'https://helixlabs.example',
        contactEmail: 'automation@helixlabs.com',
        location: 'Berlin, Germany',
        heroImage: '/placeholder.jpg',
      },
      challenge: [
        'Today, Helix robotics engineers manually juggle plate handling, incubation and analytics queues. Scientists jump between screens to understand experiment status.',
        'Design a mission control that unifies run planning, live telemetry and exception handling so scientists focus on decisions, not devices.',
      ],
      insight: [
        'Lab managers need a crisp view of resource utilisation across robots, incubators and analysts.',
        'Human-in-the-loop approvals are essential for certain steps; the system must pause gracefully.',
        'Regulatory audits expect granular logs of every transfer and parameter change.',
      ],
      whatWeBring: [
        'Equipment emulators that emit real-world telemetry.',
        'Example protocols, SOPs and failure case libraries.',
        'Mentors from our automation engineering team.',
      ],
      judgingCriteria: [
        {
          title: 'Throughput Gains',
          description: 'Degree to which the concept removes manual coordination or idle time.',
        },
        defaultJudgingCriteria[1],
        defaultJudgingCriteria[2],
        defaultJudgingCriteria[3],
      ],
      resources: [
        { label: 'Robot Telemetry', value: 'Simulated liquid handler + incubator feeds' },
        { label: 'Protocols', value: 'Example DNA assembly workflows' },
        defaultResources[0],
      ],
    }),
  },
  {
    id: 'cyber-01',
    title: 'Zero-Trust Tooling For Distributed Teams',
    summary:
      'Create an adaptive security toolkit that keeps distributed engineers compliant without slowing delivery.',
    category: 'Cybersecurity',
    sponsor: 'CobaltOps',
    type: 'main',
    tags: ['Security', 'DevSecOps', 'Automation'],
    prizes: {
      first: '€8 000',
      second: '€4 000',
      third: '€2 000',
    },
    trackLabel: 'Cybersecurity (Track)',
    iconLabel: 'CO',
    coverImage: '/placeholder.jpg',
    detail: createDetail({
      heroSubtitle: 'CobaltOps secure delivery challenge',
      company: {
        name: 'CobaltOps',
        summary: 'Security automation for product engineering teams.',
        description:
          'CobaltOps combines endpoint telemetry, policies and runbooks into a single platform to keep distributed engineering squads compliant.',
        website: 'https://cobaltops.example',
        contactEmail: 'hello@cobaltops.com',
        location: 'Tallinn, Estonia',
        heroImage: '/placeholder.jpg',
      },
      challenge: [
        'Build an engineer-friendly experience that applies zero-trust policies contextually. Think dynamic access, least privilege credentials and inline nudges instead of heavy-handed blocks.',
        'Your solution should collect activity signals, evaluate risk scores and deliver actionable remediations inside the tools teams already use.',
      ],
      insight: [
        'Security alerts drown developers; they need prioritised, explainable remediation.',
        'Policy exceptions are common. The toolkit must capture approvals and audit evidence automatically.',
        'We provide anonymised endpoint metadata, Git event samples and policy rule sets.',
      ],
      whatWeBring: [
        'Risk scoring datasets and detection playbooks.',
        'Reference integrations for Slack, GitHub and Okta.',
        'Shadow sessions with our security operations engineers.',
      ],
      resources: [
        { label: 'Event Stream', value: 'Aggregated endpoint + SCM activity feed' },
        { label: 'Policy Library', value: 'Zero-trust policy packs by environment' },
        defaultResources[0],
      ],
    }),
  },
  {
    id: 'space-01',
    title: 'De-Orbit Optimisation With Synthetic Earth Data',
    summary:
      'Leverage synthetic satellite constellations to plan safe and efficient de-orbit manoeuvres for low-earth assets.',
    category: 'SpaceTech',
    sponsor: 'OrbitalWorks',
    type: 'main',
    tags: ['Aerospace', 'Simulation', 'Data'],
    prizes: {
      first: '€9 000',
      second: '€4 500',
      third: '€2 500',
    },
    trackLabel: 'SpaceTech (Track)',
    iconLabel: 'OW',
    coverImage: '/placeholder.jpg',
    detail: createDetail({
      heroSubtitle: 'OrbitalWorks manoeuvre lab',
      company: {
        name: 'OrbitalWorks',
        summary: 'Autonomy and mission planning for responsible space operations.',
        description:
          'OrbitalWorks supports satellite operators with guidance, navigation and control tooling tuned for debris mitigation.',
        website: 'https://orbitalworks.example',
        contactEmail: 'missioncontrol@orbitalworks.com',
        location: 'Munich, Germany',
        heroImage: '/placeholder.jpg',
      },
      challenge: [
        'Construct a cockpit that ingests synthetic orbital data, propagates objects forward and recommends de-orbit manoeuvres with quantified risk.',
        'We expect visual storytelling that helps mission controllers compare manoeuvre windows, fuel trade-offs and conjunction probability.',
      ],
      insight: [
        'Space operations teams rarely have intuitive tooling for end-of-life planning, leading to schedule slips.',
        'Conjunction forecasts require blending public catalogues with proprietary telemetry.',
        'Regulators want evidence that disposal manoeuvres minimise debris probability while respecting operational constraints.',
      ],
      whatWeBring: [
        'Synthetic multi-orbit datasets with ground truth outcomes.',
        'Mission planning mentors with experience in LEO and GEO.',
        'Templates for regulatory reporting and flight director briefs.',
      ],
      judgingCriteria: [
        {
          title: 'Safety Assurance',
          description: 'Confidence that the manoeuvre plan meets international debris mitigation standards.',
        },
        defaultJudgingCriteria[1],
        defaultJudgingCriteria[2],
        defaultJudgingCriteria[3],
      ],
      resources: [
        { label: 'Simulation Toolkit', value: 'OrbitalWorks Python sandbox + Jupyter recipes' },
        { label: 'Telemetry', value: 'Synthetic radar + optical observation feeds' },
        defaultResources[0],
      ],
    }),
  },
  {
    id: 'robot-01',
    title: 'Assistive Robotics For Complex Warehouses',
    summary:
      'Compose collaborative behaviours for fleets of assistive robots that keep humans safe and fulfilment blazing fast.',
    category: 'Robotics',
    sponsor: 'VectorMotion',
    type: 'main',
    tags: ['Robotics', 'Logistics', 'Simulation'],
    prizes: {
      first: '€6 500',
      second: '€3 000',
      third: '€1 500',
    },
    trackLabel: 'Robotics (Track)',
    iconLabel: 'VM',
    coverImage: '/placeholder.jpg',
    detail: createDetail({
      heroSubtitle: 'VectorMotion warehouse sprint',
      company: {
        name: 'VectorMotion',
        summary: 'Collaborative robotics platform for dynamic fulfilment centres.',
        description:
          'VectorMotion delivers robot perception, orchestration and safety tooling for tier-one logistics operators.',
        website: 'https://vectormotion.example',
        contactEmail: 'hello@vectormotion.com',
        heroImage: '/placeholder.jpg',
      },
      challenge: [
        'Design behaviours for robots that assist pickers and packers in real time. Your system should predict demand spikes, choreograph robot routes and keep humans in control.',
        'Present both a control interface and the autonomy stack decisions. Bonus for sim-to-real validation strategies.',
      ],
      insight: [
        'Human workers trust robots that communicate intent clearly and request help proactively.',
        'Bottlenecks arise at packing stations; dynamic rebalancing can unlock huge throughput gains.',
        'Safety cases require logging interactions and enforcing speed limits near people.',
      ],
      whatWeBring: [
        'Simulation environments with realistic warehouse layouts.',
        'Kinematics models for helper bots and AMRs.',
        'Mentorship from robotics safety engineers and ergonomics experts.',
      ],
      resources: [
        { label: 'Simulation', value: 'Unity + ROS scenarios with 20+ layouts' },
        { label: 'Sensor Packs', value: 'Depth, LiDAR and RFID sample datasets' },
        defaultResources[0],
      ],
    }),
  },
  {
    id: 'ai-side-01',
    title: 'Prototype Playground: Rapid AI Experiments',
    summary:
      'Showcase the most audacious experiment in our API sandbox to win mentorship and usage credits.',
    category: 'Artificial Intelligence',
    sponsor: 'CoreOptics',
    type: 'side',
    tags: ['Experimentation', 'API', 'AI'],
    prizes: {
      first: '10 000 API credits',
      bonus: 'Mentorship session',
    },
    iconLabel: 'CO',
    coverImage: '/placeholder.jpg',
    detail: createDetail({
      heroSubtitle: 'Creative playground',
      company: {
        name: 'CoreOptics',
        summary: 'A research lab exploring ethical GenAI in infrastructure contexts.',
        description:
          'The experimental CoreOptics team iterates on lightweight generative models and tooling that can run on the edge.',
        contactEmail: 'labs@coreoptics.com',
        heroImage: '/placeholder.jpg',
      },
      challenge: [
        'Push the sandbox to its limits. Build a micro-experience that delights users or unlocks a surprising workflow using our streaming APIs.',
        'Embrace experimentation. We care more about inventiveness and craft than production readiness here.',
      ],
      insight: [
        'The sandbox bundles small but powerful models optimised for low-latency inference.',
        'Multimodal experiments are encouraged: combine vision, text and signals in novel ways.',
        'Share your learnings. Document what surprised you or what you would pursue with more time.',
      ],
      whatWeBring: [
        'Mentor feedback on creative direction and storytelling.',
        'Office hours with our model research engineers.',
        'Exclusive access to unreleased model endpoints during the weekend.',
      ],
      judgingCriteria: [
        {
          title: 'Originality',
          description: 'Surprises judges with a novel application or interaction pattern.',
        },
        {
          title: 'Execution',
          description: 'Crisp craft, thoughtful details and a polished demo experience.',
        },
        {
          title: 'Learning Articulation',
          description: 'Clear explanation of discoveries, dead ends and next experiments.',
        },
      ],
      resources: [
        { label: 'Sandbox Access', value: 'Pre-provisioned API keys with 5x rate limits' },
        { label: 'Mentors', value: 'Daily crit sessions with CoreOptics Labs' },
      ],
    }),
  },
  {
    id: 'cyber-side-01',
    title: 'Bug Hunt: Secure The Edge',
    summary:
      'Hunt for vulnerabilities across our demo tenant and pitch mitigations that can deploy within a week.',
    category: 'Cybersecurity',
    sponsor: 'CobaltOps',
    type: 'side',
    tags: ['Security', 'Bug Bounty'],
    prizes: {
      first: '€3 000',
      second: '€1 500',
    },
    iconLabel: 'CO',
    coverImage: '/placeholder.jpg',
    detail: createDetail({
      heroSubtitle: 'Adversarial sprint',
      company: {
        name: 'CobaltOps',
        summary: 'The defensive wing protecting distributed product teams.',
        description:
          'Beyond automation, our red and blue teams run continuous adversary simulations to harden customer infrastructure.',
        contactEmail: 'security@cobaltops.com',
        heroImage: '/placeholder.jpg',
      },
      challenge: [
        'Exploit the intentionally vulnerable edge stack we prepared. Once you gain a foothold, prioritise the fixes that give us massive risk reduction quickly.',
        'Document the exploit path, the blast radius and a pragmatic remediation plan that engineering can execute in under a week.',
      ],
      insight: [
        'Focus on high-leverage findings: auth bypasses, data exfiltration, privilege escalation.',
        'We value proof-of-concept payloads alongside detection or hardening ideas.',
        'Keep a logbook. Your report should teach our engineering leads exactly what to do next.',
      ],
      whatWeBring: [
        'Isolated demo tenant with logging enabled.',
        'Support from our red team for safe collaboration.',
        'Exploit development toolkit and sample detections.',
      ],
      judgingCriteria: [
        {
          title: 'Severity',
          description: 'Magnitude of impact if the exploit were executed in production.',
        },
        {
          title: 'Exploit Clarity',
          description: 'Reproducible steps, evidence and defender considerations.',
        },
        {
          title: 'Remediation Plan',
          description: 'Concrete, prioritised actions weighted by effort and payoff.',
        },
      ],
      resources: [
        { label: 'Scope', value: 'Documented endpoints + architecture diagram' },
        { label: 'Access', value: 'Red team collaboration channel and tooling' },
      ],
    }),
  },
  {
    id: 'bio-side-01',
    title: 'Molecular Visualisation Toolkit',
    summary:
      'Craft an interactive visualisation of protein interactions using Helix Labs datasets, bonus for immersive layers.',
    category: 'Biotech',
    sponsor: 'Helix Labs',
    type: 'side',
    tags: ['Biotech', 'Visualisation'],
    prizes: {
      first: 'Lab residency',
      bonus: '€1 000 travel stipend',
    },
    iconLabel: 'HL',
    coverImage: '/placeholder.jpg',
    detail: createDetail({
      heroSubtitle: 'Scientific storytelling sprint',
      company: {
        name: 'Helix Labs',
        summary: 'Scientific computing with a storytelling soul.',
        description:
          'Our discovery team blends molecular dynamics with cinematic design to help researchers understand complex biology.',
        contactEmail: 'visuals@helixlabs.com',
        heroImage: '/placeholder.jpg',
      },
      challenge: [
        'Tell the story of protein interactions in a way that scientists and lay audiences can both appreciate. Build a toolkit or experience that highlights structure, dynamics and potential drug targets.',
        'We encourage experimental mediums: desktop, web, AR, VR or physical installations.',
      ],
      insight: [
        'Researchers want both accuracy and narrative clarity. Legends, annotations and context matter.',
        'Cross-compare multiple datasets to reveal how structures evolve over time or under different stimuli.',
        'Accessibility is key; colour palettes and interaction patterns should be inclusive.',
      ],
      whatWeBring: [
        'Protein structure datasets and simulation exports.',
        'Motion design support and accessibility guidelines.',
        'Mentorship from our scientific visualisation artists.',
      ],
      judgingCriteria: [
        {
          title: 'Scientific Fidelity',
          description: 'Accuracy of the data representation and annotations.',
        },
        {
          title: 'Immersion',
          description: 'Ability to engage viewers and reveal hidden stories in the data.',
        },
        defaultJudgingCriteria[2],
      ],
      resources: [
        { label: 'Dataset', value: 'Molecular dynamics snapshots + annotations' },
        { label: 'Design Kit', value: 'Helix Labs visual language and components' },
      ],
    }),
  },
]

const MAIN_CHALLENGE_ORDER = [
  'Artificial Intelligence',
  'Biotech',
  'Cybersecurity',
  'Robotics',
  'SpaceTech',
]

function groupByCategory(
  challenges: PartnerChallenge[],
  categoryOrder?: string[]
): GroupedChallenges[] {
  const grouping = challenges.reduce<Record<string, PartnerChallenge[]>>((acc, challenge) => {
    if (!acc[challenge.category]) {
      acc[challenge.category] = []
    }
    acc[challenge.category].push(challenge)
    return acc
  }, {})

  const ordered = categoryOrder
    ? categoryOrder.filter(category => grouping[category])
    : Object.keys(grouping)

  const unorderedExtras = Object.keys(grouping).filter(
    category => !ordered.includes(category)
  )

  return [...ordered, ...unorderedExtras].map(category => ({
    category,
    challenges: grouping[category],
  }))
}

export function usePartnerChallenges() {
  const challengeMap = useMemo(() => {
    const map = new Map<string, PartnerChallenge>()
    CHALLENGE_DATA.forEach(challenge => {
      map.set(challenge.id, challenge)
    })
    return map
  }, [])

  const mainChallenges = useMemo(
    () => CHALLENGE_DATA.filter(challenge => challenge.type === 'main'),
    []
  )

  const sideChallenges = useMemo(
    () => CHALLENGE_DATA.filter(challenge => challenge.type === 'side'),
    []
  )

  const groupedMainChallenges = useMemo(
    () => groupByCategory(mainChallenges, MAIN_CHALLENGE_ORDER),
    [mainChallenges]
  )

  const groupedSideChallenges = useMemo(
    () => groupByCategory(sideChallenges),
    [sideChallenges]
  )

  const categoryAnchors = useMemo(
    () => groupedMainChallenges.map(group => group.category),
    [groupedMainChallenges]
  )

  const sideCategoryAnchors = useMemo(
    () => groupedSideChallenges.map(group => group.category),
    [groupedSideChallenges]
  )

  const getChallengeById = useCallback(
    (id: string) => challengeMap.get(id) ?? null,
    [challengeMap]
  )

  return {
    allChallenges: CHALLENGE_DATA,
    mainChallenges,
    sideChallenges,
    groupedMainChallenges,
    groupedSideChallenges,
    categoryAnchors,
    sideCategoryAnchors,
    getChallengeById,
  }
}
