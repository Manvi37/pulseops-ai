"use client"

import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ChatInterface } from "@/components/shared/ChatInterface"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function MSPDashboard() {
  const [healthData, setHealthData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await fetch('http://localhost:8000/analytics/health')
        const data = await response.json()
        setHealthData(data)
      } catch (error) {
        console.error('Failed to fetch health data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHealthData()
  }, [])

  if (loading) {
    return (
      <DashboardLayout userRole="msp">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="msp">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Client Overview</h1>
              <p className="text-gray-600 mt-2">Monitor client health and revenue performance</p>
            </div>
            <Link href="/msp/clients">
              <Button>View All Clients</Button>
            </Link>
          </div>
          
          {/* Real Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-gray-600">Total Clients</h3>
              <p className="text-3xl font-bold mt-2">{healthData?.total_clients || 0}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-gray-600">At Risk</h3>
              <p className="text-3xl font-bold mt-2 text-red-600">
                {healthData?.risk_distribution?.high || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Need immediate attention</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-gray-600">Avg Health Score</h3>
              <p className="text-3xl font-bold mt-2">{healthData?.average_health_score || 0}%</p>
              <p className="text-sm text-gray-600 mt-1">Overall performance</p>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-gray-600">Stable Clients</h3>
              <p className="text-3xl font-bold mt-2 text-green-600">
                {healthData?.risk_distribution?.low || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Good health</p>
            </div>
          </div>

          {/* Real Alerts */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Priority Alerts</h3>
            <div className="space-y-3">
              {healthData?.top_concerns?.map((client: any, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">{client.name} - High Risk Client</p>
                    <p className="text-sm text-gray-600">
                      {client.tickets} active tickets, health score at {client.healthScore}%
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Take Action</Button>
                </div>
              ))}
              {(!healthData?.top_concerns || healthData.top_concerns.length === 0) && (
                <div className="text-center py-4 text-gray-500">
                  No high-risk clients detected
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="xl:col-span-1">
          <ChatInterface />
        </div>
      </div>
    </DashboardLayout>
  )
}