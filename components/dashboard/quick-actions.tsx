"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { GlowButton } from "@/components/ui/glow-button"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

interface QuickActionsProps {
  actions: QuickAction[]
  className?: string
}

export function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <div className={cn("relative rounded-xl border border-[#00CE93]/20 p-2", className)}>
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      <div className="relative rounded-lg border border-[#00CE93]/10 bg-black p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action) => (
            <GlowButton
              key={action.id}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
              asChild
            >
              <a href={action.href}>
                <div className="text-[#00CE93]">{action.icon}</div>
                <div className="text-left">
                  <h4 className="text-sm font-medium">{action.title}</h4>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </a>
            </GlowButton>
          ))}
        </div>
      </div>
    </div>
  )
}
