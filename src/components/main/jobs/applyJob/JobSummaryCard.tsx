"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { JobData } from "../../../../view/job/ApplyJobView";

const JobSummaryCard = ({ job }: { job: JobData }) => (
  <Card className="border-primary/20 bg-primary/5">
    <CardHeader>
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4" />
            {job.company}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="border-success/30 bg-success/10 text-success"
          >
            {job.locationType}
          </Badge>
          <Badge variant="outline">{job.jobType}</Badge>
          <Badge variant="outline">{job.experienceLevel}</Badge>
        </div>
      </div>
    </CardHeader>
  </Card>
);

export default JobSummaryCard;
