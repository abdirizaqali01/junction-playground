'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLoading } from '@/components/loading-context'
import { useRouter, usePathname } from 'next/navigation'
import { JunctionLogo } from '@/components/logo'

// Profile Avatar Component
const ProfileAvatar = ({ name = "JM" }) => (
  <div className="w-10 h-10 bg-[var(--color-primary-opacity100)] border border-[var(--color-white-opacity50)] rounded-full flex items-center justify-center text-black font-semibold text-sm">
    {name}
  </div>
)

// Hamburger Icon
const HamburgerIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

// Close Icon
const CloseIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
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

  const tabs = [
    { name: 'Dashboard', path: '/dash' },
    { name: 'Events', path: '/events' },
    { name: 'Community', path: '/com' }
  ]

  // Update active tab based on current pathname
  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === pathname)
    if (currentTab) {
      setActiveTab(currentTab.name)
    }
  }, [pathname, setActiveTab])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

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

  // Optimized tab navigation with instant loading feedback
  const handleTabClick = useCallback((tab: { name: string; path: string }) => {
    // Only navigate if it's a different tab
    if (activeTab !== tab.name) {
      setActiveTab(tab.name)
      setLoading(`nav-${tab.name}`, true)
      setMobileMenuOpen(false) // Close mobile menu
      router.push(tab.path)
    }
  }, [activeTab, setActiveTab, setLoading, router])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent backdrop-blur-[10px] px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <JunctionLogo />
          
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-emerald-400 transition-colors duration-200 p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col">
          {/* Spacer for header */}
          <div className="h-[80px]"></div>
          
          {/* Menu Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            {/* Navigation Options */}
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

          {/* Profile Section at Bottom */}
          <div className="p-6 border-t border-zinc-800">
            <div className="flex items-center justify-center space-x-4">
              <ProfileAvatar name="JM" />
              <div className="text-zinc-300">
                <div className="text-sm font-medium">Junction Member</div>
                <div className="text-xs text-zinc-500">Profile & Settings</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP HEADER */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent backdrop-blur-[10px] px-6 py-8">
        <div className="max-w-[90%] mx-auto flex items-center justify-between">
          {/* Logo */}
          <JunctionLogo />
        
          {/* Navigation Tabs - Centered */}
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
                    style={isActive ? {
                      background: 'linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.1) 50%, rgba(16,185,129,0) 100%)',
                      border: '1px solid transparent',
                      backgroundClip: 'padding-box',
                      boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.8), inset 0 0 0 2px rgba(16,185,129,0.4), inset 0 0 0 3px rgba(16,185,129,0.1)'
                    } : {}}
                  >
                    {tab.name}
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Profile Avatar */}
          <ProfileAvatar name="JM" />
        </div>
      </header>
    </>
  )
}