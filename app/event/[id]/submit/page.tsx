"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalCard } from "@/components/ui/minimal-card"
import { MinimalButton } from "@/components/ui/minimal-button"
import { ArrowLeft, Github, ExternalLink, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SubmitPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    githubUrl: "",
    demoUrl: "",
    videoUrl: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to success page
    router.push(`/event/${params.id}/submit/success`)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-2xl">
          <div className="mb-6">
            <Link
              href={`/event/${params.id}`}
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to event</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-8">Submit Your Project</h1>

          <form onSubmit={handleSubmit}>
            <MinimalCard className="p-6 mb-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.projectTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, projectTitle: e.target.value }))}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/40"
                    placeholder="Enter your project title"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/40"
                    placeholder="Describe your project and what it does"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="github" className="block text-sm font-medium">
                    GitHub Repository *
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                    <input
                      type="url"
                      id="github"
                      required
                      value={formData.githubUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-white/40"
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="demo" className="block text-sm font-medium">
                    Demo URL
                  </label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                    <input
                      type="url"
                      id="demo"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-white/40"
                      placeholder="https://your-demo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="video" className="block text-sm font-medium">
                    Demo Video URL
                  </label>
                  <input
                    type="url"
                    id="video"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/40"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </MinimalCard>

            <MinimalButton
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Submit Project</span>
                </>
              )}
            </MinimalButton>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
