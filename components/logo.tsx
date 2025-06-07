import Link from "next/link"

export function JunctionLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="text-sm font-space-mono uppercase tracking-wider text-white">Junction</span>
      <span className="text-xs font-space-mono text-white/50">2025</span>
    </Link>
  )
}
