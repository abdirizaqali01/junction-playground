'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { useLoading } from '@/components/loading-context'
import * as style from '@/styles/design-system'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function ReviewProjectsPage() {
  const [reviewStatus, setReviewStatus] = useState('open') // 'pending', 'open', or 'closed'
  const router = useRouter()
  const { setLoading } = useLoading()
  
  const handleBackToHome = () => {
    setLoading('back-to-home', true)
    router.push('/dash')
  }

  const handleStartReviewing = () => {
    setLoading('start-reviewing', true)
    console.log('Starting review process...')
    
    // Simulate opening external review platform
    setTimeout(() => {
      // In a real implementation, this would open a new tab
      window.open('https://gravel.review', '_blank')
      setLoading('start-reviewing', false)
    }, 1000)
  }

  const handleWaitToReview = () => {
    setLoading('wait-review', true)
    console.log('Waiting for review period...')
    
    // Simulate checking review status
    setTimeout(() => {
      setLoading('wait-review', false)
    }, 800)
  }

  const handleCopyLink = () => {
    setLoading('copy-link', true)
    
    // Simulate copying review link
    setTimeout(() => {
      navigator.clipboard.writeText('https://gravel.review/junction-2024')
      setLoading('copy-link', false)
      alert('Review link copied to clipboard!')
    }, 500)
  }

  const handleToggleStatus = () => {
    setLoading('toggle-status', true)
    
    const states = ['pending', 'open', 'closed']
    const currentIndex = states.indexOf(reviewStatus)
    const nextIndex = (currentIndex + 1) % states.length
    
    setTimeout(() => {
      setReviewStatus(states[nextIndex])
      setLoading('toggle-status', false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-0 lg:ml-[250px] px-4 lg:px-10 pt-[100px] lg:pt-10">
        {/* Content */}
        <div className="flex-1 p-4">
          <div className="w-full md:w-[70%] lg:w-[60%] m-auto">
            {/* Main Card */}
            <div className={`${style.box.gray.bottom} p-7`}>
              {/* Header */}
              <div className="text-center mb-7">
                <h1 className={`text-4xl ${style.font.grotesk.heavy} text-[var(--color-light-opacity100)] mb-3`}>
                  Finalists Voting
                </h1>
                <div className="flex items-center justify-center gap-2">
                  {reviewStatus === 'pending' ? (
                    <div className="text-[var(--color-primary-opacity100)]">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                      </svg>
                      <span className={`text-lg ${style.font.mono.text}`}>23 hours 17 minutes left!</span>
                    </div>
                  ) : reviewStatus === 'open' ? (
                    <div className="text-[var(--color-primary-opacity100)]">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                      </svg>
                      <span className={`text-lg ${style.font.grotesk.medium}`}>Reviewing Is Now Open</span>
                    </div>
                  ) : (
                    <div className="text-[var(--color-alerts-opacity100)]">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                      <span className={`text-lg ${style.font.grotesk.medium}`}>Reviewing Is Closed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Preview Card - Only show when not closed */}
              {reviewStatus !== 'closed' && (
                <div className={`${style.border.radius.outer} overflow-hidden mb-7 ${
                  reviewStatus === 'open' 
                    ? 'bg-[var(--color-primary-opacity5)] border-2 border-[var(--color-primary-opacity100)]' 
                    : 'bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity15)]'
                }`}>
                  {/* Browser-like header */}
                  <div className="bg-[var(--color-white-opacity20)] p-3 flex items-center gap-3">
                    <div className={`w-3 h-3 bg-[var(--color-alerts-opacity100)] ${style.border.radius.full}`}></div>
                    <div className={`w-3 h-3 bg-[var(--color-secondary-opacity100)] ${style.border.radius.full}`}></div>
                    <div className={`w-3 h-3 bg-[var(--color-primary-opacity100)] ${style.border.radius.full}`}></div>
                    <div className={`flex-1 bg-[var(--color-white-opacity10)] ${style.border.radius.inner} px-3 py-2 ml-5`}>
                      <div className={`w-28 h-3 bg-[var(--color-white-opacity30)] ${style.border.radius.inner}`}></div>
                    </div>
                    <div className={`w-7 h-3 bg-[var(--color-white-opacity30)] ${style.border.radius.inner}`}></div>
                  </div>

                  {/* Project content preview */}
                  <div className="p-5 bg-[var(--color-white-opacity5)]">
                    {/* Hero section */}
                    <div className={`w-full h-36 bg-[var(--color-white-opacity30)] ${style.border.radius.inner} mb-5`}></div>

                    {/* Content sections */}
                    <div className="flex gap-5">
                      <div className="flex-1 space-y-3">
                        <div className={`w-full h-4 bg-[var(--color-white-opacity30)] ${style.border.radius.inner}`}></div>
                        <div className={`w-full h-4 bg-[var(--color-white-opacity30)] ${style.border.radius.inner}`}></div>
                        <div className={`w-3/4 h-4 bg-[var(--color-white-opacity30)] ${style.border.radius.inner}`}></div>
                      </div>
                      <div className={`w-36 h-18 bg-[var(--color-white-opacity30)] ${style.border.radius.inner}`}></div>
                    </div>
                  </div>
                  
                  {/* Voting Section - Now inside the card */}
                  <div className="p-6">
                    <h2 className={`text-xl ${style.font.grotesk.main} text-[var(--color-light-opacity100)] mb-3`}>
                      We Use Gravel To Vote
                    </h2>
                    <p className={`text-[var(--color-light-opacity60)] text-sm leading-relaxed ${style.font.grotesk.light}`}>
                      Once you click "Start reviewing", a new tab will open on your browser where you can start reviewing the projects.
                    </p>
                  </div>
                </div>
              )}

              {/* Closed State Content */}
              {reviewStatus === 'closed' && (
                <div className={`bg-[var(--color-alerts-opacity5)] border border-[var(--color-alerts-opacity100)] ${style.border.radius.outer} p-7 mb-7`}>
                  <h2 className={`text-xl ${style.font.grotesk.main} text-[var(--color-light-opacity100)] mb-3`}>
                    The Review Period Is No Over
                  </h2>
                  <p className={`text-[var(--color-light-opacity60)] text-sm leading-relaxed ${style.font.grotesk.light}`}>
                    The results of the challenge winners will be announced in a few hours. Sit tight, walk around, chat with other teams, and enjoy the event!
                  </p>
                </div>
              )}

              {/* Voting Section */}
              <div className="text-center">
                {reviewStatus !== 'closed' && reviewStatus !== 'open' && (
                  <>
                    <h2 className={`text-xl ${style.font.grotesk.main} text-[var(--color-light-opacity100)] mb-4`}>
                      We Use Gravel To Vote
                    </h2>
                    <p className={`text-[var(--color-light-opacity60)] mb-5 ${style.font.mono.text}`}>
                      Once you click "Start reviewing", a new tab will open on your browser where you can start reviewing the projects.
                    </p>
                  </>
                )}
                
                <div className="space-y-4">
                  {reviewStatus === 'pending' ? (
                    <button 
                      onClick={handleWaitToReview}
                      className={`bg-[var(--color-white-opacity20)] hover:bg-[var(--color-white-opacity30)] text-[var(--color-light-opacity100)] px-8 py-3 ${style.border.radius.middle} ${style.font.grotesk.medium} ${style.perf.transition.fast} border border-[var(--color-white-opacity20)] transform hover:scale-105`}
                    >
                      Wait To Review Finalists
                    </button>
                  ) : reviewStatus === 'open' ? (
                    <button 
                      onClick={handleStartReviewing}
                      className={`bg-[var(--color-primary-opacity100)] hover:bg-[var(--color-primary-opacity80)] text-[var(--color-light-opacity100)] px-8 py-3 ${style.border.radius.middle} ${style.font.grotesk.medium} ${style.perf.transition.fast} transform hover:scale-105`}
                    >
                      Start Finalists Reviewing
                    </button>
                  ) : (
                    <button 
                      disabled 
                      className={`bg-[var(--color-white-opacity10)] text-[var(--color-light-opacity50)] px-8 py-3 ${style.border.radius.middle} ${style.font.grotesk.medium} cursor-not-allowed`}
                    >
                      Finalists Reviewing Closed
                    </button>
                  )}
                  
                  {reviewStatus !== 'closed' && (
                    <div className="flex items-center justify-center gap-2 text-[var(--color-light-opacity50)] text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                      </svg>
                      <button 
                        onClick={handleCopyLink}
                        className={`${style.font.mono.text} hover:text-[var(--color-light-opacity100)] ${style.perf.transition.fast}`}
                      >
                        Copy link
                      </button>
                    </div>
                  )}
                </div>

                {/* Status Toggle (for demo purposes) */}
                <div className="mt-8 pt-6 border-t border-[var(--color-white-opacity10)]">
                  <div className="text-center">
                    <p className={`text-sm text-[var(--color-light-opacity50)] mb-3 ${style.font.grotesk.light}`}>Demo: Toggle Review Status</p>
                    <button 
                      onClick={handleToggleStatus}
                      className={`bg-[var(--color-white-opacity10)] hover:bg-[var(--color-white-opacity20)] text-[var(--color-light-opacity100)] px-4 py-2 ${style.border.radius.inner} text-sm ${style.perf.transition.fast} ${style.font.grotesk.light} transform hover:scale-105`}
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