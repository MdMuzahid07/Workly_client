/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CandidateCard from "../../components/main/candidates/CandidateCard";
import CandidateSidebarFilter from "../../components/main/candidates/filter/CandidateSidebarFilter";
import Searchbar from "../../components/main/jobs/Searchbar";
import Sidebar from "../../components/main/jobs/Sidebar";
import PageHero from "../../components/shared/PageHero";
import ViewToggle from "../../components/shared/ViewToggle";
import { useGetCandidatesQuery } from "../../redux/feature/candidate/candidateApi";
import CandidateCardSkeleton from "../../skeleton/candidate/CandidateCardSkeleton";

type Filters = {
  search: string;
  location: string;
  experienceRange: [number, number];
  industry: string;
  skills: string[];
};

const DEFAULT_FILTERS: Filters = {
  search: "",
  location: "",
  experienceRange: [0, 30],
  industry: "",
  skills: [],
};

const BrowseCandidatesView = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [allCandidates, setAllCandidates] = useState<any[]>([]);
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  const params = useMemo(() => {
    const p: any = {
      page: currentPage,
      limit: 12,
      sortBy: "fullName",
      sortOrder: "desc",
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
    if (filters.skills.length > 0) p.skills = filters.skills.join(",");

    return p;
  }, [filters, currentPage]);

  const router = useRouter();

  const { data, isLoading, error } = useGetCandidatesQuery(params);

  // Fetch featured / top candidates
  const { data: featuredData } = useGetCandidatesQuery({
    limit: 6,
    sortBy: "fullName",
    sortOrder: "desc",
  });

  const featuredCandidates = useMemo(() => {
    const list = featuredData?.data || [];
    if (list.length >= 2) return list;
    return allCandidates.slice(0, 6);
  }, [featuredData, allCandidates]);

  console.log("Candidates Data:", data);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderFeaturedCard = (candidate: any, index?: number) => {
    const initials = candidate.fullName
      ? candidate.fullName
          .split(" ")
          .filter(Boolean)
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "C";

    const isPlaceholderAvatar =
      !candidate.profile?.avatarUrl ||
      candidate.profile.avatarUrl.includes("placeholder") ||
      !candidate.profile.avatarUrl.startsWith("http");

    const rawHeadline = candidate.profile?.headline || "";
    const displayHeadline =
      !rawHeadline || rawHeadline.toUpperCase() === "JOB_SEEKER"
        ? candidate.profile?.skills?.length
          ? `${candidate.profile.skills
              .map((s: any) => s.skillName)
              .slice(0, 2)
              .join(" & ")} Specialist`
          : "Verified Talent"
        : rawHeadline;

    const experienceText =
      candidate.profile?.totalExperienceYears !== undefined &&
      candidate.profile.totalExperienceYears > 0
        ? `${candidate.profile.totalExperienceYears} Yrs Exp`
        : "Entry-level Talent";

    return (
      <Card
        onClick={() => router.push(`/browse-candidates/${candidate.id}`)}
        className="group hover:border-primary/50 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50"
      >
        <div className="relative z-10 flex-1 space-y-4">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-50 p-0 dark:bg-slate-800">
                {!isPlaceholderAvatar ? (
                  <Image
                    src={candidate.profile.avatarUrl!}
                    alt={candidate.fullName}
                    fill
                    sizes="48px"
                    className="object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="bg-primary/5 text-primary border-primary/10 flex h-full w-full items-center justify-center rounded-xl border text-lg font-bold">
                    {initials}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-foreground flex items-center gap-1 truncate text-sm font-bold tracking-tight">
                  {candidate.fullName}
                  <BadgeCheck className="h-4 w-4 shrink-0 fill-emerald-500/10 text-emerald-500" />
                  {candidate.profile?.totalExperienceYears &&
                    candidate.profile.totalExperienceYears > 5 && (
                      <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                    )}
                </h4>
                <span className="text-muted-foreground block truncate text-[11px] font-semibold">
                  {displayHeadline}
                </span>
              </div>
            </div>

            {/* Top-Right Arrow Action */}
            <div className="text-muted-foreground/50 group-hover:text-primary p-1 transition-colors duration-300">
              <ArrowUpRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Bullet Divided Metadata Row (LinkedIn style) */}
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold">
            <span className="flex items-center gap-1">
              <MapPin className="text-primary/60 h-3.5 w-3.5" />
              {candidate.profile?.location || "Not specified"}
            </span>
            <span className="text-muted-foreground/30">•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="text-primary/60 h-3.5 w-3.5" />
              {experienceText}
            </span>
            {candidate.profile?.preference?.jobType && (
              <>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-primary font-bold">
                  {candidate.profile.preference.jobType.replace("_", " ")}
                </span>
              </>
            )}
          </div>

          {/* Skills Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {(candidate.profile?.skills?.slice(0, 3) || []).map(
              (skill: any) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="bg-primary/5 text-primary/95 border-primary/10 rounded-lg border px-2.5 py-1 text-[10px] font-extrabold tracking-wide uppercase transition-colors"
                >
                  {skill.skillName}
                </Badge>
              ),
            )}
            {!candidate.profile?.skills?.length && (
              <span className="text-muted-foreground text-[10px]">
                No skills listed
              </span>
            )}
          </div>
        </div>
      </Card>
    );
  };

  useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllCandidates(data.data);
      } else {
        setAllCandidates((prev) => [...prev, ...data.data]);
      }
    }
  }, [data, currentPage]);

  const handleSearch = (searchData: { search: string; location: string }) => {
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
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
    setAllCandidates([]);
  };

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        title="Discover Top Talent"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Browse Candidates" },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1400&auto=format&fit=crop"
      />

      <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 pb-20 sm:-mt-10">
        <Searchbar onSearch={handleSearch} hidePadding />

        {/* Featured Profiles Section */}
        {featuredCandidates.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 flex items-center gap-2">
              <Users className="text-primary h-5.5 w-5.5 shrink-0" />
              <h2 className="text-foreground text-xl font-bold tracking-tight">
                Featured Profiles
              </h2>
            </div>

            {featuredCandidates.length < 2 ? (
              <div className="grid w-full grid-cols-1 gap-5 py-4 md:grid-cols-2">
                {featuredCandidates.map((candidate: any, index: number) =>
                  renderFeaturedCard(candidate, index),
                )}
              </div>
            ) : (
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={featuredCandidates.length > 2}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 2 },
                }}
                className="w-full py-4"
              >
                {featuredCandidates.map((candidate: any, index: number) => (
                  <SwiperSlide key={candidate.id || index} className="h-auto">
                    {renderFeaturedCard(candidate, index)}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        )}

        <div className="mt-8 mb-6 flex items-center justify-between sm:mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-foreground text-xl font-bold tracking-tight">
                {data?.meta?.total || 0} CANDIDATES FOUND
              </h2>
              <p className="text-muted-foreground text-xs font-medium">
                Browse and connect with top industry experts
              </p>
            </div>
          </div>

          <ViewToggle viewType={viewType} onViewChange={setViewType} />
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 hidden lg:block">
              {/* <ScrollArea className="dark:bg-foreground h-[calc(100vh-120px)] w-full overflow-hidden rounded-3xl border bg-white shadow-sm"> */}
              <CandidateSidebarFilter
                onFiltersChange={handleFiltersChange}
                className="w-full"
              />
              {/* </ScrollArea> */}
            </div>
            <div className="lg:hidden">
              <Sidebar onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <InfiniteScroll
              dataLength={allCandidates.length}
              next={loadMore}
              hasMore={data?.meta ? currentPage < data.meta.pages : false}
              loader={<CandidateCardSkeleton viewType={viewType} />}
              endMessage={
                <p className="text-muted-foreground py-8 text-center font-medium italic">
                  {allCandidates.length > 0
                    ? "You've seen all available candidates"
                    : ""}
                </p>
              }
            >
              <div
                className={
                  viewType === "grid"
                    ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-5"
                }
              >
                {isLoading &&
                  currentPage === 1 &&
                  [...Array(viewType === "grid" ? 12 : 6)].map((_, index) => (
                    <CandidateCardSkeleton key={index} viewType={viewType} />
                  ))}

                {error && (
                  <div className="text-destructive py-20 text-center font-bold">
                    Something went wrong, please try again later.
                  </div>
                )}

                {allCandidates.length === 0 && !isLoading && !error && (
                  <div className="bg-card rounded-3xl border border-dashed py-32 text-center font-medium opacity-50">
                    No candidates found matching your criteria.
                  </div>
                )}

                {allCandidates.map((candidate: any) => (
                  <Suspense
                    key={candidate?.id}
                    fallback={<CandidateCardSkeleton viewType={viewType} />}
                  >
                    <CandidateCard candidate={candidate} viewType={viewType} />
                  </Suspense>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCandidatesView;
