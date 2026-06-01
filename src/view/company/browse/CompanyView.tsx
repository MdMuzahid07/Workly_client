/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BadgeCheck,
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
import ViewToggle from "../../../components/shared/ViewToggle";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CompanyCard from "../../../components/main/company/CompanyCard";
import CompanyFilter from "../../../components/main/company/CompanyFilter";
import Searchbar from "../../../components/main/jobs/Searchbar";
import { useGetCompaniesQuery } from "../../../redux/feature/company/companyApi";
import CompanyCardSkeleton from "../../../skeleton/company/browse/CompanyCardSkeleton";

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

  // Sync state when props change (initial load or filter change)
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
    // Skip fetching the first page if we already have initialCompanies from the server
    skip: currentPage === 1 && !!initialCompanies,
  });

  // Fetch featured / verified companies
  const { data: featuredData } = useGetCompaniesQuery({
    isVerified: true,
    limit: 6,
  });

  const featuredCompanies = useMemo(() => {
    const list = featuredData?.data?.result || featuredData?.data || [];
    if (list.length >= 2) return list;
    // Fallback to first few from the general list
    return allCompanies.slice(0, 6);
  }, [featuredData, allCompanies]);

  useEffect(() => {
    if (data?.data && currentPage > 1) {
      setAllCompanies((prev) => [...prev, ...data.data]);
    }
  }, [data, currentPage]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(name, value);
      else params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = (searchData: { search: string; location: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchData.search) params.set("q", searchData.search);
    else params.delete("q");

    if (searchData.location) params.set("location", searchData.location);
    else params.delete("location");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("industry", value)}`);
  };

  const loadMoreCompanies = () => {
    if (data?.meta && currentPage < data.meta.pages) {
      setCurrentPage((prev) => prev + 1);
    } else if (!data && initialCompanies && initialCompanies.length === limit) {
      // If we only have initial data and haven't fetched more yet
      setCurrentPage(2);
    }
  };

  const hasMoreCompanies = data?.meta
    ? currentPage < data.meta.pages
    : initialCompanies?.length === limit;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[250px] w-full overflow-hidden bg-slate-900 md:h-[300px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=40"
            alt="Commercial buildings"
            className="h-full w-full object-cover opacity-30 grayscale"
            width={1440}
            height={300}
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Explore Top Companies
          </h1>

          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">Companies</span>
          </nav>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 pb-20">
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

        {/* Featured Partners Section */}
        {featuredCompanies.length > 0 && (
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-2">
              <Crown className="text-primary h-5.5 w-5.5 shrink-0" />
              <h2 className="text-foreground text-xl font-bold tracking-tight">
                Featured Partners
              </h2>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={featuredCompanies.length > 2}
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
              {featuredCompanies.map((company: any, index: number) => {
                const logoBgOptions = [
                  "bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
                  "bg-pink-600/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400",
                  "bg-purple-600/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
                  "bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
                ];
                const randomBg = logoBgOptions[index % logoBgOptions.length];
                const initial = company.name
                  ? company.name[0].toUpperCase()
                  : "C";

                return (
                  <SwiperSlide key={company.id || index} className="h-auto">
                    <div
                      onClick={() => router.push(`/companies/${company.slug}`)}
                      className="group hover:border-primary/50 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50"
                    >
                      <div className="relative z-10 flex-1 space-y-4">
                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {company.logoUrl ? (
                              <div className="border-border/30 relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-white p-1 shadow-sm dark:bg-slate-800">
                                <Image
                                  src={company.logoUrl}
                                  alt={`${company.name} logo`}
                                  fill
                                  sizes="48px"
                                  className="object-contain p-1"
                                  loading="lazy"
                                />
                              </div>
                            ) : (
                              <div
                                className={`ring-primary/5 border-background flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-lg font-black shadow-xs ring-2 transition-all duration-300 ${randomBg}`}
                              >
                                {initial}
                              </div>
                            )}
                            <div className="min-w-0">
                              <h4 className="text-foreground flex items-center gap-1 truncate text-sm font-bold tracking-tight">
                                {company.name}
                                {company.isVerified && (
                                  <BadgeCheck className="text-primary fill-primary/10 h-4 w-4 shrink-0" />
                                )}
                              </h4>
                              <span className="text-primary mt-0.5 block text-[11px] font-bold">
                                {company.industry?.name || "Verified Partner"}
                              </span>
                            </div>
                          </div>

                          {/* Top-Right Arrow Action */}
                          <div className="text-muted-foreground/50 group-hover:text-primary p-1 transition-colors duration-300">
                            <ArrowUpRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground/80 line-clamp-2 text-xs leading-relaxed">
                          {company.description ||
                            "Building powerful and innovative digital solutions."}
                        </p>

                        {/* Bullet Divided Metadata Row (LinkedIn/Google style - Extremely Clean) */}
                        <div className="text-muted-foreground/90 border-border/40 flex flex-wrap items-center gap-x-2 gap-y-1 border-t pt-4 text-xs font-semibold">
                          <span className="flex items-center gap-1">
                            <MapPin className="text-primary/60 h-3.5 w-3.5" />
                            {company.location || "Remote"}
                          </span>
                          <span className="text-muted-foreground/30">•</span>
                          <span className="flex items-center gap-1">
                            <Users className="text-primary/60 h-3.5 w-3.5" />
                            {company.size || "11-50"} employees
                          </span>
                          <span className="text-muted-foreground/30">•</span>
                          {company.openJobs > 0 ? (
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {company.openJobs} Openings
                            </span>
                          ) : company.openJobs === 0 ? (
                            <span className="text-muted-foreground/60 font-semibold">
                              No Openings
                            </span>
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
          </div>
        )}

        {/* All Companies Section */}
        <div className="border-border/40 mt-16 border-t pt-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-foreground text-2xl font-extrabold tracking-tight">
                All Companies
              </h2>
              <p className="text-muted-foreground mt-1 text-sm font-medium">
                Showing {allCompanies.length} of{" "}
                {data?.meta?.total || allCompanies.length} companies
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <CompanyFilter
                selectedFilter={currentIndustry}
                onFilterChange={handleFilterChange}
              />

              <ViewToggle
                viewType={viewType}
                onViewChange={setViewType}
                className="self-start sm:self-auto"
              />
            </div>
          </div>

          <main className="mt-10">
            <InfiniteScroll
              dataLength={allCompanies.length}
              next={loadMoreCompanies}
              hasMore={hasMoreCompanies}
              loader={
                <div
                  className={
                    viewType === "grid"
                      ? "mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      : "mt-6 flex flex-col gap-5"
                  }
                >
                  {[...Array(3)].map((_, index) => (
                    <CompanyCardSkeleton key={`loading-${index}`} />
                  ))}
                </div>
              }
              scrollThreshold={0.8}
              style={{ overflow: "visible" }}
            >
              <div
                className={
                  viewType === "grid"
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "flex flex-col gap-5"
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
                  [...Array(viewType === "grid" ? 12 : 6)].map((_, index) => (
                    <CompanyCardSkeleton key={index} />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center font-medium opacity-50">
                    No companies found matching your criteria.
                  </div>
                )}
              </div>
            </InfiniteScroll>

            {hasMoreCompanies && (
              <div className="mt-16 border-t border-gray-50 pt-16 text-center dark:border-slate-800">
                <Button
                  variant="default"
                  size="lg"
                  className="shadow-primary/20 transform rounded-full px-12 font-bold shadow-xl transition-all hover:scale-105"
                  onClick={loadMoreCompanies}
                >
                  Load More Companies
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
