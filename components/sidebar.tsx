'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLoading } from '@/components/loading-context'
import { LoadingButton, SidebarNavButton } from '@/components/loading-button'
import * as style from '@/styles/design-system'
import Image from 'next/image'

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
  navigationSections?: NavigationSection[]
  userProfile?: UserProfile
  backToHomeLabel?: string
  onBackToHome?: () => void
  className?: string
  showImagePlaceholder?: boolean
  imagePlaceholder?: React.ReactNode
  eventId?: string
}

type SidebarState = 'expanded' | 'icons'

const IconCollapse = (
  <Image src={`/icons/Bar_Left.svg`} alt="Close NavBar Icon" width={30} height={30} />
)

const IconHome = (
  <Image src={`/icons/House_02.svg`} alt="Home Icon" width={18} height={18} />
)

const IconList = (
  <Image src={`/icons/List_Unordered.svg`} alt="Challenges Icon" width={18} height={18} />
)

const IconUsers = (
  <Image src={`/icons/Users_Group.svg`} alt="Team Icon" width={18} height={18} />
)

const IconLayers = (
  <Image src={`/icons/Layers.svg`} alt="Hackerpack Icon" width={18} height={18} />
)

const ProjectSubmission = (
  <Image src={`/icons/Download_Package.svg`} alt="Hackerpack Icon" width={18} height={18} />
)

const MentorMeetings = (
  <Image src={`/icons/User_Check.svg`} alt="Hackerpack Icon" width={18} height={18} />
)

const ReviewProjects = (
  <Image src={`/icons/Arrows_Reload_01.svg`} alt="Hackerpack Icon" width={18} height={18} />
)

const FinalistsVoting = (
  <Image src={`/icons/Wavy_Check.svg`} alt="Hackerpack Icon" width={18} height={18} />
)

const ChevronLeft = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)

// Hamburger Icon
const HamburgerIcon = (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

// Close Icon
const CloseIcon = (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
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
        icon: ProjectSubmission
      },
      {
        id: 'mentor-meetings',
        label: 'Mentor Meetings',
        href: '#',
        icon: MentorMeetings
      },
      {
        id: 'review-projects',
        label: 'Review Projects',
        href: '#',
        icon: ReviewProjects
      },
      {
        id: 'finalists-voting',
        label: 'Finalists Voting',
        href: '#',
        icon: FinalistsVoting
      }
    ]
  }
]

// Default user profile built into the sidebar
const defaultUserProfile: UserProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-[var(--color-primary-opacity100)]',
}

export default function Sidebar({
  navigationSections = defaultNavigationSections,
  userProfile = defaultUserProfile,
  backToHomeLabel = 'Back To Home',
  onBackToHome,
  className = '',
  showImagePlaceholder = true,
  imagePlaceholder,
  eventId,
}: SidebarProps) {
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded')
  const [showProfilePopup, setShowProfilePopup] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { setLoading, isLoading } = useLoading()

  const handleSidebarToggle = () => {
    setSidebarState((s: SidebarState) => (s === 'expanded' ? 'icons' : 'expanded'))
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Get event ID from props or pathname
  const getEventId = (): string | null => {
    if (eventId) return eventId
    
    // Extract from pathname like /events/[id]/dash
    const pathSegments = pathname.split('/')
    const eventsIndex = pathSegments.findIndex((segment: string) => segment === 'events')
    if (eventsIndex !== -1 && pathSegments[eventsIndex + 1]) {
      return pathSegments[eventsIndex + 1]
    }
    return null
  }

  // Map pathnames to navigation item IDs
  const getActiveItemId = (): string => {
    const pathToIdMap: Record<string, string> = {
      '/dash': 'dashboard',
      '/challenges': 'challenges',
      '/teams': 'team',
      '/teams/my-team': 'team',
      '/teams/candidates': 'team',
      '/hackerpack': 'hackerpack',
      '/submissions': 'project-submission',
      '/meetings': 'mentor-meetings',
      '/reviews': 'review-projects',
      '/voting': 'finalists-voting',
    }
    
    // First check if the full pathname (after /events/[id]) matches
    const pathSegments = pathname.split('/')
    const eventsIndex = pathSegments.findIndex((segment: string) => segment === 'events')
    
    if (eventsIndex !== -1) {
      // Get the path after /events/[id]
      const eventBasePath = pathSegments.slice(eventsIndex + 2).join('/')
      const fullPath = `/${eventBasePath}`
      
      // Check for exact matches first (including sub-paths)
      if (pathToIdMap[fullPath]) {
        return pathToIdMap[fullPath]
      }
      
      // Check for partial matches (for team sub-pages)
      if (fullPath.startsWith('/teams')) {
        return 'team'
      }
      
      // Check for challenge pages
      if (fullPath.startsWith('/challenges')) {
        return 'challenges'
      }
    }
    
    // Fallback to checking just the last segment
    const lastSegment = pathname.split('/').pop() || ''
    return pathToIdMap[`/${lastSegment}`] || 'dashboard'
  }

  // Update navigation sections to set active state dynamically
  const activeItemId = getActiveItemId()
  const updatedNavigationSections = navigationSections.map((section: NavigationSection) => ({
    ...section,
    items: section.items.map((item: NavigationItem) => ({
      ...item,
      isActive: item.id === activeItemId,
      href: getEventId() ? `/events/${getEventId()}/${
        item.id === 'dashboard' ? 'dash' :
        item.id === 'project-submission' ? 'submissions' :
        item.id === 'mentor-meetings' ? 'meetings' :
        item.id === 'review-projects' ? 'reviews' :
        item.id === 'finalists-voting' ? 'voting' :
        item.id === 'team' ? 'teams' : item.id
      }` : item.href
    }))
  }))

  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup)
  }

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome()
    } else {
      // Default behavior: navigate to /dash
      router.push('/dash')
    }
  }

  const handleProfileMenuClick = (action: string) => {
    setShowProfilePopup(false)
    setMobileMenuOpen(false) // Close mobile menu when navigating
    setLoading(`profile-${action}`, true)
    
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
        // Handle language settings - clear loading after delay since no navigation
        setTimeout(() => setLoading(`profile-${action}`, false), 500)
        break
      case 'signout':
        // Handle sign out - clear loading after delay since no navigation
        setTimeout(() => setLoading(`profile-${action}`, false), 800)
        break
    }
  }

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Change to Dynamic Image Placeholder
  const defaultImagePlaceholder = (
    <div className="w-full h-44 bg-white/20 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-white/30 rounded-full mx-auto mb-2"></div>
        <div className="w-16 h-8 bg-white/30 rounded mx-auto"></div>
      </div>
    </div>
  )

  return (
    <>
      {/* MOBILE TOP BAR (visible on mobile only) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#191919] border-b border-white/15 px-4 py-3 flex items-center justify-between z-[200]">
        {/* Left side - Back to Home */}
        <LoadingButton
          onClick={handleBackToHome}
          loadingKey="sidebar-back-home"
          variant="ghost"
          size="sm"
          className={`flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded px-3 py-1
                     text-white/40 hover:text-white/60 text-sm font-medium transition-all duration-200
                     active:bg-white/5 border-0 ${style.font.mono.text}`}
          icon={ChevronLeft}
        >
          {backToHomeLabel}
        </LoadingButton>

        {/* Right side - Hamburger Menu */}
        <button
          onClick={handleMobileMenuToggle}
          className="text-white/90 hover:text-white transition-all duration-200 active:scale-95 p-2 rounded-lg hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? CloseIcon : HamburgerIcon}
        </button>
      </div>

      {/* MOBILE OVERLAY MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#191919] z-[150] flex flex-col">
          {/* Spacer for top bar */}
          <div className="h-[60px]"></div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Image Placeholder */}
            {showImagePlaceholder && (
              <div className="mb-6">{imagePlaceholder ?? defaultImagePlaceholder}</div>
            )}

            {/* Navigation */}
            <nav className="space-y-6">
              {updatedNavigationSections.map((section: NavigationSection) => (
                <div key={section.id}>
                  <div className={`${style.font.grotesk.main} text-xs font-semibold text-white/60 mb-3 uppercase tracking-wider`}>
                    {section.title}
                  </div>

                  <div className="space-y-2">
                    {section.items.map((item: NavigationItem) => (
                      <SidebarNavButton
                        key={item.id}
                        href={item.href}
                        isActive={item.isActive}
                        icon={<div className="w-[18px] h-[18px] flex items-center justify-center">{item.icon}</div>}
                        loadingKey={`sidebar-${item.id}`}
                        sidebarExpanded={true}
                        className={`
                          w-full flex items-center px-4 py-3 text-base rounded-lg transition-all duration-200 text-left
                          ${item.isActive 
                            ? 'text-[var(--color-light-opacity100)] bg-white/10' 
                            : 'text-white/60 hover:text-[var(--color-light-opacity100)] hover:bg-white/5'
                          }
                          ${style.font.grotesk.light} border-0 justify-start gap-3
                        `}>
                        {item.label}
                      </SidebarNavButton>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* User Profile at Bottom */}
          <div className="p-4 border-t border-white/10" ref={profileRef}>
            <div className="bg-white/5 border border-white/5 rounded-lg p-1">
              <button 
                onClick={handleProfileClick}
                className="w-full flex items-center hover:bg-white/5 rounded-lg p-3 transition-all duration-200"
              >
                <div 
                  className={`w-12 h-12 ${userProfile.avatarColor || 'bg-green-600'} rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                >
                  {userProfile.avatar || userProfile.initials}
                </div>
                <div className="ml-3 min-w-0 flex-1 text-left">
                  <div className="text-sm font-medium text-white truncate">
                    {userProfile.name}
                  </div>
                  <div className="text-xs text-white/60 truncate">
                    {userProfile.email}
                  </div>
                </div>
              </button>
            </div>

            {/* Mobile Profile Popup */}
            {showProfilePopup && (
              <div className="mt-2 bg-[#2a2a2a] border border-white/50 rounded-lg shadow-2xl overflow-hidden">
                <div className="py-2">
                  <LoadingButton
                    onClick={() => handleProfileMenuClick('profile')}
                    loadingKey="profile-profile"
                    variant="ghost"
                    size="sm"
                    className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white 
                               transition-all duration-200 justify-start border-0 rounded-none"
                  >
                    Profile
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleProfileMenuClick('events')}
                    loadingKey="profile-events"
                    variant="ghost"
                    size="sm"
                    className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white 
                               transition-all duration-200 justify-start border-0 rounded-none"
                  >
                    Organize Events
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleProfileMenuClick('settings')}
                    loadingKey="profile-settings"
                    variant="ghost"
                    size="sm"
                    className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white 
                               transition-all duration-200 justify-start border-0 rounded-none"
                  >
                    Settings
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleProfileMenuClick('language')}
                    loadingKey="profile-language"
                    variant="ghost"
                    size="sm"
                    className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white 
                               transition-all duration-200 justify-start border-0 rounded-none"
                  >
                    Language
                  </LoadingButton>
                  <div className="border-t border-white/10 my-1"></div>
                  <LoadingButton
                    onClick={() => handleProfileMenuClick('signout')}
                    loadingKey="profile-signout"
                    variant="ghost"
                    size="sm"
                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 
                               transition-all duration-200 justify-start border-0 rounded-none"
                  >
                    Sign Out
                  </LoadingButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (hidden on mobile) */}
      <div 
        className={`hidden lg:flex ${
          sidebarState === 'icons' ? 'w-[67px]' : 'w-[250px]'
          } bg-[#191919] border-r border-white/15 flex-col fixed h-screen
          overflow-hidden transition-all duration-300 pt-[1%] z-[100] ${className}`}
        style={{ 
          fontFamily: 'Space Grotesk, sans-serif'
        }}
      >
        {/* DESKTOP HEADER */}
        <div className="p-4 flex items-center justify-between">
          {sidebarState === 'expanded' && (
            <LoadingButton
              onClick={handleBackToHome}
              loadingKey="sidebar-back-home"
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded px-3 py-1
                         text-white/40 hover:text-white/60 text-[0.85rem] font-medium transition-all duration-200
                         active:bg-white/5 border-0 ${style.font.mono.text}`}
              icon={ChevronLeft}
            >
              {backToHomeLabel}
            </LoadingButton>
          )}

          {/* <button 
            onClick={handleSidebarToggle} 
            className={`text-white/90 hover:text-white transition-all duration-200 active:scale-95 p-2 rounded-lg hover:bg-white/10 ${
              sidebarState === 'icons' ? 'mx-auto' : 'ml-auto'
            }`} 
            title="Toggle sidebar"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {IconCollapse}
            </div>
          </button> */}
        </div>

        {/* Image Placeholder */}
        {sidebarState === 'expanded' && showImagePlaceholder && (
          <div className="p-4">{imagePlaceholder ?? defaultImagePlaceholder}</div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto">
          {updatedNavigationSections.map((section: NavigationSection) => (
            <div key={section.id} className="mt-4 mb-6">
              {sidebarState === 'expanded' && (
                <div className={`${style.font.grotesk.main} pl-[19px] text-xs font-semibold text-white/60 mb-3 uppercase tracking-wider`}>
                  {section.title}
                </div>
              )}

              <div className="space-y-1">
                {section.items.map((item: NavigationItem) => (
                  <SidebarNavButton
                    key={item.id}
                    href={item.href}
                    isActive={item.isActive}
                    icon={<div className="w-[18px] h-[18px] flex items-center justify-center">{item.icon}</div>}
                    loadingKey={`sidebar-${item.id}`}
                    sidebarExpanded={sidebarState === 'expanded'}
                    className={`
                      w-full flex items-center px-3 py-2 text-sm rounded-[1px] transition-all duration-100 text-left
                      ${item.isActive 
                        ? 'text-[var(--color-light-opacity100)] bg-white/10' 
                        : 'text-white/60 hover:text-[var(--color-light-opacity100)] hover:bg-white/5'
                      }
                      ${style.font.grotesk.light} border-0 justify-start gap-3
                    `}>
                    {item.label}
                  </SidebarNavButton>
                ))}
              </div>
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
                  className="w-full flex items-center hover:bg-white/5 rounded-lg p-2 transition-all duration-200
                             active:scale-95"
                >
                  <div 
                    className={`w-12 h-12 ${userProfile.avatarColor || 'bg-green-600'} rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                  >
                    {userProfile.avatar || userProfile.initials}
                  </div>
                  <div className="ml-3 min-w-0 flex-1 text-left">
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
                className="w-full flex items-center justify-center px-3 py-2 text-sm rounded-[6px] transition-all duration-200
                           text-white/75 hover:text-white hover:bg-white/10 active:scale-95"
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

          {/* Desktop Profile Popup */}
          {showProfilePopup && sidebarState === 'expanded' && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#2a2a2a] border border-white/50 rounded-lg shadow-2xl overflow-hidden z-50">
              <div className="py-2">
                <LoadingButton
                  onClick={() => handleProfileMenuClick('profile')}
                  loadingKey="profile-profile"
                  variant="ghost"
                  size="sm"
                  className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white 
                             transition-all duration-200 justify-start border-0 rounded-none"
                >
                  Profile
                </LoadingButton>
                <LoadingButton
                  onClick={() => handleProfileMenuClick('events')}
                  loadingKey="profile-events"
                  variant="ghost"
                  size="sm"
                  className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white 
                             transition-all duration-200 justify-start border-0 rounded-none"
                >
                  Organize Events
                </LoadingButton>
                <LoadingButton
                  onClick={() => handleProfileMenuClick('settings')}
                  loadingKey="profile-settings"
                  variant="ghost"
                  size="sm"
                  className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white 
                             transition-all duration-200 justify-start border-0 rounded-none"
                >
                  Settings
                </LoadingButton>
                <LoadingButton
                  onClick={() => handleProfileMenuClick('language')}
                  loadingKey="profile-language"
                  variant="ghost"
                  size="sm"
                  className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white 
                             transition-all duration-200 justify-start border-0 rounded-none"
                >
                  Language
                </LoadingButton>
                <div className="border-t border-white/10 my-1"></div>
                <LoadingButton
                  onClick={() => handleProfileMenuClick('signout')}
                  loadingKey="profile-signout"
                  variant="ghost"
                  size="sm"
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 
                             transition-all duration-200 justify-start border-0 rounded-none"
                >
                  Sign Out
                </LoadingButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}