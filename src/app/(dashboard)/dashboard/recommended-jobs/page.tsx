"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function RecommendedJobsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Recommended Jobs
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Jobs matched to your profile, skills, and preferences. Complete your
            profile for better recommendations.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            Recommendations will appear here once we have enough data from your
            profile and job preferences.
          </p>
          <Link href="/dashboard/find-jobs">
            <Button>Browse all jobs</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
