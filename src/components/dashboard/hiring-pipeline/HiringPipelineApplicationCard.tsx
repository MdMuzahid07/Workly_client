"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Mail, MoreVertical } from "lucide-react";

interface Application {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  applicantAvatar?: string;
  jobTitle: string;
  appliedDate: string;
  status: string;
}

interface PipelineApplicationCardProps {
  application: Application;
}

const HiringPipelineApplicationCard = ({
  application,
}: PipelineApplicationCardProps) => {
  const initials = application.applicantName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="group bg-card cursor-grab p-4 transition-all hover:shadow-md active:cursor-grabbing">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={application.applicantAvatar || "/placeholder.svg"}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm leading-tight font-semibold">
                {application.applicantName}
              </h4>
              <p className="text-muted-foreground mt-0.5 truncate text-xs">
                {application.jobTitle}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Send Email</DropdownMenuItem>
              <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1.5">
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Mail className="h-3.5 w-3.5" />
            <span className="truncate">{application.applicantEmail}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Calendar className="h-3.5 w-3.5" />
            <span>Applied {application.appliedDate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HiringPipelineApplicationCard;
