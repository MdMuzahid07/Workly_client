"use client";

import { Card, CardContent } from "@/components/ui/card";

export interface JobData {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  locationType: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  requirements: string[];
  benefits: string[];
}

const JobInfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  value: string;
}) => (
  <Card>
    <CardContent className="flex items-start gap-3 pt-6">
      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
        <Icon className="text-primary h-5 w-5" />
      </div>
      <div>
        <p className="text-muted-foreground text-xs font-medium">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default JobInfoCard;
