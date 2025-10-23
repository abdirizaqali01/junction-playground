'use client'

import { useCallback, useEffect, useState } from 'react'
import PartnerLayout from '@/components/partner/layout/PartnerLayout'
import PageHeader from '@/components/partner/layout/PageHeader'
import { cn } from '@/lib/utils'
import {
  PartnerButton,
  partnerAccents,
  partnerBorders,
  partnerSurfaces,
  partnerText,
} from '@/styles/design-system'
import { usePartnerChallenges } from '@/hooks/usePartnerChallenges'
import { PartnerChallengeCard } from '@/components/partner/challenges/PartnerChallengeCard'
import { PartnerChallengeNavigator } from '@/components/partner/challenges/PartnerChallengeNavigator'

type ChallengeFilter = 'main' | 'side'

const FILTER_OPTIONS: { label: string; value: ChallengeFilter }[] = [
  { label: 'Main Challenges', value: 'main' },
  { label: 'Side Challenges', value: 'side' },
]

const toAnchorId = (value: string) =>
  `category-${value.replace(/\s+/g, '-').toLowerCase()}`

export default function PartnerChallengesPage() {
  const {
    groupedMainChallenges,
    groupedSideChallenges,
    categoryAnchors,
  } = usePartnerChallenges()

  const [selectedFilter, setSelectedFilter] = useState<ChallengeFilter>('main')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    if (selectedFilter === 'main' && categoryAnchors.length > 0) {
      setActiveCategory(categoryAnchors[0])
    } else if (selectedFilter === 'side') {
      setActiveCategory(null)
    }
  }, [categoryAnchors, selectedFilter])

  useEffect(() => {
    if (selectedFilter !== 'main' || categoryAnchors.length === 0) return

    const HEADER_OFFSET = 140

    const updateActiveCategory = () => {
      const scrollPosition = window.scrollY + HEADER_OFFSET
      let current: string | null = categoryAnchors[0] ?? null

      for (const category of categoryAnchors) {
        const element = document.getElementById(toAnchorId(category))
        if (!element) continue
        const elementTop = element.getBoundingClientRect().top + window.scrollY

        if (scrollPosition >= elementTop) {
          current = category
        } else {
          break
        }
      }

      setActiveCategory(prev => (prev === current ? prev : current))
    }

    updateActiveCategory()

    window.addEventListener('scroll', updateActiveCategory, { passive: true })
    window.addEventListener('resize', updateActiveCategory)

    return () => {
      window.removeEventListener('scroll', updateActiveCategory)
      window.removeEventListener('resize', updateActiveCategory)
    }
  }, [categoryAnchors, selectedFilter])

  const groupedChallenges =
    selectedFilter === 'main' ? groupedMainChallenges : groupedSideChallenges

  const handleCategoryClick = useCallback((category: string) => {
    const target = document.getElementById(toAnchorId(category))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <PartnerLayout forcedActivePath="/partners/challenges">
      <PageHeader title="All Challenges" timer="T 18:46:09" status="Hacking Ongoing" />

      <section className="space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex gap-2 rounded-2xl border p-1"
            style={{
              backgroundColor: partnerSurfaces.sunken,
              borderColor: partnerBorders.subtle,
            }}
          >
            {FILTER_OPTIONS.map(option => (
              <PartnerButton
                key={option.value}
                variant={selectedFilter === option.value ? 'primary' : 'ghost'}
                className={cn(
                  'px-4 py-2 text-sm font-medium',
                  selectedFilter === option.value
                    ? 'shadow-[0_0_30px_rgba(85,209,134,0.2)]'
                    : undefined
                )}
                onClick={() => setSelectedFilter(option.value)}
              >
                {option.label}
              </PartnerButton>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col gap-8 xl:flex-row">
          <div className="flex-1 space-y-10">
            {groupedChallenges.length === 0 ? (
              <div
                className="rounded-2xl border p-6 text-center text-sm"
                style={{
                  backgroundColor: partnerSurfaces.card,
                  borderColor: partnerBorders.subtle,
                  color: partnerText.secondary,
                }}
              >
                No challenges available yet. Check back soon.
              </div>
            ) : (
              groupedChallenges.map(group => (
                <div
                  key={group.category}
                  id={toAnchorId(group.category)}
                  className="space-y-4"
                >
                  <div className="flex items-baseline justify-between">
                    <h2
                      className="text-xl font-semibold"
                      style={{ color: partnerAccents.solid }}
                    >
                      {group.category}
                    </h2>
                    <span
                      className="text-xs uppercase tracking-[0.08em]"
                      style={{ color: partnerText.soft }}
                    >
                      {group.challenges.length}{' '}
                      {group.challenges.length === 1 ? 'challenge' : 'challenges'}
                    </span>
                  </div>

                  <div
                    className={cn(
                      selectedFilter === 'main'
                        ? 'space-y-4'
                        : 'grid grid-cols-1 gap-4 md:grid-cols-2'
                    )}
                  >
                    {group.challenges.map(challenge => (
                      <PartnerChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        compact={selectedFilter === 'side'}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedFilter === 'main' && (
            <PartnerChallengeNavigator
              categories={categoryAnchors}
              activeCategory={activeCategory}
              onCategorySelect={handleCategoryClick}
            />
          )}
        </div>
      </section>
    </PartnerLayout>
  )
}
