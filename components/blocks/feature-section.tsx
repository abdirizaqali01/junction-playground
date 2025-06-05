"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import Image from "next/image"
import { NoiseTexture } from "@/components/ui/noise-texture"

interface FeatureSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function FeatureSection({ title, description, children, className }: FeatureSectionProps) {
  return (
    <section className={cn("py-20 sm:py-28 relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-black z-0"></div>
      <NoiseTexture className="opacity-30" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 relative">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
          {description && (
            <p className="mt-6 max-w-[800px] text-muted-foreground font-space-mono text-lg">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}

export function FeatureCard({
  title,
  description,
  className,
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={cn("relative rounded-xl border border-[#00CE93]/20 p-2", className)}>
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      <div className="relative flex flex-col gap-4 rounded-lg border border-[#00CE93]/10 bg-black p-6 h-full">
        <div className="mb-4">
          <Image src="/images/feature-cube.png" alt="Feature cube" width={120} height={120} className="max-w-[120px]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-muted-foreground font-space-mono">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function HighlightCard({
  title,
  description,
  className,
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={cn("relative rounded-xl border border-[#00CE93]/20 p-2", className)}>
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      <div className="relative flex flex-col gap-4 rounded-lg border border-[#00CE93]/10 bg-black p-6 h-full">
        <div className="mb-4">
          <Image src="/images/feature-cube.png" alt="Feature cube" width={120} height={120} className="max-w-[120px]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-muted-foreground font-space-mono">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function HighlightItem({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-base font-space-mono">{text}</span>
    </div>
  )
}
