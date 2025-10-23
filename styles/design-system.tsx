//----------------------------------------------------------------//
// OPTIMIZED DESIGN SYSTEM - NO RUNTIME CSS VARIABLE INITIALIZATION
//----------------------------------------------------------------//

// FONTS - Optimized for instant loading
import type { ButtonHTMLAttributes } from 'react'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import { mainButtonVariants } from '@/components/attachables/main-button'

export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin', 'latin-ext'],
    display: 'block',
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space-grotesk',
    preload: true,
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
})

export const spaceMono = Space_Mono({
    subsets: ['latin', 'latin-ext'],
    display: 'block',
    weight: ['400', '700'],
    variable: '--font-space-mono',
    preload: true,
    fallback: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
})

// COLORS - Pre-computed for instant access
export const colors = {
    primary: {
        opacity100: '#55D186',
        opacity95: '#55D186F2',
        opacity90: '#55D186E6',
        opacity85: '#55D186D9',
        opacity80: '#55D186CC',
        opacity75: '#55D186BF',
        opacity70: '#55D186B3',
        opacity65: '#55D186A6',
        opacity60: '#55D18699',
        opacity55: '#55D1868C',
        opacity50: '#55D18680',
        opacity45: '#55D18673',
        opacity40: '#55D18666',
        opacity35: '#55D18659',
        opacity30: '#55D1864D',
        opacity25: '#55D18640',
        opacity20: '#55D18633',
        opacity15: '#55D18626',
        opacity10: '#55D1861A',
        opacity5: '#55D1860D',
    },
    secondary: {
        opacity100: '#9069FF',
        opacity60: '#9069FF99',
        opacity50: '#9069FF80',
        opacity40: '#9069FF66',
    },
    alerts: {
        opacity100: '#FF8383',
        opacity60: '#FF838399',
        opacity50: '#FF838380',
        opacity40: '#FF838366',
    },
    light: {
        opacity100: '#F6F6F6',
        opacity60: '#F6F6F699',
        opacity50: '#F6F6F680',
        opacity40: '#F6F6F666',
        opacity30: '#F6F6F64D',
        opacity20: '#F6F6F633',
        opacity15: '#F6F6F626',
        opacity10: '#F6F6F61A',
        opacity5: '#F6F6F60D',
    },
    white: {
        opacity100: '#ffffff',
        opacity90: '#ffffffe6',
        opacity80: '#ffffffcc',
        opacity70: '#ffffffb3',
        opacity60: '#FFFFFF99',
        opacity50: '#FFFFFF80',
        opacity40: '#FFFFFF66',
        opacity30: '#FFFFFF4D',
        opacity20: '#FFFFFF33',
        opacity15: '#FFFFFF26',
        opacity10: '#FFFFFF1A', 
        opacity5: '#FFFFFF0D',
    },
    dark: {
        opacity100: '#0D0D0D',
        opacity80: '#0D0D0DCC',
        opacity70: '#0D0D0DB3',
        opacity60: '#0D0D0D99',
        opacity50: '#0D0D0D80',
        opacity40: '#0D0D0D66',
    }
}

// BORDER RADIUS
export const border = {
    solid: 'border',
    radius: {
        full: 'rounded-full',
        outer: 'rounded-[10px]',
        middle: 'rounded-[5px]',
        inner: 'rounded-[3px]',
    }
}

//----------------------------------------------------------------//
// COMPONENTS - Optimized for performance
//----------------------------------------------------------------//

// SECTION GAPS
export const sectionGap = {
    top: 'pt-[8%] lg:pt-[4%]',
    bottom: 'pt-[8%] lg:pb-[4%]',
}

// SECTION TITLES
export const sectionTitle = {
    grotesk: 'text-[var(--color-light-opacity100)] font-space-grotesk font-[600] text-[1.5rem] tracking-[-0.01rem] mb-4',
}

// STATUS BADGE
export const status = {
    greenLight: `bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] px-3 py-1.5 ${border.radius.full} text-xs font-medium font-[var(--font-space-grotesk)]`,
}

// FONT STYLES - Optimized
export const font = {
    grotesk: {
        main: 'font-space-grotesk !font-[600] tracking-[-0.01rem]',
        heavy: 'font-space-grotesk !font-[700] tracking-[-0.05rem]',
        medium: 'font-space-grotesk !font-[500] tracking-[-0.01rem]',
        light: 'font-space-grotesk !font-[300] tracking-[-0.01rem]',
    },

    mono: {
        title: 'font-space-mono !font-[700] tracking-[-0.01rem]',
        text: 'font-space-mono !font-[400] tracking-[-0.03rem]',
    }
}

// BOX STYLING - Optimized
export const box = {
    gray: {
        bottom: `bg-[var(--color-white-opacity5)] ${border.solid} ${border.radius.outer} border-[var(--color-white-opacity20)]`,
        middle: `bg-[var(--color-white-opacity10)] ${border.solid} ${border.radius.middle} border-[var(--color-white-opacity20)]`,
        top: `bg-[var(--color-white-opacity20)] ${border.solid} ${border.radius.inner} border-[var(--color-white-opacity20)]`,
        solid: `bg-[#191919] ${border.solid} ${border.radius.outer} border-[var(--color-white-opacity20)]`,
    },

    primary: {
        bottom: `bg-[var(--color-primary-opacity5)] ${border.solid} ${border.radius.outer} border-[var(--color-primary-opacity100)]`,
        middle: `bg-[var(--color-primary-opacity10)] ${border.solid} ${border.radius.middle} border-[var(--color-primary-opacity100)]`,
        top: `bg-[var(--color-primary-opacity20)] ${border.solid} ${border.radius.inner} border-[var(--color-primary-opacity100)]`,
    },

    grayPrimary: `bg-[var(--color-white-opacity15)] ${border.solid} ${border.radius.outer} border-[var(--color-primary-opacity100)]`,
    graySecondary: `bg-[var(--color-white-opacity10)] ${border.solid} ${border.radius.outer} border-[var(--color-primary-opacity100)]`,
    light: `bg-[var(--color-light-opacity100)] ${border.solid} ${border.radius.outer} border-[var(--color-light-opacity100)]`,
}

// GRADIENT BORDERS - Reusable gradient border styles
export const gradientBorder = {
    // Partner sidebar style - main content with gradient border
    boxContainer: {
        className: 'relative',
        style: {
            borderRadius: '16px',
            background: `linear-gradient(175deg, #1C1C1C 5.23%, #1A1A1A 94.69%) padding-box, 
                        linear-gradient(90deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.12) 100%) border-box`,
            border: '1px solid transparent',
        }
    },
    
    subtle: {
        className: 'relative',
        style: {
            borderRadius: '8px',
            background: `linear-gradient(175deg, #272727 5.23%, #272727 94.69%) padding-box, 
                        linear-gradient(90deg, ${colors.white.opacity20} 0%, ${colors.white.opacity10} 100%) border-box`,
            border: '1px solid transparent',
        }
    },
    
    // Helper function for custom gradients
    custom: (contentBg: string, borderGradient: string, borderRadius: string = '12px', borderWidth: string = '1px') => ({
        className: 'relative',
        style: {
            borderRadius,
            background: `${contentBg} padding-box, ${borderGradient} border-box`,
            border: `${borderWidth} solid transparent`,
        }
    })
}

// TAGS
export const tag = {
    main: `bg-[var(--color-light-opacity10)] text-[var(--color-light-opacity90)] px-[8px] ${border.radius.middle} ${border.solid} border-[var(--color-white-opacity10)] border-[0.5px] text-[0.8rem] font-[400] leading-loose font-space-mono`,
}

// PERFORMANCE UTILITIES
export const perf = {
    // Optimized transitions
    transition: {
        fast: 'transition-all duration-150 ease-out',
        smooth: 'transition-all duration-300 ease-in-out',
        slow: 'transition-all duration-500 ease-in-out',
    },
    
    // Hardware acceleration
    gpu: 'transform-gpu will-change-transform',
    
    // Optimized animations
    animation: {
        fadeIn: 'animate-in fade-in duration-300',
        fadeOut: 'animate-out fade-out duration-300',
        slideIn: 'animate-in slide-in-from-bottom duration-300',
        slideOut: 'animate-out slide-out-to-bottom duration-300',
    }
}

// LAYOUT STYLES - Applicable layout classes and styles
export const layoutStyles = {
    // Partner layout system - 20/80 split with minimum sidebar width
    partner: {
        // Container for the entire page
        pageContainer: 'flex min-h-screen overflow-hidden bg-[#0D0D0D] text-white',
        
        // Fixed sidebar positioning
        sidebarContainer: 'fixed top-0 left-0 h-screen z-50',
        sidebarWidth: 'w-full lg:w-[clamp(220px,18vw,320px)]',
        
        // Main content area 
        mainContainer: 'flex flex-1 items-start justify-center overflow-y-auto',
        mainContentWrapper: 'w-full',
        mainContentPadding: 'w-full px-[3%] pt-[2.5%] pb-[1.5%]',
        
        // Inline styles for main content positioning
        mainStyle: {
            marginLeft: 'clamp(220px, 18vw, 320px)',
            width: 'calc(100vw - clamp(220px, 18vw, 320px))',
        },
        
        // Content max-width constraint
        contentMaxWidth: { maxWidth: '1180px' }
    },
    
    // Alternative layout ratios (simple percentage-based)
    ratios: {
        narrow: {
            sidebarWidth: 'w-full lg:w-[clamp(200px,13vw,280px)]',
            mainStyle: { marginLeft: 'clamp(200px, 13vw, 280px)', width: 'calc(100vw - clamp(200px, 13vw, 280px))' }
        },
        standard: {
            sidebarWidth: 'w-full lg:w-[clamp(220px,18vw,320px)]', 
            mainStyle: { marginLeft: 'clamp(220px, 18vw, 320px)', width: 'calc(100vw - clamp(220px, 18vw, 320px))' }
        },
        wide: {
            sidebarWidth: 'w-full lg:w-[clamp(240px,23vw,360px)]',
            mainStyle: { marginLeft: 'clamp(240px, 23vw, 360px)', width: 'calc(100vw - clamp(240px, 23vw, 360px))' }
        }
    }
}

// Partner-specific theme tokens built on top of core design system
export const partnerTheme = {
    colors: {
        background: colors.dark.opacity100,
        surface: '#161616',
        surfaceSubtle: '#1C1C1C',
        surfaceMuted: colors.white.opacity5,
        surfaceCard: '#1B1B1B',
        surfaceRaised: '#1A1A1A',
        surfaceRaisedHover: '#202020',
        surfaceSunken: '#151515',
        surfaceSuccess: '#102219',
        mediaPlaceholder: 'rgba(70, 70, 70, 0.5)',
        accent: colors.primary.opacity100,
        accentHover: '#66F1A0',
        accentTint: colors.primary.opacity10,
        danger: colors.alerts.opacity100,
        border: 'rgba(255,255,255,0.12)',
        borderSubtle: colors.white.opacity10,
        textPrimary: colors.white.opacity90,
        textSecondary: colors.white.opacity60,
        textMuted: colors.white.opacity40,
        textSoft: colors.white.opacity50,
    },
    typography: {
        heading: 'font-semibold text-white',
        body: 'text-sm text-white/70',
        label: 'text-xs uppercase tracking-[0.12em] text-white/60',
    },
    effects: {
        frostedBackdrop: 'bg-[rgba(0,0,0,0.15)] backdrop-blur-[12px]',
    },
}

export const partnerColors = partnerTheme.colors
export const partnerTypography = partnerTheme.typography
export const partnerEffects = partnerTheme.effects

export const partnerSurfaces = {
    base: partnerTheme.colors.surface,
    card: partnerTheme.colors.surfaceCard,
    raised: partnerTheme.colors.surfaceRaised,
    raisedHover: partnerTheme.colors.surfaceRaisedHover,
    sunken: partnerTheme.colors.surfaceSunken,
    muted: partnerTheme.colors.surfaceMuted,
    success: partnerTheme.colors.surfaceSuccess,
    placeholder: partnerTheme.colors.mediaPlaceholder,
}

export const partnerBorders = {
    default: partnerTheme.colors.border,
    subtle: partnerTheme.colors.borderSubtle,
    hover: colors.white.opacity20,
    accent: partnerTheme.colors.accent,
}

export const partnerText = {
    primary: partnerTheme.colors.textPrimary,
    secondary: partnerTheme.colors.textSecondary,
    muted: partnerTheme.colors.textMuted,
    soft: partnerTheme.colors.textSoft,
}

export const partnerAccents = {
    solid: partnerTheme.colors.accent,
    hover: partnerTheme.colors.accentHover,
    tint: partnerTheme.colors.accentTint,
    danger: partnerTheme.colors.danger,
}

export type PartnerButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const partnerButtonBaseClasses =
    'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50'

const partnerAttachableVariants: Partial<Record<PartnerButtonVariant, string>> = {
    primary: mainButtonVariants({ variant: 'primary', size: 'sm' }),
    danger: mainButtonVariants({ variant: 'alerts', size: 'sm' }),
    ghost: mainButtonVariants({ variant: 'ghost', size: 'sm' }),
}

const partnerButtonVariants: Record<PartnerButtonVariant, string> = {
    primary: cn(partnerAttachableVariants.primary, 'rounded-xl px-5'),
    danger: cn(partnerAttachableVariants.danger, 'rounded-xl px-5'),
    ghost: cn(partnerAttachableVariants.ghost, 'rounded-xl px-5'),
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
    const mergedClassName = cn(partnerButtonBaseClasses, partnerButtonVariants[variant], className)

    return <button className={mergedClassName} {...props} />
}
