'use client'

import { cn } from '@/lib/utils'
import {
  partnerBorders,
  partnerSurfaces,
  partnerText,
} from '@/styles/design-system'

interface PartnerChallengeSectionCardProps {
  title: string
  children: React.ReactNode
  subtitle?: string
  variant?: 'default' | 'muted'
  className?: string
}

export function PartnerChallengeSectionCard({
  title,
  subtitle,
  variant = 'default',
  className,
  children,
}: PartnerChallengeSectionCardProps) {
  const backgroundColor = variant === 'muted' ? partnerSurfaces.card : partnerSurfaces.raised

  return (
    <section
      className={cn('rounded-2xl border p-6 md:p-8 space-y-4', className)}
      style={{
        backgroundColor,
        borderColor: partnerBorders.subtle,
        color: partnerText.secondary,
      }}
    >
      <header className="space-y-1">
        {subtitle && (
          <p
            className="text-xs uppercase tracking-[0.12em]"
            style={{ color: partnerText.soft }}
          >
            {subtitle}
          </p>
        )}
        <h2
          className="text-xl font-semibold"
          style={{ color: partnerText.primary }}
        >
          {title}
        </h2>
      </header>
      <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </section>
  )
}
