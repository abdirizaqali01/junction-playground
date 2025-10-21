'use client'

import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { DEFAULT_REVIEWER, useProjects } from '@/hooks/useProjects'
import { PartnerButton, partnerColors } from '@/components/partner/designSystem'

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

  const [rating, setRating] = useState<number>(existingReview?.score || 0)
  const [feedback, setFeedback] = useState<string>(existingReview?.feedback || '')
  const [editMode, setEditMode] = useState(!existingReview) // show scoring if no review yet

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.score)
      setFeedback(existingReview.feedback)
    }
  }, [existingReview])

  const handleSubmit = () => {
    if (!feedback.trim() || rating === 0) return
    const reviewerId = currentUserId || DEFAULT_REVIEWER.id
    const reviewerName = currentUserName ?? DEFAULT_REVIEWER.name

    addOrUpdateReview(projectId, reviewerId, {
      reviewerName,
      score: rating,
      feedback,
    })
    onSubmit()
  }

  const handleDelete = () => {
    deleteReview(projectId, currentUserId)
    setRating(0)
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
          Evaluate this submission using the 1–10 scale below. Your rating will
          be averaged with other partners’ scores to determine the project’s
          final ranking.
        </p>

        {/* Rating Circles */}
        <div className="grid grid-cols-10 gap-2.5 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              onClick={() => setRating(num)}
              className={`w-full aspect-square rounded-full flex items-center justify-center font-semibold text-lg border border-white/50 transition-all duration-200
                ${
                  rating === num
                    ? 'bg-white text-[#1A1A1A]'
                    : 'bg-[#55D186] text-white hover:bg-[#66E49A]'
                }`}
            >
              {num}
            </button>
          ))}
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
              onClick={() => {
                if (existingReview) setEditMode(false)
                else onCancel()
              }}
            >
              Cancel
            </PartnerButton>
            <PartnerButton
              onClick={handleSubmit}
              disabled={!feedback.trim() || rating === 0}
            >
              {existingReview ? 'Update Review' : 'Submit'}
            </PartnerButton>
          </div>
        </div>
      </div>
    </div>
  )
}
