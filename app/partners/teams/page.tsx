'use client'

import React, { useMemo, useState } from 'react'
import SearchBar from '@/components/Bar/SearchBar'
import PartnerLayout from '@/components/partner/layout/PartnerLayout'
import { ParticipantsTable } from '@/components/partner/tables/ParticipantsTable'
import {
  PartnerButton,
  partnerAccents,
  partnerText,
} from '@/styles/design-system'
import { useProjects } from '@/hooks/useProjects'
import { withVars } from '@/components/partner/utils/style'

export default function TeamsPage() {
  const { projects } = useProjects()
  const [searchQuery, setSearchQuery] = useState('')

  const participants = useMemo(() => {
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
    return participants.filter((participant) =>
      [participant.name, participant.email, participant.team, participant.role ?? '']
        .some((value) => value.toLowerCase().includes(query))
    )
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
      .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(','))
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
    <PartnerLayout forcedActivePath="/partners/teams" maxWidth="1200px">
      <header>
        <h1
          className="text-3xl font-semibold"
          style={{ color: partnerText.primary }}
        >
          Your Participants
        </h1>
      </header>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-[400px]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search participants..."
          />
        </div>
        <PartnerButton
          variant="ghost"
          onClick={handleExport}
          className="border self-start sm:self-auto hover:bg-[var(--export-hover)]"
          style={withVars(
            {
              borderColor: partnerAccents.solid,
              color: partnerAccents.solid,
            },
            { '--export-hover': partnerAccents.tint }
          )}
        >
          Export
        </PartnerButton>
      </div>

      <p
        className="mt-3 text-sm"
        style={{ color: partnerText.secondary }}
      >
        <span
          className="font-semibold"
          style={{ color: partnerAccents.solid }}
        >
          {participants.length}
        </span>{' '}
        {participants.length === 1
          ? 'participant in total'
          : 'participants in total'}
      </p>

      <ParticipantsTable
        participants={participants}
        filteredParticipants={filteredParticipants}
        searchQuery={searchQuery}
      />
    </PartnerLayout>
  )
}
