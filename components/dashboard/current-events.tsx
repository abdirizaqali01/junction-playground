import { MinimalCard } from "@/components/ui/minimal-card"
import { MinimalButton } from "@/components/ui/minimal-button"
import { Calendar, Clock, Users, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for current events
const currentEvents = [
  {
    id: "ai-innovation",
    title: "AI Innovation Challenge",
    status: "active",
    timeRemaining: "1 day, 5 hours",
    participants: 247,
    team: "CodeCrafters",
    role: "Team Member",
    image: "/placeholder.svg?height=200&width=300",
    nextMilestone: "Project submission deadline",
    milestoneTime: "Tomorrow at 3:00 PM",
  },
]

const upcomingEvents = [
  {
    id: "web3-summit",
    title: "Web3 Builders Summit",
    status: "upcoming",
    startDate: "July 8, 2025",
    participants: 156,
    registered: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "sustainability-hack",
    title: "Sustainability Hack",
    status: "upcoming",
    startDate: "August 5, 2025",
    participants: 89,
    registered: false,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function CurrentEvents() {
  return (
    <div className="space-y-6">
      {/* Active Events */}
      {currentEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-medium mb-4">Active Events</h2>
          <div className="space-y-4">
            {currentEvents.map((event) => (
              <MinimalCard
                key={event.id}
                className="bg-gradient-to-r from-[#00CE93]/10 to-[#00CE93]/5 border-[#00CE93]/20"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-48 h-32 relative rounded overflow-hidden flex-shrink-0">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <div className="absolute top-2 left-2 bg-green-500 text-black px-2 py-0.5 rounded text-xs font-medium">
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-medium mb-1">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/70">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{event.timeRemaining} remaining</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <MinimalButton size="sm" variant="outline" asChild>
                          <Link href={`/event/${event.id}/team`}>Team Space</Link>
                        </MinimalButton>
                        <MinimalButton size="sm" asChild>
                          <Link href={`/event/${event.id}`} className="flex items-center gap-1.5">
                            Enter Event
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </MinimalButton>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Team: {event.team}</p>
                          <p className="text-xs text-white/70">{event.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{event.nextMilestone}</p>
                          <p className="text-xs text-white/70">{event.milestoneTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MinimalCard>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div>
        <h2 className="text-xl font-medium mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingEvents.map((event) => (
            <MinimalCard key={event.id} hover>
              <div className="relative h-32 w-full mb-4 rounded overflow-hidden">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-xs">
                  {event.registered ? "Registered" : "Open"}
                </div>
              </div>
              <h3 className="font-medium mb-2">{event.title}</h3>
              <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{event.startDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{event.participants} registered</span>
                </div>
              </div>
              <MinimalButton size="sm" className="w-full" asChild>
                <Link href={`/hackathons/${event.id}`}>{event.registered ? "View Details" : "Register Now"}</Link>
              </MinimalButton>
            </MinimalCard>
          ))}
        </div>
      </div>

      {/* No events state */}
      {currentEvents.length === 0 && upcomingEvents.length === 0 && (
        <MinimalCard className="text-center py-12">
          <Activity className="h-12 w-12 mx-auto mb-4 text-white/50" />
          <h3 className="text-lg font-medium mb-2">No Active Events</h3>
          <p className="text-white/70 mb-6">
            You're not currently participating in any hackathons. Explore upcoming events to get started!
          </p>
          <MinimalButton asChild>
            <Link href="/hackathons">Browse Hackathons</Link>
          </MinimalButton>
        </MinimalCard>
      )}
    </div>
  )
}
