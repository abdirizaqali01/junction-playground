'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from "@/components/footer"
import { MainButton } from "@/components/attachables/main-button"
import { useLoading } from '@/components/loading-context'
import Loading from '@/components/loading'
import * as style from '@/styles/design-system'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

interface Team {
  team_id: number
  event_id: number
  name: string
  description: string
  status: string
  created_at: string
  updated_at: string
  availableRoles?: string[]
}

export default function TeamManagementPage() {
  const router = useRouter()
  const params = useParams()
  const { setLoading } = useLoading()
  const eventId = params?.id as string
  
  const [activeTab, setActiveTab] = useState('all-teams')
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [teamCode, setTeamCode] = useState('')
  const [teams, setTeams] = useState<Team[]>([])
  const [localLoading, setLocalLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch teams for the specific event
  useEffect(() => {
    const fetchTeams = async () => {
      if (!eventId) return

      try {
        setLocalLoading(true)
        setError(null)

        const response = await fetch(`/api/proxy/teams?event_id=${eventId}`, {
          headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.status}`)
        }

        const teamsData = await response.json()
        const teamsArray = Array.isArray(teamsData) ? teamsData : [teamsData]
        
        // Add mock available roles for display purposes
        const teamsWithRoles = teamsArray.map(team => ({
          ...team,
          availableRoles: [
            "UX / UI",
            "Designer", 
            "Data Analitic",
            "Full Stack",
            "C++ Programmer",
          ]
        }))

        setTeams(teamsWithRoles)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch teams')
      } finally {
        setLocalLoading(false)
      }
    }

    fetchTeams()
  }, [eventId])

  const handleBackToHome = () => {
    setLoading('back-to-dashboard', true)
    router.push(`/events/${eventId}/dash`)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    // Navigate to appropriate routes with loading states
    switch (tabId) {
      case 'all-teams':
        setLoading('tab-all-teams', true)
        router.push(`/events/${eventId}/teams`)
        break
      case 'my-team':
        setLoading('tab-my-team', true)
        router.push(`/events/${eventId}/teams/my-team`)
        break
      case 'candidates':
        setLoading('tab-candidates', true)
        router.push(`/events/${eventId}/teams/candidates`)
        break
    }
  }

  const handleApplyToTeam = (teamId: number) => {
    setLoading(`apply-team-${teamId}`, true)
    console.log('Apply to team:', teamId)
    // This will be connected to API later
    // router.push(`/events/${eventId}/teams/${teamId}/apply`)
    
    // Clear loading after a short delay (simulate API call)
    setTimeout(() => {
      setLoading(`apply-team-${teamId}`, false)
    }, 1000)
  }

  const handleJoinWithCode = () => {
    if (teamCode.trim()) {
      setLoading('join-team-code', true)
      console.log('Join team with code:', teamCode)
      setShowJoinModal(false)
      setTeamCode('')
      // API call to join team with code
      
      // Clear loading after simulation
      setTimeout(() => {
        setLoading('join-team-code', false)
      }, 1000)
    }
  }

  // LOADING STATE - Show loading overlay over everything
  if (localLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar
          userProfile={userProfile}
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-0 lg:ml-[250px] px-4 lg:px-10 pt-[100px] lg:pt-10">
          <Loading message="Loading teams..." />
        </div>
      </div>
    )
  }

  // ERROR STATE - Show error overlay over everything
  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar
          userProfile={userProfile}
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-0 lg:ml-[250px] px-4 lg:px-10 pt-[100px] lg:pt-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className={`${style.font.mono.text} text-[var(--color-alerts-opacity100)] mb-4`}>
                Error loading teams: {error}
              </p>
              <MainButton 
                onClick={() => window.location.reload()}
                variant="primary"
                size="default"
                className="text-center justify-center"
              >
                Retry
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAllTeamsView = () => {
    if (teams.length === 0) {
      return (
        <div className="text-center py-12">
          <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-lg`}>
            No teams found for this event.
          </p>
        </div>
      )
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 justify-items-center">
        {teams.map((team) => (
          <div
            key={team.team_id}
            className={`${style.box.gray.bottom} overflow-hidden w-full min-h-fit flex flex-col flex-shrink-0`}
          >
            {/* Muted green image placeholder */}
            <div className="h-16 bg-[var(--color-primary-opacity40)] relative flex-shrink-0">
              {/* Placeholder for future image */}
            </div>

            {/* Card content */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              {/* Top content */}
              <div>
                {/* Team name */}
                <h3 className={`${style.font.grotesk.main} text-xl text-[var(--color-light-opacity100)] mb-3 leading-tight`}>
                  {team.name}
                </h3>

                {/* Description */}
                <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-sm leading-relaxed mb-6`}>
                  {team.description || "Description: this project explores how modern technology can simplify everyday tasks through automation, intuitive interfaces, and real-time data..."}
                </p>

                {/* Team Status */}
                <div className="mb-4">
                  <span className={`${style.font.mono.text} px-2 py-1 text-xs ${style.border.radius.full} ${
                    team.status === 'ACTIVE' 
                      ? 'bg-[var(--color-primary-opacity20)] text-[var(--color-primary-opacity100)] border border-[var(--color-primary-opacity30)]' 
                      : 'bg-[var(--color-light-opacity20)] text-[var(--color-light-opacity60)] border border-[var(--color-light-opacity30)]'
                  }`}>
                    {team.status || 'ACTIVE'}
                  </span>
                </div>

                {/* Available roles */}
                <div className="mb-6">
                  <h4 className={`${style.font.grotesk.medium} text-[var(--color-light-opacity100)] text-sm mb-3`}>
                    Available roles
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {team.availableRoles?.slice(0, 4).map((role, idx) => (
                      <span
                        key={idx}
                        className={`${style.font.mono.text} px-3 py-2 bg-transparent border border-[var(--color-secondary-opacity100)] text-[var(--color-secondary-opacity100)] text-xs ${style.border.radius.middle} text-center whitespace-nowrap`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply button */}
              <MainButton
                onClick={() => handleApplyToTeam(team.team_id)}
                variant="primary"
                size="default"
                className="w-full text-center justify-center"
                showIcon={false}
              >
                Apply
              </MainButton>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // MAIN RENDER - Only shown when not loading and no error
  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
      <Sidebar
        userProfile={userProfile}
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-0 lg:ml-[250px] px-4 lg:px-10 pt-[100px] lg:pt-10">
        {/* Header */}
        <div className="">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`${style.font.grotesk.heavy} text-3xl lg:text-4xl text-[var(--color-light-opacity100)]`}>
              Team Management
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
                  onClick={() => handleTabChange(tab.id)}
                  variant={activeTab === tab.id ? 'default' : 'outlineGray'}
                  size="sm"
                  className="text-xs text-center justify-center"
                  showIcon={false}
                >
                  {tab.label}
                </MainButton>
              ))}
            </div>
            
            <MainButton 
              onClick={() => setShowJoinModal(true)}
              variant="outlineGreen"
              size="sm"
              className={`${style.border.radius.full} text-center justify-center`}
              showIcon={false}
            >
              Join a team using a code
            </MainButton>
          </div>

          {/* Content */}
          {renderAllTeamsView()}
        </div>

        <Footer />
      </div>

      {/* Join Team Popup */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-[var(--color-dark-opacity50)] flex items-center justify-center z-50">
          <div className={`${style.box.gray.solid} p-6 max-w-md w-full mx-4`}>
            <h3 className={`${style.font.grotesk.main} text-xl text-[var(--color-light-opacity100)] mb-4`}>
              Join a team using a code
            </h3>
            <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-sm mb-6`}>
              If one of your team members has already created a team, all you need to do is fill in the team code here.
            </p>
            
            <div className="space-y-4">
              <input
                type="text"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
                placeholder="Your team code here"
                className={`${style.font.mono.text} w-full bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] ${style.border.radius.middle} px-4 py-3 text-[var(--color-light-opacity100)] placeholder-[var(--color-light-opacity40)] focus:outline-none focus:border-[var(--color-primary-opacity100)] ${style.perf.transition.fast}`}
              />
              
              <div className="flex gap-3 justify-end">
                <MainButton 
                  onClick={() => setShowJoinModal(false)}
                  variant="outlineGray"
                  size="sm"
                  className="text-center justify-center"
                  showIcon={false}
                >
                  Cancel
                </MainButton>
                <MainButton 
                  onClick={handleJoinWithCode}
                  variant="primary"
                  size="sm"
                  disabled={!teamCode.trim()}
                  className="disabled:opacity-50 disabled:cursor-not-allowed text-center justify-center"
                  showIcon={false}
                >
                  Join Team
                </MainButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}