/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetActiveJobsAdminQuery,
  useGetActiveJobsStatsQuery,
} from "@/redux/feature/admin/adminApi";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  Briefcase,
  Building2,
  ChevronDown,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  Globe,
  MapPin,
  MoreVertical,
  Search,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import DashboardAdminActiveJobsHeader from "../../../../../components/dashboard/dashboard-nav/header/DashboardAdminActiveJobsHeader";

const AdminActiveJobsManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);

  const {
    data: statsData,
    isLoading: isStatsLoading,
    error: statsError,
  } = useGetActiveJobsStatsQuery();
  const {
    data: jobsData,
    isLoading: isJobsLoading,
    error: jobsError,
  } = useGetActiveJobsAdminQuery({
    page,
    q: searchTerm,
    type: selectedType,
  });

  const jobs = jobsData?.data || [];
  const statsValues = statsData?.data;

  const stats = [
    {
      label: "Total Active Jobs",
      value: statsValues?.totalActiveJobs?.toLocaleString() || "0",
      icon: Briefcase,
      color: "text-primary",
    },
    {
      label: "New Today",
      value: statsValues?.newToday?.toLocaleString() || "0",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      label: "Total Applications",
      value: statsValues?.totalApplications?.toLocaleString() || "0",
      icon: Globe,
      color: "text-blue-500",
    },
    {
      label: "Expiring Soon",
      value: statsValues?.expiringSoon?.toLocaleString() || "0",
      icon: Clock,
      color: "text-amber-500",
    },
  ];

  const typeOptions = [
    { label: "Full Time", value: "FULL_TIME" },
    { label: "Part Time", value: "PART_TIME" },
    { label: "Contract", value: "CONTRACT" },
    { label: "Freelance", value: "FREELANCE" },
    { label: "Internship", value: "INTERNSHIP" },
    { label: "Remote", value: "REMOTE" },
  ];

  if (statsError || jobsError) {
    const error = (statsError || jobsError) as any;
    const errorMessage =
      error?.data?.message || error?.message || "An unexpected error occurred";
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="text-destructive mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-bold">Failed to load data</h2>
          <p className="text-muted-foreground mt-2">{errorMessage}</p>
          <Button onClick={() => window.location.reload()} className="mt-6">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminActiveJobsHeader />

      <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-card rounded-xl border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                {isStatsLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {stat.value}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-muted/50 ring-offset-background focus-visible:ring-primary rounded-full border-none pl-10 focus-visible:ring-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary/20 flex items-center gap-2 rounded-full font-bold"
                >
                  <Filter className="h-4 w-4" />
                  {selectedType
                    ? typeOptions.find((t) => t.value === selectedType)?.label
                    : "Job Type"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setSelectedType(null)}
                  className="cursor-pointer"
                >
                  All Types
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {typeOptions.map((type) => (
                  <DropdownMenuItem
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className="cursor-pointer"
                  >
                    {type.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchTerm || selectedType) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType(null);
                }}
                className="text-muted-foreground hover:text-primary rounded-full font-bold"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Jobs Table */}
        <Card className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[350px]">Job Listing</TableHead>
                  <TableHead>Category/Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Analytics</TableHead>
                  <TableHead>Timing</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isJobsLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        {Array.from({ length: 6 }).map((_, j) => (
                          <TableCell key={j}>
                            <Skeleton className="h-6 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : jobs.map((job) => (
                      <TableRow
                        key={job.id}
                        className="group hover:bg-muted/40 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="ring-primary/5 group-hover:ring-primary/20 h-10 w-10 ring-2 transition-all">
                              <AvatarImage src={job.logo} />
                              <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                {job.company.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate font-bold">{job.title}</p>
                              <div className="text-muted-foreground flex items-center gap-1 text-xs outline-none">
                                <Building2 className="h-3 w-3" />
                                <span className="truncate">{job.company}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-xs font-medium">
                              {job.category}
                            </p>
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary border-none text-[10px] font-bold"
                            >
                              {job.type.replace("_", " ")}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <p className="text-xs font-bold">{job.views}</p>
                              <p className="text-muted-foreground text-[10px]">
                                Views
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-primary text-xs font-bold">
                                {job.applications}
                              </p>
                              <p className="text-muted-foreground text-[10px]">
                                Applies
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-muted-foreground flex items-center gap-1 text-xs">
                              <Clock className="h-3 w-3" />
                              <span>
                                Posted{" "}
                                {formatDistanceToNow(new Date(job.posted), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                            {job.expires && (
                              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                                <AlertTriangle className="h-3 w-3" />
                                <span>
                                  {formatDistanceToNow(new Date(job.expires), {
                                    addSuffix: true,
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52">
                              <DropdownMenuLabel>Management</DropdownMenuLabel>
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4" />
                                Preview Listing
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Applications
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Performance Report
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer text-amber-600">
                                <Clock className="mr-2 h-4 w-4" />
                                Extend Expiry
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Unpublish Job
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>

          {!isJobsLoading && jobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                <AlertTriangle className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">No job listings found</h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs">
                We couldn{`'t`} find any job posts matching your current
                filters.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminActiveJobsManagementView;
