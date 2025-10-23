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
    <aside className="hidden xl:block xl:w-56">
      <div className="sticky top-28 space-y-4">
        <div className="flex flex-col gap-1.5">
          {categories.map(category => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={cn(
                  'flex items-center justify-end text-sm transition-all duration-200 w-full text-right',
                  isActive
                    ? 'font-semibold'
                    : undefined
                )}
                style={{
                  color: isActive ? partnerText.primary : partnerText.secondary,
                }}
              >
                <span className="flex items-center gap-0">
                  <span>{category}</span>
                  <span
                    aria-hidden
                    className={cn(
                      'text-base leading-none ml-[2px] transition-colors'
                    )}
                    style={{
                      color: isActive ? partnerAccents.solid : partnerText.soft,
                    }}
                  >
                    {isActive ? '●' : '—'}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
