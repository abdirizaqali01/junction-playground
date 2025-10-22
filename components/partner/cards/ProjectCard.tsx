'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProjectThumbnail from './ProjectThumbnail'
import ProjectContent from './ProjectContent'
import ProjectRating from './ProjectRating'
import BookmarkButton from './BookmarkButton'
import { partnerBorders, partnerSurfaces } from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

interface ProjectCardProps {
  id?: string | number
  title: string
  team: string
  description: string
  imageUrl: string
  rating?: number
  time: string
  comments: number
  isBookmarked?: boolean
  onBookmarkToggle?: () => void
}

export default function ProjectCard({
  id,
  title,
  team,
  description,
  imageUrl,
  rating,
  time,
  comments,
  isBookmarked = false,
  onBookmarkToggle,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  return (
    <div
      className="relative flex border rounded-xl overflow-hidden transition-all w-full h-full hover:border-[var(--project-border-hover)]"
      style={withVars(
        {
          backgroundColor: partnerSurfaces.card,
          borderColor: partnerBorders.subtle,
        },
        { '--project-border-hover': partnerBorders.hover }
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <ProjectThumbnail imageUrl={imageUrl} />
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5">
          <BookmarkButton
            isVisible={isHovered || isBookmarked}
            isBookmarked={isBookmarked}
            onToggle={onBookmarkToggle || (() => {})}
          />
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-[18px] flex flex-col">
        <ProjectContent
          title={title}
          team={team}
          description={description}
          time={time}
          comments={comments}
          onViewClick={() => router.push(`/partners/${id}/review`)}
        />
      </div>

      <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5">
        <ProjectRating rating={rating} />
      </div>
    </div>
  )
}
