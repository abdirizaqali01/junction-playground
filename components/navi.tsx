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

interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { setLoading } = useLoading()

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

  // Optimized tab navigation with instant loading feedback
  const handleTabClick = useCallback((tab: { name: string; path: string }) => {
    // Only navigate if it's a different tab
    if (activeTab !== tab.name) {
      setActiveTab(tab.name)
      setLoading(`nav-${tab.name}`, true)
      router.push(tab.path)
    }
  }, [activeTab, setActiveTab, setLoading, router])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent backdrop-blur-[10px] px-6 py-8">
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
  )
}