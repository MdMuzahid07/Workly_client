"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Mail, Phone } from "lucide-react";

interface Application {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  applicantAvatar?: string;
  jobTitle: string;
  appliedDate: string;
  status: string;
  coverLetter?: string;
}

interface ApplicationCardProps {
  application: Application;
  onViewDetails?: (id: string) => void;
}

const ApplicationCard = ({
  application,
  onViewDetails,
}: ApplicationCardProps) => {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      submitted: "bg-chart-1/10 text-chart-1 border-chart-1/20",
      reviewing: "bg-chart-2/10 text-chart-2 border-chart-2/20",
      shortlisted: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      interviewed: "bg-chart-5/10 text-chart-5 border-chart-5/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
      offered: "bg-chart-3/10 text-chart-3 border-chart-3/20",
      accepted: "bg-primary/10 text-primary border-primary/20",
    };
    return colors[status.toLowerCase()] || "bg-muted text-muted-foreground";
  };

  const initials = application.applicantName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="cursor-pointer p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={application.applicantAvatar || "/placeholder.svg"}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-semibold">
            {application.applicantName}
          </h4>
          <p className="text-muted-foreground truncate text-xs">
            {application.jobTitle}
          </p>
          <div className="mt-2 flex flex-col gap-1">
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Mail className="h-3 w-3" />
              <span className="truncate">{application.applicantEmail}</span>
            </div>
            {application.applicantPhone && (
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Phone className="h-3 w-3" />
                <span>{application.applicantPhone}</span>
              </div>
            )}
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              <span>{application.appliedDate}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Badge
              variant="outline"
              className={getStatusColor(application.status)}
            >
              {application.status}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails?.(application.id)}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ApplicationCard;
