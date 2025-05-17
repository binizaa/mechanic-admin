import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Coffee } from "lucide-react"
import Link from "next/link"

export function TechnicianStatus() {
  return (
    <div className="space-y-4">
      {technicians.map((tech, index) => (
        <div key={index} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={tech.name} />
              <AvatarFallback>{tech.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{tech.name}</div>
              <div className="text-sm text-muted-foreground">{tech.currentTask || "No active task"}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TechStatusBadge status={tech.status} />
            <Link href={`/technicians/${index}`}>
              <Button variant="ghost" size="sm">
                Assign
              </Button>
            </Link>
          </div>
        </div>
      ))}
      <div className="text-right">
        <Link href="/technicians">
          <Button variant="link" className="text-red-600 hover:text-red-700">
            Manage technicians
          </Button>
        </Link>
      </div>
    </div>
  )
}

function TechStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Available":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none">
          <CheckCircle className="h-3 w-3 mr-1" />
          Available
        </Badge>
      )
    case "Busy":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
          <Clock className="h-3 w-3 mr-1" />
          Busy
        </Badge>
      )
    case "Break":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none">
          <Coffee className="h-3 w-3 mr-1" />
          Break
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

const technicians = [
  {
    name: "Mike Johnson",
    status: "Busy",
    currentTask: "Engine repair - Toyota Camry",
  },
  {
    name: "Sarah Williams",
    status: "Available",
    currentTask: null,
  },
  {
    name: "David Chen",
    status: "Busy",
    currentTask: "Brake replacement - Honda Civic",
  },
  {
    name: "Robert Garcia",
    status: "Break",
    currentTask: null,
  },
]
