'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Home, List, Users, FileText, Upload, PanelLeftClose, PanelRightOpen } from 'lucide-react'
import SidebarSection from './SidebarSection'
import SidebarButton from './SidebarButton'
import PartnerCard from './UserCard'

const BANNER_IMAGE = '/path/to/banner.png'

const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const sidebarWidth = collapsed ? 'w-[84px]' : 'w-full lg:w-[clamp(220px,18vw,320px)]'

  return (
    <aside className={`${sidebarWidth} h-screen bg-gradient-to-b from-[#1C1C1C] to-[#1A1A1A] text-white flex flex-col justify-between transition-all duration-200`}
    >
      {/* Header */}
      <div className={`px-[clamp(16px,3vw,28px)] pt-[clamp(20px,4vw,36px)] pb-[clamp(16px,3vw,28px)] flex flex-col gap-3 ${collapsed ? 'items-center' : ''}`}>
        <div className="flex items-center justify-between w-full">
          {!collapsed && <h1 className="text-lg font-semibold">Partner Page</h1>}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelRightOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>
        {!collapsed && (
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
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto px-[clamp(16px,3vw,28px)] space-y-3 transition-all duration-200 ${collapsed ? 'px-4' : ''}`}>
        <SidebarSection title="General" collapsed={collapsed}>
          <SidebarButton 
            icon={Home} 
            label="Dashboard" 
            active={isActive('/partners/dashboard')}
            href="/partners/dashboard"
            collapsed={collapsed}
          />
          <SidebarButton 
            icon={List} 
            label="All Challenges" 
            active={isActive('/partners/challenges')}
            href="/partners/challenges"
            collapsed={collapsed}
          />
          <SidebarButton 
            icon={Users} 
            label="Meeting Bookings" 
            active={isActive('/partners/meetings')}
            href="/partners/meetings"
            collapsed={collapsed}
          />
        </SidebarSection>

        <SidebarSection title="For You" collapsed={collapsed}>
          <SidebarButton 
            icon={FileText} 
            label="Your Challenge" 
            active={isActive('/partners/challenge')}
            href="/partners/challenge"
            collapsed={collapsed}
          />
          <SidebarButton 
            icon={Upload} 
            label="Project Submissions" 
            active={isActive('/partners/submissions')}
            href="/partners/submissions"
            collapsed={collapsed}
          />
          <SidebarButton 
            icon={Users} 
            label="Your Teams" 
            active={isActive('/partners/teams')}
            href="/partners/teams"
            collapsed={collapsed}
          />
        </SidebarSection>
      </nav>

      {/* Footer */}
      <div className={`px-[clamp(16px,3vw,28px)] py-[clamp(20px,4vw,36px)] transition-all duration-200 ${collapsed ? 'px-4' : ''}`}>
        {!collapsed && <PartnerCard name="Partner" email="personnel@partner.com" />}
      </div>
    </aside>
  )
}

export default Sidebar
