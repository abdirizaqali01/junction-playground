//----------------------------------------------------------------//
// DESIGN SYSTEM
//----------------------------------------------------------------//

// FONTS //
import { Space_Grotesk, Space_Mono } from 'next/font/google'

export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-space-grotesk',
})

export const spaceMono = Space_Mono({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    weight: ['400', '700'],
    variable: '--font-space-mono',
})


// COLORS //
export const colors = {
    primary: {
        opacity100: '#55D186',
        opacity60: '#55D18699',
        opacity50: '#55D18680',
        opacity40: '#55D18666',
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
    }
}

// BORDER RADIUS //
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
// CSS VARIABLES SETUP
//----------------------------------------------------------------//
export const initializeCSSVariables = () => {
    if (typeof window !== 'undefined') {
        const root = document.documentElement;
        
        // SET COLOR VARIABLE
        Object.entries(colors).forEach(([colorName, shade]) => {
            Object.entries(shade).forEach(([shade, value]) => {
                root.style.setProperty(`--color-${colorName}-${shade}`, value);
            });
        });
    }
}


//----------------------------------------------------------------//
// COMPONENTS
//----------------------------------------------------------------//

// STATUS BADGE //
export const status = {
    greenLight: `bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] px-4 py-2 ${border.radius.full} text-sm font-medium font-[var(--font-space-grotesk)]`,
}