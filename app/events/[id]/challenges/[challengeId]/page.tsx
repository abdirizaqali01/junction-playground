'use client'

import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from "@/components/attachables/main-button"
import { useLoading } from '@/components/loading-context'
import Loading from '@/components/loading'
import * as style from '@/styles/design-system'
import { useChallengeWithDetails } from '@/app/hooks/useApi'

interface Challenge {
  challenge_id: number
  event_id: number
  organization_id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

interface Organization {
  organization_id: number
  name: string
  slug: string
  logo_url?: string
  description?: string
  website_url?: string
}

interface ChallengeData {
  challenge: Challenge
  organization: Organization
  event: {
    event_id: number
    name: string
  }
}

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function ChallengeDetailPage({ params }: { params: { id: string; challengeId: string } }) {
  const router = useRouter()
  const { setLoading } = useLoading()
  const { data: challengeData, loading, error } = useChallengeWithDetails(params.challengeId)

  const handleBackToChallenges = () => {
    // Use the event ID from params to maintain correct route structure
    setLoading('back-to-challenges', true)
    router.push(`/events/${params.id}/challenges`)
  }

  const handleBackToHome = () => {
    setLoading('back-to-home', true)
    router.push('/dash')
  }

  const handleApplyToChallenge = () => {
    setLoading('apply-challenge', true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
          <Loading message="Loading challenge..." />
        </div>
      </div>
    )
  }

  if (error || !challengeData) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-0 lg:ml-[250px] px-4 lg:px-10 pt-[100px] lg:pt-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className={`${style.font.mono.text} text-[var(--color-alerts-opacity100)] mb-4`}>
                Error loading challenge: {error || 'Challenge not found'}
              </p>
              <MainButton 
                onClick={() => window.location.reload()}
                variant="primary"
                size="default"
              >
                Retry
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { challenge, organization, event } = challengeData as ChallengeData

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
        {/* Header */}
        <div className="bg-[var(--color-dark-opacity100)] border-[var(--color-white-opacity10)]">
          <MainButton 
            onClick={handleBackToChallenges}
            variant="ghost"
            size="none"
            className="mb-0"
            showIcon={false}
          >
            <div className="flex items-center">
              <span className="mr-2">←</span>
              <span>Back To Challenges</span>
            </div>
          </MainButton>
        </div>

        {/* Hero Banner Card with Rounded Corners */}
        <div className="py-8">
          <div className={`relative h-64 bg-gradient-to-r from-[var(--color-secondary-opacity100)] via-[var(--color-primary-opacity100)] to-[var(--color-primary-opacity60)] flex items-end overflow-hidden ${style.border.radius.outer}`}>
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-opacity100)] via-[var(--color-primary-opacity100)] to-[var(--color-primary-opacity60)] filter blur-sm"></div>
            <div className="absolute inset-0 bg-[var(--color-dark-opacity40)]"></div>
            
            {/* Text Content - Bottom Left */}
            <div className="relative z-10 p-6 pb-6">
              <div className={`${style.font.mono.text} text-sm text-[var(--color-light-opacity100)] mb-2`}>
                {organization.name}
              </div>
              <h1 className={`${style.font.grotesk.heavy} text-3xl text-[var(--color-light-opacity100)]`}>
                {challenge.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* The Challenge Section */}
              <div className={`${style.box.gray.bottom} p-8`}>
                <h2 className={`${style.font.grotesk.main} text-xl text-[var(--color-light-opacity100)] mb-4`}>
                  The Challenge
                </h2>
                
                <div className={`${style.font.mono.text} space-y-4 text-[0.82rem] text-[var(--color-white-opacity60)]`}>
                  <p>
                    {challenge.description || 'No description available for this challenge.'}
                  </p>
                </div>
              </div>

              {/* Insight */}
              <div className={`${style.box.gray.bottom} p-8`}>
                <h2 className={`${style.font.grotesk.main} text-xl text-[var(--color-light-opacity100)] mb-6`}>
                  Insight
                </h2>
                
                <div className={`${style.font.mono.text} space-y-4 text-[0.82rem] text-[var(--color-light-opacity60)] leading-relaxed`}>
                  <p>
                    <span>TBD</span>
                  </p>
                  {challenge.updated_at !== challenge.created_at && (
                    <p>
                      <span className="text-[var(--color-primary-opacity100)]">Last Updated:</span> {new Date(challenge.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* What We'll Bring */}
              <div className={`${style.box.gray.bottom} p-8`}>
                <h2 className={`${style.font.grotesk.main} text-xl text-[var(--color-light-opacity100)] mb-6`}>
                  What We'll Bring
                </h2>
                
                <div className={`${style.font.mono.text} space-y-4 text-[0.82rem] text-[var(--color-light-opacity60)] leading-relaxed`}>
                  <p>
                    <span>TBD</span>
                  </p>
                  {challenge.updated_at !== challenge.created_at && (
                    <p>
                      <span className="text-[var(--color-primary-opacity100)]">Last Updated:</span> {new Date(challenge.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organization Info Card */}
              <div className={`${style.box.gray.bottom} p-6`}>
                <h3 className={`${style.font.grotesk.main} text-xl text-[var(--color-light-opacity100)] mb-4`}>
                  {organization.name}
                </h3>
                
                <div className={`${style.font.mono.text} text-[0.82rem] text-[var(--color-light-opacity60)] leading-relaxed`}>
                  {organization.description ? (
                    <p className="mb-4">{organization.description}</p>
                  ) : (
                    <p className="mb-4">
                      This challenge is sponsored by {organization.name}. 
                      Visit their website to learn more about their mission and values.
                    </p>
                  )}
                  
                  {organization.website_url && (
                    <p>
                      <a 
                        href={organization.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-[var(--color-primary-opacity100)] hover:text-[var(--color-primary-opacity60)] ${style.perf.transition.fast}`}
                      >
                        Visit Website →
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Ongoing Criteria */}
              <div className={`${style.box.gray.bottom} p-6`}>
                <h3 className={`${style.font.grotesk.main} text-xl text-[var(--color-light-opacity100)] mb-4`}>
                  Ongoing Criteria
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`${style.font.mono.text} space-y-4 text-[0.82rem] text-[var(--color-light-opacity60)] leading-relaxed`}>
                      TBD
                    </span>
                  </div>
                </div>
              </div>

              {/* Prizes */}
              <div className={`${style.box.gray.bottom} p-6`}>
                <h3 className={`${style.font.grotesk.main} text-xl text-[var(--color-light-opacity100)] mb-4`}>
                  Prizes
                </h3>
                <div className="flex justify-between">
                  <span className={`${style.font.mono.text} space-y-4 text-[0.82rem] text-[var(--color-light-opacity60)] leading-relaxed`}>
                    TBD
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Apply Button - MOVED OUTSIDE THE GRID */}
          <div className={`${style.box.gray.bottom} p-6 mt-8`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`${style.font.mono.text} text-sm text-[var(--color-light-opacity60)] mb-1`}>
                  Ready to take on this challenge?
                </div>
                <div className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity40)]`}>
                  Last updated: {new Date(challenge.updated_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-3">
                <MainButton 
                  variant="primary"
                  size="default"
                  showIcon={false}
                  onClick={handleApplyToChallenge}
                >
                  Select Challenge
                </MainButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}