import React from 'react'
import SortButton from '@/components/Buttons/SortButton'
import { SortType } from '@/hooks/useSort'

interface SortControlsProps {
  activeSort: SortType
  onSortClick: (sortType: SortType) => void
}

export default function SortControls({ activeSort, onSortClick }: SortControlsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-white text-xs mr-1.5 whitespace-nowrap">Sort by</span>
      <SortButton 
        label="Rating" 
        isActive={activeSort === 'rating'} 
        onClick={() => onSortClick('rating')} 
      />
      <SortButton 
        label="Un-reviewed" 
        isActive={activeSort === 'un-reviewed'} 
        onClick={() => onSortClick('un-reviewed')} 
      />
      <SortButton 
        label="Bookmarked" 
        isActive={activeSort === 'bookmarked'} 
        onClick={() => onSortClick('bookmarked')} 
      />
    </div>
  )
}