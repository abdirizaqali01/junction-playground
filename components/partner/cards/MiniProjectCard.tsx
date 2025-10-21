"use client"

import ProjectRating from './ProjectRating'
import { PartnerButton } from '@/components/partner/designSystem'

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
    <div className="min-w-[480px] bg-[#1B1B1B] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
      <div className="flex gap-6 p-5">
        {/* Thumbnail */}
        <div className="w-[220px] h-[200px] flex-shrink-0 bg-white/5 rounded-lg overflow-hidden">
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
                <h3 className="text-lg font-semibold text-white leading-tight">
                  {title}
                </h3>
                <p className="text-sm text-white/60">{team}</p>
              </div>

              {rating !== null && rating !== undefined && (
                <div className="ml-4 scale-90">
                  <ProjectRating rating={rating} />
                </div>
              )}
            </div>

            <p className="text-sm text-white/70 mt-3 line-clamp-4">
              {description}
            </p>
          </div>

          {onReview && (
            <PartnerButton
              variant="ghost"
              onClick={onReview}
              className="group mt-4 self-start text-sm font-medium text-white/80 hover:text-white flex items-center gap-2 px-0"
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
