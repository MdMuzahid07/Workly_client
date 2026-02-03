"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardEmployerSavedProfilesHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardEmployerSavedProfilesHeader";

export default function EmployerSavedProfilesPage() {
  return (
    <div className="min-h-screen">
      <DashboardEmployerSavedProfilesHeader />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Saved Profiles</CardTitle>
            <p className="text-muted-foreground text-sm">
              Candidate profiles you’ve saved for future roles. Quick access
              when you’re hiring.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Save candidate profiles from applications to revisit later. Your
              saved profiles will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
