import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EMPLOYER_ROUTES } from "@/constants/employerRoutes";
import { Building2, Plus, TrendingUp, UserPlus } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    href: EMPLOYER_ROUTES.postJob,
    label: "Post New Job",
    icon: Plus,
    variant: "default" as const,
  },
  {
    href: EMPLOYER_ROUTES.savedProfiles,
    label: "Browse Candidates",
    icon: UserPlus,
    variant: "outline" as const,
  },
  {
    href: EMPLOYER_ROUTES.companyProfile,
    label: "Edit Company Profile",
    icon: Building2,
    variant: "outline" as const,
  },
  {
    href: EMPLOYER_ROUTES.analytics,
    label: "View Analytics",
    icon: TrendingUp,
    variant: "outline" as const,
  },
];

export function EmployerQuickActions() {
  return (
    <Card className="bg-card border transition-shadow">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Shortcuts to common tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <nav
          className="scrollbar-none flex flex-row gap-2.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
          aria-label="Employer shortcuts"
        >
          {actions.map(({ href, label, icon: Icon, variant }) => (
            <Link key={href} href={href} className="w-auto shrink-0">
              <Button
                variant={variant}
                className={`rounded-full px-3.5 py-2 text-xs font-bold sm:px-4 sm:py-2.5 sm:text-sm ${variant === "default" ? "shadow-sm" : ""}`}
              >
                <Icon
                  className="mr-1.5 h-3.5 w-3.5 shrink-0 sm:mr-2 sm:h-4 sm:w-4"
                  aria-hidden
                />
                <span>{label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
