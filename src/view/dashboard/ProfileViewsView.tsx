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
import { Eye, Search, TrendingUp, Users } from "lucide-react";
import DashboardHeaderContainer from "../../components/dashboard/dashboard-nav/header/DashboardHeaderContainer";

const mockVisitors = [
  {
    id: 1,
    name: "Google",
    industry: "Technology",
    time: "2 hours ago",
    location: "Mountain View, CA",
    logo: "https://www.google.com/favicon.ico",
  },
  {
    id: 2,
    name: "Amazon",
    industry: "E-commerce",
    time: "5 hours ago",
    location: "Seattle, WA",
    logo: "https://www.amazon.com/favicon.ico",
  },
  {
    id: 3,
    name: "Meta",
    industry: "Social Media",
    time: "Yesterday",
    location: "Menlo Park, CA",
    logo: "https://www.meta.com/favicon.ico",
  },
  {
    id: 4,
    name: "Netflix",
    industry: "Entertainment",
    time: "2 days ago",
    location: "Los Gatos, CA",
    logo: "https://www.netflix.com/favicon.ico",
  },
  {
    id: 5,
    name: "Microsoft",
    industry: "Software",
    time: "3 days ago",
    location: "Redmond, WA",
    logo: "https://www.microsoft.com/favicon.ico",
  },
];

export default function ProfileViewsView() {
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

      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">1,284</div>
              <p className="text-muted-foreground flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="font-medium text-green-500">+12.5%</span> from
                last month
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
              <div className="text-primary text-2xl font-bold">42</div>
              <p className="text-muted-foreground text-xs">
                +4 new companies this week
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
              <div className="text-primary text-2xl font-bold">856</div>
              <p className="text-muted-foreground text-xs">
                +18% increase in visibility
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 gap-6">
          <ProfileViewsChart />
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
              {mockVisitors.map((visitor) => (
                <div
                  key={visitor.id}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 rounded-lg border">
                      <AvatarImage src={visitor.logo} alt={visitor.name} />
                      <AvatarFallback className="rounded-lg">
                        {visitor.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">{visitor.name}</h4>
                      <p className="text-muted-foreground text-xs">
                        {visitor.industry} • {visitor.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-normal"
                    >
                      {visitor.time}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
