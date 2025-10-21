import type { ReactNode } from 'react'
import { partnerColors } from '@/components/partner/designSystem'

interface SidebarSectionProps {
  title: string
  children: ReactNode
}

export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div
      className="border rounded-2xl px-4 py-4"
      style={{ backgroundColor: partnerColors.surfaceMuted, borderColor: partnerColors.border }}
    >
      <h3 className="text-[12px] font-semibold text-white mb-3 uppercase tracking-[0.12em]">
        {title}
      </h3>
      <div className="flex flex-col space-y-1">{children}</div>
    </div>
  )
}
