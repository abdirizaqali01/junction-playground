'use client'
import React from 'react'
import Sidebar from '@/components/partner/navigation/Sidebar'
import SearchBar from '@/components/Bar/SearchBar'
import PageHeader from '@/components/partner/layout/PageHeader'
import ProjectStats from '@/components/partner/sections/ProjectStats'
import SortControls from '@/components/Controls/SortControls'
import ProjectList from '@/components/Lists/ProjectList'
import { useProjects } from '@/hooks/useProjects'
import { useSort } from '@/hooks/useSort'
import { useSearch } from '@/hooks/useSearch'
import { useProjectFilters } from '@/hooks/useProjectFilters'

export default function ProjectSubmissionsPage() {
  const { projects, toggleBookmark } = useProjects()
  const { activeSort, handleSortClick } = useSort('rating')
  const { searchQuery, handleSearchChange } = useSearch()
  const filteredProjects = useProjectFilters(projects, activeSort, searchQuery)

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white">
      <div className="fixed top-0 left-0 h-screen z-50">
        <Sidebar />
      </div>

      <div
        className="flex flex-1 justify-center"
        style={{ marginLeft: 'var(--partner-sidebar-width)' }}
      >
        <main className="flex-1 flex justify-center overflow-auto" style={{ marginLeft: 0 }}>
          <div className="w-full max-w-[1200px] px-[4%] py-[2%]">
            <div className="flex flex-col gap-6">
              <PageHeader title="Project Submissions" />
              <ProjectStats projects={projects} />
              <section className="flex items-center justify-between gap-4">
                <SortControls activeSort={activeSort} onSortClick={handleSortClick} />
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search submissions..."
                />
              </section>
              <ProjectList projects={filteredProjects} onBookmarkToggle={toggleBookmark} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}