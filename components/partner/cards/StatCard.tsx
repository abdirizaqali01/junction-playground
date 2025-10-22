import { partnerAccents, partnerBorders, partnerSurfaces, partnerText } from '@/styles/design-system'

interface StatCardProps {
  label: string
  value: number
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div
      className="relative w-full border rounded-xl px-6 py-5 sm:px-8 sm:py-6"
      style={{
        backgroundColor: partnerSurfaces.muted,
        borderColor: partnerBorders.accent,
      }}
    >
      <div
        className="absolute inset-[2px] border rounded-lg pointer-events-none"
        style={{ borderColor: partnerBorders.subtle }}
      />

      <div className="relative flex flex-col justify-center gap-1">
        <h3
          className="text-[11px] uppercase tracking-wide"
          style={{ color: partnerText.secondary }}
        >
          {label}
        </h3>
        <p className="text-[27px] font-bold" style={{ color: partnerAccents.solid }}>
          {value}
        </p>
      </div>
    </div>
  )
}
