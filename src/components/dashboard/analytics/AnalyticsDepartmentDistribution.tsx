"use client";

import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const AnalyticsDepartmentDistribution = () => {
  const departments = [
    { name: "Engineering", employees: 85, percentage: 34, color: "#22c55e" },
    { name: "Product", employees: 42, percentage: 17, color: "#3b82f6" },
    { name: "Design", employees: 28, percentage: 11, color: "#f59e0b" },
    { name: "Marketing", employees: 35, percentage: 14, color: "#ef4444" },
    { name: "Sales", employees: 38, percentage: 15, color: "#8b5cf6" },
    { name: "Operations", employees: 22, percentage: 9, color: "#06b6d4" },
  ];

  const total = departments.reduce((sum, dept) => sum + dept.employees, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Pie Chart */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Department Distribution</h3>
          <p className="text-muted-foreground text-sm">
            Employee count by department
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="employees"
              >
                {departments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value) => `${value} employees`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Department Cards */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Department Overview</h3>
          <p className="text-muted-foreground text-sm">
            Quick stats for each department
          </p>
        </div>

        <div className="space-y-3">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: dept.color + "20" }}
                >
                  <Users className="h-5 w-5" style={{ color: dept.color }} />
                </div>
                <div>
                  <p className="font-medium">{dept.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {dept.employees} employees
                  </p>
                </div>
              </div>
              <span className="text-muted-foreground text-sm font-semibold">
                {dept.percentage}%
              </span>
            </div>
          ))}
        </div>

        <div className="bg-muted mt-6 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Employees</span>
            <span className="text-2xl font-bold">{total}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDepartmentDistribution;
