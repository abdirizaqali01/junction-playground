import { FeatureSection, HighlightCard } from "./feature-section"
import { GlowButton } from "@/components/ui/glow-button"
import Link from "next/link"

export function TalentSection() {
  return (
    <FeatureSection
      title="Meet the Next Generation of Talent"
      description="Partner with Junction to access highly engaged hackers, test ideas, and discover your next hire or co-founder."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        <HighlightCard
          title="Talent scouting"
          description="Find exceptional talent through our hackathons and community events."
        />
        <HighlightCard
          title="Product beta testing"
          description="Get real-time feedback on your products from skilled developers and users."
        />
        <HighlightCard
          title="Global tech visibility"
          description="Showcase your brand across international tech hubs and communities."
        />
      </div>
      <div className="flex justify-center">
        <GlowButton size="lg" asChild>
          <Link href="/partner">Partner With Us</Link>
        </GlowButton>
      </div>
    </FeatureSection>
  )
}
