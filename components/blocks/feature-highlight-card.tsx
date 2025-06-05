import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import Image from "next/image"

interface FeatureHighlightCardProps {
  title: string
  description: string
  className?: string
}

export function FeatureHighlightCard({ title, description, className }: FeatureHighlightCardProps) {
  return (
    <div className={cn("relative rounded-xl border border-[#00CE93]/20 p-2", className)}>
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      <div className="relative flex flex-col gap-4 rounded-lg border border-[#00CE93]/10 bg-black p-8">
        <h3 className="text-2xl font-semibold font-mono">{title}</h3>
        <div className="h-px w-full bg-[#00CE93]/50 my-2"></div>
        <div className="flex items-start gap-8 pt-4">
          <div className="flex-shrink-0">
            <Image
              src="/images/feature-cube.png"
              alt="Feature cube"
              width={120}
              height={120}
              className="max-w-[120px]"
            />
          </div>
          <p className="text-muted-foreground font-space-mono text-lg">{description}</p>
        </div>
      </div>
    </div>
  )
}
