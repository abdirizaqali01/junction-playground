'use client'

import { useState } from 'react'
import { Footer } from '@/components/footer'
import { JunctionLogo } from '@/components/logo'

interface TeamMember {
  id: number
  name: string
  role: string
  avatar: string
}

const TEAM_DATA = {
  navigation: {
    tabs: { all: "ALL TEAMS", my: "MY TEAM", candidates: "TEAM CANDIDATES", challenges: "ALL CHALLENGES" }
  },
  team: {
    name: "Name of team",
    code: "TEAM CODE",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    roles: ["Role name", "Role name", "Role name"],
    members: [{ id: 1, name: 'John Smith', role: 'Role', avatar: '' }]
  },
  noTeam: {
    message: "It seems like you don't have a team yet. Here you can create a new team or join already existing one.",
    joinText: "Join an existing team",
    createText: "Create a new team"
  },
  join: {
    title: "Join a team using a code",
    description: "If one of your team members has already created a team, all you need to do is fill in the team code here.",
    placeholder: "Your team code here"
  },
  create: {
    title: "Create a new team",
    subtitle: "Fields marked with * are required"
  },
  sections: {
    teamCode: "TEAM CODE",
    availableRoles: "Available roles", 
    teamMembers: "Team members"
  },
  actions: { edit: "EDIT", delete: "DELETE THE TEAM", seeMore: "See more" },
  deleteModal: {
    title: "Delete Team",
    message: "Are you sure you want to delete this team? This action cannot be undone.",
    confirm: "Delete",
    cancel: "Cancel"
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

export default function TeamAdminPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'candidates'>('my')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [teamCode, setTeamCode] = useState('')
  const [createFormData, setCreateFormData] = useState(DEFAULT_FORM)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_DATA.team.members)
  const [hasTeam, setHasTeam] = useState(false)

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

  const handleCreateTeam = () => {
    console.log('Creating team with data:', createFormData)
    setShowCreateForm(false)
    setHasTeam(true)
  }

  const handleJoinTeam = () => {
    console.log('Joining team with code:', teamCode)
    setShowJoinForm(false)
    setTeamCode('')
  }

  const confirmDelete = () => {
    setHasTeam(false)
    setTeamMembers([])
    setShowDeleteConfirm(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
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
                {TEAM_DATA.navigation.tabs[tab]}
              </button>
            ))}
          </div>
          <button className="text-xs font-['Space_Mono'] font-medium tracking-wider text-white/60 hover:text-white/80">
            {TEAM_DATA.navigation.tabs.challenges}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {hasTeam ? (
          /* Team View */
          <>
            <div className="mb-8 max-w-4xl">
              <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-white mb-4">{TEAM_DATA.team.name}</h1>
              <h2 className="text-sm font-['Space_Mono'] font-medium tracking-wider text-white/60 mb-4">{TEAM_DATA.sections.teamCode}</h2>
              <p className="text-white/60 text-sm leading-relaxed">{TEAM_DATA.team.description}</p>
            </div>

            <div className="mb-12 max-w-4xl">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">{TEAM_DATA.sections.availableRoles}</h2>
              <div className="flex flex-wrap gap-3">
                {TEAM_DATA.team.roles.map((role, index) => (
                  <button key={index} className="px-4 py-2 bg-transparent border border-green-600/40 text-green-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors">
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-12 max-w-4xl">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">{TEAM_DATA.sections.teamMembers}</h2>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
                        <span className="text-white/50 text-sm">JS</span>
                      </div>
                      <div>
                        <h3 className="text-white font-['Space_Grotesk'] font-medium">{member.name}</h3>
                        <p className="text-white/50 text-sm">{member.role}</p>
                      </div>
                    </div>
                    <button className="text-white/50 hover:text-white/70 text-sm font-['Space_Mono'] transition-colors">
                      {TEAM_DATA.actions.seeMore}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 max-w-4xl">
              <button className="px-6 py-2 bg-transparent border border-white/25 text-white/80 text-sm font-['Space_Mono'] rounded-full hover:bg-white/5 transition-colors">
                {TEAM_DATA.actions.edit}
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-2 bg-transparent border border-red-600/40 text-red-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-red-600/10 transition-colors"
              >
                {TEAM_DATA.actions.delete}
              </button>
            </div>
          </>
        ) : showCreateForm ? (
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
          /* No Team State */
          <div className="py-12 pb-32">
            <p className="text-white/60 text-base mb-12 max-w-2xl">{TEAM_DATA.noTeam.message}</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setShowJoinForm(!showJoinForm)}
                className="px-6 py-2 bg-transparent border border-green-600/40 text-green-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors"
              >
                {TEAM_DATA.noTeam.joinText}
              </button>
              <button 
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-2 bg-green-600 text-white text-sm font-['Space_Mono'] rounded-full hover:bg-green-700 transition-colors"
              >
                {TEAM_DATA.noTeam.createText}
              </button>
            </div>

            {showJoinForm && (
              <div className="mt-8 bg-white/5 border border-white/10 rounded-lg p-6 w-full">
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
                    Join team
                  </button>
                  <button 
                    onClick={() => setShowJoinForm(false)}
                    className="px-4 py-2 bg-transparent border border-white/25 text-white/80 text-sm font-['Space_Mono'] rounded-full hover:bg-white/5 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-white/10 rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-4">{TEAM_DATA.deleteModal.title}</h3>
            <p className="text-white/60 text-sm mb-6">{TEAM_DATA.deleteModal.message}</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-transparent border border-white/25 text-white/80 text-sm font-['Space_Mono'] rounded-full hover:bg-white/5 transition-colors"
              >
                {TEAM_DATA.deleteModal.cancel}
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-['Space_Mono'] rounded-full hover:bg-red-700 transition-colors"
              >
                {TEAM_DATA.deleteModal.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}