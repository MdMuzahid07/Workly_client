import ApplicationDetailsSkeleton from "@/skeleton/dashboard/employer/applications/ApplicationDetailsSkeleton";
import DashboardJobApplicationDetailsView from "@/view/dashboard/employer/job-applications/DashboardJobApplicationDetailsView";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EmployerApplicationDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ApplicationDetailsSkeleton />}>
      <DashboardJobApplicationDetailsView id={id} />
    </Suspense>
  );
}
