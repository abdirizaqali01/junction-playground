'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from "@/components/footer"

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function TeamCandidatesPage() {
  const [activeTab, setActiveTab] = useState('team-candidates')
  const [hasApplications, setHasApplications] = useState(true) // Change to true to show applications
  const router = useRouter()

  // Mock applications data
  const applications = Array(6).fill(null).map((_, index) => ({
    id: index + 1,
    name: "John Smith",
    role: "Role name",
    avatar: null
  }))

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleAllChallenges = () => {
    router.push('/challenges')
  }

  const handleTabNavigation = (tabId) => {
    switch(tabId) {
      case 'all-teams':
        router.push('/teams')
        break
      case 'my-team':
        router.push('/teams/my-team')
        break
      case 'team-candidates':
        router.push('/teams/candidates')
        break
      default:
        setActiveTab(tabId)
    }
  }

  const handleAcceptApplication = (applicationId) => {
    console.log('Accept application:', applicationId)
  }

  const handleDeclineApplication = (applicationId) => {
    console.log('Decline application:', applicationId)
  }

  const handleViewFullApplication = (applicationId) => {
    console.log('View full application:', applicationId)
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
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
        {/* Header */}
        <div className="px-6 py-4 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-white pt-[3%]" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Team Candidates
            </h1>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-1">
              {[
                { id: 'all-teams', label: 'All Teams' },
                { id: 'my-team', label: 'My Team' },
                { id: 'team-candidates', label: 'Team Candidates' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabNavigation(tab.id)}
                  className={`w-40 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-black font-medium'
                      : 'bg-zinc-800/90 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/90'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleAllChallenges}
              className="w-40 py-2 bg-zinc-800/90 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/90 transition-colors text-sm rounded-lg"
            >
              All Challenges
            </button>
          </div>

          {/* Content */}
          {hasApplications ? (
            <div className="flex flex-wrap justify-center gap-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-zinc-900/95 rounded-xl overflow-hidden border border-zinc-800/80 w-96 h-[28rem] flex flex-col flex-shrink-0 p-8"
                >
                  {/* Profile Section */}
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 bg-zinc-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-zinc-400" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                      {application.name}
                    </h3>
                  </div>

                  {/* View Full Application Link */}
                  <button 
                    onClick={() => handleViewFullApplication(application.id)}
                    className="text-green-400 text-base mb-12 hover:text-green-300 transition-colors text-left"
                  >
                    View full application
                  </button>

                  {/* Applied For Section */}
                  <div className="mb-12 flex-1">
                    <p className="text-white text-base mb-6">Applied for</p>
                    <span className="px-6 py-3 bg-transparent border border-green-600 text-white rounded-full text-sm font-mono">
                      {application.role}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-auto">
                    <button
                      onClick={() => handleAcceptApplication(application.id)}
                      className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full text-base transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineApplication(application.id)}
                      className="flex-1 py-4 bg-transparent border border-green-600 text-white hover:bg-green-600/10 font-semibold rounded-full text-base transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State Content */
            <div>
              <p className="text-zinc-400 text-lg leading-relaxed">
                It seems like you don't have any applications yet.
              </p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  )
}