import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample hackathon data
const featuredHackathons = [
  {
    id: "ai-innovation",
    title: "AI Innovation Challenge",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 15-17, 2025",
    location: "San Francisco, CA",
    mode: "In-person",
    participants: 250,
    registrationEnds: "May 30, 2025",
    tags: ["AI", "Machine Learning", "Innovation"],
    featured: true,
  },
  {
    id: "web3-builders",
    title: "Web3 Builders Summit",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 8-10, 2025",
    location: "Remote",
    mode: "Virtual",
    participants: 500,
    registrationEnds: "June 25, 2025",
    tags: ["Web3", "Blockchain", "DeFi"],
    featured: true,
  },
]

const upcomingHackathons = [
  {
    id: "sustainability",
    title: "Sustainability Hack",
    image: "/placeholder.svg?height=400&width=600",
    date: "August 5-7, 2025",
    location: "Berlin, Germany",
    mode: "Hybrid",
    participants: 300,
    registrationEnds: "July 20, 2025",
    tags: ["Sustainability", "CleanTech", "GreenEnergy"],
  },
  {
    id: "mobile-app",
    title: "Mobile App Challenge",
    image: "/placeholder.svg?height=400&width=600",
    date: "September 12-14, 2025",
    location: "Remote",
    mode: "Virtual",
    participants: 400,
    registrationEnds: "August 30, 2025",
    tags: ["Mobile", "UX/UI", "App Development"],
  },
  {
    id: "fintech",
    title: "FinTech Revolution",
    image: "/placeholder.svg?height=400&width=600",
    date: "October 3-5, 2025",
    location: "London, UK",
    mode: "In-person",
    participants: 200,
    registrationEnds: "September 15, 2025",
    tags: ["FinTech", "Banking", "Payments"],
  },
  {
    id: "health-tech",
    title: "Health Tech Innovators",
    image: "/placeholder.svg?height=400&width=600",
    date: "November 7-9, 2025",
    location: "Remote",
    mode: "Virtual",
    participants: 350,
    registrationEnds: "October 25, 2025",
    tags: ["HealthTech", "MedTech", "Wellness"],
  },
]

export default function HackathonsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Next Hackathon</h1>
            <p className="text-white/70 font-space-mono">
              Discover opportunities to collaborate, innovate, and build amazing projects with fellow creators.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                />
              </div>
              <MinimalButton subtle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </MinimalButton>
            </div>
          </div>

          {/* Featured Hackathons */}
          <section className="mb-16">
            <h2 className="text-lg font-medium mb-6">Featured Hackathons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredHackathons.map((hackathon) => (
                <Link key={hackathon.id} href={`/hackathons/${hackathon.id}`}>
                  <MinimalCard hover className="h-full">
                    <div className="relative h-48 w-full mb-4 overflow-hidden rounded">
                      <Image
                        src={hackathon.image || "/placeholder.svg"}
                        alt={hackathon.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                        {hackathon.mode}
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="text-xl font-semibold mb-2">{hackathon.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4 text-white/70 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{hackathon.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{hackathon.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hackathon.tags.map((tag) => (
                          <span key={tag} className="bg-white/5 px-2 py-0.5 rounded text-xs font-space-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5 text-white/70 text-xs">
                          <Users className="h-3.5 w-3.5" />
                          <span>{hackathon.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/70 text-xs">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Ends {hackathon.registrationEnds}</span>
                        </div>
                      </div>
                    </div>
                  </MinimalCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Upcoming Hackathons */}
          <section className="mb-16">
            <h2 className="text-lg font-medium mb-6">Upcoming Hackathons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingHackathons.map((hackathon) => (
                <Link key={hackathon.id} href={`/hackathons/${hackathon.id}`}>
                  <MinimalCard hover className="h-full">
                    <div className="relative h-36 w-full mb-4 overflow-hidden rounded">
                      <Image
                        src={hackathon.image || "/placeholder.svg"}
                        alt={hackathon.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium">
                        {hackathon.mode}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-2">{hackathon.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3 text-white/70 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{hackathon.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{hackathon.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {hackathon.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-white/5 px-1.5 py-0.5 rounded text-xs font-space-mono">
                            {tag}
                          </span>
                        ))}
                        {hackathon.tags.length > 2 && (
                          <span className="bg-white/5 px-1.5 py-0.5 rounded text-xs font-space-mono">
                            +{hackathon.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </MinimalCard>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <MinimalButton subtle className="flex items-center gap-2 mx-auto">
                <span>View all hackathons</span>
                <ArrowRight className="h-4 w-4" />
              </MinimalButton>
            </div>
          </section>

          {/* Recommended For You */}
          <section className="mb-16">
            <h2 className="text-lg font-medium mb-6">Recommended For You</h2>
            <MinimalCard className="p-8 text-center">
              <h3 className="text-xl font-medium mb-3">Personalized Recommendations</h3>
              <p className="text-white/70 mb-6 max-w-lg mx-auto">
                Sign in to get hackathon recommendations based on your skills, interests, and past participation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MinimalButton asChild>
                  <Link href="/signup">Sign up</Link>
                </MinimalButton>
                <MinimalButton variant="outline" asChild>
                  <Link href="/login">Log in</Link>
                </MinimalButton>
              </div>
            </MinimalCard>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
