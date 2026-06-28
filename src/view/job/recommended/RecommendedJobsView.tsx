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
import { useGetRecommendedJobsQuery } from "@/redux/feature/job/jobApi";
import { useGetProfileQuery } from "@/redux/feature/profile/profileApi";
import { useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Crown,
  Lightbulb,
  MapPin,
  Search,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface JobSkill {
  id: string;
  skillName: string;
}

interface Company {
  id: string;
  name: string;
  logo?: string;
}

interface RecommendedJob {
  id: string;
  title: string;
  slug: string;
  discipline: string;
  description: string;
  requirements: string[];
  jobType: string;
  location: string;
  experienceLevel: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  isFeatured: boolean;
  matchScore: number;
  matchReason: string;
  company: Company;
  JobSkill: JobSkill[];
}

const RecommendedJobsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState("10");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: recommendedData } = useGetRecommendedJobsQuery({
    page: currentPage,
    limit: parseInt(limit),
    search: debouncedSearch,
  });

  const jobs = (recommendedData?.data as RecommendedJob[]) || [];
  const meta = recommendedData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  };

  const { data: profileData } = useGetProfileQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);
  const isPremium = profileData?.data?.isPremium || user?.isPremium || false;

  if (!isPremium) {
    return (
      <div className="min-h-screen pt-8">
        <DashboardRecommendedJobsHeader />
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border-primary/10 relative overflow-hidden rounded-[2.5rem] border-2 p-8 sm:p-16"
          >
            {/* Premium Badge */}
            <div className="mb-10 flex justify-center">
              <div className="bg-primary/10 ring-primary/20 flex items-center gap-3 rounded-full px-6 py-2.5 ring-1 backdrop-blur-md">
                <Crown className="text-primary h-5 w-5 animate-pulse" />
                <span className="text-primary text-sm font-black tracking-widest uppercase">
                  Premium Experience
                </span>
              </div>
            </div>

            <div className="relative z-10 text-center">
              <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Unlock <span className="text-primary">Advanced</span> <br />
                Career Growth.
              </h1>
              <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg leading-relaxed font-medium opacity-80 sm:text-xl">
                Get access to our advanced matching engine that surfaces the
                most relevant job opportunities tailored specifically to your
                expertise.
              </p>

              <div className="mx-auto mb-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  {
                    icon: Target,
                    text: "99% Precision Match",
                    desc: "Based on your exact skills",
                  },
                  {
                    icon: Lightbulb,
                    text: "Smart Insights",
                    desc: "Know why you're a fit",
                  },
                  {
                    icon: Zap,
                    text: "Priority Access",
                    desc: "See new jobs before others",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-muted/30 group hover:bg-primary/5 hover:border-primary/20 rounded-3xl border p-6 transition-all"
                  >
                    <div className="bg-background mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110">
                      <feature.icon className="text-primary h-6 w-6" />
                    </div>
                    <h4 className="mb-1 text-sm font-black">{feature.text}</h4>
                    <p className="text-muted-foreground text-[11px] leading-tight font-medium">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Button
                  size="lg"
                  className="shadow-primary/20 h-16 w-full rounded-2xl px-10 text-lg font-black shadow-2xl sm:w-auto"
                >
                  Go Premium Now
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-foreground text-sm font-bold transition-colors"
                >
                  View all premium benefits
                </Link>
              </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="bg-primary/10 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-[100px]" />
            <div className="bg-primary/5 absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-[100px]" />
          </motion.div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground text-sm font-medium opacity-60">
              Trusted by 50,000+ professionals worldwide
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <DashboardRecommendedJobsHeader />

      <div className="space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="from-primary/10 via-background relative overflow-hidden rounded-2xl border bg-linear-to-br to-amber-500/5 p-4 sm:p-8"
        >
          <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase">
                Smart Matching
              </div>
              <h2 className="text-xl font-black tracking-tight sm:text-3xl">
                Tailored just for you.
              </h2>
              <p className="text-muted-foreground max-w-md text-xs font-medium opacity-80 sm:text-sm">
                Our system analyzes your skills, preferences, and career path to
                surface the most relevant opportunities.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-card/50 flex min-w-[90px] flex-col items-center rounded-xl border p-3 backdrop-blur-sm sm:p-4">
                <span className="text-primary text-xl font-black sm:text-2xl">
                  98%
                </span>
                <span className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase sm:text-[10px]">
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
        <Card className="bg-card rounded-2xl border">
          <CardContent className="flex flex-col gap-3 p-3.5 sm:p-4 md:flex-row md:items-center md:justify-between">
            <div className="group relative max-w-md flex-1">
              <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
              <Input
                placeholder="Search recommended roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-muted/20 border-border focus:bg-background h-9 rounded-full pl-9 text-xs transition-all sm:h-11 sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
                Show:
              </span>
              <Select value={limit} onValueChange={setLimit}>
                <SelectTrigger className="bg-muted/20 border-border h-8 cursor-pointer rounded-full text-xs font-bold sm:h-10 sm:text-sm">
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
        <div className="grid grid-cols-1 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {jobs.length > 0 ? (
              jobs.map((job: RecommendedJob, idx: number) => (
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
              <div className="bg-card flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed py-16 text-center">
                <div className="bg-muted/20 rounded-full p-5">
                  <Search className="text-muted-foreground/20 h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <p className="text-muted-foreground text-xs font-bold italic sm:text-sm">
                  No recommendations match your search.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {meta.pages > 1 && (
          <div className="border-t pt-6">
            <PaginationBar meta={meta} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  );
};

const RecommendedJobCard = ({ job }: { job: RecommendedJob }) => (
  <Card className="group bg-card relative overflow-hidden rounded-2xl border transition-all hover:shadow-sm">
    <CardContent className="p-3.5 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center">
        {/* Company Logo & Basic info */}
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          <div className="bg-background ring-border/50 relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full p-2 shadow-2xs ring-1 sm:h-16 sm:w-16 md:h-20 md:w-20">
            {job.company.logo ? (
              <Image
                src={job.company.logo}
                alt={job.company.name}
                width={64}
                height={64}
                className="rounded-full object-contain"
              />
            ) : (
              <Briefcase className="text-muted-foreground/40 h-6 w-6 sm:h-8 sm:w-8" />
            )}
            {job.matchScore >= 95 && (
              <div className="ring-background absolute -top-1 -right-1 animate-pulse rounded-full bg-amber-500 p-1 shadow-lg ring-2 sm:-top-1.5 sm:-right-1.5"></div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/jobs/${job.id}`}
                  className="hover:text-primary transition-colors"
                >
                  <h3 className="truncate text-base font-bold tracking-tight sm:text-lg md:text-xl">
                    {job.title}
                  </h3>
                </Link>
                {job.isFeatured && (
                  <Badge
                    variant="default"
                    className="border-none bg-amber-500/10 px-2 py-0.5 text-[9px] font-black tracking-widest text-amber-600 uppercase"
                  >
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground flex items-center gap-1.5 truncate text-xs font-semibold sm:text-sm">
                {job.company.name}
                <span className="bg-border h-1 w-1 rounded-full" />
                {job.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {job.JobSkill.map((skill: JobSkill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="bg-primary/5 text-primary rounded-lg border-none px-2 py-0.5 text-[9px] font-bold tracking-tight sm:text-[10px]"
                >
                  {skill.skillName}
                </Badge>
              ))}
            </div>

            <div className="text-muted-foreground/70 flex items-center gap-3 text-[10px] font-bold tracking-tight sm:text-[11px]">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 opacity-70" />
                {job.isRemote ? "Remote Friendly" : "On-site"}
              </span>
              <span className="flex items-center gap-1 tracking-tighter uppercase">
                <Briefcase className="h-3 w-3 opacity-70" />
                {job.jobType.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>

        {/* Match Score & Actions */}
        <div className="border-border/30 flex flex-row items-center justify-between gap-4 border-t pt-3.5 md:flex-col md:items-end md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <div className="space-y-0.5 text-left md:text-right">
            <p className="text-muted-foreground/50 text-[9px] font-black tracking-[0.2em] uppercase sm:text-[10px]">
              Match Accuracy
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-2xl font-black sm:text-3xl ${job.matchScore >= 90 ? "text-primary" : "text-amber-500"}`}
              >
                {job.matchScore}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:w-auto">
            <Button className="shadow-primary/10 h-8 rounded-xl px-4 text-xs font-bold shadow-md sm:h-10 sm:px-6">
              Apply now
            </Button>
          </div>
        </div>
      </div>

      {/* Reason Pill */}
      <div className="bg-muted/30 border-border/20 mt-3.5 flex items-start gap-2.5 rounded-xl border px-3 py-2 sm:px-4 sm:py-3">
        <Target className="text-muted-foreground/60 mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
        <p className="text-muted-foreground/80 text-[10px] leading-relaxed font-medium italic sm:text-[11px]">
          {job.matchReason}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default RecommendedJobsView;
