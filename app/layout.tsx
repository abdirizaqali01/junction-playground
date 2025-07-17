import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { colors } from "@/styles/design-system"

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
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
        {/* Preload font files */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          as="style"
        />

        {/* Apply fonts immediately */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                ${generateCSSVariables()}
              }
              html {
                font-family: ${spaceGrotesk.style.fontFamily}, system-ui, sans-serif;
              }s
              html.dark {
                ${generateCSSVariables()}
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}