'use client'

import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from "@/components/footer"
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

// Define your navigation data
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
        isActive: true,
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
    id: 'hackathon',
    title: 'During Hackathon',
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
        id: 'mentor-meetings',
        label: 'Mentor Meetings',
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
  avatarColor: 'bg-red-500'
}

export default function ChallengeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: challengeData, loading, error } = useChallengeWithDetails(params.id)

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleBackToChallenges = () => {
    router.push('/challenges')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar
          navigationSections={navigationSections}
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading challenge...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !challengeData) {
    return (
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar
          navigationSections={navigationSections}
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error loading challenge: {error || 'Challenge not found'}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-emerald-500 text-black rounded hover:bg-emerald-400 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { challenge, organization, event } = challengeData as ChallengeData

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
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
        {/* Header */}
        <div className="bg-black border-b border-white/10 px-8 py-6">
          <button 
            onClick={handleBackToChallenges}
            className="flex items-center text-white/60 hover:text-white text-sm mb-6"
          >
            <span className="mr-2">←</span>
            Back To Challenges
          </button>
        </div>

        {/* Hero Banner Card with Rounded Corners */}
        <div className="px-8 pt-6">
          <div className="relative h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 flex items-end overflow-hidden rounded-xl">
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 filter blur-sm"></div>
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Text Content - Bottom Left */}
            <div className="relative z-10 p-6 pb-6">
              <div className="text-sm text-white/90 mb-2 font-mono">{organization.name}</div>
              <h1 className="text-3xl font-bold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
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
              <div className="bg-white/10 border border-white/15 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  The Challenge
                </h2>
                
                <div className="space-y-4 text-base text-white/80 leading-relaxed font-mono">
                  <p>
                    {challenge.description || 'No description available for this challenge.'}
                  </p>
                </div>
              </div>

              {/* Insight */}
              <div className="bg-white/10 border border-white/15 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Insight
                </h2>
                
                <div className="space-y-4 text-base text-white/80 leading-relaxed font-mono">
                  <p>
                    <span className="space-y-4 text-base text-white/80 leading-relaxed font-mono">TBD</span>
                  </p>
                  {challenge.updated_at !== challenge.created_at && (
                    <p>
                      <span className="text-green-400">Last Updated:</span> {new Date(challenge.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              {/*  What We'll Bring */}
              <div className="bg-white/10 border border-white/15 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  What We'll Bring
                </h2>
                
                <div className="space-y-4 text-base text-white/80 leading-relaxed font-mono">
                  <p>
                    <span className="space-y-4 text-base text-white/80 leading-relaxed font-mono">TBD</span>
                  </p>
                  {challenge.updated_at !== challenge.created_at && (
                    <p>
                      <span className="text-green-400">Last Updated:</span> {new Date(challenge.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organization Info Card */}
              <div className="bg-white/10 border border-white/15 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  {organization.name}
                </h3>
                
                <div className="text-sm text-white/80 leading-relaxed font-mono">
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
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        Visit Website →
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Ongoing Criteria*/}
              <div className="bg-white/10 border border-white/15 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Ongoing Criteria
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="space-y-4 text-base text-white/80 leading-relaxed font-mono">TBD</span>
                  </div>
                </div>

              </div>

              

              {/* Prizes */}
              <div className="bg-white/10 border border-white/15 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Prizes
                </h3>
                                  <div className="flex justify-between">
                    <span className="space-y-4 text-base text-white/80 leading-relaxed font-mono">TBD</span>
                  </div>
              
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}