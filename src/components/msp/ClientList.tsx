"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Fallback mock data in case API fails
const mockClients = [
  {
    id: 1,
    name: "Acme Corporation",
    healthScore: 92,
    revenue: 15000,
    tickets: 3,
    devices: 45,
    risk: "low",
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Beta Solutions",
    healthScore: 45,
    revenue: 8000,
    tickets: 15,
    devices: 23,
    risk: "high",
    lastActivity: "5 minutes ago"
  },
  {
    id: 3,
    name: "Gamma Tech",
    healthScore: 78,
    revenue: 12000,
    tickets: 7,
    devices: 34,
    risk: "medium",
    lastActivity: "1 day ago"
  }
]

export function ClientList() {
  const [clients, setClients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Fetch real data from backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/clients');
        if (!response.ok) throw new Error('API response not ok');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
        // Fallback to mock data if API fails
        setClients(mockClients);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  // Use real clients instead of mockClients
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterRisk === "all" || client.risk === filterRisk)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading clients...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <select 
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Risks</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>
        <Button>Export Report</Button>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{client.name}</h3>
                  <p className="text-sm text-gray-600">Last activity: {client.lastActivity}</p>
                </div>
                <Badge className={getRiskColor(client.risk)}>
                  {client.risk.toUpperCase()} RISK
                </Badge>
              </div>

              {/* Health Score */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Health Score</span>
                  <span className={`text-lg font-bold ${getHealthColor(client.healthScore)}`}>
                    {client.healthScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      client.healthScore >= 80 ? "bg-green-500" : 
                      client.healthScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${client.healthScore}%` }}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <p className="text-2xl font-bold text-blue-600">${(client.revenue / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{client.tickets}</p>
                  <p className="text-xs text-gray-600">Tickets</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{client.devices}</p>
                  <p className="text-xs text-gray-600">Devices</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No clients found matching your filters.</p>
        </div>
      )}
    </div>
  )
}