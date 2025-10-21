import React from 'react'

interface Review {
  score: number
  feedback: string
  reviewedBy: string
  reviewedAt: string
}

interface ScoringSectionProps {
  reviews?: Review[]
}

export function ScoringSection({ reviews = [] }: ScoringSectionProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Your Team's Scoring & Feedback</h2>
      {reviews.length === 0 ? (
        <div className="text-center py-8 text-white/40">
          No Ratings Or Reviews Yet
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border border-[#55D186]/10 bg-[#55D186]/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#55D186] text-2xl font-bold">{review.score}</span>
                <span className="text-white/50 text-xs">{review.reviewedAt}</span>
              </div>
              <p className="text-white/70 text-sm mb-2">{review.feedback}</p>
              <p className="text-white/50 text-xs">— {review.reviewedBy}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}