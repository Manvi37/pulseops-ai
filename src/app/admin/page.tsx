"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">100%</p>
            <p className="text-sm text-gray-600">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">24</p>
            <p className="text-sm text-gray-600">Across 3 teams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">1.2K</p>
            <p className="text-sm text-gray-600">Requests today</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Manage Users</Button>
            <Button>System Settings</Button>
            <Button>API Configuration</Button>
            <Button>Backup & Restore</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">New user registered</p>
              <p className="text-sm text-gray-600">2 minutes ago</p>
            </div>
            <div>
              <p className="font-medium">API key rotated</p>
              <p className="text-sm text-gray-600">1 hour ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
