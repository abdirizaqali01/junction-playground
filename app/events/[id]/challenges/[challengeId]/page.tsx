'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import { MainButton } from "@/components/attachables/main-button"
import * as style from '@/styles/design-system'
import { initializeCSSVariables } from '@/styles/design-system'
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

export default function ChallengeDetailPage({ params }: { params: { id: string; challengeId: string } }) {
  const router = useRouter()
  const { data: challengeData, loading, error } = useChallengeWithDetails(params.challengeId)

  //-------------------------------- DESIGN SYSTEM ACTUATOR --------------------------------//
  useEffect(() => {
    initializeCSSVariables();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary-opacity100)] mx-auto mb-4"></div>
              <p className={style.font.mono.text + " text-[var(--color-light-opacity60)]"}>Loading challenge...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !challengeData) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className={style.font.mono.text + " text-[var(--color-alerts-opacity100)] mb-4"}>
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

  const handleBackToChallenges = () => {
    // Use the event ID from params to maintain correct route structure
    router.push(`/events/${params.id}/challenges`)
  }

  const { challenge, organization, event } = challengeData as ChallengeData

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
        {/* Header */}
        <div className="bg-[var(--color-dark-opacity100)] border-b border-[var(--color-white-opacity10)] px-8 py-6">
          <MainButton 
            onClick={handleBackToChallenges}
            variant="ghost"
            size="sm"
            className="mb-6"
            showIcon={false}
          >
            <div className="flex items-center">
              <span className="mr-2">←</span>
              <span>Back To Challenges</span>
            </div>
          </MainButton>
        </div>

        {/* Hero Banner Card with Rounded Corners */}
        <div className="px-8 pt-6">
          <div className="relative h-64 bg-gradient-to-r from-[var(--color-secondary-opacity100)] via-[var(--color-primary-opacity100)] to-[var(--color-primary-opacity60)] flex items-end overflow-hidden rounded-xl">
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-opacity100)] via-[var(--color-primary-opacity100)] to-[var(--color-primary-opacity60)] filter blur-sm"></div>
            <div className="absolute inset-0 bg-[var(--color-dark-opacity40)]"></div>
            
            {/* Text Content - Bottom Left */}
            <div className="relative z-10 p-6 pb-6">
              <div className={style.font.mono.text + " text-sm text-[var(--color-light-opacity100)] mb-2"}>
                {organization.name}
              </div>
              <h1 className={style.font.grotesk.heavy + " text-3xl text-[var(--color-light-opacity100)]"}>
                {challenge.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* The Challenge Section */}
              <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity15)] rounded-xl p-8">
                <h2 className={style.font.grotesk.main + " text-2xl text-[var(--color-light-opacity100)] mb-6"}>
                  The Challenge
                </h2>
                
                <div className={style.font.mono.text + " space-y-4 text-base text-[var(--color-light-opacity60)] leading-relaxed"}>
                  <p>
                    {challenge.description || 'No description available for this challenge.'}
                  </p>
                </div>
              </div>

              {/* Insight */}
              <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity15)] rounded-xl p-8">
                <h2 className={style.font.grotesk.main + " text-2xl text-[var(--color-light-opacity100)] mb-6"}>
                  Insight
                </h2>
                
                <div className={style.font.mono.text + " space-y-4 text-base text-[var(--color-light-opacity60)] leading-relaxed"}>
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
              <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity15)] rounded-xl p-8">
                <h2 className={style.font.grotesk.main + " text-2xl text-[var(--color-light-opacity100)] mb-6"}>
                  What We'll Bring
                </h2>
                
                <div className={style.font.mono.text + " space-y-4 text-base text-[var(--color-light-opacity60)] leading-relaxed"}>
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
              <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity15)] rounded-xl p-6">
                <h3 className={style.font.grotesk.main + " text-xl text-[var(--color-light-opacity100)] mb-4"}>
                  {organization.name}
                </h3>
                
                <div className={style.font.mono.text + " text-sm text-[var(--color-light-opacity60)] leading-relaxed"}>
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
                        className="text-[var(--color-primary-opacity100)] hover:text-[var(--color-primary-opacity60)] transition-colors"
                      >
                        Visit Website →
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Ongoing Criteria */}
              <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity15)] rounded-xl p-6">
                <h3 className={style.font.grotesk.main + " text-xl text-[var(--color-light-opacity100)] mb-4"}>
                  Ongoing Criteria
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={style.font.mono.text + " space-y-4 text-base text-[var(--color-light-opacity60)] leading-relaxed"}>
                      TBD
                    </span>
                  </div>
                </div>
              </div>

              {/* Prizes */}
              <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity15)] rounded-xl p-6">
                <h3 className={style.font.grotesk.main + "  text-xl text-[var(--color-light-opacity100)] mb-4"}>
                  Prizes
                </h3>
                <div className="flex justify-between">
                  <span className={style.font.mono.text + " space-y-4 text-base text-[var(--color-light-opacity60)] leading-relaxed"}>
                    TBD
                  </span>
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-4">
                <MainButton 
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Apply to Challenge
                </MainButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}