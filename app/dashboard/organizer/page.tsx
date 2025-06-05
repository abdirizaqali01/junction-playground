import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { Leaderboard } from "@/components/dashboard/leaderboard"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import { NoiseTexture } from "@/components/ui/noise-texture"
import { Calendar, Users, Trophy, TrendingUp, Plus, BarChart, Settings, MessageSquare } from "lucide-react"
import { GlowButton } from "@/components/ui/glow-button"
import Link from "next/link"

const organizerStats = [
  {
    title: "Active Hackathons",
    value: 3,
    change: { value: 50, type: "increase" as const },
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Total Participants",
    value: 1247,
    change: { value: 32, type: "increase" as const },
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Projects Submitted",
    value: 89,
    change: { value: 18, type: "increase" as const },
    icon: <Trophy className="h-4 w-4" />,
  },
  {
    title: "Engagement Rate",
    value: "94%",
    change: { value: 12, type: "increase" as const },
    icon: <TrendingUp className="h-4 w-4" />,
  },
]

const organizerActivities = [
  {
    id: "1",
    type: "hackathon" as const,
    title: "AI Innovation Challenge Started",
    description: "127 participants registered in the first 24 hours",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "achievement" as const,
    title: "Sustainability Hack Completed",
    description: "45 projects submitted, 89% completion rate",
    timestamp: "2 days ago",
  },
  {
    id: "3",
    type: "team" as const,
    title: "New Sponsor Partnership",
    description: "TechCorp joined as platinum sponsor",
    timestamp: "1 week ago",
  },
  {
    id: "4",
    type: "project" as const,
    title: "Web3 Hackathon Launched",
    description: "Registration opened for next month's event",
    timestamp: "2 weeks ago",
  },
]

const topParticipants = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    score: 2450,
    rank: 1,
    badge: "3 Wins",
  },
  {
    id: "2",
    name: "Sarah Kim",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    score: 2380,
    rank: 2,
    badge: "2 Wins",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    score: 2290,
    rank: 3,
    badge: "1 Win",
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    score: 2150,
    rank: 4,
    badge: "Rising Star",
  },
]

const organizerActions = [
  {
    id: "1",
    title: "Create Hackathon",
    description: "Launch a new event",
    icon: <Plus className="h-4 w-4" />,
    href: "/dashboard/organizer/create-hackathon",
  },
  {
    id: "2",
    title: "View Analytics",
    description: "Detailed event insights",
    icon: <BarChart className="h-4 w-4" />,
    href: "/dashboard/organizer/analytics",
  },
  {
    id: "3",
    title: "Manage Events",
    description: "Edit existing hackathons",
    icon: <Settings className="h-4 w-4" />,
    href: "/dashboard/organizer/events",
  },
  {
    id: "4",
    title: "Message Participants",
    description: "Send updates and announcements",
    icon: <MessageSquare className="h-4 w-4" />,
    href: "/dashboard/organizer/messages",
  },
]

const eventMetrics = [
  { label: "AI Innovation Challenge", value: 127, color: "#00CE93" },
  { label: "Web3 Builders Summit", value: 89, color: "#00CE93" },
  { label: "Sustainability Hack", value: 156, color: "#00CE93" },
  { label: "Mobile App Challenge", value: 203, color: "#00CE93" },
]

export default function OrganizerDashboard() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16 relative">
        <NoiseTexture className="opacity-30" />
        <div className="container px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Organizer Dashboard 🚀</h1>
            <p className="text-muted-foreground font-space-mono">
              Manage your hackathons, track engagement, and grow your community.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {organizerStats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Add this after the stats grid and before the main content grid */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-[#00CE93]/10 to-[#00CE93]/5 border border-[#00CE93]/20 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-medium mb-2">Ready to create your next hackathon?</h2>
                  <p className="text-white/70 font-space-mono">
                    Set up a new event and start building your community of innovators.
                  </p>
                </div>
                <GlowButton asChild>
                  <Link href="/dashboard/organizer/create-hackathon" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Hackathon
                  </Link>
                </GlowButton>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <ActivityFeed activities={organizerActivities} />
              <ProgressChart title="Event Participation" data={eventMetrics} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <QuickActions actions={organizerActions} />
              <Leaderboard entries={topParticipants} title="Top Participants" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
