import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, TrendingUp, Users } from 'lucide-react';

interface Job {
  id: string;
  status: 'active' | 'closed' | 'draft';
  applications: number;
}

interface JobStatusCardsProps {
  jobs: Job[];
}

const JobStatusCards = ({ jobs }: JobStatusCardsProps) => {
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.status === 'active').length;
  const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0);
  const draftJobs = jobs.filter((job) => job.status === 'draft').length;

  const stats = [
    {
      label: 'Total Jobs',
      value: totalJobs,
      change: '+12% from last month',
      icon: Briefcase,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      changePositive: true,
    },
    {
      label: 'Active Jobs',
      value: activeJobs,
      subtext: 'Currently hiring',
      badge: 'Active',
      icon: TrendingUp,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Applications',
      value: totalApplications,
      change: '+78 this week',
      icon: Users,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      changePositive: true,
    },
    {
      label: 'Draft Jobs',
      value: draftJobs,
      subtext: 'Pending publication',
      icon: Briefcase,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-6 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-card rounded-xl border shadow-xs transition-all hover:shadow-md"
        >
          <CardContent className="p-3.5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground truncate text-[11px] font-medium sm:text-sm">
                  {stat.label}
                </p>
                <p className="text-foreground mt-1 text-xl font-bold sm:mt-2 sm:text-3xl">
                  {stat.value}
                </p>
                {stat.change && (
                  <p
                    className={`mt-0.5 truncate text-[10px] sm:mt-1 sm:text-xs ${
                      stat.changePositive
                        ? 'text-primary font-medium'
                        : 'text-destructive font-medium'
                    }`}
                  >
                    {stat.change}
                  </p>
                )}
                {stat.subtext && (
                  <p className="text-muted-foreground mt-0.5 truncate text-[10px] sm:mt-1 sm:text-xs">
                    {stat.subtext}
                  </p>
                )}
              </div>
              {stat.badge ? (
                <Badge className="bg-primary/10 text-primary shrink-0 border-0 text-[10px] font-bold sm:text-xs">
                  {stat.badge}
                </Badge>
              ) : (
                <div className={`shrink-0 rounded-lg p-2 sm:p-3 ${stat.iconBg}`}>
                  <stat.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.iconColor}`} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobStatusCards;
