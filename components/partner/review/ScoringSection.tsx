'use client'

import React, { useState } from 'react'
import { REVIEW_CRITERIA, type Review as ProjectReview } from '@/hooks/useProjects'

interface ScoringSectionProps {
  reviews?: ProjectReview[]
}

export function ScoringSection({ reviews = [] }: ScoringSectionProps) {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-8">
        Your Team’s Scoring & Feedback
      </h2>

      {reviews?.length === 0 ? (
        <div className="text-center py-10 text-white/40">
          No Ratings Or Reviews Yet
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review: ProjectReview, index) => {
            const isExpanded = expanded === index
            const isLong = review.feedback.length > 250
            const reviewerDisplayName =
              review.reviewerName || `Reviewer ${review.reviewerId}`
            const timestampDisplay =
              !Number.isNaN(Date.parse(review.reviewedAt))
                ? new Date(review.reviewedAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : review.reviewedAt

            return (
              <div
                key={index}
                className="border border-[#55D186] rounded-lg p-6 bg-[#55D186]/10 transition-all duration-300"
              >
                {/* Reviewer and score */}
                <h3 className="text-[#55D186] text-2xl font-semibold leading-tight">
                  {reviewerDisplayName}
                </h3>
                <p className="text-white/80 text-base mt-1">
                  Overall score:{' '}
                  <span className="text-[#55D186] font-semibold">
                    {review.averageScore.toFixed(1)}/10
                  </span>
                </p>

                <div className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
                  {REVIEW_CRITERIA.map((criterion) => (
                    <div
                      key={criterion.id}
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <p className="text-xs uppercase tracking-[0.12em] text-white/50">
                        {criterion.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {review.scores[criterion.id]}/10
                      </p>
                    </div>
                  ))}
                </div>

                {/* Feedback section */}
                <h4 className="text-[#55D186] text-lg font-semibold mt-6 mb-1">
                  Feedback
                </h4>
                <p
                  className={`text-white/80 text-base leading-relaxed transition-all duration-300 ${
                    !isExpanded && isLong ? 'line-clamp-3' : ''
                  }`}
                >
                  {review.feedback}
                </p>

                {/* View full toggle */}
                {isLong && (
                  <button
                    onClick={() =>
                      setExpanded(isExpanded ? null : index)
                    }
                    className="text-white font-semibold underline text-base mt-1 hover:text-[#55D186] transition-colors"
                  >
                    {isExpanded ? 'View less' : 'View full'}
                  </button>
                )}

                {/* Timestamp */}
                <p className="text-white/40 text-sm mt-5">
                  {timestampDisplay}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
