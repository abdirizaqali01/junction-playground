import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { Leaderboard } from "@/components/dashboard/leaderboard"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import { NoiseTexture } from "@/components/ui/noise-texture"
import { Trophy, Code, Users, Calendar, Plus, Search, BookOpen, Zap } from "lucide-react"
import { CurrentEvents } from "@/components/dashboard/current-events"

const participantStats = [
  {
    title: "Hackathons Joined",
    value: 12,
    change: { value: 20, type: "increase" as const },
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Projects Built",
    value: 8,
    change: { value: 15, type: "increase" as const },
    icon: <Code className="h-4 w-4" />,
  },
  {
    title: "Team Collaborations",
    value: 24,
    change: { value: 8, type: "increase" as const },
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Achievements Earned",
    value: 15,
    change: { value: 25, type: "increase" as const },
    icon: <Trophy className="h-4 w-4" />,
  },
]

const recentActivities = [
  {
    id: "1",
    type: "hackathon" as const,
    title: "Joined AI Innovation Challenge",
    description: "Started working on a machine learning project",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "achievement" as const,
    title: "Earned 'Team Player' Badge",
    description: "Successfully collaborated with 5+ team members",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    type: "project" as const,
    title: "Submitted 'EcoTracker' Project",
    description: "Environmental monitoring app for Sustainability Hack",
    timestamp: "3 days ago",
  },
  {
    id: "4",
    type: "team" as const,
    title: "Joined Team 'CodeCrafters'",
    description: "New team for the upcoming Web3 hackathon",
    timestamp: "1 week ago",
  },
]

const leaderboardData = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    score: 2450,
    rank: 1,
    badge: "AI Specialist",
  },
  {
    id: "2",
    name: "Sarah Kim",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    score: 2380,
    rank: 2,
    badge: "Full-Stack Pro",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    score: 2290,
    rank: 3,
    badge: "Design Guru",
  },
  {
    id: "4",
    name: "You",
    score: 1850,
    rank: 7,
    badge: "Rising Star",
  },
]

const quickActions = [
  {
    id: "1",
    title: "Join Active Event",
    description: "AI Innovation Challenge is live!",
    icon: <Plus className="h-4 w-4" />,
    href: "/event/ai-innovation",
  },
  {
    id: "2",
    title: "Find Team",
    description: "Connect with other builders",
    icon: <Search className="h-4 w-4" />,
    href: "/teams",
  },
  {
    id: "3",
    title: "Learn Skills",
    description: "Access tutorials and resources",
    icon: <BookOpen className="h-4 w-4" />,
    href: "/learn",
  },
  {
    id: "4",
    title: "AI Tools",
    description: "Explore cutting-edge tools",
    icon: <Zap className="h-4 w-4" />,
    href: "/tools",
  },
]

const skillsProgress = [
  { label: "JavaScript", value: 85, color: "#00CE93" },
  { label: "React", value: 78, color: "#00CE93" },
  { label: "Python", value: 72, color: "#00CE93" },
  { label: "Machine Learning", value: 45, color: "#00CE93" },
  { label: "UI/UX Design", value: 60, color: "#00CE93" },
]

export default function ParticipantDashboard() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16 relative">
        <NoiseTexture className="opacity-30" />
        <div className="container px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Builder! 👋</h1>
            <p className="text-muted-foreground font-space-mono">
              Track your progress, join hackathons, and build amazing projects.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {participantStats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Current Events Section */}
          <div className="mb-8">
            <CurrentEvents />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <ActivityFeed activities={recentActivities} />
              <ProgressChart title="Skill Development" data={skillsProgress} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <QuickActions actions={quickActions} />
              <Leaderboard entries={leaderboardData} title="Global Leaderboard" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
