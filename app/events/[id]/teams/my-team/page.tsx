'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from "@/components/footer"

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function MyTeamPage() {
  const [activeTab, setActiveTab] = useState('my-team')
  const [hasTeam, setHasTeam] = useState(true) // Change to false to see empty state
  const router = useRouter()

  // Mock team data
  const teamData = {
    name: "Team Name",
    code: "TEAM CODE",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    availableRoles: ["Role name", "Role name", "Role name"],
    members: [
      {
        id: 1,
        name: "John Smith",
        role: "Role",
        avatar: null
      }
    ]
  }

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

  const handleEditTeam = () => {
    console.log('Edit team')
  }

  const handleDeleteTeam = () => {
    console.log('Delete team')
  }

  const handleSeeMoreMember = (memberId) => {
    console.log('See more for member:', memberId)
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
        {/* Header */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-white pt-[3%] ${spaceGrotesk.variable}">
              Team Management
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
          {hasTeam ? (
            <div className="space-y-8">
              {/* Team Name and Code */}
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-2 ${spaceGrotesk.variable}">
                  {teamData.name}
                </h2>
                <p className="text-zinc-300 '${spaceMono.variable}' text-sm tracking-wider">
                  {teamData.code}
                </p>
              </div>

              {/* Team Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 ${spaceGrotesk.variable}">
                  Team Description
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {teamData.description}
                </p>
              </div>

              {/* Available Roles */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 ${spaceGrotesk.variable}">
                  Available roles
                </h3>
                <div className="flex gap-3">
                  {teamData.availableRoles.map((role, index) => (
                    <span
                      key={index}
                      className="px-6 py-2 bg-transparent border border-green-600 text-white rounded-full '${spaceMono.variable}' text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 ${spaceGrotesk.variable}">
                  Team members
                </h3>
                <div className="space-y-3">
                  {teamData.members.map((member) => (
                    <div
                      key={member.id}
                      className="bg-zinc-800/60 rounded-xl p-4 flex items-center justify-between w-full max-w-3xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium text-base">{member.name}</p>
                          <p className="text-zinc-400 text-sm">{member.role}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSeeMoreMember(member.id)}
                        className="text-zinc-400 text-sm hover:text-white transition-colors flex-shrink-0"
                      >
                        See more
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleEditTeam}
                  className="px-4 py-2 bg-transparent border border-zinc-600 text-zinc-300 rounded-full hover:bg-zinc-800 transition-colors text-sm '${spaceMono.variable}'"
                >
                  Edit
                </button>
                <button 
                  onClick={handleDeleteTeam}
                  className="px-4 py-2 bg-transparent border border-zinc-600 text-zinc-300 rounded-full hover:bg-zinc-800 transition-colors text-sm '${spaceMono.variable}'"
                >
                  Delete the team
                </button>
              </div>
            </div>
          ) : (
            /* Empty State Content */
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                  It seems like you don't have a team yet. Here you can create a new team or join already existing one.
                </p>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  )
}