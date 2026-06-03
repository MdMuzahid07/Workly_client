"use client";

import { ProfileViewsChart } from "@/components/dashboard/charts/ProfileViewsChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetProfileViewStatsQuery,
  useGetRecentVisitorsQuery,
} from "@/redux/feature/profileView/profileViewApi";
import ProfileViewsSkeleton from "@/skeleton/dashboard/job-seeker/profile-views/ProfileViewsSkeleton";
import { formatDistanceToNow } from "date-fns";
import { Eye, Search, TrendingUp, Users } from "lucide-react";
import DashboardHeaderContainer from "@/components/dashboard/dashboard-nav/header/DashboardHeaderContainer";

export default function ProfileViewsView() {
  const { data: statsResponse, isLoading: isStatsLoading } =
    useGetProfileViewStatsQuery(undefined);
  const { data: visitorsResponse, isLoading: isVisitorsLoading } =
    useGetRecentVisitorsQuery(undefined);

  const stats = statsResponse?.data || {};
  const visitors = visitorsResponse?.data || [];

  // Calculate percentage change
  const viewsThisMonth = stats.totalViews; // This is a bit simplified, but okay for now
  const viewsLastMonth = stats.viewsLastMonth || 0;
  const percentageChange =
    viewsLastMonth > 0
      ? ((viewsThisMonth - viewsLastMonth) / viewsLastMonth) * 100
      : 0;

  const isLoading = isStatsLoading || isVisitorsLoading;

  return (
    <div className="mt-16 min-h-screen">
      <DashboardHeaderContainer>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Eye className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Profile Insights
            </h1>
            <p className="text-muted-foreground inline-flex text-xs font-medium opacity-80 sm:text-sm">
              Track who is viewing your profile
            </p>
          </div>
        </div>
      </DashboardHeaderContainer>

      {isLoading ? (
        <ProfileViewsSkeleton />
      ) : (
        <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Views
                </CardTitle>
                <Eye className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-primary text-2xl font-bold">
                  {stats.totalViews?.toLocaleString()}
                </div>
                <p className="text-muted-foreground flex items-center gap-1 text-xs">
                  <TrendingUp
                    className={`h-3 w-3 ${percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}
                  />
                  <span
                    className={`font-medium ${percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {percentageChange >= 0 ? "+" : ""}
                    {percentageChange.toFixed(1)}%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Unique Companies
                </CardTitle>
                <Users className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-primary text-2xl font-bold">
                  {stats.uniqueCompaniesCount}
                </div>
                <p className="text-muted-foreground text-xs">
                  Viewers from different companies
                </p>
              </CardContent>
            </Card>
            <Card className="border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Search Appearances
                </CardTitle>
                <Search className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-primary text-2xl font-bold">0</div>
                <p className="text-muted-foreground text-xs">Coming soon...</p>
              </CardContent>
            </Card>
          </div>

          {/* Chart Section */}
          <div className="grid grid-cols-1 gap-6">
            <ProfileViewsChart data={stats.chartData} />
          </div>

          {/* Visitors List */}
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Recent Profile Visitors</CardTitle>
              <CardDescription>
                Companies and recruiters who viewed your profile recently.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-border divide-y">
                {visitors.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  visitors.map((view: any) => {
                    const viewer = view.viewer;
                    const company = viewer?.company;
                    const profile = viewer?.profile;

                    return (
                      <div
                        key={view.id}
                        className="flex flex-col justify-between gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:py-5"
                      >
                        <div className="flex items-start gap-3 sm:items-center">
                          <Avatar className="h-10 w-10 rounded-lg sm:h-12 sm:w-12">
                            <AvatarImage
                              src={company?.logoUrl || profile?.avatarUrl || ""}
                              alt={viewer?.fullName || "Recruiter"}
                            />
                            <AvatarFallback className="rounded-lg text-sm font-bold">
                              {(viewer?.fullName || "RC")
                                .slice(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5 sm:space-y-1">
                            <h4 className="text-foreground text-sm font-bold sm:text-base">
                              {viewer?.fullName}
                            </h4>
                            <p className="text-muted-foreground text-xs font-semibold sm:text-sm">
                              {company?.name ||
                                viewer?.email ||
                                "Independent Recruiter"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end sm:gap-4">
                          <span className="text-muted-foreground text-xs font-semibold sm:text-sm">
                            {formatDistanceToNow(
                              new Date(
                                view.viewedAt || view.createdAt || new Date(),
                              ),
                              {
                                addSuffix: true,
                              },
                            )}
                          </span>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 font-bold">
                            Viewed
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-10 text-center">
                    <p className="text-muted-foreground italic">
                      No profile visitors yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
