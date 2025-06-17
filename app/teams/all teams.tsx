'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

interface TeamCard {
  id: number
  name: string
  type: 'available' | 'working'
  description?: string
  availableRoles: string[]
}

const TEAM_DATA = {
  pageTitle: "Team management",
  navigation: {
    all: "ALL TEAMS",
    my: "MY TEAM", 
    candidates: "TEAM CANDIDATES",
    challenges: "ALL CHALLENGES"
  },
  teams: [] as TeamCard[],
  emptyState: "It seems like you don't have a team yet. Here you can create a new team or join already existing one.",
  join: {
    title: "Join a team using a code",
    description: "If one of your team members has already created a team, all you need to do is fill in the team code here.",
    placeholder: "Your team code here",
    button: "Join team",
    close: "Close",
    noTeams: "No teams found"
  },
  create: {
    title: "Create a new team",
    subtitle: "Fields marked with * are required"
  },
  buttons: {
    joinExisting: "Join an existing team",
    createNew: "Create a new team"
  },
  labels: {
    workingOn: "Working on",
    availableRoles: "Available roles"
  }
}

const FORM_FIELDS = [
  { key: 'teamName', label: 'Team name *', placeholder: 'Awesome team', description: 'Write a name for your team' },
  { key: 'challenge', label: 'Challenge', placeholder: 'Select challenge', type: 'select', description: 'Select one of the challenges' },
  { key: 'subtitle', label: 'Subtitle', placeholder: 'Solving problems with code', description: 'Write a subtitle for your team' },
  { key: 'briefDescription', label: 'Brief description about your team', placeholder: 'Our team is...', type: 'textarea', description: 'Share what your team is about' },
  { key: 'ideaTitle', label: 'Title of the idea explored by your team', placeholder: 'Great idea 1.0', description: 'Write a title for your idea' },
  { key: 'ideaExplanation', label: 'Brief explanation of the idea explored by your team', placeholder: 'Our team is working on...', type: 'textarea', description: 'Explain your idea in a few sentences' },
  { key: 'availableRoles', label: 'Available roles in your team (optional)', placeholder: 'Select...', type: 'select' },
  { key: 'contactEmail', label: "Team's contact email", placeholder: 'team.email@email.com', type: 'email', description: 'Your team must have at least an email, a slack, discord or a telegram channel' },
  { key: 'slack', label: "Team's Slack", placeholder: "Your team's Slack" },
  { key: 'telegram', label: "Team's Telegram", placeholder: "Your team's Telegram" },
  { key: 'discord', label: "Team's Discord", placeholder: "Your team's Discord" }
]

const DEFAULT_FORM = Object.fromEntries(FORM_FIELDS.map(f => [f.key, '']))

export default function TeamManagementPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'candidates'>('all')
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [teamCode, setTeamCode] = useState('')
  const [createFormData, setCreateFormData] = useState(DEFAULT_FORM)

  const handleFormChange = (key: string, value: string) => {
    setCreateFormData(prev => ({ ...prev, [key]: value }))
  }

  const renderFormField = (field: typeof FORM_FIELDS[0]) => {
    const baseClass = "w-full text-white font-['Inter'] placeholder-white/40 focus:outline-none focus:border-green-300/50"
    const value = createFormData[field.key]
    
    if (field.type === 'textarea') {
      return (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => handleFormChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          className={`${baseClass} bg-white/5 border border-white/10 rounded px-3 py-2 resize-none`}
        />
      )
    }
    
    if (field.type === 'select') {
      return (
        <select 
          value={value}
          onChange={(e) => handleFormChange(field.key, e.target.value)}
          className={`${baseClass} bg-white/5 border border-white/10 rounded px-3 py-2`}
        >
          <option>{field.placeholder}</option>
        </select>
      )
    }
    
    return (
      <input
        type={field.type || 'text'}
        value={value}
        onChange={(e) => handleFormChange(field.key, e.target.value)}
        placeholder={field.placeholder}
        className={`${baseClass} bg-transparent border-b border-white/20 pb-2`}
      />
    )
  }

  const handleJoinTeam = () => {
    console.log('Joining team with code:', teamCode)
    setShowJoinForm(false)
    setTeamCode('')
  }

  const handleCreateTeam = () => {
    console.log('Creating team with data:', createFormData)
    setShowCreateForm(false)
    setCreateFormData(DEFAULT_FORM)
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">
      {/* Header */}
      <div className="bg-black">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <JunctionLogo />
          <div className="flex items-center space-x-3">
            <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            {(['all', 'my', 'candidates'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-['Space_Mono'] font-medium tracking-wider transition-colors ${
                  activeTab === tab ? 'text-white underline' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {TEAM_DATA.navigation[tab]}
              </button>
            ))}
          </div>
          <button className="text-xs font-['Space_Mono'] font-medium tracking-wider text-white/60 hover:text-white/80 transition-colors">
            {TEAM_DATA.navigation.challenges}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {TEAM_DATA.teams.length === 0 ? (
          showCreateForm ? (
            /* Create Form */
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 bg-transparent border border-white/25 text-white/80 text-sm font-['Space_Mono'] rounded-full hover:bg-white/5 transition-colors mb-6"
                >
                  Back
                </button>
                <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-white mb-2">{TEAM_DATA.create.title}</h1>
                <p className="text-white/60 text-sm">{TEAM_DATA.create.subtitle}</p>
              </div>

              <div className="space-y-8">
                {FORM_FIELDS.map((field) => (
                  <div key={field.key}>
                    <label className="block text-white font-medium mb-2">{field.label}</label>
                    {field.description && (
                      <p className="text-white/60 text-sm mb-3">{field.description}</p>
                    )}
                    {renderFormField(field)}
                  </div>
                ))}
                
                <div className="pt-8">
                  <button 
                    onClick={handleCreateTeam}
                    className="px-8 py-3 bg-green-600 text-white text-sm font-['Space_Mono'] rounded-full hover:bg-green-700 transition-colors"
                  >
                    Create Team
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-white">{TEAM_DATA.pageTitle}</h1>
              </div>

              <div className="py-12 pb-32">
                <div className="text-center mb-12">
                  <p className="text-white/60 text-base max-w-2xl mx-auto">{TEAM_DATA.emptyState}</p>
                </div>
                
                <div className="flex justify-center gap-4 mb-8">
                  <button 
                    onClick={() => setShowJoinForm(!showJoinForm)}
                    className="px-6 py-2 bg-transparent border border-green-600/40 text-green-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors"
                  >
                    {TEAM_DATA.buttons.joinExisting}
                  </button>
                  <button 
                    onClick={() => setShowCreateForm(true)}
                    className="px-6 py-2 bg-green-600 text-white text-sm font-['Space_Mono'] rounded-full hover:bg-green-700 transition-colors"
                  >
                    {TEAM_DATA.buttons.createNew}
                  </button>
                </div>

                {showJoinForm && (
                  <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-lg p-6">
                    <h3 className="text-lg font-['Space_Grotesk'] font-semibold text-white mb-4">{TEAM_DATA.join.title}</h3>
                    <p className="text-white/60 text-sm mb-6">{TEAM_DATA.join.description}</p>
                    
                    <div className="flex gap-3 mb-4">
                      <input
                        type="text"
                        value={teamCode}
                        onChange={(e) => setTeamCode(e.target.value)}
                        placeholder={TEAM_DATA.join.placeholder}
                        className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-green-300/50"
                      />
                      <button 
                        onClick={handleJoinTeam}
                        disabled={!teamCode.trim()}
                        className="px-6 py-2 bg-green-600 text-white text-sm font-['Space_Mono'] rounded-full hover:bg-green-700 transition-colors disabled:bg-green-600/50"
                      >
                        {TEAM_DATA.join.button}
                      </button>
                      <button 
                        onClick={() => setShowJoinForm(false)}
                        className="px-4 py-2 bg-transparent border border-white/25 text-white/80 text-sm font-['Space_Mono'] rounded-full hover:bg-white/5 transition-colors"
                      >
                        {TEAM_DATA.join.close}
                      </button>
                    </div>
                    
                    <p className="text-white/40 text-xs">{TEAM_DATA.join.noTeams}</p>
                  </div>
                )}
              </div>
            </>
          )
        ) : (
          /* Teams Grid */
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-white">{TEAM_DATA.pageTitle}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEAM_DATA.teams.map((team) => (
                <div key={team.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500"></div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-4">{team.name}</h3>
                    
                    {team.type === 'working' && team.description && (
                      <div className="mb-4">
                        <p className="text-white/60 text-sm mb-2">{TEAM_DATA.labels.workingOn}</p>
                        <p className="text-white/80 text-sm">{team.description}</p>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <p className="text-white/60 text-sm mb-3">{TEAM_DATA.labels.availableRoles}</p>
                      <div className="flex flex-wrap gap-2">
                        {team.availableRoles.map((role, index) => (
                          <button
                            key={index}
                            className="px-4 py-2 bg-transparent border border-green-600/40 text-green-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors"
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}