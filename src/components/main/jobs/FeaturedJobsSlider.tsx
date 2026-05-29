/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Award, BadgeCheck, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface FeaturedJobsSliderProps {
  jobs: any[];
  isLoading: boolean;
}

const formatJobType = (type: string) => {
  if (!type) return "";
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const FeaturedJobsSlider = ({ jobs, isLoading }: FeaturedJobsSliderProps) => {
  const router = useRouter();

  const handleJobClick = (job: any) => {
    router.push(`/jobs/${job.id || job.slug}`);
  };

  if (isLoading || !jobs || jobs.length === 0) {
    return null;
  }

  return (
    <div className="relative mt-12 overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 border-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-lg border">
            <Award className="h-4 w-4" />
          </div>
          <h2 className="text-foreground text-sm font-bold tracking-wider uppercase">
            Featured Positions
          </h2>
        </div>
      </div>

      {/* Swiper JS Featured Jobs Slider - Showing Exactly 2 Cards in Desktop View */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={jobs.length > 2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2 },
        }}
        className="w-full py-4"
      >
        {jobs.map((job: any, index: number) => {
          const logoBgOptions = [
            "bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
            "bg-pink-600/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400",
            "bg-purple-600/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
            "bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
          ];
          const randomBg = logoBgOptions[index % logoBgOptions.length];
          const initial = job.company?.name
            ? job.company.name[0].toUpperCase()
            : "J";
          const salaryStr =
            job.salaryMin && job.salaryMax
              ? `$${Math.round(job.salaryMin / 1000)}k - $${Math.round(job.salaryMax / 1000)}k / yr`
              : job.salaryMin
                ? `$${Math.round(job.salaryMin / 1000)}k+ / yr`
                : "Competitive Salary";

          return (
            <SwiperSlide key={index} className="h-auto">
              <Card
                onClick={() => handleJobClick(job)}
                className="group border-border/40 from-card/60 to-card/10 hover:border-primary/30 hover:shadow-primary/5 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border bg-linear-to-b p-6 backdrop-blur-md transition-all duration-300 hover:shadow-xl"
              >
                {/* Dynamic Accent Left Line */}
                <div className="from-primary to-accent w-1.2 absolute top-0 bottom-0 left-0 rounded-l-2xl bg-linear-to-b opacity-75" />

                {/* Elegant Glowing Overlay */}
                <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex-1 space-y-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`ring-primary/5 border-background flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-lg font-black shadow-xs ring-2 transition-all duration-300 ${randomBg}`}
                      >
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-foreground flex items-center gap-1 truncate text-sm font-bold tracking-tight">
                          {job.company?.name || "Verified Partner"}
                          <BadgeCheck className="text-primary fill-primary/10 h-4 w-4 shrink-0" />
                        </h4>
                        <span className="text-muted-foreground/80 mt-0.5 flex items-center gap-1 text-[11px] font-semibold">
                          <Clock className="text-primary/70 h-3.5 w-3.5" />
                          {job.postedTime || "Featured"}
                        </span>
                      </div>
                    </div>

                    {/* Top-Right Arrow Action */}
                    <div className="text-muted-foreground/50 group-hover:text-primary p-1 transition-colors duration-300">
                      <ArrowUpRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Job Title & Type */}
                  <div className="space-y-2">
                    <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-base leading-snug font-bold tracking-tight transition-colors duration-300 sm:text-lg">
                      {job.title}
                    </h3>

                    {/* Bullet Divided Metadata Row (LinkedIn/Google style - Extremely Clean) */}
                    <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold">
                      <span className="flex items-center gap-1">
                        <MapPin className="text-primary/60 h-3.5 w-3.5" />
                        {job.location || "Remote"}
                      </span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {salaryStr}
                      </span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="text-primary font-bold">
                        {formatJobType(job.jobType || "Full-Time")}
                      </span>
                    </div>
                  </div>

                  {/* Tech Skills Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {(job.skills
                      ? job.skills.split(",").slice(0, 3)
                      : ["React", "Node.js", "TypeScript"]
                    ).map((tag: string, i: number) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/5 text-primary/95 border-primary/10 rounded-lg border px-2.5 py-1 text-[10px] font-extrabold tracking-wide uppercase transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FeaturedJobsSlider;
