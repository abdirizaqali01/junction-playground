import type { ReactNode } from 'react'
import { partnerColors } from '@/components/partner/designSystem'
import * as style from '@/styles/design-system'

interface SidebarSectionProps {
  title: string
  children: ReactNode
}

export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div
      className={`${style.gradientBorder.subtle.className} px-3.5 py-4`}
      style={style.gradientBorder.subtle.style}
    >
      <h3 className="text-[0.8rem] font-semibold text-white mt-2 mb-3 ml-3 uppercase tracking-[0.12em]">
        {title}
      </h3>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
