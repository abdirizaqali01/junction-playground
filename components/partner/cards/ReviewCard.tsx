"use client"

import { PartnerButton, partnerAccents, partnerBorders, partnerColors, partnerText } from '@/styles/design-system'

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
    <div
      className="min-w-[480px] h-[200px] rounded-xl border p-5 flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: partnerColors.background,
        borderColor: partnerBorders.accent,
        color: partnerText.primary,
      }}
    >
      {/* Green tint overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{ backgroundColor: partnerAccents.tint }}
      />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-col">
              <h3 className="text-base font-semibold" style={{ color: partnerText.primary }}>
                {reviewerName}
              </h3>
              <p className="text-xs" style={{ color: partnerText.soft }}>
                on {projectName}
              </p>
            </div>
            <span className="text-xs whitespace-nowrap" style={{ color: partnerText.soft }}>
              {displayTimestamp}
            </span>
          </div>
          
          <p className="text-xs mb-1" style={{ color: partnerText.secondary }}>
            Score:{' '}
            <span className="font-semibold" style={{ color: partnerAccents.solid }}>
              {rating}/10
            </span>
          </p>
          
          <div className="flex-1 mt-2">
            <h4 className="text-xs font-semibold mb-1.5" style={{ color: partnerText.primary }}>
              Feedback
            </h4>
            <p className="text-xs line-clamp-3" style={{ color: partnerText.secondary }}>
              {feedback}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <button
              className="text-xs hover:underline self-start"
              style={{ color: partnerText.primary }}
            >
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
