'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from "@/components/footer"

// Define your navigation data for sidebar
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
        isActive: true,
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
    id: 'in-progress',
    title: 'In Progress',
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
        id: 'meetings',
        label: 'Meetings',
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
        navigationSections={navigationSections}
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-72">
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
                <h2 className="text-2xl font-bold text-green-400 mb-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  {teamData.name}
                </h2>
                <p className="text-zinc-300 font-mono text-sm tracking-wider">
                  {teamData.code}
                </p>
              </div>

              {/* Team Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Team Description
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {teamData.description}
                </p>
              </div>

              {/* Available Roles */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Available roles
                </h3>
                <div className="flex gap-3">
                  {teamData.availableRoles.map((role, index) => (
                    <span
                      key={index}
                      className="px-6 py-2 bg-transparent border border-green-600 text-white rounded-full font-mono text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
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
                  className="px-4 py-2 bg-transparent border border-zinc-600 text-zinc-300 rounded-full hover:bg-zinc-800 transition-colors text-sm font-mono"
                >
                  Edit
                </button>
                <button 
                  onClick={handleDeleteTeam}
                  className="px-4 py-2 bg-transparent border border-zinc-600 text-zinc-300 rounded-full hover:bg-zinc-800 transition-colors text-sm font-mono"
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