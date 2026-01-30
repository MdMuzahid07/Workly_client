import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  XCircle,
} from "lucide-react";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";

export interface Application {
  id: string;
  title: string;
  company: {
    name: string;
  };
  location: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  jobType: string;
  createdAt: string;
  requirements: string;
  JobSkill: Array<{ id: string; skillName: string }>;
  appliedDate: string;
  status: "pending" | "under_review" | "accepted" | "rejected";
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "pending":
      return {
        badge: "bg-warning/10 text-warning border-warning/30",
        icon: Clock,
        label: "Pending",
      };
    case "under_review":
      return {
        badge: "bg-primary/10 text-primary border-primary/30",
        icon: AlertCircle,
        label: "Under Review",
      };
    case "accepted":
      return {
        badge: "bg-success/10 text-success border-success/30",
        icon: CheckCircle,
        label: "Accepted",
      };
    case "rejected":
      return {
        badge: "bg-destructive/10 text-destructive border-destructive/30",
        icon: XCircle,
        label: "Rejected",
      };
    default:
      return {
        badge: "bg-muted text-muted-foreground border-border",
        icon: Clock,
        label: status,
      };
  }
};

const ApplicationCard = ({ app }: { app: Application }) => {
  const statusConfig = getStatusConfig(app.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="bg-card border-border transition-all">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h3 className="text-foreground line-clamp-2 text-lg font-semibold">
                {app.title}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {app.company.name}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`w-fit shrink-0 gap-1.5 border text-xs sm:text-sm ${statusConfig.badge}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {statusConfig.label}
            </Badge>
          </div>

          <div className="text-muted-foreground flex flex-wrap gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{app.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium">{app.jobType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(app.appliedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="border-border flex items-center gap-2 border-t py-3">
            <DollarSign className="text-primary h-4 w-4" />
            <span className="text-foreground font-semibold">
              {app.currency} {app.salaryMin.toLocaleString()} -{" "}
              {app.salaryMax.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {app.JobSkill?.map((skill) => (
              <Badge
                key={skill.id}
                variant="outline"
                className="bg-muted/50 hover:bg-muted rounded-full text-xs"
              >
                {skill.skillName}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1 rounded-full font-medium">
              View Application
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 rounded-full bg-transparent"
            >
              View Job
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
