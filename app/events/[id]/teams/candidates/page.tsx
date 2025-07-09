'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from "@/components/attachables/main-button"
import * as style from '@/styles/design-system'
import { initializeCSSVariables } from '@/styles/design-system'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function TeamCandidatesPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params?.id as string
  
  const [activeTab, setActiveTab] = useState('candidates')
  const [hasApplications, setHasApplications] = useState(true) // Change to true to show applications

  //-------------------------------- DESIGN SYSTEM ACTUATOR --------------------------------//
  useEffect(() => {
    initializeCSSVariables();
  }, []);

  // Mock applications data
  const applications = Array(6).fill(null).map((_, index) => ({
    id: index + 1,
    name: "John Smith",
    role: "Role name",
    avatar: null
  }))

  const handleBackToHome = () => {
    router.push(`/events/${eventId}/dash`)
  }

  const handleTabNavigation = (tabId: string) => {
    setActiveTab(tabId)
    switch(tabId) {
      case 'all-teams':
        router.push(`/events/${eventId}/teams`)
        break
      case 'my-team':
        router.push(`/events/${eventId}/teams/my-team`)
        break
      case 'candidates':
        router.push(`/events/${eventId}/teams/candidates`)
        break
    }
  }

  const handleAcceptApplication = (applicationId: number) => {
    console.log('Accept application:', applicationId)
  }

  const handleDeclineApplication = (applicationId: number) => {
    console.log('Decline application:', applicationId)
  }

  const handleViewFullApplication = (applicationId: number) => {
    console.log('View full application:', applicationId)
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Dashboard"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
        {/* Header */}
        <div className="px-6 py-4 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`${style.font.grotesk.heavy} text-4xl text-[var(--color-light-opacity100)] pt-[3%]`}>
              Team Candidates
            </h1>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-1">
              {[
                { id: 'all-teams', label: 'All Teams' },
                { id: 'my-team', label: 'My Team' },
                { id: 'candidates', label: 'Team Candidates' }
              ].map((tab) => (
                <MainButton
                  key={tab.id}
                  onClick={() => handleTabNavigation(tab.id)}
                  variant={activeTab === tab.id ? 'default' : 'outlineGray'}
                  size="sm"
                  className="w-32 px-3 py-1 text-xs text-center justify-center"
                  showIcon={false}
                >
                  {tab.label}
                </MainButton>
              ))}
            </div>
            
            <MainButton 
              onClick={() => router.push(`/events/${eventId}/challenges`)}
              variant="outlineGray"
              size="sm"
              className="w-40 text-center justify-center"
              showIcon={false}
            >
              All Challenges
            </MainButton>
          </div>

          {/* Content */}
          {hasApplications ? (
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-[var(--color-white-opacity10)] rounded-xl overflow-hidden border border-[var(--color-white-opacity15)] w-full min-h-fit flex flex-col flex-shrink-0 p-8"
                >
                  {/* Profile Section */}
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 bg-[var(--color-light-opacity40)] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-[var(--color-light-opacity60)]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                      </svg>
                    </div>
                    <h3 className={`${style.font.grotesk.main} text-2xl text-[var(--color-light-opacity100)]`}>
                      {application.name}
                    </h3>
                  </div>

                  {/* View Full Application Link */}
                  <MainButton 
                    onClick={() => handleViewFullApplication(application.id)}
                    variant="ghost"
                    size="sm"
                    className="text-[var(--color-primary-opacity100)] text-base mb-12 text-left justify-start px-0"
                    showIcon={false}
                  >
                    View full application
                  </MainButton>

                  {/* Applied For Section */}
                  <div className="mb-12 flex-1">
                    <p className={`${style.font.mono.text} text-[var(--color-light-opacity100)] text-base mb-6`}>Applied for</p>
                    <span className={`${style.font.mono.text} px-6 py-3 bg-transparent border border-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] rounded-full text-sm`}>
                      {application.role}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-auto">
                    <MainButton
                      onClick={() => handleAcceptApplication(application.id)}
                      variant="primary"
                      size="default"
                      className="flex-1 rounded-full text-center justify-center"
                      showIcon={false}
                    >
                      Accept
                    </MainButton>
                    <MainButton
                      onClick={() => handleDeclineApplication(application.id)}
                      variant="outlineGreen"
                      size="default"
                      className="flex-1 rounded-full text-center justify-center"
                      showIcon={false}
                    >
                      Decline
                    </MainButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State Content */
            <div>
              <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-lg leading-relaxed`}>
                It seems like you don't have any applications yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}