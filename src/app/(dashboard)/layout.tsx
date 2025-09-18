import { ReactNode } from "react";
import DashboardNavSidebar from "../../components/dashboard/dashboard-nav/DashboardNavSidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavSidebar />

      <div className="lg:pl-64">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
