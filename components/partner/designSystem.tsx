import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { partnerTheme } from '@/styles/design-system'
import { mainButtonVariants } from '@/components/attachables/main-button'

export const partnerColors = partnerTheme.colors
export const partnerTypography = partnerTheme.typography
export const partnerEffects = partnerTheme.effects

export type PartnerButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const commonBaseClasses =
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50'

const attachableVariants: Partial<Record<PartnerButtonVariant, string>> = {
  primary: mainButtonVariants({ variant: 'primary', size: 'sm' }),
  danger: mainButtonVariants({ variant: 'alerts', size: 'sm' }),
  ghost: mainButtonVariants({ variant: 'ghost', size: 'sm' }),
}

const variantClasses: Record<PartnerButtonVariant, string> = {
  primary: cn(attachableVariants.primary, 'rounded-xl px-5'),
  danger: cn(attachableVariants.danger, 'rounded-xl px-5'),
  ghost: cn(attachableVariants.ghost, 'rounded-xl px-5'),
  secondary: cn(
    'px-5 py-2 border bg-transparent',
    'text-white/80 hover:text-white',
    'border-white/20 hover:border-white/40'
  ),
}

export interface PartnerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PartnerButtonVariant
}

export function PartnerButton({
  variant = 'primary',
  className,
  ...props
}: PartnerButtonProps) {
  const mergedClassName = cn(commonBaseClasses, variantClasses[variant], className)

  return <button className={mergedClassName} {...props} />
}
