/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AdminDashboardHeader from '@/components/dashboard/dashboard-nav/header/AdminDashboardHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useGetDashboardOverviewStatsQuery,
  useGetModerationQueueQuery,
  useGetRecentUsersQuery,
} from '@/redux/feature/admin/adminApi';
import AdminDashboardSkeleton from '@/skeleton/dashboard/admin/AdminDashboardSkeleton';
import { formatDistanceToNow } from 'date-fns';
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  CreditCard,
  FileText,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

const AdminDashboardView = () => {
  const { data: statsData, isLoading: isStatsLoading } = useGetDashboardOverviewStatsQuery();
  const { data: recentUsersData, isLoading: isUsersLoading } = useGetRecentUsersQuery({ limit: 5 });
  const { data: moderationQueueData, isLoading: isModerationLoading } = useGetModerationQueueQuery({
    limit: 5,
  });

  const stats = useMemo(() => {
    // Robust data access: check for both s.data and s itself
    const s = statsData?.data || statsData;

    return [
      {
        title: 'Total Users',
        value: s?.totalUsers?.value?.toLocaleString() ?? '0',
        change: s?.totalUsers?.change ?? '—',
        icon: Users,
        trend: s?.totalUsers?.trend ?? 'neutral',
      },
      {
        title: 'Active Jobs',
        value: s?.activeJobs?.value?.toLocaleString() ?? '0',
        change: s?.activeJobs?.change ?? '—',
        icon: Briefcase,
        trend: s?.activeJobs?.trend ?? 'neutral',
      },
      {
        title: 'Pending Approvals',
        value: s?.pendingApprovals?.value?.toLocaleString() ?? '0',
        change: s?.pendingApprovals?.change ?? '—',
        icon: CheckCircle2,
        trend: 'neutral',
      },
      {
        title: 'Global Revenue',
        value: `$${(s?.globalRevenue?.value || 0).toLocaleString()}`,
        change: s?.globalRevenue?.change ?? '—',
        icon: CreditCard,
        trend: s?.globalRevenue?.trend ?? 'up',
      },
    ];
  }, [statsData]);

  if (isStatsLoading || isUsersLoading || isModerationLoading) {
    return <AdminDashboardSkeleton />;
  }

  const moderationQueue = moderationQueueData?.data || [];
  const recentUsers = recentUsersData?.data || [];

  return (
    <div className="min-h-screen pt-16">
      <AdminDashboardHeader />

      <div className="space-y-6 px-4 pb-8 sm:px-6 sm:pt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="h-4 w-4" />}
              trend={{
                value: stat.change,
                type: stat.trend as 'up' | 'down' | 'neutral',
              }}
            />
          ))}
        </div>

        {/* Quick Actions & Activity Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Quick Actions */}
          <Card className="rounded-xl border xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Control Panel</CardTitle>
              <CardDescription>Direct access to administrative tools</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              {[
                {
                  icon: Users,
                  label: 'Users List',
                  href: '/admin/users/job-seekers',
                  color: 'text-blue-500 bg-blue-500/10',
                },
                {
                  icon: ShieldCheck,
                  label: 'Verifications',
                  href: '/admin/users/employers',
                  color: 'text-emerald-500 bg-emerald-500/10',
                },
                {
                  icon: Activity,
                  label: 'System Settings',
                  href: '/admin/settings',
                  color: 'text-amber-500 bg-amber-500/10',
                },
                {
                  icon: FileText,
                  label: 'Job Moderation',
                  href: '/admin/jobs/pending',
                  color: 'text-purple-500 bg-purple-500/10',
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
                  <CardTitle className="text-lg">Job Moderation Queue</CardTitle>
                  <CardDescription>Latest postings waiting for review</CardDescription>
                </div>
                <Link href="/admin/jobs/pending">
                  <Button variant="ghost" size="sm" className="text-primary font-bold">
                    View Queue
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {moderationQueue.length === 0 ? (
                  <div className="text-muted-foreground py-8 text-center">
                    No jobs in moderation queue
                  </div>
                ) : (
                  moderationQueue.map((job: any) => (
                    <div
                      key={job.id}
                      className="hover:bg-muted/50 flex items-center justify-between rounded-xl border p-4 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-sm">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Briefcase className="text-primary h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-bold">{job.title}</p>
                          <p className="text-muted-foreground text-xs">
                            {job.company} • {formatDistanceToNow(new Date(job.createdAt))} ago
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={job.status === 'PENDING' ? 'outline' : 'default'}
                        className={
                          job.status === 'PENDING'
                            ? 'border-amber-500 bg-amber-500/5 text-amber-500'
                            : 'bg-emerald-500 text-white'
                        }
                      >
                        {job.status}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="rounded-xl border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent User Registration</CardTitle>
                  <CardDescription>New accounts on the platform</CardDescription>
                </div>
                <Link href="/admin/users/job-seekers">
                  <Button variant="ghost" size="sm" className="text-primary font-bold">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUsers.length === 0 ? (
                  <div className="text-muted-foreground py-8 text-center">No recent users</div>
                ) : (
                  recentUsers.map((user: any) => (
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
                            {user.email} • {user.role.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium">
                          {formatDistanceToNow(new Date(user.joinedAt))} ago
                        </p>
                        <Badge className="bg-primary/10 text-primary mt-1 border-none text-[10px]">
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
