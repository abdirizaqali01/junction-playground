'use client'

import { useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { partnerText } from '@/styles/design-system'
import type { Project } from '@/hooks/useProjects'

interface NextProjectPromptProps {
  projects: Project[]
  currentProjectId: string
  reviewerId: string
  onNavigate: (projectId: string) => void
  className?: string
}

export function NextProjectPrompt({
  projects,
  currentProjectId,
  reviewerId,
  onNavigate,
  className,
}: NextProjectPromptProps) {
  const nextProject = useMemo(() => {
    if (!projects.length) return null
    const currentIndex = projects.findIndex(p => p.id === currentProjectId)
    const ordered = currentIndex >= 0
      ? [...projects.slice(currentIndex + 1), ...projects.slice(0, currentIndex)]
      : projects

    return ordered.find(project =>
      !project.reviews.some(review => review.reviewerId === reviewerId)
    ) ?? null
  }, [projects, currentProjectId, reviewerId])

  if (!nextProject) return null

  return (
    <button
      onClick={() => onNavigate(nextProject.id)}
      className={cn(
        'inline-flex items-center gap-2 text-sm transition-colors hover:text-white focus:text-white',
        className
      )}
      style={{ color: partnerText.soft }}
    >
      <span>Next project</span>
      <ArrowRight size={16} strokeWidth={1.75} />
    </button>
  )
}
