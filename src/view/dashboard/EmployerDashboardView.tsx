"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  Building2,
  Eye,
  FileText,
  Plus,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import DashboardOverviewHeader from "../../components/dashboard/dashboard-nav/header/DashboardOverviewHeader";

// Mock company data
const companyData = {
  name: "TechFlow Inc.",
  logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
  industry: "Technology",
  location: "San Francisco, CA",
  website: "techflow.com",
  founded: "2018",
  employees: 250,
  description:
    "Leading software development company specializing in web applications and cloud solutions.",
  stats: {
    totalJobs: 12,
    activeJobs: 8,
    totalApplications: 156,
    totalEmployees: 250,
  },
};

const EmployerDashboardView = () => {
  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applications: 23,
      status: "Active",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Backend Engineer",
      applications: 18,
      status: "Active",
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "Product Manager",
      applications: 31,
      status: "Closed",
      posted: "2 weeks ago",
    },
  ];

  const recentEmployees = [
    {
      id: 1,
      name: "John Doe",
      role: "Senior Developer",
      avatar: "/employee-1.jpg",
      joined: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Product Manager",
      avatar: "/employee-2.jpg",
      joined: "2023-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Designer",
      avatar: "/employee-3.jpg",
      joined: "2023-03-10",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <DashboardOverviewHeader companyData={companyData} />

      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <Card className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Total Jobs
              </CardTitle>
              <Briefcase className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {companyData.stats.totalJobs}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                +2 from last month
              </p>
              <Link href="/employer/jobs">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-medium"
                >
                  Manage jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Active Jobs
              </CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {companyData.stats.activeJobs}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Currently hiring
              </p>
              <Link href="/employer/new-job-post">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-medium"
                >
                  Post new job
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Applications
              </CardTitle>
              <Eye className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {companyData.stats.totalApplications}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                +12 this week
              </p>
              <Link href="/employer/applications">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-medium"
                >
                  View applications
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Employees
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {companyData.stats.totalEmployees}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                +5 this quarter
              </p>
              <Link href="/employer/employees">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-medium"
                >
                  View employees
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border transition-shadow">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Shortcuts to common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/employer/post-job" className="w-full sm:w-auto">
              <Button className="w-full rounded-full font-bold shadow-sm sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </Link>
            <Link href="/employer/applications" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-full font-bold sm:w-auto"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Browse Candidates
              </Button>
            </Link>
            <Link href="/employer/company-profile" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-full font-bold sm:w-auto"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Edit Company Profile
              </Button>
            </Link>
            <Link href="/employer/analytics" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-full font-bold sm:w-auto"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Recent Job Postings
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Latest job openings and their status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="hover:bg-muted/50 flex flex-col justify-between gap-3 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center sm:gap-0"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="truncate text-sm font-bold sm:text-base">
                      {job.title}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {job.applications} applications • {job.posted}
                    </p>
                  </div>
                  <Badge
                    variant={job.status === "Active" ? "default" : "secondary"}
                    className="self-start rounded-full px-3 py-1 text-xs font-bold sm:self-center"
                  >
                    {job.status}
                  </Badge>
                </div>
              ))}
              <Link href="/employer/jobs">
                <Button
                  variant="outline"
                  className="w-full rounded-full font-bold"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View All Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Recent Employees
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Newest team members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="hover:bg-muted/50 flex items-center gap-4 rounded-xl border p-4 transition-colors"
                >
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage
                      src={employee.avatar || "/placeholder.svg"}
                      alt={employee.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="truncate text-sm font-bold sm:text-base">
                      {employee.name}
                    </p>
                    <p className="text-muted-foreground truncate text-xs sm:text-sm">
                      {employee.role}
                    </p>
                  </div>
                  <p className="text-muted-foreground hidden shrink-0 text-xs sm:block">
                    {new Date(employee.joined).toLocaleDateString()}
                  </p>
                </div>
              ))}
              <Link href="/employer/employees">
                <Button
                  variant="outline"
                  className="w-full rounded-full font-bold"
                >
                  <Users className="mr-2 h-4 w-4" />
                  View All Employees
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardView;
