'use client'

import React from 'react'
import { X } from 'lucide-react'
import { REVIEW_CRITERIA, useProjects } from '@/hooks/useProjects'
import { PartnerButton, partnerColors } from '@/components/partner/designSystem'

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
      style={{ left: 'var(--partner-sidebar-width)' }}
    >
      <div
        className="rounded-2xl py-[5%] px-[6%] shadow-2xl w-full max-w-[92%] lg:max-w-[55%] text-center pointer-events-auto relative border"
        style={{ backgroundColor: partnerColors.surface, borderColor: partnerColors.border }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[4%] right-[4%] p-[1.5%] hover:bg-white/5 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Done Text */}
        <h2 className="text-4xl font-bold text-[#55D186] mb-4 mt-2">Done!</h2>

        {/* Score Circle */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#55D186] flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{review.averageScore.toFixed(1)}</span>
          </div>
        </div>

        {/* Subtext */}
        <p className="text-white text-base mb-8 leading-snug">
          You’ve rated <span className="font-semibold">{project.team}’s</span> <br /> project a{' '}
          <span className="text-[#55D186] font-semibold">{review.averageScore.toFixed(1)}/10</span>. Amazing!
        </p>

        <div className="grid gap-3 mb-8 text-left sm:grid-cols-3">
          {REVIEW_CRITERIA.map((criterion) => (
            <div
              key={criterion.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.12em] text-white/60">
                {criterion.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {review.scores[criterion.id]}/10
              </p>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="text-left mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Your Feedback</h3>
          <div className="border border-[#55D186] rounded-lg p-[3%] text-white/70 leading-relaxed">
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
