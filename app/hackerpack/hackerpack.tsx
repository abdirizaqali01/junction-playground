'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"


export default function HackerpackPage() {
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

  const softwareItems = [
    {
      title: "Software",
      description: "Description of software... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia...Description of software... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia...Description of software... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia...Description of software... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia...Description of software... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia..."
    },
    {
      title: "Software",
      description: "Description of software... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia..."
    },
    {
      title: "Software",
      description: "Description of software... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia..."
    }
  ]

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
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded mb-1" title="Dashboard">
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
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white bg-white/20 rounded mb-1" title="Hackerpack">
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
        <div className="flex-1 p-8 pt-6">
          {/* Page Title and Description */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Hackerpack
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-4xl">
              We want you to focus entirely on making your hackathon project as awesome as possible! The softwares provided by our partners is here to help you unlock your creativity and get the most out of your learning experience during the event.
            </p>
          </div>

          {/* Software Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {softwareItems.map((item, index) => (
              <div key={index} className="bg-white/10 border border-white/15 rounded-xl p-6 flex gap-6">
                {/* Image Placeholder */}
                <div className="w-48 aspect-square bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-12 h-12 text-white/40" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Separator line and button */}
                  <div className="mt-6">
                    <div className="border-t border-white/20 mb-4"></div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Redeem Offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}