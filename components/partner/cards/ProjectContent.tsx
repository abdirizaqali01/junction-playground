import { MessageSquare } from 'lucide-react'
import { partnerAccents, partnerText } from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

interface ProjectContentProps {
  title: string
  team: string
  description: string
  time: string
  comments: number
}

export default function ProjectContent({
  title,
  team,
  description,
  time,
  comments,
}: ProjectContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div>
        <h2
          className="text-base sm:text-[17px] font-semibold leading-snug pr-16 sm:pr-[72px]"
          style={{ color: partnerText.primary }}
        >
          {title}
        </h2>
        <p
          className="text-xs sm:text-[13px] mb-2 pr-16 sm:pr-[72px]"
          style={{ color: partnerText.secondary }}
        >
          {team}
        </p>
        <p
          className="text-xs sm:text-[13px] font-light leading-[120%] tracking-[-0.02em] pr-16 sm:pr-[72px] mb-2.5 sm:mb-[11px]"
          style={{ color: partnerText.secondary }}
        >
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-[11px] text-[10px] sm:text-[11px] mt-auto">
        <span style={{ color: partnerText.soft }}>{time}</span>
        <span
          className="w-[2px] h-[2px] rounded-full"
          style={{ backgroundColor: partnerText.muted }}
        />
        <div className="flex items-center gap-1" style={{ color: partnerText.soft }}>
          <MessageSquare size={11} />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  )
}
