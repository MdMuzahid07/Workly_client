'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HiringPipelineSkeleton from '@/skeleton/dashboard/employer/hiring-pipeline/HiringPipelineSkeleton';
import { Award, CheckCircle2, Clock, FileText, UserCheck, Users, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import DashboardHiringPipelineHeader from '../../../../components/dashboard/dashboard-nav/header/DashboardHiringPipelineHeader';
import HiringPipelineApplicationCard from '../../../../components/dashboard/hiring-pipeline/HiringPipelineApplicationCard';

// Mock data - replace with actual data from your API
const mockApplications = [
  {
    id: '1',
    applicantName: 'John Doe',
    applicantEmail: 'john.doe@email.com',
    applicantPhone: '+1 (555) 123-4567',
    applicantAvatar: '/placeholder.svg?height=40&width=40',
    jobTitle: 'Senior Frontend Developer',
    appliedDate: '2 days ago',
    status: 'submitted',
  },
  {
    id: '2',
    applicantName: 'Jane Smith',
    applicantEmail: 'jane.smith@email.com',
    applicantPhone: '+1 (555) 234-5678',
    jobTitle: 'Backend Engineer',
    appliedDate: '3 days ago',
    status: 'reviewing',
  },
  {
    id: '3',
    applicantName: 'Mike Johnson',
    applicantEmail: 'mike.j@email.com',
    jobTitle: 'Product Manager',
    appliedDate: '5 days ago',
    status: 'shortlisted',
  },
  {
    id: '4',
    applicantName: 'Sarah Wilson',
    applicantEmail: 'sarah.w@email.com',
    applicantPhone: '+1 (555) 456-7890',
    jobTitle: 'UX Designer',
    appliedDate: '1 week ago',
    status: 'interviewed',
  },
  {
    id: '5',
    applicantName: 'Alex Chen',
    applicantEmail: 'alex.chen@email.com',
    jobTitle: 'Senior Frontend Developer',
    appliedDate: '1 week ago',
    status: 'offered',
  },
];

const stages = [
  { id: 'submitted', label: 'Submitted', color: 'bg-chart-1', icon: FileText },
  { id: 'reviewing', label: 'Reviewing', color: 'bg-chart-2', icon: Clock },
  { id: 'shortlisted', label: 'Shortlisted', color: 'bg-chart-4', icon: Users },
  {
    id: 'interviewed',
    label: 'Interviewed',
    color: 'bg-chart-5',
    icon: UserCheck,
  },
  { id: 'offered', label: 'Offered', color: 'bg-chart-3', icon: Award },
  {
    id: 'accepted',
    label: 'Accepted',
    color: 'bg-primary',
    icon: CheckCircle2,
  },
  { id: 'rejected', label: 'Rejected', color: 'bg-destructive', icon: XCircle },
];

const HiringPipelineView = () => {
  const [applications] = useState(mockApplications);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getApplicationsByStage = (stageId: string) => {
    return applications.filter((app) => app.status === stageId);
  };

  const totalApplications = applications.length;
  const activeApplications = applications.filter(
    (app) => !['rejected', 'accepted'].includes(app.status),
  ).length;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16">
        <DashboardHiringPipelineHeader />
        <HiringPipelineSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardHiringPipelineHeader />

      <div className="container mx-auto space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Applications
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">{totalApplications}</div>
              <p className="text-muted-foreground mt-1 text-xs">Across all stages</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">Active</CardTitle>
              <Clock className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">{activeApplications}</div>
              <p className="text-muted-foreground mt-1 text-xs">In progress</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">Accepted</CardTitle>
              <CheckCircle2 className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {getApplicationsByStage('accepted').length}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">Offers accepted</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">Rejected</CardTitle>
              <XCircle className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {getApplicationsByStage('rejected').length}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">Not moving forward</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Pipeline Board</h2>
              <p className="text-muted-foreground text-sm">
                Drag and drop to move candidates through stages
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="flex scrollbar-thin gap-4 overflow-x-auto pb-4">
              {stages.map((stage) => {
                const stageApplications = getApplicationsByStage(stage.id);
                const StageIcon = stage.icon;
                return (
                  <div key={stage.id} className="w-[320px]">
                    <div className="bg-card mb-3 flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${stage.color}/10`}
                        >
                          <StageIcon className={`h-4 w-4 ${stage.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">{stage.label}</h3>
                          <p className="text-muted-foreground text-xs">
                            {stageApplications.length} candidates
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-semibold">
                        {stageApplications.length}
                      </Badge>
                    </div>

                    <div className="bg-muted/20 min-h-[400px] space-y-3 rounded-lg border-2 border-dashed p-3">
                      {stageApplications.length === 0 ? (
                        <div className="flex h-32 flex-col items-center justify-center gap-2 text-center">
                          <StageIcon className="text-muted-foreground/40 h-8 w-8" />
                          <p className="text-muted-foreground text-sm">No candidates yet</p>
                        </div>
                      ) : (
                        stageApplications.map((application) => (
                          <HiringPipelineApplicationCard
                            key={application.id}
                            application={application}
                          />
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringPipelineView;
