import { Suspense } from "react";
import DashboardJobApplicationView from "../../../../view/dashboard/employer/job-applications/DashboardJobApplicationView";
import ApplicationsSkeleton from "@/skeleton/dashboard/employer/applications/ApplicationsSkeleton";

export default function EmployerApplicationsPage() {
  return (
    <Suspense fallback={<ApplicationsSkeleton />}>
      <DashboardJobApplicationView />
    </Suspense>
  );
}
