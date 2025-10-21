import React from 'react'
import ProjectCard from '@/components/partner/cards/ProjectCard'
import { Project } from '@/hooks/useProjects'

interface ProjectListProps {
  projects: Project[]
  onBookmarkToggle: (projectId: string) => void
}

export default function ProjectList({ 
  projects, 
  onBookmarkToggle 
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center text-white/50 py-12">
        No projects found matching your criteria.
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="relative rounded-xl overflow-hidden aspect-[1231/199]"
        >
          <div className="absolute inset-0 bg-white/10 pointer-events-none rounded-xl" />
          <ProjectCard 
            {...project} 
            isBookmarked={project.bookmarked}
            onBookmarkToggle={() => onBookmarkToggle(project.id)}
          />
        </div>
      ))}
    </section>
  )
}
