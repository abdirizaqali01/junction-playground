import { FeatureSection, HighlightCard } from "./feature-section"

export function GlobalHomeSection() {
  return (
    <FeatureSection
      title="The Global Home for Builders"
      description="Junction connects hackers, founders, and innovators across continents. Whether you're starting out or scaling your next venture, this is where you meet your crew, find your tools, and build what matters."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <HighlightCard
          title="100+ hackathons globally"
          description="Events organized across continents, bringing together diverse talent and ideas."
        />
        <HighlightCard
          title="15,000+ active builders"
          description="A thriving community of developers, designers, and innovators ready to collaborate."
        />
        <HighlightCard
          title="Top startup & accelerator partners"
          description="Connect with leading organizations that can help take your projects to the next level."
        />
        <HighlightCard
          title="Cutting-edge AI tool integrations"
          description="Access the latest technologies to accelerate your development process."
        />
      </div>
    </FeatureSection>
  )
}
