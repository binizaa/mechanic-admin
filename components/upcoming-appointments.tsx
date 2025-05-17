import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Phone } from "lucide-react"
import Link from "next/link"

export function UpcomingAppointments() {
  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <div key={index} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={appointment.customer} />
              <AvatarFallback>{appointment.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{appointment.customer}</div>
              <div className="text-sm text-muted-foreground">{appointment.service}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end text-sm font-medium">
              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex mt-1 gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Phone className="h-4 w-4" />
              </Button>
              <Link href={`/appointments/${index}`}>
                <Button variant="ghost" size="sm">
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className="text-right">
        <Link href="/appointments">
          <Button variant="link" className="text-red-600 hover:text-red-700">
            View all appointments
          </Button>
        </Link>
      </div>
    </div>
  )
}

const appointments = [
  {
    customer: "David Miller",
    service: "Oil Change & Inspection",
    time: "Today, 10:30 AM",
  },
  {
    customer: "Jennifer Lee",
    service: "Brake Pad Replacement",
    time: "Today, 1:15 PM",
  },
  {
    customer: "Thomas Anderson",
    service: "Check Engine Light Diagnosis",
    time: "Today, 3:00 PM",
  },
  {
    customer: "Amanda Wilson",
    service: "Tire Rotation & Balance",
    time: "Tomorrow, 9:00 AM",
  },
]
