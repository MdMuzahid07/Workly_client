"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, Users } from "lucide-react";

interface JobPerformanceChartProps {
  timeRange: string;
}

const AnalyticsJobPerformanceChart = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  timeRange,
}: JobPerformanceChartProps) => {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      views: 1245,
      applications: 89,
      conversionRate: 7.1,
      status: "Active",
    },
    {
      title: "Backend Engineer",
      views: 987,
      applications: 67,
      conversionRate: 6.8,
      status: "Active",
    },
    {
      title: "Product Manager",
      views: 1567,
      applications: 124,
      conversionRate: 7.9,
      status: "Active",
    },
    {
      title: "UX Designer",
      views: 876,
      applications: 54,
      conversionRate: 6.2,
      status: "Active",
    },
    {
      title: "DevOps Engineer",
      views: 654,
      applications: 41,
      conversionRate: 6.3,
      status: "Active",
    },
  ];

  return (
    <Card className="border-primary/10 bg-background/60 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-foreground text-lg font-bold tracking-tight">
          Job Performance
        </h3>
        <p className="text-muted-foreground text-xs font-medium opacity-60">
          Top performing job postings
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={job.title}
            className="hover:bg-primary/5 hover:border-primary/20 flex flex-col gap-3 rounded-xl border border-transparent p-4 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-primary/40 font-mono text-xs font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="text-sm font-bold tracking-tight">{job.title}</h4>
              <Badge className="ml-auto border-none bg-emerald-500/10 text-[10px] font-bold text-emerald-600 uppercase">
                {job.status}
              </Badge>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold tracking-wider uppercase">
                <span className="text-muted-foreground opacity-60">
                  Conversion Rate
                </span>
                <span className="text-emerald-600">{job.conversionRate}%</span>
              </div>
              <div className="bg-muted/30 h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{
                    width: `${Math.min(job.conversionRate * 10, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Eye className="text-muted-foreground h-4 w-4" />
                <span className="font-medium">{job.views}</span>
                <span className="text-muted-foreground">views</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Users className="text-muted-foreground h-4 w-4" />
                <span className="font-medium">{job.applications}</span>
                <span className="text-muted-foreground">applications</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AnalyticsJobPerformanceChart;
