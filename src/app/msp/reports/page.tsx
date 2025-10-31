import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const reports = [
  {
    id: 1,
    name: "Monthly Client Health Report",
    type: "Health",
    frequency: "Monthly",
    lastGenerated: "2024-01-26",
    status: "Generated",
    recipients: ["management@company.com"],
    size: "2.4 MB"
  },
  {
    id: 2,
    name: "Q1 Revenue Analysis",
    type: "Revenue", 
    frequency: "Quarterly",
    lastGenerated: "2024-01-15",
    status: "Generated",
    recipients: ["ceo@company.com", "sales@company.com"],
    size: "1.8 MB"
  },
  {
    id: 3,
    name: "Risk Assessment Report",
    type: "Risk",
    frequency: "Weekly", 
    lastGenerated: "2024-01-24",
    status: "Scheduled",
    recipients: ["ops@company.com"],
    size: "-"
  },
  {
    id: 4,
    name: "Client Retention Analysis",
    type: "Retention",
    frequency: "Monthly",
    lastGenerated: "2023-12-28", 
    status: "Expired",
    recipients: ["management@company.com"],
    size: "3.1 MB"
  }
]

export default function ReportsPage() {
  return (
    <DashboardLayout userRole="msp">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Generate and manage business intelligence reports</p>
          </div>
          <Button>Generate New Report</Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-3xl font-bold mt-2">24</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold mt-2">3</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-3xl font-bold mt-2">5</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Auto-Generated</p>
              <p className="text-3xl font-bold mt-2">18</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Report Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="text-2xl mb-2">❤️</span>
                <span>Health Score</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="text-2xl mb-2">💰</span>
                <span>Revenue</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="text-2xl mb-2">⚠️</span>
                <span>Risk Analysis</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="text-2xl mb-2">📊</span>
                <span>Performance</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{report.name}</h3>
                      <Badge variant="outline">{report.type}</Badge>
                      <Badge variant={
                        report.status === "Generated" ? "default" :
                        report.status === "Scheduled" ? "secondary" : "destructive"
                      }>
                        {report.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>Frequency: {report.frequency}</span>
                      <span>Last generated: {report.lastGenerated}</span>
                      <span>Size: {report.size}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm text-gray-600">Recipients:</span>
                      {report.recipients.map((email, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {report.status === "Generated" && (
                      <>
                        <Button variant="outline" size="sm">Download</Button>
                        <Button variant="outline" size="sm">Share</Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">Schedule</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}