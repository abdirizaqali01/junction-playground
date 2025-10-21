'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import SearchBar from '@/components/Bar/SearchBar'
import PageHeader from '@/components/Layout/PageHeader'
import ProjectStats from '@/components/Stats/ProjectStats'
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

      <main className="flex-1 ml-[280px] px-8 py-8 flex flex-col items-center">
        <div className="w-full max-w-[960px]">
          <PageHeader title="Project Submissions" />

          <ProjectStats projects={projects} />

          <section className="flex justify-between items-center mb-6">
            <SortControls 
              activeSort={activeSort} 
              onSortClick={handleSortClick} 
            />
            
            <SearchBar 
              value={searchQuery} 
              onChange={handleSearchChange} 
              placeholder="Search submissions..." 
            />
          </section>

          <ProjectList 
            projects={filteredProjects}
            allProjects={projects}
            onBookmarkToggle={toggleBookmark}
          />
        </div>
      </main>
    </div>
  )
}