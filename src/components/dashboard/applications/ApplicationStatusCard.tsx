import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";

interface ApplicationStatusCardsProps {
  totalApplications: number;
  newThisWeek: number;
  inReview: number;
  rejected: number;
}

const ApplicationStatusCards = ({
  totalApplications,
  newThisWeek,
  inReview,
  rejected,
}: ApplicationStatusCardsProps) => {
  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      icon: FileText,
      subtext: "+12 from last month",
    },
    {
      label: "New This Week",
      value: newThisWeek,
      icon: Clock,
      subtext: "Pending review",
    },
    {
      label: "In Review",
      value: inReview,
      icon: CheckCircle,
      subtext: "Active candidates",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      subtext: "This month",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                {stat.label}
              </CardTitle>
              <Icon className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {stat.value}
              </div>
              <p className="text-muted-foreground text-xs">{stat.subtext}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationStatusCards;
