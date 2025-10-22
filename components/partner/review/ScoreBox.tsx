'use client'

import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import {
  DEFAULT_REVIEWER,
  REVIEW_CRITERIA,
  calculateAverageScore,
  createDefaultReviewScores,
  useProjects,
  type ReviewScores,
  type ReviewCriterionId,
} from '@/hooks/useProjects'
import { PartnerButton, partnerColors } from '@/components/partner/designSystem'
import { cn } from '@/lib/utils'

interface ScoreBoxProps {
  projectId: string
  currentUserId: string
  currentUserName?: string
  onCancel: () => void
  onSubmit: () => void
}

export function ScoreBox({
  projectId,
  currentUserId,
  currentUserName,
  onCancel,
  onSubmit,
}: ScoreBoxProps) {
  const { getReviewForUser, addOrUpdateReview, deleteReview } = useProjects()
  const existingReview = getReviewForUser(projectId, currentUserId)
  const containerRef = useRef<HTMLDivElement>(null)

  const [scores, setScores] = useState<ReviewScores>(() =>
    createDefaultReviewScores()
  )
  const [feedback, setFeedback] = useState<string>(existingReview?.feedback || '')

  const scoreOptions = Array.from({ length: 10 }, (_, index) => index + 1)
  const criteriaDescriptions: Record<ReviewCriterionId, string> = {
    innovation: 'Originality and boldness of the solution.',
    impact: 'Value created for users, partners, or the wider challenge.',
    execution: 'Quality of implementation, polish, and presentation.',
  }

  useEffect(() => {
    if (!existingReview) return

    const normalizedScores = createDefaultReviewScores()
    REVIEW_CRITERIA.forEach((criterion) => {
      const value = existingReview.scores?.[criterion.id]
      if (typeof value === 'number') {
        normalizedScores[criterion.id] = value
      }
    })

    setScores(normalizedScores)
    setFeedback(existingReview.feedback)
  }, [existingReview])

  const handleScoreSelect = (criterionId: ReviewCriterionId, value: number) => {
    setScores((prev) => ({
      ...prev,
      [criterionId]: value,
    }))
  }

  const allCriteriaRated = REVIEW_CRITERIA.every(({ id }) => scores[id] > 0)
  const averageScore = calculateAverageScore(scores)

  const handleSubmit = () => {
    if (!feedback.trim() || !allCriteriaRated) return
    const reviewerId = currentUserId || DEFAULT_REVIEWER.id
    const reviewerName = currentUserName ?? DEFAULT_REVIEWER.name

    const scoresPayload = createDefaultReviewScores()
    REVIEW_CRITERIA.forEach((criterion) => {
      scoresPayload[criterion.id] = scores[criterion.id]
    })

    addOrUpdateReview(projectId, reviewerId, {
      reviewerName,
      scores: scoresPayload,
      feedback,
    })
    onSubmit()
  }

  const handleDelete = () => {
    deleteReview(projectId, currentUserId)
    setScores(createDefaultReviewScores())
    setFeedback('')
    onCancel()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(event.target as Node)) {
        onCancel()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onCancel])

  return (
    <div
      className="fixed left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-[101] px-[3%]"
      style={{ left: 'var(--partner-sidebar-width)' }}
    >
      <div
        ref={containerRef}
        className="rounded-2xl px-10 py-8 shadow-2xl w-full max-w-[720px] border"
        style={{
          backgroundColor: partnerColors.surface,
          borderColor: partnerColors.border,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-[#55D186]">
            {existingReview ? 'Update Review' : 'Scoring'}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <p className="text-white/65 text-sm mb-6">
          Score each criterion from 1–10. We’ll average them to create your overall rating for this submission.
        </p>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-5">
            {REVIEW_CRITERIA.map((criterion) => {
              const criterionScore = scores[criterion.id]
              const description = criteriaDescriptions[criterion.id]
              return (
                <div
                  key={criterion.id}
                  className="rounded-2xl border border-white/10 bg-[#111111] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {criterion.label}
                      </h4>
                      <p className="mt-1 text-xs text-white/50">
                        {description}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-white/80">
                      {criterionScore > 0 ? `${criterionScore}/10` : '—'}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-5 gap-2.5 sm:grid-cols-10">
                    {scoreOptions.map((value) => {
                      const isSelected = value === criterionScore
                      return (
                        <button
                          key={value}
                          onClick={() => handleScoreSelect(criterion.id, value)}
                          className={cn(
                            'h-10 rounded-full border text-sm font-semibold transition-all duration-200',
                            isSelected
                              ? 'bg-white text-[#121212] border-white'
                              : 'bg-[#1F1F1F] text-white/70 border-white/10 hover:bg-[#55D186] hover:text-white hover:border-[#55D186]'
                          )}
                        >
                          {value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <aside className="lg:w-[240px]">
            <div className="rounded-2xl border border-[#55D186]/40 bg-[#102219] p-6 text-center">
              <span className="text-xs uppercase tracking-[0.18em] text-[#55D186]/80">
                Overall
              </span>
              <div className="mt-5 flex justify-center">
                <div
                  className={cn(
                    'flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold',
                    allCriteriaRated
                      ? 'bg-[#55D186] text-white'
                      : 'bg-white/10 text-white/30'
                  )}
                >
                  {allCriteriaRated ? averageScore.toFixed(1) : '—'}
                </div>
              </div>
              <p className="mt-4 text-xs text-white/60">
                Calculated as the average of all criteria.
              </p>
              <div className="mt-5 space-y-2 text-left text-sm">
                {REVIEW_CRITERIA.map((criterion) => (
                  <div
                    key={criterion.id}
                    className="flex items-center justify-between text-white/70"
                  >
                    <span>{criterion.label}</span>
                    <span className="font-semibold text-white">
                      {scores[criterion.id] > 0 ? scores[criterion.id] : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Feedback Section */}
        <h4 className="text-lg font-semibold text-[#55D186] mb-2">Feedback</h4>
        <p className="text-white/65 text-sm mb-3">
          Provide feedback for the team. Your comments will be visible to
          participants and should highlight strengths and areas for improvement.
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Type your feedback..."
          rows={7}
          className="w-full bg-[#0D0D0D] border border-[#55D186]/40 rounded-xl px-5 py-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#55D186] resize-none mb-6"
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between gap-3 items-center">
          <div className="flex gap-3">
            {existingReview && (
              <button
                onClick={handleDelete}
                className="text-xs uppercase tracking-wide text-white/50 hover:text-[#FF8A8A] transition-colors"
              >
                delete review
              </button>
            )}
          </div>
          <div className="flex gap-3 ml-auto">
            <PartnerButton
              variant={existingReview ? 'danger' : 'secondary'}
              onClick={onCancel}
            >
              Cancel
            </PartnerButton>
            <PartnerButton
              onClick={handleSubmit}
              disabled={!feedback.trim() || !allCriteriaRated}
            >
              {existingReview ? 'Update Review' : 'Submit'}
            </PartnerButton>
          </div>
        </div>
      </div>
    </div>
  )
}
