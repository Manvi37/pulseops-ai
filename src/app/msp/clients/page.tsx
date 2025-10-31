import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ClientList } from "@/components/msp/ClientList"

export default function ClientsPage() {
  return (
    <DashboardLayout userRole="msp">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-gray-600 mt-2">
            Monitor client health, identify risks, and discover growth opportunities
          </p>
        </div>
        
        <ClientList />
      </div>
    </DashboardLayout>
  )
}