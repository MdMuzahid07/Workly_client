import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, TrendingUp, Users } from "lucide-react";

interface Job {
  id: string;
  status: "active" | "closed" | "draft";
  applications: number;
}

interface JobStatusCardsProps {
  jobs: Job[];
}

const JobStatusCards = ({ jobs }: JobStatusCardsProps) => {
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.status === "active").length;
  const totalApplications = jobs.reduce(
    (sum, job) => sum + job.applications,
    0,
  );
  const draftJobs = jobs.filter((job) => job.status === "draft").length;

  const stats = [
    {
      label: "Total Jobs",
      value: totalJobs,
      change: "+12% from last month",
      icon: Briefcase,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changePositive: true,
    },
    {
      label: "Active Jobs",
      value: activeJobs,
      subtext: "Currently hiring",
      badge: "Active",
      icon: TrendingUp,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Applications",
      value: totalApplications,
      change: "+78 this week",
      icon: Users,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      changePositive: true,
    },
    {
      label: "Draft Jobs",
      value: draftJobs,
      subtext: "Pending publication",
      icon: Briefcase,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card rounded-xl border">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-foreground mt-2 text-3xl font-semibold">
                  {stat.value}
                </p>
                {stat.change && (
                  <p
                    className={`mt-1 text-sm ${stat.changePositive ? "text-primary" : "text-destructive"}`}
                  >
                    {stat.change}
                  </p>
                )}
                {stat.subtext && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {stat.subtext}
                  </p>
                )}
              </div>
              {stat.badge ? (
                <Badge className="bg-primary/10 text-PRIMARY border-0">
                  {stat.badge}
                </Badge>
              ) : (
                <div className={`rounded-lg p-3 ${stat.iconBg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobStatusCards;
