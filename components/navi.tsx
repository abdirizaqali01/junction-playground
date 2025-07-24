'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLoading } from '@/components/loading-context'
import { useRouter, usePathname } from 'next/navigation'
import { JunctionLogo } from '@/components/logo'
import { LoadingButton } from '@/components/loading-button'

// Default user profile (same as sidebar)
const defaultUserProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-[var(--color-primary-opacity100)]',
}

// Profile Avatar Component with optional navigation
const ProfileAvatar = ({
  name = "JM",
  onProfileClick,
}: {
  name?: string
  onProfileClick?: () => void
}) => (
  <button
    onClick={onProfileClick}
    className="w-10 h-10 bg-[var(--color-primary-opacity100)] border border-[var(--color-white-opacity50)] rounded-full flex items-center justify-center text-black font-semibold text-sm hover:bg-[var(--color-primary-opacity80)] transition-all duration-200"
  >
    {name}
  </button>
)

// Icons
const HamburgerIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { setLoading } = useLoading()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showProfilePopup, setShowProfilePopup] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { name: 'Dashboard', path: '/dash' },
    { name: 'Events', path: '/events' },
    { name: 'Community', path: '/com' },
  ]

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === pathname)
    if (currentTab) {
      setActiveTab(currentTab.name)
    }
  }, [pathname, setActiveTab])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

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

  const handleTabClick = useCallback(
    (tab: { name: string; path: string }) => {
      if (activeTab !== tab.name) {
        setActiveTab(tab.name)
        setLoading(`nav-${tab.name}`, true)
        setMobileMenuOpen(false)
        router.push(tab.path)
      }
    },
    [activeTab, setActiveTab, setLoading, router]
  )

  const handleProfileClick = useCallback(() => {
    setShowProfilePopup(!showProfilePopup)
  }, [showProfilePopup])

  // Same profile menu handler as sidebar
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

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent backdrop-blur-[10px] px-6 py-6">
        <div className="flex items-center justify-between">
          <JunctionLogo />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-emerald-400 transition-colors duration-200 p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col">
          <div className="h-[80px]"></div>
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="space-y-8 text-center flex flex-col items-center">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.name
                return (
                  <button
                    key={tab.name}
                    onClick={() => handleTabClick(tab)}
                    className={`block text-3xl font-medium transition-all duration-300 px-8 py-4 rounded-lg
                      ${isActive
                        ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/30'
                        : 'text-zinc-300 hover:text-emerald-400 hover:bg-emerald-400/5'}
                    `}
                  >
                    {tab.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile Profile Section with Popup */}
          <div className="p-6 border-t border-zinc-800" ref={profileRef}>
            <div className="bg-white/5 border border-white/5 rounded-lg p-1">
              <button 
                onClick={handleProfileClick}
                className="w-full flex items-center hover:bg-white/5 rounded-lg p-3 transition-all duration-200"
              >
                <div 
                  className={`w-12 h-12 ${defaultUserProfile.avatarColor || 'bg-green-600'} rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                >
                  {defaultUserProfile.initials}
                </div>
                <div className="ml-3 min-w-0 flex-1 text-left">
                  <div className="text-sm font-medium text-white truncate">
                    {defaultUserProfile.name}
                  </div>
                  <div className="text-xs text-white/60 truncate">
                    {defaultUserProfile.email}
                  </div>
                </div>
              </button>
            </div>

            {/* Mobile Profile Popup - Same as sidebar */}
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

      {/* DESKTOP HEADER */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent backdrop-blur-[10px] px-6 py-8">
        <div className="max-w-[90%] mx-auto flex items-center justify-between">
          <JunctionLogo />
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center border border-zinc-700 rounded-[6px] p-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.name
                return (
                  <button
                    key={tab.name}
                    onClick={() => handleTabClick(tab)}
                    className={`px-8 py-3 text-sm rounded-[5px] transition-all duration-300 ease-in-out min-w-[120px] relative
                      ${isActive
                        ? 'text-emerald-400'
                        : 'text-zinc-500 hover:text-zinc-300'}
                    `}
                    style={
                      isActive
                        ? {
                            background:
                              'linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.1) 50%, rgba(16,185,129,0) 100%)',
                            border: '1px solid transparent',
                            backgroundClip: 'padding-box',
                            boxShadow:
                              'inset 0 0 0 1px rgba(16,185,129,0.8), inset 0 0 0 2px rgba(16,185,129,0.4), inset 0 0 0 3px rgba(16,185,129,0.1)',
                          }
                        : {}
                    }
                  >
                    {tab.name}
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Desktop Profile Section with Popup - Same structure as sidebar */}
          <div className="relative" ref={profileRef}>
            <ProfileAvatar name="JM" onProfileClick={handleProfileClick} />
            
            {/* Desktop Profile Popup - Exactly same as sidebar */}
            {showProfilePopup && (
              <div className="absolute top-full right-0 mt-2 bg-[#2a2a2a] border border-white/50 rounded-lg shadow-2xl overflow-hidden z-50">
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

                {/* User Profile Card at Bottom - Same as sidebar */}
                <div className="border-t border-white/10 p-4">
                  <div className="flex items-center">
                    <div 
                      className={`w-12 h-12 ${defaultUserProfile.avatarColor || 'bg-green-600'} rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                    >
                      {defaultUserProfile.initials}
                    </div>
                    <div className="ml-3 min-w-0 flex-1 text-left">
                      <div className="text-sm font-medium text-white truncate">
                        {defaultUserProfile.name}
                      </div>
                      <div className="text-xs text-white/60 truncate">
                        {defaultUserProfile.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}