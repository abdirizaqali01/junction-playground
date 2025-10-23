'use client'

import { cn } from '@/lib/utils'
import { partnerAccents, partnerText } from '@/styles/design-system'

interface PartnerChallengeNavigatorProps {
  categories: string[]
  activeCategory: string | null
  onCategorySelect: (category: string) => void
}

export function PartnerChallengeNavigator({
  categories,
  activeCategory,
  onCategorySelect,
}: PartnerChallengeNavigatorProps) {
  if (categories.length === 0) return null

  return (
    <div className="hidden xl:block">
      <div className="fixed top-28 right-10 z-30 space-y-2">
        {categories.map(category => {
          const isActive = activeCategory === category
          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={cn(
                'flex w-40 items-center justify-end gap-2 text-sm transition-colors duration-200',
                isActive ? 'font-medium text-white' : 'text-white/45 hover:text-white/70'
              )}
            >
              <span className="text-right leading-tight">{category}</span>
              <span
                aria-hidden
                className="text-base leading-none"
                style={{ color: isActive ? partnerAccents.solid : partnerText.soft }}
              >
                {isActive ? '●' : '—'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
