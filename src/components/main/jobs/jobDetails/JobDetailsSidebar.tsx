import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useGetJobsQuery, useReportJobMutation } from '@/redux/feature/job/jobApi';
import { useCreateConversationMutation } from '@/redux/feature/message/messageApi';
import { useCanAccess } from '@/hooks/useEntitlements';
import { useAppSelector } from '@/redux/hooks';
import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  Building2,
  Calendar,
  CheckCircle2,
  Crown,
  Eye,
  FileText,
  Loader2,
  MessageSquare,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import JobDetailsSimilarJobCard from './JobDetailsSimilarJobCard';

interface Company {
  id: string;
  name: string;
  slug: string;
  industry?: { name: string };
  size?: string;
  description?: string;
}

interface Job {
  id: string;
  title: string;
  company: Company;
  industry?: { name: string };
  companySize?: string;
  jobType?: string;
  type?: string;
  createdAt?: string;
  postedTime?: string;
  viewCount?: number;
  applyCount?: number;
  isSaved?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  postedById?: string;
  postedBy?: {
    id: string;
    fullName?: string;
    avatarUrl?: string;
    email?: string;
  };
}

interface JobDetailsSidebarProps {
  job: Job;
  onApply?: () => void;
  onSave?: () => void;
  onViewCompany?: () => void;
  isSaving?: boolean;
}

const STATS_ICONS = {
  applications: FileText,
  views: Eye,
  posted: Calendar,
} as const;

const StatItem = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <>
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
          <Icon className="text-primary h-4 w-4" />
        </div>
        <span className="text-muted-foreground text-sm font-medium">{label}</span>
      </div>
      <span className="text-foreground font-bold">{value}</span>
    </div>
    <div className="bg-border/20 h-px w-full" />
  </>
);

const CompanyInfoItem = ({ label, value }: { label: string; value: string }) => (
  <>
    <div className="flex items-center justify-between py-1">
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <span className="text-foreground font-bold">{value}</span>
    </div>
    <div className="bg-border/20 h-px w-full" />
  </>
);

const formatJobType = (type: string) => {
  if (!type) return '';
  return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

const JobDetailsSidebar = ({
  job,
  onApply,
  onSave,
  isSaving,
  onViewCompany,
}: JobDetailsSidebarProps) => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [createConversation, { isLoading: isCreatingChat }] = useCreateConversationMutation();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportComment, setReportComment] = useState('');
  const [reportSeverity, setReportSeverity] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>(
    'LOW',
  );
  const [reportJob, { isLoading: isReporting }] = useReportJobMutation();

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason) {
      toast.error('Please select a reason for reporting');
      return;
    }
    try {
      await reportJob({
        jobId: job.id,
        reason: reportReason,
        comment: reportComment,
        severity: reportSeverity,
      }).unwrap();
      toast.success('Job report submitted successfully');
      setShowReportModal(false);
      setReportReason('');
      setReportComment('');
      setReportSeverity('LOW');
    } catch (err) {
      const error = err as { data?: { message?: string }; message?: string };
      toast.error(error?.data?.message || error?.message || 'Failed to submit report');
    }
  };

  const isJobSeeker = currentUser?.role === 'JOB_SEEKER';
  // Use live subscription data — NOT the stale JWT flag — as the source of truth.
  const { hasAccess: isPremium } = useCanAccess('canMessageEmployer');
  const recruiterId = job.postedById || job.postedBy?.id;
  const isNotOwnJob = recruiterId && recruiterId !== currentUser?.id;

  // Show the button to ALL job seekers who are not the job poster.
  // Free users see it but get an upsell modal; premium users get the real chat flow.
  const showMessageButton = isJobSeeker && isNotOwnJob;
  const showReportButton = !!currentUser && isNotOwnJob;

  const handleMessageButtonClick = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    handleMessageRecruiter();
  };

  const handleMessageRecruiter = async () => {
    if (!recruiterId) {
      toast.error('Recruiter details not available');
      return;
    }

    try {
      toast.loading('Starting conversation...', { id: 'create_chat' });
      const response = await createConversation({
        participantId: recruiterId,
      }).unwrap();

      if (response.success && response.data?.id) {
        toast.success('Conversation started!', { id: 'create_chat' });
        router.push(`/dashboard/messages?conversationId=${response.data.id}`);
      } else {
        toast.error('Failed to start conversation', { id: 'create_chat' });
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; message?: string };
      toast.error(error?.data?.message || error?.message || 'Failed to start conversation', {
        id: 'create_chat',
      });
      console.error('Failed to start conversation:', err);
    }
  };

  const companyName = job.company?.name || 'Unknown Company';
  const industry = job.industry?.name || job.company?.industry?.name || 'Not specified';
  const companySize = job.companySize || job.company?.size || 'Not specified';
  const jobType = job.type || job.jobType || 'Not specified';

  const postedTime =
    job.postedTime ||
    (job.createdAt
      ? new Date(job.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : 'Recently');

  const stats = [
    {
      label: 'Applications',
      value: job.applyCount || 0,
      icon: STATS_ICONS.applications,
    },
    { label: 'Views', value: job.viewCount || 0, icon: STATS_ICONS.views },
    { label: 'Posted', value: postedTime, icon: STATS_ICONS.posted },
  ];

  // Fetch similar jobs
  const { data: similarJobsData, isLoading: similarLoading } = useGetJobsQuery({
    limit: 10,
  });

  const similarJobsList = useMemo(() => {
    const raw = (similarJobsData?.data?.result || similarJobsData?.data || []) as Job[];
    const filtered = raw.filter((j: Job) => j.id !== job.id);

    // Filter by same industry
    const matching = filtered.filter(
      (j: Job) => (j.industry?.name || j.company?.industry?.name) === industry,
    );

    if (matching.length > 0) {
      return matching.slice(0, 3);
    }
    // Fallback to any other jobs if no industry matches
    return filtered.slice(0, 3);
  }, [similarJobsData, job.id, industry]);

  const handleApply = () => {
    onApply?.();
  };

  const handleSave = () => {
    onSave?.();
  };

  const handleViewCompany = () => {
    onViewCompany?.();
    if (job.company?.slug) {
      router.push(`/companies/${job.company.slug}`);
    }
  };

  return (
    <aside className="space-y-6">
      <Card className="border-primary/10 bg-background/50 sticky top-24 border backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <Link href={`/jobs/${job?.id}/apply`} className="block w-full">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full text-lg font-bold shadow-lg transition-all hover:scale-[1.02]"
                onClick={handleApply}
              >
                Apply Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className={cn(
                'h-12 w-full border text-lg font-bold transition-all',
                job.isSaved
                  ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:text-primary'
                  : 'hover:bg-primary/5 hover:text-primary border-primary/20',
              )}
              onClick={handleSave}
              disabled={isSaving}
            >
              <Bookmark
                className={cn(
                  'mr-2 h-5 w-5 transition-all duration-200',
                  job.isSaved ? 'fill-primary' : '',
                )}
              />
              {isSaving ? 'Saving...' : job.isSaved ? 'Saved' : 'Save Job'}
            </Button>
            {showMessageButton && (
              <Button
                variant="outline"
                className={cn(
                  'relative flex h-12 w-full items-center justify-center gap-2 border text-base font-bold transition-all',
                  isPremium
                    ? 'bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary hover:text-primary'
                    : 'border-amber-300/60 bg-amber-50/50 text-amber-700 hover:border-amber-400 hover:bg-amber-50 dark:border-amber-700/50 dark:bg-amber-950/20 dark:text-amber-400 dark:hover:bg-amber-950/30',
                )}
                onClick={handleMessageButtonClick}
                disabled={isCreatingChat}
              >
                {isCreatingChat ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isPremium ? (
                  <MessageSquare className="h-5 w-5" />
                ) : (
                  <Crown className="h-4 w-4" />
                )}
                <span>Message Recruiter</span>
                {!isPremium && (
                  <span className="ml-auto rounded-full bg-amber-200/80 px-1.5 py-0.5 text-[10px] font-black tracking-wide text-amber-800 uppercase dark:bg-amber-800/50 dark:text-amber-300">
                    PRO
                  </span>
                )}
              </Button>
            )}

            {/* Premium Upsell Modal for free job seekers */}
            <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
              <DialogContent className="max-w-md overflow-hidden rounded-2xl border-0 p-0 shadow-2xl">
                {/* Gradient Header */}
                <div className="relative bg-linear-to-br from-amber-500 via-amber-400 to-yellow-300 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                    <Crown className="h-8 w-8 text-white drop-shadow" />
                  </div>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-white drop-shadow-sm">
                      Unlock Direct Messaging
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-sm font-semibold text-amber-100">
                      Talk directly to recruiters & HR — skip the queue.
                    </DialogDescription>
                  </DialogHeader>
                  <Sparkles className="absolute top-4 right-5 h-5 w-5 text-white/40" />
                  <Sparkles className="absolute bottom-5 left-4 h-4 w-4 text-white/30" />
                </div>

                {/* Body */}
                <div className="space-y-5 p-6">
                  <ul className="space-y-3">
                    {[
                      'Direct 1-on-1 messages with recruiters & HR',
                      'Real-time chat with typing indicators',
                      'Share your CV, portfolio or cover letter in-chat',
                      "Stand out — most applicants can't do this",
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="text-foreground text-sm leading-snug font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-2 pt-2">
                    <Button
                      className="h-12 w-full rounded-xl bg-linear-to-r from-amber-500 to-yellow-400 text-base font-black text-white shadow-lg transition-all hover:scale-[1.02] hover:from-amber-600 hover:to-yellow-500"
                      onClick={() => {
                        setShowPremiumModal(false);
                        router.push('/dashboard/pricing');
                      }}
                    >
                      Upgrade to Premium
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground h-10 w-full rounded-xl text-sm font-semibold"
                      onClick={() => setShowPremiumModal(false)}
                    >
                      Maybe later
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {showReportButton && (
              <Button
                variant="ghost"
                className="text-muted-foreground mt-2 h-12 w-full border border-transparent text-base font-bold transition-all hover:border-rose-200/50 hover:bg-rose-50 hover:text-rose-600"
                onClick={() => setShowReportModal(true)}
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report Listing
              </Button>
            )}

            <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
              <DialogContent className="bg-card max-w-md overflow-hidden rounded-2xl border p-6 shadow-2xl">
                <DialogHeader className="mb-4">
                  <DialogTitle className="flex items-center gap-2 text-xl font-bold text-rose-600">
                    <AlertTriangle className="h-6 w-6" />
                    Report Job Listing
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-1 text-sm">
                    Please provide details on why you are reporting this job listing. Our moderation
                    team will review it.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-foreground block text-sm font-semibold">
                      Reason for Report
                    </label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      required
                      className="border-input bg-background ring-offset-background focus-visible:ring-ring h-10 w-full rounded-lg border px-3 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                      <option value="" disabled>
                        Select a reason...
                      </option>
                      <option value="Spam or misleading">Spam or misleading</option>
                      <option value="Fraud or scam (asking for money)">
                        Fraud or scam (asking for money)
                      </option>
                      <option value="Discriminatory or offensive content">
                        Discriminatory or offensive content
                      </option>
                      <option value="Incorrect information">Incorrect information</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-foreground block text-sm font-semibold">Severity</label>
                    <select
                      value={reportSeverity}
                      onChange={(e) =>
                        setReportSeverity(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL')
                      }
                      className="border-input bg-background ring-offset-background focus-visible:ring-ring h-10 w-full rounded-lg border px-3 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="CRITICAL">Critical</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-foreground block text-sm font-semibold">
                      Comments / Details
                    </label>
                    <textarea
                      value={reportComment}
                      onChange={(e) => setReportComment(e.target.value)}
                      placeholder="Please add any details that can help us verify the issue..."
                      rows={4}
                      className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full resize-none rounded-lg border p-3 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowReportModal(false)}
                      className="rounded-xl font-bold"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isReporting}
                      className="rounded-xl bg-rose-600 font-bold text-white hover:bg-rose-700"
                    >
                      {isReporting ? 'Submitting...' : 'Submit Report'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Building2 className="text-primary h-4 w-4" />
            </div>
            About {companyName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
          <CompanyInfoItem label="Industry" value={industry} />
          <CompanyInfoItem label="Company Size" value={companySize} />
          <CompanyInfoItem label="Job Type" value={jobType} />

          <Button
            variant="outline"
            className="hover:bg-primary/5 hover:text-primary border-primary/20 mt-4 w-full font-bold transition-all"
            onClick={handleViewCompany}
          >
            <Users className="mr-2 h-4 w-4" />
            View Company Profile
          </Button>
        </CardContent>
      </Card>

      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
          <CardTitle className="text-lg">Job Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
          {stats.map((stat, index) => (
            <StatItem key={index} label={stat.label} value={stat.value} icon={stat.icon} />
          ))}
        </CardContent>
      </Card>

      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
          <CardTitle className="text-lg">Similar Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
          {similarLoading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-primary/10 animate-pulse space-y-2 rounded-2xl border p-4"
              >
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
                <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-slate-800" />
                <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-slate-800" />
              </div>
            ))
          ) : similarJobsList.length === 0 ? (
            <div className="text-muted-foreground py-4 text-center text-xs font-semibold">
              No similar jobs found
            </div>
          ) : (
            similarJobsList.map((similarJob: Job, index: number) => {
              const salaryStr =
                similarJob.salaryMin && similarJob.salaryMax
                  ? `$${Math.round(similarJob.salaryMin / 1000)}k - $${Math.round(similarJob.salaryMax / 1000)}k / yr`
                  : similarJob.salaryMin
                    ? `$${Math.round(similarJob.salaryMin / 1000)}k+ / yr`
                    : 'Competitive Salary';
              return (
                <JobDetailsSimilarJobCard
                  key={similarJob.id || index}
                  id={similarJob.id}
                  title={similarJob.title}
                  company={similarJob.company?.name || 'Verified Partner'}
                  location={similarJob.location || 'Remote'}
                  salary={salaryStr}
                  type={formatJobType(similarJob.jobType || 'Full-Time')}
                />
              );
            })
          )}
        </CardContent>
      </Card>
    </aside>
  );
};

export default JobDetailsSidebar;
