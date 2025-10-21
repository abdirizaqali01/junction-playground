"use client"

import { PartnerButton } from '@/components/partner/designSystem'

interface ReviewCardProps {
    reviewerName: string
    rating: number
    projectName: string
    feedback: string
    timestamp: string
  }
  
export default function ReviewCard({
  reviewerName,
  rating,
  projectName,
  feedback,
  timestamp,
  onProjectClick,
}: ReviewCardProps & { onProjectClick?: () => void }) {
  const displayTimestamp =
    !Number.isNaN(Date.parse(timestamp))
      ? new Date(timestamp).toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : timestamp

  return (
    <div className="min-w-[480px] h-[200px] bg-[#0D0D0D] rounded-xl border border-[#55D186] p-5 flex flex-col relative overflow-hidden">
      {/* Green tint overlay */}
      <div className="absolute inset-0 bg-[#55D186] opacity-10 pointer-events-none rounded-xl" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-white">{reviewerName}</h3>
              <p className="text-xs text-white/50">on {projectName}</p>
            </div>
            <span className="text-white/50 text-xs whitespace-nowrap">{displayTimestamp}</span>
          </div>
          
          <p className="text-xs text-white/60 mb-1">
            Score:{' '}
            <span className="text-[#55D186] font-semibold">
              {rating}/10
            </span>
          </p>
          
          <div className="flex-1 mt-2">
            <h4 className="text-xs font-semibold text-white mb-1.5">Feedback</h4>
            <p className="text-xs text-white/70 line-clamp-3">
              {feedback}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <button className="text-xs text-[#55D186] hover:underline self-start">
              View full
            </button>
            {onProjectClick && (
              <PartnerButton
                variant="secondary"
                onClick={onProjectClick}
                className="text-xs px-3 py-1"
              >
                To project
              </PartnerButton>
            )}
          </div>
        </div>
      </div>
    )
  }
