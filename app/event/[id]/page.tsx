import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { Clock, Users, ArrowLeft, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for the event
const getEventData = (id: string) => {
  return {
    id,
    title: "AI Innovation Challenge",
    organizer: "Junction Platform",
    timeRemaining: "2 days, 8 hours",
    participants: 250,
    teams: 62,
    submissions: 28,
    logo: "/placeholder.svg?height=60&width=60",
    userTeam: {
      id: "team-123",
      name: "CodeCrafters",
      members: 3,
    },
    nextDeadline: "Project submission due in 8 hours",
    discordUrl: "https://discord.gg/junction",
  }
}

export default function EventDashboardPage({ params }: { params: { id: string } }) {
  const event = getEventData(params.id)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-3xl">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/dashboard/participant"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to dashboard</span>
            </Link>
          </div>

          {/* Event header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Image
                src={event.logo || "/placeholder.svg"}
                alt={event.title}
                width={40}
                height={40}
                className="rounded"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{event.title}</h1>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{event.timeRemaining} left</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{event.participants} participants</span>
                </div>
              </div>
            </div>
          </div>

          {/* Urgent notification */}
          <MinimalCard className="mb-8 bg-orange-500/10 border-orange-500/30">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500/20 rounded-full p-2">
                <Clock className="h-4 w-4 text-orange-400" />
              </div>
              <div>
                <h3 className="font-medium text-orange-400">Deadline Alert</h3>
                <p className="text-white/90 text-sm">{event.nextDeadline}</p>
              </div>
            </div>
          </MinimalCard>

          {/* Linear flow - Your Team */}
          <div className="space-y-6">
            <MinimalCard className="hover-lift accent-glow">
              <div className="flex items-center justify-between p-6">
                <div className="flex-1">
                  <h2 className="text-xl font-medium mb-2">Your Team</h2>
                  <h3 className="font-bold text-2xl mb-2">{event.userTeam.name}</h3>
                  <p className="text-white/80">{event.userTeam.members} members • Collaborate and build together</p>
                </div>
                <MinimalButton asChild>
                  <Link href={`/event/${event.id}/team/${event.userTeam.id}`}>Open Team Space</Link>
                </MinimalButton>
              </div>
            </MinimalCard>

            {/* Discord */}
            <MinimalCard className="hover-lift">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-[#5865F2]/20 rounded-lg p-3">
                    <MessageSquare className="h-6 w-6 text-[#5865F2]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium mb-1">Event Discord</h2>
                    <p className="text-white/80">Join the community, ask questions, get help</p>
                  </div>
                </div>
                <MinimalButton variant="outline" asChild>
                  <a href={event.discordUrl} target="_blank" rel="noreferrer">
                    Join Discord
                  </a>
                </MinimalButton>
              </div>
            </MinimalCard>

            {/* Resources */}
            <MinimalCard className="hover-lift">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-xl font-medium mb-2">Resources & APIs</h2>
                  <p className="text-white/80">Access tools, APIs, and documentation to build your project</p>
                </div>
                <MinimalButton variant="outline" asChild>
                  <Link href={`/event/${event.id}/resources`}>View Resources</Link>
                </MinimalButton>
              </div>
            </MinimalCard>

            {/* Challenges */}
            <MinimalCard className="hover-lift">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-xl font-medium mb-2">Challenges & Prizes</h2>
                  <p className="text-white/80">Explore challenge tracks and see what you can win</p>
                </div>
                <MinimalButton variant="outline" asChild>
                  <Link href={`/event/${event.id}/challenges`}>View Challenges</Link>
                </MinimalButton>
              </div>
            </MinimalCard>

            {/* Submit */}
            <MinimalCard className="hover-lift accent-glow border-[#00CE93]/30">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-xl font-medium mb-2">Submit Your Project</h2>
                  <p className="text-white/80">Ready to submit? Upload your final project for judging</p>
                </div>
                <MinimalButton asChild>
                  <Link href={`/event/${event.id}/submit`}>Submit Project</Link>
                </MinimalButton>
              </div>
            </MinimalCard>
          </div>

          {/* Help section */}
          <MinimalCard className="mt-8">
            <div className="p-6 text-center">
              <h2 className="text-lg font-medium mb-2">Need Help?</h2>
              <p className="text-white/80 mb-4 text-sm">
                Having issues or questions? Our support team is available 24/7 during the event.
              </p>
              <MinimalButton variant="outline" asChild>
                <a href="mailto:support@junction.com">Contact Support</a>
              </MinimalButton>
            </div>
          </MinimalCard>
        </div>
      </main>

      <Footer />
    </div>
  )
}
