/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DashboardApplicationsHeader from '@/components/dashboard/dashboard-nav/header/DashboardJobApplicationsHeader';

import {
  ArrowLeft,
  Award,
  Briefcase,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
} from '@/redux/feature/application/applicationApi';
import { useCreateConversationMutation } from '@/redux/feature/message/messageApi';
import ApplicationDetailsSkeleton from '@/skeleton/dashboard/employer/applications/ApplicationDetailsSkeleton';
import { ApplicationStatus, EmployerApplication } from '@/types/application';

const PDFViewerSheet = dynamic(() => import('@/components/shared/PDFViewerSheet'), { ssr: false });

interface DetailsViewProps {
  id: string;
}

const STATUS_OPTIONS: Array<{ value: ApplicationStatus; label: string }> = [
  { value: 'SUBMITTED', label: 'Submitted' },
  { value: 'REVIEWING', label: 'Reviewing' },
  { value: 'SHORTLISTED', label: 'Shortlisted' },
  { value: 'INTERVIEWED', label: 'Interviewed' },
  { value: 'OFFERED', label: 'Offered' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'WITHDRAWN', label: 'Withdrawn' },
];

const NEXT_STATUS: Partial<Record<ApplicationStatus, ApplicationStatus>> = {
  SUBMITTED: 'REVIEWING',
  REVIEWING: 'SHORTLISTED',
  SHORTLISTED: 'INTERVIEWED',
  INTERVIEWED: 'OFFERED',
  OFFERED: 'ACCEPTED',
};

const statusLabels = Object.fromEntries(
  STATUS_OPTIONS.map((status) => [status.value, status.label]),
) as Record<ApplicationStatus, string>;

const getStatusColor = (status: ApplicationStatus) => {
  const colors: Record<ApplicationStatus, string> = {
    SUBMITTED: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    REVIEWING: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    SHORTLISTED: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20',
    INTERVIEWED: 'bg-violet-500/10 text-violet-700 border-violet-500/20',
    OFFERED: 'bg-green-500/10 text-green-700 border-green-500/20',
    ACCEPTED: 'bg-primary/10 text-primary border-primary/20',
    REJECTED: 'bg-destructive/10 text-destructive border-destructive/20',
    WITHDRAWN: 'bg-muted text-muted-foreground border-border',
  };
  return colors[status] || 'bg-muted text-muted-foreground';
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const data = (error as any).data;
    return data?.errorSources?.message || data?.message || fallback;
  }
  return fallback;
};

const DashboardJobApplicationDetailsView = ({ id }: DetailsViewProps) => {
  const router = useRouter();

  const { data: applicationResponse, isLoading, isError, refetch } = useGetApplicationByIdQuery(id);
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
  const [createConversation, { isLoading: isCreatingChat }] = useCreateConversationMutation();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [resumeSheetOpen, setResumeSheetOpen] = useState(false);

  const application = applicationResponse?.data as EmployerApplication;

  if (isLoading) {
    return <ApplicationDetailsSkeleton />;
  }

  if (isError || !application) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-bold">Application Not Found</h2>
        <p className="text-muted-foreground max-w-md text-sm">
          We {`couldn't`} retrieve this job application. It might have been deleted, or you might
          not have permission to view it.
        </p>
        <Button
          onClick={() => router.push('/employer/applications')}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Applications
        </Button>
      </div>
    );
  }

  const applicant = application.applicant;
  const profile = applicant?.profile;
  const name = application.fullName || applicant?.fullName || 'Unknown Applicant';
  const email = application.email || applicant?.email || 'Not provided';
  const phone = application.phone || applicant?.phone || 'Not provided';
  const location = application.currentLocation || profile?.location || 'Not provided';
  const experience = application.yearsOfExperience ?? 0;

  const handleUpdateStatus = async (status: ApplicationStatus, reason?: string) => {
    setUpdatingStatus(true);
    toast.loading('Updating status...', { id: 'status-update' });
    try {
      await updateApplicationStatus({
        id: application.id,
        status,
        rejectionReason: reason,
      }).unwrap();
      toast.success('Status updated successfully', { id: 'status-update' });
      refetch();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update status'), {
        id: 'status-update',
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleReject = () => {
    setRejectModalOpen(true);
  };

  const confirmReject = async () => {
    setRejectModalOpen(false);
    await handleUpdateStatus('REJECTED', 'Rejected by employer');
  };

  const handleStartChat = async () => {
    try {
      toast.loading('Starting conversation...', { id: 'create-chat' });
      const res = await createConversation({
        participantId: applicant.id,
        applicationId: application.id,
      }).unwrap();
      toast.success('Chat opened', { id: 'create-chat' });
      router.push(`/employer/messages?conversationId=${res.data.id}`);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to start conversation'), {
        id: 'create-chat',
      });
    }
  };

  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return 'Present';
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-16">
      <DashboardApplicationsHeader />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Back navigation and header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Button
              onClick={() => router.push('/employer/applications')}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground -ml-3 gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Applications
            </Button>
            <div className="flex items-center gap-4">
              <Avatar className="border-border h-16 w-16 border-2">
                {profile?.avatarUrl && (
                  <AvatarImage src={profile.avatarUrl} alt={name} className="object-cover" />
                )}
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
                <p className="text-muted-foreground text-sm">
                  Applied for <span className="font-semibold">{application.job.title}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Action button triggers */}
          <div className="flex flex-wrap items-center gap-3">
            {application.resumeUrl && (
              <Button onClick={() => setResumeSheetOpen(true)} className="rounded-full shadow-xs">
                <FileText className="mr-2 h-4 w-4" /> View Resume
              </Button>
            )}

            {NEXT_STATUS[application.status] && (
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/5 rounded-full"
                disabled={updatingStatus}
                onClick={() =>
                  handleUpdateStatus(NEXT_STATUS[application.status] as ApplicationStatus)
                }
              >
                Move to {statusLabels[NEXT_STATUS[application.status] as ApplicationStatus]}
              </Button>
            )}

            <Button
              variant="outline"
              className="border-border rounded-full"
              disabled={isCreatingChat}
              onClick={handleStartChat}
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>

            {application.status !== 'REJECTED' && application.status !== 'WITHDRAWN' && (
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/5 hover:text-destructive border-destructive/20 rounded-full"
                disabled={updatingStatus}
                onClick={handleReject}
              >
                Reject
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left 2/3 Content: Cover Letter & Resume Details */}
          <div className="space-y-6 lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-muted/40 flex h-auto w-full flex-wrap justify-start gap-1 rounded-full border p-1 md:w-auto">
                <TabsTrigger
                  value="profile"
                  className="rounded-full px-5 py-2 text-xs font-bold tracking-tight"
                >
                  Candidate Profile
                </TabsTrigger>
                <TabsTrigger
                  value="cover-letter"
                  className="rounded-full px-5 py-2 text-xs font-bold tracking-tight"
                >
                  Cover Letter
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Professional Background</CardTitle>
                    <CardDescription>
                      Education, work history, and skills as registered in the
                      {`candidate's`} profile.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Work Experience */}
                    <div className="space-y-4">
                      <h3 className="text-muted-foreground flex items-center gap-2 border-b pb-2 text-sm font-semibold tracking-wider uppercase">
                        <Briefcase className="text-primary h-4 w-4" /> Work Experience
                      </h3>
                      {profile?.workExperiences && profile.workExperiences.length > 0 ? (
                        <div className="relative mt-4 ml-2 space-y-6 border-l pl-4">
                          {profile.workExperiences?.map((exp: any, idx: number) => (
                            <div key={exp.id || idx} className="relative space-y-1">
                              <span className="bg-background border-primary ring-background absolute top-1.5 -left-[21px] h-2 w-2 rounded-full border-2 ring-4" />
                              <h4 className="text-sm font-bold sm:text-base">{exp.jobTitle}</h4>
                              <p className="text-muted-foreground text-sm font-semibold">
                                {exp.company} {exp.location && `• ${exp.location}`}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {formatDate(exp.startDate)} –{' '}
                                {exp.current ? 'Present' : formatDate(exp.endDate)}
                              </p>
                              {exp.description && (
                                <p className="text-foreground/80 mt-2 max-w-2xl text-sm leading-relaxed whitespace-pre-wrap">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground py-2 text-sm italic">
                          No work experiences listed in profile.
                        </p>
                      )}
                    </div>

                    {/* Education */}
                    <div className="space-y-4">
                      <h3 className="text-muted-foreground flex items-center gap-2 border-b pb-2 text-sm font-semibold tracking-wider uppercase">
                        <GraduationCap className="text-primary h-4 w-4" /> Education
                      </h3>
                      {profile?.education && profile.education.length > 0 ? (
                        <div className="relative mt-4 ml-2 space-y-6 border-l pl-4">
                          {profile.education?.map((edu: any, idx: number) => (
                            <div key={edu.id || idx} className="relative space-y-1">
                              <span className="bg-background border-primary ring-background absolute top-1.5 -left-[21px] h-2 w-2 rounded-full border-2 ring-4" />
                              <h4 className="text-sm font-bold sm:text-base">{edu.degree}</h4>
                              <p className="text-muted-foreground text-sm font-semibold">
                                {edu.institution} {edu.fieldOfStudy && `• ${edu.fieldOfStudy}`}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                              </p>
                              {edu.description && (
                                <p className="text-foreground/80 mt-2 max-w-2xl text-sm">
                                  {edu.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground py-2 text-sm italic">
                          No educational history listed in profile.
                        </p>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                      <h3 className="text-muted-foreground flex items-center gap-2 border-b pb-2 text-sm font-semibold tracking-wider uppercase">
                        <Award className="text-primary h-4 w-4" /> Skills
                      </h3>
                      {profile?.skills && profile.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {profile.skills?.map((skill: any, idx: number) => (
                            <Badge
                              key={skill.id || idx}
                              variant="secondary"
                              className="rounded-full px-3 py-1 text-xs font-semibold"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground py-2 text-sm italic">
                          No skills tags added to profile.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cover-letter" className="mt-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Cover Letter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="bg-muted/20 max-w-2xl rounded-2xl border border-dashed p-5 text-sm leading-relaxed whitespace-pre-wrap sm:text-base">
                      {application.coverLetter || 'No cover letter provided with this application.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right 1/3 Content: Summary and Quick Details */}
          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-muted-foreground text-base font-bold tracking-wider uppercase">
                  Application Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-muted-foreground text-sm">Current Status</span>
                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 py-1 font-semibold ${getStatusColor(application.status)}`}
                  >
                    {statusLabels[application.status]}
                  </Badge>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-muted-foreground text-sm">Applied On</span>
                  <span className="text-sm font-semibold">
                    {new Date(application.createdAt).toLocaleDateString(undefined, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-muted-foreground text-sm">Total Experience</span>
                  <span className="text-sm font-semibold">{experience} years</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Location</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <MapPin className="text-primary h-4 w-4 shrink-0" /> {location}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-muted-foreground text-base font-bold tracking-wider uppercase">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold uppercase">
                    <Mail className="text-primary h-3.5 w-3.5" /> Email Address
                  </span>
                  <p className="text-sm font-semibold break-all">{email}</p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold uppercase">
                    <Phone className="text-primary h-3.5 w-3.5" /> Phone Number
                  </span>
                  <p className="text-sm font-semibold">{phone}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reject Alert Modal */}
        <AlertDialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject Application?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reject this application? The candidate will be notified of
                this decision.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmReject}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Reject
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* PDF Resume Viewer */}
        {application.resumeUrl && (
          <PDFViewerSheet
            isOpen={resumeSheetOpen}
            onClose={() => setResumeSheetOpen(false)}
            pdfUrl={application.resumeUrl}
            applicationId={application.id}
            title={`${name} - Resume`}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardJobApplicationDetailsView;
