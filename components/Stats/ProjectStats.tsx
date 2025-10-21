import React from 'react'
import StatCard from '@/components/Cards/StatCard'
import { Project } from '@/hooks/useProjects'

interface ProjectStatsProps {
  projects: Project[]
}

export default function ProjectStats({ projects }: ProjectStatsProps) {
  const stats = {
    total: projects.length,
    reviewed: projects.filter(p => p.reviewed).length,
    pending: projects.filter(p => !p.reviewed).length,
    teams: new Set(projects.map(p => p.team)).size,
  }

  const statEntries: Array<{ label: string; value: number }> = [
    { label: 'Total Submissions', value: stats.total },
    { label: 'Submissions Reviewed', value: stats.reviewed },
    { label: 'Submissions Pending', value: stats.pending },
    { label: 'Teams', value: stats.teams },
  ]

  return (
    <section className="w-full mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {statEntries.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  )
}
