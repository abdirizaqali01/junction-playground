"use client"

import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface ProgressChartProps {
  title: string
  data: Array<{
    label: string
    value: number
    color?: string
  }>
  className?: string
}

export function ProgressChart({ title, data, className }: ProgressChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className={cn("relative rounded-xl border border-[#00CE93]/20 p-2", className)}>
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      <div className="relative rounded-lg border border-[#00CE93]/10 bg-black p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color || "#00CE93",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
