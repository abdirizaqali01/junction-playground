//----------------------------------------------------------------//
// DESIGN SYSTEM
//----------------------------------------------------------------//

// FONTS //
import { Space_Grotesk, Space_Mono } from 'next/font/google'

export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
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
        opacity80: '#0D0D0DCC',
        opacity70: '#0D0D0DB3',
        opacity60: '#0D0D0D99',
        opacity50: '#0D0D0D80',
        opacity40: '#0D0D0D66',
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

        // SET FONT VARIABLES
        root.style.setProperty('--font-space-grotesk', spaceGrotesk.style.fontFamily);
        root.style.setProperty('--font-space-mono', spaceMono.style.fontFamily);
    }
}


//----------------------------------------------------------------//
// COMPONENTS
//----------------------------------------------------------------//

// STATUS BADGE //
export const status = {
    greenLight: `bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] px-4 py-2 ${border.radius.full} text-sm font-light font-[var(--font-space-grotesk)]`,
}

// FONT TITLE //
export const font = {
    grotesk: {
        main: `font-space-grotesk font-[600] tracking-[-0.01rem]`,
        heavy: `font-space-grotesk font-[700] tracking-[-0.05rem]`,
        medium: `font-space-grotesk font-[500] tracking-[-0.05rem]`,
        light: `font-space-grotesk font-[300] tracking-[-0.05rem]`,
    },

    mono: {
        title: `font-space-mono font-[700] tracking-[-0.01rem]`,
        text: `font-space-mono font-[400] tracking-[-0.05rem]`,
    }
}

// SECTION TITLES //
export const sectionTitle = {
    grotesk: ``,
}
