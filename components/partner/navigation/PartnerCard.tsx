interface PartnerCardProps {
  name: string
  email: string
}

export default function PartnerCard({ name, email }: PartnerCardProps) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-center gap-2.5 mt-5">
      <div className="bg-white/5 w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold text-white/80">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium text-white">{name}</span>
        <span className="text-[9px] text-white/60">{email}</span>
      </div>
    </div>
  )
}
