'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from "@/components/attachables/main-button"
import { useLoading } from '@/components/loading-context'
import * as style from '@/styles/design-system'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function MyTeamPage() {
  const router = useRouter()
  const params = useParams()
  const { setLoading } = useLoading()
  const eventId = params?.id as string
  
  const [activeTab, setActiveTab] = useState('my-team')
  const [hasTeam, setHasTeam] = useState(true) // Change to false to see empty state

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
    setLoading('back-to-dashboard', true)
    router.push(`/events/${eventId}/dash`)
  }

  const handleTabNavigation = (tabId: string) => {
    setActiveTab(tabId)
    switch(tabId) {
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

  const handleViewChallenges = () => {
    setLoading('view-challenges', true)
    router.push(`/events/${eventId}/challenges`)
  }

  const handleEditTeam = () => {
    setLoading('edit-team', true)
    console.log('Edit team')
    // Simulate API call
    setTimeout(() => {
      setLoading('edit-team', false)
    }, 1000)
  }

  const handleDeleteTeam = () => {
    setLoading('delete-team', true)
    console.log('Delete team')
    // Simulate API call
    setTimeout(() => {
      setLoading('delete-team', false)
    }, 1000)
  }

  const handleSeeMoreMember = (memberId: number) => {
    setLoading(`member-${memberId}`, true)
    console.log('See more for member:', memberId)
    // Simulate API call
    setTimeout(() => {
      setLoading(`member-${memberId}`, false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
      <Sidebar
        userProfile={userProfile}
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-0 lg:ml-[250px] px-4 lg:px-10 pt-[100px] lg:pt-10 lg:pb-0 pb-8">
        {/* Header */}
        <div className="">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`${style.font.grotesk.heavy} text-4xl text-[var(--color-light-opacity100)]`}>
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
                  onClick={() => handleTabNavigation(tab.id)}
                  variant={activeTab === tab.id ? 'default' : 'outlineGray'}
                  size="sm"
                  className="text-xs text-center justify-center"
                  showIcon={false}
                >
                  {tab.label}
                </MainButton>
              ))}
            </div>

            {/* FILTER FUNCTION HERE IF NECESSARY */}
          </div>

          {/* Content */}
          {hasTeam ? (
            <div className="space-y-8">
              {/* Team Name and Code */}
              <div>
                <h2 className={`${style.font.grotesk.main} text-2xl text-[var(--color-primary-opacity100)] mb-2`}>
                  {teamData.name}
                </h2>
                <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-sm tracking-wider`}>
                  {teamData.code}
                </p>
              </div>

              {/* Team Description */}
              <div className='w-[100%] lg:w-[80%]'>
                <h3 className={`${style.font.grotesk.medium} text-xl text-[var(--color-light-opacity100)] mb-4`}>
                  Team Description
                </h3>
                <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-[0.85rem] leading-relaxed`}>
                  {teamData.description}
                </p>
              </div>

              {/* Available Roles */}
              <div>
                <h3 className={`${style.font.grotesk.medium} text-xl text-[var(--color-light-opacity100)] mb-4`}>
                  Available roles
                </h3>
                <div className="flex gap-3">
                  {teamData.availableRoles.map((role, index) => (
                    <span
                      key={index}
                      className={`${style.font.mono.text} px-6 py-2 bg-transparent border  border-[var(--color-secondary-opacity100)] text-[var(--color-secondary-opacity100)] ${style.border.radius.middle} text-sm`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3 className={`${style.font.grotesk.medium} text-xl text-[var(--color-light-opacity100)] mb-4`}>
                  Team members
                </h3>
                <div className="space-y-3">
                  {teamData.members.map((member) => (
                    <div
                      key={member.id}
                      className={`${style.box.gray.bottom} p-4 flex items-center justify-between w-full max-w-3xl`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-[var(--color-light-opacity40)] ${style.border.radius.full} flex items-center justify-center flex-shrink-0`}>
                          <span className={`${style.font.mono.text} text-[var(--color-dark-opacity100)] text-sm font-medium`}>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className={`${style.font.grotesk.medium} text-[var(--color-light-opacity100)] text-base`}>{member.name}</p>
                          <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-sm`}>{member.role}</p>
                        </div>
                      </div>
                      <MainButton 
                        onClick={() => handleSeeMoreMember(member.id)}
                        variant="ghost"
                        size="sm"
                        className="text-center justify-center"
                        showIcon={false}
                      >
                        View Profile
                      </MainButton>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <MainButton 
                  onClick={handleEditTeam}
                  variant="default"
                  size="sm"
                  className="text-center justify-center"
                  showIcon={false}
                >
                  Edit
                </MainButton>
                <MainButton 
                  onClick={handleDeleteTeam}
                  variant="alerts"
                  size="sm"
                  className="text-center justify-center"
                  showIcon={false}
                >
                  Delete the team
                </MainButton>
              </div>
            </div>
          ) : (
            /* Empty State Content */
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-lg leading-relaxed max-w-2xl`}>
                  It seems like you don't have a team yet. Here you can create a new team or join already existing one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}