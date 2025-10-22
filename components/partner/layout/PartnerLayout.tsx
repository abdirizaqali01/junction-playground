'use client'

import React from 'react'
import Sidebar from '@/components/partner/navigation/Sidebar'
import * as style from '@/styles/design-system'

interface PartnerLayoutProps {
  children: React.ReactNode
  maxWidth?: string
}

export default function PartnerLayout({ 
  children, 
  maxWidth = '1280px' 
}: PartnerLayoutProps) {
  return (
    <div className={style.layout.partner.container.className}>
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen z-50">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div
        className={style.layout.partner.main.className}
        style={{
          marginLeft: style.layout.partner.main.marginLeft,
          width: style.layout.partner.main.width,
        }}
      >
        <main className="w-full" style={{ maxWidth }}>
          <div className="w-full px-[4%] pt-[3%] pb-[2%]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}