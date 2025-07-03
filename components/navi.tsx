'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { JunctionLogo } from '@/components/logo'

// Profile Avatar Component
const ProfileAvatar = ({ name = "JM" }) => (
  <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-black font-semibold text-sm">
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

  const handleTabClick = (tab: { name: string; path: string }) => {
    setActiveTab(tab.name)
    router.push(tab.path)
  }

  return (
    <header className="border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <JunctionLogo />
        </Link>
        
        {/* Navigation Tabs */}
        <div className="flex items-center border border-zinc-700 rounded-2xl p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name
            return (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                className={`px-8 py-3 text-sm rounded-xl transition-all duration-500 ease-in-out min-w-[120px] relative
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
        
        {/* Profile Avatar */}
        <ProfileAvatar name="JM" />
      </div>
    </header>
  )
}