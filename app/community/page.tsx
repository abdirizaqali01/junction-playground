import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalCard } from "@/components/ui/minimal-card"
import { Users, MessageSquare, Trophy, Globe } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-white/70 font-space-mono">
              Connect with builders, innovators, and creators from around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MinimalCard className="text-center p-6">
              <Users className="h-8 w-8 mx-auto mb-4 text-white/70" />
              <h3 className="font-medium mb-2">15,000+</h3>
              <p className="text-sm text-white/70">Active Builders</p>
            </MinimalCard>

            <MinimalCard className="text-center p-6">
              <MessageSquare className="h-8 w-8 mx-auto mb-4 text-white/70" />
              <h3 className="font-medium mb-2">Discord</h3>
              <p className="text-sm text-white/70">Join our chat</p>
            </MinimalCard>

            <MinimalCard className="text-center p-6">
              <Trophy className="h-8 w-8 mx-auto mb-4 text-white/70" />
              <h3 className="font-medium mb-2">100+</h3>
              <p className="text-sm text-white/70">Events hosted</p>
            </MinimalCard>

            <MinimalCard className="text-center p-6">
              <Globe className="h-8 w-8 mx-auto mb-4 text-white/70" />
              <h3 className="font-medium mb-2">Global</h3>
              <p className="text-sm text-white/70">Worldwide reach</p>
            </MinimalCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
