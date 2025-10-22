'use client'

import React from 'react'
import { ExternalLink } from 'lucide-react'
import {
  partnerAccents,
  partnerBorders,
  partnerSurfaces,
  partnerText,
} from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

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
    <section className="mt-8" style={{ color: partnerText.secondary }}>
      <div
        className="rounded-2xl border"
        style={{
          backgroundColor: partnerSurfaces.raised,
          borderColor: partnerBorders.subtle,
        }}
      >
        <table
          className="w-full border-collapse text-left text-sm"
          style={{ color: partnerText.secondary }}
        >
          <thead>
            <tr className="text-xs uppercase tracking-[0.18em]" style={{ color: partnerText.muted }}>
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
                  className="px-6 py-12 text-center text-sm"
                  style={{ color: partnerText.muted }}
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
                  className="border-t transition-colors hover:bg-[var(--participant-row-hover)]"
                  style={withVars(
                    {
                      borderColor: partnerBorders.subtle,
                      backgroundColor: partnerSurfaces.sunken,
                      color: partnerText.secondary,
                    },
                    { '--participant-row-hover': partnerSurfaces.raisedHover }
                  )}
                >
                  <td className="px-6 py-4" style={{ color: partnerText.primary }}>
                    {participant.name}
                  </td>
                  <td className="px-6 py-4" style={{ color: partnerText.secondary }}>
                    <span className="block truncate">
                      {participant.email}
                    </span>
                  </td>
                  <td className="px-6 py-4" style={{ color: partnerText.secondary }}>
                    {participant.team}
                  </td>
                  <td className="px-6 py-4" style={{ color: partnerText.muted }}>
                    {participant.role ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {participant.linkedin ? (
                      <a
                        href={participant.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 transition-colors hover:text-[var(--participant-link-hover)]"
                        style={withVars(
                          {
                            color: partnerAccents.solid,
                          },
                          { '--participant-link-hover': partnerAccents.hover }
                        )}
                      >
                        <span className="max-w-[140px] truncate text-xs sm:text-sm">
                          {participant.linkedin.replace(/^https?:\/\//, '')}
                        </span>
                        <ExternalLink className="h-4 w-4 flex-shrink-0" />
                      </a>
                    ) : (
                      <span style={{ color: partnerText.soft }}>—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs" style={{ color: partnerText.muted }}>
        Showing {visibleCount} of {totalCount} participants.
      </p>
    </section>
  )
}
