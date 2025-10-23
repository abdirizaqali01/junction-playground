'use client'

import React from 'react'
import Sidebar from '@/components/partner/navigation/Sidebar'
import { layoutStyles } from '@/styles/design-system'

interface PartnerLayoutProps {
  children: React.ReactNode
  maxWidth?: string
  forcedActivePath?: string
}

export default function PartnerLayout({ 
  children, 
  maxWidth = '1280px',
  forcedActivePath,
}: PartnerLayoutProps) {
  return (
    <div className={layoutStyles.partner.pageContainer}>
      {/* Fixed Sidebar */}
      <div className={layoutStyles.partner.sidebarContainer}>
        <Sidebar forcedActivePath={forcedActivePath} />
      </div>

      {/* Main Content Area */}
      <div
        className={layoutStyles.partner.mainContainer}
        style={layoutStyles.partner.mainStyle}
      >
        <main
          className={layoutStyles.partner.mainContentWrapper}
          style={{ ...layoutStyles.partner.contentMaxWidth, maxWidth }}
        >
          
          <div className={layoutStyles.partner.mainContentPadding}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
