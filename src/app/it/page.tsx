"use client"

import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { CostTracker } from "@/components/it/CostTracker"
import { useEffect, useState } from "react"

export default function ITDashboard() {
  const [costData, setCostData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const response = await fetch('http://localhost:8000/analytics/costs')
        const data = await response.json()
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
      <DashboardLayout userRole="it">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="it">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">IT Cost Management</h1>
          <p className="text-gray-600 mt-2">
            Monitor spending and optimize resource usage across your organization
          </p>
        </div>
        <CostTracker />
      </div>
    </DashboardLayout>
  )
}