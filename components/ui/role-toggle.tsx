"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Users, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export function RoleToggle() {
  const [isOrganizer, setIsOrganizer] = useState(false)
  const router = useRouter()

  const handleToggle = (checked: boolean) => {
    setIsOrganizer(checked)
    if (checked) {
      router.push("/dashboard/organizer")
    } else {
      router.push("/dashboard/participant")
    }
  }

  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
      <div className="flex items-center gap-2 text-sm">
        <Users className="h-4 w-4" />
        <span>Participant</span>
      </div>
      <Switch checked={isOrganizer} onCheckedChange={handleToggle} className="data-[state=checked]:bg-[#00CE93]" />
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="h-4 w-4" />
        <span>Organizer</span>
      </div>
    </div>
  )
}
