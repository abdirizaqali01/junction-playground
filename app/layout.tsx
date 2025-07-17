import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LoadingProvider } from "@/components/loading-context"
import { colors } from "@/styles/design-system"

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-space-grotesk",
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-space-mono",
  preload: true,
  fallback: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
})

const generateCSSVariables = () => {
  let cssVars = '';
  Object.entries(colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      cssVars += `--color-${colorName}-${shade}: ${value}; `;
    });
  });
  return cssVars;
};

export const metadata: Metadata = {
  title: "Junction Platform - The World's Leading Builder Ecosystem",
  description: "Connect, collaborate, and create the future with a global community of innovators and problem-solvers.",
  generator: 'Interract',
  icons: {
    icon: '/junction_platform_logo.png',
    shortcut: '/junction_platform_logo.png',
    apple: '/junction_platform_logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* DNS prefetch for Google Fonts */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Preload critical font resources */}
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C8Q.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="" 
        />
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRYE8.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="" 
        />

        {/* Critical font loading optimization */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical font loading optimization */
              @font-face {
                font-family: 'Space Grotesk';
                font-style: normal;
                font-weight: 300 700;
                font-display: block;
                src: url('https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C8Q.woff2') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              
              @font-face {
                font-family: 'Space Mono';
                font-style: normal;
                font-weight: 400 700;
                font-display: block;
                src: url('https://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRYE8.woff2') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }

              /* Apply CSS variables and font fallbacks immediately */
              :root {
                ${generateCSSVariables()}
                --font-space-grotesk: ${spaceGrotesk.style.fontFamily}, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                --font-space-mono: ${spaceMono.style.fontFamily}, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
              }
              
              html {
                font-family: var(--font-space-grotesk);
                font-display: block;
              }
              
              html.dark {
                ${generateCSSVariables()}
              }

              /* Prevent font loading flicker */
              .font-space-grotesk {
                font-family: var(--font-space-grotesk);
                font-display: block;
              }

              .font-space-mono {
                font-family: var(--font-space-mono);
                font-display: block;
              }
            `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${spaceMono.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}