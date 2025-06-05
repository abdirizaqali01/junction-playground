import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

export interface TestimonialAuthor {
  name: string
  handle?: string
  avatar?: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
}

export function TestimonialCard({ author, text, href }: TestimonialCardProps) {
  const Card = href ? Link : "div"

  return (
    <Card
      href={href || "#"}
      className={cn(
        "group flex w-[300px] flex-col gap-4 rounded-xl border border-[#00CE93]/20 bg-black p-6 shadow-sm",
        "transition-all duration-300 ease-in-out",
        href && "hover:border-[#00CE93]/40 hover:shadow-md",
      )}
    >
      <p className="text-sm font-medium text-muted-foreground">"{text}"</p>
      <div className="mt-auto flex items-center gap-3">
        {author.avatar && (
          <Image
            src={author.avatar || "/placeholder.svg"}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">{author.name}</span>
          {author.handle && <span className="text-xs text-muted-foreground">{author.handle}</span>}
        </div>
      </div>
    </Card>
  )
}
