'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Home, List, Users, FileText, Upload } from 'lucide-react'
import SidebarSection from './SidebarSection'
import SidebarButton from './SidebarButton'
import PartnerCard from './PartnerCard'
import * as style from '@/styles/design-system'
import { partnerSurfaces, partnerText } from '@/styles/design-system'

const BANNER_IMAGE = '/path/to/banner.png'

const Sidebar: React.FC<{ forcedActivePath?: string }> = ({ forcedActivePath }) => {
  const pathname = usePathname()
  const currentPath = forcedActivePath ?? pathname

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(`${path}/`)
  }

  return (
    <aside
      className={`pl-5 pt-5 pb-5 ${style.layoutStyles.partner.sidebarWidth} h-screen`}
      style={{ color: partnerText.primary }}
    >
        <div
        className={`h-full flex flex-col justify-between gap-5 px-4 py-4 ${style.gradientBorder.boxContainer.className} cursor-default`}
        style={style.gradientBorder.boxContainer.style}>
        {/* Header */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between w-full">
            <h1
              className="text-[1.5rem] ml-2 font-semibold"
              style={{ color: partnerText.primary }}
            >
              Partner's Corner
            </h1>
          </div>
          <div
            className="rounded-xl overflow-hidden w-full"
            style={{
              aspectRatio: '301 / 172',
              backgroundColor: partnerSurfaces.muted,
            }}
          >
            <img
              src={BANNER_IMAGE}
              alt="Hack the Uncertainty 2023"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto space-y-5">
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
        <div className="">
          <PartnerCard name="Partner" email="personnel@partner.com" />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
