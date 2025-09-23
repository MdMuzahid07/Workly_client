import { ReactNode } from "react";
import DashboardNavSidebar from "../../components/dashboard/dashboard-nav/DashboardNavSidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-primary/2 min-h-screen">
      <DashboardNavSidebar />

      <div className="bg-primary/2 lg:pl-64">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
