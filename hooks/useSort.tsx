import { useState } from 'react'

export type SortType = 'rating' | 'un-reviewed' | 'bookmarked' | null

export function useSort(initialSort: SortType = 'rating') {
  const [activeSort, setActiveSort] = useState<SortType>(initialSort)

  const handleSortClick = (sortType: SortType) => {
    setActiveSort(activeSort === sortType ? null : sortType)
  }

  return {
    activeSort,
    handleSortClick,
  }
}