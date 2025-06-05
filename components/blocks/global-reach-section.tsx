import { FeatureSection } from "./feature-section"
import { FeatureHighlightCard } from "./feature-highlight-card"

export function GlobalReachSection() {
  return (
    <FeatureSection
      title="Global Reach, Local Impact"
      description="Junction's platform connects innovators across time zones and borders, creating opportunities for collaboration and growth."
    >
      <div className="max-w-4xl mx-auto">
        <FeatureHighlightCard
          title="Known in every time zone"
          description="With 100+ events organized worldwide, we have built a thriving global community of builders, creators, and innovators."
        />
      </div>
    </FeatureSection>
  )
}
