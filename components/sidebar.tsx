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

export default function Sidebar({
  navigationSections,
  userProfile,
  backToHomeLabel = "Back To Home",
  onBackToHome,
  className = "",
  showImagePlaceholder = true,
  imagePlaceholder
}: SidebarProps) {
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded')
  const [lastClickTime, setLastClickTime] = useState(0)
  const router = useRouter()
  
  const handleSidebarToggle = () => {
    const currentTime = Date.now()
    const timeDiff = currentTime - lastClickTime
    
    if (timeDiff < 500) { // Double click within 500ms
      setSidebarState('collapsed')
    } else {
      if (sidebarState === 'expanded') {
        setSidebarState('icons')
      } else {
        setSidebarState('expanded')
      }
    }
    setLastClickTime(currentTime)
  }

  const handleNavigation = (href: string, id: string) => {
    // Map specific navigation items to their routes
    const routeMap: { [key: string]: string } = {
      'dashboard': '/dash',
      'challenges': '/challenges',
      'team': '/teams',
      'hackerpack': '/hackerpack'
    }

    const route = routeMap[id.toLowerCase()] || href
    router.push(route)
  }

  const defaultImagePlaceholder = (
    <div className="w-full h-32 bg-white/20 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-white/30 rounded-full mx-auto mb-2"></div>
        <div className="w-16 h-8 bg-white/30 rounded mx-auto"></div>
      </div>
    </div>
  )

  return (
    <div className={`${
      sidebarState === 'collapsed' ? 'w-0' : 
      sidebarState === 'icons' ? 'w-[67px]' : 'w-[250px]'
    } bg-white/10 border-r border-white/15 flex flex-col transition-all duration-300 fixed h-screen overflow-hidden pt-[1%] ${className}`}>
      
      {/* Header with Back Button and Toggle */}
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        {sidebarState === 'expanded' && onBackToHome && (
          <button 
            onClick={onBackToHome}
            className="flex items-center text-white/60 hover:text-white text-sm"
          >
            <span className="mr-2">←</span>
            {backToHomeLabel}
          </button>
        )}
        <button 
          onClick={handleSidebarToggle}
          className="p-1 text-white/60 hover:text-white ml-auto"
          title="Toggle sidebar"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
          </svg>
        </button>
      </div>

      {/* Image Placeholder */}
      {sidebarState === 'expanded' && showImagePlaceholder && (
        <div className="p-4">
          {imagePlaceholder || defaultImagePlaceholder}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {navigationSections.map((section) => (
          <div key={section.id} className="mb-6">
            {sidebarState === 'expanded' && (
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3 font-medium">
                {section.title}
              </div>
            )}
            
            {section.items.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavigation(item.href, item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded mb-1 transition-colors text-left ${
                  item.isActive 
                    ? 'text-white bg-white/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title={item.label}
              >
                <div className="w-4 h-4 mr-3 flex-shrink-0">
                  {item.icon}
                </div>
                {sidebarState === 'expanded' && item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* User Profile at Bottom */}
      <div className="p-4 border-t border-white/20 mt-auto">
        <div className="flex items-center">
          <div 
            className={`w-12 h-12 ${userProfile.avatarColor || 'bg-green-600'} rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
          >
            {userProfile.avatar || userProfile.initials}
          </div>
          {sidebarState === 'expanded' && (
            <div className="ml-3 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {userProfile.name}
              </div>
              <div className="text-xs text-white/60 truncate">
                {userProfile.email}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}