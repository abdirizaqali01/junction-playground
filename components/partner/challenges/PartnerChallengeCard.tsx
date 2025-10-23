'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { PartnerChallenge } from '@/hooks/usePartnerChallenges'
import {
  partnerAccents,
  partnerBorders,
  partnerSurfaces,
  partnerText,
} from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

interface PartnerChallengeCardProps {
  challenge: PartnerChallenge
  compact?: boolean
}

export function PartnerChallengeCard({
  challenge,
  compact = false,
}: PartnerChallengeCardProps) {
  const iconLabel =
    challenge.iconLabel ||
    challenge.sponsor
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

  const prizeEntries = useMemo(() => {
    const entries: { label: string; value: string }[] = []
    if (challenge.prizes.first) entries.push({ label: '1st Place', value: challenge.prizes.first })
    if (challenge.prizes.second) entries.push({ label: '2nd Place', value: challenge.prizes.second })
    if (challenge.prizes.third) entries.push({ label: '3rd Place', value: challenge.prizes.third })
    if (challenge.prizes.bonus) entries.push({ label: 'Bonus', value: challenge.prizes.bonus })
    return entries
  }, [challenge.prizes])

  const cardStyle = withVars(
    {
      backgroundColor: partnerSurfaces.raised,
      borderColor: partnerBorders.subtle,
    },
    {
      '--challenge-border-hover': partnerBorders.hover,
    }
  )

  const badgeStyle = {
    backgroundColor: partnerSurfaces.sunken,
    borderColor: partnerBorders.subtle,
    color: partnerText.primary,
  }

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 md:flex-row',
        'hover:-translate-y-0.5 hover:[border-color:var(--challenge-border-hover)]',
        compact ? 'gap-3 p-3' : 'gap-4 p-4 md:gap-5 md:p-6'
      )}
      style={cardStyle}
    >
      <div className={cn('shrink-0', compact ? 'md:w-32' : 'md:w-[200px]')}>
        {challenge.thumbnail ? (
          <div className="relative h-40 w-full overflow-hidden rounded-xl md:h-[200px]">
            <Image
              src={challenge.thumbnail}
              alt={challenge.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className={cn(
              'flex h-36 w-full items-center justify-center rounded-xl border text-4xl font-semibold uppercase md:h-[200px]',
              compact ? 'text-3xl md:text-4xl' : 'md:text-5xl'
            )}
            style={badgeStyle}
          >
            {iconLabel}
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between">
        <div className="space-y-3">
          {challenge.trackLabel && (
            <p
              className="text-xs font-medium uppercase tracking-[0.08em]"
              style={{ color: partnerText.soft }}
            >
              {challenge.trackLabel}
            </p>
          )}

          <div className="space-y-2">
            <h3
              className={cn(
                'font-semibold leading-tight',
                compact ? 'text-base' : 'text-lg md:text-xl'
              )}
              style={{ color: partnerText.primary }}
            >
              {challenge.title}
            </h3>
            <p
              className="text-sm md:text-base"
              style={{ color: partnerText.secondary }}
            >
              {challenge.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {challenge.tags.map(tag => (
              <span
                key={`${challenge.id}-${tag}`}
                className="rounded-md border px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-wide"
                style={{
                  backgroundColor: partnerSurfaces.sunken,
                  borderColor: partnerBorders.subtle,
                  color: partnerText.soft,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="my-4 h-px w-full"
          style={{ backgroundColor: partnerBorders.subtle }}
        />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm">
          <span style={{ color: partnerText.primary }}>Prizes</span>
          {prizeEntries.length > 0 ? (
            prizeEntries.map((entry, index) => (
              <div
                key={`${challenge.id}-${entry.label}`}
                className="flex items-center gap-3"
                style={{ color: partnerText.secondary }}
              >
                <span>
                  {entry.label}:{' '}
                  <span style={{ color: partnerText.primary }}>{entry.value}</span>
                </span>
                {index < prizeEntries.length - 1 && (
                  <span style={{ color: partnerBorders.subtle }}>•</span>
                )}
              </div>
            ))
          ) : (
            <span style={{ color: partnerText.secondary }}>To be announced</span>
          )}
        </div>
      </div>
    </article>
  )
}
