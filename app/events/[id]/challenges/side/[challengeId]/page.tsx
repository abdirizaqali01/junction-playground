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

export default function SideChallengeDetailPage({ params }: { params: { id: string; challengeId: string } }) {
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
    // Add your application logic here
    console.log('Applying to side challenge:', challengeData?.challenge.name)
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
          <Loading message="Loading side challenge..." />
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
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className={`${style.font.mono.text} text-[var(--color-alerts-opacity100)] mb-4`}>
                Error loading side challenge: {error || 'Challenge not found'}
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
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
        {/* Header */}
        <div className="bg-[var(--color-dark-opacity100)] border-b border-[var(--color-white-opacity10)] px-8 py-4">
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

        {/* SIDE CHALLENGE DESIGN - Different layout starts here */}
        <div className="px-8 pt-6">
          {/* Compact Header Card */}
          <div className={`${style.box.gray.bottom} p-6 mb-8`}>
            <div className="flex items-center gap-6">
              <div className={`w-24 h-24 ${style.border.radius.inner} flex items-center justify-center text-[var(--color-light-opacity100)] text-xl font-bold flex-shrink-0 bg-[var(--color-primary-opacity20)] border border-[var(--color-primary-opacity40)]`}>
                SC
              </div>
              <div className="flex-1">
                <div className={`${style.font.mono.text} text-sm text-[var(--color-primary-opacity100)] mb-1`}>
                  Side Challenge • {organization.name}
                </div>
                <h1 className={`${style.font.grotesk.heavy} text-2xl text-[var(--color-light-opacity100)] mb-2`}>
                  {challenge.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className={`${style.font.mono.text} px-3 py-1 ${style.border.radius.inner} text-xs bg-[var(--color-secondary-opacity20)] text-[var(--color-secondary-opacity100)] border border-[var(--color-secondary-opacity40)]`}>
                    {event.name}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <MainButton 
                  variant="primary"
                  size="default"
                  onClick={handleApplyToChallenge}
                >
                  Apply Now
                </MainButton>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Single Column Layout */}
        <div className="flex-1 px-8 pb-8">
          <div className=" space-y-6">
            {/* Challenge Description */}
            <div className={`${style.box.gray.bottom} p-6`}>
              <h2 className={`${style.font.grotesk.main} text-xl text-[var(--color-light-opacity100)] mb-4`}>
                Side Challenge Overview
              </h2>
              <div className={`${style.font.mono.text} text-[0.82rem] text-[var(--color-light-opacity80)] leading-relaxed`}>
                <p>
                  {challenge.description || 'No description available for this side challenge.'}
                </p>
              </div>
            </div>


            {/* Requirements & Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`${style.box.gray.bottom} p-6`}>
                <h3 className={`${style.font.grotesk.main} text-lg text-[var(--color-light-opacity100)] mb-4`}>
                  Requirements
                </h3>
                <div className={`${style.font.mono.text} text-sm text-[var(--color-light-opacity60)] space-y-2`}>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-primary-opacity100)]">•</span>
                    <span>Basic programming knowledge</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-primary-opacity100)]">•</span>
                    <span>Access to development environment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-primary-opacity100)]">•</span>
                    <span>Creative problem-solving mindset</span>
                  </div>
                </div>
              </div>

              <div className={`${style.box.gray.bottom} p-6`}>
                <h3 className={`${style.font.grotesk.main} text-lg text-[var(--color-light-opacity100)] mb-4`}>
                  Judging Criteria
                </h3>
                <div className={`${style.font.mono.text} text-sm text-[var(--color-light-opacity60)] space-y-2`}>
                  <div className="flex justify-between">
                    <span>Innovation</span>
                    <span className="text-[var(--color-primary-opacity100)]">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Implementation</span>
                    <span className="text-[var(--color-primary-opacity100)]">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Presentation</span>
                    <span className="text-[var(--color-primary-opacity100)]">30%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prizes */}
            <div className={`${style.box.gray.bottom} p-6`}>
              <h3 className={`${style.font.grotesk.main} text-lg text-[var(--color-light-opacity100)] mb-4`}>
                Prizes & Recognition
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[var(--color-primary-opacity10)] border border-[var(--color-primary-opacity20)] rounded-lg">
                  <div className={`${style.font.grotesk.heavy} text-xl text-[var(--color-primary-opacity100)] mb-1`}>🥇</div>
                  <div className={`${style.font.mono.text} text-sm text-[var(--color-light-opacity100)] mb-1`}>1st Place</div>
                  <div className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity60)]`}>TBD</div>
                </div>
                <div className="text-center p-4 bg-[var(--color-secondary-opacity10)] border border-[var(--color-secondary-opacity20)] rounded-lg">
                  <div className={`${style.font.grotesk.heavy} text-xl text-[var(--color-secondary-opacity100)] mb-1`}>🥈</div>
                  <div className={`${style.font.mono.text} text-sm text-[var(--color-light-opacity100)] mb-1`}>2nd Place</div>
                  <div className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity60)]`}>TBD</div>
                </div>
                <div className="text-center p-4 bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity20)] rounded-lg">
                  <div className={`${style.font.grotesk.heavy} text-xl text-[var(--color-light-opacity80)] mb-1`}>🥉</div>
                  <div className={`${style.font.mono.text} text-sm text-[var(--color-light-opacity100)] mb-1`}>3rd Place</div>
                  <div className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity60)]`}>TBD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}