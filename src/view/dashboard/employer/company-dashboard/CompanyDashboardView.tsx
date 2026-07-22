'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Eye, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import DashboardOverviewHeader from '../../../../components/dashboard/dashboard-nav/header/DashboardOverviewHeader';

const CompanyDashboardView = () => {
  // fake data
  const companyData = {
    name: 'TechFlow Inc.',
    logo: 'https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png',
    industry: 'Technology',
    location: 'San Francisco, CA',
    website: 'techflow.com',
    founded: '2018',
    employees: 250,
    description:
      'Leading software development company specializing in web applications and cloud solutions.',
    stats: {
      totalJobs: 12,
      activeJobs: 8,
      totalApplications: 156,
      totalTeamMembers: 250,
      profileViews: 1200,
    },
  };

  const recentJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      applications: 23,
      status: 'Active',
      posted: '2 days ago',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      applications: 18,
      status: 'Active',
      posted: '1 week ago',
    },
    {
      id: 3,
      title: 'Product Manager',
      applications: 31,
      status: 'Closed',
      posted: '2 weeks ago',
    },
  ];

  const recentTeamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Senior Developer',
      avatar: '/employee-1.jpg',
      joined: '2023-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Product Manager',
      avatar: '/employee-2.jpg',
      joined: '2023-02-20',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Designer',
      avatar: '/employee-3.jpg',
      joined: '2023-03-10',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <DashboardOverviewHeader companyData={companyData} />
      <div className="space-y-4 sm:space-y-6 sm:py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          <Card className="bg-card shadow-xs transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
              <CardTitle className="truncate text-xs font-medium sm:text-sm">Total Jobs</CardTitle>
              <Briefcase className="text-muted-foreground h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {companyData.stats.totalJobs}
              </div>
              <p className="text-muted-foreground mt-0.5 truncate text-[10px] sm:mt-1 sm:text-xs">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-xs transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
              <CardTitle className="truncate text-xs font-medium sm:text-sm">Active Jobs</CardTitle>
              <TrendingUp className="text-muted-foreground h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {companyData.stats.activeJobs}
              </div>
              <p className="text-muted-foreground mt-0.5 truncate text-[10px] sm:mt-1 sm:text-xs">
                Currently hiring
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-xs transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
              <CardTitle className="truncate text-xs font-medium sm:text-sm">
                Applications
              </CardTitle>
              <Eye className="text-muted-foreground h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {companyData.stats.totalApplications}
              </div>
              <p className="text-muted-foreground mt-0.5 truncate text-[10px] sm:mt-1 sm:text-xs">
                +12 this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-xs transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
              <CardTitle className="truncate text-xs font-medium sm:text-sm">
                Team members
              </CardTitle>
              <Users className="text-muted-foreground h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-primary text-xl font-bold sm:text-2xl">
                {companyData.stats.totalTeamMembers}
              </div>
              <p className="text-muted-foreground mt-0.5 truncate text-[10px] sm:mt-1 sm:text-xs">
                +5 this quarter
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
          <Card className="bg-card transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg lg:text-xl">Recent Job Postings</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Latest job openings and their status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="hover:bg-accent/50 flex flex-col justify-between gap-2 rounded-xl border p-3 transition-colors sm:flex-row sm:items-center sm:gap-0"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="truncate text-sm font-medium sm:text-base">{job.title}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {job.applications} applications • {job.posted}
                    </p>
                  </div>
                  <Badge
                    variant={job.status === 'Active' ? 'default' : 'secondary'}
                    className="self-start sm:self-center"
                  >
                    {job.status}
                  </Badge>
                </div>
              ))}
              <Link href="/employer/jobs">
                <Button variant="outline" className="w-full touch-manipulation active:opacity-70">
                  View All Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg lg:text-xl">Recent team members</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Newest team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {recentTeamMembers.map((member) => (
                <div
                  key={member.id}
                  className="hover:bg-accent/50 flex items-center gap-3 rounded-xl border p-3 transition-colors"
                >
                  <Avatar className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
                    <AvatarImage src={member.avatar || '/placeholder.svg'} alt={member.name} />
                    <AvatarFallback className="text-xs">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="truncate text-sm font-medium sm:text-base">{member.name}</p>
                    <p className="text-muted-foreground truncate text-xs sm:text-sm">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-muted-foreground hidden shrink-0 text-xs sm:block">
                    {new Date(member.joined).toLocaleDateString()}
                  </p>
                </div>
              ))}
              <Link href="/employer/team-members">
                <Button variant="outline" className="w-full touch-manipulation active:opacity-70">
                  View team members
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboardView;
