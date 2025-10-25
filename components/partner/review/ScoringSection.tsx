'use client'

import React, { useState } from 'react'
import { REVIEW_CRITERIA, type Review as ProjectReview } from '@/hooks/useProjects'
import { colors, partnerAccents, partnerBorders, partnerSurfaces, partnerText } from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

interface ScoringSectionProps {
  reviews?: ProjectReview[]
}

export function ScoringSection({ reviews = [] }: ScoringSectionProps) {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div
      className="rounded-2xl p-8 border"
      style={{ borderColor: partnerBorders.subtle, backgroundColor: partnerSurfaces.raised }}
    >
      <h2
        className="text-2xl font-bold mb-8"
        style={{ color: partnerText.primary }}
      >
        Your Team’s Scoring & Feedback
      </h2>

      {reviews?.length === 0 ? (
        <div
          className="text-center py-10"
          style={{ color: partnerText.muted }}
        >
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
                className="border rounded-lg p-6 transition-all duration-300"
                style={{
                  backgroundColor: partnerAccents.tint,
                  borderColor: partnerAccents.solid,
                  color: partnerText.primary,
                }}
              >
                {/* Reviewer and score */}
                <h3
                  className="text-2xl font-semibold leading-tight"
                  style={{ color: partnerAccents.solid }}
                >
                  {reviewerDisplayName}
                </h3>
                <p
                  className="text-base mt-1"
                  style={{ color: partnerText.primary }}
                >
                  Overall score:{' '}
                  <span
                    className="font-semibold"
                    style={{ color: partnerAccents.solid }}
                  >
                    {review.averageScore.toFixed(1)}/10
                  </span>
                </p>

                <div
                  className="mt-4 grid gap-3 text-sm sm:grid-cols-3"
                  style={{ color: partnerText.secondary }}
                >
                  {REVIEW_CRITERIA.map((criterion) => (
                    <div
                      key={criterion.id}
                      className="rounded-lg border px-4 py-3"
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
                        className="mt-2 text-lg font-semibold"
                        style={{ color: partnerText.primary }}
                      >
                        {review.scores[criterion.id]}/10
                      </p>
                    </div>
                  ))}
                </div>

                {/* Feedback section */}
                <h4
                  className="text-lg font-semibold mt-6 mb-1"
                  style={{ color: partnerAccents.solid }}
                >
                  Feedback
                </h4>
                <p
                  className={`text-base leading-relaxed transition-all duration-300 ${
                    !isExpanded && isLong ? 'line-clamp-3' : ''
                  }`}
                  style={{ color: partnerText.primary }}
                >
                  {review.feedback}
                </p>

                {/* View full toggle */}
                {isLong && (
                  <button
                    onClick={() =>
                      setExpanded(isExpanded ? null : index)
                    }
                    className="font-semibold underline text-base mt-1 transition-colors hover:text-[var(--feedback-hover)]"
                    style={withVars(
                      { color: partnerText.primary },
                      { '--feedback-hover': partnerAccents.solid }
                    )}
                  >
                    {isExpanded ? 'View less' : 'View full'}
                  </button>
                )}

                {/* Timestamp */}
                <p
                  className="text-sm mt-5"
                  style={{ color: colors.white.opacity40 }}
                >
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
