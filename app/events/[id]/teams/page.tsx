'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from "@/components/footer"

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
  const eventId = params?.id as string
  
  const [activeTab, setActiveTab] = useState('all-teams')
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [teamCode, setTeamCode] = useState('')
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch teams for the specific event
  useEffect(() => {
    const fetchTeams = async () => {
      if (!eventId) return

      try {
        setLoading(true)
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
            "and more..."
          ]
        }))

        setTeams(teamsWithRoles)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch teams')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [eventId])

  const handleBackToHome = () => {
    router.push(`/dash`)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    
    // Navigate to appropriate routes
    switch (tabId) {
      case 'all-teams':
        router.push(`/events/${eventId}/teams`)
        break
      case 'candidates':
        router.push(`/events/${eventId}/teams/candidates`)
        break
      case 'my-team':
        // For now, we'll use a placeholder team ID. This should come from user's actual team
        const userTeamId = 1 // This should be fetched from user's team data
        router.push(`/events/${eventId}/teams/${userTeamId}/myteam`)
        break
    }
  }

  const handleApplyToTeam = (teamId: number) => {
    console.log('Apply to team:', teamId)
    // This will be connected to API later
    // router.push(`/events/${eventId}/teams/${teamId}/apply`)
  }

  const handleJoinWithCode = () => {
    if (teamCode.trim()) {
      console.log('Join team with code:', teamCode)
      setShowJoinModal(false)
      setTeamCode('')
      // API call to join team with code
    }
  }

  const renderAllTeamsView = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading teams...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading teams: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-500 text-black rounded hover:bg-emerald-400 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    if (teams.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No teams found for this event.</p>
        </div>
      )
    }

    return (
      <div className="flex flex-wrap justify-center gap-4">
        {teams.map((team) => (
          <div
            key={team.team_id}
            className="bg-zinc-900/95 rounded-xl overflow-hidden border border-zinc-800/80 w-96 h-[32rem] flex flex-col flex-shrink-0"
          >
            {/* Muted green image placeholder */}
            <div className="h-16 bg-green-800/60 relative flex-shrink-0">
              {/* Placeholder for future image */}
            </div>

            {/* Card content */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              {/* Top content */}
              <div>
                {/* Team name */}
                <h3 className="text-xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {team.name}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {team.description || "Description: this project explores how modern technology can simplify everyday tasks through automation, intuitive interfaces, and real-time data..."}
                </p>

                {/* Team Status */}
                <div className="mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    team.status === 'ACTIVE' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {team.status || 'ACTIVE'}
                  </span>
                </div>

                {/* Available roles */}
                <div className="mb-6">
                  <h4 className="text-white text-sm font-medium mb-3">Available roles</h4>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {team.availableRoles?.slice(0, 4).map((role, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-transparent border border-green-400/80 text-green-400 text-xs rounded-lg font-mono text-center whitespace-nowrap"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="px-3 py-2 bg-transparent border border-green-400/80 text-green-400 text-xs rounded-lg font-mono text-center">
                      {team.availableRoles?.[4]}
                    </span>
                    <span className="px-3 py-2 text-zinc-500 text-xs font-mono text-center flex items-center justify-center">
                      and more...
                    </span>
                  </div>
                </div>
              </div>

              {/* Apply button */}
              <button
                onClick={() => handleApplyToTeam(team.team_id)}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderCandidatesView = () => (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold text-white mb-4">Team Candidates</h3>
      <p className="text-gray-400">This section will show candidates interested in joining teams.</p>
      <p className="text-gray-500 text-sm mt-2">API endpoint not yet available.</p>
    </div>
  )

  const renderMyTeamView = () => (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold text-white mb-4">My Team</h3>
      <p className="text-gray-400">This will redirect to your team's management page.</p>
      <p className="text-gray-500 text-sm mt-2">Route: /events/{eventId}/teams/{teamId}/myteam</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Dashboard"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
        {/* Header */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-white pt-[3%]" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
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
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
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
              onClick={() => setShowJoinModal(true)}
              className="px-6 py-2 bg-transparent border border-green-600 rounded-full text-white hover:bg-green-600/10 transition-colors text-sm font-mono"
            >
              Join a team using a code
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'all-teams' && renderAllTeamsView()}
          {activeTab === 'candidates' && renderCandidatesView()}
          {activeTab === 'my-team' && renderMyTeamView()}
        </div>

        <Footer />
      </div>

      {/* Join Team Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Join a team using a code
            </h3>
            <p className="text-white/60 text-sm mb-6">
              If one of your team members has already created a team, all you need to do is fill in the team code here.
            </p>
            
            <div className="space-y-4">
              <input
                type="text"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
                placeholder="Your team code here"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-green-300/50"
              />
              
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 bg-transparent border border-white/25 text-white/80 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleJoinWithCode}
                  disabled={!teamCode.trim()}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-green-500/50 disabled:cursor-not-allowed"
                >
                  Join Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}