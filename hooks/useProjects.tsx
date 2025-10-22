'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

export const REVIEW_CRITERIA = [
  {
    id: "innovation",
    label: "Innovation",
    description: "Originality of the idea and how boldly it pushes the challenge forward.",
  },
  {
    id: "impact",
    label: "Impact",
    description: "Real-world value created for partners, users, or the ecosystem.",
  },
  {
    id: "execution",
    label: "Execution",
    description: "Craft, technical quality, and presentation polish of the solution.",
  },
] as const

export type ReviewCriterion = (typeof REVIEW_CRITERIA)[number]
export type ReviewCriterionId = ReviewCriterion["id"]

export type ReviewScores = Record<ReviewCriterionId, number>

export type Review = {
  reviewerId: string
  reviewerName?: string
  scores: ReviewScores
  averageScore: number
  feedback: string
  reviewedAt: string
}

export type ReviewInput = {
  reviewerName?: string
  scores: ReviewScores
  feedback: string
}

export type TeamMember = {
  name: string
  email: string
  showProfile: boolean
  role?: string
  linkedin?: string
}

export type FileItem = {
  name: string
  url: string
}

export type Project = {
  id: string
  title: string
  team: string
  description: string
  imageUrl: string
  rating?: number
  time: string
  comments: number
  reviewed: boolean
  bookmarked: boolean
  status: string
  timer: string
  videoUrl?: string
  demoUrl?: string
  sourceCodeUrl?: string
  images: string[]
  files: FileItem[]
  teamMembers: TeamMember[]
  fullDescription: string
  problemStatement: string
  solutionApproach: string
  technicalDetails?: string
  reviews: Review[]
}

export const DEFAULT_REVIEWER = {
  id: "partner-1",
  name: "Partner Judge 1",
}

export const STORAGE_KEY = "junction-projects-state-v2"

export const createDefaultReviewScores = (fillValue = 0): ReviewScores => {
  return REVIEW_CRITERIA.reduce((acc, criterion) => {
    acc[criterion.id] = fillValue
    return acc
  }, {} as ReviewScores)
}

export const clampScore = (value: number): number => {
  if (typeof value !== "number" || Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 10) return 10
  return parseFloat(value.toFixed(1))
}

export const calculateAverageScore = (scores: ReviewScores): number => {
  const total = REVIEW_CRITERIA.reduce(
    (acc, criterion) => acc + (scores[criterion.id] ?? 0),
    0
  )
  return parseFloat((total / REVIEW_CRITERIA.length).toFixed(1))
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Project Title 1",
    team: "Team Name 1",
    description:
      "This paragraph is actually a description of the solution that the team has developed for this challenge. It's meant to be a short text that really gives a good insight into the exact problem it's tackling, what its features are, and how it solves the problem.",
    imageUrl: "/mock-thumb-1.png",
    rating: undefined,
    time: "Today at 10:57",
    comments: 4,
    reviewed: false,
    bookmarked: false,
    status: "Open",
    timer: "T -01:25:12",
    videoUrl: "https://demo.com/xtmeLUg8vZeQ",
    demoUrl: "https://demo.com/xtmeLUg8vZeQ",
    sourceCodeUrl: "https://github.com/teamname1/project1",
    images: [
      "/mock-img-1.png",
      "/mock-img-2.png",
      "/mock-img-3.png",
      "/mock-img-4.png",
    ],
    files: [
      { name: "file.pdf", url: "project1-file.pdf" },
      { name: "presentation.ppt", url: "project1-presentation.ppt" },
    ],
    teamMembers: [
      {
        name: "Jason Hu",
        email: "jason@team1.com",
        showProfile: true,
        role: "Designer",
        linkedin: "https://linkedin.com/in/jason-hu",
      },
      {
        name: "Sarah Chen",
        email: "sarah@team1.com",
        showProfile: false,
        role: "Developer",
        linkedin: "https://linkedin.com/in/sarah-chen",
      },
      {
        name: "Mike Johnson",
        email: "mike@team1.com",
        showProfile: false,
        role: "Product Manager",
      },
    ],
    fullDescription:
      "This is the full detailed description of the project including all technical aspects, implementation details, and future roadmap.",
    problemStatement:
      "The problem we are addressing is the lack of efficient tools for managing hackathon submissions and reviews.",
    solutionApproach:
      "We built a comprehensive platform that streamlines the submission process and provides partners with intuitive review tools.",
    technicalDetails:
      "Built with Next.js, TypeScript, and Tailwind CSS. Uses a component-based architecture for maximum reusability.",
    reviews: [],
  },
  {
    id: "2",
    title: "Project Title 2",
    team: "Team Name 2",
    description:
      "This paragraph is actually a description of the solution that the team has developed for this challenge. It's meant to be a short text that really gives a good insight into the exact problem it's tackling, what its features are, and how it solves the problem.",
    imageUrl: "/mock-thumb-2.png",
    rating: undefined,
    time: "Today at 11:05",
    comments: 3,
    reviewed: false,
    bookmarked: false,
    status: "Open",
    timer: "T -02:15:30",
    demoUrl: "https://demo.com/project2",
    sourceCodeUrl: "https://github.com/teamname2/project2",
    images: ["/mock-img-1.png", "/mock-img-2.png"],
    files: [{ name: "documentation.pdf", url: "project2-docs.pdf" }],
    teamMembers: [
      {
        name: "Alex Rivera",
        email: "alex@team2.com",
        showProfile: true,
        role: "Engineer",
        linkedin: "https://linkedin.com/in/alex-rivera",
      },
      {
        name: "Emma Wilson",
        email: "emma@team2.com",
        showProfile: false,
        role: "Designer",
      },
    ],
    fullDescription: "Complete project description with implementation details.",
    problemStatement:
      "Addressing the challenge of real-time collaboration in remote teams.",
    solutionApproach:
      "Created a real-time collaborative workspace with integrated video and chat.",
    reviews: [],
  },
  {
    id: "3",
    title: "Project Title 3",
    team: "Team Name 3",
    description:
      "This paragraph is actually a description of the solution that the team has developed for this challenge. It's meant to be a short text that really gives a good insight into the exact problem it's tackling, what its features are, and how it solves the problem.",
    imageUrl: "/mock-thumb-3.png",
    rating: undefined,
    time: "Today at 11:45",
    comments: 2,
    reviewed: false,
    bookmarked: false,
    status: "Open",
    timer: "T -03:45:00",
    demoUrl: "https://demo.com/project3",
    sourceCodeUrl: "https://github.com/teamname3/project3",
    images: ["/mock-img-1.png"],
    files: [],
    teamMembers: [
      {
        name: "Chris Park",
        email: "chris@team3.com",
        showProfile: true,
        role: "Developer",
        linkedin: "https://linkedin.com/in/chris-park",
      },
    ],
    fullDescription:
      "Detailed overview of the project architecture and features.",
    problemStatement: "Solving inefficiencies in project management workflows.",
    solutionApproach:
      "Developed an AI-powered project management assistant.",
    reviews: [],
  },
  {
    id: "4",
    title: "Project Title 4",
    team: "Team Name 4",
    description:
      "This paragraph is actually a description of the solution that the team has developed for this challenge. It's meant to be a short text that really gives a good insight into the exact problem it's tackling, what its features are, and how it solves the problem.",
    imageUrl: "/mock-thumb-1.png",
    rating: 8.7,
    time: "Today at 11:05",
    comments: 3,
    reviewed: true,
    bookmarked: false,
    status: "Closed",
    timer: "T +00:00:00",
    videoUrl: "https://demo.com/project4-video",
    demoUrl: "https://demo.com/project4",
    sourceCodeUrl: "https://github.com/teamname4/project4",
    images: ["/mock-img-1.png", "/mock-img-2.png", "/mock-img-3.png"],
    files: [
      { name: "final-report.pdf", url: "project4-report.pdf" },
      { name: "pitch-deck.ppt", url: "project4-pitch.ppt" },
    ],
    teamMembers: [
      { name: "David Lee", email: "david@team4.com", showProfile: true },
      { name: "Lisa Wang", email: "lisa@team4.com", showProfile: false },
      { name: "Tom Harris", email: "tom@team4.com", showProfile: false },
    ],
    fullDescription:
      "Comprehensive description of this award-winning project.",
    problemStatement:
      "The challenge of sustainable energy distribution in urban areas.",
    solutionApproach:
      "IoT-based smart grid system with predictive analytics.",
    technicalDetails:
      "React, Node.js, MongoDB, AWS IoT Core, TensorFlow for ML models.",
    reviews: [
      {
        scores: {
          innovation: 9,
          impact: 9,
          execution: 8,
        },
        averageScore: 8.7,
        feedback:
          "Excellent implementation with great attention to detail. The solution is innovative and well-executed.",
        reviewerId: "partner-3",
        reviewerName: "Partner Judge 3",
        reviewedAt: "Today at 14:30",
      },
    ],
  },
]

type ProjectsContextValue = {
  projects: Project[]
  lastViewedProjectId: string | null
  recentReviews: Array<Review & { projectId: string; projectTitle: string }>
  addOrUpdateReview: (
    projectId: string,
    reviewerId: string,
    reviewData: ReviewInput
  ) => void
  getReviewForUser: (projectId: string, reviewerId: string) => Review | undefined
  deleteReview: (projectId: string, reviewerId: string) => void
  toggleBookmark: (projectId: string) => void
  persistProjects: () => void
  markProjectViewed: (projectId: string) => void
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null)

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [lastViewedProjectId, setLastViewedProjectId] = useState<string | null>(
    null
  )
  const isHydrated = useRef(false)

  const saveState = useCallback(
    (nextProjects = projects, nextLastViewed = lastViewedProjectId) => {
      if (typeof window === "undefined") return
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            projects: nextProjects,
            lastViewedProjectId: nextLastViewed,
          })
        )
      } catch (error) {
        console.warn("[useProjects] Failed to persist projects state", error)
      }
    },
    [projects, lastViewedProjectId]
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!isHydrated.current) {
      try {
        const storedState = window.localStorage.getItem(STORAGE_KEY)
        if (storedState) {
          const parsed = JSON.parse(storedState)
          if (Array.isArray(parsed)) {
            if (parsed.length) {
              setProjects(parsed)
            }
          } else if (parsed && typeof parsed === "object") {
            if (Array.isArray(parsed.projects)) {
              setProjects(parsed.projects)
            }
            if (typeof parsed.lastViewedProjectId === "string") {
              setLastViewedProjectId(parsed.lastViewedProjectId)
            } else if (parsed.lastViewedProjectId === null) {
              setLastViewedProjectId(null)
            }
          }
        }
      } catch (error) {
        console.warn("[useProjects] Failed to hydrate projects state", error)
      } finally {
        isHydrated.current = true
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!isHydrated.current) return

    saveState()
  }, [projects, lastViewedProjectId, saveState])

  const formatReviewTimestamp = useCallback(() => {
    return new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }, [])

  const addOrUpdateReview = useCallback<
    ProjectsContextValue["addOrUpdateReview"]
  >((projectId, reviewerId, reviewData) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id !== projectId) return project

        const existingIndex = project.reviews.findIndex(
          (r) => r.reviewerId === reviewerId
        )

        const reviewerName =
          reviewData.reviewerName ??
          (reviewerId === DEFAULT_REVIEWER.id ? DEFAULT_REVIEWER.name : undefined)
        const reviewedAt = formatReviewTimestamp()

        const normalizedScores = createDefaultReviewScores()
        REVIEW_CRITERIA.forEach((criterion) => {
          normalizedScores[criterion.id] = clampScore(
            reviewData.scores?.[criterion.id] ?? 0
          )
        })

        const averageScore = calculateAverageScore(normalizedScores)

        const updatedReview: Review = {
          reviewerId,
          reviewerName,
          scores: normalizedScores,
          averageScore,
          feedback: reviewData.feedback,
          reviewedAt,
        }

        const updatedReviews =
          existingIndex !== -1
            ? project.reviews.map((review, index) =>
                index === existingIndex
                  ? { ...updatedReview }
                  : review
              )
            : [...project.reviews, updatedReview]

        const projectAverageScore =
          updatedReviews.length > 0
            ? parseFloat(
                (
                  updatedReviews.reduce(
                    (acc, curr) => acc + curr.averageScore,
                    0
                  ) /
                  updatedReviews.length
                ).toFixed(1)
              )
            : project.rating

        return {
          ...project,
          reviews: updatedReviews,
          reviewed: updatedReviews.length > 0,
          rating: projectAverageScore,
        }
      })
    )
  }, [formatReviewTimestamp])

  const getReviewForUser = useCallback<
    ProjectsContextValue["getReviewForUser"]
  >(
    (projectId, reviewerId) => {
      const project = projects.find((p) => p.id === projectId)
      return project?.reviews.find((r) => r.reviewerId === reviewerId)
    },
    [projects]
  )

  const toggleBookmark = useCallback<
    ProjectsContextValue["toggleBookmark"]
  >((projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, bookmarked: !project.bookmarked }
          : project
      )
    )
  }, [])

  const deleteReview = useCallback<
    ProjectsContextValue["deleteReview"]
  >((projectId, reviewerId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id !== projectId) return project

        const filteredReviews = project.reviews.filter(
          (review) => review.reviewerId !== reviewerId
        )

        const averageScore =
          filteredReviews.length > 0
            ? parseFloat(
                (
                  filteredReviews.reduce(
                    (acc, curr) => acc + curr.averageScore,
                    0
                  ) /
                  filteredReviews.length
                ).toFixed(1)
              )
            : undefined

        return {
          ...project,
          reviews: filteredReviews,
          reviewed: filteredReviews.length > 0,
          rating: averageScore,
        }
      })
    )
  }, [])

  const persistProjects = useCallback(() => {
    if (typeof window === "undefined") return
    saveState()
  }, [saveState])

  const markProjectViewed = useCallback<
    ProjectsContextValue["markProjectViewed"]
  >(
    (projectId) => {
      setLastViewedProjectId((prev) => (prev === projectId ? prev : projectId))
      if (isHydrated.current) {
        saveState(projects, projectId)
      }
    },
    [projects, saveState]
  )

  const recentReviews = useMemo<
    ProjectsContextValue["recentReviews"]
  >(() => {
    return projects
      .flatMap((project) =>
        project.reviews.map((review) => ({
          ...review,
          projectId: project.id,
          projectTitle: project.title,
        }))
      )
      .sort((a, b) => {
        const timeA = Date.parse(a.reviewedAt)
        const timeB = Date.parse(b.reviewedAt)
        return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA)
      })
  }, [projects])

  const value = useMemo<ProjectsContextValue>(
    () => ({
      projects,
      lastViewedProjectId,
      recentReviews,
      addOrUpdateReview,
      getReviewForUser,
      deleteReview,
      toggleBookmark,
      persistProjects,
      markProjectViewed,
    }),
    [
      projects,
      lastViewedProjectId,
      recentReviews,
      addOrUpdateReview,
      getReviewForUser,
      deleteReview,
      toggleBookmark,
      persistProjects,
      markProjectViewed,
    ]
  )

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}
