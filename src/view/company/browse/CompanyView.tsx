/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Crown,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CompanyCard from "../../../components/main/company/CompanyCard";
import CompanyFilter from "../../../components/main/company/CompanyFilter";
import Searchbar from "../../../components/main/jobs/Searchbar";
import ViewToggle from "../../../components/shared/ViewToggle";
import { useGetCompaniesQuery } from "../../../redux/feature/company/companyApi";
import CompanyCardSkeleton from "../../../skeleton/company/browse/CompanyCardSkeleton";

/* ── Skeleton ───────────────────────────────────────────── */
const FeaturedCompaniesSkeleton = () => (
  <div className="mt-8 sm:mt-10 lg:mt-14">
    <div className="mb-4 flex items-center justify-between sm:mb-5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-36 rounded-md" />
      </div>
      <div className="flex items-center gap-1.5">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-10 w-10 rounded-xl sm:h-11 sm:w-11" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-4 w-4 rounded" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-full rounded-md" />
              <Skeleton className="h-3.5 w-4/5 rounded-md" />
            </div>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-3 dark:border-slate-800">
              <Skeleton className="h-3.5 w-16 rounded-md" />
              <Skeleton className="h-3.5 w-20 rounded-md" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

/* ── Main View ──────────────────────────────────────────── */
const CompanyView = ({
  companies: initialCompanies,
}: {
  companies?: any[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") || "";
  const currentLocation = searchParams.get("location") || "";
  const currentIndustry = searchParams.get("industry") || "";
  const currentSize = searchParams.get("size") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [allCompanies, setAllCompanies] = useState<any[]>(
    initialCompanies || [],
  );
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const limit = 12;

  useEffect(() => {
    if (initialCompanies) {
      setAllCompanies(initialCompanies);
      setCurrentPage(1);
    }
  }, [initialCompanies]);

  const params = useMemo(
    () => ({
      page: currentPage,
      limit,
      search: currentSearch,
      location: currentLocation,
      industry: currentIndustry,
      size: currentSize,
      sortBy: "createdAt",
      sortOrder: "desc",
    }),
    [currentPage, currentSearch, currentLocation, currentIndustry, currentSize],
  );

  const { data, isLoading } = useGetCompaniesQuery(params, {
    skip: currentPage === 1 && !!initialCompanies,
  });

  const { data: featuredData, isLoading: featuredLoading } =
    useGetCompaniesQuery({
      isVerified: true,
      limit: 6,
    });

  const featuredCompanies = useMemo(() => {
    const list = featuredData?.data?.result || featuredData?.data || [];
    if (list.length >= 2) return list;
    return allCompanies.slice(0, 6);
  }, [featuredData, allCompanies]);

  useEffect(() => {
    if (data?.data && currentPage > 1) {
      setAllCompanies((prev) => [...prev, ...data.data]);
    }
  }, [data, currentPage]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const p = new URLSearchParams(searchParams.toString());
      if (value) p.set(name, value);
      else p.delete(name);
      return p.toString();
    },
    [searchParams],
  );

  const handleSearch = (searchData: { search: string; location: string }) => {
    const p = new URLSearchParams(searchParams.toString());
    if (searchData.search) p.set("q", searchData.search);
    else p.delete("q");
    if (searchData.location) p.set("location", searchData.location);
    else p.delete("location");
    router.push(`${pathname}?${p.toString()}`);
  };

  const handleFilterChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("industry", value)}`);
  };

  const loadMoreCompanies = () => {
    if (data?.meta && currentPage < data.meta.pages) {
      setCurrentPage((prev) => prev + 1);
    } else if (!data && initialCompanies && initialCompanies.length === limit) {
      setCurrentPage(2);
    }
  };

  const hasMoreCompanies = data?.meta
    ? currentPage < data.meta.pages
    : initialCompanies?.length === limit;

  /* ── Render ─────────────────────────────────────────── */
  return (
    <div className="bg-background min-h-screen">
      {/* ── Hero Section ───────────────────────────────── */}
      <div className="relative h-[200px] w-full overflow-hidden bg-slate-950 sm:h-60 md:h-[280px] lg:h-80">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=40"
            alt="Commercial buildings"
            className="h-full w-full object-cover opacity-20 grayscale"
            width={1440}
            height={320}
            priority
          />
          <div className="to-primary/10 absolute inset-0 bg-linear-to-tr from-slate-950 via-slate-900/95" />
          <div className="bg-primary/6 absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full blur-[110px]" />
          <div className="bg-primary/6 absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full blur-[110px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Explore Top Companies
          </h1>
          <nav className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-xs">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-500" />
            <span className="text-white">Companies</span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────── */}
      <div className="relative z-20 mx-auto -mt-7 max-w-7xl px-4 pb-16 sm:-mt-9 sm:px-6 md:-mt-11 lg:-mt-13 lg:px-8">
        {/* Search Bar — floats over hero */}
        <Searchbar
          onSearch={handleSearch}
          initialSearch={currentSearch}
          initialLocation={currentLocation}
          buttonLabel="Find Company"
          hidePadding
          placeholder={{
            search: "Company Name or Keywords",
            location: "City or Country",
          }}
        />

        {/* ── Featured Partners ───────────────────────── */}
        {featuredLoading ? (
          <FeaturedCompaniesSkeleton />
        ) : (
          featuredCompanies.length > 0 && (
            <section className="mt-8 sm:mt-10 lg:mt-14">
              {/* Section Header */}
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <div className="flex items-center gap-2">
                  <Crown className="text-primary h-4.5 w-4.5 shrink-0 sm:h-5 sm:w-5" />
                  <h2 className="text-foreground text-base font-bold tracking-tight sm:text-lg lg:text-xl">
                    Featured Partners
                  </h2>
                </div>
                {featuredCompanies.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="featured-companies-prev border-border/40 hover:bg-primary/5 hover:text-primary h-8 w-8 cursor-pointer rounded-full p-0 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="featured-companies-next border-border/40 hover:bg-primary/5 hover:text-primary h-8 w-8 cursor-pointer rounded-full p-0 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Swiper */}
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={12}
                slidesPerView={1}
                speed={800}
                grabCursor
                loop={featuredCompanies.length > 3}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  nextEl: ".featured-companies-next",
                  prevEl: ".featured-companies-prev",
                }}
                breakpoints={{
                  480: { slidesPerView: 1.25, spaceBetween: 12 },
                  640: { slidesPerView: 2, spaceBetween: 14 },
                  1024: { slidesPerView: 3, spaceBetween: 18 },
                }}
                className="w-full pt-0.5 pb-1"
              >
                {featuredCompanies.map((company: any, index: number) => {
                  const bgOptions = [
                    "bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
                    "bg-pink-600/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400",
                    "bg-purple-600/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
                    "bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
                  ];
                  const randomBg = bgOptions[index % bgOptions.length];
                  const initial = company.name
                    ? company.name[0].toUpperCase()
                    : "C";

                  return (
                    <SwiperSlide key={company.id || index} className="h-auto">
                      <div
                        onClick={() =>
                          router.push(`/companies/${company.slug}`)
                        }
                        className="group hover:border-primary/50 relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:shadow-md sm:p-5 dark:border-slate-800 dark:bg-slate-900/50"
                      >
                        <div className="relative z-10 space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              {company.logoUrl ? (
                                <div className="border-border/30 relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border bg-white p-1 shadow-xs sm:h-11 sm:w-11 dark:bg-slate-800">
                                  <Image
                                    src={company.logoUrl}
                                    alt={`${company.name} logo`}
                                    fill
                                    sizes="44px"
                                    className="object-contain p-1"
                                    loading="lazy"
                                  />
                                </div>
                              ) : (
                                <div
                                  className={`border-background ring-primary/5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-base font-black shadow-xs ring-2 transition-all duration-300 sm:h-11 sm:w-11 ${randomBg}`}
                                >
                                  {initial}
                                </div>
                              )}
                              <div className="min-w-0">
                                <h4 className="text-foreground flex items-center gap-1 truncate text-sm font-bold">
                                  {company.name}
                                  {company.isVerified && (
                                    <BadgeCheck className="text-primary fill-primary/10 h-3.5 w-3.5 shrink-0" />
                                  )}
                                </h4>
                                <span className="text-primary mt-0.5 block text-[11px] font-bold">
                                  {company.industry?.name || "Verified Partner"}
                                </span>
                              </div>
                            </div>
                            <div className="text-muted-foreground/40 group-hover:text-primary shrink-0 pt-0.5 transition-colors duration-300">
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground/80 line-clamp-2 text-xs leading-relaxed">
                            {company.description ||
                              "Building powerful and innovative digital solutions."}
                          </p>

                          {/* Meta */}
                          <div className="text-muted-foreground/80 flex flex-wrap items-center gap-x-1.5 gap-y-1 border-t border-gray-100 pt-3 text-xs font-semibold dark:border-slate-800">
                            <span className="flex items-center gap-1">
                              <MapPin className="text-primary/60 h-3 w-3" />
                              {company.location || "Remote"}
                            </span>
                            <span className="opacity-30">•</span>
                            <span className="flex items-center gap-1">
                              <Users className="text-primary/60 h-3 w-3" />
                              {company.size || "11-50"} staff
                            </span>
                            <span className="opacity-30">•</span>
                            {company.openJobs > 0 ? (
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                {company.openJobs} Openings
                              </span>
                            ) : company.openJobs === 0 ? (
                              <span className="opacity-60">No Openings</span>
                            ) : (
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                Hiring Actively
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
          )
        )}

        {/* ── All Companies Section ───────────────────── */}
        <section className="border-border/30 mt-8 sm:mt-10 lg:mt-16">
          {/* Header row */}
          <div className="flex items-center justify-between gap-2.5">
            <div>
              <h2 className="text-foreground text-xl font-extrabold tracking-tight sm:text-2xl">
                All Companies
              </h2>
              <p className="text-muted-foreground mt-0.5 text-xs font-medium sm:text-sm">
                Showing {allCompanies.length} of{" "}
                {data?.meta?.total || allCompanies.length} companies
              </p>
            </div>
            <ViewToggle
              viewType={viewType}
              onViewChange={setViewType}
              className="self-start sm:self-auto"
            />
          </div>

          {/* Filter chips */}
          <div className="mt-4 pb-1 sm:mt-5">
            <CompanyFilter
              selectedFilter={currentIndustry}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Card grid */}
          <main className="mt-5 sm:mt-6 lg:mt-8">
            <InfiniteScroll
              dataLength={allCompanies.length}
              next={loadMoreCompanies}
              hasMore={hasMoreCompanies}
              loader={
                <div
                  className={
                    viewType === "grid"
                      ? "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
                      : "mt-3 flex flex-col gap-2.5 sm:gap-3"
                  }
                >
                  {[...Array(3)].map((_, i) => (
                    <CompanyCardSkeleton key={`loading-${i}`} />
                  ))}
                </div>
              }
              scrollThreshold={0.8}
              style={{ overflow: "visible" }}
            >
              <div
                className={
                  viewType === "grid"
                    ? "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
                    : "flex flex-col gap-2.5 sm:gap-3 lg:gap-4"
                }
              >
                {allCompanies.length > 0 ? (
                  allCompanies.map((company, index) => (
                    <CompanyCard
                      key={company.id || index}
                      company={{
                        ...company,
                        logo: company.logoUrl || company.logo,
                      }}
                      viewType={viewType}
                    />
                  ))
                ) : isLoading ? (
                  [...Array(viewType === "grid" ? 12 : 6)].map((_, i) => (
                    <CompanyCardSkeleton key={i} />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center font-medium opacity-50 sm:py-20">
                    No companies found matching your criteria.
                  </div>
                )}
              </div>
            </InfiniteScroll>

            {hasMoreCompanies && (
              <div className="mt-10 border-t border-gray-100 pt-8 text-center sm:mt-12 sm:pt-10 dark:border-slate-800">
                <Button
                  variant="default"
                  size="lg"
                  className="shadow-primary/20 rounded-full px-10 font-bold shadow-xl transition-all hover:scale-105 sm:px-12"
                  onClick={loadMoreCompanies}
                >
                  Load More Companies
                </Button>
              </div>
            )}
          </main>
        </section>
      </div>
    </div>
  );
};

export default CompanyView;
