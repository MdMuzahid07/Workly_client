"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { GlobeConfig } from "@/components/ui/globe";
import {
  Briefcase,
  Building2,
  Compass,
  TrendingUp,
  Users,
  Search,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, type ComponentType } from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { globeConfig, globeSampleAreas } from "../../constants";
import GlobeSkeleton from "../../skeleton/landing/GlobeSkeleton";

interface WorldProps {
  data: typeof globeSampleAreas;
  globeConfig: GlobeConfig;
}

interface LandingHeroProps {
  World: ComponentType<WorldProps>;
}

const LandingHero = ({ World }: LandingHeroProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.set("search", keyword);
    if (location) queryParams.set("location", location);
    router.push(`/jobs?${queryParams.toString()}`);
  };

  const handleTrendingClick = (term: string) => {
    setKeyword(term);
    router.push(`/jobs?search=${encodeURIComponent(term)}`);
  };

  return (
    <section className="bg-background border-primary/30 relative min-h-screen overflow-hidden border-b">
      {/* Refined Background Pattern */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-[0.15]" />

        {/* Gradient Orbs - Using Theme Colors */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-primary/10 absolute -top-48 -right-48 h-[700px] w-[700px] rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.12, 0.2, 0.12],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="bg-accent/8 absolute -bottom-48 -left-48 h-[800px] w-[800px] rounded-full blur-[140px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.08, 0.12, 0.08],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="from-primary/10 to-accent/10 absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r blur-[150px]"
        />
      </div>

      {/* Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-32 sm:px-6 lg:px-8 lg:pt-28 xl:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 order-1 lg:order-1"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 inline-flex"
            >
              <Badge className="group border-primary/20 bg-primary/5 text-foreground hover:border-primary/30 hover:bg-primary/10 gap-2 border px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-all">
                <Compass className="text-primary h-4 w-4" />
                <span className="from-primary to-primary/80 bg-linear-to-r bg-clip-text text-transparent">
                  Discover Your Dream Career Today
                </span>
              </Badge>
            </motion.div>

            {/* Main Headline - Improved Hierarchy */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-foreground mb-6 text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="block">Where Talent</span>
              <span className="relative mt-2 block">
                <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
                  Meets Opportunity
                </span>
                <motion.span
                  className="from-primary/60 via-primary/40 absolute right-0 -bottom-2 left-0 h-1 bg-linear-to-r to-transparent blur-sm"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                />
              </span>
              <span className="text-muted-foreground mt-2 block">
                Perfect for You
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground mb-8 max-w-xl text-base leading-relaxed sm:text-lg"
            >
              Connect with top companies worldwide. Access thousands of job
              opportunities tailored to your skills and ambitions.
            </motion.p>

            {/* Interactive Job Search & Filter Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-10 max-w-2xl"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="bg-card/85 border-border/60 shadow-primary/5 hover:border-primary/30 flex flex-col gap-2 rounded-2xl border p-2 shadow-2xl backdrop-blur-xl transition-all sm:flex-row sm:items-center sm:gap-0"
              >
                {/* Keyword Search */}
                <div className="relative flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Job title, keywords..."
                    className="placeholder:text-muted-foreground text-foreground h-12 w-full bg-transparent pr-4 pl-12 text-sm focus:outline-hidden"
                  />
                </div>

                {/* Divider */}
                <div className="bg-border/60 hidden h-8 w-px sm:block" />

                {/* Location Search */}
                <div className="relative flex-1">
                  <MapPin className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location or Remote..."
                    className="placeholder:text-muted-foreground text-foreground h-12 w-full bg-transparent pr-4 pl-12 text-sm focus:outline-hidden"
                  />
                </div>

                {/* Action CTA */}
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 shadow-primary/20 hover:shadow-primary/30 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white shadow-lg transition-all hover:scale-102 hover:shadow-xl sm:w-auto"
                >
                  <Search className="h-4 w-4" />
                  <span>Search Jobs</span>
                </button>
              </form>

              {/* Trending Keywords */}
              <div className="mt-4 flex flex-wrap items-center gap-2 px-1">
                <span className="text-muted-foreground flex items-center gap-1 text-xs font-semibold">
                  <TrendingUp className="text-primary h-3 w-3" />
                  Trending:
                </span>
                {["React", "UI/UX", "Python", "Remote", "DevOps"].map(
                  (term, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleTrendingClick(term)}
                      className="bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground hover:border-primary/20 cursor-pointer rounded-lg border border-transparent px-2.5 py-1 text-xs font-medium transition-all"
                    >
                      {term}
                    </button>
                  ),
                )}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                {
                  icon: Briefcase,
                  value: "50K+",
                  label: "Active Jobs",
                  color: "primary",
                },
                {
                  icon: Building2,
                  value: "10K+",
                  label: "Companies",
                  color: "accent",
                },
                {
                  icon: Users,
                  value: "12M+",
                  label: "Job Seekers",
                  color: "primary",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-start gap-2"
                >
                  <div
                    className={`mb-1 flex h-11 w-11 items-center justify-center rounded-xl bg-${stat.color}/10 transition-all group-hover:bg-${stat.color}/20`}
                  >
                    <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                  </div>
                  <p className="text-foreground text-2xl font-bold sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Globe Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-2"
          >
            <div className="relative mx-auto h-[280px] w-full max-w-[320px] sm:h-[400px] sm:max-w-[450px] lg:h-[600px] lg:max-w-[500px]">
              {/* Glow Effect */}
              <div className="from-primary/20 via-primary/10 pointer-events-none absolute inset-0 rounded-full bg-linear-to-br to-transparent blur-3xl" />

              {/* Globe */}
              <div className="relative h-full w-full">
                <Suspense fallback={<GlobeSkeleton />}>
                  <World data={globeSampleAreas} globeConfig={globeConfig} />
                </Suspense>
              </div>

              {/* Floating Cards with Theme Colors */}
              {/* Top Right Card */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="absolute -top-4 -right-4 hidden sm:right-0 sm:block lg:-top-6 lg:-right-8"
              >
                <Card className="group border-border/60 bg-card/90 hover:border-primary/40 hover:shadow-primary/10 p-4 shadow-xl backdrop-blur-xl transition-all hover:shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="from-primary/20 to-primary/10 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br">
                      <TrendingUp className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">
                        Active Now
                      </p>
                      <p className="text-foreground text-2xl font-bold">50K+</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Bottom Left Card */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="absolute -bottom-6 -left-4 hidden sm:left-0 sm:block lg:-bottom-10 lg:-left-8"
              >
                <Card className="group border-border/60 bg-card/90 hover:border-accent/40 hover:shadow-accent/10 p-4 shadow-xl backdrop-blur-xl transition-all hover:shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="from-accent/20 to-accent/10 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br">
                      <Building2 className="text-accent h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">
                        Top Companies
                      </p>
                      <p className="text-foreground text-2xl font-bold">10K+</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Bottom Center Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="absolute -bottom-12 left-1/2 hidden -translate-x-1/2 sm:-bottom-16 sm:block"
              >
                <Badge className="border-border/60 bg-card/90 px-5 py-2.5 text-sm font-semibold shadow-xl backdrop-blur-xl">
                  <span className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {[
                        "from-blue-500 to-blue-600",
                        "from-pink-500 to-pink-600",
                        "from-purple-500 to-purple-600",
                      ].map((gradient, i) => (
                        <div
                          key={i}
                          className={`border-card h-5 w-5 rounded-full border bg-linear-to-br ${gradient}`}
                        />
                      ))}
                    </div>
                    <span className="from-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
                      Trusted by 12M+ Professionals
                    </span>
                  </span>
                </Badge>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
