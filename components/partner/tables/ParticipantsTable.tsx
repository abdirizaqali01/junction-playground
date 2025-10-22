'use client'

import React from 'react'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ParticipantRow = {
  name: string
  email: string
  team: string
  role?: string
  linkedin?: string
  showProfile: boolean
}

interface ParticipantsTableProps {
  participants: ParticipantRow[]
  filteredParticipants: ParticipantRow[]
  searchQuery: string
}

export function ParticipantsTable({
  participants,
  filteredParticipants,
  searchQuery,
}: ParticipantsTableProps) {
  const totalCount = participants.length
  const visibleCount = filteredParticipants.length

  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-white/5 bg-[#1A1A1A]">
        <table className="w-full border-collapse text-left text-sm text-white">
          <thead>
            <tr className="text-xs uppercase tracking-[0.18em]">
              <th className="px-6 py-4 font-normal">Name</th>
              <th className="px-6 py-4 font-normal">Email</th>
              <th className="px-6 py-4 font-normal">Team</th>
              <th className="px-6 py-4 font-normal">Role</th>
              <th className="px-6 py-4 font-normal text-right">LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            {visibleCount === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-white/50"
                >
                  {searchQuery
                    ? `No participants match “${searchQuery}”.`
                    : 'No participants to display.'}
                </td>
              </tr>
            ) : (
              filteredParticipants.map((participant, index) => (
                <tr
                  key={`${participant.email}-${participant.team}-${index}`}
                  className="border-t border-white/5 bg-[#0D0D0D] text-white/70 transition-colors hover:bg-white/5"
                >
                  <td className="px-6 py-4 text-white/90">{participant.name}</td>
                  <td className="px-6 py-4">
                    <span className="block truncate text-white/60">
                      {participant.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/70">{participant.team}</td>
                  <td className="px-6 py-4 text-white/60">{participant.role ?? '—'}</td>
                  <td className="px-6 py-4 text-right">
                    {participant.linkedin ? (
                      <a
                        href={participant.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#55D186] hover:text-[#66F1A0]"
                      >
                        <span className="max-w-[140px] truncate text-xs sm:text-sm">
                          {participant.linkedin.replace(/^https?:\/\//, '')}
                        </span>
                        <ExternalLink className="h-4 w-4 flex-shrink-0" />
                      </a>
                    ) : (
                      <span className="text-white/30">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-white/40">
        Showing {visibleCount} of {totalCount} participants.
      </p>
    </section>
  )
}
