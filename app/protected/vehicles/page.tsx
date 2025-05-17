"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [makeFilter, setMakeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter vehicles based on search query and make filter
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesMake = makeFilter === "all" || vehicle.make === makeFilter

    return matchesSearch && matchesMake
  })

  // Pagination
  const vehiclesPerPage = 10
  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage)
  const paginatedVehicles = filteredVehicles.slice((currentPage - 1) * vehiclesPerPage, currentPage * vehiclesPerPage)

  // Get unique makes for filter
  const uniqueMakes = Array.from(new Set(vehicles.map((vehicle) => vehicle.make)))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Vehicles</h2>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-xs text-muted-foreground">In the system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due for Service</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.filter((v) => v.maintenanceDue).length}</div>
            <p className="text-xs text-muted-foreground">Vehicles due for maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Recalls</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.filter((v) => v.recalls > 0).length}</div>
            <p className="text-xs text-muted-foreground">Vehicles with active recalls</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Vehicle Age</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                vehicles.reduce((sum, vehicle) => sum + (new Date().getFullYear() - vehicle.year), 0) / vehicles.length,
              )}{" "}
              years
            </div>
            <p className="text-xs text-muted-foreground">Average age of all vehicles</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vehicles by make, model, VIN, license plate, or owner..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="grid gap-2">
            <Select value={makeFilter} onValueChange={setMakeFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Make</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {uniqueMakes.map((make, index) => (
                  <SelectItem key={index} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Make & Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>VIN</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Last Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedVehicles.map((vehicle, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Link href={`/vehicles/${vehicle.id}`} className="text-red-600 hover:underline">
                    {vehicle.make} {vehicle.model}
                  </Link>
                </TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.vin}</TableCell>
                <TableCell>{vehicle.licensePlate}</TableCell>
                <TableCell>
                  <Link href={`/customers/${vehicle.customerId}`} className="hover:underline">
                    {vehicle.owner}
                  </Link>
                </TableCell>
                <TableCell>{vehicle.lastService}</TableCell>
                <TableCell>
                  <VehicleStatusBadge
                    maintenanceDue={vehicle.maintenanceDue}
                    recalls={vehicle.recalls}
                    activeJob={vehicle.activeJob}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={`/vehicles/${vehicle.id}`} className="flex w-full">
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit vehicle</DropdownMenuItem>
                      <DropdownMenuItem>Service history</DropdownMenuItem>
                      <DropdownMenuItem>Create job</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete vehicle</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * vehiclesPerPage + 1} to{" "}
          {Math.min(currentPage * vehiclesPerPage, filteredVehicles.length)} of {filteredVehicles.length} vehicles
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function VehicleStatusBadge({
  maintenanceDue,
  recalls,
  activeJob,
}: {
  maintenanceDue: boolean
  recalls: number
  activeJob: boolean
}) {
  if (activeJob) {
    return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">In Service</Badge>
  } else if (recalls > 0) {
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-none">Recall Alert</Badge>
  } else if (maintenanceDue) {
    return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none">Maintenance Due</Badge>
  } else {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none">Up to Date</Badge>
  }
}

const vehicles = [
  {
    id: "VEH-1001",
    make: "Toyota",
    model: "Camry",
    year: 2018,
    vin: "4T1BF1FK5JU123456",
    licensePlate: "ABC-1234",
    owner: "John Smith",
    customerId: "CUST-1001",
    lastService: "May 15, 2023",
    maintenanceDue: false,
    recalls: 0,
    activeJob: false,
  },
  {
    id: "VEH-1002",
    make: "Honda",
    model: "Civic",
    year: 2020,
    vin: "2HGFC2F53LH123456",
    licensePlate: "XYZ-7890",
    owner: "Sarah Johnson",
    customerId: "CUST-1002",
    lastService: "April 28, 2023",
    maintenanceDue: true,
    recalls: 0,
    activeJob: true,
  },
  {
    id: "VEH-1003",
    make: "Ford",
    model: "F-150",
    year: 2019,
    vin: "1FTEW1EP7KFA12345",
    licensePlate: "TRK-4567",
    owner: "Michael Brown",
    customerId: "CUST-1003",
    lastService: "March 12, 2023",
    maintenanceDue: true,
    recalls: 1,
    activeJob: false,
  },
  {
    id: "VEH-1004",
    make: "Chevrolet",
    model: "Malibu",
    year: 2017,
    vin: "1G1ZD5ST3JF123456",
    licensePlate: "MLB-9012",
    owner: "Emily Davis",
    customerId: "CUST-1004",
    lastService: "May 2, 2023",
    maintenanceDue: false,
    recalls: 0,
    activeJob: false,
  },
  {
    id: "VEH-1005",
    make: "Nissan",
    model: "Altima",
    year: 2021,
    vin: "1N4BL4BV3MC123456",
    licensePlate: "NSN-3456",
    owner: "Robert Wilson",
    customerId: "CUST-1005",
    lastService: "May 10, 2023",
    maintenanceDue: false,
    recalls: 0,
    activeJob: false,
  },
  {
    id: "VEH-1006",
    make: "Hyundai",
    model: "Sonata",
    year: 2016,
    vin: "5NPE24AF8GH123456",
    licensePlate: "HYN-7890",
    owner: "Jennifer Lee",
    customerId: "CUST-1006",
    lastService: "February 18, 2023",
    maintenanceDue: true,
    recalls: 0,
    activeJob: false,
  },
  {
    id: "VEH-1007",
    make: "Kia",
    model: "Sportage",
    year: 2022,
    vin: "KNDPMCAC8N7123456",
    licensePlate: "KIA-1234",
    owner: "Thomas Anderson",
    customerId: "CUST-1007",
    lastService: "April 5, 2023",
    maintenanceDue: false,
    recalls: 1,
    activeJob: false,
  },
  {
    id: "VEH-1008",
    make: "Subaru",
    model: "Outback",
    year: 2019,
    vin: "4S4BSANC5K3123456",
    licensePlate: "SUB-5678",
    owner: "Amanda Wilson",
    customerId: "CUST-1008",
    lastService: "March 22, 2023",
    maintenanceDue: true,
    recalls: 0,
    activeJob: true,
  },
  {
    id: "VEH-1009",
    make: "Mazda",
    model: "CX-5",
    year: 2020,
    vin: "JM3KFBDM9L0123456",
    licensePlate: "MZD-9012",
    owner: "Daniel Martinez",
    customerId: "CUST-1009",
    lastService: "May 8, 2023",
    maintenanceDue: false,
    recalls: 0,
    activeJob: false,
  },
  {
    id: "VEH-1010",
    make: "Jeep",
    model: "Cherokee",
    year: 2017,
    vin: "1C4PJMCB8HD123456",
    licensePlate: "JEP-3456",
    owner: "Sophia Taylor",
    customerId: "CUST-1010",
    lastService: "January 15, 2023",
    maintenanceDue: true,
    recalls: 2,
    activeJob: false,
  },
  {
    id: "VEH-1011",
    make: "Ford",
    model: "Escape",
    year: 2021,
    vin: "1FMCU9G60MUA12345",
    licensePlate: "ESC-7890",
    owner: "William Brown",
    customerId: "CUST-1011",
    lastService: "April 12, 2023",
    maintenanceDue: false,
    recalls: 0,
    activeJob: false,
  },
  {
    id: "VEH-1012",
    make: "Honda",
    model: "Accord",
    year: 2018,
    vin: "1HGCV1F18JA123456",
    licensePlate: "ACC-1234",
    owner: "Olivia Johnson",
    customerId: "CUST-1012",
    lastService: "March 5, 2023",
    maintenanceDue: true,
    recalls: 0,
    activeJob: false,
  },
  {
    id: "VEH-1013",
    make: "Toyota",
    model: "RAV4",
    year: 2020,
    vin: "2T3F1RFV8LC123456",
    licensePlate: "RAV-5678",
    owner: "James Wilson",
    customerId: "CUST-1013",
    lastService: "May 1, 2023",
    maintenanceDue: false,
    recalls: 0,
    activeJob: false,
  },
  {
    id: "VEH-1014",
    make: "Chevrolet",
    model: "Equinox",
    year: 2019,
    vin: "2GNAXSEV5K6123456",
    licensePlate: "EQX-9012",
    owner: "Emma Davis",
    customerId: "CUST-1014",
    lastService: "February 28, 2023",
    maintenanceDue: true,
    recalls: 0,
    activeJob: false,
  },
  {
    id: "VEH-1015",
    make: "Nissan",
    model: "Rogue",
    year: 2021,
    vin: "JN8AT2MV4MW123456",
    licensePlate: "ROG-3456",
    owner: "Alexander Martinez",
    customerId: "CUST-1015",
    lastService: "April 18, 2023",
    maintenanceDue: false,
    recalls: 1,
    activeJob: false,
  },
]
