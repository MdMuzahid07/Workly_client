/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  Building2,
  CheckCircle,
  ChevronDown,
  Clock,
  ExternalLink,
  Filter,
  Flag,
  MoreVertical,
  Search,
  ShieldOff,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import DashboardAdminReportedJobsHeader from "../../../../../components/dashboard/dashboard-nav/header/DashboardAdminReportedJobsHeader";

import AdminJobsSkeleton from "@/skeleton/dashboard/admin/AdminJobsSkeleton";
import {
  useDeactivateJobMutation,
  useDeleteJobListingMutation,
  useGetJobReportsQuery,
  useGetJobReportStatsQuery,
  useUpdateJobReportStatusMutation,
} from "@/redux/feature/admin/adminApi";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const AdminReportedJobsManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  // API Hooks
  const { data: statsData, isLoading: isStatsLoading } =
    useGetJobReportStatsQuery();
  const { data: reportsData, isLoading: isReportsLoading } =
    useGetJobReportsQuery({
      page,
      limit: 10,
      q: searchTerm,
      severity: selectedSeverity,
    });
  const [updateStatus] = useUpdateJobReportStatusMutation();
  const [deactivateJob] = useDeactivateJobMutation();
  const [deleteJob] = useDeleteJobListingMutation();

  if (isStatsLoading || isReportsLoading) {
    return <AdminJobsSkeleton />;
  }

  const reports = reportsData?.data || [];
  const statsResponse = statsData?.data;

  const stats = [
    {
      label: "Open Reports",
      value: statsResponse?.openReports || 0,
      icon: Flag,
      color: "text-destructive",
    },
    {
      label: "Pending Review",
      value: statsResponse?.pendingReview || 0,
      icon: Clock,
      color: "text-amber-500",
    },
    {
      label: "Resolved (Today)",
      value: statsResponse?.resolvedToday || 0,
      icon: CheckCircle,
      color: "text-emerald-500",
    },
    {
      label: "Critical Alerts",
      value: statsResponse?.criticalAlerts || 0,
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  const severityOptions = [
    { label: "Critical", value: "CRITICAL" },
    { label: "High", value: "HIGH" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Low", value: "LOW" },
  ];

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-600/10 text-red-600 border-red-200";
      case "HIGH":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "MEDIUM":
        return "bg-amber-500/10 text-amber-600 border-amber-200";
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-200";
    }
  };

  const handleUpdateStatus = async (reportId: string, status: string) => {
    try {
      await updateStatus({ reportId, status }).unwrap();
      toast.success(`Report marked as ${status.toLowerCase()}`);
    } catch (error) {
      toast.error("Failed to update report status");
    }
  };

  const handleDeactivateJob = async (jobId: string, reportId: string) => {
    try {
      await deactivateJob(jobId).unwrap();
      await updateStatus({ reportId, status: "RESOLVED" }).unwrap();
      toast.success("Job deactivated and report resolved");
    } catch (error) {
      toast.error("Failed to deactivate job");
    }
  };

  const handleDeleteJob = async (jobId: string, reportId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this job listing? This action cannot be undone.",
      )
    )
      return;
    try {
      await deleteJob(jobId).unwrap();
      await updateStatus({ reportId, status: "RESOLVED" }).unwrap();
      toast.success("Job listing deleted and report resolved");
    } catch (error) {
      toast.error("Failed to delete job listing");
    }
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminReportedJobsHeader />

      <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">
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
                <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by job, company, or reason..."
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
                  {selectedSeverity
                    ? severityOptions.find((s) => s.value === selectedSeverity)
                        ?.label
                    : "Priority"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setSelectedSeverity(null)}
                  className="cursor-pointer"
                >
                  All Priorities
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {severityOptions.map((severity) => (
                  <DropdownMenuItem
                    key={severity.value}
                    onClick={() => setSelectedSeverity(severity.value)}
                    className="cursor-pointer"
                  >
                    {severity.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchTerm || selectedSeverity) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSeverity(null);
                }}
                className="text-muted-foreground hover:text-primary rounded-full font-bold"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Reports Table */}
        <Card className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Reported Listing</TableHead>
                  <TableHead>Reason & Details</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Timing</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report: any) => (
                  <TableRow
                    key={report.id}
                    className="group hover:bg-muted/40 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="ring-destructive/5 group-hover:ring-destructive/20 h-10 w-10 ring-2 transition-all">
                          <AvatarFallback className="bg-destructive/5 text-destructive text-xs font-bold">
                            {report.company.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-bold">{report.title}</p>
                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Building2 className="h-3 w-3" />
                            <span className="truncate">{report.company}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[250px] space-y-1">
                        <p className="text-xs font-bold">{report.reason}</p>
                        <p className="text-muted-foreground line-clamp-1 text-[10px]">
                          &quot;{report.comment}&quot;
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
                        <User className="h-3 w-3" />
                        {report.reporter}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-muted-foreground flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatDistanceToNow(new Date(report.reportedAt))} ago
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`font-bold ${getSeverityStyles(report.severity)}`}
                        variant="outline"
                      >
                        {report.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50"
                          title="Dismiss Report"
                          onClick={() =>
                            handleUpdateStatus(report.id, "DISMISSED")
                          }
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuLabel>Investigation</DropdownMenuLabel>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleUpdateStatus(report.id, "PENDING")
                              }
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-primary cursor-pointer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Inspect Job Post
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer font-bold text-emerald-600"
                              onClick={() =>
                                handleUpdateStatus(report.id, "RESOLVED")
                              }
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Resolve Report
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive cursor-pointer font-bold"
                              onClick={() =>
                                handleDeactivateJob(report.jobId, report.id)
                              }
                            >
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Deactivate Job
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive cursor-pointer font-bold"
                              onClick={() =>
                                handleDeleteJob(report.jobId, report.id)
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Listing
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {!isReportsLoading && reports.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                <CheckCircle className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">No reports found</h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs">
                Excellent! The reported content queue is currently clear.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminReportedJobsManagementView;
