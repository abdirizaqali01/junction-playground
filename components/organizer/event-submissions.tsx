import { MinimalCard } from "@/components/ui/minimal-card"
import { MinimalButton } from "@/components/ui/minimal-button"
import { FileText, ExternalLink, Github, Eye, Award, Clock } from "lucide-react"
import Image from "next/image"

// Mock submissions data
const submissions = [
  {
    id: "sub1",
    title: "EcoTracker AI",
    team: "CodeCrafters",
    members: [
      {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Sarah Kim",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      },
    ],
    description: "An AI-powered platform that helps users reduce their carbon footprint by analyzing daily habits.",
    challenges: ["Main Challenge: AI Innovation", "Sustainability Impact"],
    submittedAt: "2 hours ago",
    repoUrl: "https://github.com/codecrafters/ecotracker",
    demoUrl: "https://ecotracker-demo.vercel.app",
    status: "submitted",
  },
  {
    id: "sub2",
    title: "HealthMind Assistant",
    team: "AIVenture",
    members: [
      {
        name: "Michael Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Emily Chen",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      },
    ],
    description: "AI-powered mental health assistant that provides personalized support and resources.",
    challenges: ["Main Challenge: AI Innovation"],
    submittedAt: "4 hours ago",
    repoUrl: "https://github.com/aiventure/healthmind",
    demoUrl: "https://healthmind-demo.vercel.app",
    status: "submitted",
  },
  {
    id: "sub3",
    title: "VisionAid",
    team: "DataMinds",
    members: [
      {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      },
    ],
    description: "Computer vision app that helps visually impaired users navigate their environment.",
    challenges: ["Best Use of Computer Vision"],
    submittedAt: "6 hours ago",
    repoUrl: "https://github.com/dataminds/visionaid",
    demoUrl: "",
    status: "submitted",
  },
]

interface OrganizerEventSubmissionsProps {
  eventId: string
}

export function OrganizerEventSubmissions({ eventId }: OrganizerEventSubmissionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Project Submissions</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/70">{submissions.length} submissions</span>
          <MinimalButton variant="outline" size="sm">
            Export All
          </MinimalButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {submissions.map((submission) => (
          <MinimalCard key={submission.id} hover>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium mb-1">{submission.title}</h3>
                  <p className="text-sm text-white/70">by {submission.team}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <Clock className="h-3 w-3" />
                  <span>{submission.submittedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {submission.members.map((member, i) => (
                  <Image
                    key={i}
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ))}
                <span className="text-xs text-white/70 ml-1">
                  {submission.members.length} member{submission.members.length > 1 ? "s" : ""}
                </span>
              </div>

              <p className="text-sm text-white/70">{submission.description}</p>

              <div className="flex flex-wrap gap-2">
                {submission.challenges.map((challenge) => (
                  <span key={challenge} className="bg-white/5 px-2 py-0.5 rounded text-xs">
                    {challenge}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <MinimalButton size="sm" variant="outline" asChild>
                  <a href={submission.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </a>
                </MinimalButton>
                {submission.demoUrl && (
                  <MinimalButton size="sm" variant="outline" asChild>
                    <a href={submission.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Demo
                    </a>
                  </MinimalButton>
                )}
                <MinimalButton size="sm" className="flex items-center gap-1.5 ml-auto">
                  <Eye className="h-3.5 w-3.5" />
                  Review
                </MinimalButton>
              </div>
            </div>
          </MinimalCard>
        ))}
      </div>

      {/* Submission stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MinimalCard>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-5 w-5 text-blue-400" />
            <h3 className="font-medium">Total Submissions</h3>
          </div>
          <div className="text-2xl font-bold">{submissions.length}</div>
          <div className="text-sm text-white/70">+8 today</div>
        </MinimalCard>

        <MinimalCard>
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-5 w-5 text-purple-400" />
            <h3 className="font-medium">Challenges Addressed</h3>
          </div>
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm text-white/70">All challenges covered</div>
        </MinimalCard>

        <MinimalCard>
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-orange-400" />
            <h3 className="font-medium">Avg. Submission Time</h3>
          </div>
          <div className="text-2xl font-bold">4.2h</div>
          <div className="text-sm text-white/70">Before deadline</div>
        </MinimalCard>
      </div>
    </div>
  )
}
