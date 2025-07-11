import Link from "next/link"
import { colors } from "../styles/design-system"

export function Footer() {
  return (
    <footer className={" mt-20 bg-[var(--color-dark-opacity100)] border-[var(--color-light-opacity10)]"}>
      <div className="container mx-auto px-6 py-6">
        <p className={`text-center text-xs text-[${colors.dark.opacity100}]`}>
          © {new Date().getFullYear()} Junction Platform. All rights reserved.
        </p>
      </div>
    </footer>
  )
}