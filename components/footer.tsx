import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-6 py-6">
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Junction Platform. All rights reserved.
        </p>
      </div>
    </footer>
  )
}