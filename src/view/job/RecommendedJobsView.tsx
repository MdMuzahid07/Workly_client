"use client";

import DashboardRecommendedJobsHeader from "@/components/dashboard/dashboard-nav/header/DashboardRecommendedJobsHeader";
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
import { mockRecommendedJobs } from "@/data/mockRecommendedJobs";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, MapPin, Search, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const RecommendedJobsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState("10");

  const filteredJobs = useMemo(() => {
    return mockRecommendedJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const jobsLimit = parseInt(limit);
  const totalPages = Math.ceil(filteredJobs.length / jobsLimit);
  const pagedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsLimit,
    currentPage * jobsLimit,
  );

  const paginationMeta = {
    page: currentPage,
    limit: jobsLimit,
    total: filteredJobs.length,
    pages: totalPages,
  };

  return (
    <div className="min-h-screen pt-16">
      <DashboardRecommendedJobsHeader />

      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="from-primary/10 via-background relative overflow-hidden rounded-xl border bg-linear-to-br to-amber-500/5 p-6 sm:p-8"
        >
          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-3">
              <div className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                AI-Powered Matching
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Tailored just for you.
              </h2>
              <p className="text-muted-foreground max-w-md text-sm font-medium opacity-80">
                Our algorithm analyzes your skills, preferences, and career path
                to surface the most relevant opportunities.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-card/50 flex min-w-[100px] flex-col items-center rounded-xl border p-4 backdrop-blur-sm">
                <span className="text-primary text-2xl font-black">98%</span>
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Top Match
                </span>
              </div>
            </div>
          </div>
          {/* Background Decoration */}
          <div className="bg-primary/10 absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full opacity-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-amber-500/10 opacity-50 blur-3xl" />
        </motion.div>

        {/* Filter Bar */}
        <Card className="bg-card rounded-xl border">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div className="group relative max-w-md flex-1">
              <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
              <Input
                placeholder="Search recommended roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-muted/20 border-border focus:bg-background h-11 rounded-full pl-9 transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
                Show:
              </span>
              <Select value={limit} onValueChange={setLimit}>
                <SelectTrigger className="w-20px bg-muted/20 border-border h-10 cursor-pointer rounded-full font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem className="cursor-pointer rounded-lg" value="10">
                    10
                  </SelectItem>
                  <SelectItem className="cursor-pointer rounded-lg" value="20">
                    20
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {pagedJobs.length > 0 ? (
              pagedJobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <RecommendedJobCard job={job} />
                </motion.div>
              ))
            ) : (
              <div className="bg-card flex flex-col items-center gap-4 rounded-xl border-2 border-dashed py-24 text-center">
                <div className="bg-muted/20 rounded-full p-6">
                  <Search className="text-muted-foreground/20 h-10 w-10" />
                </div>
                <p className="text-muted-foreground text-sm font-bold italic">
                  No recommendations match your search.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="border-t pt-6">
            <PaginationBar
              meta={paginationMeta}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RecommendedJobCard = ({ job }: { job: any }) => (
  <Card className="group bg-card relative overflow-hidden rounded-xl border transition-all">
    <CardContent className="p-5 sm:p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* Company Logo */}
        <div className="bg-muted/30 ring-border/50 relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl p-3 ring-1 md:h-20 md:w-20">
          {job.company.logo ? (
            <Image
              src={job.company.logo}
              alt={job.company.name}
              width={64}
              height={64}
              className="object-contain"
            />
          ) : (
            <Briefcase className="text-muted-foreground/40 h-8 w-8" />
          )}
          {job.matchScore >= 95 && (
            <div className="ring-background absolute -top-1.5 -right-1.5 animate-pulse rounded-full bg-amber-500 p-1 shadow-lg ring-2"></div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Link
                href={`/jobs/${job.id}`}
                className="hover:text-primary transition-colors"
              >
                <h3 className="truncate text-lg font-bold tracking-tight md:text-xl">
                  {job.title}
                </h3>
              </Link>
              {job.isFeatured && (
                <Badge
                  variant="default"
                  className="border-none bg-amber-500/10 py-0 text-[9px] font-black tracking-widest text-amber-600 uppercase"
                >
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground flex items-center gap-2 truncate text-sm font-semibold">
              {job.company.name}
              <span className="bg-border h-1 w-1 rounded-full" />
              {job.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              job.JobSkill.map((skill: any) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="bg-primary/5 text-primary rounded-lg border-none px-2 py-0.5 text-[10px] font-bold tracking-tight"
                >
                  {skill.skillName}
                </Badge>
              ))
            }
          </div>

          <div className="text-muted-foreground/70 flex items-center gap-4 text-[11px] font-bold tracking-tight">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 opacity-70" />
              {job.isRemote ? "Remote Friendly" : "On-site"}
            </span>
            <span className="flex items-center gap-1.5 tracking-tighter uppercase">
              <Briefcase className="h-3.5 w-3.5 opacity-70" />
              {job.jobType.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Match Score & Actions */}
        <div className="border-border/30 flex flex-col items-start gap-5 border-t pt-5 pl-0 md:items-end md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <div className="space-y-0.5 text-left md:text-right">
            <p className="text-muted-foreground/50 text-[10px] font-black tracking-[0.2em] uppercase">
              Match Accuracy
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`text-3xl font-black ${job.matchScore >= 90 ? "text-primary" : "text-amber-500"}`}
              >
                {job.matchScore}%
              </span>
            </div>
          </div>
          <div className="flex w-full items-center gap-2 md:w-auto">
            <Button className="shadow-primary/10 h-11 flex-1 rounded-xl px-6 font-bold shadow-lg md:flex-none">
              Apply now
            </Button>
          </div>
        </div>
      </div>

      {/* Reason Pill */}
      <div className="bg-muted/30 border-border/20 mt-6 flex items-start gap-3 rounded-xl border px-4 py-3">
        <Target className="text-muted-foreground/60 mt-0.5 h-4 w-4 opacity-70" />
        <p className="text-muted-foreground/80 text-[11px] leading-relaxed font-medium italic">
          {job.matchReason}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default RecommendedJobsView;
