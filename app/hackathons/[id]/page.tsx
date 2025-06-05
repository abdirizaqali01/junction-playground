import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { Calendar, MapPin, Clock, ArrowLeft, Globe, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// This would normally come from a database or API
const getHackathonData = (id: string) => {
  return {
    id,
    title: "AI Innovation Challenge",
    image: "/placeholder.svg?height=600&width=1200",
    date: "June 15-17, 2025",
    location: "San Francisco, CA",
    mode: "In-person",
    participants: 250,
    registrationEnds: "May 30, 2025",
    tags: ["AI", "Machine Learning", "Innovation"],
    description: `
      Join us for the AI Innovation Challenge, a three-day hackathon focused on pushing the boundaries of artificial intelligence. 
      Participants will work in teams to develop cutting-edge AI solutions that address real-world problems.
      
      This hackathon is perfect for developers, data scientists, and AI enthusiasts looking to showcase their skills and connect with industry leaders.
    `,
    schedule: [
      { day: "Day 1", title: "Kickoff & Team Formation", time: "9:00 AM - 6:00 PM" },
      { day: "Day 2", title: "Development & Mentorship", time: "9:00 AM - 10:00 PM" },
      { day: "Day 3", title: "Final Submissions & Presentations", time: "9:00 AM - 5:00 PM" },
    ],
    prizes: [
      { place: "1st Place", reward: "$10,000 + Mentorship Opportunity" },
      { place: "2nd Place", reward: "$5,000 + Cloud Credits" },
      { place: "3rd Place", reward: "$2,500 + Hardware Kits" },
    ],
    sponsors: [
      { name: "TechCorp", logo: "/placeholder.svg?height=100&width=100" },
      { name: "AI Solutions", logo: "/placeholder.svg?height=100&width=100" },
      { name: "Future Labs", logo: "/placeholder.svg?height=100&width=100" },
    ],
    organizers: [
      { name: "Junction Platform", logo: "/placeholder.svg?height=100&width=100" },
      { name: "Tech University", logo: "/placeholder.svg?height=100&width=100" },
    ],
  }
}

export default function HackathonDetailPage({ params }: { params: { id: string } }) {
  const hackathon = getHackathonData(params.id)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/hackathons" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to hackathons</span>
            </Link>
          </div>

          {/* Hero section */}
          <div className="relative rounded-lg overflow-hidden mb-8">
            <div className="absolute inset-0">
              <Image src={hackathon.image || "/placeholder.svg"} alt={hackathon.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            </div>
            <div className="relative pt-40 pb-8 px-6 md:px-8">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-space-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{hackathon.title}</h1>
                <div className="flex flex-wrap gap-4 mb-6 text-white/70 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{hackathon.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    <span>{hackathon.mode}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <MinimalButton asChild>
                    <Link href={`/hackathons/${hackathon.id}/register`}>Register Now</Link>
                  </MinimalButton>
                  <div className="flex items-center gap-1.5 text-white/70 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Registration ends {hackathon.registrationEnds}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <MinimalCard>
                <h2 className="text-xl font-medium mb-4">About</h2>
                <div className="text-white/70 space-y-4 font-space-mono">
                  {hackathon.description.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </MinimalCard>

              {/* Schedule */}
              <MinimalCard>
                <h2 className="text-xl font-medium mb-4">Schedule</h2>
                <div className="space-y-4">
                  {hackathon.schedule.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0"
                    >
                      <div>
                        <h3 className="font-medium">
                          {item.day}: {item.title}
                        </h3>
                      </div>
                      <div className="text-white/70 text-sm font-space-mono mt-1 sm:mt-0">{item.time}</div>
                    </div>
                  ))}
                </div>
              </MinimalCard>

              {/* Prizes */}
              <MinimalCard>
                <h2 className="text-xl font-medium mb-4">Prizes</h2>
                <div className="space-y-4">
                  {hackathon.prizes.map((prize, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 flex-shrink-0">
                        <Award className="h-5 w-5 text-white/70" />
                      </div>
                      <div>
                        <h3 className="font-medium">{prize.place}</h3>
                        <p className="text-white/70 text-sm font-space-mono">{prize.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </MinimalCard>
            </div>

            {/* Right column - Registration and info */}
            <div className="space-y-8">
              {/* Registration card */}
              <MinimalCard className="sticky top-24">
                <h2 className="text-xl font-medium mb-4">Registration</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-white/70">Status</span>
                    <span className="text-green-400 font-medium">Open</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-white/70">Deadline</span>
                    <span>{hackathon.registrationEnds}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-white/70">Participants</span>
                    <span>{hackathon.participants} registered</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Team Size</span>
                    <span>1-4 people</span>
                  </div>
                </div>
                <MinimalButton className="w-full" asChild>
                  <Link href={`/hackathons/${hackathon.id}/register`}>Register Now</Link>
                </MinimalButton>
              </MinimalCard>

              {/* Sponsors */}
              <MinimalCard>
                <h2 className="text-xl font-medium mb-4">Sponsors</h2>
                <div className="grid grid-cols-2 gap-4">
                  {hackathon.sponsors.map((sponsor, i) => (
                    <div key={i} className="flex flex-col items-center p-3 rounded bg-white/5">
                      <div className="w-12 h-12 relative mb-2">
                        <Image
                          src={sponsor.logo || "/placeholder.svg"}
                          alt={sponsor.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm">{sponsor.name}</span>
                    </div>
                  ))}
                </div>
              </MinimalCard>

              {/* Organizers */}
              <MinimalCard>
                <h2 className="text-xl font-medium mb-4">Organizers</h2>
                <div className="space-y-4">
                  {hackathon.organizers.map((organizer, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 relative">
                        <Image
                          src={organizer.logo || "/placeholder.svg"}
                          alt={organizer.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>{organizer.name}</span>
                    </div>
                  ))}
                </div>
              </MinimalCard>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
