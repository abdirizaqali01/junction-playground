import { MinimalCard } from "@/components/ui/minimal-card"
import { Clock, Users, FileText, MessageSquare, UserPlus } from "lucide-react"
import Image from "next/image"

// Mock activity data
const activities = [
  {
    id: "1",
    type: "submission",
    title: "New project submitted",
    description: "Team 'CodeCrafters' submitted 'EcoTracker AI'",
    timestamp: "2 minutes ago",
    user: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "2",
    type: "team_formed",
    title: "New team formed",
    description: "Team 'DataMinds' was created with 3 members",
    timestamp: "5 minutes ago",
    user: {
      name: "Sarah Kim",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "3",
    type: "registration",
    title: "New participant registered",
    description: "Michael Johnson joined the hackathon",
    timestamp: "8 minutes ago",
    user: {
      name: "Michael Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    icon: <UserPlus className="h-4 w-4" />,
  },
  {
    id: "4",
    type: "submission",
    title: "Project updated",
    description: "Team 'AIVenture' updated their submission",
    timestamp: "12 minutes ago",
    user: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "5",
    type: "message",
    title: "Announcement posted",
    description: "Reminder about mid-event check-in",
    timestamp: "15 minutes ago",
    user: {
      name: "Junction Platform",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    icon: <MessageSquare className="h-4 w-4" />,
  },
]

interface OrganizerEventActivityProps {
  eventId: string
}

export function OrganizerEventActivity({ eventId }: OrganizerEventActivityProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Activity feed */}
      <div className="lg:col-span-2">
        <MinimalCard>
          <h2 className="text-xl font-medium mb-6">Live Activity Feed</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded bg-white/5">
                <div className="bg-white/10 rounded-full p-2 mt-1">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Image
                      src={activity.user.avatar || "/placeholder.svg"}
                      alt={activity.user.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <h3 className="font-medium text-sm">{activity.title}</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-2">{activity.description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <Clock className="h-3 w-3" />
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MinimalCard>
      </div>

      {/* Quick stats */}
      <div className="space-y-6">
        <MinimalCard>
          <h3 className="font-medium mb-4">Activity Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Submissions today</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">New registrations</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Teams formed</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Messages sent</span>
              <span className="font-medium">156</span>
            </div>
          </div>
        </MinimalCard>

        <MinimalCard>
          <h3 className="font-medium mb-4">Peak Activity Hours</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">10:00 AM - 12:00 PM</span>
              <div className="w-16 bg-white/10 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-3/4" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">2:00 PM - 4:00 PM</span>
              <div className="w-16 bg-white/10 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">6:00 PM - 8:00 PM</span>
              <div className="w-16 bg-white/10 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-1/2" />
              </div>
            </div>
          </div>
        </MinimalCard>
      </div>
    </div>
  )
}
