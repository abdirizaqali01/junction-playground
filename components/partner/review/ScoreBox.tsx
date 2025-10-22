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
  const [activeCriterion, setActiveCriterion] = useState<ReviewCriterionId>(
    REVIEW_CRITERIA[0].id
  )

  const scoreOptions = Array.from({ length: 10 }, (_, index) => index + 1)
  const activeCriterionConfig =
    REVIEW_CRITERIA.find((criterion) => criterion.id === activeCriterion) ??
    REVIEW_CRITERIA[0]
  const activeScore = scores[activeCriterion] ?? 0

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
    const nextCriterion =
      REVIEW_CRITERIA.find((criterion) => normalizedScores[criterion.id] === 0)?.id ??
      REVIEW_CRITERIA[0].id
    setActiveCriterion(nextCriterion)
  }, [existingReview])

  const handleScoreSelect = (criterionId: ReviewCriterionId, value: number) => {
    const nextValue = Math.max(0, Math.min(10, value))
    const nextScores = {
      ...scores,
      [criterionId]: nextValue,
    }
    setScores(nextScores)

    if (nextValue > 0) {
      const nextCriterion =
        REVIEW_CRITERIA.find((criterion) => nextScores[criterion.id] === 0)?.id ??
        criterionId
      setActiveCriterion(nextCriterion)
    }
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
    setActiveCriterion(REVIEW_CRITERIA[0].id)
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
        className="rounded-2xl px-8 py-8 shadow-2xl w-full max-w-[640px] border"
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
          Work through each criterion tab to rate the submission from 1–10. We’ll average the three scores into your final rating.
        </p>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {REVIEW_CRITERIA.map((criterion) => {
                const isActive = criterion.id === activeCriterion
                const hasScore = scores[criterion.id] > 0
                return (
                  <button
                    type="button"
                    key={criterion.id}
                    onClick={() => setActiveCriterion(criterion.id)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm transition-all duration-150',
                      isActive
                        ? 'border-[#55D186] bg-[#55D186]/10 text-white'
                        : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                    )}
                  >
                    <span>{criterion.label}</span>
                    {hasScore && (
                      <span className="ml-2 text-xs text-white/70">
                        {scores[criterion.id]}/10
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#111111] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {activeCriterionConfig.label}
                  </h4>
                  <p className="mt-1 text-xs text-white/50">
                    {activeCriterionConfig.description}
                  </p>
                </div>
                <span className="text-sm font-semibold text-white/80">
                  {activeScore > 0 ? `${activeScore}/10` : '—'}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-5 gap-2">
                {scoreOptions.map((value) => {
                  const isSelected = value === activeScore
                  return (
                    <button
                      type="button"
                      key={value}
                      onClick={() => handleScoreSelect(activeCriterion, value)}
                      className={cn(
                        'h-11 rounded-xl border text-sm font-semibold transition-all duration-200',
                        isSelected
                          ? 'border-[#55D186] bg-[#55D186] text-white'
                          : 'border-white/10 bg-[#1F1F1F] text-white/70 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <aside className="min-w-[220px] rounded-2xl border border-[#55D186]/30 bg-[#102219] p-6 text-left lg:w-[260px]">
            <span className="text-xs uppercase tracking-[0.18em] text-[#55D186]/80">
              Score Summary
            </span>
            <div className="mt-4 flex items-center gap-4">
              <div
                className={cn(
                  'flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold sm:h-20 sm:w-20 sm:text-3xl',
                  allCriteriaRated
                    ? 'bg-[#55D186] text-white'
                    : 'bg-white/10 text-white/30'
                )}
              >
                {allCriteriaRated ? averageScore.toFixed(1) : '—'}
              </div>
              <p className="text-xs text-white/60">
                Average of all criteria. Fill each score to lock in your review.
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {REVIEW_CRITERIA.map((criterion) => (
                <div
                  key={criterion.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-white/70"
                >
                  <span>{criterion.label}</span>
                  <span className="font-semibold text-white">
                    {scores[criterion.id] > 0 ? `${scores[criterion.id]}/10` : '—'}
                  </span>
                </div>
              ))}
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
          rows={5}
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
