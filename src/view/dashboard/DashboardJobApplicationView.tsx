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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Eye,
  FileText,
  MoreVertical,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import ApplicationFiltersAndSearch from "../../components/dashboard/applications/ApplicationFiltersAndSearch";
import ApplicationStatusCards from "../../components/dashboard/applications/ApplicationStatusCard";
import DashboardApplicationsHeader from "../../components/dashboard/dashboard-nav/header/DashboardJobApplicationsHeader";

// fake data
const mockApplications = [
  {
    id: "1",
    applicantName: "John Doe",
    applicantEmail: "john.doe@email.com",
    applicantAvatar: "/placeholder.svg?height=40&width=40",
    jobTitle: "Senior Frontend Developer",
    jobLocation: "San Francisco, CA",
    appliedDate: "2024-01-15",
    status: "submitted",
  },
  {
    id: "2",
    applicantName: "Jane Smith",
    applicantEmail: "jane.smith@email.com",
    jobTitle: "Backend Engineer",
    jobLocation: "Remote",
    appliedDate: "2024-01-14",
    status: "reviewing",
  },
  {
    id: "3",
    applicantName: "Mike Johnson",
    applicantEmail: "mike.j@email.com",
    jobTitle: "Product Manager",
    jobLocation: "New York, NY",
    appliedDate: "2024-01-12",
    status: "shortlisted",
  },
  {
    id: "4",
    applicantName: "Sarah Wilson",
    applicantEmail: "sarah.w@email.com",
    applicantAvatar: "/placeholder.svg?height=40&width=40",
    jobTitle: "UX Designer",
    jobLocation: "Austin, TX",
    appliedDate: "2024-01-10",
    status: "interviewed",
  },
  {
    id: "5",
    applicantName: "Alex Chen",
    applicantEmail: "alex.chen@email.com",
    jobTitle: "Senior Frontend Developer",
    jobLocation: "San Francisco, CA",
    appliedDate: "2024-01-08",
    status: "rejected",
  },
];

const DashboardJobApplicationView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedJob("all");
    setSelectedStatus("all");
  };

  const getApplicationsByStatus = (status: string) => {
    if (status === "all") return mockApplications;
    return mockApplications.filter((app) => app.status === status);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      submitted: "bg-chart-1/10 text-chart-1 border-chart-1/20",
      reviewing: "bg-chart-2/10 text-chart-2 border-chart-2/20",
      shortlisted: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      interviewed: "bg-chart-5/10 text-chart-5 border-chart-5/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
      offered: "bg-chart-3/10 text-chart-3 border-chart-3/20",
      accepted: "bg-primary/10 text-primary border-primary/20",
    };
    return colors[status.toLowerCase()] || "bg-muted text-muted-foreground";
  };

  const filteredApplications = getApplicationsByStatus(activeTab);

  return (
    <div className="mt-16 min-h-screen">
      <DashboardApplicationsHeader />

      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        <ApplicationStatusCards
          totalApplications={156}
          newThisWeek={12}
          inReview={23}
          rejected={8}
        />

        {/* Filters and Search */}
        <ApplicationFiltersAndSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedJob={selectedJob}
          onJobChange={setSelectedJob}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onClearFilters={handleClearFilters}
        />

        <div className="rounded-2xl border px-4 py-6 md:px-6 md:py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-card h-10 w-full border p-0">
              <TabsTrigger className="py-3" value="all">
                All ({mockApplications.length})
              </TabsTrigger>
              <TabsTrigger className="py-3" value="submitted">
                Submitted ({getApplicationsByStatus("submitted").length})
              </TabsTrigger>
              <TabsTrigger className="py-3" value="reviewing">
                Reviewing ({getApplicationsByStatus("reviewing").length})
              </TabsTrigger>
              <TabsTrigger className="py-3" value="shortlisted">
                Shortlisted ({getApplicationsByStatus("shortlisted").length})
              </TabsTrigger>
              <TabsTrigger className="py-3" value="interviewed">
                Interviewed ({getApplicationsByStatus("interviewed").length})
              </TabsTrigger>
              <TabsTrigger className="py-3" value="rejected">
                Rejected ({getApplicationsByStatus("rejected").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Application List
                  </CardTitle>
                  <CardDescription>
                    {filteredApplications.length} applications found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b">
                        <tr>
                          <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                            Applicant
                          </th>
                          <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                            Job Title
                          </th>
                          <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                            Location
                          </th>
                          <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                            Applied Date
                          </th>
                          <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                            Status
                          </th>
                          <th className="text-muted-foreground px-4 py-3 text-right text-xs font-medium tracking-wider uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredApplications.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-12 text-center">
                              <div className="flex flex-col items-center gap-2">
                                <FileText className="text-muted-foreground/50 h-12 w-12" />
                                <p className="text-muted-foreground text-sm">
                                  No applications found
                                </p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredApplications.map((application) => {
                            const initials = application.applicantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase();

                            return (
                              <tr
                                key={application.id}
                                className="hover:bg-muted/50"
                              >
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage
                                        src={
                                          application.applicantAvatar ||
                                          "/placeholder.svg" ||
                                          "/placeholder.svg"
                                        }
                                      />
                                      <AvatarFallback>
                                        {initials}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">
                                        {application.applicantName}
                                      </p>
                                      <p className="text-muted-foreground text-sm">
                                        {application.applicantEmail}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4">
                                  <p className="font-medium">
                                    {application.jobTitle}
                                  </p>
                                </td>
                                <td className="px-4 py-4">
                                  <p className="text-sm">
                                    {application.jobLocation}
                                  </p>
                                </td>
                                <td className="px-4 py-4">
                                  <p className="text-sm">
                                    {application.appliedDate}
                                  </p>
                                </td>
                                <td className="px-4 py-4">
                                  <Badge
                                    variant="outline"
                                    className={getStatusColor(
                                      application.status,
                                    )}
                                  >
                                    {application.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-4 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Move to Next Stage
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-destructive">
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject Application
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardJobApplicationView;
