import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, FileText, Clock, Activity, Settings, Download, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"
import { OrganizerEventStats } from "@/components/organizer/event-stats"
import { OrganizerEventActivity } from "@/components/organizer/event-activity"
import { OrganizerEventSubmissions } from "@/components/organizer/event-submissions"
import { OrganizerEventParticipants } from "@/components/organizer/event-participants"

// Mock data for the event
const getEventData = (id: string) => {
  return {
    id,
    title: "AI Innovation Challenge",
    status: "active",
    startDate: "June 15, 2025",
    endDate: "June 17, 2025",
    timeRemaining: "1 day, 5 hours",
    participants: 247,
    teams: 62,
    submissions: 28,
    activeNow: 156,
    registrations: 247,
    maxParticipants: 300,
  }
}

export default function OrganizerEventDashboardPage({ params }: { params: { id: string } }) {
  const event = getEventData(params.id)

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

          {/* Event header */}
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Live Event</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{event.timeRemaining} remaining</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="h-4 w-4" />
                  <span>{event.activeNow} active now</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <MinimalButton variant="outline" asChild>
                <Link href={`/event/${event.id}`} className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>View Event</span>
                </Link>
              </MinimalButton>
              <MinimalButton variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </MinimalButton>
              <MinimalButton asChild>
                <Link href={`/dashboard/organizer/events/${event.id}/settings`} className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </MinimalButton>
            </div>
          </div>

          {/* Stats overview */}
          <OrganizerEventStats event={event} />

          {/* Main content */}
          <div className="mt-8">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="w-full mb-6 bg-white/5">
                <TabsTrigger value="activity" className="flex-1">
                  <Activity className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="submissions" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Submissions
                </TabsTrigger>
                <TabsTrigger value="participants" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Participants
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <OrganizerEventActivity eventId={event.id} />
              </TabsContent>

              <TabsContent value="submissions">
                <OrganizerEventSubmissions eventId={event.id} />
              </TabsContent>

              <TabsContent value="participants">
                <OrganizerEventParticipants eventId={event.id} />
              </TabsContent>

              <TabsContent value="analytics">
                <MinimalCard>
                  <h2 className="text-xl font-medium mb-6">Event Analytics</h2>
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-white/50" />
                    <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                    <p className="text-white/70 mb-6">Detailed analytics and insights about your event performance.</p>
                    <MinimalButton>Coming Soon</MinimalButton>
                  </div>
                </MinimalCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
