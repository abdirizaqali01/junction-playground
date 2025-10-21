import { MessageSquare } from 'lucide-react'

interface ProjectContentProps {
  title: string
  team: string
  description: string
  time: string
  comments: number
  onViewClick?: () => void
}

export default function ProjectContent({
  title,
  team,
  description,
  time,
  comments,
  onViewClick,
}: ProjectContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div>
        <h2 className="text-base sm:text-[17px] font-semibold text-white leading-snug pr-16 sm:pr-[72px]">{title}</h2>
        <p className="text-xs sm:text-[13px] text-white/70 mb-2 pr-16 sm:pr-[72px]">{team}</p>
        <p className="text-xs sm:text-[13px] font-light text-white/60 leading-[120%] tracking-[-0.02em] pr-16 sm:pr-[72px] mb-2.5 sm:mb-[11px]">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-[11px] text-[10px] sm:text-[11px] text-white/50">
          <span>{time}</span>
          <span className="w-[2px] h-[2px] bg-white/40 rounded-full" />
          <div className="flex items-center gap-1">
            <MessageSquare size={11} />
            <span>{comments}</span>
          </div>
        </div>
        
        <button 
          onClick={onViewClick}
          className="flex items-center gap-1.5 text-xs sm:text-[13px] text-white/70 hover:text-white transition-colors"
        >
          View
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}