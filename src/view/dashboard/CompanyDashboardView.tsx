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
import { Briefcase, Eye, TrendingUp, UserPlus, Users } from "lucide-react";
import DashboardOverviewHeader from "../../components/dashboard/dashboard-nav/header/DashboardOverviewHeader";

const CompanyDashboardView = () => {
  // fake data
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
    <div className="min-h-screen">
      <DashboardOverviewHeader companyData={companyData} />
      <div className="container mx-auto space-y-6 px-4 sm:px-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Total Jobs
              </CardTitle>
              <Briefcase className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {companyData.stats.totalJobs}
              </div>
              <p className="text-muted-foreground text-xs">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Active Jobs
              </CardTitle>
              <TrendingUp className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {companyData.stats.activeJobs}
              </div>
              <p className="text-muted-foreground text-xs">Currently hiring</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Applications
              </CardTitle>
              <Eye className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {companyData.stats.totalApplications}
              </div>
              <p className="text-muted-foreground text-xs">+12 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Employees
              </CardTitle>
              <Users className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {companyData.stats.totalEmployees}
              </div>
              <p className="text-muted-foreground text-xs">+5 this quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Recent Job Postings
              </CardTitle>
              <CardDescription>
                Latest job openings and their status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col justify-between space-y-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:space-y-0"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="truncate text-sm font-medium sm:text-base">
                      {job.title}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {job.applications} applications • {job.posted}
                    </p>
                  </div>
                  <Badge
                    variant={job.status === "Active" ? "default" : "secondary"}
                    className="self-start sm:self-center"
                  >
                    {job.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Jobs
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Recent Employees
              </CardTitle>
              <CardDescription>Newest team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center space-x-3 rounded-lg border p-3"
                >
                  <Avatar className="h-8 w-8 flex-shrink-0 sm:h-10 sm:w-10">
                    <AvatarImage
                      src={employee.avatar || "/placeholder.svg"}
                      alt={employee.name}
                    />
                    <AvatarFallback className="text-xs">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="truncate text-sm font-medium sm:text-base">
                      {employee.name}
                    </p>
                    <p className="text-muted-foreground truncate text-xs sm:text-sm">
                      {employee.role}
                    </p>
                  </div>
                  <p className="text-muted-foreground hidden text-xs sm:block">
                    {new Date(employee.joined).toLocaleDateString()}
                  </p>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Job Management
                  </CardTitle>
                  <CardDescription>
                    Manage your job postings and applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="py-8 text-center">
                    <Briefcase className="text-muted-foreground mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
                    <h3 className="text-foreground mb-2 text-base font-medium sm:text-lg">
                      Job Management
                    </h3>
                    <p className="text-muted-foreground mb-4 px-4 text-sm">
                      Create and manage your job postings from here
                    </p>
                    <Button className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employees">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Employee Management
                  </CardTitle>
                  <CardDescription>
                    Manage your team members and their roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="py-8 text-center">
                    <Users className="text-muted-foreground mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
                    <h3 className="text-foreground mb-2 text-base font-medium sm:text-lg">
                      Employee Management
                    </h3>
                    <p className="text-muted-foreground mb-4 px-4 text-sm">
                      Add and manage your team members
                    </p>
                    <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                      <Button asChild className="w-full sm:w-auto">
                        <a href="/dashboard/company/employees">
                          <Users className="mr-2 h-4 w-4" />
                          Manage Employees
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent sm:w-auto"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Employee
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Company Profile
                  </CardTitle>
                  <CardDescription>
                    Update your company information and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="py-8 text-center">
                    <Building2 className="text-muted-foreground mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
                    <h3 className="text-foreground mb-2 text-base font-medium sm:text-lg">
                      Company Profile
                    </h3>
                    <p className="text-muted-foreground mb-4 px-4 text-sm">
                      Manage your company profile and public information
                    </p>
                    <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                      <Button asChild className="w-full sm:w-auto">
                        <a href="/dashboard/company/profile">
                          <Edit3 className="mr-2 h-4 w-4" />
                          Edit Profile
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full bg-transparent sm:w-auto"
                      >
                        <a href="/dashboard/company/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
      </div>
    </div>
  );
};

export default CompanyDashboardView;
