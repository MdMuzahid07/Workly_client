"use client";

import DashboardSavedJobsHeader from "@/components/dashboard/dashboard-nav/header/DashboardSavedJobsHeader";
import PaginationBar from "@/components/shared/PaginationBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetSavedJobsQuery } from "@/redux/feature/profile/profileApi";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, FilterX, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import JobCard from "../../components/main/jobs/JobCard";
import StatsCards from "../../components/main/saved-jobs/StatsCards";

import SavedJobsViewSkeleton, {
  SavedJobCardSkeleton,
} from "@/skeleton/saved-jobs/SavedJobsViewSkeleton";

const SavedJobsView = () => {
  // Query States
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState("10");

  const [activeTab, setActiveTab] = useState("ACTIVE");

  // Debounce search term to optimize backend query performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // RTK Query
  const { data: savedJobsRes, isLoading } = useGetSavedJobsQuery({
    page: currentPage,
    limit: parseInt(limit),
    searchTerm: debouncedSearch || undefined,
    company: selectedCompany !== "all" ? selectedCompany : undefined,
    status: activeTab,
  });

  const meta = savedJobsRes?.meta || {
    page: 1,
    limit: parseInt(limit),
    total: 0,
    totalPages: 1,
    companies: [],
    expiringSoonCount: 0,
  };

  const jobs = useMemo(() => {
    const rawSavedJobs = savedJobsRes?.data || [];
    return rawSavedJobs.map((sj) => ({
      ...sj.job,
      company: {
        name: sj.job.company.name,
        logo: sj.job.company.logo || sj.job.company.logoUrl,
      },
    }));
  }, [savedJobsRes?.data]);

  const companies = useMemo(() => {
    return ["all", ...(meta.companies || [])];
  }, [meta.companies]);

  const paginationMeta = {
    page: meta.page,
    limit: meta.limit,
    total: meta.total,
    pages: meta.totalPages,
  };

  const stats = useMemo(() => {
    return {
      total: meta.total,
      expiring: meta.expiringSoonCount || 0,
    };
  }, [meta.total, meta.expiringSoonCount]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCompany("all");
    setCurrentPage(1);
  };

  if (isLoading && !savedJobsRes) {
    return <SavedJobsViewSkeleton />;
  }

  return (
    <div className="min-h-screen pt-8">
      <DashboardSavedJobsHeader />

      <div className="space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
        <StatsCards totalSaved={stats.total} expiringSoon={stats.expiring} />

        {/* Filter Bar */}
        <Card className="bg-card rounded-2xl border">
          <CardContent className="flex flex-col gap-3 p-3.5 sm:p-4 md:flex-row md:items-center md:justify-between">
            <div className="group relative w-full max-w-md flex-1">
              <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
              <Input
                placeholder="Search job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-muted/20 border-border focus:bg-background h-9 rounded-full pl-9 text-xs transition-all sm:h-10 sm:text-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Select
                value={selectedCompany}
                onValueChange={(val) => {
                  setSelectedCompany(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="border-border h-8 w-auto cursor-pointer rounded-full text-xs font-semibold sm:h-10 sm:text-sm">
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {companies.map((c) => (
                    <SelectItem
                      className="cursor-pointer rounded-lg"
                      key={c}
                      value={c}
                    >
                      {c === "all" ? "All Companies" : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="hover:bg-destructive/5 hover:text-destructive h-8 cursor-pointer rounded-full px-3 text-xs font-bold transition-colors sm:h-10 sm:px-4 sm:text-sm"
                disabled={searchTerm === "" && selectedCompany === "all"}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs System */}
        <Tabs
          defaultValue="ACTIVE"
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val);
            setCurrentPage(1);
          }}
          className="w-full space-y-6"
        >
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/20 h-10 rounded-full border p-0">
              <TabsTrigger
                value="ACTIVE"
                className="data-[state=active]:bg-primary/10 h-9 rounded-full px-6 font-bold"
              >
                Active
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary ml-2 border-none"
                >
                  {activeTab === "ACTIVE" ? meta.total : 0}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="CLOSED"
                className="data-[state=active]:bg-primary/10 h-9 rounded-full px-6 font-bold"
              >
                Closed
                <Badge
                  variant="secondary"
                  className="bg-muted/50 text-muted-foreground ml-2 border-none text-[10px]"
                >
                  {activeTab === "CLOSED" ? meta.total : 0}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Limit:
              </span>
              <Select
                value={limit}
                onValueChange={(val) => {
                  setLimit(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="border-border h-8 w-[70px] cursor-pointer rounded-full text-xs font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem className="cursor-pointer rounded-lg" value="10">
                    10
                  </SelectItem>
                  <SelectItem className="cursor-pointer rounded-lg" value="20">
                    20
                  </SelectItem>
                  <SelectItem className="cursor-pointer rounded-lg" value="50">
                    50
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="ACTIVE" className="mt-0 focus-visible:ring-0">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SavedJobCardSkeleton key={i} />
                  ))}
                </div>
              ) : jobs.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-4"
                >
                  {jobs.map((job) => (
                    <JobCard
                      inDashboard={true}
                      key={job.id}
                      job={{ ...job, isSaved: true }}
                      viewType="list"
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-xl border border-dashed py-24 text-center"
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="bg-muted/20 rounded-full p-8">
                      <Bookmark className="text-muted-foreground/30 h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-black tracking-tight">
                        No saved jobs here
                      </p>
                      <p className="text-muted-foreground mx-auto max-w-xs text-xs font-medium">
                        Start exploring and save jobs that catch your eye to
                        keep track of them.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="h-11 rounded-xl px-6 font-bold"
                    >
                      Browse Jobs
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {meta.totalPages > 1 && (
              <div className="mt-8 border-t pt-6">
                <PaginationBar
                  meta={paginationMeta}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="CLOSED" className="mt-0 focus-visible:ring-0">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 opacity-75">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SavedJobCardSkeleton key={i} />
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 opacity-75">
                {jobs.map((job) => (
                  <JobCard
                    inDashboard={true}
                    key={job.id}
                    job={{ ...job, isSaved: true }}
                    viewType="list"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-muted/5 rounded-xl border border-dashed py-24 text-center">
                <div className="flex flex-col items-center gap-4">
                  <FilterX className="text-muted-foreground/20 h-12 w-12" />
                  <p className="text-muted-foreground font-medium">
                    No expired or closed jobs in your list
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SavedJobsView;
