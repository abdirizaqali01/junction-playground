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
    sideCategoryAnchors,
  } = usePartnerChallenges()

  const [selectedFilter, setSelectedFilter] = useState<ChallengeFilter>('main')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    if (selectedFilter === 'main' && categoryAnchors.length > 0) {
      setActiveCategory(categoryAnchors[0])
    } else if (selectedFilter === 'side' && sideCategoryAnchors.length > 0) {
      setActiveCategory(sideCategoryAnchors[0])
    } else {
      setActiveCategory(null)
    }
  }, [categoryAnchors, sideCategoryAnchors, selectedFilter])

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

  const sideNavCategories = selectedFilter === 'main' ? categoryAnchors : sideCategoryAnchors

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
          <div className="flex gap-3">
            {FILTER_OPTIONS.map(option => {
              const isActive = selectedFilter === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={cn(
                    'rounded-[14px] border px-6 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                    isActive
                      ? 'border-white/10 bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.25)]'
                      : 'text-white/60 hover:text-white'
                  )}
                  style={
                    !isActive
                      ? {
                          backgroundColor: partnerSurfaces.sunken,
                          borderColor: partnerBorders.subtle,
                        }
                      : undefined
                  }
                >
                  {option.label}
                </button>
              )
            })}
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
                      className="text-xl font-semibold bg-gradient-to-r from-[rgba(85,209,134,1)] via-[rgba(85,209,134,0.85)] to-[rgba(85,209,134,0.45)] bg-clip-text text-transparent"
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

                  <div className="space-y-4">
                    {group.challenges.map(challenge => (
                      <PartnerChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        href={`/partners/challenges/${challenge.id}`}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {sideNavCategories.length > 0 && (
            <PartnerChallengeNavigator
              categories={sideNavCategories}
              activeCategory={activeCategory}
              onCategorySelect={category => {
                handleCategoryClick(category)
                setActiveCategory(category)
              }}
            />
          )}
        </div>
      </section>
    </PartnerLayout>
  )
}
