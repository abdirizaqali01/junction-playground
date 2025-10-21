"use client"

import { Bookmark } from 'lucide-react'
import clsx from 'clsx'

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
        className={clsx(
          'transition-colors',
          isBookmarked ? 'text-[#55D186] fill-[#55D186]/5' : 'text-white/70'
        )}
      />
    </button>
  )
}
