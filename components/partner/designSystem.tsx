import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const partnerColors = {
  background: '#0D0D0D',
  surface: '#161616',
  surfaceSubtle: '#1C1C1C',
  surfaceMuted: 'rgba(255,255,255,0.05)',
  accent: '#55D186',
  accentHover: '#66F1A0',
  danger: '#FF8A8A',
  border: 'rgba(255,255,255,0.12)',
  textPrimary: 'rgba(255,255,255,0.95)',
  textSecondary: 'rgba(255,255,255,0.65)',
  textMuted: 'rgba(255,255,255,0.45)',
}

export const partnerTypography = {
  heading: 'font-semibold text-white',
  body: 'text-sm text-white/70',
  label: 'text-xs uppercase tracking-[0.12em] text-white/60',
}

export const partnerEffects = {
  frostedBackdrop: 'bg-[rgba(0,0,0,0.15)] backdrop-blur-[12px]',
}

export type PartnerButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const baseButton = 'inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50'

const variantClasses: Record<PartnerButtonVariant, string> = {
  primary: 'bg-[#55D186] text-white hover:bg-[#55D186]/90',
  secondary: 'border border-white/20 text-white/80 hover:text-white hover:border-white/40',
  ghost: 'text-white/70 hover:text-white',
  danger: 'border border-[#FF8A8A] text-[#FF8A8A] hover:bg-[#FF8A8A]/10',
}

export interface PartnerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PartnerButtonVariant
}

export function PartnerButton({ variant = 'primary', className, ...props }: PartnerButtonProps) {
  return (
    <button
      className={cn(baseButton, variantClasses[variant], className)}
      {...props}
    />
  )
}
