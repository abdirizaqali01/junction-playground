import { FeatureSection, FeatureCard } from "./feature-section"
import { GlowButton } from "@/components/ui/glow-button"
import Link from "next/link"

export function BuildFasterSection() {
  return (
    <FeatureSection title="Build Faster, Smarter, Together">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
        <FeatureCard
          title="Team up with global builders"
          description="Connect with talented developers, designers, and innovators from around the world."
        />
        <FeatureCard
          title="Access to exclusive AI & dev tools"
          description="Get special access to cutting-edge tools and platforms to accelerate your development."
        />
        <FeatureCard
          title="Showcase your portfolio"
          description="Build a compelling profile that highlights your projects and achievements."
        />
        <FeatureCard
          title="Get discovered by top startups"
          description="Put your skills in front of innovative companies looking for talent like you."
        />
      </div>
      <div className="flex justify-center">
        <GlowButton size="lg" asChild>
          <Link href="/start-building">Start Building</Link>
        </GlowButton>
      </div>
    </FeatureSection>
  )
}
