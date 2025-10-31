"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "msp" | "it" | "admin"
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  // Navigation items based on user role
  const navItems = {
    msp: [
      { name: "Dashboard", href: "/msp", icon: "📊" },
      { name: "Clients", href: "/msp/clients", icon: "👥" },
      { name: "Analytics", href: "/msp/analytics", icon: "📈" },
      { name: "Reports", href: "/msp/reports", icon: "📋" },
    ],
    it: [
      { name: "Dashboard", href: "/it", icon: "💻" },
      { name: "Costs", href: "/it/costs", icon: "💰" },
      { name: "Licenses", href: "/it/licenses", icon: "🔑" },
      { name: "Automation", href: "/it/automation", icon: "⚡" },
    ],
    admin: [
      { name: "Overview", href: "/admin", icon: "👑" },
      { name: "Users", href: "/admin/users", icon: "👤" },
      { name: "Settings", href: "/admin/settings", icon: "⚙️" },
    ]
  }

  const currentNav = navItems[userRole]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r transition-all duration-300`}>
        <div className="p-4 border-b">
          <h1 className={`font-bold ${sidebarOpen ? "text-xl" : "text-lg"} text-blue-600`}>
            {sidebarOpen ? "PulseOps AI" : "PO"}
          </h1>
        </div>
        
        <nav className="p-4 space-y-2">
          {currentNav.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className={`w-full justify-start ${!sidebarOpen && "justify-center px-2"}`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span className="ml-3">{item.name}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? "←" : "→"}
            </Button>
            <div>
              <h1 className="font-semibold capitalize">{userRole} Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-600 capitalize">{userRole} User</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}