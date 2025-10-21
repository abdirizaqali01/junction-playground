import { useMemo } from 'react'
import type { Project } from '@/hooks/useProjects'

export function useProjectFilters(
  projects: Project[],
  activeSort: string | null,
  searchQuery: string
) {
  return useMemo(() => {
    let filtered = [...projects]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.team.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    // Apply sort/filter
    if (activeSort === 'rating') {
      filtered.sort((a, b) => {
        if (a.rating === undefined) return 1
        if (b.rating === undefined) return -1
        return b.rating - a.rating
      })
    } else if (activeSort === 'un-reviewed') {
      filtered = filtered.filter((p) => !p.reviewed)
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (activeSort === 'bookmarked') {
      filtered = filtered.filter((p) => p.bookmarked)
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }, [projects, searchQuery, activeSort])
}
