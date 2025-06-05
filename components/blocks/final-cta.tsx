import { GlowButton } from "@/components/ui/glow-button"
import Link from "next/link"
import { NoiseTexture } from "@/components/ui/noise-texture"
import { cn } from "@/lib/utils"

export function FinalCTA({ className }: { className?: string }) {
  return (
    <section className={cn("py-20 sm:py-28 relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-black z-0"></div>
      <div className="absolute inset-0 bg-[#00CE93]/5 z-0"></div>
      <NoiseTexture className="opacity-30" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Build the Future?</h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <GlowButton size="lg" asChild>
              <Link href="/join">Join Junction Now</Link>
            </GlowButton>
            <GlowButton size="lg" variant="outline" asChild>
              <Link href="/partner">Become a Partner</Link>
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
