import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data - will come from API
const clientData = {
  id: 1,
  name: "Acme Corporation",
  healthScore: 92,
  revenue: 15000,
  tickets: 3,
  devices: 45,
  risk: "low",
  contact: "John Smith - CTO",
  email: "john@acme.com",
  phone: "+1 (555) 123-4567",
  contract: "Premium Support",
  renewal: "2024-12-15",
  services: ["Managed IT", "Cloud Security", "Backup Solutions"]
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clientData // In real app, fetch by params.id

  return (
    <DashboardLayout userRole="msp">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{client.name}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <Badge className={
                client.risk === "high" ? "bg-red-100 text-red-800" :
                client.risk === "medium" ? "bg-yellow-100 text-yellow-800" :
                "bg-green-100 text-green-800"
              }>
                {client.risk.toUpperCase()} RISK
              </Badge>
              <span className="text-gray-600">Health Score: <strong>{client.healthScore}%</strong></span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Contact</Button>
            <Button>Generate Report</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-blue-600">${(client.revenue / 1000).toFixed(0)}k</p>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-orange-600">{client.tickets}</p>
                  <p className="text-sm text-gray-600">Active Tickets</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-purple-600">{client.devices}</p>
                  <p className="text-sm text-gray-600">Managed Devices</p>
                </CardContent>
              </Card>
            </div>

            {/* Health Score Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Health Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Overall Health</span>
                      <span className="font-bold text-green-600">{client.healthScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full" 
                        style={{ width: `${client.healthScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="font-semibold">Ticket Response</p>
                      <p className="text-green-600">98%</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="font-semibold">Uptime</p>
                      <p className="text-green-600">99.9%</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="font-semibold">Device Health</p>
                      <p className="text-yellow-600">87%</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="font-semibold">Security Score</p>
                      <p className="text-red-600">76%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{client.contact}</p>
                  <p className="text-sm text-gray-600">{client.email}</p>
                  <p className="text-sm text-gray-600">{client.phone}</p>
                </div>
                <Button variant="outline" className="w-full">Send Message</Button>
              </CardContent>
            </Card>

            {/* Contract Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{client.contract}</p>
                  <p className="text-sm text-gray-600">Renews: {client.renewal}</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {client.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}