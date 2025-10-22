'use client'

import React, { useMemo, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import Sidebar from '@/components/partner/navigation/Sidebar'
import SearchBar from '@/components/Bar/SearchBar'
import { PartnerButton } from '@/components/partner/designSystem'
import { useProjects } from '@/hooks/useProjects'
import { cn } from '@/lib/utils'

type Participant = {
  name: string
  email: string
  team: string
  role?: string
  linkedin?: string
  showProfile: boolean
}

export default function TeamsPage() {
  const { projects } = useProjects()
  const [searchQuery, setSearchQuery] = useState('')

  const participants = useMemo<Participant[]>(() => {
    return projects.flatMap((project) =>
      project.teamMembers.map((member) => ({
        name: member.name,
        email: member.email,
        team: project.team,
        role: member.role,
        linkedin: member.linkedin,
        showProfile: member.showProfile,
      }))
    )
  }, [projects])

  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return participants
    const query = searchQuery.toLowerCase()
    return participants.filter((participant) => {
      return (
        participant.name.toLowerCase().includes(query) ||
        participant.email.toLowerCase().includes(query) ||
        participant.team.toLowerCase().includes(query) ||
        (participant.role?.toLowerCase().includes(query) ?? false)
      )
    })
  }, [participants, searchQuery])

  const handleExport = () => {
    if (participants.length === 0) return
    const header = ['Name', 'Email', 'Team', 'Role', 'LinkedIn']
    const rows = participants.map((participant) => [
      participant.name,
      participant.email,
      participant.team,
      participant.role ?? '',
      participant.linkedin ?? '',
    ])
    const csv = [header, ...rows]
      .map((columns) =>
        columns
          .map((value) => {
            const escaped = value.replace(/"/g, '""')
            return `"${escaped}"`
          })
          .join(',')
      )
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'participants.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white">
      <div className="fixed top-0 left-0 z-50 h-screen">
        <Sidebar />
      </div>

      <main
        className="flex flex-1 justify-center"
        style={{ marginLeft: 'var(--partner-sidebar-width)' }}
      >
        <div className="w-full max-w-[1200px] px-[4%] py-[3%]">
          <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[min(720px,100%)]">
              <h1 className="text-3xl font-semibold text-white">Your Participants</h1>
              <div className="mt-4">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search participants..."
                />
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <p className="text-sm text-white/60">
                <span className="font-semibold text-[#55D186]">{participants.length}</span>{' '}
                {participants.length === 1 ? 'participant in total' : 'participants in total'}
              </p>
              <PartnerButton
                variant="ghost"
                onClick={handleExport}
                className="whitespace-nowrap border border-[#55D186] text-[#55D186] hover:bg-[#55D186]/10"
              >
                Export
              </PartnerButton>
            </div>
          </header>

          <section className="mt-8">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
              <div className="grid grid-cols-[2fr,2.4fr,1.8fr,1.6fr,1.2fr] gap-4 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.18em] text-white/40">
                <span>Name</span>
                <span>Email</span>
                <span>Team</span>
                <span>Role</span>
                <span className="text-right">LinkedIn</span>
              </div>
              {filteredParticipants.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-white/50">
                  No participants match “{searchQuery}”.
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {filteredParticipants.map((participant, index) => (
                    <div
                      key={`${participant.email}-${participant.team}-${index}`}
                      className={cn(
                        'grid grid-cols-[2fr,2.4fr,1.8fr,1.6fr,1.2fr] items-center gap-4 px-6 py-4 text-sm',
                        'transition-colors hover:bg-white/5'
                      )}
                    >
                      <span className="text-white/90">{participant.name}</span>
                      <span className="truncate text-white/60">{participant.email}</span>
                      <span className="text-white/70">{participant.team}</span>
                      <span className="text-white/60">
                        {participant.role ?? '—'}
                      </span>
                      <span className="flex justify-end">
                        {participant.linkedin ? (
                          <a
                            href={participant.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#55D186] hover:text-[#66F1A0]"
                          >
                            <span className="truncate max-w-[140px] text-xs sm:text-sm">
                              {participant.linkedin.replace(/^https?:\/\//, '')}
                            </span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : (
                          <span className="text-white/30">—</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-4 text-xs text-white/40">
              Showing {filteredParticipants.length} of {participants.length} participants.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
