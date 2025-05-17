import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function RecentJobs() {
  return (
    <div className="space-y-4">
      {recentJobs.map((job, index) => (
        <div key={index} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={job.customer} />
              <AvatarFallback>{job.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{job.customer}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <span>{job.vehicle}</span>
                <span className="text-zinc-300">•</span>
                <span>#{job.jobNumber}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={job.status} />
            <Link href={`/jobs/${job.jobNumber}`}>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </Link>
          </div>
        </div>
      ))}
      <div className="text-right">
        <Link href="/jobs">
          <Button variant="link" className="text-red-600 hover:text-red-700">
            View all jobs
          </Button>
        </Link>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      )
    case "In Progress":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      )
    case "Waiting for Parts":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Waiting Parts
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

const recentJobs = [
  {
    customer: "John Smith",
    vehicle: "2018 Toyota Camry",
    jobNumber: "JOB-1234",
    status: "Completed",
  },
  {
    customer: "Sarah Johnson",
    vehicle: "2020 Honda Civic",
    jobNumber: "JOB-1235",
    status: "In Progress",
  },
  {
    customer: "Michael Brown",
    vehicle: "2019 Ford F-150",
    jobNumber: "JOB-1236",
    status: "Waiting for Parts",
  },
  {
    customer: "Emily Davis",
    vehicle: "2017 Chevrolet Malibu",
    jobNumber: "JOB-1237",
    status: "In Progress",
  },
  {
    customer: "Robert Wilson",
    vehicle: "2021 Nissan Altima",
    jobNumber: "JOB-1238",
    status: "Completed",
  },
]
