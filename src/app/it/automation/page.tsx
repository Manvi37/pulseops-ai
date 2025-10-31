import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const automationWorkflows = [
  {
    id: 1,
    name: "License Optimization",
    description: "Automatically detect and deactivate unused licenses",
    status: "active",
    triggers: ["Weekly scan", "License usage < 10% for 30 days"],
    actions: ["Create deprovision ticket", "Notify IT manager"],
    lastRun: "2 hours ago",
    savings: 1850
  },
  {
    id: 2,
    name: "Cost Anomaly Detection",
    description: "Monitor cloud spending and flag unusual spikes",
    status: "active", 
    triggers: ["Daily cost analysis", "Spend increase > 25%"],
    actions: ["Alert finance team", "Create investigation ticket"],
    lastRun: "5 hours ago",
    savings: 3200
  },
  {
    id: 3,
    name: "Security Compliance",
    description: "Ensure all devices have latest security patches",
    status: "inactive",
    triggers: ["New CVE detected", "Weekly compliance check"],
    actions: ["Deploy patches", "Generate compliance report"],
    lastRun: "Never",
    savings: 0
  }
]

export default function AutomationPage() {
  return (
    <DashboardLayout userRole="it">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Automation Workflows</h1>
            <p className="text-gray-600 mt-2">Automate IT operations and cost optimization</p>
          </div>
          <Button>Create New Workflow</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Active Workflows</p>
              <p className="text-3xl font-bold mt-2">2</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Monthly Savings</p>
              <p className="text-3xl font-bold mt-2 text-green-600">$5,050</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Tasks Automated</p>
              <p className="text-3xl font-bold mt-2">147</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold mt-2">98%</p>
            </CardContent>
          </Card>
        </div>

        {/* Workflow List */}
        <div className="space-y-4">
          {automationWorkflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{workflow.name}</h3>
                      <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                        {workflow.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{workflow.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-1">Triggers:</p>
                        <ul className="text-gray-600 space-y-1">
                          {workflow.triggers.map((trigger, index) => (
                            <li key={index}>• {trigger}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Actions:</p>
                        <ul className="text-gray-600 space-y-1">
                          {workflow.actions.map((action, index) => (
                            <li key={index}>• {action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                      <span>Last run: {workflow.lastRun}</span>
                      {workflow.savings > 0 && (
                        <span className="text-green-600 font-medium">
                          Saves ${workflow.savings}/mo
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <Button variant="outline">Edit</Button>
                    <Button variant={workflow.status === "active" ? "outline" : "default"}>
                      {workflow.status === "active" ? "Disable" : "Enable"}
                    </Button>
                    <Button variant="outline">Run Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Automation Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="text-2xl mb-2">🔍</span>
                <span>License Audit</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="text-2xl mb-2">💰</span>
                <span>Cost Optimization</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="text-2xl mb-2">🛡️</span>
                <span>Security Compliance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}