import { cn } from "@/lib/utils"
import { GlowButton } from "@/components/ui/glow-button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export interface HackathonProps {
  id: string
  title: string
  image: string
  date: string
  location: string
  tags: string[]
  href: string
}

interface HackathonCardProps {
  hackathon: HackathonProps
  className?: string
}

export function HackathonCard({ hackathon, className }: HackathonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative h-48 w-full">
        <Image src={hackathon.image || "/placeholder.svg"} alt={hackathon.title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{hackathon.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 font-space-mono">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>{hackathon.date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{hackathon.location}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {hackathon.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <GlowButton asChild className="w-full">
          <Link href={hackathon.href}>Learn More</Link>
        </GlowButton>
      </CardFooter>
    </Card>
  )
}
