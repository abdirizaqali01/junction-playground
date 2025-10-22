import * as style from '@/styles/design-system'
import { partnerBorders, partnerSurfaces, partnerText } from '@/styles/design-system'

interface PartnerCardProps {
  name: string
  email: string
}

export default function PartnerCard({ name, email }: PartnerCardProps) {
  return (
    <div
      className={`${style.border.radius.outer} p-3 flex items-center gap-2.5 mt-5 cursor-pointer border`}
      style={{
        backgroundColor: partnerSurfaces.muted,
        borderColor: partnerBorders.subtle,
      }}
    >
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-semibold ${style.border.radius.middle}`}
        style={{
          backgroundColor: partnerSurfaces.muted,
          color: partnerText.secondary,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className="text-[0.9rem] font-medium"
          style={{ color: partnerText.primary }}
        >
          {name}
        </span>
        <span
          className="text-[0.8rem] text-light"
          style={{ color: partnerText.secondary }}
        >
          {email}
        </span>
      </div>
    </div>
  )
}
