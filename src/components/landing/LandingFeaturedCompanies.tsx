'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Crown,
  MapPin,
  Rocket,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetCompaniesQuery } from '../../redux/feature/company/companyApi';
import type { CompanyListing, DisplayCompany } from '@/types/company';

const logoBgOptions = [
  'bg-primary/10 text-primary',
  'bg-accent/10 text-accent',
  'bg-blue-600/10 text-blue-600',
  'bg-purple-600/10 text-purple-600',
  'bg-orange-500/10 text-orange-500',
  'bg-indigo-600/10 text-indigo-600',
] as const;

const getIndustryName = (industry: CompanyListing['industry']): string => {
  if (!industry) return 'Technology';
  if (typeof industry === 'string') return industry;
  return industry.name;
};

const mapCompanyToDisplay = (comp: CompanyListing): DisplayCompany => {
  const randomBg = logoBgOptions[Math.floor(Math.random() * logoBgOptions.length)];
  return {
    name: comp.name,
    slug: comp.slug || comp.id,
    industry: getIndustryName(comp.industry),
    location: comp.location || 'Remote',
    jobsCount: comp.openJobs !== undefined ? `${comp.openJobs} active jobs` : 'Hiring actively',
    initial: comp.name ? comp.name[0].toUpperCase() : 'C',
    logoBg: randomBg,
    tagline: comp.description
      ? comp.description.slice(0, 75) + '...'
      : 'Building elite digital solutions.',
    isReal: true,
  };
};

const LandingFeaturedCompaniesSkeleton = () => {
  return (
    <section className="section-tint border-border/40 relative overflow-hidden border-b py-14 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-16 lg:mb-20">
          <div className="bg-muted mx-auto mb-4 h-9 w-44 animate-pulse rounded-full" />
          <div className="bg-muted mx-auto h-10 w-96 animate-pulse rounded-md" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="border-border/40 bg-card/50 animate-pulse rounded-2xl p-6">
              <div className="space-y-4">
                <div className="bg-muted h-12 w-12 rounded-xl" />
                <div className="bg-muted h-6 w-3/4 rounded" />
                <div className="bg-muted h-4 w-1/2 rounded" />
                <div className="bg-muted bg-muted/80 h-10 w-full animate-pulse rounded-xl" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Empty state shown when no companies have signed up yet */
const LandingFeaturedCompaniesEmpty = () => {
  const router = useRouter();
  return (
    <section className="section-tint border-border/40 relative overflow-hidden border-b py-14 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/5 absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[120px]" />
        <div className="bg-accent/5 absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex"
          >
            <Badge className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 gap-1.5 border px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm transition-all sm:px-4 sm:py-2 sm:text-sm">
              <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Verified Premium Partners
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-foreground text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Top Featured{' '}
            <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
              Employers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mx-auto mt-3 max-w-2xl text-xs sm:text-lg"
          >
            Be the first verified employer on Workly and connect with thousands of skilled
            professionals today.
          </motion.p>
        </div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <Card className="group border-primary/20 bg-card/50 hover:border-primary relative overflow-hidden rounded-2xl border p-10 text-center backdrop-blur-md transition-all duration-500">
            <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="from-primary/10 to-accent/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br">
                <Building2 className="text-primary h-10 w-10" />
              </div>
              <h3 className="text-foreground mb-3 text-2xl font-bold">Be a Pioneer Employer</h3>
              <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                Post jobs, review applicants, and hire top talent — all from one seamless platform.
              </p>
              <button
                onClick={() => router.push('/employer/register')}
                className="bg-primary hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/30 inline-flex cursor-pointer items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-lg transition-all"
              >
                <Rocket className="h-4 w-4" />
                Post Your First Job
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

const LandingFeaturedCompanies = () => {
  const router = useRouter();
  const { data: companiesData, isLoading: companiesLoading } = useGetCompaniesQuery({ limit: 10 });

  const fetchedCompanies: CompanyListing[] =
    companiesData?.data?.result || companiesData?.data || [];

  const displayCompanies: DisplayCompany[] =
    fetchedCompanies.length > 0 ? fetchedCompanies.slice(0, 8).map(mapCompanyToDisplay) : [];

  const handleCompanyClick = (company: DisplayCompany) => {
    if (company.isReal) {
      router.push(`/companies/${company.slug}`);
    } else {
      router.push(`/jobs?search=${encodeURIComponent(company.name)}`);
    }
  };

  if (companiesLoading || !companiesData) {
    return <LandingFeaturedCompaniesSkeleton />;
  }

  if (displayCompanies.length === 0) {
    return <LandingFeaturedCompaniesEmpty />;
  }

  return (
    <section className="section-tint border-border/40 relative overflow-hidden border-b py-14 sm:py-24 lg:py-32">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/5 absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex"
          >
            <Badge className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 gap-1.5 border px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm transition-all sm:px-4 sm:py-2 sm:text-sm">
              <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Verified Premium Partners
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-foreground text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Top Featured{' '}
            <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
              Employers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mx-auto mt-3 max-w-2xl text-xs sm:text-lg"
          >
            Explore verified enterprise brands and premium hiring firms currently looking for
            talent.
          </motion.p>
        </div>

        {/* Featured Employers Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="premium-employers-slider w-full py-4"
          >
            {displayCompanies.map((company: DisplayCompany, index: number) => (
              <SwiperSlide key={index} className="h-auto">
                <Card className="group border-border/40 bg-card/50 hover:border-primary hover:bg-card/80 relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-all duration-500">
                  {/* Dynamic Gradient Overlay */}
                  <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 space-y-4">
                    {/* Company Header Row */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-extrabold transition-all duration-500 ${company.logoBg}`}
                      >
                        {company.initial}
                      </div>

                      {/* Premium Badge */}
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-amber-600 uppercase shadow-sm shadow-amber-500/5 dark:text-amber-500">
                        <Crown className="h-3.5 w-3.5 fill-amber-500/20 text-amber-500" />
                        PRO Member
                      </span>
                    </div>

                    {/* Company Information */}
                    <div>
                      <h3 className="text-foreground group-hover:text-primary text-lg font-bold tracking-tight transition-all duration-500">
                        {company.name}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-xs font-semibold">
                        {company.industry}
                      </p>
                      <p className="text-muted-foreground/80 mt-2 text-xs leading-relaxed">
                        {company.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Footer Metadata Row */}
                  <div className="border-border/40 relative z-10 mt-6 space-y-3 border-t pt-4">
                    <div className="text-muted-foreground flex flex-col gap-1.5 text-xs font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {company.location}
                      </span>
                      <span className="text-primary flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        {company.jobsCount}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCompanyClick(company)}
                      className="text-foreground group-hover:text-primary mt-2 flex w-full cursor-pointer items-center justify-between text-xs font-bold transition-all duration-300"
                    >
                      <span>Browse Careers</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default LandingFeaturedCompanies;
