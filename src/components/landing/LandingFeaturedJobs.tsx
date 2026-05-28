"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

const featuredJobs = [
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

const LandingFeaturedJobs = () => {
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
                <Sparkles className="h-4 w-4" />
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
            <button className="bg-primary hover:bg-primary/95 shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-102 hover:shadow-xl">
              <span>View All Careers</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* Featured Jobs Feed Grid */}
        <div className="grid gap-6">
          {featuredJobs.map((job, index) => (
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
              <Card className="group border-border/40 bg-card/45 hover:border-primary/30 relative flex flex-col justify-between gap-6 overflow-hidden p-6 backdrop-blur-md transition-all duration-500 hover:shadow-2xl md:flex-row md:items-center">
                {/* Accent line on premium cards */}
                {job.isPremium && (
                  <div className="from-primary to-accent absolute top-0 bottom-0 left-0 w-1 bg-linear-to-b" />
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  {/* Company Logo container */}
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold ${job.logoBg}`}
                  >
                    {job.companyInitial}
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-foreground group-hover:text-primary text-xl font-bold tracking-tight transition-colors duration-300">
                        {job.title}
                      </h3>
                      {job.isPremium && (
                        <Badge className="bg-primary/10 text-primary border-primary/20 border px-2 py-0.5 text-xs font-semibold">
                          Premium
                        </Badge>
                      )}
                    </div>

                    {/* Metadata Items */}
                    <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                    </div>

                    {/* Keyword Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {job.tags.map((tag, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-muted/65 hover:bg-primary/5 text-muted-foreground text-xs font-medium"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-border/40 flex flex-wrap items-center justify-between gap-4 border-t pt-4 md:flex-col md:items-end md:justify-center md:border-0 md:pt-0">
                  {/* Job Type & Post details */}
                  <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium md:mb-2">
                    <span className="bg-primary/10 text-primary rounded-md px-2 py-1 font-bold">
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {job.postedTime}
                    </span>
                  </div>

                  {/* Quick Action button */}
                  <button className="bg-muted/75 hover:bg-primary text-foreground ring-border group-hover:ring-primary/20 flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-bold shadow-xs ring-1 transition-all duration-300 hover:text-white">
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
