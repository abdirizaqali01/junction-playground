'use client'

import { useState } from 'react'
import { Footer } from '@/components/footer'

export default function EventIdPage() {
  const [sidebarState, setSidebarState] = useState('expanded') // 'expanded', 'icons', 'collapsed'
  const [lastClickTime, setLastClickTime] = useState(0)
  
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

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className={`${
        sidebarState === 'collapsed' ? 'w-0' : 
        sidebarState === 'icons' ? 'w-16' : 'w-[200px]'
      } bg-white/10 border-r border-white/15 flex flex-col transition-all duration-300 fixed h-screen overflow-hidden pt-[1%]`}>
        {/* Back to Home Button */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          {sidebarState === 'expanded' && (
            <button className="flex items-center text-white/60 hover:text-white text-sm">
              <span className="mr-2">←</span>
              Back To Home
            </button>
          )}
          <button 
            onClick={handleSidebarToggle}
            className="p-1 text-white/60 hover:text-white ml-auto"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
            </svg>
          </button>
        </div>

        {/* Image Placeholder */}
        {sidebarState === 'expanded' && (
          <div className="p-4">
            <div className="w-full h-32 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/30 rounded-full mx-auto mb-2"></div>
                <div className="w-16 h-8 bg-white/30 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto">
          <div className="mb-6">
            {sidebarState === 'expanded' && (
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3 font-medium">General</div>
            )}
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white bg-white/20 rounded mb-1" title="Dashboard">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
              </svg>
              {sidebarState === 'expanded' && "Dashboard"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded mb-1" title="Challenges">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
              </svg>
              {sidebarState === 'expanded' && "Challenges"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded mb-1" title="Team">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 h4.216z"/>
              </svg>
              {sidebarState === 'expanded' && "Team"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded mb-1" title="Hackerpack">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
              </svg>
              {sidebarState === 'expanded' && "Hackerpack"}
            </a>
          </div>

          <div className="mb-6">
            {sidebarState === 'expanded' && (
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3 font-medium">During Hackathon</div>
            )}
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded mb-1" title="Project Submission">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              </svg>
              {sidebarState === 'expanded' && "Project Submission"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded mb-1" title="Mentor Meetings">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
              </svg>
              {sidebarState === 'expanded' && "Mentor Meetings"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded mb-1" title="Review Projects">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
              </svg>
              {sidebarState === 'expanded' && "Review Projects"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded mb-1" title="Finalist Voting">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
              {sidebarState === 'expanded' && "Finalist Voting"}
            </a>
          </div>
        </nav>

        {/* User Profile at Bottom */}
        <div className="p-4 border-t border-white/20 mt-auto">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              JU
            </div>
            {sidebarState === 'expanded' && (
              <div className="ml-3 min-w-0">
                <div className="text-sm font-medium text-white truncate">Junction Hack</div>
                <div className="text-xs text-white/60 truncate">ju@hackjunction.com</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ${
        sidebarState === 'collapsed' ? 'ml-0' : 
        sidebarState === 'icons' ? 'ml-16' : 'ml-[200px]'
      }`}>
        {/* Main Content Area */}
        <div className="flex-1 p-8 pt-6 flex flex-col min-h-0">
          {/* ID Card - Full Width */}
          <div className="flex items-center justify-center h-full">
            <div className="bg-white/10 border border-white/15 rounded-xl p-12 text-center w-full max-w-2xl">
              {/* Page Title and Description inside card */}
              <h1 className="text-4xl font-bold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                Your ID Page
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                This is your Junction Hackathon QR code. Use it to get access to the event venue.
              </p>
              
              {/* QR Code */}
              <div className="bg-white rounded-lg p-6 mb-6 inline-block">
                <div className="w-64 h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                  {/* QR Code Pattern */}
                  <svg width="240" height="240" viewBox="0 0 240 240" className="text-black">
                    {/* Corner squares */}
                    <rect x="0" y="0" width="60" height="60" fill="currentColor"/>
                    <rect x="10" y="10" width="40" height="40" fill="white"/>
                    <rect x="20" y="20" width="20" height="20" fill="currentColor"/>
                    
                    <rect x="180" y="0" width="60" height="60" fill="currentColor"/>
                    <rect x="190" y="10" width="40" height="40" fill="white"/>
                    <rect x="200" y="20" width="20" height="20" fill="currentColor"/>
                    
                    <rect x="0" y="180" width="60" height="60" fill="currentColor"/>
                    <rect x="10" y="190" width="40" height="40" fill="white"/>
                    <rect x="20" y="200" width="20" height="20" fill="currentColor"/>
                    
                    {/* Random pattern blocks to simulate QR code */}
                    <rect x="80" y="10" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="10" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="10" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="10" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="80" y="30" width="10" height="10" fill="currentColor"/>
                    <rect x="110" y="30" width="10" height="10" fill="currentColor"/>
                    <rect x="140" y="30" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="90" y="50" width="10" height="10" fill="currentColor"/>
                    <rect x="120" y="50" width="10" height="10" fill="currentColor"/>
                    <rect x="160" y="50" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="10" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="30" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="50" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="80" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="180" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="200" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="220" y="80" width="10" height="10" fill="currentColor"/>
                    
                    {/* More random blocks */}
                    <rect x="20" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="60" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="90" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="110" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="140" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="170" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="190" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="210" y="100" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="10" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="40" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="70" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="120" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="180" y="120" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="30" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="80" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="110" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="160" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="200" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="220" y="140" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="80" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="180" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="210" y="160" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="80" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="170" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="200" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="220" y="190" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="90" y="210" width="10" height="10" fill="currentColor"/>
                    <rect x="110" y="210" width="10" height="10" fill="currentColor"/>
                    <rect x="140" y="210" width="10" height="10" fill="currentColor"/>
                    <rect x="160" y="210" width="10" height="10" fill="currentColor"/>
                    <rect x="190" y="210" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="80" y="230" width="10" height="10" fill="currentColor"/>
                    <rect x="120" y="230" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="230" width="10" height="10" fill="currentColor"/>
                    <rect x="180" y="230" width="10" height="10" fill="currentColor"/>
                    <rect x="210" y="230" width="10" height="10" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              
              {/* Unique ID */}
              <p className="text-white/40 text-xs mb-8">
                Unique ID: 23049882406820948850
              </p>
              
              {/* User Details */}
              <div className="space-y-2 text-left max-w-sm mx-auto">
                <div className="text-white font-semibold text-lg">John Smith</div>
                <div className="text-white/60">Email address</div>
                <div className="text-white/60">Github ID</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}