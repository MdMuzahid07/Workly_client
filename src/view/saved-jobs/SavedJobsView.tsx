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
import { mockSavedJobs } from "@/data/mockSavedJobs";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, FilterX, Search } from "lucide-react";
import { useMemo, useState } from "react";
import JobCard from "../../components/main/jobs/JobCard";
import StatsCards from "../../components/main/saved-jobs/StatsCards";

const SavedJobsView = () => {
  // Query States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState("10");

  // Derive data from mock
  const jobs = mockSavedJobs.map((sj) => sj.job);

  const companies = useMemo(() => {
    return ["all", ...Array.from(new Set(jobs.map((j) => j.company.name)))];
  }, [jobs]);

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany =
        selectedCompany === "all" || job.company.name === selectedCompany;
      return matchesSearch && matchesCompany;
    });
  }, [jobs, searchTerm, selectedCompany]);

  const activeJobs = filteredJobs.filter((j) => j.isActive);
  const closedJobs = filteredJobs.filter((j) => !j.isActive);

  // Pagination Logic (Mock)
  const jobsLimit = parseInt(limit);
  const totalResults = activeJobs.length; // Focus pagination on active for demo
  const totalPages = Math.ceil(totalResults / jobsLimit);

  const paginationMeta = {
    page: currentPage,
    limit: jobsLimit,
    total: totalResults,
    pages: totalPages,
  };

  const pagedActiveJobs = useMemo(() => {
    const start = (currentPage - 1) * jobsLimit;
    return activeJobs.slice(start, start + jobsLimit);
  }, [activeJobs, currentPage, jobsLimit]);

  const stats = useMemo(() => {
    return {
      total: jobs.length,
      expiring: jobs.filter((job) => {
        const deadline = new Date(job.applicationDeadline);
        const diff = deadline.getTime() - Date.now();
        return diff > 0 && diff < 7 * 86400000;
      }).length,
    };
  }, [jobs]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCompany("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen pt-16">
      <DashboardSavedJobsHeader />

      <div className="container mx-auto space-y-6 px-4 sm:px-6 sm:py-8">
        <StatsCards totalSaved={stats.total} expiringSoon={stats.expiring} />

        {/* Filter Bar */}
        <Card className="bg-card rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div className="group relative max-w-md flex-1">
              <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
              <Input
                placeholder="Search job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-muted/20 border-border/40 focus:bg-background h-11 rounded-xl pl-9 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={selectedCompany}
                onValueChange={setSelectedCompany}
              >
                <SelectTrigger className="h-10 w-[180px] rounded-xl font-semibold">
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {companies.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c === "all" ? "All Companies" : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="hover:bg-destructive/5 hover:text-destructive h-10 rounded-xl px-4 font-bold transition-colors"
                disabled={searchTerm === "" && selectedCompany === "all"}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs System */}
        <Tabs defaultValue="active" className="w-full space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/20 h-11 rounded-xl p-1">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-background h-9 rounded-lg px-6 font-bold data-[state=active]:shadow-sm"
              >
                Active
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary ml-2 border-none"
                >
                  {activeJobs.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="closed"
                className="data-[state=active]:bg-background h-9 rounded-lg px-6 font-bold data-[state=active]:shadow-sm"
              >
                Closed
                <Badge
                  variant="secondary"
                  className="bg-muted/50 text-muted-foreground ml-2 border-none text-[10px]"
                >
                  {closedJobs.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
                Limit:
              </span>
              <Select value={limit} onValueChange={setLimit}>
                <SelectTrigger className="border-muted/40 h-8 w-[70px] rounded-lg text-xs font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="active" className="mt-0 focus-visible:ring-0">
            <AnimatePresence mode="wait">
              {pagedActiveJobs.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-4"
                >
                  {pagedActiveJobs.map((job) => (
                    <JobCard key={job.id} job={job} viewType="list" />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-2xl border border-dashed py-24 text-center"
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

            {totalPages > 1 && (
              <div className="mt-8 border-t pt-6">
                <PaginationBar
                  meta={paginationMeta}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="closed" className="mt-0 focus-visible:ring-0">
            {closedJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 opacity-75">
                {closedJobs.map((job) => (
                  <JobCard key={job.id} job={job} viewType="list" />
                ))}
              </div>
            ) : (
              <div className="bg-muted/5 rounded-2xl border border-dashed py-24 text-center">
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
