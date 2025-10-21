'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Home, List, Users, FileText, Upload } from 'lucide-react'
import SidebarSection from './SidebarSection'
import SidebarButton from './SidebarButton'
import PartnerCard from './UserCard'

const BANNER_IMAGE = '/path/to/banner.png'

const Sidebar: React.FC = () => {
  const pathname = usePathname()

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <aside className="w-full max-w-[256px] min-w-[224px] h-screen bg-gradient-to-b from-[#1C1C1C] to-[#1A1A1A] text-white flex flex-col justify-between">
      {/* Header */}
      <div className="p-5 pb-3">
        <h1 className="text-lg font-semibold mb-3">Partner Page</h1>
        <div
          className="bg-white/5 rounded-xl overflow-hidden w-full"
          style={{ aspectRatio: '301 / 172' }}
        >
          <img
            src={BANNER_IMAGE}
            alt="Hack the Uncertainty 2023"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-5 space-y-3">
        <SidebarSection title="General">
          <SidebarButton 
            icon={Home} 
            label="Dashboard" 
            active={isActive('/partners/dashboard')}
            href="/partners/dashboard"
          />
          <SidebarButton 
            icon={List} 
            label="All Challenges" 
            active={isActive('/partners/challenges')}
            href="/partners/challenges"
          />
          <SidebarButton 
            icon={Users} 
            label="Meeting Bookings" 
            active={isActive('/partners/meetings')}
            href="/partners/meetings"
          />
        </SidebarSection>

        <SidebarSection title="For You">
          <SidebarButton 
            icon={FileText} 
            label="Your Challenge" 
            active={isActive('/partners/challenge')}
            href="/partners/challenge"
          />
          <SidebarButton 
            icon={Upload} 
            label="Project Submissions" 
            active={isActive('/partners/submissions')}
            href="/partners/submissions"
          />
          <SidebarButton 
            icon={Users} 
            label="Your Teams" 
            active={isActive('/partners/teams')}
            href="/partners/teams"
          />
        </SidebarSection>
      </nav>

      {/* Footer */}
      <div className="p-5">
        <PartnerCard name="Partner" email="personnel@partner.com" />
      </div>
    </aside>
  )
}

export default Sidebar