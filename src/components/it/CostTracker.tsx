"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getCostAnalytics } from "@/lib/api"

export function CostTracker() {
  const [costData, setCostData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const data = await getCostAnalytics()
        setCostData(data)
      } catch (error) {
        console.error('Failed to fetch cost data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCostData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Use the actual data structure from your backend
  const monthlySavings = costData?.total_potential_savings || 3200
  const opportunities = costData?.optimization_opportunities || []
  
  // Calculate license usage (you might want to make this dynamic from backend)
  const licenseUsage = 68 // 342/500 = 68%

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Spend</p>
                <p className="text-3xl font-bold mt-2">$24,500</p>
                <Badge variant="destructive" className="mt-2">
                  ↑ 12%
                </Badge>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">License Usage</p>
                <p className="text-3xl font-bold mt-2">342/500</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full ${
                      licenseUsage > 80 ? "bg-red-500" : 
                      licenseUsage > 60 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${licenseUsage}%` }}
                  />
                </div>
              </div>
              <div className="text-2xl">🔑</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">Potential Savings</p>
                <p className="text-3xl font-bold mt-2 text-green-600">
                  ${monthlySavings.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">/month</p>
              </div>
              <div className="text-2xl">💸</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Services & Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services - Using static data for now */}
        <Card>
          <CardHeader>
            <CardTitle>Top Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "AWS", cost: 8200, trend: "up" },
                { name: "Azure", cost: 6500, trend: "down" },
                { name: "SaaS Tools", cost: 9800, trend: "up" }
              ].map((service, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">${service.cost.toLocaleString()}</span>
                    <Badge variant={service.trend === "up" ? "destructive" : "default"}>
                      {service.trend === "up" ? "↑" : "↓"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Optimization Opportunities - Using real backend data */}
        <Card>
          <CardHeader>
            <CardTitle>Optimization Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.map((opportunity: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">{opportunity.description}</p>
                    <p className="text-sm text-gray-600 capitalize">{opportunity.type?.replace('_', ' ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${opportunity.savings}/mo</p>
                    <Button size="sm" variant="outline" className="mt-1">Optimize</Button>
                  </div>
                </div>
              ))}
              {opportunities.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No optimization opportunities found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}