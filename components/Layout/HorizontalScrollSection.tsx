import { ReactNode } from 'react'

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
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-[#55D186] border border-[#55D186] rounded-lg px-4 py-1.5 hover:bg-[#55D186]/10 transition-colors"
          >
            {viewAllText}
          </button>
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