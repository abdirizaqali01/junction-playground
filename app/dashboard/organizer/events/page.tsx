import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { ArrowLeft, Plus, Calendar, Users, FileText, Settings, Eye, BarChart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for organizer's events
const events = [
  {
    id: "ai-innovation",
    title: "AI Innovation Challenge",
    status: "active",
    startDate: "June 15, 2025",
    endDate: "June 17, 2025",
    participants: 247,
    submissions: 28,
    image: "/placeholder.svg?height=200&width=300",
    timeRemaining: "1 day, 5 hours",
  },
  {
    id: "web3-summit",
    title: "Web3 Builders Summit",
    status: "upcoming",
    startDate: "July 8, 2025",
    endDate: "July 10, 2025",
    participants: 156,
    submissions: 0,
    image: "/placeholder.svg?height=200&width=300",
    timeRemaining: "3 weeks",
  },
  {
    id: "sustainability-hack",
    title: "Sustainability Hack",
    status: "draft",
    startDate: "August 5, 2025",
    endDate: "August 7, 2025",
    participants: 0,
    submissions: 0,
    image: "/placeholder.svg?height=200&width=300",
    timeRemaining: "Draft",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500 text-black"
    case "upcoming":
      return "bg-blue-500 text-white"
    case "draft":
      return "bg-gray-500 text-white"
    case "completed":
      return "bg-purple-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export default function OrganizerEventsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/dashboard/organizer"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to dashboard</span>
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Events</h1>
              <p className="text-white/70 font-space-mono">Manage your hackathons and track their performance.</p>
            </div>
            <MinimalButton asChild>
              <Link href="/dashboard/organizer/create-hackathon" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Hackathon
              </Link>
            </MinimalButton>
          </div>

          {/* Events grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <MinimalCard key={event.id} hover>
                <div className="relative h-48 w-full mb-4 rounded overflow-hidden">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <div
                    className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}
                  >
                    {event.status.toUpperCase()}
                  </div>
                  {event.status === "active" && (
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs">
                      {event.timeRemaining} left
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-medium mb-2">{event.title}</h3>

                <div className="space-y-2 mb-4 text-sm text-white/70">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {event.startDate} - {event.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{event.participants} participants</span>
                  </div>
                  {event.status === "active" && (
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>{event.submissions} submissions</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {event.status === "active" && (
                    <MinimalButton size="sm" className="flex-1" asChild>
                      <Link href={`/dashboard/organizer/events/${event.id}`} className="flex items-center gap-1.5">
                        <BarChart className="h-3.5 w-3.5" />
                        Dashboard
                      </Link>
                    </MinimalButton>
                  )}
                  {event.status === "draft" && (
                    <MinimalButton size="sm" className="flex-1" asChild>
                      <Link href={`/dashboard/organizer/events/${event.id}/edit`} className="flex items-center gap-1.5">
                        <Settings className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </MinimalButton>
                  )}
                  {event.status === "upcoming" && (
                    <MinimalButton size="sm" variant="outline" className="flex-1" asChild>
                      <Link
                        href={`/dashboard/organizer/events/${event.id}/settings`}
                        className="flex items-center gap-1.5"
                      >
                        <Settings className="h-3.5 w-3.5" />
                        Settings
                      </Link>
                    </MinimalButton>
                  )}
                  <MinimalButton size="sm" variant="outline" asChild>
                    <Link href={`/hackathons/${event.id}`} className="flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Link>
                  </MinimalButton>
                </div>
              </MinimalCard>
            ))}
          </div>

          {/* Empty state */}
          {events.length === 0 && (
            <MinimalCard className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-white/50" />
              <h3 className="text-lg font-medium mb-2">No Events Yet</h3>
              <p className="text-white/70 mb-6">Create your first hackathon to start building your community.</p>
              <MinimalButton asChild>
                <Link href="/dashboard/organizer/create-hackathon">Create Your First Hackathon</Link>
              </MinimalButton>
            </MinimalCard>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
