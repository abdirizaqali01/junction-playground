'use client'

import { JunctionLogo } from '@/components/logo'

// Profile Avatar Component
const ProfileAvatar = ({ name = "JM" }) => (
  <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-black font-semibold text-sm">
    {name}
  </div>
)

export default function Navbar({ activeTab, setActiveTab, tabs = ['Dashboard', 'Events', 'Community'] }) {
  return (
    <header className="border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <JunctionLogo />
        
        {/* Navigation Tabs with regular rounded corners */}
        <div className="flex items-center border border-zinc-700 rounded-xl p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 text-sm rounded-lg transition-all duration-500 ease-in-out min-w-[120px] relative
                  ${isActive
                    ? 'text-white bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent border border-transparent'
                    : tab === 'Events'
                    ? 'text-emerald-400 hover:text-emerald-300'
                    : 'text-zinc-500 hover:text-zinc-300'}
                `}
                style={isActive ? {
                  background: 'linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.1) 50%, rgba(16,185,129,0) 100%)',
                  border: '1px solid transparent',
                  backgroundClip: 'padding-box',
                  boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.8), inset 0 0 0 2px rgba(16,185,129,0.4), inset 0 0 0 3px rgba(16,185,129,0.1)'
                } : {}}
              >
                {tab}
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