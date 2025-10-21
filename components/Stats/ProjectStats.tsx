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

  return (
    <section className="grid grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Submissions" value={stats.total} />
      <StatCard label="Submissions Reviewed" value={stats.reviewed} />
      <StatCard label="Submissions Pending" value={stats.pending} />
      <StatCard label="Teams" value={stats.teams} />
    </section>
  )
}