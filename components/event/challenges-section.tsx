import { MinimalCard } from "@/components/ui/minimal-card"
import { MinimalButton } from "@/components/ui/minimal-button"
import { Award, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data
const challenges = [
  {
    id: "ch1",
    title: "Main Challenge: AI Innovation",
    description:
      "Develop an AI solution that addresses a real-world problem in one of the following areas: healthcare, sustainability, education, or accessibility.",
    prizes: ["$10,000", "Mentorship Opportunity", "Cloud Credits"],
    isMain: true,
  },
  {
    id: "ch2",
    title: "Best Use of Computer Vision",
    description: "Create a solution that leverages computer vision technology in an innovative way.",
    prizes: ["$2,500", "Hardware Kit"],
    sponsor: "TechCorp",
  },
  {
    id: "ch3",
    title: "Sustainability Impact",
    description: "Build a solution that helps combat climate change or promotes sustainable practices.",
    prizes: ["$3,000", "Accelerator Interview"],
    sponsor: "GreenFuture",
  },
]

interface EventChallengesSectionProps {
  eventId: string
}

export function EventChallengesSection({ eventId }: EventChallengesSectionProps) {
  return (
    <div className="space-y-6">
      {challenges.map((challenge) => (
        <MinimalCard key={challenge.id}>
          <div className="flex items-start gap-4">
            <div className="bg-white/10 rounded-full p-2 mt-1">
              <Award className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h2 className="text-xl font-medium">{challenge.title}</h2>
                {challenge.sponsor && (
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">Sponsored by {challenge.sponsor}</span>
                )}
              </div>
              <p className="text-white/70 mb-4 font-space-mono">{challenge.description}</p>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Prizes:</h3>
                <div className="flex flex-wrap gap-2">
                  {challenge.prizes.map((prize, i) => (
                    <span key={i} className="bg-white/5 px-3 py-1 rounded text-sm">
                      {prize}
                    </span>
                  ))}
                </div>
              </div>

              <MinimalButton variant="outline" asChild>
                <Link
                  href={`/event/${eventId}/challenges/${challenge.id}`}
                  className="inline-flex items-center gap-1.5"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MinimalButton>
            </div>
          </div>
        </MinimalCard>
      ))}
    </div>
  )
}
