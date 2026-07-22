/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShareButton } from '@/components/shared/ShareButton';
import {
  Award,
  BadgeCheck,
  Bookmark,
  Briefcase,
  Calendar,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Shield,
  User,
  Video,
  Linkedin,
  Github,
  Twitter,
  Facebook,
  ArrowUpRight,
} from 'lucide-react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
  useGetCandidateByIdQuery,
  useToggleSaveCandidateMutation,
} from '../../../redux/feature/candidate/candidateApi';
import { useCreateConversationMutation } from '../../../redux/feature/message/messageApi';
import { useLogProfileViewMutation } from '../../../redux/feature/profileView/profileViewApi';
import { useAppSelector } from '../../../redux/hooks';
import CandidateDetailsSkeleton from '../../../skeleton/browse-candidates/details/CandidateDetailsSkeleton';

const CandidateDetailsView = () => {
  const params = useParams();
  const candidateId = params.id as string;
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [logProfileView] = useLogProfileViewMutation();
  const [createConversation, { isLoading: isCreatingChat }] = useCreateConversationMutation();

  useEffect(() => {
    if (candidateId && currentUser?.id !== candidateId) {
      logProfileView(candidateId);
    }
  }, [candidateId, currentUser, logProfileView]);

  const isEmployer =
    currentUser?.role === 'EMPLOYER' ||
    currentUser?.role === 'ADMIN' ||
    currentUser?.role === 'SUPER_ADMIN';

  const {
    data: response,
    isLoading,
    error,
  } = useGetCandidateByIdQuery(candidateId, {
    skip: !candidateId,
  });

  const [toggleSaveCandidate, { isLoading: isSaving }] = useToggleSaveCandidateMutation();

  const handleSave = async () => {
    try {
      toast.loading('Updating candidate status...', { id: 'save_candidate' });
      const res = await toggleSaveCandidate(candidateId).unwrap();
      if (res.success) {
        toast.success(res.message, { id: 'save_candidate' });
      }
    } catch (err) {
      toast.error('Failed to update status', { id: 'save_candidate' });
      console.error(err);
    }
  };

  const handleStartChat = async () => {
    if (!isEmployer) {
      toast.error('Only employers can start a conversation');
      return;
    }

    try {
      toast.loading('Starting conversation...', { id: 'create_chat' });
      const res = await createConversation({
        participantId: candidateId,
      }).unwrap();

      if (res.success) {
        toast.success('Conversation started!', { id: 'create_chat' });
        // Redirect to employer messages
        router.push('/employer/messages');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to start conversation', {
        id: 'create_chat',
      });
      console.error(err);
    }
  };

  if (isLoading) return <CandidateDetailsSkeleton />;

  if (error || !response?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-destructive text-lg font-bold">
          Candidate not found or error loading profile.
        </div>
      </div>
    );
  }

  const candidate = response.data;
  const profile = candidate.profile || {};

  const initials = candidate.fullName
    ? candidate.fullName
        .split(' ')
        .filter(Boolean)
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'C';

  const isPlaceholderAvatar =
    !profile.avatarUrl ||
    profile.avatarUrl.includes('placeholder') ||
    !profile.avatarUrl.startsWith('http');

  const rawHeadline = profile.headline || '';
  const displayHeadline =
    !rawHeadline || rawHeadline.toUpperCase() === 'JOB_SEEKER'
      ? profile.skills?.length
        ? `${profile.skills
            .map((s: any) => s.skillName)
            .slice(0, 2)
            .join(' & ')} Specialist`
        : 'Verified Talent'
      : rawHeadline;

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Dynamic Banner Section */}
      <div className="relative h-64 w-full overflow-hidden lg:h-80">
        <Image
          src={
            profile.coverUrl ||
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="from-background via-background/20 absolute inset-0 bg-linear-to-t to-transparent" />
      </div>

      <div className="relative mx-auto -mt-32 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Premium Header Card */}
            <Card className="bg-background/60 overflow-hidden border backdrop-blur-xl">
              <CardHeader className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="bg-card relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-2xl md:h-32 md:w-32 dark:border-slate-800">
                      {!isPlaceholderAvatar ? (
                        <Image
                          src={profile.avatarUrl!}
                          alt={candidate.fullName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-primary/5 text-primary border-primary/10 flex h-full w-full items-center justify-center text-3xl font-bold">
                          {initials}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-primary/10 text-primary border-none">
                          {profile.preference?.jobType?.replace(/_/g, ' ') || 'Full Time'}
                        </Badge>
                        <Badge variant="secondary" className="bg-secondary/50 border-none">
                          {profile.totalExperienceYears || 0} Years Exp
                        </Badge>
                      </div>
                      <h1 className="text-foreground flex items-center gap-2 text-3xl font-bold tracking-tight md:text-4xl">
                        {candidate.fullName}
                        <BadgeCheck className="h-6 w-6 shrink-0 fill-emerald-500/10 text-emerald-500" />
                      </h1>
                      <p className="text-muted-foreground text-lg font-medium">{displayHeadline}</p>
                      <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.location || 'Location not set'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>Member since {new Date(candidate.createdAt).getFullYear()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {isEmployer && (
                      <Button
                        variant="outline"
                        size="icon"
                        className={`rounded-xl border-gray-200 transition-colors ${
                          candidate.isSaved
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'hover:bg-primary/10 hover:text-primary'
                        }`}
                        onClick={handleSave}
                        disabled={isSaving}
                      >
                        <Bookmark
                          className={`h-5 w-5 ${
                            candidate.isSaved ? 'fill-current' : 'text-slate-400'
                          }`}
                        />
                      </Button>
                    )}
                    <ShareButton
                      title={candidate?.name || ''}
                      summary={
                        candidate?.title
                          ? `Check out the professional profile of ${candidate.name} (${candidate.title})`
                          : `Check out the professional profile of ${candidate.name}`
                      }
                      hashtags={['WorklyJob', 'Candidate', 'Resume', 'Talent']}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    onClick={handleStartChat}
                    disabled={isCreatingChat}
                    className="btn-green-primary rounded-full px-8 font-bold shadow-lg"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-green-outline rounded-full px-8 font-bold"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    View Resume
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* About / Bio */}
            <Card className="bg-background/50 border backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2">
                  <User className="text-primary h-5 w-5" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {profile.bio || 'No biography provided.'}
                </p>
              </CardContent>
            </Card>

            {/* Video Resume */}
            {profile.videoResumeUrl && (
              <Card className="bg-background/50 overflow-hidden border backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2">
                    <Video className="text-primary h-5 w-5" />
                    Video Resume / Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center bg-black/5 p-4 sm:p-6">
                  <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-xl border bg-black shadow-md">
                    <video
                      src={profile.videoResumeUrl}
                      controls
                      className="h-full w-full object-contain"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <Card className="bg-background/50 border backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-primary h-5 w-5" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <div className="flex flex-wrap gap-3">
                    {profile.skills.map((skill: any) => (
                      <div
                        key={skill.id}
                        className="bg-primary/5 border-primary/10 flex items-center gap-2 rounded-xl border px-4 py-2"
                      >
                        <span className="text-foreground font-semibold">{skill.skillName}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {skill.experienceYears}y
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Work Experience */}
            {profile.workExperiences && profile.workExperiences.length > 0 && (
              <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="text-primary h-5 w-5" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
                  {profile.workExperiences.map((exp: any, index: number) => (
                    <div key={exp.id} className="relative pl-8">
                      {index !== profile.workExperiences.length - 1 && (
                        <div className="bg-primary/10 absolute top-8 left-[11px] h-full w-0.5" />
                      )}
                      <div className="bg-primary/5 border-primary/20 absolute top-1 left-0 h-6 w-6 rounded-full border-2" />
                      <div className="space-y-1">
                        <h4 className="text-foreground text-lg font-bold">{exp.jobTitle}</h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                        <p className="text-muted-foreground text-xs">
                          {new Date(exp.startDate).toLocaleDateString()} -{' '}
                          {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-foreground/70 mt-2 text-sm">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="text-primary h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
                  {profile.education.map((edu: any) => (
                    <div key={edu.id} className="flex gap-4">
                      <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                        <GraduationCap className="text-primary h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-foreground text-lg font-bold">{edu.degree}</h4>
                        <p className="text-foreground/80 font-medium">{edu.institution}</p>
                        <p className="text-muted-foreground text-xs">
                          {edu.startDate ? new Date(edu.startDate).getFullYear() : ''} -{' '}
                          {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-background/50 border backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base tracking-wider uppercase">Candidate Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expected Salary</span>
                  <span className="text-foreground font-bold">
                    ${profile.preference?.expectedSalary || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground font-bold">{profile.location || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="text-foreground font-bold">
                    {profile.totalExperienceYears || 0} Years
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="text-foreground font-bold">
                    {profile.preference?.industry || 'General'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base tracking-wider uppercase">Links</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3 p-4 pt-0 sm:grid-cols-2 sm:p-6 sm:pt-0 md:grid-cols-3 lg:grid-cols-1">
                {profile.linkedInUrl && (
                  <a
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-primary/10 bg-primary/5 hover:bg-primary/10 hover:border-primary/20 flex items-center justify-between rounded-xl border p-3 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 group-hover:bg-primary/20 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-foreground truncate text-sm font-semibold">
                          LinkedIn
                        </span>
                        <span className="text-muted-foreground truncate text-[11px]">
                          View profile
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-primary/10 bg-primary/5 hover:bg-primary/10 hover:border-primary/20 flex items-center justify-between rounded-xl border p-3 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 group-hover:bg-primary/20 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors">
                        <Github className="h-5 w-5" />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-foreground truncate text-sm font-semibold">
                          GitHub
                        </span>
                        <span className="text-muted-foreground truncate text-[11px]">
                          View repositories
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {profile.websiteUrl && (
                  <a
                    href={profile.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-primary/10 bg-primary/5 hover:bg-primary/10 hover:border-primary/20 flex items-center justify-between rounded-xl border p-3 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 group-hover:bg-primary/20 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-foreground truncate text-sm font-semibold">
                          Website
                        </span>
                        <span className="text-muted-foreground truncate text-[11px]">
                          Visit site
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {profile.twitterUrl && (
                  <a
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-primary/10 bg-primary/5 hover:bg-primary/10 hover:border-primary/20 flex items-center justify-between rounded-xl border p-3 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 group-hover:bg-primary/20 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors">
                        <Twitter className="h-5 w-5" />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-foreground truncate text-sm font-semibold">
                          Twitter / X
                        </span>
                        <span className="text-muted-foreground truncate text-[11px]">
                          View feed
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {profile.facebookUrl && (
                  <a
                    href={profile.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-primary/10 bg-primary/5 hover:bg-primary/10 hover:border-primary/20 flex items-center justify-between rounded-xl border p-3 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 group-hover:bg-primary/20 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors">
                        <Facebook className="h-5 w-5" />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-foreground truncate text-sm font-semibold">
                          Facebook
                        </span>
                        <span className="text-muted-foreground truncate text-[11px]">
                          View profile
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card overflow-hidden border">
              <div className="space-y-4 p-4 text-center sm:p-6">
                <Award className="text-primary mx-auto h-12 w-12 opacity-20" />
                <h3 className="text-lg font-bold">Workly Verified</h3>
                <p className="text-muted-foreground text-xs">
                  This candidate has a verified profile and is actively looking for new
                  opportunities.
                </p>
                <Button
                  onClick={handleStartChat}
                  disabled={isCreatingChat}
                  className="btn-green-primary w-full rounded-xl font-bold"
                >
                  Contact Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsView;
