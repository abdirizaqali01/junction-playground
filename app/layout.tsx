import type React from "react"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "Junction Platform - The World's Leading Builder Ecosystem",
  description: "Connect, collaborate, and create the future with a global community of innovators and problem-solvers.",
  generator: 'v0.dev',
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
      <body className={`${spaceMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}