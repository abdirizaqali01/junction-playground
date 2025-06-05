import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalCard } from "@/components/ui/minimal-card"
import { MinimalButton } from "@/components/ui/minimal-button"
import { ArrowLeft, FileText, Code, Video, ExternalLink } from "lucide-react"
import Link from "next/link"

const resources = [
  {
    id: "1",
    title: "OpenAI API Documentation",
    type: "API",
    description: "Complete guide to integrating OpenAI's GPT models",
    url: "https://platform.openai.com/docs",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "2",
    title: "Design System Guidelines",
    type: "Document",
    description: "UI/UX best practices and design tokens",
    url: "#",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "3",
    title: "Getting Started Tutorial",
    type: "Video",
    description: "Step-by-step video guide for beginners",
    url: "#",
    icon: <Video className="h-4 w-4" />,
  },
]

export default function ResourcesPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="mb-6">
            <Link
              href={`/event/${params.id}`}
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to event</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-8">Resources & APIs</h1>

          <div className="space-y-4">
            {resources.map((resource) => (
              <MinimalCard key={resource.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 rounded p-2">{resource.icon}</div>
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-white/70">{resource.description}</p>
                    </div>
                  </div>
                  <MinimalButton variant="outline" size="sm" asChild>
                    <a href={resource.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                      <span>Open</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </MinimalButton>
                </div>
              </MinimalCard>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
