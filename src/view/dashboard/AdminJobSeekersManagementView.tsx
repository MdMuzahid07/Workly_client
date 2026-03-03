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
  ChevronDown,
  ExternalLink,
  FileText,
  Filter,
  Github,
  Globe,
  Linkedin,
  MapPin,
  MoreVertical,
  Search,
  Trash2,
  TrendingUp,
  UserX,
  Users,
} from "lucide-react";
import { useState } from "react";
import DashboardAdminJobSeekersHeader from "../../components/dashboard/dashboard-nav/header/DashboardAdminJobSeekersHeader";

const AdminJobSeekersManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Mock data for job seekers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [jobSeekers, setJobSeekers] = useState([
    {
      id: "1",
      name: "Alex Rivera",
      avatar: "",
      email: "alex.rivera@example.com",
      location: "San Francisco, CA",
      status: "Looking",
      experience: "Senior",
      primarySkill: "React",
      joinedDate: "2024-01-20",
      socials: { github: "#", linkedin: "#", portfolio: "#" },
    },
    {
      id: "2",
      name: "Sarah Kim",
      avatar: "",
      email: "sarah.kim@dev.io",
      location: "Remote",
      status: "Hired",
      experience: "Intermediate",
      primarySkill: "Node.js",
      joinedDate: "2024-02-05",
      socials: { github: "#", linkedin: "#", portfolio: "#" },
    },
    {
      id: "3",
      name: "Michael Ross",
      avatar: "",
      email: "m.ross@corporate.com",
      location: "New York, NY",
      status: "Active",
      experience: "Cloud Architect",
      primarySkill: "AWS",
      joinedDate: "2024-02-25",
      socials: { github: "#", linkedin: "#" },
    },
    {
      id: "4",
      name: "Chloe Dubois",
      avatar: "",
      email: "chloe.d@design.fr",
      location: "Paris, FR",
      status: "Looking",
      experience: "Junior",
      primarySkill: "Figma",
      joinedDate: "2024-03-01",
      socials: { portfolio: "#", linkedin: "#" },
    },
  ]);

  const stats = [
    {
      label: "Total Job Seekers",
      value: "12,482",
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Active Resumes",
      value: "8,245",
      icon: FileText,
      color: "text-emerald-500",
    },
    {
      label: "Portfolios Shared",
      value: "3,150",
      icon: Globe,
      color: "text-purple-500",
    },
    {
      label: "High Match Rate",
      value: "12%",
      icon: TrendingUp,
      color: "text-amber-500",
    },
  ];

  const filteredJobSeekers = jobSeekers.filter(
    (js) =>
      (js.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        js.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedStatus || js.status === selectedStatus),
  );

  const statusOptions = ["Hired", "Looking", "Active"];

  return (
    <div className="min-h-screen pt-16">
      <DashboardAdminJobSeekersHeader />

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
              placeholder="Search by candidate name or email..."
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

        {/* Job Seekers Table */}
        <Card className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Candidate</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Experience/Skill</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Socials</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobSeekers.map((js) => (
                  <TableRow
                    key={js.id}
                    className="group hover:bg-muted/40 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="ring-primary/5 group-hover:ring-primary/20 h-10 w-10 ring-2 transition-all">
                          <AvatarImage src={js.avatar} />
                          <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                            {js.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-bold">{js.name}</p>
                          <p className="text-muted-foreground truncate text-xs">
                            {js.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <MapPin className="text-muted-foreground h-3 w-3" />
                        {js.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-semibold">{js.experience}</p>
                        <Badge
                          variant="outline"
                          className="border-primary/20 bg-primary/5 text-primary pointer-events-none mt-1 h-5 text-[10px]"
                        >
                          {js.primarySkill}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`font-bold ${
                          js.status === "Hired"
                            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                            : js.status === "Looking"
                              ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                              : "bg-muted text-muted-foreground"
                        }`}
                        variant="secondary"
                      >
                        {js.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {js.socials.github && (
                          <a
                            href={js.socials.github}
                            className="text-muted-foreground transition-colors hover:text-black"
                            title="GitHub"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {js.socials.linkedin && (
                          <a
                            href={js.socials.linkedin}
                            className="text-muted-foreground transition-colors hover:text-blue-600"
                            title="LinkedIn"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {js.socials.portfolio && (
                          <a
                            href={js.socials.portfolio}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title="Portfolio"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
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
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Full Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <FileText className="mr-2 h-4 w-4" />
                            Download Resume
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Search Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-amber-600">
                            <UserX className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Profile
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredJobSeekers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                <AlertTriangle className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">No candidates found</h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs">
                Try searching for a different name, skill, or email address.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminJobSeekersManagementView;
