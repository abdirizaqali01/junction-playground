'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"
import Navbar from '@/components/navi' // Import the new navbar component

// Community Stats Card Component
const CommunityCard = ({ icon, number, label, description }) => (
  <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <div className="text-emerald-400 text-2xl font-bold mb-2">{number}</div>
    <div className="text-white font-medium mb-1">{label}</div>
    <div className="text-zinc-400 text-sm">{description}</div>
  </div>
)

export default function JunctionDashboard() {
  const [activeTab, setActiveTab] = useState('Community')

  const tabs = ['Dashboard', 'Events', 'Community']

  const renderCommunityContent = () => (
    <>
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6 text-white">
          Join Our Community
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Connect with builders, innovators, and creators from around the world.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <CommunityCard
          icon={
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Join Junction?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Learn & Grow</h3>
            <p className="text-zinc-400">
              Access workshops, mentorship, and resources to level up your skills in tech and innovation.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Network</h3>
            <p className="text-zinc-400">
              Connect with like-minded builders, potential co-founders, and industry professionals.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19v2h-1.5v14l-1 1-1-1V4H8.5v14l-1 1-1-1V4H5V2h1.5C7.33 2 8 2.67 8 3.5V4h8v-.5C16 2.67 16.67 2 17.5 2zm-10 2h9v11h-9V4z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Build Together</h3>
            <p className="text-zinc-400">
              Collaborate on projects, participate in hackathons, and bring your ideas to life with others.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-20">
        <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 border border-emerald-400/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Become part of a global community that's shaping the future of technology and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-400 text-black px-8 py-3 rounded-lg font-medium hover:bg-emerald-300 transition-colors">
              Join Discord
            </button>
            <button className="border border-emerald-400 text-emerald-400 px-8 py-3 rounded-lg font-medium hover:bg-emerald-400 hover:text-black transition-colors">
              View Community Guidelines
            </button>
          </div>
        </div>
      </div>
    </>
  )

  const renderDashboardContent = () => (
    <>
      {/* Welcome Section */}
      <div className="text-center py-32">
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-emerald-400">Good morning,</span>{' '}
          <span className="text-white">Name</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Here's an overview of what's going on for you
        </p>
      </div>

      {/* Most Frequented Section */}
      <div className="pb-24">
        <h2 className="text-white text-lg font-medium mb-6 text-left">Most frequented</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-lg">
          {/* Community Card */}
          <div className="bg-zinc-900 border border-emerald-400 rounded p-2 hover:border-emerald-300 transition-colors aspect-square flex flex-col items-center justify-center">
            <div className="mb-1">
              <div className="grid grid-cols-3 gap-0.5">
                <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
              </div>
            </div>
            <h3 className="text-white text-xs font-medium">Community</h3>
          </div>

          {/* Challenges Card */}
          <div className="bg-zinc-900 border border-emerald-400 rounded p-2 hover:border-emerald-300 transition-colors aspect-square flex flex-col items-center justify-center">
            <div className="mb-1">
              <div className="flex flex-col space-y-0.5">
                <div className="w-3 h-1 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"></div>
                <div className="w-3 h-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                <div className="w-3 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-white text-xs font-medium">Challenges</h3>
          </div>

          {/* Event Name Card */}
          <div className="bg-zinc-600 border border-emerald-400 rounded p-2 hover:border-emerald-300 transition-colors aspect-square flex flex-col items-center justify-center">
            <h3 className="text-white text-xs font-medium">Event Name</h3>
          </div>
        </div>
      </div>

      {/* Rest of dashboard content... */}
      <div className="mb-16">
        <h2 className="text-white text-xl font-medium mb-6">Upcoming event</h2>
        <div className="bg-zinc-800 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-white mb-6">Event Name</h3>
          <p className="text-zinc-400">Event details will be displayed here...</p>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Use the reusable Navbar component */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={tabs}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6">
        {activeTab === 'Community' ? renderCommunityContent() : renderDashboardContent()}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}