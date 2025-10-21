'use client'
import { useState } from 'react'
import ProjectThumbnail from './ProjectThumbnail'
import ProjectContent from './ProjectContent'
import ProjectRating from './ProjectRating'
import BookmarkButton from './BookmarkButton'

interface ProjectCardProps {
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

  return (
    <div
      className="relative flex bg-[#1B1B1B] border border-white/10 rounded-xl overflow-hidden transition-all hover:border-white/20 w-full h-full"
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
        />
      </div>

      <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5">
        <ProjectRating rating={rating} />
      </div>
    </div>
  )
}