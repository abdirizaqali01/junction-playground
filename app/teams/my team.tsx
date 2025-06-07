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

export default function TeamAdminPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'candidates'>('my')
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: 'John Smith',
      role: 'Role',
      avatar: ''
    }
  ])
  const [hasTeam, setHasTeam] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSeeMore = (memberId: number) => {
    console.log('See more for member:', memberId)
  }

  const handleEdit = () => {
    console.log('Edit team')
  }

  const handleDeleteTeam = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    // Delete the team and show empty state
    setHasTeam(false)
    setTeamMembers([])
    setShowDeleteConfirm(false)
    console.log('Team deleted')
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">
      {/* Top Bar */}
      <div className="bg-black">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <JunctionLogo />
          
          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-black">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Navigation */}
          <div className="flex items-center space-x-12">
            <button 
              onClick={() => setActiveTab('all')}
              className={`text-xs font-['Space_Mono'] font-medium tracking-wider transition-colors ${
                activeTab === 'all' 
                  ? 'text-white underline' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              ALL TEAMS
            </button>
            <button 
              onClick={() => setActiveTab('my')}
              className={`text-xs font-['Space_Mono'] font-medium tracking-wider transition-colors ${
                activeTab === 'my' 
                  ? 'text-white underline' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              MY TEAM
            </button>
            <button 
              onClick={() => setActiveTab('candidates')}
              className={`text-xs font-['Space_Mono'] font-medium tracking-wider transition-colors ${
                activeTab === 'candidates' 
                  ? 'text-white underline' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              TEAM CANDIDATES
            </button>
          </div>
          
          {/* Right Navigation */}
          <div>
            <button className="text-xs font-['Space_Mono'] font-medium tracking-wider text-white/60 hover:text-white/80 transition-colors">
              ALL CHALLENGES
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {hasTeam ? (
          <>
            {/* Team Name */}
            <div className="mb-8 max-w-4xl">
              <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-white mb-4">Name of team</h1>
              
              {/* Team Code */}
              <div className="mb-8">
                <h2 className="text-sm font-['Space_Mono'] font-medium tracking-wider text-white/60 mb-4">TEAM CODE</h2>
              </div>
              
              {/* Description */}
              <div className="mb-12">
                <p className="text-white/60 text-sm leading-relaxed font-['Inter']">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
              </div>
            </div>

            {/* Available Roles Section */}
            <div className="mb-12 max-w-4xl">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">Available roles</h2>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-transparent border border-green-600/40 text-green-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors">
                  Role name
                </button>
                <button className="px-4 py-2 bg-transparent border border-green-600/40 text-green-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors">
                  Role name
                </button>
                <button className="px-4 py-2 bg-transparent border border-green-600/40 text-green-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors">
                  Role name
                </button>
              </div>
            </div>

            {/* Team Members Section */}
            <div className="mb-12 max-w-4xl">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">Team members</h2>
              
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
                        <span className="text-white/50 text-sm">JS</span>
                      </div>
                      
                      {/* Name and Role */}
                      <div>
                        <h3 className="text-white font-['Space_Grotesk'] font-medium">{member.name}</h3>
                        <p className="text-white/50 text-sm font-['Inter']">{member.role}</p>
                      </div>
                    </div>
                    
                    {/* See More Button */}
                    <button 
                      onClick={() => handleSeeMore(member.id)}
                      className="text-white/50 hover:text-white/70 text-sm font-['Space_Mono'] transition-colors"
                    >
                      See more
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 max-w-4xl">
              <button 
                onClick={handleEdit}
                className="px-6 py-2 bg-transparent border border-white/25 text-white/80 text-sm font-['Space_Mono'] rounded-full hover:bg-white/5 transition-colors"
              >
                EDIT
              </button>
              <button 
                onClick={handleDeleteTeam}
                className="px-6 py-2 bg-transparent border border-red-600/40 text-red-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-red-600/10 transition-colors"
              >
                DELETE THE TEAM
              </button>
            </div>
          </>
        ) : (
          /* No Team State */
          <div className="py-12 pb-32">
            <p className="text-white/60 text-base font-['Inter'] mb-12 max-w-2xl">
              It seems like you don't have a team yet. Here you can create a new team or join already existing one.
            </p>
            
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-transparent border border-green-600/40 text-green-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors">
                Join an existing team
              </button>
              <button className="px-6 py-2 bg-green-600 text-white text-sm font-['Space_Mono'] rounded-full hover:bg-green-700 transition-colors">
                Create a new team
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-white/10 rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-4">Delete Team</h3>
            <p className="text-white/60 text-sm font-['Inter'] mb-6">
              Are you sure you want to delete this team? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 bg-transparent border border-white/25 text-white/80 text-sm font-['Space_Mono'] rounded-full hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-['Space_Mono'] rounded-full hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}