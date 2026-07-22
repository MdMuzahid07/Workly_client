/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CandidateCard from '../../../components/main/candidates/CandidateCard';
import CandidateSidebarFilter from '../../../components/main/candidates/filter/CandidateSidebarFilter';
import CandidateMobileSidebar from '../../../components/main/candidates/filter/CandidateMobileSidebar';
import Searchbar from '../../../components/main/jobs/Searchbar';
import PageHero from '../../../components/shared/PageHero';
import ViewToggle from '../../../components/shared/ViewToggle';
import { useGetCandidatesQuery } from '../../../redux/feature/candidate/candidateApi';
import CandidateCardSkeleton from '../../../skeleton/browse-candidates/browse/CandidateCardSkeleton';

type Filters = {
  search: string;
  location: string;
  experienceRange: [number, number];
  industry: string;
  skills: string[];
};

const DEFAULT_FILTERS: Filters = {
  search: '',
  location: '',
  experienceRange: [0, 30],
  industry: '',
  skills: [],
};

const FeaturedCandidatesSkeleton = () => {
  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-md" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 py-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <div className="space-y-4">
              {/* Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3.5 w-24 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-5 w-5 rounded-md" />
              </div>

              {/* Metadata */}
              <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>

              {/* Skills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <Skeleton className="h-6 w-14 rounded-lg" />
                <Skeleton className="h-6 w-18 rounded-lg" />
                <Skeleton className="h-6 w-12 rounded-lg" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const BrowseCandidatesView = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [allCandidates, setAllCandidates] = useState<any[]>([]);
  const [viewType, setViewType] = useState<'grid' | 'list'>('list');

  const params = useMemo(() => {
    const p: any = {
      page: currentPage,
      limit: 12,
      sortBy: 'fullName',
      sortOrder: 'desc',
    };

    if (filters.search) p.search = filters.search;
    if (filters.location) p.location = filters.location;
    if (filters.industry) p.industry = filters.industry;
    if (
      filters.experienceRange &&
      (filters.experienceRange[0] !== 0 || filters.experienceRange[1] !== 30)
    ) {
      p.minExperience = filters.experienceRange[0];
      p.maxExperience = filters.experienceRange[1];
    }
    if (filters.skills.length > 0) p.skills = filters.skills.join(',');

    return p;
  }, [filters, currentPage]);

  const router = useRouter();

  const { data, isLoading, error } = useGetCandidatesQuery(params);

  // Fetch featured / top candidates
  const { data: featuredData, isLoading: featuredLoading } = useGetCandidatesQuery({
    limit: 6,
    sortBy: 'fullName',
    sortOrder: 'desc',
  });

  const featuredCandidates = useMemo(() => {
    return featuredData?.data || [];
  }, [featuredData]);

  console.log('Candidates Data:', data);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderFeaturedCard = (candidate: any, index?: number) => {
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
              .map((s: any) => s.skillName)
              .slice(0, 2)
              .join(' & ')} Specialist`
          : 'Verified Talent'
        : rawHeadline;

    const experienceText =
      candidate.profile?.totalExperienceYears !== undefined &&
      candidate.profile.totalExperienceYears > 0
        ? `${candidate.profile.totalExperienceYears} Yrs Exp`
        : 'Entry-level Talent';

    return (
      <Card
        onClick={() => router.push(`/browse-candidates/${candidate.id}`)}
        className="group hover:border-primary/50 relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:shadow-md sm:p-6 dark:border-slate-800 dark:bg-slate-900/50"
      >
        <div className="relative z-10 flex-1 space-y-3 sm:space-y-4">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gray-50 p-0 dark:bg-slate-800">
                {!isPlaceholderAvatar ? (
                  <Image
                    src={candidate.profile.avatarUrl!}
                    alt={candidate.fullName}
                    fill
                    sizes="40px"
                    className="object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="bg-primary/5 text-primary border-primary/10 flex h-full w-full items-center justify-center rounded-xl border text-sm font-bold sm:text-lg">
                    {initials}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-foreground flex items-center gap-1 truncate text-xs font-bold tracking-tight sm:text-sm">
                  {candidate.fullName}
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0 fill-emerald-500/10 text-emerald-500 sm:h-4 sm:w-4" />
                  {candidate.profile?.totalExperienceYears &&
                    candidate.profile.totalExperienceYears > 5 && (
                      <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                    )}
                </h4>
                <span className="text-muted-foreground block truncate text-[10px] font-semibold sm:text-[11px]">
                  {displayHeadline}
                </span>
              </div>
            </div>

            {/* Top-Right Arrow Action */}
            <div className="text-muted-foreground/50 group-hover:text-primary p-1 transition-colors duration-300">
              <ArrowUpRight className="h-4.5 w-4.5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5" />
            </div>
          </div>

          {/* Bullet Divided Metadata Row (LinkedIn style) */}
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold sm:text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="text-primary/60 h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {candidate.profile?.location || 'Not specified'}
            </span>
            <span className="text-muted-foreground/30">•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="text-primary/60 h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {experienceText}
            </span>
            {candidate.profile?.preference?.jobType && (
              <>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-primary font-bold">
                  {candidate.profile.preference.jobType.replace('_', ' ')}
                </span>
              </>
            )}
          </div>

          {/* Skills Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 sm:pt-2">
            {(candidate.profile?.skills?.slice(0, 3) || []).map((skill: any) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="bg-primary/5 text-primary/95 border-primary/10 rounded-lg border px-2 py-0.5 text-[9px] font-extrabold tracking-wide uppercase transition-colors sm:px-2.5 sm:py-1 sm:text-[10px]"
              >
                {skill.skillName}
              </Badge>
            ))}
            {!candidate.profile?.skills?.length && (
              <span className="text-muted-foreground text-[9px] sm:text-[10px]">
                No skills listed
              </span>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const resultsRef = useRef<HTMLElement>(null);
  const shouldScrollRef = useRef(false);

  const scrollToResults = () => {
    if (resultsRef.current) {
      const topOffset = resultsRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllCandidates(data.data);
        if (shouldScrollRef.current) {
          shouldScrollRef.current = false;
          setTimeout(() => {
            scrollToResults();
          }, 100);
        }
      } else {
        setAllCandidates((prev) => {
          const combined = [...prev, ...data.data];
          return combined.filter(
            (candidate, index, self) => self.findIndex((c) => c.id === candidate.id) === index,
          );
        });
      }
    }
  }, [data, currentPage]);

  const handleSearch = (searchData: { search: string; location: string }) => {
    shouldScrollRef.current = true;
    setFilters((prev) => ({
      ...prev,
      search: searchData.search,
      location: searchData.location,
    }));
    setCurrentPage(1);
    setAllCandidates([]);
  };

  const loadMore = () => {
    if (data?.meta && currentPage < data.meta.pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    shouldScrollRef.current = true;
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
    setAllCandidates([]);
  };

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        title="Discover Top Talent"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Browse Candidates' }]}
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop"
      />

      {/* ==================== Main Content Area ==================== */}
      <div className="relative z-20 mx-auto -mt-8 max-w-7xl px-4 pb-20 sm:-mt-10 md:-mt-12 lg:-mt-14">
        {/* Search Bar - floats over hero */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <Searchbar
            onSearch={handleSearch}
            hidePadding
            buttonLabel="Find Talent"
            placeholder={{
              search: 'Candidate Name, Skills, or Keywords',
              location: 'City, State or ZIP',
            }}
          />
        </div>

        {/* ==================== Featured Profiles ==================== */}
        {featuredLoading ? (
          <FeaturedCandidatesSkeleton />
        ) : (
          featuredCandidates.length > 0 && (
            <section className="mb-8 sm:mb-10 lg:mb-14">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="text-primary h-5.5 w-5.5 shrink-0" />
                  <h2 className="text-foreground text-xl font-bold tracking-tight">
                    Featured Profiles
                  </h2>
                </div>

                {/* Custom Navigation Buttons */}
                {featuredCandidates.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="featured-candidates-prev border-border/40 hover:bg-primary/5 hover:text-primary h-8 w-8 cursor-pointer rounded-full p-0 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="featured-candidates-next border-border/40 hover:bg-primary/5 hover:text-primary h-8 w-8 cursor-pointer rounded-full p-0 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                speed={800}
                grabCursor={true}
                loop={featuredCandidates.length > 3}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  nextEl: '.featured-candidates-next',
                  prevEl: '.featured-candidates-prev',
                }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="w-full py-4"
              >
                {featuredCandidates.map((candidate: any, index: number) => (
                  <SwiperSlide key={candidate.id || index} className="h-auto">
                    {renderFeaturedCard(candidate, index)}
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          )
        )}

        {/* ==================== Main Listing Grid/List with Sidebar ==================== */}
        <section ref={resultsRef} className="border-border/30 border-t pt-8 sm:pt-10 lg:pt-12">
          {/* Header Row */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <Users className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-foreground text-base font-extrabold tracking-tight sm:text-xl lg:text-2xl">
                  {data?.meta?.total || 0} Candidates Found
                </h2>
                <p className="text-muted-foreground mt-0.5 text-[11px] leading-tight font-medium sm:text-sm">
                  Browse and connect with top industry experts
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-2.5 border-t border-gray-100/80 pt-3 sm:w-auto sm:justify-end sm:border-0 sm:pt-0 dark:border-slate-800/80">
              <div className="lg:hidden">
                <CandidateMobileSidebar onFiltersChange={handleFiltersChange} />
              </div>
              <ViewToggle viewType={viewType} onViewChange={setViewType} />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Sidebar - only show on desktop */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24 hidden lg:block">
                <CandidateSidebarFilter onFiltersChange={handleFiltersChange} className="w-full" />
              </div>
            </div>

            {/* Candidates List / Grid */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-9">
              <InfiniteScroll
                dataLength={allCandidates.length}
                next={loadMore}
                hasMore={data?.meta ? currentPage < data.meta.pages : false}
                loader={
                  <div
                    className={
                      viewType === 'grid'
                        ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                        : 'flex flex-col gap-5'
                    }
                  >
                    {[...Array(3)].map((_, i) => (
                      <CandidateCardSkeleton key={`loader-${i}`} viewType={viewType} />
                    ))}
                  </div>
                }
                endMessage={
                  <p className="text-muted-foreground py-8 text-center font-medium italic">
                    {allCandidates.length > 0 ? "You've reached the end of the list" : ''}
                  </p>
                }
              >
                <div
                  className={
                    viewType === 'grid'
                      ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                      : 'flex flex-col gap-5'
                  }
                >
                  {isLoading &&
                    currentPage === 1 &&
                    [...Array(viewType === 'grid' ? 12 : 6)].map((_, index) => (
                      <CandidateCardSkeleton key={index} viewType={viewType} />
                    ))}

                  {error && (
                    <div className="text-destructive py-20 text-center font-bold">
                      Something went wrong, please try again later.
                    </div>
                  )}

                  {allCandidates.length === 0 && !isLoading && !error && (
                    <div className="bg-card rounded-2xl border border-dashed py-32 text-center font-medium opacity-50">
                      No candidates found matching your criteria.
                    </div>
                  )}

                  {allCandidates.map((candidate: any, index: number) => {
                    const delay = viewType === 'grid' ? (index % 3) * 0.06 : 0;
                    return (
                      <Suspense
                        key={candidate?.id}
                        fallback={<CandidateCardSkeleton viewType={viewType} />}
                      >
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: false, margin: '0px 0px -100px 0px', amount: 0.05 }}
                          transition={{
                            duration: 0.45,
                            delay,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <CandidateCard candidate={candidate} viewType={viewType} />
                        </motion.div>
                      </Suspense>
                    );
                  })}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrowseCandidatesView;
