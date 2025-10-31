import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { CostTracker } from "@/components/it/CostTracker"

export default function CostsPage() {
  return (
    <DashboardLayout userRole="it">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Cost Analysis</h1>
          <p className="text-gray-600 mt-2">Detailed cost breakdown and optimization recommendations</p>
        </div>
        <CostTracker />
      </div>
    </DashboardLayout>
  )
}