"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import {
  BarChart3,
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  Package,
  Settings,
  Users,
  Wrench,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`relative border-r bg-zinc-100/40 ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <Link href="/" className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}>
          <Wrench className="h-6 w-6 text-red-600" />
          {!isCollapsed && <span className="ml-2 text-lg font-bold">AutoFix Admin</span>}
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
                >
                  <item.icon className={`h-5 w-5 ${pathname === item.href ? "text-red-600" : ""}`} />
                  {!isCollapsed && <span className="ml-2">{item.name}</span>}
                </Button>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <h3 className={`mb-2 px-4 text-xs font-semibold text-muted-foreground ${isCollapsed ? "sr-only" : ""}`}>
              Management
            </h3>
            <div className="space-y-1">
              {managementItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
                  >
                    <item.icon className={`h-5 w-5 ${pathname === item.href ? "text-red-600" : ""}`} />
                    {!isCollapsed && <span className="ml-2">{item.name}</span>}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: Wrench,
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: Calendar,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Vehicles",
    href: "/vehicles",
    icon: Car,
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Package,
  },
]

const managementItems = [
  {
    name: "Technicians",
    href: "/technicians",
    icon: Users,
  },
  {
    name: "Invoices",
    href: "/invoices",
    icon: FileText,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    name: "Work Orders",
    href: "/work-orders",
    icon: ClipboardList,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]
