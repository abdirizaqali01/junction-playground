import { MinimalCard } from "@/components/ui/minimal-card"
import { MinimalButton } from "@/components/ui/minimal-button"
import { FileText, Video, LinkIcon, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock data
const resources = [
  {
    id: "res1",
    title: "Hackathon Guide",
    type: "document",
    description: "A comprehensive guide to help you navigate the hackathon",
    url: "#",
  },
  {
    id: "res2",
    title: "AI Ethics Framework",
    type: "document",
    description: "Guidelines for ethical AI development",
    url: "#",
  },
  {
    id: "res3",
    title: "Intro to Machine Learning Workshop",
    type: "video",
    description: "Recording of the pre-event workshop on machine learning basics",
    url: "#",
  },
  {
    id: "res4",
    title: "API Documentation",
    type: "link",
    description: "Documentation for the APIs available during the hackathon",
    url: "#",
  },
  {
    id: "res5",
    title: "Dataset Package",
    type: "download",
    description: "Sample datasets for training your models",
    url: "#",
  },
]

const resourceTypeIcons = {
  document: <FileText className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  link: <LinkIcon className="h-4 w-4" />,
  download: <Download className="h-4 w-4" />,
}

interface EventResourcesSectionProps {
  eventId: string
}

export function EventResourcesSection({ eventId }: EventResourcesSectionProps) {
  return (
    <div className="space-y-6">
      <MinimalCard>
        <h2 className="text-xl font-medium mb-6">Resources</h2>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-start p-3 rounded bg-white/5">
              <div className="bg-white/10 rounded p-2 mr-4 mt-1">
                {resourceTypeIcons[resource.type as keyof typeof resourceTypeIcons]}
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{resource.title}</h3>
                <p className="text-sm text-white/70 mb-2">{resource.description}</p>
                <MinimalButton size="sm" variant="outline" asChild>
                  <Link href={resource.url} className="inline-flex items-center gap-1.5">
                    {resource.type === "download" ? "Download" : "View"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </MinimalButton>
              </div>
            </div>
          ))}
        </div>
      </MinimalCard>

      <MinimalCard>
        <h2 className="text-xl font-medium mb-4">Mentorship</h2>
        <p className="text-white/70 mb-4">
          Need help with your project? Schedule a session with one of our mentors to get guidance and feedback.
        </p>
        <MinimalButton asChild>
          <Link href={`/event/${eventId}/mentors`}>Schedule Mentorship</Link>
        </MinimalButton>
      </MinimalCard>
    </div>
  )
}
