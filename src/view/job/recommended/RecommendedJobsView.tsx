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
      <div className="min-h-screen pt-16">
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
                Smart Matching
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Tailored just for you.
              </h2>
              <p className="text-muted-foreground max-w-md text-sm font-medium opacity-80">
                Our system analyzes your skills, preferences, and career path to
                surface the most relevant opportunities.
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
            {job.JobSkill.map((skill: JobSkill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="bg-primary/5 text-primary rounded-lg border-none px-2 py-0.5 text-[10px] font-bold tracking-tight"
              >
                {skill.skillName}
              </Badge>
            ))}
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
