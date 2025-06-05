"use client"

import { useState } from "react"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus, Search, Filter, MessageSquare, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data
const myTeam = {
  id: "team1",
  name: "CodeCrafters",
  members: [
    {
      id: "user1",
      name: "You",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      isLeader: true,
    },
    {
      id: "user2",
      name: "Alex Chen",
      role: "Backend Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "user3",
      name: "Sarah Kim",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
  ],
  lookingFor: ["Data Scientist", "ML Engineer"],
  projectIdea:
    "An AI-powered platform that helps users reduce their carbon footprint by analyzing their daily habits and suggesting sustainable alternatives.",
}

const availableTeams = [
  {
    id: "team2",
    name: "DataMinds",
    members: 3,
    lookingFor: ["Frontend Developer", "UI/UX Designer"],
    description: "Building a data visualization tool for climate change insights",
  },
  {
    id: "team3",
    name: "AIVenture",
    members: 2,
    lookingFor: ["Backend Developer", "Mobile Developer"],
    description: "Creating an AI assistant for adventure planning and outdoor activities",
  },
  {
    id: "team4",
    name: "HealthTech Heroes",
    members: 3,
    lookingFor: ["ML Engineer", "Data Scientist"],
    description: "Developing a health monitoring system using machine learning",
  },
]

const availableParticipants = [
  {
    id: "user4",
    name: "Michael Johnson",
    role: "Data Scientist",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "user5",
    name: "Emily Chen",
    role: "ML Engineer",
    skills: ["TensorFlow", "PyTorch", "Computer Vision"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "user6",
    name: "David Park",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB"],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  },
]

interface EventTeamSectionProps {
  eventId: string
}

export function EventTeamSection({ eventId }: EventTeamSectionProps) {
  const [teamTab, setTeamTab] = useState("my-team")
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTeams = availableTeams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.lookingFor.some((role) => role.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredParticipants = availableParticipants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <>
      <div className="space-y-6">
        {myTeam ? (
          <>
            <Tabs value={teamTab} onValueChange={setTeamTab} className="w-full">
              <TabsList className="w-full mb-6 bg-white/5">
                <TabsTrigger value="my-team" className="flex-1">
                  My Team
                </TabsTrigger>
                <TabsTrigger value="find-team" className="flex-1">
                  Find a Team
                </TabsTrigger>
                <TabsTrigger value="find-members" className="flex-1">
                  Find Members
                </TabsTrigger>
              </TabsList>

              <TabsContent value="my-team">
                <MinimalCard>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-medium mb-1">{myTeam.name}</h2>
                      <p className="text-sm text-white/70">{myTeam.members.length} team members</p>
                    </div>
                    <div className="flex gap-3">
                      <MinimalButton variant="outline" onClick={() => setShowInviteModal(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite Members
                      </MinimalButton>
                      <MinimalButton asChild>
                        <Link href={`/event/${eventId}/team/${myTeam.id}`}>Team Space</Link>
                      </MinimalButton>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Team Members</h3>
                      <div className="space-y-3">
                        {myTeam.members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-3 rounded bg-white/5">
                            <div className="flex items-center gap-3">
                              <Image
                                src={member.avatar || "/placeholder.svg"}
                                alt={member.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{member.name}</h4>
                                  {member.isLeader && (
                                    <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded">Team Leader</span>
                                  )}
                                </div>
                                <p className="text-sm text-white/70">{member.role}</p>
                              </div>
                            </div>
                            <MinimalButton variant="outline" size="sm" className="h-8">
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              Message
                            </MinimalButton>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Looking For</h3>
                      <div className="flex flex-wrap gap-2">
                        {myTeam.lookingFor.map((role) => (
                          <span key={role} className="bg-white/5 px-3 py-1 rounded text-sm">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Project Idea</h3>
                      <p className="text-sm text-white/70 font-space-mono">{myTeam.projectIdea}</p>
                    </div>
                  </div>
                </MinimalCard>
              </TabsContent>

              <TabsContent value="find-team">
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search teams by name, skills, or project idea..."
                        className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <MinimalButton variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filters</span>
                    </MinimalButton>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTeams.map((team) => (
                    <MinimalCard key={team.id} hover>
                      <h3 className="font-medium mb-2">{team.name}</h3>
                      <p className="text-sm text-white/70 mb-3">{team.description}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-white/5 px-2 py-0.5 rounded text-xs">
                          <span>{team.members} members</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-xs font-medium mb-2">Looking for:</h4>
                        <div className="flex flex-wrap gap-2">
                          {team.lookingFor.map((role) => (
                            <span key={role} className="bg-white/5 px-2 py-0.5 rounded text-xs">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                      <MinimalButton size="sm" className="w-full">
                        Request to Join
                      </MinimalButton>
                    </MinimalCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="find-members">
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search participants by name, role, or skills..."
                        className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <MinimalButton variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filters</span>
                    </MinimalButton>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredParticipants.map((participant) => (
                    <MinimalCard key={participant.id} hover>
                      <div className="flex items-center gap-3 mb-3">
                        <Image
                          src={participant.avatar || "/placeholder.svg"}
                          alt={participant.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-medium">{participant.name}</h3>
                          <p className="text-sm text-white/70">{participant.role}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-xs font-medium mb-2">Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {participant.skills.map((skill) => (
                            <span key={skill} className="bg-white/5 px-2 py-0.5 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <MinimalButton size="sm" variant="outline" className="flex-1">
                          View Profile
                        </MinimalButton>
                        <MinimalButton size="sm" className="flex-1">
                          Invite to Team
                        </MinimalButton>
                      </div>
                    </MinimalCard>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <MinimalCard className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-white/70" />
            </div>
            <h2 className="text-xl font-medium mb-2">You're not in a team yet</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Join an existing team or create your own to collaborate with other participants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MinimalButton onClick={() => setTeamTab("find-team")}>Find a Team</MinimalButton>
              <MinimalButton variant="outline" onClick={() => setShowTeamModal(true)}>
                Create a Team
              </MinimalButton>
            </div>
          </MinimalCard>
        )}
      </div>

      {/* Invite Members Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-white/10 rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Invite Team Members</h2>
              <button onClick={() => setShowInviteModal(false)} className="text-white/70 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search participants..."
                  className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                />
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={participant.avatar || "/placeholder.svg"}
                        alt={participant.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="text-sm font-medium">{participant.name}</h4>
                        <p className="text-xs text-white/70">{participant.role}</p>
                      </div>
                    </div>
                    <MinimalButton size="sm" className="h-8">
                      Invite
                    </MinimalButton>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <MinimalButton variant="outline" onClick={() => setShowInviteModal(false)}>
                Close
              </MinimalButton>
            </div>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-white/10 rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Create a Team</h2>
              <button onClick={() => setShowTeamModal(false)} className="text-white/70 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <label htmlFor="team-name" className="block text-sm font-medium">
                  Team Name
                </label>
                <input
                  type="text"
                  id="team-name"
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/20"
                  placeholder="Enter a team name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="project-idea" className="block text-sm font-medium">
                  Project Idea
                </label>
                <textarea
                  id="project-idea"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/20"
                  placeholder="Describe your project idea"
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Looking for</label>
                <div className="flex flex-wrap gap-2">
                  {["Frontend Developer", "Backend Developer", "UI/UX Designer", "Data Scientist", "ML Engineer"].map(
                    (role) => (
                      <div key={role} className="bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-sm cursor-pointer">
                        {role}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <MinimalButton variant="outline" onClick={() => setShowTeamModal(false)}>
                Cancel
              </MinimalButton>
              <MinimalButton>Create Team</MinimalButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
