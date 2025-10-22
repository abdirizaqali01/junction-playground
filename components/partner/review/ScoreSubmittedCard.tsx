'use client'

import React from 'react'
import { X } from 'lucide-react'
import { REVIEW_CRITERIA, useProjects } from '@/hooks/useProjects'
import {
  PartnerButton,
  colors,
  partnerAccents,
  partnerBorders,
  partnerSurfaces,
  partnerText,
} from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

interface ScoreSubmittedCardProps {
  projectId: string
  currentUserId: string
  onClose: () => void
}

export function ScoreSubmittedCard({
  projectId,
  currentUserId,
  onClose,
}: ScoreSubmittedCardProps) {
  const { projects, getReviewForUser, persistProjects } = useProjects()
  const project = projects.find((p) => p.id === projectId)
  const review = getReviewForUser(projectId, currentUserId)

  if (!project || !review) return null

  return (
    <div
      className="fixed left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-[101] px-[4%] pointer-events-none"
      style={{ left: 'calc(var(--partner-sidebar-width) + 1.25rem)' }}
    >
      <div
        className="rounded-2xl py-[5%] px-[6%] shadow-2xl w-full max-w-[92%] lg:max-w-[55%] text-center pointer-events-auto relative border"
        style={{
          backgroundColor: partnerSurfaces.raised,
          borderColor: partnerBorders.default,
          color: partnerText.primary,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[4%] right-[4%] p-[1.5%] rounded-lg transition-colors hover:bg-[var(--close-hover)]"
          style={withVars({}, { '--close-hover': partnerSurfaces.muted })}
        >
          <X className="w-5 h-5" style={{ color: partnerText.primary }} />
        </button>

        {/* Done Text */}
        <h2
          className="text-4xl font-bold mb-4 mt-2"
          style={{ color: partnerAccents.solid }}
        >
          Done!
        </h2>

        {/* Score Circle */}
        <div className="flex justify-center mb-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: partnerAccents.solid }}
          >
            <span
              className="text-3xl font-bold"
              style={{ color: colors.white.opacity100 }}
            >
              {review.averageScore.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Subtext */}
        <p className="text-base mb-8 leading-snug" style={{ color: partnerText.primary }}>
          You’ve rated{' '}
          <span className="font-semibold" style={{ color: partnerText.primary }}>
            {project.team}’s
          </span>{' '}
          <br /> project a{' '}
          <span className="font-semibold" style={{ color: partnerAccents.solid }}>
            {review.averageScore.toFixed(1)}/10
          </span>
          . Amazing!
        </p>

        <div className="grid gap-3 mb-8 text-left sm:grid-cols-3">
          {REVIEW_CRITERIA.map((criterion) => (
            <div
              key={criterion.id}
              className="rounded-xl border p-4"
              style={{
                backgroundColor: partnerSurfaces.muted,
                borderColor: partnerBorders.subtle,
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.12em]"
                style={{ color: partnerText.secondary }}
              >
                {criterion.label}
              </p>
              <p
                className="mt-2 text-2xl font-semibold"
                style={{ color: partnerText.primary }}
              >
                {review.scores[criterion.id]}/10
              </p>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="text-left mb-8">
          <h3
            className="text-lg font-semibold mb-3"
            style={{ color: partnerText.primary }}
          >
            Your Feedback
          </h3>
          <div
            className="border rounded-lg p-[3%] leading-relaxed"
            style={{
              borderColor: partnerAccents.solid,
              color: partnerText.secondary,
            }}
          >
            {review.feedback}
          </div>
        </div>

        {/* Continue Button */}
        <PartnerButton
          onClick={() => {
            persistProjects()
            onClose()
          }}
        >
          Continue
        </PartnerButton>
      </div>
    </div>
  )
}
