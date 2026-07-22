import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, Bookmark, Briefcase, MapPin, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { useToggleSaveCandidateMutation } from '../../../redux/feature/candidate/candidateApi';
import { useAppSelector } from '../../../redux/hooks';
import HoverHint from '../../shared/HoverHint';
import { Badge } from '../../ui/badge';

interface CandidateProps {
  candidate: {
    id: string;
    fullName: string;
    profile: {
      headline?: string;
      location?: string;
      avatarUrl?: string;
      totalExperienceYears?: number;
      skills: Array<{ id: string; skillName: string }>;
      preference?: {
        jobType?: string;
      };
    };
    isSaved?: boolean;
  };
  viewType?: 'grid' | 'list';
}

const CandidateCard = ({ candidate, viewType = 'list' }: CandidateProps) => {
  const [toggleSaveCandidate, { isLoading: isSaving }] = useToggleSaveCandidateMutation();
  const { user: currentUser } = useAppSelector((state) => state.auth);

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
    !candidate.profile?.avatarUrl ||
    candidate.profile.avatarUrl.includes('placeholder') ||
    !candidate.profile.avatarUrl.startsWith('http');

  const rawHeadline = candidate.profile?.headline || '';
  const displayHeadline =
    !rawHeadline || rawHeadline.toUpperCase() === 'JOB_SEEKER'
      ? candidate.profile?.skills?.length
        ? `${candidate.profile.skills
            .map((s) => s.skillName)
            .slice(0, 2)
            .join(' & ')} Specialist`
        : 'Verified Talent'
      : rawHeadline;

  const experienceText =
    candidate.profile?.totalExperienceYears !== undefined &&
    candidate.profile.totalExperienceYears > 0
      ? `${candidate.profile.totalExperienceYears} Yrs Exp`
      : 'Entry-level Talent';

  const isEmployer =
    currentUser?.role === 'EMPLOYER' ||
    currentUser?.role === 'ADMIN' ||
    currentUser?.role === 'SUPER_ADMIN';

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      toast.loading('Updating candidate status...', { id: 'save_candidate' });
      const response = await toggleSaveCandidate(candidate.id).unwrap();
      if (response.success) {
        toast.success(response.message, { id: 'save_candidate' });
      }
    } catch (err) {
      toast.error('Failed to update candidate status', {
        id: 'save_candidate',
      });
      console.error('Failed to save/unsave candidate:', err);
    }
  };

  if (viewType === 'grid') {
    return (
      <Card className="group hover:border-primary/50 bg-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 p-3.5 transition-all duration-300 sm:p-5 dark:border-slate-800">
        <CardContent className="flex flex-1 flex-col p-0">
          <div className="mb-2.5 flex items-start justify-between sm:mb-4">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border bg-gray-50 p-0 sm:h-16 sm:w-16 dark:bg-slate-800">
              {!isPlaceholderAvatar ? (
                <Image
                  src={candidate.profile.avatarUrl!}
                  alt={candidate.fullName}
                  className="h-full w-full object-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="bg-primary/5 text-primary border-primary/10 flex h-full w-full items-center justify-center rounded-xl border text-sm font-bold sm:text-lg">
                  {initials}
                </div>
              )}
            </div>
            {isEmployer && (
              <HoverHint hint={candidate.isSaved ? 'Unsave Profile' : 'Save Profile'}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 rounded-full transition-colors sm:h-8 sm:w-8 ${
                    candidate.isSaved
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'hover:bg-primary/10 hover:text-primary text-slate-400'
                  }`}
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Bookmark className={`h-4 w-4 ${candidate.isSaved ? 'fill-current' : ''}`} />
                </Button>
              </HoverHint>
            )}
          </div>

          <div className="mb-0.5">
            <Link
              href={`/browse-candidates/${candidate.id}`}
              className="hover:text-primary transition-colors"
            >
              <h3 className="text-foreground line-clamp-1 flex items-center gap-1 text-[13px] font-bold sm:text-base">
                {candidate.fullName}
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 fill-emerald-500/10 text-emerald-500 sm:h-4 sm:w-4" />
              </h3>
            </Link>
          </div>

          <p className="text-muted-foreground mb-1.5 line-clamp-1 text-[10px] font-semibold sm:text-xs">
            {displayHeadline}
          </p>

          <div className="mb-2 flex flex-wrap gap-1 sm:mb-3.5 sm:gap-1.5">
            <Badge
              variant="default"
              className="bg-primary/10 text-primary rounded-md border-0 px-1 py-0 text-[8.5px] font-bold tracking-wider uppercase sm:px-1.5 sm:text-[9px]"
            >
              {experienceText}
            </Badge>
            {candidate.profile?.preference?.jobType && (
              <Badge
                variant="secondary"
                className="rounded-md border-0 bg-slate-100 px-1 py-0 text-[8.5px] font-bold tracking-wider text-slate-600 uppercase sm:px-1.5 sm:text-[9px] dark:bg-slate-800 dark:text-slate-300"
              >
                {candidate.profile.preference.jobType.replace('_', ' ')}
              </Badge>
            )}
          </div>

          {/* Location & skills divider */}
          <div className="mb-3 flex flex-col gap-1.5 border-b border-gray-100 pb-2.5 sm:mb-4 sm:pb-3 dark:border-slate-800/80">
            <div className="text-muted-foreground flex items-center gap-1 text-[10px] sm:text-xs">
              <MapPin className="text-primary h-3 w-3 shrink-0 opacity-70 sm:h-3.5 sm:w-3.5" />
              <span className="truncate">{candidate.profile?.location || 'Not specified'}</span>
            </div>
            <div className="mt-0.5 flex flex-wrap gap-1">
              {candidate.profile?.skills?.slice(0, 2).map((skill) => (
                <span
                  key={skill.id}
                  className="bg-secondary/60 text-secondary-foreground rounded px-1.5 py-0.5 text-[8.5px] font-medium sm:text-[9px]"
                >
                  {skill.skillName}
                </span>
              ))}
              {candidate.profile?.skills?.length > 2 && (
                <span className="text-muted-foreground self-center text-[8.5px] sm:text-[9px]">
                  +{candidate.profile.skills.length - 2} more
                </span>
              )}
            </div>
          </div>

          <div className="mt-auto pt-1">
            <Link href={`/browse-candidates/${candidate.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="btn-green-outline h-7 w-full rounded-xl text-[10px] font-bold sm:h-9 sm:text-xs"
              >
                View Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:border-primary/50 bg-card relative overflow-hidden rounded-2xl border border-gray-100 transition-all duration-300 dark:border-slate-800">
      {/* Bookmark button - Absolutely positioned */}
      {isEmployer && (
        <div className="absolute top-3 right-3 z-10 sm:top-5 sm:right-5">
          <HoverHint hint={candidate.isSaved ? 'Unsave Profile' : 'Save Profile'}>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full transition-colors ${
                candidate.isSaved
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : 'hover:bg-primary/10 hover:text-primary bg-background/80 border border-gray-100 text-slate-400 backdrop-blur-xs dark:border-slate-800/80'
              }`}
              onClick={handleSave}
              disabled={isSaving}
            >
              <Bookmark
                className={`h-4 w-4 sm:h-4.5 sm:w-4.5 ${candidate.isSaved ? 'fill-current' : ''}`}
              />
            </Button>
          </HoverHint>
        </div>
      )}

      <CardContent className="p-4 sm:p-5 md:p-5 lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          {/* Left + Middle: Logo & Info */}
          <div className="flex min-w-0 flex-1 items-start gap-3.5 sm:items-center sm:gap-5">
            {/* Avatar */}
            <Link
              href={`/browse-candidates/${candidate.id}`}
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-gray-50 p-0 sm:h-16 sm:w-16 md:h-18 md:w-18 dark:bg-slate-800"
            >
              {!isPlaceholderAvatar ? (
                <Image
                  src={candidate.profile.avatarUrl!}
                  alt={candidate.fullName}
                  fill
                  sizes="(max-width: 640px) 56px, 72px"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="bg-primary/5 text-primary border-primary/10 flex h-full w-full items-center justify-center rounded-xl border text-sm font-bold sm:text-xl">
                  {initials}
                </div>
              )}
            </Link>

            {/* Info */}
            <div className="min-w-0 flex-1 pr-8 sm:pr-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link
                  href={`/browse-candidates/${candidate.id}`}
                  className="hover:text-primary transition-colors"
                >
                  <h3 className="text-foreground flex items-center gap-1 truncate text-xs font-bold sm:text-base md:text-lg">
                    {candidate.fullName}
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 fill-emerald-500/10 text-emerald-500 sm:h-4.5 sm:w-4.5" />
                    {candidate.profile?.totalExperienceYears &&
                      candidate.profile.totalExperienceYears > 5 && (
                        <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                      )}
                  </h3>
                </Link>
              </div>

              <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px] font-semibold sm:mt-1 sm:text-xs">
                {displayHeadline}
              </p>

              {/* Meta row */}
              <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs">
                <span className="flex items-center gap-1">
                  <MapPin className="text-primary h-3 w-3 shrink-0 opacity-70 sm:h-3.5 sm:w-3.5" />
                  <span className="max-w-[120px] truncate sm:max-w-none">
                    {candidate.profile?.location || 'Not specified'}
                  </span>
                </span>
                <span className="opacity-30">•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="text-primary h-3 w-3 shrink-0 opacity-70 sm:h-3.5 sm:w-3.5" />
                  <span>
                    {experienceText === 'Entry-level Talent'
                      ? 'Entry-level Experience'
                      : `${candidate.profile?.totalExperienceYears} Years Experience`}
                  </span>
                </span>
                {candidate.profile?.preference?.jobType && (
                  <>
                    <span className="opacity-30">•</span>
                    <span className="text-primary font-bold capitalize">
                      {candidate.profile.preference.jobType.replace('_', ' ').toLowerCase()}
                    </span>
                  </>
                )}
              </div>

              {/* Skills */}
              <div className="mt-2.5 flex flex-wrap gap-1 sm:mt-3 sm:gap-1.5">
                {candidate.profile?.skills?.slice(0, 5).map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="rounded-md border-0 bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-600 sm:px-2 sm:text-[10px] dark:bg-slate-800 dark:text-slate-300"
                  >
                    {skill.skillName}
                  </Badge>
                ))}
                {candidate.profile?.skills?.length > 5 && (
                  <span className="text-muted-foreground self-center text-[9px] sm:text-[10px]">
                    +{candidate.profile.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action button: Full-width on mobile with rounded-xl, auto width on desktop with rounded-full */}
          <div className="mt-2 w-full shrink-0 sm:mt-0 sm:w-auto">
            <Button
              className="btn-green-primary group/btn h-8.5 w-full rounded-xl px-4 py-1.5 text-xs font-bold shadow-sm transition-all duration-300 sm:h-9.5 sm:w-auto sm:rounded-full"
              asChild
            >
              <Link href={`/browse-candidates/${candidate.id}`}>
                <span>View Profile</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
