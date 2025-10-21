interface StatCardProps {
  label: string
  value: number
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="relative w-full border border-[#55D186] rounded-lg bg-white/10 px-6 py-5 sm:px-8 sm:py-6">
      <div className="absolute inset-[2px] border border-white/10 rounded-lg pointer-events-none" />

      <div className="relative flex flex-col justify-center gap-1">
        <h3 className="text-[11px] text-white/60 uppercase tracking-wide">{label}</h3>
        <p className="text-[27px] font-bold text-[#55D186] leading-tight">{value}</p>
      </div>
    </div>
  )
}
