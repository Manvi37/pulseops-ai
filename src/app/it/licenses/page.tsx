import { DashboardLayout } from "@/components/layout/DashboardLayout"

export default function LicensesPage() {
  return (
    <DashboardLayout userRole="it">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">License Management</h1>
          <p className="text-gray-600 mt-2">Track software licenses and utilization across departments</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg border text-center">
          <div className="text-6xl mb-4">🔑</div>
          <h3 className="text-xl font-semibold mb-2">License Management</h3>
          <p className="text-gray-600">Detailed license tracking coming soon</p>
        </div>
      </div>
    </DashboardLayout>
  )
}