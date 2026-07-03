"use client";

import { JobApplicationsChart } from "@/components/dashboard/charts/JobApplicationsChart";
import { ProfileViewsChart } from "@/components/dashboard/charts/ProfileViewsChart";
import DashboardJobSeekerHeader from "@/components/dashboard/dashboard-nav/header/DashboardJobSeekerHeader";
import { StatCard } from "@/components/shared/StatCard";
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
import { calculateJobSeekerProfileCompletion } from "@/utils/profile-utils";
import { Bookmark, FileText, Search, TrendingUp, User } from "lucide-react";
import Link from "next/link";

import JobSeekerDashboardSkeleton from "@/skeleton/dashboard/job-seeker/dashboard/JobSeekerDashboardSkeleton";

export default function JobSeekerDashboardView() {
  const { user } = useAppSelector((state) => state.auth) || {};
  const userId = user?.id;

  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(
    undefined,
    {
      skip: !userId,
    },
  );
  const { data: applicationsData, isLoading: isApplicationsLoading } =
    useGetMyApplicationsQuery(undefined, {
      skip: !userId,
    });
  const { data: savedJobsData, isLoading: isSavedLoading } =
    useGetSavedJobsQuery(undefined, {
      skip: !userId,
    });

  const isLoading = isProfileLoading || isApplicationsLoading || isSavedLoading;

  const profileCompletion = calculateJobSeekerProfileCompletion(
    profileData?.data,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applications = (applicationsData?.data as any[]) || [];
  const savedCount = Array.isArray(savedJobsData?.data)
    ? savedJobsData.data.length
    : 0;
  const appliedCount = applications.length;

  return (
    <div className="min-h-screen">
      <DashboardJobSeekerHeader />
      {isLoading ? (
        <JobSeekerDashboardSkeleton />
      ) : (
        <div className="space-y-3 px-3 py-3 sm:space-y-6 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4 xl:gap-6">
            <StatCard
              title="Profile completion"
              value={`${profileCompletion}%`}
              description="Complete your profile to get better matches"
              icon={<User className="h-4 w-4" />}
              ctaHref="/dashboard/profile"
              ctaLabel="Edit profile"
            />

            <StatCard
              title="Applications"
              value={appliedCount}
              description="Total applications submitted"
              icon={<FileText className="h-4 w-4" />}
              ctaHref="/dashboard/applied-jobs"
              ctaLabel="View applied jobs"
            />

            <StatCard
              title="Saved jobs"
              value={savedCount}
              description="Jobs you've saved for later"
              icon={<Bookmark className="h-4 w-4" />}
              ctaHref="/dashboard/saved-jobs"
              ctaLabel="View saved jobs"
            />

            <StatCard
              title="Recommended"
              value="Jobs for You"
              description="Jobs matched to your profile and preferences"
              icon={<TrendingUp className="h-4 w-4" />}
              ctaHref="/dashboard/recommended-jobs"
              ctaLabel="See recommendations"
            />
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            <ProfileViewsChart />
            <JobApplicationsChart />
          </div>

          {/* Action Cards & Activity */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <Card className="bg-card hover:border-primary/30 rounded-2xl border shadow-xs transition-all duration-300 hover:shadow-md">
              <CardHeader className="p-3.5 pb-2 sm:p-6 sm:pb-3">
                <CardTitle className="text-sm font-bold tracking-tight sm:text-lg">
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Shortcuts to manage your job search effectively
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2 p-3.5 pt-0 sm:gap-3 sm:p-6 sm:pt-0">
                <Link href="/dashboard/find-jobs" className="w-full">
                  <div className="group border-border hover:border-primary/40 bg-muted/30 hover:bg-primary/5 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-center transition-all duration-200 sm:p-4">
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-full p-2 transition-colors duration-200 sm:p-2.5">
                      <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-foreground group-hover:text-primary text-[10px] font-semibold sm:text-sm">
                      Find Jobs
                    </span>
                  </div>
                </Link>

                <Link href="/dashboard/profile" className="w-full">
                  <div className="group border-border hover:border-primary/40 bg-muted/30 hover:bg-primary/5 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-center transition-all duration-200 sm:p-4">
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-full p-2 transition-colors duration-200 sm:p-2.5">
                      <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-foreground group-hover:text-primary text-[10px] font-semibold sm:text-sm">
                      Edit Profile
                    </span>
                  </div>
                </Link>

                <Link href="/dashboard/cv-manager" className="w-full">
                  <div className="group border-border hover:border-primary/40 bg-muted/30 hover:bg-primary/5 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-center transition-all duration-200 sm:p-4">
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-full p-2 transition-colors duration-200 sm:p-2.5">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-foreground group-hover:text-primary text-[10px] font-semibold sm:text-sm">
                      CV Manager
                    </span>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card hover:border-primary/30 rounded-2xl border shadow-xs transition-all duration-300 hover:shadow-md">
              <CardHeader className="p-3.5 pb-2 sm:p-6 sm:pb-3">
                <CardTitle className="text-sm font-bold tracking-tight sm:text-lg">
                  Recent Activity Overview
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Your current engagement and application status
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3.5 pt-0 sm:p-6 sm:pt-0">
                {appliedCount === 0 && savedCount === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-muted-foreground mb-3 text-xs leading-relaxed sm:text-sm">
                      You {`haven't`} applied to or saved any jobs yet.
                    </p>
                    <Link href="/dashboard/find-jobs">
                      <Button
                        size="sm"
                        className="h-8 rounded-full px-4 text-xs font-semibold sm:h-9 sm:text-sm"
                      >
                        Start Exploring Jobs
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="divide-border divide-y rounded-xl border">
                      <div className="flex items-center justify-between p-2.5 text-xs sm:p-3 sm:text-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="bg-primary/10 text-primary rounded-md p-1.5">
                            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </div>
                          <span className="font-medium">
                            Applications Submitted
                          </span>
                        </div>
                        <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-bold">
                          {appliedCount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 text-xs sm:p-3 sm:text-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="rounded-md bg-amber-500/10 p-1.5 text-amber-600 dark:text-amber-400">
                            <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </div>
                          <span className="font-medium">Saved Jobs</span>
                        </div>
                        <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                          {savedCount}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Link href="/dashboard/applied-jobs">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/5 h-8 rounded-full px-3 text-xs font-bold sm:h-9 sm:px-4 sm:text-sm"
                        >
                          View Detailed Activity →
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
