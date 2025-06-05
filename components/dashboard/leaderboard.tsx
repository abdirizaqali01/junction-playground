"use client"

import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Trophy, Medal, Award } from "lucide-react"
import Image from "next/image"

interface LeaderboardEntry {
  id: string
  name: string
  avatar?: string
  score: number
  rank: number
  badge?: string
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  title: string
  className?: string
}

export function Leaderboard({ entries, title, className }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-400" />
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />
      case 3:
        return <Award className="h-4 w-4 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <div className={cn("relative rounded-xl border border-[#00CE93]/20 p-2", className)}>
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      <div className="relative rounded-lg border border-[#00CE93]/10 bg-black p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10">
              <div className="flex items-center justify-center w-8">{getRankIcon(entry.rank)}</div>
              <div className="flex items-center gap-3 flex-1">
                {entry.avatar && (
                  <Image
                    src={entry.avatar || "/placeholder.svg"}
                    alt={entry.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{entry.name}</h4>
                  {entry.badge && <span className="text-xs text-[#00CE93]">{entry.badge}</span>}
                </div>
                <div className="text-sm font-bold">{entry.score}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
