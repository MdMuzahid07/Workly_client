"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, LayoutGrid, Tag, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Total Categories",
    value: "24",
    icon: LayoutGrid,
    color: "text-primary",
  },
  {
    label: "Active Roles",
    value: "1,840",
    icon: Briefcase,
    color: "text-emerald-500",
  },
  {
    label: "Subcategories",
    value: "142",
    icon: Tag,
    color: "text-blue-500",
  },
  {
    label: "Trending Area",
    value: "AI/ML",
    icon: TrendingUp,
    color: "text-amber-500",
  },
];

export function CategoryStatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-card rounded-xl border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
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
