'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function ReviewProjectsPage() {
  const [reviewStatus, setReviewStatus] = useState('open') // 'pending', 'open', or 'closed'
  const router = useRouter()
  
  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px] pt-[3%]">
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