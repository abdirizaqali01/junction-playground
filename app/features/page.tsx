import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FeatureGrid } from "@/components/blocks/feature-grid"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h1>
            <p className="text-white/70 font-space-mono">
              Everything you need to organize, participate in, and succeed at hackathons.
            </p>
          </div>

          <FeatureGrid />
        </div>
      </main>

      <Footer />
    </div>
  )
}
