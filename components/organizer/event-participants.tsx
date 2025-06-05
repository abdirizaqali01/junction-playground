import { MinimalCard } from "@/components/ui/minimal-card"
import { MinimalButton } from "@/components/ui/minimal-button"
import { Users, Search, Filter, MessageSquare, UserCheck, Clock } from "lucide-react"
import Image from "next/image"

// Mock participants data
const participants = [
  {
    id: "user1",
    name: "Alex Chen",
    email: "alex@example.com",
    role: "Frontend Developer",
    team: "CodeCrafters",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    registeredAt: "2 days ago",
    lastActive: "5 minutes ago",
    status: "active",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "user2",
    name: "Sarah Kim",
    email: "sarah@example.com",
    role: "UI/UX Designer",
    team: "CodeCrafters",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    registeredAt: "2 days ago",
    lastActive: "2 minutes ago",
    status: "active",
    skills: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    id: "user3",
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "Data Scientist",
    team: "AIVenture",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    registeredAt: "1 day ago",
    lastActive: "1 hour ago",
    status: "away",
    skills: ["Python", "Machine Learning", "TensorFlow"],
  },
  {
    id: "user4",
    name: "Emily Chen",
    email: "emily@example.com",
    role: "ML Engineer",
    team: "AIVenture",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    registeredAt: "1 day ago",
    lastActive: "30 minutes ago",
    status: "active",
    skills: ["PyTorch", "Computer Vision", "NLP"],
  },
  {
    id: "user5",
    name: "David Park",
    email: "david@example.com",
    role: "Full Stack Developer",
    team: "DataMinds",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    registeredAt: "3 hours ago",
    lastActive: "10 minutes ago",
    status: "active",
    skills: ["React", "Node.js", "MongoDB"],
  },
]

interface OrganizerEventParticipantsProps {
  eventId: string
}

export function OrganizerEventParticipants({ eventId }: OrganizerEventParticipantsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-400"
      case "away":
        return "bg-yellow-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-xl font-medium">Participants</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              placeholder="Search participants..."
              className="bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
            />
          </div>
          <MinimalButton variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </MinimalButton>
        </div>
      </div>

      {/* Participants list */}
      <MinimalCard>
        <div className="space-y-4">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center justify-between p-3 rounded bg-white/5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={participant.avatar || "/placeholder.svg"}
                    alt={participant.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                      participant.status,
                    )} rounded-full border-2 border-black`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{participant.name}</h3>
                    {participant.team && (
                      <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded">{participant.team}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/70">{participant.role}</p>
                  <div className="flex items-center gap-1.5 text-xs text-white/50 mt-1">
                    <Clock className="h-3 w-3" />
                    <span>Last active {participant.lastActive}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MinimalButton size="sm" variant="outline" className="flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Message
                </MinimalButton>
                <MinimalButton size="sm" variant="outline">
                  View Profile
                </MinimalButton>
              </div>
            </div>
          ))}
        </div>
      </MinimalCard>

      {/* Participant stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MinimalCard>
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-blue-400" />
            <h3 className="font-medium">Total</h3>
          </div>
          <div className="text-2xl font-bold">247</div>
          <div className="text-sm text-white/70">Registered</div>
        </MinimalCard>

        <MinimalCard>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-5 bg-green-400 rounded-full" />
            <h3 className="font-medium">Active</h3>
          </div>
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm text-white/70">Online now</div>
        </MinimalCard>

        <MinimalCard>
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="h-5 w-5 text-purple-400" />
            <h3 className="font-medium">In Teams</h3>
          </div>
          <div className="text-2xl font-bold">198</div>
          <div className="text-sm text-white/70">80% of participants</div>
        </MinimalCard>

        <MinimalCard>
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-orange-400" />
            <h3 className="font-medium">Avg. Session</h3>
          </div>
          <div className="text-2xl font-bold">2.4h</div>
          <div className="text-sm text-white/70">Time spent</div>
        </MinimalCard>
      </div>
    </div>
  )
}
