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
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Filter,
  Mail,
  MoreVertical,
  Search,
  ShieldCheck,
  Trash2,
  UserX,
} from "lucide-react";
import { useState } from "react";
import DashboardAdminEmployersHeader from "../../components/dashboard/dashboard-nav/header/DashboardAdminEmployersHeader";

const AdminEmployersManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Mock data for employers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [employers, setEmployers] = useState([
    {
      id: "1",
      companyName: "TechFlow Inc.",
      logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
      industry: "Technology",
      ownerName: "Sarah Chen",
      ownerEmail: "sarah@techflow.com",
      status: "Verified",
      activeJobs: 12,
      joinedDate: "2024-01-15",
    },
    {
      id: "2",
      companyName: "Global Solutions",
      logo: "",
      industry: "Consulting",
      ownerName: "James Wilson",
      ownerEmail: "james@globalsolutions.com",
      status: "Pending",
      activeJobs: 5,
      joinedDate: "2024-02-10",
    },
    {
      id: "3",
      companyName: "Creative Minds",
      logo: "",
      industry: "Design",
      ownerName: "Elena Rodriguez",
      ownerEmail: "elena@creativeminds.io",
      status: "Verified",
      activeJobs: 8,
      joinedDate: "2024-02-28",
    },
    {
      id: "4",
      companyName: "HealthPlus",
      logo: "",
      industry: "Healthcare",
      ownerName: "Dr. Robert Smith",
      ownerEmail: "r.smith@healthplus.org",
      status: "Suspended",
      activeJobs: 0,
      joinedDate: "2023-11-20",
    },
  ]);

  const stats = [
    {
      label: "Total Employers",
      value: "324",
      icon: Building2,
      color: "text-blue-500",
    },
    {
      label: "Verified Companies",
      value: "286",
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      label: "Pending Verification",
      value: "18",
      icon: ShieldCheck,
      color: "text-amber-500",
    },
    {
      label: "Active Jobs",
      value: "1,245",
      icon: Briefcase,
      color: "text-purple-500",
    },
  ];

  const filteredEmployers = employers.filter(
    (emp) =>
      (emp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedStatus || emp.status === selectedStatus),
  );

  const statusOptions = ["Verified", "Pending", "Suspended"];

  return (
    <div className="min-h-screen pt-16">
      <DashboardAdminEmployersHeader />

      <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-card rounded-xl border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-xs font-medium tracking-wider uppercase sm:text-sm">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold sm:text-3xl">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by company name or owner email..."
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
                  {selectedStatus || "Status Filters"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setSelectedStatus(null)}
                  className="cursor-pointer"
                >
                  All Status
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className="cursor-pointer"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchTerm || selectedStatus) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatus(null);
                }}
                className="text-muted-foreground hover:text-primary rounded-full font-bold"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Employers Table */}
        <Card className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Company</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Active Jobs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployers.map((emp) => (
                  <TableRow
                    key={emp.id}
                    className="group hover:bg-muted/40 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="ring-primary/5 group-hover:ring-primary/20 h-10 w-10 ring-2 transition-all">
                          <AvatarImage src={emp.logo} />
                          <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                            {emp.companyName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-bold">
                            {emp.companyName}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {emp.industry}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{emp.ownerName}</p>
                        <p className="text-muted-foreground flex items-center gap-1 text-xs">
                          <Mail className="h-3 w-3" />
                          {emp.ownerEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary font-bold"
                      >
                        {emp.activeJobs} Jobs
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`font-bold ${
                          emp.status === "Verified"
                            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                            : emp.status === "Pending"
                              ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                              : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                        }`}
                        variant="secondary"
                      >
                        {emp.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm font-medium">
                      {new Date(emp.joinedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Briefcase className="mr-2 h-4 w-4" />
                            Manage Jobs
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {emp.status !== "Verified" && (
                            <DropdownMenuItem className="cursor-pointer text-emerald-600">
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Verify Account
                            </DropdownMenuItem>
                          )}
                          {emp.status !== "Suspended" ? (
                            <DropdownMenuItem className="cursor-pointer text-amber-600">
                              <UserX className="mr-2 h-4 w-4" />
                              Suspend Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer text-emerald-600">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Reactivate Account
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredEmployers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                <AlertTriangle className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">No employers found</h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs">
                We {`couldn't`} find any company matching your search criteria.
                Try a different term.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminEmployersManagementView;
