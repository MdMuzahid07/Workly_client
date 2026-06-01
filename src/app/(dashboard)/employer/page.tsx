import type { Metadata } from "next";
import EmployerDashboardView from "../../../view/dashboard/employer/dashboard/EmployerDashboardView";

export const metadata: Metadata = {
  title: "Employer Dashboard",
  description:
    "Manage job postings, applications, and your hiring pipeline in one place.",
  robots: { index: false, follow: false },
};

export default function EmployerDashboardPage() {
  return <EmployerDashboardView />;
}
