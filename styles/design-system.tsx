//----------------------------------------------------------------//
// OPTIMIZED DESIGN SYSTEM - NO RUNTIME CSS VARIABLE INITIALIZATION
//----------------------------------------------------------------//

// FONTS - Optimized for instant loading
import { Space_Grotesk, Space_Mono } from 'next/font/google'

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
    top: 'pt-[10%] lg:pt-[5%]',
    bottom: 'pt-[10%] lg:pb-[5%]',
}

// SECTION TITLES
export const sectionTitle = {
    grotesk: 'text-[var(--color-light-opacity100)] font-space-grotesk font-[600] text-[1.7rem] tracking-[-0.01rem] mb-5',
}

// STATUS BADGE
export const status = {
    greenLight: `bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] px-4 py-2 ${border.radius.full} text-sm font-light font-[var(--font-space-grotesk)]`,
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