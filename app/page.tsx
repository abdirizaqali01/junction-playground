'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GlowButton } from "@/components/ui/glow-button"
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee"
import { PartnerMarquee } from "@/components/blocks/partner-marquee"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import AnimatedWordCycle from "@/components/ui/animated-word-cycle"
import { GlobalHomeSection } from "@/components/blocks/global-home-section"
import { BuildFasterSection } from "@/components/blocks/build-faster-section"
import { TalentSection } from "@/components/blocks/talent-section"
import { GlobalReachSection } from "@/components/blocks/global-reach-section"
import { FinalCTA } from "@/components/blocks/final-cta"
import Link from "next/link"

const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmadev",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "Junction Platform has been a game-changer for my career. The connections I've made and skills I've gained are invaluable.",
    href: "https://twitter.com/emmadev",
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "The hackathons are incredibly well-organized. The platform makes collaboration seamless, even in remote settings.",
    href: "https://twitter.com/davidtech",
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiabuilds",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "I've participated in three Junction hackathons and each one has pushed me to grow as a developer and innovator.",
  },
  {
    author: {
      name: "Alex Chen",
      handle: "@alexcodes",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    text: "The quality of projects and talent on Junction Platform is unmatched. It's where serious builders come to create.",
  },
]

const partners = [
  { name: "Uber", logo: "/images/uber-logo.png" },
  { name: "Unity", logo: "/images/unity-logo.png" },
  { name: "Y Combinator", logo: "/images/yc-logo.png" },
  { name: "GPT", logo: "/images/gpt-logo.png" },
  { name: "Shopify", logo: "/images/shopify-logo.png" },
  { name: "NVIDIA", logo: "/images/nvidia-logo.png" },
  { name: "Supercell", logo: "/images/supercell-logo.png" },
]

const hackWords = ["the future", "the world", "the code", "innovation", "solutions", "together", "for change"]

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section with Background Beams - Fully Responsive */}
      <BackgroundBeamsWithCollision
        className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-24 lg:pb-32"
        beamColor="from-[#00CE93] via-[#00CE93]"
      >
        <div className="container px-4 sm:px-6 md:px-8 relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-12">
            <div className="space-y-4 sm:space-y-6 max-w-5xl w-full">
              {/* Responsive Video Logo */}
              <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 relative">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover rounded-lg"
                >
                  <source src="/videos/platform-logo-spinning.mp4" type="video/mp4" />
                </video>
              </div>
              
              {/* Responsive Typography */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-tight">
                Hack{' '}
                <AnimatedWordCycle 
                  words={hackWords} 
                  interval={3000} 
                  className="text-[#00CE93]" 
                />
              </h1>
              
              <p className="mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-space-mono leading-relaxed px-4 sm:px-0">
                Connect, collaborate, and create the future with a global community of innovators and problem-solvers.
              </p>
            </div>
            
            {/* Responsive CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              <GlowButton size="lg" asChild className="w-full sm:w-auto">
                <Link href="/get-started">Get Started</Link>
              </GlowButton>
              <GlowButton size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/explore">Explore Hackathons</Link>
              </GlowButton>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Content Sections with Responsive Spacing */}
      <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
        {/* Global Home Section */}
        <section className="px-4 sm:px-6 md:px-8">
          <GlobalHomeSection />
        </section>

        {/* Global Reach Section */}
        <section className="px-4 sm:px-6 md:px-8">
          <GlobalReachSection />
        </section>

        {/* Build Faster Section */}
        <section className="px-4 sm:px-6 md:px-8">
          <BuildFasterSection />
        </section>

        {/* Talent Section */}
        <section className="px-4 sm:px-6 md:px-8">
          <TalentSection />
        </section>

        {/* Partners Section - Fixed Brand Images */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
          <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Trusted by industry leaders
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Join the platform that powers innovation for the world's leading companies
              </p>
            </div>
            
            {/* Custom Partner Marquee with Fixed Logo Sizing */}
            <div className="relative">
              <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                <div className="flex animate-marquee gap-8 sm:gap-12 md:gap-16 lg:gap-20">
                  {/* First set of logos */}
                  {partners.map((partner, index) => (
                    <div
                      key={`first-${index}`}
                      className="flex items-center justify-center flex-shrink-0"
                    >
                      <div className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto flex items-center justify-center bg-white/5 rounded-lg px-4 sm:px-6 py-2 sm:py-3 border border-white/10">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="h-full w-auto object-contain max-w-[120px] sm:max-w-[140px] md:max-w-[160px] filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                          style={{
                            aspectRatio: 'auto',
                            objectFit: 'contain',
                            objectPosition: 'center'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {/* Duplicate set for infinite scroll */}
                  {partners.map((partner, index) => (
                    <div
                      key={`second-${index}`}
                      className="flex items-center justify-center flex-shrink-0"
                    >
                      <div className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto flex items-center justify-center bg-white/5 rounded-lg px-4 sm:px-6 py-2 sm:py-3 border border-white/10">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="h-full w-auto object-contain max-w-[120px] sm:max-w-[140px] md:max-w-[160px] filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                          style={{
                            aspectRatio: 'auto',
                            objectFit: 'contain',
                            objectPosition: 'center'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 sm:px-6 md:px-8">
          <TestimonialsSection
            title="Join the community"
            description="Hear from builders who have transformed their ideas into reality with Junction Platform."
            testimonials={testimonials}
          />
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-6 md:px-8">
          <FinalCTA />
        </section>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}