import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const analyticsData = {
  revenueTrend: [
    { month: "Jan", revenue: 42000 },
    { month: "Feb", revenue: 45000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 45200 },
    { month: "May", revenue: 47000 },
    { month: "Jun", revenue: 49000 }
  ],
  clientHealth: [
    { range: "90-100%", count: 8 },
    { range: "70-89%", count: 10 },
    { range: "50-69%", count: 4 },
    { range: "0-49%", count: 2 }
  ],
  serviceDistribution: [
    { service: "Managed IT", clients: 18, revenue: 28000 },
    { service: "Cloud Security", clients: 12, revenue: 12000 },
    { service: "Backup Solutions", clients: 8, revenue: 5200 },
    { service: "Consulting", clients: 6, revenue: 4000 }
  ]
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout userRole="msp">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Business Analytics</h1>
            <p className="text-gray-600 mt-2">Deep insights into client performance and revenue trends</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Export Report</Button>
            <Button>Share Dashboard</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Avg. Client Health</p>
              <p className="text-3xl font-bold mt-2 text-green-600">78%</p>
              <p className="text-sm text-gray-600 mt-1">↑ 5% from last quarter</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Revenue Growth</p>
              <p className="text-3xl font-bold mt-2">16.7%</p>
              <p className="text-sm text-gray-600 mt-1">YoY increase</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Client Retention</p>
              <p className="text-3xl font-bold mt-2">94%</p>
              <p className="text-sm text-gray-600 mt-1">Industry avg: 88%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Avg Revenue/Client</p>
              <p className="text-3xl font-bold mt-2">$1,883</p>
              <p className="text-sm text-gray-600 mt-1">↑ $212 from last year</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.revenueTrend.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{item.month}</span>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full"
                          style={{ width: `${(item.revenue / 50000) * 100}%` }}
                        />
                      </div>
                      <span className="font-semibold">${(item.revenue / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Client Health Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Client Health Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.clientHealth.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{item.range}</span>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            index === 0 ? "bg-green-500" :
                            index === 1 ? "bg-blue-500" :
                            index === 2 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${(item.count / 24) * 100}%` }}
                        />
                      </div>
                      <span className="font-semibold">{item.count} clients</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Service Distribution & Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.serviceDistribution.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{service.service}</p>
                    <p className="text-sm text-gray-600">{service.clients} clients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${(service.revenue / 1000).toFixed(0)}k</p>
                    <p className="text-sm text-gray-600">Monthly revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-medium text-blue-800">📈 Growth Opportunity</p>
                <p className="text-blue-700 mt-1">Managed IT service shows highest client adoption. Consider expanding service tiers.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="font-medium text-green-800">💡 Optimization Tip</p>
                <p className="text-green-700 mt-1">94% retention rate exceeds industry average. Focus on upselling existing clients.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}