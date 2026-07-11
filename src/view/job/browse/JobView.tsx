/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FeaturedJobsSlider from '../../../components/main/jobs/FeaturedJobsSlider';
import Industries from '../../../components/main/jobs/Industries';
import JobCard from '../../../components/main/jobs/JobCard';
import Searchbar from '../../../components/main/jobs/Searchbar';
import Sidebar from '../../../components/main/jobs/Sidebar';
import SidebarFilter from '../../../components/main/jobs/filter/SidebarFilter';
import PageHero from '../../../components/shared/PageHero';
import ViewToggle from '../../../components/shared/ViewToggle';
import { useGetCategoriesQuery } from '../../../redux/feature/category/categoryApi';
import { useGetJobsQuery } from '../../../redux/feature/job/jobApi';
import JobCardSkeleton from '../../../skeleton/job/browse/JobCardSkeleton';

type Filters = {
  search: string;
  location: string;
  budgetRange: [number, number];
  jobType: string;
  experienceLevel: string;
  skills: string[];
  postedWithin: string;
  isRemote?: boolean;
  categories?: (string | number)[];
};

const DEFAULT_FILTERS: Filters = {
  search: '',
  location: '',
  budgetRange: [0, 10000],
  jobType: '',
  experienceLevel: '',
  skills: [],
  postedWithin: '',
  isRemote: undefined,
  categories: [],
};

const CATEGORY_MAP: Record<number, string> = {
  1: 'Software Development',
  2: 'Healthcare',
  3: 'Finance',
  4: 'Marketing',
  5: 'Design',
  6: 'Sales',
  7: 'Education',
  8: 'Remote',
};

const JobView = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [viewType, setViewType] = useState<'grid' | 'list'>('list');

  const searchParams = useSearchParams();

  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery(undefined);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const category = searchParams.get('category') || '';
    const industry = searchParams.get('industry') || '';

    if (search || location || category || industry) {
      setFilters((prev) => {
        const updated = { ...prev };
        if (search) updated.search = search;
        if (location) updated.location = location;

        const targetCategoryName = category || industry;
        if (targetCategoryName && categories?.data) {
          const matchedCategory = categories.data.find(
            (c: any) =>
              c.name.toLowerCase() === targetCategoryName.toLowerCase() ||
              c.slug.toLowerCase() === targetCategoryName.toLowerCase(),
          );
          if (matchedCategory) {
            updated.categories = [matchedCategory.id];
          } else {
            // Fallback to static mapping if not found in backend categories
            const catId = Object.keys(CATEGORY_MAP).find(
              (key) => CATEGORY_MAP[Number(key)].toLowerCase() === targetCategoryName.toLowerCase(),
            );
            if (catId) {
              updated.categories = [Number(catId)];
            }
          }
        }
        return updated;
      });
      setCurrentPage(1);
      setAllJobs([]);
    }
  }, [searchParams, categories?.data]);

  const params = useMemo(() => {
    const p: any = {
      page: currentPage,
      limit: 12, // Increased limit for grid
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    if (filters.search) p.search = filters.search;
    if (filters.location) p.location = filters.location;
    if (filters.jobType) p.jobType = filters.jobType;
    if (filters.experienceLevel) p.experienceLevel = filters.experienceLevel;
    if (filters.postedWithin) p.postedWithin = filters.postedWithin;
    if (filters.isRemote !== undefined) p.isRemote = filters.isRemote;
    if (filters.skills.length > 0) p.skills = filters.skills.join(',');

    if (filters.categories && filters.categories.length > 0) {
      const industries = filters.categories
        .map((catId) => {
          // Look up matched category in loaded backend categories first
          const matched = categories?.data?.find((c: any) => String(c.id) === String(catId));
          if (matched) return matched.name;

          // Fallback to static mapping
          return CATEGORY_MAP[Number(catId)];
        })
        .filter(Boolean);
      if (industries.length > 0) {
        p.industry = industries.join(',');
      }
    }

    if (filters.budgetRange[0] > 0) p.salaryMin = filters.budgetRange[0];
    if (filters.budgetRange[1] < 10000) p.salaryMax = filters.budgetRange[1];

    return p;
  }, [filters, currentPage, categories?.data]);

  const { data, isLoading, error } = useGetJobsQuery(params);

  // Fetch premium/featured jobs for the slider directly from the backend
  const { data: featuredData, isLoading: featuredLoading } = useGetJobsQuery({
    isFeatured: true,
    limit: 6,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const featuredJobs = useMemo(() => {
    return featuredData?.data || [];
  }, [featuredData]);

  useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllJobs(data.data);
      } else {
        setAllJobs((prev) => {
          const combined = [...prev, ...data.data];
          return combined.filter(
            (job, index, self) => self.findIndex((j) => j.id === job.id) === index,
          );
        });
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
    setAllJobs([]);
  };

  const loadMore = () => {
    if (data?.meta && currentPage < data.meta.pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setAllJobs([]);
  };

  const handleCategorySelect = (selectedCategoryIds: (string | number)[]) => {
    setFilters((prev) => ({
      ...prev,
      categories: selectedCategoryIds,
    }));
    setCurrentPage(1);
    setAllJobs([]);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Find Your Next Job"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Find Jobs' }]}
        backgroundImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=40"
      />

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto -mt-8 max-w-7xl px-4 pb-20 sm:-mt-10 md:-mt-12 lg:-mt-14">
        {/* Search Bar - floats over hero */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <Searchbar onSearch={handleSearch} hidePadding />
        </div>

        {/* Featured Elite Opportunities Slider */}
        <section className="mb-8 sm:mb-10 lg:mb-14">
          <FeaturedJobsSlider jobs={featuredJobs} isLoading={featuredLoading} />
        </section>

        {/* Popular Industries */}
        <section className="mb-8 sm:mb-10 lg:mb-14">
          <Industries
            onCategorySelect={handleCategorySelect}
            multipleSelect={false}
            categories={categories?.data}
            isLoading={categoriesLoading}
          />
        </section>

        {/* Main Job Listing Grid/List with Sidebar */}
        <section className="border-border/30 border-t pt-8 sm:pt-10 lg:pt-12">
          {/* Header Row */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div>
              <h2 className="text-foreground text-lg font-extrabold tracking-tight sm:text-xl lg:text-2xl">
                {data?.meta?.total || 0} Jobs Found
              </h2>
              <p className="text-muted-foreground mt-0.5 text-xs font-medium sm:text-sm">
                Explore matching career opportunities
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <div className="lg:hidden">
                <Sidebar onFiltersChange={handleFiltersChange} />
              </div>
              <ViewToggle viewType={viewType} onViewChange={setViewType} />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Sidebar - only show on desktop */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24 hidden lg:block">
                <SidebarFilter onFiltersChange={handleFiltersChange} className="w-full" />
              </div>
            </div>

            {/* Jobs List / Grid */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-9">
              <InfiniteScroll
                dataLength={allJobs.length}
                next={loadMore}
                hasMore={data?.meta ? currentPage < data.meta.pages : false}
                loader={
                  <div
                    className={
                      viewType === 'grid'
                        ? 'grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-3'
                        : 'flex flex-col gap-3 sm:gap-3.5 lg:gap-4'
                    }
                  >
                    {[...Array(3)].map((_, i) => (
                      <JobCardSkeleton key={`loader-${i}`} />
                    ))}
                  </div>
                }
                endMessage={
                  <p className="text-muted-foreground py-8 text-center font-medium italic">
                    {allJobs.length > 0 ? "You've reached the end of the list" : ''}
                  </p>
                }
              >
                <div
                  className={
                    viewType === 'grid'
                      ? 'grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-3'
                      : 'flex flex-col gap-3 sm:gap-3.5 lg:gap-4'
                  }
                >
                  {isLoading &&
                    currentPage === 1 &&
                    [...Array(viewType === 'grid' ? 12 : 6)].map((_, index) => (
                      <JobCardSkeleton key={index} />
                    ))}

                  {error && (
                    <div className="text-destructive py-20 text-center font-bold">
                      Something went wrong, please try again later.
                    </div>
                  )}

                  {allJobs.length === 0 && !isLoading && !error && (
                    <div className="py-20 text-center font-medium opacity-50">No jobs found.</div>
                  )}

                  {allJobs.map((job: any, index: number) => {
                    const delay = viewType === 'grid' ? (index % 3) * 0.06 : 0;
                    return (
                      <Suspense key={job?.id} fallback={<JobCardSkeleton />}>
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: false, margin: '0px 0px -100px 0px', amount: 0.05 }}
                          transition={{
                            duration: 0.45,
                            delay,
                            ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
                          }}
                        >
                          <JobCard job={job} viewType={viewType} />
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

export default JobView;
