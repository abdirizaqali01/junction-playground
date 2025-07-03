'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  isActive?: boolean
}
interface NavigationSection {
  id: string
  title: string
  items: NavigationItem[]
}
interface UserProfile {
  name: string
  email: string
  avatar?: string
  initials: string
  avatarColor?: string
}
interface SidebarProps {
  navigationSections: NavigationSection[]
  userProfile: UserProfile
  backToHomeLabel?: string
  onBackToHome?: () => void
  className?: string
  showImagePlaceholder?: boolean
  imagePlaceholder?: React.ReactNode
}
type SidebarState = 'expanded' | 'icons' | 'collapsed'

const IconHome = (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-5.5h-5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
  </svg>
)
const IconList = (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="9" y1="18" x2="21" y2="18"/>
    <circle cx="4" cy="6" r="1.5" fill="currentColor"/><circle cx="4" cy="12" r="1.5" fill="currentColor"/><circle cx="4" cy="18" r="1.5" fill="currentColor"/>
  </svg>
)
const IconUsers = (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IconLayers = (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
)
const ChevronLeft = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)

const IconCollapse = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
  </svg>
)

export default function Sidebar({
  navigationSections,
  userProfile,
  backToHomeLabel = 'Back To Home',
  onBackToHome,
  className = '',
  showImagePlaceholder = true,
  imagePlaceholder,
}: SidebarProps) {
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded')
  const [lastClickTime, setLastClickTime] = useState(0)
  const router = useRouter()

  const handleSidebarToggle = () => {
    const now = Date.now()
    if (now - lastClickTime < 500) setSidebarState('collapsed')
    else setSidebarState(s => (s === 'expanded' ? 'icons' : 'expanded'))
    setLastClickTime(now)
  }

  const handleNavigation = (href: string, id: string) => {
    // Map specific navigation items to their routes
    const map: Record<string, string> = {
      dashboard: '/dash',
      challenges: '/challenges',
      team: '/teams',
      hackerpack: '/hackerpack',
    }
    router.push(map[id.toLowerCase()] ?? href)
  }

  /** replace icons in "general" section */
  const patchedSections = navigationSections.map(sec =>
    sec.id === 'general'
      ? {
          ...sec,
          items: sec.items.map(it => {
            switch (it.id) {
              case 'dashboard':  return { ...it, icon: IconHome }
              case 'challenges': return { ...it, icon: IconList }
              case 'team':       return { ...it, icon: IconUsers }
              case 'hackerpack': return { ...it, icon: IconLayers }
              default:           return it
            }
          }),
        }
      : sec
  )

  const defaultImagePlaceholder = (
    <div className="w-full h-44 bg-white/20 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-white/30 rounded-full mx-auto mb-2"></div>
        <div className="w-16 h-8 bg-white/30 rounded mx-auto"></div>
      </div>
    </div>
  )

  return (
    <div 
      className={`${
        sidebarState === 'collapsed' ? 'w-0'
        : sidebarState === 'icons'   ? 'w-[67px]'
        : 'w-[250px]'}
        bg-white/10 border-r border-white/15 flex flex-col fixed
        overflow-hidden transition-all duration-300 pt-[1%] ${className}`}
      style={{ 
        height: sidebarState === 'expanded' ? 'auto' : '100vh',
        fontFamily: 'Space Grotesk, sans-serif'
      }}
    >

      {/* HEADER */}
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        {sidebarState === 'expanded' && onBackToHome && (
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded px-3 py-1
                       text-white/40 hover:text-white/60 text-sm font-medium"
          >
            {ChevronLeft}
            {backToHomeLabel}
          </button>
        )}

        <button onClick={handleSidebarToggle} className="text-white/90 hover:text-white" title="Toggle sidebar">
          {IconCollapse}
        </button>
      </div>

      {/* Image Placeholder */}
      {sidebarState === 'expanded' && showImagePlaceholder && (
        <div className="p-4">{imagePlaceholder ?? defaultImagePlaceholder}</div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {patchedSections.map(section => (
          <div key={section.id} className="mb-6">
            {sidebarState === 'expanded' && (
              <div className="pl-[19px] text-xs font-semibold text-white/60 mb-3">
                {section.title}
              </div>
            )}

            {section.items.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href, item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-[6px] mb-1 transition-colors text-left
                  ${item.isActive ? 'text-white/85 bg-white/15'
                                  : 'text-white/75 hover:text-white hover:bg-white/10'}`}
                title={item.label}
              >
                <div className="w-[15px] h-[15px] mr-3 flex-shrink-0">{item.icon}</div>
                {sidebarState === 'expanded' && (
                  <span className="font-medium">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* User Profile at Bottom */}
      {sidebarState === 'expanded' && userProfile && (
        <div className="m-4 flex items-center gap-3 bg-white/10 rounded-lg p-3 mt-20">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
              userProfile.avatarColor ?? 'bg-green-600'
            }`}
          >
            {userProfile.avatar || userProfile.initials}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">{userProfile.name}</div>
            <div className="text-xs text-white/80 truncate">{userProfile.email}</div>
          </div>
        </div>
      )}
    </div>
  )
}