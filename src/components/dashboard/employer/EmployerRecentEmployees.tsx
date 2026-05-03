import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EMPLOYER_ROUTES } from "@/constants/employerRoutes";
import { humanizeJobOrApplicationStatus } from "@/lib/employerDashboardFormat";
import {
  COMPANY_USER_ROLE_LABELS,
  type RecentEmployee,
} from "@/types/employerDashboard";
import { format } from "date-fns";
import { Users } from "lucide-react";
import Link from "next/link";
import { MemberInitialsAvatar } from "./MemberInitialsAvatar";
import { EmployerEmployeeRowSkeleton } from "./EmployerDashboardSkeleton";

type EmployerRecentEmployeesProps = {
  members: RecentEmployee[];
  isLoading: boolean;
};

export function EmployerRecentEmployees({
  members,
  isLoading,
}: EmployerRecentEmployeesProps) {
  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Recent Employees</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Newest members linked to your company
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <EmployerEmployeeRowSkeleton rows={4} />
        ) : members.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No employees yet. Invite team members from company settings.
          </p>
        ) : (
          <ul className="space-y-3" aria-label="Recent employees">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex items-center justify-between gap-3 rounded-xl border p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <MemberInitialsAvatar name={member.fullName} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {member.fullName}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {COMPANY_USER_ROLE_LABELS[member.role] ??
                        humanizeJobOrApplicationStatus(member.role)}
                    </p>
                  </div>
                </div>
                <time
                  className="text-muted-foreground shrink-0 text-xs"
                  dateTime={member.createdAt || undefined}
                >
                  {member.createdAt
                    ? format(new Date(member.createdAt), "M/d/yyyy")
                    : "—"}
                </time>
              </li>
            ))}
          </ul>
        )}
        <Link href={EMPLOYER_ROUTES.employees}>
          <Button variant="outline" className="w-full rounded-full font-bold">
            <Users className="mr-2 h-4 w-4" aria-hidden />
            View All Employees
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
