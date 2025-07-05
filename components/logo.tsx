import Link from "next/link"

export function JunctionLogo() {
  return (
    <Link href="/dash" className="flex items-center space-x-2">
      <img 
        src="/images/Junction_Platform_Logo.png" 
        alt="Junction Platform Logo"
        className="h-5 w-auto" // Adjust height as needed
      /> 
    </Link>
  )
}