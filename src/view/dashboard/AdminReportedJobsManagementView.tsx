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
  AlertCircle,
  AlertTriangle,
  Building2,
  CheckCircle,
  ChevronDown,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  Flag,
  MoreVertical,
  Search,
  ShieldOff,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import DashboardAdminReportedJobsHeader from "../../components/dashboard/dashboard-nav/header/DashboardAdminReportedJobsHeader";

const AdminReportedJobsManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  // Mock data for reported jobs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reportedJobs, setReportedJobs] = useState([
    {
      id: "1",
      title: "Remote PHP Developer",
      company: "Unknown Ventures",
      logo: "",
      reporter: "John Doe",
      reason: "Potential Scam",
      severity: "CRITICAL",
      reportedAt: "30 mins ago",
      comment: "Asking for money during the interview process.",
      status: "OPEN",
    },
    {
      id: "2",
      title: "Senior Product Lead",
      company: "Generic Tech",
      logo: "",
      reporter: "Alice Smith",
      reason: "Inaccurate Info",
      severity: "MEDIUM",
      reportedAt: "4 hours ago",
      comment: "The company doesn't actually exist at this address.",
      status: "OPEN",
    },
    {
      id: "3",
      title: "Data Entry Clerk",
      company: "QuickBucks",
      logo: "",
      reporter: "Bob Wilson",
      reason: "Spam",
      severity: "HIGH",
      reportedAt: "1 day ago",
      comment: "Too many duplicate postings for the same role.",
      status: "OPEN",
    },
    {
      id: "4",
      title: "Summer Intern",
      company: "Fresh Start",
      logo: "",
      reporter: "Sarah Parker",
      reason: "Offensive Content",
      severity: "LOW",
      reportedAt: "2 days ago",
      comment: "Description contains inappropriate language.",
      status: "OPEN",
    },
  ]);

  const stats = [
    {
      label: "Open Reports",
      value: "12",
      icon: Flag,
      color: "text-destructive",
    },
    {
      label: "Pending Review",
      value: "8",
      icon: Clock,
      color: "text-amber-500",
    },
    {
      label: "Resolved (Today)",
      value: "24",
      icon: CheckCircle,
      color: "text-emerald-500",
    },
    {
      label: "Critical Alerts",
      value: "3",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  const filteredReports = reportedJobs.filter(
    (report) =>
      (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedSeverity || report.severity === selectedSeverity),
  );

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
                    : "Severity"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setSelectedSeverity(null)}
                  className="cursor-pointer"
                >
                  All Severities
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
                  <TableHead>Severity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
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
                        <span>{report.reportedAt}</span>
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
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              View Full Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-primary cursor-pointer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Inspect Job Post
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Warn Employer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive cursor-pointer font-bold">
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Deactivate Job
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive cursor-pointer font-bold">
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

          {filteredReports.length === 0 && (
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
