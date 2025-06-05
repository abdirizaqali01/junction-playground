import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalCard } from "@/components/ui/minimal-card"
import { ArrowLeft, Trophy, DollarSign } from "lucide-react"
import Link from "next/link"

const challenges = [
  {
    id: "1",
    title: "Best Use of AI",
    description: "Create an innovative solution that leverages artificial intelligence to solve a real-world problem.",
    prize: "$5,000",
    sponsor: "OpenAI",
  },
  {
    id: "2",
    title: "Sustainability Challenge",
    description: "Build a solution that addresses environmental challenges and promotes sustainability.",
    prize: "$3,000",
    sponsor: "Green Tech Corp",
  },
  {
    id: "3",
    title: "Best Mobile App",
    description: "Develop a mobile application with exceptional user experience and functionality.",
    prize: "$2,000",
    sponsor: "Mobile Solutions Inc",
  },
]

export default function ChallengesPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="mb-6">
            <Link
              href={`/event/${params.id}`}
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to event</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-8">Challenges</h1>

          <div className="space-y-6">
            {challenges.map((challenge) => (
              <MinimalCard key={challenge.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <h2 className="text-lg font-medium">{challenge.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    <DollarSign className="h-3 w-3" />
                    {challenge.prize}
                  </div>
                </div>
                <p className="text-white/80 mb-4">{challenge.description}</p>
                <p className="text-sm text-white/60">Sponsored by {challenge.sponsor}</p>
              </MinimalCard>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
