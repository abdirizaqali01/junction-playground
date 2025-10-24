'use client'
import React from 'react'
import SearchBar from '@/components/partner/controls/SearchBar'
import PageHeader from '@/components/partner/layout/PageHeader'
import ProjectStats from '@/components/partner/sections/ProjectStats'
import SortControls from '@/components/partner/controls/SortControls'
import ProjectList from '@/components/partner/sections/ProjectList'
import { useProjects } from '@/hooks/useProjects'
import { useSort } from '@/hooks/useSort'
import { useSearch } from '@/hooks/useSearch'
import { useProjectFilters } from '@/hooks/useProjectFilters'
import PartnerLayout from '@/components/partner/layout/PartnerLayout'

export default function ProjectSubmissionsPage() {
  const { projects, toggleBookmark } = useProjects()
  const { activeSort, handleSortClick } = useSort('rating')
  const { searchQuery, handleSearchChange } = useSearch()
  const filteredProjects = useProjectFilters(projects, activeSort, searchQuery)

  return (
    <PartnerLayout forcedActivePath="/partners/submissions">
      <div className="flex flex-col gap-6">
        <PageHeader title="Project Submissions" />
        <ProjectStats projects={projects} />
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SortControls activeSort={activeSort} onSortClick={handleSortClick} />
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search submissions..."
          />
        </section>
        <ProjectList projects={filteredProjects} onBookmarkToggle={toggleBookmark} />
      </div>
    </PartnerLayout>
  )
}
