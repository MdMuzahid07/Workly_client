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
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          aria-label="Employer shortcuts"
        >
          {actions.map(({ href, label, icon: Icon, variant }) => (
            <Link key={href} href={href} className="w-full sm:w-auto">
              <Button
                variant={variant}
                className={`w-full rounded-full font-bold sm:w-auto ${variant === "default" ? "shadow-sm" : ""}`}
              >
                <Icon className="mr-2 h-4 w-4" aria-hidden />
                {label}
              </Button>
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
