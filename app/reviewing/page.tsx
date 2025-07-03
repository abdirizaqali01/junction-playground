'use client'

import { useState, useEffect } from 'react'

export default function ReviewProjectsPage() {
  const [sidebarState, setSidebarState] = useState('expanded') // 'expanded', 'icons', 'collapsed'
  const [lastClickTime, setLastClickTime] = useState(0)
  const [reviewStatus, setReviewStatus] = useState('open') // 'pending', 'open', or 'closed'
  
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
      {/* Sidebar - Same as previous page */}
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
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white bg-white/20 rounded mb-1" title="Review Projects">
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
        {/* Content */}
        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            {/* Main Card */}
            <div className="bg-white/10 rounded-xl p-7">
              {/* Header */}
              <div className="text-center mb-7">
                <h1 className="text-4xl font-bold text-white mb-3" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Reviewing Projects
                </h1>
                <div className="flex items-center justify-center gap-2">
                  {reviewStatus === 'pending' ? (
                    <div className="text-green-400">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                      </svg>
                      <span className="text-lg font-mono">23 hours 17 minutes left!</span>
                    </div>
                  ) : reviewStatus === 'open' ? (
                    <div className="text-green-400">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                      </svg>
                      <span className="text-lg font-medium">Reviewing Is Now Open</span>
                    </div>
                  ) : (
                    <div className="text-red-400">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                      <span className="text-lg font-medium">Reviewing Is Closed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Preview Card - Only show when not closed */}
              {reviewStatus !== 'closed' && (
                <div className={`rounded-xl overflow-hidden mb-7 ${
                  reviewStatus === 'open' 
                    ? 'bg-green-500/5 border-2 border-green-500' 
                    : 'bg-white/10 border border-white/15'
                }`}>
                  {/* Browser-like header */}
                  <div className="bg-white/20 p-3 flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-white/10 rounded px-3 py-2 ml-5">
                      <div className="w-28 h-3 bg-white/30 rounded"></div>
                    </div>
                    <div className="w-7 h-3 bg-white/30 rounded"></div>
                  </div>

                  {/* Project content preview */}
                  <div className="p-5 bg-white/5">
                    {/* Hero section */}
                    <div className="w-full h-36 bg-white/30 rounded mb-5"></div>

                    {/* Content sections */}
                    <div className="flex gap-5">
                      <div className="flex-1 space-y-3">
                        <div className="w-full h-4 bg-white/30 rounded"></div>
                        <div className="w-full h-4 bg-white/30 rounded"></div>
                        <div className="w-3/4 h-4 bg-white/30 rounded"></div>
                      </div>
                      <div className="w-36 h-18 bg-white/30 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Voting Section - Now inside the card */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-3" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                      We Use Gravel To Vote
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Once you click "Start reviewing", a new tab will open on your browser where you can start reviewing the projects.
                    </p>
                  </div>
                </div>
              )}

              {/* Closed State Content */}
              {reviewStatus === 'closed' && (
                <div className="bg-red-900/20 border border-red-500 rounded-xl p-7 mb-7">
                  <h2 className="text-xl font-semibold text-white mb-3" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                    The Review Period Is No Over
                  </h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    The results of the challenge winners will be announced in a few hours. Sit tight, walk around, chat with other teams, and enjoy the event!
                  </p>
                </div>
              )}

              {/* Voting Section */}
              <div className="text-center">
                {reviewStatus !== 'closed' && reviewStatus !== 'open' && (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                      We Use Gravel To Vote
                    </h2>
                    <p className="text-white/70 mb-5 font-mono">
                      Once you click "Start reviewing", a new tab will open on your browser where you can start reviewing the projects.
                    </p>
                  </>
                )}
                
                <div className="space-y-4">
                  {reviewStatus === 'pending' ? (
                    <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-medium transition-colors border border-white/20">
                      Wait To Review
                    </button>
                  ) : reviewStatus === 'open' ? (
                    <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                      Start Reviewing
                    </button>
                  ) : (
                    <button disabled className="bg-white/10 text-white/50 px-8 py-3 rounded-lg font-medium cursor-not-allowed">
                      Reviewing Closed
                    </button>
                  )}
                  
                  {reviewStatus !== 'closed' && (
                    <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                      </svg>
                      Copy link
                    </div>
                  )}
                </div>

                {/* Status Toggle (for demo purposes) */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-sm text-white/50 mb-3">Demo: Toggle Review Status</p>
                    <button 
                      onClick={() => {
                        const states = ['pending', 'open', 'closed']
                        const currentIndex = states.indexOf(reviewStatus)
                        const nextIndex = (currentIndex + 1) % states.length
                        setReviewStatus(states[nextIndex])
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-sm transition-colors"
                    >
                      Switch to {reviewStatus === 'pending' ? 'Open' : reviewStatus === 'open' ? 'Closed' : 'Pending'} State
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}