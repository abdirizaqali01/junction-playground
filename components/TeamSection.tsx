import React from 'react'

interface TeamMember {
  name: string
  email?: string
  showProfile: boolean
}

interface TeamSectionProps {
  members: TeamMember[]
}

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-4">
      <h3 className="text-white font-medium mb-3">Team</h3>
      <div className="space-y-2">
        {members.map((member, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-white/70 text-sm">{member.name}</span>
            {member.showProfile && (
              <button className="text-emerald-400 text-xs hover:text-emerald-300 transition-colors">
                view profile
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}