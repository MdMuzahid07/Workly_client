"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, CreditCard, Receipt, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "৳942,500",
    icon: Banknote,
    color: "text-primary",
    trend: "+12.5%",
  },
  {
    label: "Monthly Volume",
    value: "৳82,480",
    icon: TrendingUp,
    color: "text-emerald-500",
    trend: "+4.2%",
  },
  {
    label: "Pending Invoices",
    value: "৳13,240",
    icon: Receipt,
    color: "text-amber-500",
    trend: "6 items",
  },
  {
    label: "Success Rate",
    value: "99.2%",
    icon: CreditCard,
    color: "text-blue-500",
    trend: "+0.8% rise",
  },
];

export function FinancialStatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-card rounded-xl border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase opacity-70">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                {stat.value}
              </div>
              <span
                className={`text-[9px] font-bold tracking-widest uppercase ${stat.trend.startsWith("+") ? "text-emerald-500" : "text-muted-foreground opacity-60"}`}
              >
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
