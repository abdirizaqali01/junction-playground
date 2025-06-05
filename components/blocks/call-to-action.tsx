import { GlowButton } from "@/components/ui/glow-button"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="py-16 sm:py-24 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Join the Movement?</h2>
          <p className="max-w-[700px] text-muted-foreground font-space-mono">
            Whether you're looking to host a hackathon or participate in one, Junction Platform has everything you need
            to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <GlowButton size="lg" asChild>
              <Link href="/host">Host a Hackathon</Link>
            </GlowButton>
            <GlowButton size="lg" variant="outline" asChild>
              <Link href="/participate">Participate</Link>
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
