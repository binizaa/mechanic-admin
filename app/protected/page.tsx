import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarDays, Car, DollarSign, Users, Wrench, Clock, BarChart3, AlertCircle } from "lucide-react"
import Link from "next/link"
import { RecentJobs } from "@/components/recent-jobs"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { TechnicianStatus } from "@/components/technician-status"
import { RevenueChart } from "@/components/revenue-chart"
import { JobsByType } from "@/components/jobs-by-type"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700 text-white">
            <Wrench className="mr-2 h-4 w-4" />
            New Job
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">5 due today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+18.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+32 new this month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
                <CardDescription>Showing the 5 most recent jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentJobs />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Next 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingAppointments />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Technician Status</CardTitle>
                <CardDescription>Current assignments and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <TechnicianStatus />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Parts that need reordering</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowInventoryItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Part #{item.partNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.quantity} remaining</p>
                        <p className="text-sm text-muted-foreground">Min: {item.minimum}</p>
                      </div>
                    </div>
                  ))}
                  <div className="text-right">
                    <Link href="/inventory">
                      <Button variant="link" className="text-red-600 hover:text-red-700">
                        View all inventory
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue trends for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <RevenueChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Jobs by Type</CardTitle>
                <CardDescription>Distribution of job types this month</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <JobsByType />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Job Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$342.58</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Technician Efficiency</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+3.1% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report, index) => (
              <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                  {report.icon}
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const lowInventoryItems = [
  { name: "Oil Filter - Standard", partNumber: "OF-2234", quantity: 5, minimum: 10 },
  { name: "Brake Pads - Front (Toyota)", partNumber: "BP-1045", quantity: 2, minimum: 6 },
  { name: "Air Filter - Honda Civic", partNumber: "AF-3321", quantity: 3, minimum: 8 },
  { name: "Spark Plugs - Premium", partNumber: "SP-9976", quantity: 4, minimum: 12 },
]

const reports = [
  {
    title: "Monthly Sales",
    description: "Revenue breakdown by service type and technician",
    icon: <DollarSign className="h-5 w-5 text-red-600" />,
  },
  {
    title: "Technician Performance",
    description: "Efficiency, completed jobs, and customer ratings",
    icon: <Users className="h-5 w-5 text-red-600" />,
  },
  {
    title: "Inventory Usage",
    description: "Parts consumption and reorder recommendations",
    icon: <Wrench className="h-5 w-5 text-red-600" />,
  },
  {
    title: "Customer Analytics",
    description: "Customer retention and service history",
    icon: <BarChart3 className="h-5 w-5 text-red-600" />,
  },
  {
    title: "Vehicle Service History",
    description: "Service records by vehicle make and model",
    icon: <Car className="h-5 w-5 text-red-600" />,
  },
  {
    title: "Financial Summary",
    description: "Profit margins, expenses, and revenue trends",
    icon: <DollarSign className="h-5 w-5 text-red-600" />,
  },
]
