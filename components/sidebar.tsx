'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

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
  navigationSections?: NavigationSection[] // Made optional
  userProfile: UserProfile
  backToHomeLabel?: string
  onBackToHome?: () => void
  className?: string
  showImagePlaceholder?: boolean
  imagePlaceholder?: React.ReactNode
}
type SidebarState = 'expanded' | 'icons'

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

// Default navigation data built into the sidebar
const defaultNavigationSections: NavigationSection[] = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '#',
        icon: IconHome
      },
      {
        id: 'challenges',
        label: 'Challenges',
        href: '#',
        icon: IconList
      },
      {
        id: 'team',
        label: 'Team',
        href: '#',
        icon: IconUsers
      },
      {
        id: 'hackerpack',
        label: 'Hackerpack',
        href: '#',
        icon: IconLayers
      }
    ]
  },
  {
    id: 'during-hackathon',
    title: 'During Hackathon',
    items: [
      {
        id: 'project-submission',
        label: 'Project Submission',
        href: '#',
        icon: (
          <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>
        )
      },
      {
        id: 'mentor-meetings',
        label: 'Mentor Meetings',
        href: '#',
        icon: (
          <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
          </svg>
        )
      },
      {
        id: 'review-projects',
        label: 'Review Projects',
        href: '#',
        icon: (
          <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
          </svg>
        )
      },
      {
        id: 'finalist-voting',
        label: 'Finalist Voting',
        href: '#',
        icon: (
          <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
        )
      }
    ]
  }
]

export default function Sidebar({
  navigationSections = defaultNavigationSections, // Use default if not provided
  userProfile,
  backToHomeLabel = 'Back To dashboard',
  onBackToHome,
  className = '',
  showImagePlaceholder = true,
  imagePlaceholder,
}: SidebarProps) {
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded')
  const [showProfilePopup, setShowProfilePopup] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Map pathnames to navigation item IDs
  const getActiveItemId = () => {
    const pathToIdMap: Record<string, string> = {
      '/eventdash': 'dashboard',
      '/dashboard': 'dashboard',
      '/challenges': 'challenges',
      '/teams': 'team',
      '/team': 'team',
      '/hackerpack': 'hackerpack',
      '/submissions': 'project-submission',
      '/meetings': 'mentor-meetings',
      '/reviewing': 'review-projects',
      '/voting': 'finalist-voting',
    }
    return pathToIdMap[pathname] || 'dashboard'
  }

  // Update navigation sections to set active state dynamically
  const activeItemId = getActiveItemId()
  const updatedNavigationSections = navigationSections.map(section => ({
    ...section,
    items: section.items.map(item => ({
      ...item,
      isActive: item.id === activeItemId
    }))
  }))

  const handleSidebarToggle = () => {
    setSidebarState(s => (s === 'expanded' ? 'icons' : 'expanded'))
  }

  const handleNavigation = (href: string, id: string) => {
    // Map specific navigation items to their routes
    const map: Record<string, string> = {
      dashboard: '/eventdash',
      challenges: '/challenges',
      team: '/teams',
      hackerpack: '/hackerpack',
      'project-submission': '/submissions',
      'mentor-meetings': '/meetings',
      'review-projects': '/reviewing',
      'finalist-voting': '/voting',
    }
    router.push(map[id.toLowerCase()] ?? href)
  }

  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup)
  }

  const handleProfileMenuClick = (action: string) => {
    setShowProfilePopup(false)
    // Handle different profile menu actions
    switch (action) {
      case 'profile':
        router.push('/profile')
        break
      case 'events':
        router.push('/organize-events')
        break
      case 'settings':
        router.push('/settings')
        break
      case 'language':
        // Handle language settings
        break
      case 'signout':
        // Handle sign out
        break
    }
  }

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfilePopup(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
        sidebarState === 'icons' ? 'w-[67px]' : 'w-[250px]'
        } bg-white/10 border-r border-white/15 flex flex-col fixed h-screen
        overflow-hidden transition-all duration-300 pt-[1%] ${className}`}
      style={{ 
        fontFamily: 'Space Grotesk, sans-serif'
      }}
    >

      {/* HEADER */}
      <div className="p-4 flex items-center justify-between">
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

        <button 
          onClick={handleSidebarToggle} 
          className={`text-white/90 hover:text-white transition-colors ${
            sidebarState === 'icons' ? 'mx-auto' : 'ml-auto'
          }`} 
          title="Toggle sidebar"
        >
          <div className="w-[15px] h-[15px] flex items-center justify-center">
            {IconCollapse}
          </div>
        </button>
      </div>

      {/* Image Placeholder */}
      {sidebarState === 'expanded' && showImagePlaceholder && (
        <div className="p-4">{imagePlaceholder ?? defaultImagePlaceholder}</div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {updatedNavigationSections.map(section => (
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

      {/* User Profile Card at Bottom */}
      <div className="relative" ref={profileRef}>
        <div className="p-4 mt-auto">
          {sidebarState === 'expanded' ? (
            <div className="bg-white/5 border border-white/5 rounded-lg p-1">
              <button 
                onClick={handleProfileClick}
                className="w-full flex items-center hover:bg-white/5 rounded-lg p-2 transition-colors"
              >
                <div 
                  className={`w-12 h-12 ${userProfile.avatarColor || 'bg-green-600'} rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                >
                  {userProfile.avatar || userProfile.initials}
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <div className="text-sm font-medium text-white truncate">
                    {userProfile.name}
                  </div>
                  <div className="text-xs text-white/60 truncate">
                    {userProfile.email}
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleProfileClick}
              className="w-full flex items-center justify-center px-3 py-2 text-sm rounded-[6px] transition-colors text-white/75 hover:text-white hover:bg-white/10"
              title={userProfile.name}
            >
              <div 
                className={`w-[15px] h-[15px] ${userProfile.avatarColor || 'bg-green-600'} rounded flex items-center justify-center text-white font-bold text-xs`}
              >
                {userProfile.avatar || userProfile.initials.charAt(0)}
              </div>
            </button>
          )}
        </div>

        {/* Profile Popup */}
        {showProfilePopup && sidebarState === 'expanded' && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#2a2a2a] border border-white/50 rounded-lg shadow-xl overflow-hidden z-50">
            <div className="py-2">
              <button
                onClick={() => handleProfileMenuClick('profile')}
                className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                Profile
              </button>
              <button
                onClick={() => handleProfileMenuClick('events')}
                className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                Organize Events
              </button>
              <button
                onClick={() => handleProfileMenuClick('settings')}
                className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                Settings
              </button>
              <button
                onClick={() => handleProfileMenuClick('language')}
                className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                Language
              </button>
              <div className="border-t border-white/10 my-1"></div>
              <button
                onClick={() => handleProfileMenuClick('signout')}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}