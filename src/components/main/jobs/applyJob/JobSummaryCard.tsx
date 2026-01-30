"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Building2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JobSummaryCard = ({ job }: any) => {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="space-y-3">
          <div>
            <h2 className="text-2xl font-bold">{job?.data?.title}</h2>
            <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4" />
              {job?.data?.company?.name}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-success/30 bg-success/10 text-success"
            >
              {job?.data?.location}
            </Badge>
            <Badge variant="outline">{job?.data?.jobType}</Badge>
            <Badge variant="outline">{job?.data?.experienceLevel}</Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default JobSummaryCard;
