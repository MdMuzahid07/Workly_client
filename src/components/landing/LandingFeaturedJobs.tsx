"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  Clock,
  Crown,
  DollarSign,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useGetJobsQuery } from "../../redux/feature/job/jobApi";
import type { DisplayJob, JobListing } from "@/types/job";

const featuredJobs: DisplayJob[] = [
  {
    title: "Senior Full Stack Engineer (React & Node)",
    company: "TechCorp Global",
    logoBg: "bg-blue-600/10 text-blue-600",
    companyInitial: "T",
    location: "San Francisco, CA (Remote)",
    salary: "$130k - $165k / year",
    type: "Full-Time",
    postedTime: "2 hours ago",
    tags: ["React", "Node.js", "TypeScript"],
    isPremium: true,
  },
  {
    title: "Lead UI/UX Product Designer",
    company: "CreativeStudio Collective",
    logoBg: "bg-pink-600/10 text-pink-600",
    companyInitial: "C",
    location: "New York, NY (Hybrid)",
    salary: "$95k - $120k / year",
    type: "Full-Time",
    postedTime: "1 day ago",
    tags: ["Figma", "Design Systems", "Prototyping"],
    isPremium: false,
  },
  {
    title: "Lead DevOps Architect",
    company: "ScaleSystems Cloud",
    logoBg: "bg-purple-600/10 text-purple-600",
    companyInitial: "S",
    location: "Austin, TX (Remote)",
    salary: "$155k - $185k / year",
    type: "Contract",
    postedTime: "3 hours ago",
    tags: ["AWS", "Kubernetes", "CI/CD"],
    isPremium: true,
  },
  {
    title: "Senior Product Manager",
    company: "FintechVentures Group",
    logoBg: "bg-emerald-600/10 text-emerald-600",
    companyInitial: "F",
    location: "Chicago, IL (On-site)",
    salary: "$140k - $170k / year",
    type: "Full-Time",
    postedTime: "2 days ago",
    tags: ["Agile", "Product Strategy", "SQL"],
    isPremium: false,
  },
];

const logoBgOptions = [
  "bg-blue-600/10 text-blue-600",
  "bg-pink-600/10 text-pink-600",
  "bg-purple-600/10 text-purple-600",
  "bg-emerald-600/10 text-emerald-600",
] as const;

const formatJobType = (type: string): string => {
  if (!type) return "";
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const mapJobToDisplay = (job: JobListing): DisplayJob => {
  const randomBg =
    logoBgOptions[Math.floor(Math.random() * logoBgOptions.length)];

  let salaryStr = "Competitive";
  if (
    job.salaryMin !== undefined &&
    job.salaryMin !== null &&
    job.salaryMax !== undefined &&
    job.salaryMax !== null
  ) {
    salaryStr = `$${Math.round(job.salaryMin / 1000)}k - $${Math.round(job.salaryMax / 1000)}k / year`;
  } else if (job.salaryMin !== undefined && job.salaryMin !== null) {
    salaryStr = `$${Math.round(job.salaryMin / 1000)}k+ / year`;
  }

  let postedStr = "Recently";
  if (job.createdAt) {
    const diffMs = Date.now() - new Date(job.createdAt).getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) {
      postedStr = "Just now";
    } else if (diffHrs < 24) {
      postedStr = `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
    } else {
      const diffDays = Math.floor(diffHrs / 24);
      postedStr = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }
  }

  return {
    id: job.id,
    title: job.title,
    company: job.company?.name || "Verified Partner",
    logoBg: randomBg,
    companyInitial: job.company?.name ? job.company.name[0].toUpperCase() : "J",
    location: job.location || "Remote",
    salary: salaryStr,
    type: job.jobType || "Full-Time",
    postedTime: postedStr,
    tags: job.skills
      ? job.skills.split(",").slice(0, 3)
      : ["React", "TypeScript", "Node.js"],
    isPremium:
      job.isPremium ||
      (job.salaryMin != null && job.salaryMin > 120000) ||
      false,
    isReal: true,
  };
};

const LandingFeaturedJobs = () => {
  const router = useRouter();
  const { data: jobsData } = useGetJobsQuery({
    limit: 6,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const fetchedJobs: JobListing[] = jobsData?.data || [];

  const displayJobs: DisplayJob[] =
    fetchedJobs.length > 0
      ? fetchedJobs.slice(0, 4).map(mapJobToDisplay)
      : featuredJobs;

  const handleJobClick = (job: DisplayJob) => {
    if (job.isReal && job.id) {
      router.push(`/jobs/${job.id}`);
    } else {
      router.push(`/jobs`);
    }
  };

  return (
    <section className="bg-background relative overflow-hidden py-24 sm:py-32">
      {/* Dynamic Background Atmospheric Orbs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-accent/5 absolute bottom-0 left-1/4 h-[450px] w-[450px] rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-16 flex flex-col items-center justify-between gap-6 sm:mb-20 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex"
            >
              <Badge className="border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 gap-2 border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all">
                <Award className="h-4 w-4" />
                Featured Career Positions
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Explore Trending{" "}
              <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
                Opportunities
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-muted-foreground mt-4 max-w-2xl text-base sm:text-lg"
            >
              Find top roles vetted by our expert talent teams. Apply securely
              inside our seamless ecosystem.
            </motion.p>
          </div>

          {/* Action CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={() => router.push("/jobs")}
              className="bg-primary hover:bg-primary/95 shadow-primary/20 hover:shadow-primary/30 flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-102 hover:shadow-xl"
            >
              <span>View All Careers</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* Featured Jobs Feed Grid */}
        <div className="grid gap-6">
          {displayJobs.map((job: DisplayJob, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card className="group border-border/40 from-card/60 to-card/10 hover:border-primary relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border bg-linear-to-b p-6 backdrop-blur-md transition-all duration-500 md:flex-row md:items-center">
                {/* Dynamic Gradient Overlay */}
                <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Accent line on premium cards */}
                {job.isPremium && (
                  <div className="from-primary to-accent w-1.2 absolute top-0 bottom-0 left-0 rounded-l-2xl bg-linear-to-b" />
                )}

                <div className="relative z-10 flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:gap-6 md:w-auto">
                  {/* Company Logo container */}
                  <div
                    className={`ring-primary/5 border-background flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 text-xl font-black shadow-xs ring-2 transition-all duration-500 ${job.logoBg}`}
                  >
                    {job.companyInitial}
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        onClick={() => handleJobClick(job)}
                        className="text-foreground group-hover:text-primary cursor-pointer text-xl font-bold tracking-tight transition-colors duration-300"
                      >
                        {job.title}
                      </h3>
                      {job.isPremium && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-amber-600 uppercase shadow-xs dark:text-amber-500">
                          <Crown className="h-3 w-3 fill-amber-500/20 text-amber-500" />
                          PRO
                        </span>
                      )}
                    </div>

                    {/* Metadata Badges Row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-secondary/40 text-muted-foreground/90 border-border/40 flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold">
                        <Building2 className="text-primary/70 h-3.5 w-3.5" />
                        {job.company}
                        <BadgeCheck className="text-primary fill-primary/10 ml-0.5 h-3.5 w-3.5" />
                      </span>
                      <span className="bg-secondary/40 text-muted-foreground/90 border-border/40 flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold">
                        <MapPin className="text-primary/70 h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 shadow-xs dark:text-emerald-400">
                        <DollarSign className="h-3.5 w-3.5" />
                        {job.salary}
                      </span>
                    </div>

                    {/* Keyword Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {job.tags.map((tag: string, i: number) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/10 animate-none rounded-lg border px-2.5 py-1 text-xs font-bold transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Area: Job Type, Posted Time, Apply Button */}
                <div className="border-border/40 relative z-10 flex flex-wrap items-center justify-between gap-5 border-t pt-4 md:flex-col md:items-end md:justify-center md:border-0 md:pt-0">
                  {/* Job Type & Post details */}
                  <div className="flex flex-wrap items-center gap-2.5 md:mb-3">
                    <span className="bg-primary/10 text-primary border-primary/20 rounded-lg border px-2.5 py-1 text-xs font-bold shadow-xs">
                      {formatJobType(job.type)}
                    </span>
                    <span className="text-muted-foreground/80 flex items-center gap-1 text-xs font-semibold">
                      <Clock className="text-primary/70 h-3.5 w-3.5" />
                      {job.postedTime}
                    </span>
                  </div>

                  {/* Premium Action Button */}
                  <button
                    onClick={() => handleJobClick(job)}
                    className="bg-primary text-primary-foreground hover:bg-primary/95 shadow-primary/20 hover:shadow-primary/30 flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-sm font-extrabold shadow-md transition-all duration-300"
                  >
                    <span>Quick Apply</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeaturedJobs;
