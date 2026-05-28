"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Briefcase, Crown, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const premiumCompanies = [
  {
    name: "Workly Tech Solutions",
    industry: "Software & IT Services",
    location: "San Francisco, CA (Remote)",
    jobsCount: "15 active jobs",
    initial: "W",
    logoBg: "bg-primary/10 text-primary",
    tagline: "Building next-gen enterprise tools.",
  },
  {
    name: "Vertex Creative Labs",
    industry: "Design & Agency",
    location: "Austin, TX (Hybrid)",
    jobsCount: "8 active jobs",
    initial: "V",
    logoBg: "bg-accent/10 text-accent",
    tagline: "Crafting beautiful digital experiences.",
  },
  {
    name: "Novus Health Systems",
    industry: "Healthcare & Biotech",
    location: "Boston, MA (On-site)",
    jobsCount: "12 active jobs",
    initial: "N",
    logoBg: "bg-blue-600/10 text-blue-600",
    tagline: "Empowering patient-centric healthcare.",
  },
  {
    name: "Quantum Fintech Group",
    industry: "Financial Technology",
    location: "New York, NY (Remote)",
    jobsCount: "6 active jobs",
    initial: "Q",
    logoBg: "bg-purple-600/10 text-purple-600",
    tagline: "Decentralizing future asset transfers.",
  },
  {
    name: "Apex Global Systems",
    industry: "Cloud & DevOps",
    location: "Seattle, WA (Remote)",
    jobsCount: "10 active jobs",
    initial: "A",
    logoBg: "bg-orange-500/10 text-orange-500",
    tagline: "Scaling global cloud infrastructure.",
  },
  {
    name: "Stripe Payments Corp",
    industry: "Fintech & Payments",
    location: "Miami, FL (Hybrid)",
    jobsCount: "5 active jobs",
    initial: "S",
    logoBg: "bg-indigo-600/10 text-indigo-600",
    tagline: "Providing secure global payment APIs.",
  },
];

const LandingFeaturedCompanies = () => {
  return (
    <section className="bg-background border-border/40 relative overflow-hidden border-b py-24 sm:py-32">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/5 absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex"
          >
            <Badge className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 gap-2 border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all">
              <Sparkles className="h-4 w-4" />
              Verified Premium Partners
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Top Featured{" "}
            <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
              Employers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base sm:text-lg"
          >
            Explore verified enterprise brands and premium hiring firms
            currently looking for talent.
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
            {premiumCompanies.map((company, index) => (
              <SwiperSlide key={index} className="h-auto">
                <Card className="group border-border/40 bg-card/45 hover:border-primary/30 relative flex h-full flex-col justify-between overflow-hidden p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
                  {/* Visual Accent Corner Glow */}
                  <div className="from-primary/10 pointer-events-none absolute -inset-px bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 space-y-4">
                    {/* Company Header Row */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-extrabold ${company.logoBg}`}
                      >
                        {company.initial}
                      </div>

                      {/* Redesigned Premium Badge */}
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-amber-600 uppercase shadow-sm shadow-amber-500/5 dark:text-amber-500">
                        <Crown className="h-3.5 w-3.5 fill-amber-500/20 text-amber-500" />
                        PRO Member
                      </span>
                    </div>

                    {/* Company Information */}
                    <div>
                      <h3 className="text-foreground group-hover:text-primary text-lg font-bold tracking-tight transition-colors duration-300">
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

                    <button className="text-foreground group-hover:text-primary mt-2 flex w-full items-center justify-between text-xs font-bold transition-all duration-300">
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
