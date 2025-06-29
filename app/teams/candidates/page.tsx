'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from "@/components/footer"

// Define your navigation data for sidebar
const navigationSections = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
          </svg>
        )
      },
      {
        id: 'challenges',
        label: 'Challenges',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
          </svg>
        )
      },
      {
        id: 'team',
        label: 'Team',
        href: '#',
        isActive: true,
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 h4.216z"/>
          </svg>
        )
      },
      {
        id: 'hackerpack',
        label: 'Hackerpack',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
          </svg>
        )
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    items: [
      {
        id: 'project-submission',
        label: 'Project Submission',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>
        )
      },
      {
        id: 'meetings',
        label: 'Meetings',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
          </svg>
        )
      },
      {
        id: 'review-projects',
        label: 'Review Projects',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
          </svg>
        )
      },
      {
        id: 'finalist-voting',
        label: 'Finalist Voting',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
        )
      }
    ]
  }
]

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
        navigationSections={navigationSections}
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-72">
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