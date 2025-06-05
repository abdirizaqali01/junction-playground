"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Clock, Trophy, Users, Code } from "lucide-react"

interface Activity {
  id: string
  type: "hackathon" | "achievement" | "team" | "project"
  title: string
  description: string
  timestamp: string
  icon?: React.ReactNode
}

interface ActivityFeedProps {
  activities: Activity[]
  className?: string
}

const activityIcons = {
  hackathon: <Code className="h-4 w-4" />,
  achievement: <Trophy className="h-4 w-4" />,
  team: <Users className="h-4 w-4" />,
  project: <Code className="h-4 w-4" />,
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("relative rounded-xl border border-[#00CE93]/20 p-2", className)}>
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      <div className="relative rounded-lg border border-[#00CE93]/10 bg-black p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/10">
              <div className="text-[#00CE93] mt-1">{activity.icon || activityIcons[activity.type]}</div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
