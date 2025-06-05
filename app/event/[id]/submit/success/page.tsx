import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalCard } from "@/components/ui/minimal-card"
import { MinimalButton } from "@/components/ui/minimal-button"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SubmitSuccessPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-2xl">
          <div className="text-center">
            <MinimalCard className="p-8">
              <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>

              <h1 className="text-2xl font-bold mb-4">Project Submitted Successfully!</h1>
              <p className="text-white/80 mb-8">
                Your project has been submitted and is now under review. You'll receive an email confirmation shortly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MinimalButton asChild>
                  <Link href={`/event/${params.id}`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Event
                  </Link>
                </MinimalButton>
                <MinimalButton variant="outline" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </MinimalButton>
              </div>
            </MinimalCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
