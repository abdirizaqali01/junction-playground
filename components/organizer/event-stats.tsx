import { MinimalCard } from "@/components/ui/minimal-card"
import { Users, FileText, Activity, UserCheck } from "lucide-react"

interface EventData {
  participants: number
  teams: number
  submissions: number
  activeNow: number
  registrations: number
  maxParticipants: number
  timeRemaining: string
}

interface OrganizerEventStatsProps {
  event: EventData
}

export function OrganizerEventStats({ event }: OrganizerEventStatsProps) {
  const registrationRate = Math.round((event.registrations / event.maxParticipants) * 100)
  const submissionRate = Math.round((event.submissions / event.teams) * 100)

  const stats = [
    {
      title: "Total Participants",
      value: event.participants,
      change: "+12 today",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-400",
    },
    {
      title: "Active Teams",
      value: event.teams,
      change: "+3 today",
      icon: <UserCheck className="h-5 w-5" />,
      color: "text-green-400",
    },
    {
      title: "Submissions",
      value: event.submissions,
      change: "+8 today",
      icon: <FileText className="h-5 w-5" />,
      color: "text-purple-400",
    },
    {
      title: "Active Now",
      value: event.activeNow,
      change: "Live",
      icon: <Activity className="h-5 w-5" />,
      color: "text-orange-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <MinimalCard key={index}>
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color}`}>{stat.icon}</div>
            <span className="text-xs text-white/70">{stat.change}</span>
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm text-white/70">{stat.title}</div>
        </MinimalCard>
      ))}

      {/* Registration progress */}
      <MinimalCard className="md:col-span-2 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Registration Progress</h3>
          <span className="text-sm text-white/70">{registrationRate}% filled</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mb-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${registrationRate}%` }}
          />
        </div>
        <div className="text-sm text-white/70">
          {event.registrations} of {event.maxParticipants} participants registered
        </div>
      </MinimalCard>

      {/* Submission rate */}
      <MinimalCard className="md:col-span-2 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Submission Rate</h3>
          <span className="text-sm text-white/70">{submissionRate}% of teams</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mb-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${submissionRate}%` }}
          />
        </div>
        <div className="text-sm text-white/70">
          {event.submissions} submissions from {event.teams} teams
        </div>
      </MinimalCard>
    </div>
  )
}
