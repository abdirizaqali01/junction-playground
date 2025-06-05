import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

// This would normally come from a database or API
const getHackathonData = (id: string) => {
  return {
    id,
    title: "AI Innovation Challenge",
  }
}

export default function RegistrationSuccessPage({ params }: { params: { id: string } }) {
  const hackathon = getHackathonData(params.id)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-2xl">
          <MinimalCard className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Registration Complete!</h1>
            <p className="text-white/70 mb-8 font-space-mono">
              You've successfully registered for {hackathon.title}. We're excited to have you join us!
            </p>

            <div className="space-y-6 mb-8">
              <div className="p-4 rounded bg-white/5 text-left">
                <h2 className="font-medium mb-2">What's Next?</h2>
                <ul className="space-y-2 text-sm text-white/70 font-space-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">1.</span>
                    <span>Check your email for confirmation and important details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">2.</span>
                    <span>Complete your profile to help with team matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">3.</span>
                    <span>Join our Discord community to connect with other participants</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MinimalButton asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MinimalButton>
              <MinimalButton variant="outline" asChild>
                <Link href="/hackathons">Browse More Hackathons</Link>
              </MinimalButton>
            </div>
          </MinimalCard>
        </div>
      </main>

      <Footer />
    </div>
  )
}
