import { cn } from "@/lib/utils"
import { GlowButton } from "@/components/ui/glow-button"
import { HackathonCard, type HackathonProps } from "./hackathon-card"
import Link from "next/link"

interface HackathonsSectionProps {
  title: string
  description: string
  hackathons: HackathonProps[]
  className?: string
}

export function HackathonsSection({ title, description, hackathons, className }: HackathonsSectionProps) {
  return (
    <section className={cn("py-12 sm:py-24", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground font-space-mono">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <GlowButton size="lg" asChild>
            <Link href="/hackathons">View All Hackathons</Link>
          </GlowButton>
        </div>
      </div>
    </section>
  )
}
