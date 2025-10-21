import { useState } from 'react'

export interface Project {
  id: string
  title: string
  team: string
  description: string
  imageUrl: string
  rating: number | undefined
  time: string
  comments: number
  reviewed: boolean
  bookmarked: boolean
  // Extended fields for full project view
  status: 'Open' | 'Closed' | 'Draft'
  timer: string
  videoUrl?: string
  demoUrl?: string
  sourceCodeUrl?: string
  images: string[]
  files: { name: string; url: string }[]
  teamMembers: { name: string; email?: string; showProfile: boolean }[]
  fullDescription?: string
  problemStatement?: string
  solutionApproach?: string
  technicalDetails?: string
  reviews?: {
    score: number
    feedback: string
    reviewedBy: string
    reviewedAt: string
  }[]
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Project Title 1',
    team: 'Team Name 1',
    description:
      "This paragraph is actually a description of the solution that the team has developed for this challenge. It's meant to be a short text that really gives a good insight into the exact problem it's tackling, what its features are, and how it solves the problem.",
    imageUrl: '/mock-thumb-1.png',
    rating: undefined,
    time: 'Today at 10:57',
    comments: 4,
    reviewed: false,
    bookmarked: false,
    status: 'Open',
    timer: 'T -01:25:12',
    videoUrl: 'https://demo.com/xtmeLUg8vZeQ',
    demoUrl: 'https://demo.com/xtmeLUg8vZeQ',
    sourceCodeUrl: 'https://github.com/teamname1/project1',
    images: ['/mock-img-1.png', '/mock-img-2.png', '/mock-img-3.png', '/mock-img-4.png'],
    files: [
      { name: 'file.pdf', url: '/files/project1-file.pdf' },
      { name: 'presentation.ppt', url: '/files/project1-presentation.ppt' }
    ],
    teamMembers: [
      { name: 'Jason Hu', email: 'jason@team1.com', showProfile: true },
      { name: 'Sarah Chen', email: 'sarah@team1.com', showProfile: false },
      { name: 'Mike Johnson', email: 'mike@team1.com', showProfile: false }
    ],
    fullDescription: 'This is the full detailed description of the project including all technical aspects, implementation details, and future roadmap.',
    problemStatement: 'The problem we are addressing is the lack of efficient tools for managing hackathon submissions and reviews.',
    solutionApproach: 'We built a comprehensive platform that streamlines the submission process and provides partners with intuitive review tools.',
    technicalDetails: 'Built with Next.js, TypeScript, and Tailwind CSS. Uses a component-based architecture for maximum reusability.',
    reviews: []
  },
  {
    id: '2',
    title: 'Project Title 2',
    team: 'Team Name 2',
    description:
      "This paragraph is actually a description of the solution that the team has developed for this challenge. It's meant to be a short text that really gives a good insight into the exact problem it's tackling, what its features are, and how it solves the problem.",
    imageUrl: '/mock-thumb-2.png',
    rating: undefined,
    time: 'Today at 11:05',
    comments: 3,
    reviewed: false,
    bookmarked: false,
    status: 'Open',
    timer: 'T -02:15:30',
    demoUrl: 'https://demo.com/project2',
    sourceCodeUrl: 'https://github.com/teamname2/project2',
    images: ['/mock-img-1.png', '/mock-img-2.png'],
    files: [
      { name: 'documentation.pdf', url: '/files/project2-docs.pdf' }
    ],
    teamMembers: [
      { name: 'Alex Rivera', email: 'alex@team2.com', showProfile: true },
      { name: 'Emma Wilson', email: 'emma@team2.com', showProfile: false }
    ],
    fullDescription: 'Complete project description with implementation details.',
    problemStatement: 'Addressing the challenge of real-time collaboration in remote teams.',
    solutionApproach: 'Created a real-time collaborative workspace with integrated video and chat.',
    reviews: []
  },
  {
    id: '3',
    title: 'Project Title 3',
    team: 'Team Name 3',
    description:
      "This paragraph is actually a description of the solution that the team has developed for this challenge. It's meant to be a short text that really gives a good insight into the exact problem it's tackling, what its features are, and how it solves the problem.",
    imageUrl: '/mock-thumb-3.png',
    rating: undefined,
    time: 'Today at 11:45',
    comments: 2,
    reviewed: false,
    bookmarked: false,
    status: 'Open',
    timer: 'T -03:45:00',
    demoUrl: 'https://demo.com/project3',
    sourceCodeUrl: 'https://github.com/teamname3/project3',
    images: ['/mock-img-1.png'],
    files: [],
    teamMembers: [
      { name: 'Chris Park', email: 'chris@team3.com', showProfile: true }
    ],
    fullDescription: 'Detailed overview of the project architecture and features.',
    problemStatement: 'Solving inefficiencies in project management workflows.',
    solutionApproach: 'Developed an AI-powered project management assistant.',
    reviews: []
  },
  {
    id: '4',
    title: 'Project Title 4',
    team: 'Team Name 4',
    description:
      "This paragraph is actually a description of the solution that the team has developed for this challenge. It's meant to be a short text that really gives a good insight into the exact problem it's tackling, what its features are, and how it solves the problem.",
    imageUrl: '/mock-thumb-1.png',
    rating: 8.9,
    time: 'Today at 11:05',
    comments: 3,
    reviewed: true,
    bookmarked: false,
    status: 'Closed',
    timer: 'T +00:00:00',
    videoUrl: 'https://demo.com/project4-video',
    demoUrl: 'https://demo.com/project4',
    sourceCodeUrl: 'https://github.com/teamname4/project4',
    images: ['/mock-img-1.png', '/mock-img-2.png', '/mock-img-3.png'],
    files: [
      { name: 'final-report.pdf', url: '/files/project4-report.pdf' },
      { name: 'pitch-deck.ppt', url: '/files/project4-pitch.ppt' }
    ],
    teamMembers: [
      { name: 'David Lee', email: 'david@team4.com', showProfile: true },
      { name: 'Lisa Wang', email: 'lisa@team4.com', showProfile: false },
      { name: 'Tom Harris', email: 'tom@team4.com', showProfile: false }
    ],
    fullDescription: 'Comprehensive description of this award-winning project.',
    problemStatement: 'The challenge of sustainable energy distribution in urban areas.',
    solutionApproach: 'IoT-based smart grid system with predictive analytics.',
    technicalDetails: 'React, Node.js, MongoDB, AWS IoT Core, TensorFlow for ML models.',
    reviews: [
      {
        score: 8.9,
        feedback: 'Excellent implementation with great attention to detail. The solution is innovative and well-executed.',
        reviewedBy: 'Partner Judge 1',
        reviewedAt: 'Today at 14:30'
      }
    ]
  },
]

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)

  const toggleBookmark = (index: number) => {
    setProjects(prevProjects =>
      prevProjects.map((project, i) =>
        i === index ? { ...project, bookmarked: !project.bookmarked } : project
      )
    )
  }

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id)
  }

  const updateProjectRating = (id: string, rating: number, feedback: string, reviewedBy: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id
          ? {
              ...project,
              rating,
              reviewed: true,
              reviews: [
                ...(project.reviews || []),
                {
                  score: rating,
                  feedback,
                  reviewedBy,
                  reviewedAt: new Date().toISOString()
                }
              ]
            }
          : project
      )
    )
  }

  return {
    projects,
    toggleBookmark,
    getProjectById,
    updateProjectRating,
  }
}