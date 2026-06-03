"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, TrendingUp, Users, Zap } from "lucide-react";

const stats = [
  {
    label: "Active Subscriptions",
    value: "2,450",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "Monthly Recurr. Revenue",
    value: "৳845,900",
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    label: "Platform Conversion",
    value: "5.8%",
    icon: Zap,
    color: "text-amber-500",
  },
  {
    label: "Local Market Reach",
    value: "64 Districts",
    icon: Globe,
    color: "text-blue-500",
  },
];

export function PlanStatsGrid() {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-card rounded-xl border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-xs font-bold tracking-widest uppercase opacity-70">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight sm:text-3xl">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
