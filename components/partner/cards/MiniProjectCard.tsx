"use client"

import ProjectRating from './ProjectRating'
import { PartnerButton, partnerBorders, partnerSurfaces, partnerText } from '@/styles/design-system'

interface MiniProjectCardProps {
  title: string
  team: string
  description: string
  imageUrl: string
  rating?: number | null
  onReview?: () => void
}

export default function MiniProjectCard({
  title,
  team,
  description,
  imageUrl,
  rating,
  onReview,
}: MiniProjectCardProps) {
  return (
    <div
      className="min-w-[480px] border rounded-2xl overflow-hidden transition-all hover:border-[var(--mini-border-hover)]"
      style={{
        backgroundColor: partnerSurfaces.card,
        borderColor: partnerBorders.subtle,
        ['--mini-border-hover' as '--mini-border-hover']: partnerBorders.hover,
      }}
    >
      <div className="flex gap-6 p-5">
        {/* Thumbnail */}
        <div
          className="w-[220px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden"
          style={{ backgroundColor: partnerSurfaces.muted }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3
                  className="text-lg font-semibold leading-tight"
                  style={{ color: partnerText.primary }}
                >
                  {title}
                </h3>
                <p className="text-sm" style={{ color: partnerText.secondary }}>
                  {team}
                </p>
              </div>

              {rating !== null && rating !== undefined && (
                <div className="ml-4 scale-90">
                  <ProjectRating rating={rating} />
                </div>
              )}
            </div>

            <p
              className="text-sm mt-3 line-clamp-4"
              style={{ color: partnerText.secondary }}
            >
              {description}
            </p>
          </div>

          {onReview && (
            <PartnerButton
              variant="ghost"
              onClick={onReview}
              className="group mt-4 self-start text-sm font-medium flex items-center gap-2 px-0 hover:text-[var(--review-link-hover)]"
              style={{
                color: partnerText.secondary,
                ['--review-link-hover' as '--review-link-hover']: partnerText.primary,
              }}
            >
              <span>Go To Reviewing</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </PartnerButton>
          )}
        </div>
      </div>
    </div>
  )
}
