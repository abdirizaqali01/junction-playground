'use client'

import { useState, useCallback } from 'react'
import { Footer } from "@/components/footer"
import Navbar from '@/components/navi'
import { MainButton } from '@/components/attachables/main-button'
import { useLoading } from '@/components/loading-context'

// Community Stats Card Component
interface CommunityCardProps {
  icon: React.ReactNode
  number: string
  label: string
  description: string
}

const CommunityCard = ({ icon, number, label, description }: CommunityCardProps) => (
  <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-center hover:border-[var(--color-primary-opacity100)] transition-colors">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <div className="text-[var(--color-primary-opacity100)] text-2xl font-bold mb-2">{number}</div>
    <div className="text-[var(--color-light-opacity100)] font-medium mb-1">{label}</div>
    <div className="text-[var(--color-light-opacity60)] text-sm">{description}</div>
  </div>
)

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('Community')
  const { setLoading } = useLoading()

  // REMOVED: initializeCSSVariables() - no longer needed

  // Optimized button handlers with loading states
  const handleJoinDiscord = useCallback(() => {
    setLoading('join-discord', true)
    // Simulate external link or action
    window.open('https://discord.gg/junction', '_blank')
    // Clear loading after a brief delay
    setTimeout(() => setLoading('join-discord', false), 1000)
  }, [setLoading])

  const handleViewGuidelines = useCallback(() => {
    setLoading('view-guidelines', true)
    // Navigate to guidelines page or open modal
    // For now, simulate loading
    setTimeout(() => setLoading('view-guidelines', false), 1000)
  }, [setLoading])

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)]">
      {/* Use the reusable Navbar component */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-20">
        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold mb-6 text-[var(--color-light-opacity100)]">
            Join Our Community
          </h1>
          <p className="text-[var(--color-light-opacity60)] text-lg max-w-2xl mx-auto">
            Connect with builders, innovators, and creators from around the world.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <CommunityCard
            icon={
              <svg className="w-8 h-8 text-[var(--color-primary-opacity100)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            }
            number="15,000+"
            label="Active Builders"
            description="Passionate developers and creators"
          />
          
          <CommunityCard
            icon={
              <svg className="w-8 h-8 text-[var(--color-primary-opacity100)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
              </svg>
            }
            number="Discord"
            label="Join our chat"
            description="Real-time discussions and support"
          />
          
          <CommunityCard
            icon={
              <svg className="w-8 h-8 text-[var(--color-primary-opacity100)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            }
            number="100+"
            label="Events hosted"
            description="Hackathons and workshops worldwide"
          />
          
          <CommunityCard
            icon={
              <svg className="w-8 h-8 text-[var(--color-primary-opacity100)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            }
            number="Global"
            label="Worldwide reach"
            description="Connecting innovators globally"
          />
        </div>

        {/* Community Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[var(--color-light-opacity100)] text-center mb-12">Why Join Junction?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-primary-opacity10)] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--color-primary-opacity100)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-light-opacity100)] mb-3">Learn & Grow</h3>
              <p className="text-[var(--color-light-opacity60)]">
                Access workshops, mentorship, and resources to level up your skills in tech and innovation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-primary-opacity10)] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--color-primary-opacity100)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-light-opacity100)] mb-3">Network</h3>
              <p className="text-[var(--color-light-opacity60)]">
                Connect with like-minded builders, potential co-founders, and industry professionals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-primary-opacity10)] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--color-primary-opacity100)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19v2h-1.5v14l-1 1-1-1V4H8.5v14l-1 1-1-1V4H5V2h1.5C7.33 2 8 2.67 8 3.5V4h8v-.5C16 2.67 16.67 2 17.5 2zm-10 2h9v11h-9V4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-light-opacity100)] mb-3">Build Together</h3>
              <p className="text-[var(--color-light-opacity60)]">
                Collaborate on projects, participate in hackathons, and bring your ideas to life with others.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-20">
          <div className="bg-gradient-to-r from-[var(--color-primary-opacity10)] to-[var(--color-primary-opacity10)] border border-[var(--color-primary-opacity100)] rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-[var(--color-light-opacity100)] mb-4">Ready to Join?</h2>
            <p className="text-[var(--color-light-opacity60)] mb-8 max-w-2xl mx-auto">
              Become part of a global community that's shaping the future of technology and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MainButton 
                variant="primary" 
                size="lg" 
                showIcon={false}
                onClick={handleJoinDiscord}
              >
                Join Discord
              </MainButton>
              <MainButton 
                variant="outlineGreen" 
                size="lg" 
                showIcon={false}
                onClick={handleViewGuidelines}
              >
                View Community Guidelines
              </MainButton>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}