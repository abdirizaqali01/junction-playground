"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { RoleToggle } from "@/components/ui/role-toggle"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-sm font-space-mono uppercase tracking-wider text-white">Junction</span>
              <span className="text-xs font-space-mono text-white/50">2025</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/hackathons" className="text-xs font-medium text-white/70 hover:text-white transition-colors">
              Hackathons
            </Link>
            <Link href="/features" className="text-xs font-medium text-white/70 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/community" className="text-xs font-medium text-white/70 hover:text-white transition-colors">
              Community
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-xs font-medium text-white/70 hover:text-white transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-xs font-medium bg-white text-black px-3 py-1.5 rounded hover:bg-white/90 transition-colors"
            >
              Sign up
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/hackathons"
              className="block py-2 text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hackathons
            </Link>
            <Link
              href="/features"
              className="block py-2 text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/community"
              className="block py-2 text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </Link>
            <div className="pt-4 border-t border-white/5 flex flex-col space-y-2">
              <Link href="/login" className="block py-2 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Log in
              </Link>
              <Link
                href="/signup"
                className="block py-2 text-sm font-medium bg-white text-black px-3 rounded text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
