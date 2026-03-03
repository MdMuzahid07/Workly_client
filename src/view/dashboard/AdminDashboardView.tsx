"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Activity,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  CreditCard,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import AdminDashboardHeader from "../../components/dashboard/dashboard-nav/header/AdminDashboardHeader";

const AdminDashboardView = () => {
  // Mock data for Admin Dashboard
  const stats = [
    {
      title: "Total Users",
      value: "14,582",
      change: "+12.5% from last month",
      icon: Users,
      trend: "up",
    },
    {
      title: "Active Jobs",
      value: "2,845",
      change: "+8.2% from last month",
      icon: Briefcase,
      trend: "up",
    },
    {
      title: "Pending Approvals",
      value: "42",
      change: "-5 yesterday",
      icon: CheckCircle2,
      trend: "down",
    },
    {
      title: "Global Revenue",
      value: "$52,145",
      change: "+1.2% from last month",
      icon: CreditCard,
      trend: "up",
    },
  ];

  const recentApprovals = [
    {
      id: 1,
      name: "Senior React Developer",
      company: "Google",
      status: "Pending",
      posted: "1 hour ago",
    },
    {
      id: 2,
      name: "Product Designer",
      company: "Stripe",
      status: "Pending",
      posted: "3 hours ago",
    },
    {
      id: 3,
      name: "Full Stack Engineer",
      company: "Supabase",
      status: "Approved",
      posted: "5 hours ago",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Job Seeker",
      email: "alex@example.com",
      status: "New",
      joined: "2 mins ago",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Employer",
      email: "sarah@techcorp.com",
      status: "Verified",
      joined: "15 mins ago",
    },
    {
      id: 3,
      name: "Michael Ross",
      role: "Employer",
      email: "michael@law.com",
      status: "New",
      joined: "1 hour ago",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <AdminDashboardHeader />

      <div className="space-y-6 px-4 pb-8 sm:px-6 sm:pt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="group overflow-hidden rounded-xl border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <span
                    className={`text-xs font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-amber-500"}`}
                  >
                    {stat.change.split(" ")[0]}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {stat.change.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions & Activity Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Quick Actions */}
          <Card className="rounded-xl border xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Control Panel</CardTitle>
              <CardDescription>
                Direct access to administrative tools
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              {[
                {
                  icon: Users,
                  label: "Users List",
                  href: "/admin/users/job-seekers",
                  color: "text-blue-500 bg-blue-500/10",
                },
                {
                  icon: ShieldCheck,
                  label: "Verifications",
                  href: "/admin/users/employers",
                  color: "text-emerald-500 bg-emerald-500/10",
                },
                {
                  icon: Activity,
                  label: "System Logs",
                  href: "/admin/settings",
                  color: "text-amber-500 bg-amber-500/10",
                },
                {
                  icon: FileText,
                  label: "Job Moderation",
                  href: "/admin/jobs/pending",
                  color: "text-purple-500 bg-purple-500/10",
                },
              ].map((action, idx) => (
                <Link key={idx} href={action.href}>
                  <Button
                    variant="outline"
                    className="hover:border-primary/50 hover:bg-primary/5 w-full justify-between rounded-xl py-6 font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg p-2 ${action.color}`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      {action.label}
                    </div>
                    <ArrowUpRight className="text-muted-foreground h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Activity / Tables */}
          <div className="grid grid-cols-1 gap-6 xl:col-span-2">
            <Card className="rounded-xl border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Job Moderation Queue
                  </CardTitle>
                  <CardDescription>
                    Latest postings waiting for review
                  </CardDescription>
                </div>
                <Link href="/admin/jobs/pending">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary font-bold"
                  >
                    View Queue
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentApprovals.map((job) => (
                  <div
                    key={job.id}
                    className="hover:bg-muted/50 flex items-center justify-between rounded-xl border p-4 transition-colors"
                  >
                    <div className="flex items-center gap-4 text-sm">
                      <div className="bg-primary/10 rounded-full p-2">
                        <Briefcase className="text-primary h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold">{job.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {job.company} • {job.posted}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={job.status === "Pending" ? "outline" : "default"}
                      className={
                        job.status === "Pending"
                          ? "border-amber-500 bg-amber-500/5 text-amber-500"
                          : "bg-emerald-500 text-white"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-xl border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Recent User Registration
                  </CardTitle>
                  <CardDescription>
                    New accounts on the platform
                  </CardDescription>
                </div>
                <Link href="/admin/users/job-seekers">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary font-bold"
                  >
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="hover:bg-muted/50 flex items-center justify-between rounded-xl border p-4 transition-colors"
                  >
                    <div className="flex items-center gap-4 text-sm">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {user.email} • {user.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">{user.joined}</p>
                      <Badge className="bg-primary/10 text-primary mt-1 border-none text-[10px]">
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
