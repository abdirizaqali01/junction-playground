import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  Code,
  Plus,
  Github,
  ExternalLink,
  CheckCircle,
  Circle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock team data
const getTeamData = (teamId: string) => {
  return {
    id: teamId,
    name: "CodeCrafters",
    project: {
      title: "EcoTracker AI",
      description:
        "An AI-powered platform that helps users reduce their carbon footprint by analyzing their daily habits and suggesting sustainable alternatives.",
      repoUrl: "https://github.com/codecrafters/ecotracker",
      demoUrl: "https://ecotracker-demo.vercel.app",
      progress: 65,
    },
    members: [
      {
        id: "user1",
        name: "You",
        role: "Frontend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        isLeader: true,
        status: "online",
      },
      {
        id: "user2",
        name: "Alex Chen",
        role: "Backend Developer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        status: "online",
      },
      {
        id: "user3",
        name: "Sarah Kim",
        role: "UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        status: "away",
      },
    ],
    tasks: [
      { id: "1", title: "Set up project repository", assignee: "Alex Chen", status: "completed", priority: "high" },
      { id: "2", title: "Design user interface mockups", assignee: "Sarah Kim", status: "completed", priority: "high" },
      { id: "3", title: "Implement AI model integration", assignee: "You", status: "in-progress", priority: "high" },
      { id: "4", title: "Create landing page", assignee: "Sarah Kim", status: "in-progress", priority: "medium" },
      { id: "5", title: "Set up database schema", assignee: "Alex Chen", status: "todo", priority: "medium" },
      { id: "6", title: "Write API documentation", assignee: "Alex Chen", status: "todo", priority: "low" },
      { id: "7", title: "Implement user authentication", assignee: "You", status: "todo", priority: "high" },
    ],
    resources: [
      { id: "1", title: "Project Requirements", type: "document", url: "#", addedBy: "You" },
      { id: "2", title: "Design System", type: "figma", url: "#", addedBy: "Sarah Kim" },
      { id: "3", title: "API Documentation", type: "document", url: "#", addedBy: "Alex Chen" },
      { id: "4", title: "AI Model Training Data", type: "dataset", url: "#", addedBy: "You" },
    ],
  }
}

export default function TeamSpacePage({ params }: { params: { id: string; teamId: string } }) {
  const team = getTeamData(params.teamId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-400"
      case "away":
        return "bg-yellow-400"
      default:
        return "bg-gray-400"
    }
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "in-progress":
        return "text-blue-400"
      case "todo":
        return "text-white/60"
      default:
        return "text-white/60"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const completedTasks = team.tasks.filter((task) => task.status === "completed").length
  const totalTasks = team.tasks.length
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href={`/event/${params.id}`}
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to event</span>
            </Link>
          </div>

          {/* Team header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{team.name}</h1>
              <p className="text-white/70 font-space-mono">{team.project.title}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <MinimalButton asChild>
                <a href={team.project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Repository
                </a>
              </MinimalButton>
              <MinimalButton variant="outline" asChild>
                <a href="#" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Team Chat
                </a>
              </MinimalButton>
            </div>
          </div>

          {/* Progress overview */}
          <MinimalCard className="mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Project Progress</h2>
                <span className="text-sm text-white/70">
                  {completedTasks}/{totalTasks} tasks completed
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{team.project.description}</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-[#00CE93] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </MinimalCard>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Main content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="tasks" className="w-full">
                <TabsList className="w-full mb-6 bg-white/5">
                  <TabsTrigger value="tasks" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger value="project" className="flex-1">
                    <Code className="h-4 w-4 mr-2" />
                    Project
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Resources
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tasks">
                  <MinimalCard>
                    <div className="flex items-center justify-between mb-6 p-6 pb-0">
                      <h2 className="text-xl font-medium">Team Tasks</h2>
                      <MinimalButton size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Task
                      </MinimalButton>
                    </div>

                    <div className="p-6 pt-0 space-y-3">
                      {team.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <button className="flex-shrink-0">
                            {task.status === "completed" ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : (
                              <Circle className="h-5 w-5 text-white/40" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-medium ${task.status === "completed" ? "line-through text-white/60" : ""}`}
                            >
                              {task.title}
                            </h3>
                            <p className="text-sm text-white/70">Assigned to {task.assignee}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <div className={`flex items-center gap-1 ${getTaskStatusColor(task.status)}`}>
                              {task.status === "in-progress" && <Clock className="h-3 w-3" />}
                              <span className="text-xs capitalize">{task.status.replace("-", " ")}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </MinimalCard>
                </TabsContent>

                <TabsContent value="project">
                  <MinimalCard>
                    <div className="p-6">
                      <h2 className="text-xl font-medium mb-4">{team.project.title}</h2>
                      <p className="text-white/80 mb-6 font-space-mono">{team.project.description}</p>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <MinimalButton variant="outline" asChild>
                          <a
                            href={team.project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" />
                            Repository
                          </a>
                        </MinimalButton>
                        <MinimalButton variant="outline" asChild>
                          <a
                            href={team.project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        </MinimalButton>
                        <MinimalButton asChild>
                          <Link href={`/event/${params.id}/submit`} className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Submit Project
                          </Link>
                        </MinimalButton>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="font-medium mb-3">Development Status</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Overall Progress</span>
                            <span>{progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-[#00CE93] h-2 rounded-full"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-white/60">Completed</span>
                              <p className="font-medium">{completedTasks} tasks</p>
                            </div>
                            <div>
                              <span className="text-white/60">In Progress</span>
                              <p className="font-medium">
                                {team.tasks.filter((t) => t.status === "in-progress").length} tasks
                              </p>
                            </div>
                            <div>
                              <span className="text-white/60">Remaining</span>
                              <p className="font-medium">
                                {team.tasks.filter((t) => t.status === "todo").length} tasks
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MinimalCard>
                </TabsContent>

                <TabsContent value="resources">
                  <MinimalCard>
                    <div className="flex items-center justify-between mb-6 p-6 pb-0">
                      <h2 className="text-xl font-medium">Team Resources</h2>
                      <MinimalButton size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Resource
                      </MinimalButton>
                    </div>

                    <div className="p-6 pt-0 space-y-3">
                      {team.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-white/70" />
                            <div>
                              <h3 className="font-medium">{resource.title}</h3>
                              <p className="text-sm text-white/60">Added by {resource.addedBy}</p>
                            </div>
                          </div>
                          <MinimalButton size="sm" variant="outline" asChild>
                            <a href={resource.url} target="_blank" rel="noreferrer">
                              Open
                            </a>
                          </MinimalButton>
                        </div>
                      ))}
                    </div>
                  </MinimalCard>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right column - Team info */}
            <div className="space-y-6">
              {/* Team members */}
              <MinimalCard>
                <div className="p-6">
                  <h3 className="font-medium mb-4">Team Members</h3>
                  <div className="space-y-4">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                              member.status,
                            )} rounded-full border-2 border-black`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{member.name}</h4>
                            {member.isLeader && (
                              <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded">Leader</span>
                            )}
                          </div>
                          <p className="text-sm text-white/70">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </MinimalCard>

              {/* Quick actions */}
              <MinimalCard>
                <div className="p-6">
                  <h3 className="font-medium mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <MinimalButton variant="outline" className="w-full justify-start" asChild>
                      <Link href={`/event/${params.id}`}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Event
                      </Link>
                    </MinimalButton>
                    <MinimalButton variant="outline" className="w-full justify-start" asChild>
                      <a href="#">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Team Chat
                      </a>
                    </MinimalButton>
                    <MinimalButton className="w-full justify-start" asChild>
                      <Link href={`/event/${params.id}/submit`}>
                        <FileText className="h-4 w-4 mr-2" />
                        Submit Project
                      </Link>
                    </MinimalButton>
                  </div>
                </div>
              </MinimalCard>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
