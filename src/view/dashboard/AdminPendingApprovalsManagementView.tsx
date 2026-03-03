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
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  MoreVertical,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import DashboardAdminPendingApprovalsHeader from "../../components/dashboard/dashboard-nav/header/DashboardAdminPendingApprovalsHeader";

const AdminPendingApprovalsManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Mock data for pending jobs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingJobs, setPendingJobs] = useState([
    {
      id: "1",
      title: "Senior Devops Engineer",
      company: "CloudScale Inc",
      logo: "",
      location: "San Francisco, CA",
      type: "FULL_TIME",
      category: "Engineering",
      submittedAt: "2 hours ago",
      postedBy: "Sarah Johnson",
      priority: "High",
      status: "PENDING",
    },
    {
      id: "2",
      title: "UI/UX Designer",
      company: "PixelPerfect",
      logo: "",
      location: "Remote",
      type: "CONTRACT",
      category: "Design",
      submittedAt: "5 hours ago",
      postedBy: "David Chen",
      priority: "Normal",
      status: "PENDING",
    },
    {
      id: "3",
      title: "Content Strategist",
      company: "MediaHub",
      logo: "",
      location: "New York, NY",
      type: "FREELANCE",
      category: "Marketing",
      submittedAt: "1 day ago",
      postedBy: "Emma Wright",
      priority: "Medium",
      status: "PENDING",
    },
    {
      id: "4",
      title: "Backend Core Developer",
      company: "NeoGenesis",
      logo: "",
      location: "Austin, TX",
      type: "FULL_TIME",
      category: "Engineering",
      submittedAt: "3 days ago",
      postedBy: "Mark Foster",
      priority: "Emergency",
      status: "PENDING",
    },
  ]);

  const stats = [
    {
      label: "Total Pending",
      value: "5",
      icon: Clock,
      color: "text-amber-500",
    },
    {
      label: "Critical Priority",
      value: "1",
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      label: "Average Wait",
      value: "14h",
      icon: ShieldCheck,
      color: "text-emerald-500",
    },
    {
      label: "Reviewed (Today)",
      value: "18",
      icon: CheckCircle2,
      color: "text-blue-500",
    },
  ];

  const filteredJobs = pendingJobs.filter(
    (job) =>
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedType || job.type === selectedType),
  );

  const typeOptions = [
    { label: "Full Time", value: "FULL_TIME" },
    { label: "Part Time", value: "PART_TIME" },
    { label: "Contract", value: "CONTRACT" },
    { label: "Freelance", value: "FREELANCE" },
  ];

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminPendingApprovalsHeader />

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
              placeholder="Search by title or company..."
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

        {/* Moderation Table */}
        <Card className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[350px]">Job Details</TableHead>
                  <TableHead>Category/Type</TableHead>
                  <TableHead>Submission</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
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
                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Building2 className="h-3 w-3" />
                            <span className="truncate">{job.company}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">{job.category}</p>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-none text-[10px] font-bold"
                        >
                          {job.type.replace("_", " ")}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-muted-foreground flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3" />
                          <span>Submitted {job.submittedAt}</span>
                        </div>
                        <p className="text-muted-foreground text-[10px] font-medium">
                          By {job.postedBy}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`font-bold ${
                          job.priority === "Emergency" ||
                          job.priority === "High"
                            ? "bg-destructive/10 text-destructive hover:bg-destructive/10 border-destructive px-1"
                            : "border-amber-200 bg-amber-500/10 text-amber-600 hover:bg-amber-500/10"
                        }`}
                        variant="outline"
                      >
                        {job.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8 p-0"
                          title="Quick Approve"
                        >
                          <ShieldCheck className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                          title="Reject Submission"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuLabel>
                              Review Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              Detailed Review
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Poster Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer font-bold text-emerald-600">
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Approve & Publish
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive cursor-pointer font-bold">
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject & Defer
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

          {filteredJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                <ShieldCheck className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">Queue is empty</h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs">
                Great job! All submitted postings have been reviewed.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminPendingApprovalsManagementView;
