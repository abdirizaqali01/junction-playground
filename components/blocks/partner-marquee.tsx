import { cn } from "@/lib/utils"
import Image from "next/image"
import { NoiseTexture } from "@/components/ui/noise-texture"

interface PartnerMarqueeProps {
  title: string
  partners: Array<{
    name: string
    logo: string
  }>
  className?: string
}

export function PartnerMarquee({ title, partners, className }: PartnerMarqueeProps) {
  return (
    <section className={cn("py-20 sm:py-28 relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-black z-0"></div>
      <NoiseTexture className="opacity-30" />
      <div className="container px-4 md:px-6 relative z-10">
        <h2 className="text-2xl font-semibold text-center mb-16">{title}</h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee space-x-16">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex space-x-16 items-center">
                {partners.map((partner, i) => (
                  <div key={`${setIndex}-${i}`} className="flex-shrink-0 h-12 w-32 relative">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="object-contain brightness-200 contrast-200"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
