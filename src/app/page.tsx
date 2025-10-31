// src/app/page.tsx - Enhanced version
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            PulseOps <span className="text-blue-400">AI</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Autonomous AI agent for MSPs to grow profitably while IT teams optimize budgets and software usage.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Link href="/msp">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                MSP Dashboard
              </Button>
            </Link>
            <Link href="/it">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                IT Dashboard
              </Button>
            </Link>
          </div>
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Client Health Monitoring</h3>
                <p className="text-sm text-gray-300">Track client profitability and churn risk in real-time</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Cost Optimization</h3>
                <p className="text-sm text-gray-300">Automatically detect and fix license waste</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-sm text-gray-300">Get actionable recommendations through natural language</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}