"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Building2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JobSummaryCard = ({ job }: any) => {
  return (
    <Card className="bg-card rounded-xl border p-2 shadow-none sm:p-4">
      <CardHeader>
        <div className="space-y-4">
          <div>
            <h2 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
              {job?.data?.title}
            </h2>
            <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm font-medium">
              <Building2 className="text-primary/60 h-4 w-4" />
              {job?.data?.company?.name}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 text-xs font-bold tracking-tight">
            <Badge
              variant="outline"
              className="border-success/30 bg-success/10 text-success text-[10px] sm:text-xs"
            >
              {job?.data?.location}
            </Badge>
            <Badge
              variant="outline"
              className="text-foreground bg-transparent text-[10px] sm:text-xs"
            >
              {job?.data?.jobType}
            </Badge>
            <Badge
              variant="outline"
              className="text-foreground bg-transparent text-[10px] sm:text-xs"
            >
              {job?.data?.experienceLevel}
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default JobSummaryCard;
