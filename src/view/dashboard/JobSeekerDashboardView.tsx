"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetMyApplicationsQuery } from "@/redux/feature/application/applicationApi";
import {
  useGetProfileQuery,
  useGetSavedJobsQuery,
} from "@/redux/feature/profile/profileApi";
import { useAppSelector } from "@/redux/hooks";
import { Bookmark, FileText, Search, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import DashboardJobSeekerHeader from "../../components/dashboard/dashboard-nav/header/DashboardJobSeekerHeader";

function computeProfileCompletion(
  data:
    | {
        profile?: {
          bio?: string | null;
          location?: string | null;
          avatarUrl?: string | null;
          resumeUrl?: string | null;
        };
        fullName?: string;
      }
    | undefined,
): number {
  if (!data) return 0;
  const { profile } = data;
  const fields = [
    !!data.fullName,
    !!profile?.bio,
    !!profile?.location,
    !!profile?.avatarUrl,
    !!profile?.resumeUrl,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.min(100, Math.round((filled / fields.length) * 100));
}

export default function JobSeekerDashboardView() {
  const { user } = useAppSelector((state) => state.auth) || {};
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !user?.id,
  });
  const { data: applicationsData } = useGetMyApplicationsQuery(undefined, {
    skip: !user?.id,
  });
  const { data: savedJobsData } = useGetSavedJobsQuery(undefined, {
    skip: !user?.id,
  });

  const profileCompletion = computeProfileCompletion(profileData?.data);
  const applications = applicationsData?.data ?? [];
  const savedCount = Array.isArray(savedJobsData?.data)
    ? savedJobsData.data.length
    : 0;
  const appliedCount = applications.length;

  return (
    <div className="min-h-screen">
      <DashboardJobSeekerHeader />
      <div className="space-y-4 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          <Card className="bg-card transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Profile completion
              </CardTitle>
              <User className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {profileCompletion}%
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Complete your profile to get better matches
              </p>
              <Link href="/dashboard/profile">
                <Button
                  variant="link"
                  className="h-auto touch-manipulation p-0 text-xs active:opacity-70"
                >
                  Edit profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Applications
              </CardTitle>
              <FileText className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {appliedCount}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Total applications submitted
              </p>
              <Link href="/dashboard/applied-jobs">
                <Button
                  variant="link"
                  className="h-auto touch-manipulation p-0 text-xs active:opacity-70"
                >
                  View applied jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Saved jobs
              </CardTitle>
              <Bookmark className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {savedCount}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Jobs {`you've`} saved for later
              </p>
              <Link href="/dashboard/saved-jobs">
                <Button
                  variant="link"
                  className="h-auto touch-manipulation p-0 text-xs active:opacity-70"
                >
                  View saved jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Recommended
              </CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Jobs matched to your profile and preferences
              </p>
              <Link href="/dashboard/recommended-jobs">
                <Button
                  variant="link"
                  className="h-auto touch-manipulation p-0 text-xs active:opacity-70"
                >
                  See recommendations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <Card className="bg-card transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Quick actions
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Shortcuts to common tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link href="/dashboard/find-jobs" className="w-full sm:w-auto">
                <Button className="w-full touch-manipulation sm:w-auto">
                  <Search className="mr-2 h-4 w-4" />
                  Find jobs
                </Button>
              </Link>
              <Link href="/dashboard/profile" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full touch-manipulation sm:w-auto"
                >
                  <User className="mr-2 h-4 w-4" />
                  Edit profile
                </Button>
              </Link>
              <Link href="/dashboard/cv-manager" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full touch-manipulation sm:w-auto"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  CV Manager
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Recent activity
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your latest applications and saves
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appliedCount === 0 && savedCount === 0 ? (
                <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                  You {`haven't`} applied or saved any jobs yet.{" "}
                  <Link
                    href="/dashboard/find-jobs"
                    className="text-primary touch-manipulation hover:underline active:opacity-70"
                  >
                    Start exploring
                  </Link>
                </p>
              ) : (
                <div className="space-y-2">
                  {appliedCount > 0 && (
                    <p className="text-xs sm:text-sm">
                      <span className="font-medium">{appliedCount}</span>{" "}
                      application
                      {appliedCount !== 1 ? "s" : ""} submitted
                    </p>
                  )}
                  {savedCount > 0 && (
                    <p className="text-xs sm:text-sm">
                      <span className="font-medium">{savedCount}</span> job
                      {savedCount !== 1 ? "s" : ""} saved
                    </p>
                  )}
                  <Link href="/dashboard/applied-jobs">
                    <Button
                      variant="link"
                      className="h-auto touch-manipulation p-0 text-xs active:opacity-70 sm:text-sm"
                    >
                      View all activity
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
