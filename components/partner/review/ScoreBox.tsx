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
import {
  PartnerButton,
  colors,
  partnerAccents,
  partnerBorders,
  partnerSurfaces,
  partnerText,
} from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

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
      style={{ left: 'calc(var(--partner-sidebar-width) + 1.25rem)' }}
    >
      <div
        ref={containerRef}
        className="rounded-2xl px-7 py-7 shadow-2xl w-full max-w-[590px] border"
        style={{
          backgroundColor: partnerSurfaces.raised,
          borderColor: partnerBorders.default,
          color: partnerText.primary,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-2xl font-semibold"
            style={{ color: partnerAccents.solid }}
          >
            {existingReview ? 'Update Review' : 'Scoring'}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--close-hover)]"
            style={withVars({}, { '--close-hover': partnerSurfaces.muted })}
          >
            <X className="w-5 h-5" style={{ color: partnerText.primary }} />
          </button>
        </div>

        <p className="text-sm mb-6" style={{ color: partnerText.secondary }}>
          Work through each criterion tab to rate the submission from 1–10. We’ll average the three scores into your final rating.
        </p>

        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {REVIEW_CRITERIA.map((criterion) => {
              const isActive = criterion.id === activeCriterion
              const hasScore = scores[criterion.id] > 0
              const buttonStyle = isActive
                ? {
                    backgroundColor: partnerAccents.tint,
                    borderColor: partnerAccents.solid,
                    color: partnerText.primary,
                  }
                : {
                    backgroundColor: partnerSurfaces.muted,
                    borderColor: partnerBorders.subtle,
                    color: partnerText.secondary,
                  }
              return (
                <button
                  type="button"
                  key={criterion.id}
                  onClick={() => setActiveCriterion(criterion.id)}
                  className="rounded-full border px-4 py-2 text-sm transition-all duration-150 hover:text-[var(--criterion-hover)]"
                  style={withVars(buttonStyle, { '--criterion-hover': partnerText.primary })}
                >
                  <span>{criterion.label}</span>
                  {hasScore && (
                    <span
                      className="ml-2 text-xs"
                      style={{ color: partnerText.secondary }}
                    >
                      {scores[criterion.id]}/10
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: partnerSurfaces.sunken,
              borderColor: partnerBorders.subtle,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4
                  className="text-lg font-semibold"
                  style={{ color: partnerText.primary }}
                >
                  {activeCriterionConfig.label}
                </h4>
                <p
                  className="mt-1 text-xs"
                  style={{ color: partnerText.secondary }}
                >
                  {activeCriterionConfig.description}
                </p>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: partnerText.primary }}
              >
                {activeScore > 0 ? `${activeScore}/10` : '—'}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-5 gap-2">
              {scoreOptions.map((value) => {
                const isSelected = value === activeScore
                const optionStyle = isSelected
                  ? {
                      backgroundColor: partnerAccents.solid,
                      borderColor: partnerAccents.solid,
                      color: colors.white.opacity100,
                    }
                  : {
                      backgroundColor: partnerSurfaces.raised,
                      borderColor: partnerBorders.subtle,
                      color: partnerText.secondary,
                    }
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => handleScoreSelect(activeCriterion, value)}
                    className="h-11 rounded-xl border text-sm font-semibold transition-all duration-200 hover:bg-[var(--option-hover)] hover:text-[var(--option-hover-text)]"
                    style={withVars(optionStyle, {
                      '--option-hover': partnerSurfaces.muted,
                      '--option-hover-text': partnerText.primary,
                    })}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>

          <div
            className="flex items-center gap-4 rounded-2xl border p-4"
            style={{
              backgroundColor: partnerSurfaces.success,
              borderColor: colors.primary.opacity30,
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold"
              style={
                allCriteriaRated
                  ? {
                      backgroundColor: partnerAccents.solid,
                      color: colors.white.opacity100,
                    }
                  : {
                      backgroundColor: partnerSurfaces.muted,
                      color: partnerText.muted,
                    }
              }
            >
              {allCriteriaRated ? averageScore.toFixed(1) : '—'}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: partnerText.primary }}>
                Average Rating
              </p>
              <p className="text-xs" style={{ color: partnerText.secondary }}>
                Complete every criterion to lock in your review score.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <h4
          className="text-lg font-semibold mb-2"
          style={{ color: partnerAccents.solid }}
        >
          Feedback
        </h4>
        <p className="text-sm mb-3" style={{ color: partnerText.secondary }}>
          Provide feedback for the team. Your comments will be visible to
          participants and should highlight strengths and areas for improvement.
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Type your feedback..."
          rows={5}
            className="w-full border rounded-xl px-5 py-4 text-sm focus:outline-none resize-none mb-6 placeholder:text-[var(--textarea-placeholder)] focus:border-[var(--textarea-focus-border)]"
            style={withVars(
              {
                backgroundColor: partnerSurfaces.base,
                borderColor: colors.primary.opacity40,
                color: partnerText.primary,
              },
              {
                '--textarea-placeholder': partnerText.secondary,
                '--textarea-focus-border': partnerAccents.solid,
              }
            )}
          />

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between gap-3 items-center">
          <div className="flex gap-3">
            {existingReview && (
              <button
                onClick={handleDelete}
                className="text-xs uppercase tracking-wide transition-colors hover:text-[var(--delete-hover)]"
                style={withVars({ color: partnerText.soft }, { '--delete-hover': colors.alerts.opacity60 })}
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
