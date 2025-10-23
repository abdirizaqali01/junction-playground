'use client'

import { useMemo } from 'react'

export type PartnerChallengeType = 'main' | 'side'

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
  thumbnail?: string
}

const CHALLENGE_DATA: PartnerChallenge[] = [
  {
    id: 'ai-01',
    title:
      'Utilizing Generative AI For Real-Time Insights That Drive Sustainable Business Decisions',
    summary:
      'Build an AI-driven system that collects and summarises real-time data to deliver actionable climate-related insights for corporate teams.',
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
  },
  {
    id: 'ai-02',
    title:
      'Responsible AI Assistants For High-Stakes Industries',
    summary:
      'Design an assistant that operates with transparent decision trails for regulated industries such as healthcare or finance.',
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
  },
  {
    id: 'bio-01',
    title: 'Biotech Pipelines For Rapid Lab Automation',
    summary:
      'Prototype a workflow automation layer that helps scientists orchestrate lab robotics and data capture in a unified dashboard.',
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
  },
  {
    id: 'cyber-01',
    title: 'Zero-Trust Tooling For Distributed Teams',
    summary:
      'Create an adaptive security toolkit that keeps globally distributed engineering teams compliant without compromising on velocity.',
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
  },
  {
    id: 'space-01',
    title: 'De-Orbit Optimisation With Synthetic Earth Data',
    summary:
      'Leveraging synthetic satellite datasets, build decision support tools that help mission operators plan safe de-orbit manoeuvres.',
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
  },
  {
    id: 'robot-01',
    title: 'Assistive Robotics For Complex Warehouses',
    summary:
      'Design cooperative robotics behaviours that help teams execute fulfilment tasks faster and more safely in dynamic environments.',
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
  },
  {
    id: 'ai-side-01',
    title: 'Prototype Playground: Rapid AI Experiments',
    summary:
      'Submit the most creative use of our API sandbox to unlock early-access credits and mentorship hours.',
    category: 'Artificial Intelligence',
    sponsor: 'CoreOptics',
    type: 'side',
    tags: ['Experimentation', 'API', 'AI'],
    prizes: {
      first: '10 000 API credits',
      bonus: 'Mentorship session',
    },
    iconLabel: 'CO',
  },
  {
    id: 'cyber-side-01',
    title: 'Bug Hunt: Secure The Edge',
    summary:
      'Track down vulnerabilities inside our demo tenant and propose mitigations that can be rolled out in days, not weeks.',
    category: 'Cybersecurity',
    sponsor: 'CobaltOps',
    type: 'side',
    tags: ['Security', 'Bug Bounty'],
    prizes: {
      first: '€3 000',
      second: '€1 500',
    },
    iconLabel: 'CO',
  },
  {
    id: 'bio-side-01',
    title: 'Molecular Visualisation Toolkit',
    summary:
      'Craft a bite-sized visualisation of protein interactions using our dataset — bonus points for AR or VR integrations.',
    category: 'Biotech',
    sponsor: 'Helix Labs',
    type: 'side',
    tags: ['Biotech', 'Visualisation'],
    prizes: {
      first: 'Lab residency',
      bonus: '€1 000 travel stipend',
    },
    iconLabel: 'HL',
  },
]

interface GroupedChallenges {
  category: string
  challenges: PartnerChallenge[]
}

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

  return {
    allChallenges: CHALLENGE_DATA,
    mainChallenges,
    sideChallenges,
    groupedMainChallenges,
    groupedSideChallenges,
    categoryAnchors,
  }
}
