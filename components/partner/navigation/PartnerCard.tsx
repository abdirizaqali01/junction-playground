import * as style from '@/styles/design-system'

interface PartnerCardProps {
  name: string
  email: string
}

export default function PartnerCard({ name, email }: PartnerCardProps) {
  return (
    <div className={`bg-white/5 border border-white/5 ${style.border.radius.outer} p-3 flex items-center gap-2.5 mt-5 cursor-pointer`}>
      <div className={`bg-white/5 w-10 h-10 flex items-center justify-center rounded-full text-xs font-semibold text-white/80 ${style.border.radius.middle}`}>
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[0.9rem] font-medium text-white">{name}</span>
        <span className="text-[0.8rem] text-white/60 text-light">{email}</span>
      </div>
    </div>
  )
}
