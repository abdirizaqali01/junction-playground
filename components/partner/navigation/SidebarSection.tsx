import type { ReactNode } from 'react'
import * as style from '@/styles/design-system'
import { partnerText } from '@/styles/design-system'

interface SidebarSectionProps {
  title: string
  children: ReactNode
}

export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div
      className={`${style.gradientBorder.subtle.className} px-3 py-3`}
      style={style.gradientBorder.subtle.style}
    >
      <h3
        className="text-[0.72rem] font-semibold mt-1.5 mb-2.5 ml-2.5 uppercase tracking-[0.12em]"
        style={{ color: partnerText.primary }}
      >
        {title}
      </h3>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
