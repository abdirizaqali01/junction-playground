import { ReactNode } from 'react'
import { partnerAccents, PartnerButton, partnerText } from '@/styles/design-system'
import { withVars } from '../utils/style'

interface HorizontalScrollSectionProps {
  title: string
  viewAllText?: string
  onViewAll?: () => void
  children: ReactNode
}

export default function HorizontalScrollSection({
  title,
  viewAllText = 'View all',
  onViewAll,
  children,
}: HorizontalScrollSectionProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 
        className="whitespace-nowrap text-lg font-semibold sm:text-xl lg:text-[1.5rem]"
        style={{ color: partnerText.primary }}
        >
          {title}
        </h2>
        {onViewAll && (
          <PartnerButton
            variant="secondary"
            className="text-sm px-4 py-1.5 border hover:bg-[var(--partner-button-hover)]"
            onClick={onViewAll}
            style={withVars(
            {
              borderColor: partnerAccents.solid,
              color: partnerAccents.solid,
            },
            { '--partner-button-hover': partnerAccents.tint }
          )}
          >
            {viewAllText}
          </PartnerButton>
        )}
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2">
          {children}
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
