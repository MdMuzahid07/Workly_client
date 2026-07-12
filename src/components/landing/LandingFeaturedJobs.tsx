'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  Clock,
  Crown,
  DollarSign,
  MapPin,
  PlusCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useGetJobsQuery } from '../../redux/feature/job/jobApi';
import type { DisplayJob, JobListing } from '@/types/job';

const logoBgOptions = [
  'bg-blue-600/10 text-blue-600',
  'bg-pink-600/10 text-pink-600',
  'bg-purple-600/10 text-purple-600',
  'bg-emerald-600/10 text-emerald-600',
] as const;

const formatJobType = (type: string): string => {
  if (!type) return '';
  return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

const mapJobToDisplay = (job: JobListing): DisplayJob => {
  const randomBg = logoBgOptions[Math.floor(Math.random() * logoBgOptions.length)];

  let salaryStr = 'Competitive';
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

  let postedStr = 'Recently';
  if (job.createdAt) {
    const diffMs = Date.now() - new Date(job.createdAt).getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) {
      postedStr = 'Just now';
    } else if (diffHrs < 24) {
      postedStr = `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffHrs / 24);
      postedStr = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
  }

  return {
    id: job.id,
    title: job.title,
    company: job.company?.name || 'Verified Partner',
    logoBg: randomBg,
    companyInitial: job.company?.name ? job.company.name[0].toUpperCase() : 'J',
    location: job.location || 'Remote',
    salary: salaryStr,
    type: job.jobType || 'Full-Time',
    postedTime: postedStr,
    tags: job.skills ? job.skills.split(',').slice(0, 3) : ['React', 'TypeScript', 'Node.js'],
    isPremium: job.isPremium || (job.salaryMin != null && job.salaryMin > 120000) || false,
    isReal: true,
  };
};

const LandingFeaturedJobsSkeleton = () => {
  return (
    <section className="bg-background relative overflow-hidden py-14 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:mb-16 md:flex-row md:items-end lg:mb-20">
          <div className="w-full text-center md:text-left">
            <div className="bg-muted mx-auto mb-4 h-9 w-44 animate-pulse rounded-full md:mx-0" />
            <div className="bg-muted mx-auto h-10 w-96 animate-pulse rounded-md md:mx-0" />
          </div>
        </div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              className="border-border/40 bg-card/50 animate-pulse rounded-2xl p-4 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3 sm:gap-6">
                  <div className="bg-muted h-10 w-10 shrink-0 rounded-xl sm:h-14 sm:w-14 sm:rounded-2xl" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="bg-muted h-5 w-48 rounded sm:h-6 sm:w-60" />
                    <div className="bg-muted h-3.5 w-32 rounded sm:h-4 sm:w-40" />
                    <div className="flex gap-1.5 sm:gap-2">
                      <div className="bg-muted h-4 w-12 rounded-md sm:h-5 sm:w-16" />
                      <div className="bg-muted h-4 w-12 rounded-md sm:h-5 sm:w-16" />
                    </div>
                  </div>
                </div>
                <div className="bg-muted h-8 w-24 rounded-xl sm:h-10 sm:w-28" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Empty state shown when no jobs have been posted yet */
const LandingFeaturedJobsEmpty = () => {
  const router = useRouter();
  return (
    <section className="bg-background relative overflow-hidden py-14 sm:py-24 lg:py-32">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-accent/5 absolute bottom-0 left-1/4 h-[450px] w-[450px] rounded-full blur-[120px]" />
        <div className="bg-primary/5 absolute top-0 right-1/4 h-[350px] w-[350px] rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:mb-16 md:flex-row md:items-end lg:mb-20">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex"
            >
              <Badge className="border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 gap-1.5 border px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm transition-all sm:px-4 sm:py-2 sm:text-sm">
                <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Featured Career Positions
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-foreground text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Explore Trending{' '}
              <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
                Opportunities
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-muted-foreground mt-3 max-w-2xl text-xs sm:text-lg"
            >
              Top roles are on their way. Be the employer who sets the standard.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={() => router.push('/jobs')}
              className="bg-primary hover:bg-primary/95 shadow-primary/20 hover:shadow-primary/30 flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:scale-102 hover:shadow-xl sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <span>Browse All Jobs</span>
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </motion.div>
        </div>

        {/* Empty CTA grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: PlusCircle,
              title: 'Post a Job',
              desc: 'Create a professional listing in minutes and start receiving qualified applicants.',
              cta: 'Post Now',
              href: '/employer/register',
              color: 'primary',
            },
            {
              icon: Building2,
              title: 'Build Your Brand',
              desc: 'Set up a company profile that attracts top talent with your story and culture.',
              cta: 'Create Profile',
              href: '/employer/register',
              color: 'accent',
            },
            {
              icon: Briefcase,
              title: 'Find Talent Fast',
              desc: 'Access a growing pool of pre-screened professionals ready to join your team.',
              cta: 'Get Started',
              href: '/employer/register',
              color: 'primary',
            },
          ].map((item, index) => (
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
              <Card className="group border-border/40 bg-card/50 hover:border-primary relative h-full overflow-hidden rounded-2xl border p-8 backdrop-blur-md transition-all duration-500">
                <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col">
                  <div
                    className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-${item.color}/10 text-${item.color} transition-all duration-500 group-hover:bg-${item.color}/20`}
                  >
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-bold transition-all duration-500">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  <button
                    onClick={() => router.push(item.href)}
                    className="text-primary group-hover:text-primary flex cursor-pointer items-center gap-1.5 text-sm font-bold transition-all"
                  >
                    {item.cta}
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

const LandingFeaturedJobs = () => {
  const router = useRouter();
  const { data: jobsData, isLoading: jobsLoading } = useGetJobsQuery({
    limit: 6,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const fetchedJobs: JobListing[] = jobsData?.data || [];

  const displayJobs: DisplayJob[] =
    fetchedJobs.length > 0 ? fetchedJobs.slice(0, 4).map(mapJobToDisplay) : [];

  const handleJobClick = (job: DisplayJob) => {
    if (job.isReal && job.id) {
      router.push(`/jobs/${job.id}`);
    } else {
      router.push(`/jobs`);
    }
  };

  if (jobsLoading || !jobsData) {
    return <LandingFeaturedJobsSkeleton />;
  }

  if (displayJobs.length === 0) {
    return <LandingFeaturedJobsEmpty />;
  }

  return (
    <section className="bg-background relative overflow-hidden py-14 sm:py-24 lg:py-32">
      {/* Dynamic Background Atmospheric Orbs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-accent/5 absolute bottom-0 left-1/4 h-[450px] w-[450px] rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:mb-16 md:flex-row md:items-end lg:mb-20">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex"
            >
              <Badge className="border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 gap-1.5 border px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm transition-all sm:px-4 sm:py-2 sm:text-sm">
                <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Featured Career Positions
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-foreground text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Explore Trending{' '}
              <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
                Opportunities
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-muted-foreground mt-3 max-w-2xl text-xs sm:text-lg"
            >
              Find top roles vetted by our expert talent teams. Apply securely inside our seamless
              ecosystem.
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
              onClick={() => router.push('/jobs')}
              className="bg-primary hover:bg-primary/95 shadow-primary/20 hover:shadow-primary/30 flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:scale-102 hover:shadow-xl sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <span>View All Careers</span>
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </motion.div>
        </div>

        {/* Featured Jobs Feed Grid */}
        <div className="grid gap-6">
          {displayJobs.map((job: DisplayJob, index: number) => {
            const delay = index * 0.06;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, margin: '0px 0px -100px 0px', amount: 0.05 }}
                transition={{
                  duration: 0.45,
                  delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card className="group border-border/40 from-card/60 to-card/10 hover:border-primary relative flex flex-col justify-between gap-4 overflow-hidden rounded-2xl border bg-linear-to-b p-4 backdrop-blur-md transition-all duration-500 sm:gap-6 sm:p-6 md:flex-row md:items-center">
                  {/* Dynamic Gradient Overlay */}
                  <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Accent line on premium cards */}
                  {job.isPremium && (
                    <div className="from-primary to-accent w-1.2 absolute top-0 bottom-0 left-0 rounded-l-2xl bg-linear-to-b" />
                  )}

                  <div className="relative z-10 flex w-full flex-row items-start gap-3 sm:gap-6 md:w-auto">
                    {/* Company Logo container */}
                    <div
                      className={`ring-primary/5 border-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 text-base font-black shadow-xs ring-2 transition-all duration-500 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-xl ${job.logoBg}`}
                    >
                      {job.companyInitial}
                    </div>

                    <div className="min-w-0 flex-1 space-y-2 sm:space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          onClick={() => handleJobClick(job)}
                          className="text-foreground group-hover:text-primary cursor-pointer text-base font-bold tracking-tight transition-colors duration-300 sm:text-xl"
                        >
                          {job.title}
                        </h3>
                        {job.isPremium && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-amber-600 uppercase shadow-xs sm:text-[10px] dark:text-amber-500">
                            <Crown className="h-3 w-3 fill-amber-500/20 text-amber-500" />
                            PRO
                          </span>
                        )}
                      </div>

                      {/* Metadata Badges Row */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="bg-secondary/40 text-muted-foreground/90 border-border/40 flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[10px] font-semibold sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs">
                          <Building2 className="text-primary/70 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          <span className="xs:max-w-[120px] max-w-[80px] truncate sm:max-w-none">
                            {job.company}
                          </span>
                          <BadgeCheck className="text-primary fill-primary/10 ml-0.5 h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                        </span>
                        <span className="bg-secondary/40 text-muted-foreground/90 border-border/40 flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[10px] font-semibold sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs">
                          <MapPin className="text-primary/70 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-0.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 shadow-xs sm:gap-1 sm:px-3 sm:py-1 sm:text-xs dark:text-emerald-400">
                          <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {job.salary}
                        </span>
                      </div>

                      {/* Keyword Tags */}
                      <div className="flex flex-wrap items-center gap-1 pt-0.5 sm:gap-1.5 sm:pt-1">
                        {job.tags.map((tag: string, i: number) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/10 animate-none rounded-lg border px-2 py-0.5 text-[9px] font-bold transition-colors sm:px-2.5 sm:py-1 sm:text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Area: Job Type, Posted Time, Apply Button */}
                  <div className="border-border/40 relative z-10 flex flex-wrap items-center justify-between gap-3 border-t pt-3 sm:gap-5 md:flex-col md:items-end md:justify-center md:border-0 md:pt-0">
                    {/* Job Type & Post details */}
                    <div className="flex flex-wrap items-center gap-2 md:mb-3">
                      <span className="bg-primary/10 text-primary border-primary/20 rounded-lg border px-2 py-0.5 text-[10px] font-bold shadow-xs sm:px-2.5 sm:py-1 sm:text-xs">
                        {formatJobType(job.type)}
                      </span>
                      <span className="text-muted-foreground/80 flex items-center gap-1 text-[10px] font-semibold sm:text-xs">
                        <Clock className="text-primary/70 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {job.postedTime}
                      </span>
                    </div>

                    {/* Premium Action Button */}
                    <button
                      onClick={() => handleJobClick(job)}
                      className="bg-primary text-primary-foreground hover:bg-primary/95 shadow-primary/20 hover:shadow-primary/30 flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-extrabold shadow-md transition-all duration-300 sm:px-5 sm:py-3 sm:text-sm"
                    >
                      <span>Quick Apply</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingFeaturedJobs;
