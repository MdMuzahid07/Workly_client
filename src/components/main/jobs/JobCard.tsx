import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Bookmark, Briefcase, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { useToggleSaveUnsaveJobMutation } from '../../../redux/feature/profile/profileApi';
import HoverHint from '../../shared/HoverHint';
import { Badge } from '../../ui/badge';

interface JobProps {
  job: {
    id: string;
    title: string;
    company: { name: string; logo?: string };
    location: string;
    salaryMin: number;
    salaryMax: number;
    currency: string;
    jobType: string;
    createdAt: string;
    requirements: string;
    JobSkill: Array<{ id: string; skillName: string }>;
    isFeatured: boolean;
    isRemote: boolean;
    isSaved?: boolean;
  };
  viewType?: 'grid' | 'list';
  inDashboard?: boolean;
}

const JobCard = ({ job, viewType = 'list', inDashboard = false }: JobProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toggleSaveUnsaveJobMutation, { isLoading: isSaving }] = useToggleSaveUnsaveJobMutation();

  const handleJobSave = async (jobId: string) => {
    try {
      toast.loading('Updating job status...', { id: 'save_job' });
      const response = await toggleSaveUnsaveJobMutation(jobId).unwrap();
      if (response.success && response.data.action === 'saved') {
        toast.success('Job saved successfully', { id: 'save_job' });
      }
      if (response.success && response.data.action === 'unsaved') {
        toast.success('Job unsaved successfully', { id: 'save_job' });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        err?.data?.errorSources?.message || err?.data?.message || 'Failed to update job status',
        { id: 'save_job' },
      );
      console.error('Failed to save/unsave job:', err);
    }
  };

  if (viewType === 'grid') {
    return (
      <Card
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-2xl border p-4 transition-all duration-300 sm:p-5',
          inDashboard
            ? 'bg-card border-border/50'
            : 'hover:border-primary/50 bg-card border-gray-100 hover:shadow-md dark:border-slate-800',
        )}
      >
        <CardContent className="flex flex-1 flex-col p-0">
          {/* Top row: logo + bookmark */}
          <div className="mb-3 flex items-start justify-between sm:mb-4">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-0 sm:h-11 sm:w-11 dark:bg-slate-800">
              {job?.company?.logo ? (
                <Image
                  src={job.company.logo}
                  alt={job.company.name}
                  className="h-full w-full rounded-lg object-cover"
                  width={44}
                  height={44}
                />
              ) : (
                <Briefcase className="text-primary/40 h-5.5 w-5.5 sm:h-6 sm:w-6" />
              )}
            </div>
            <HoverHint hint={job.isSaved ? 'Unsave job' : 'Save job'}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-full transition-colors',
                  job.isSaved
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'hover:bg-primary/10 hover:text-primary text-slate-400',
                )}
                onClick={() => handleJobSave(job?.id)}
              >
                <Bookmark
                  className={cn(
                    'h-4 w-4 transition-all duration-200',
                    job.isSaved ? 'fill-primary' : '',
                  )}
                />
              </Button>
            </HoverHint>
          </div>

          {/* Title */}
          <Link href={`/jobs/${job?.id}`} className="hover:text-primary mb-1 transition-colors">
            <h3 className="text-foreground line-clamp-2 text-sm leading-snug font-bold sm:text-base md:min-h-[2.75rem]">
              {job?.title}
            </h3>
          </Link>

          {/* Company */}
          <p className="text-muted-foreground mb-2.5 text-xs font-semibold">{job?.company?.name}</p>

          {/* Badges — only shown when present */}
          {(job?.isFeatured || job?.isRemote) && (
            <div className="mb-3.5 flex flex-wrap gap-1">
              {job?.isFeatured && (
                <Badge
                  variant="default"
                  className="bg-primary/10 text-primary rounded-md border-0 px-1.5 py-0 text-[9px] font-bold tracking-wider uppercase"
                >
                  Featured
                </Badge>
              )}
              {job?.isRemote && (
                <Badge
                  variant="secondary"
                  className="rounded-md border-0 bg-slate-100 px-1.5 py-0 text-[9px] font-bold tracking-wider text-slate-600 uppercase dark:bg-slate-800 dark:text-slate-300"
                >
                  Remote
                </Badge>
              )}
            </div>
          )}

          {/* Location & Type (Sleek side-by-side row with bullet divider) */}
          <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-gray-100 pb-3 text-[11px] sm:text-xs dark:border-slate-800/80">
            <span className="text-muted-foreground flex min-w-0 items-center gap-1">
              <MapPin className="text-primary h-3.5 w-3.5 shrink-0 opacity-70" />
              <span className="truncate">{job?.location}</span>
            </span>
            <span className="text-muted-foreground/30">•</span>
            <span className="text-muted-foreground flex items-center gap-1 capitalize">
              <Clock className="text-primary h-3.5 w-3.5 shrink-0 opacity-70" />
              <span>{job?.jobType.replace('_', ' ').toLowerCase()}</span>
            </span>
          </div>

          {/* Salary + Details */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="text-foreground text-xs font-bold whitespace-nowrap sm:text-sm lg:text-[15px] lg:font-extrabold">
              {job?.currency === 'USD' ? '$' : job?.currency}
              {job?.salaryMin?.toLocaleString()}–{job?.salaryMax?.toLocaleString()}
            </div>
            <Link href={`/jobs/${job?.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/5 hover:text-primary h-7.5 rounded-full px-3 text-[11px] font-bold sm:h-8 sm:text-xs"
              >
                Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'group relative overflow-hidden rounded-2xl border transition-all duration-300',
        inDashboard
          ? 'bg-card border-border p-5 sm:p-6'
          : 'hover:border-primary/50 bg-card border-gray-100 hover:shadow-md dark:border-slate-800',
      )}
    >
      <CardContent className={cn('p-0', !inDashboard && 'p-4 sm:p-5 md:p-6')}>
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          {/* Main Info (Logo + Title/Meta) */}
          <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
            {/* Logo */}
            <Link
              href={`/jobs/${job?.id}`}
              className="border-border/20 relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border bg-white shadow-xs sm:h-12 sm:w-12 md:h-14 md:w-14 dark:bg-slate-800"
              prefetch={false}
            >
              {job?.company?.logo ? (
                <Image
                  src={job.company.logo}
                  alt={job.company.name}
                  fill
                  sizes="(max-width: 640px) 40px, 56px"
                  className="rounded-xl object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Briefcase className="text-primary/40 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                </div>
              )}
            </Link>

            {/* Info details */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link
                  href={`/jobs/${job?.id}`}
                  className="hover:text-primary transition-colors"
                  prefetch={false}
                >
                  <h3 className="text-foreground line-clamp-1 text-sm font-bold sm:text-base md:text-lg">
                    {job?.title}
                  </h3>
                </Link>
                {/* Badges */}
                {(job?.isFeatured || job?.isRemote) && (
                  <div className="flex flex-wrap gap-1">
                    {job?.isFeatured && (
                      <Badge
                        variant="default"
                        className="bg-primary/10 text-primary hover:bg-primary/20 rounded-md border-0 px-1.5 py-0 text-[9px] font-bold tracking-wider uppercase"
                      >
                        Featured
                      </Badge>
                    )}
                    {job?.isRemote && (
                      <Badge
                        variant="secondary"
                        className="rounded-md border-0 bg-slate-100 px-1.5 py-0 text-[9px] font-bold tracking-wider text-slate-600 uppercase dark:bg-slate-800 dark:text-slate-300"
                      >
                        Remote
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <p className="text-muted-foreground mt-0.5 text-xs font-semibold sm:mt-1">
                {job?.company?.name}
              </p>

              {/* Meta row */}
              <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs">
                <span className="flex items-center gap-1">
                  <MapPin className="text-primary h-3.5 w-3.5 shrink-0 opacity-70" />
                  <span className="truncate">{job?.location}</span>
                </span>
                <span className="opacity-30">•</span>
                <span className="flex items-center gap-1 capitalize">
                  <Clock className="text-primary h-3.5 w-3.5 shrink-0 opacity-70" />
                  <span>{job?.jobType.replace('_', ' ').toLowerCase()}</span>
                </span>
                <span className="hidden opacity-30 sm:inline">•</span>
                <span className="hidden items-center gap-1 sm:flex">
                  <Briefcase className="text-primary h-3.5 w-3.5 shrink-0 opacity-70" />
                  <span>Published {new Date(job?.createdAt).toLocaleDateString()}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Divider on Mobile only */}
          <div className="border-t border-gray-100 sm:hidden dark:border-slate-800/60" />

          {/* Right Section (Salary + Actions) */}
          <div className="flex shrink-0 items-center justify-between sm:flex-col sm:items-end sm:justify-center sm:gap-2.5">
            {/* Salary */}
            <div className="text-foreground text-sm font-bold whitespace-nowrap sm:text-base sm:font-black md:text-lg">
              {job?.currency === 'USD' ? '$' : job?.currency}
              {job?.salaryMin?.toLocaleString()}–{job?.salaryMax?.toLocaleString()}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <HoverHint hint={job.isSaved ? 'Unsave job' : 'Save job'}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8 rounded-full transition-colors sm:h-8.5 sm:w-8.5',
                    job.isSaved
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'hover:bg-primary/10 hover:text-primary text-slate-400',
                  )}
                  onClick={() => handleJobSave(job?.id)}
                  type="button"
                >
                  <Bookmark
                    className={cn(
                      'h-4 w-4 transition-all duration-200 sm:h-4.5 sm:w-4.5',
                      job.isSaved ? 'fill-primary' : '',
                    )}
                  />
                </Button>
              </HoverHint>

              <Button
                size="sm"
                className="group/btn h-8 rounded-full px-4 text-xs font-bold"
                asChild
              >
                <Link href={`/jobs/${job?.id}`} prefetch={false}>
                  <span>Details</span>
                  <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
