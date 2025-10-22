"use client"

import { Bookmark } from 'lucide-react'
import clsx from 'clsx'
import { partnerAccents, partnerText } from '@/styles/design-system'

interface BookmarkButtonProps {
  isVisible: boolean
  isBookmarked: boolean
  onToggle: () => void
}

export default function BookmarkButton({
  isVisible,
  isBookmarked,
  onToggle,
}: BookmarkButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={clsx(
        'transition-opacity duration-200',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Bookmark
        size={28}
        className="transition-colors"
        color={isBookmarked ? partnerAccents.solid : partnerText.secondary}
        fill={isBookmarked ? partnerAccents.tint : 'none'}
      />
    </button>
  )
}
