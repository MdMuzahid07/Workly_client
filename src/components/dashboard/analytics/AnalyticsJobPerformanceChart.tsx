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
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Job Performance</h3>
        <p className="text-muted-foreground text-sm">
          Top performing job postings
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={job.title}
            className="hover:bg-muted/50 flex flex-col gap-3 rounded-lg border p-4 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm font-medium">
                #{index + 1}
              </span>
              <h4 className="font-medium">{job.title}</h4>
              <Badge variant="secondary" className="ml-auto">
                {job.status}
              </Badge>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Conversion Rate</span>
                <span className="text-success font-medium">
                  {job.conversionRate}%
                </span>
              </div>
              <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                <div
                  className="bg-success h-full transition-all duration-300"
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
