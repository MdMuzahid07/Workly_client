"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { GlobeConfig } from "@/components/ui/globe";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowRight, Briefcase, Building2, Globe2 } from "lucide-react";
import Link from "next/link";
import type { ComponentType, RefObject } from "react";
import { Suspense } from "react";
import { globeConfig, globeSampleAreas } from "../../constants";
import GlobeSkeleton from "../../skeleton/landing/GlobeSkeleton";

interface WorldProps {
  data: typeof globeSampleAreas;
  globeConfig: GlobeConfig;
}

interface LandingHeroProps {
  heroRef: RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  World: ComponentType<WorldProps>;
}

const LandingHero = ({ heroRef, scrollYProgress, World }: LandingHeroProps) => {
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div>
      {/* Hero Section - Modern Dark Design */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-[92vh] overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
      >
        {/* Grid Pattern Background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-size-[32px_32px]" />

        {/* Animated Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          {/* Primary Glow - Top Right */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.4, 0.25],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="from-primary/25 absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-linear-to-br via-green-500/20 to-transparent blur-[100px]"
          />

          {/* Secondary Glow - Bottom Left */}
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.35, 0.2],
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-40 -left-40 h-[700px] w-[700px] rounded-full bg-linear-to-tr from-emerald-500/20 via-green-600/15 to-transparent blur-[120px]"
          />

          {/* Accent Glow - Center */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="from-primary/15 to-accent/15 absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r blur-[130px]"
          />

          {/* Subtle Top Accent */}
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-green-400/10 blur-[90px]"
          />
        </div>

        {/* Noise Texture Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.4)_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-20 xl:pt-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 order-2 lg:order-1"
            >
              {/* Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6 inline-flex"
              >
                <Badge className="group border-primary/20 bg-primary/10 hover:border-primary/30 hover:bg-primary/15 gap-2 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-xl transition-all">
                  <Globe2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  <span>Find Jobs, Employment & Career Opportunities</span>
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mb-6 text-5xl leading-[1.1] font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
              >
                <span className="block text-white">Get a</span>
                <span className="relative block">
                  <span className="from-primary bg-linear-to-r via-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Job that Perfect
                  </span>
                  <motion.span
                    className="from-primary/40 absolute right-0 -bottom-2 left-0 h-1.5 bg-linear-to-r via-green-400/40 to-transparent blur-sm"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </span>
                <span className="from-primary block bg-linear-to-r to-green-500 bg-clip-text text-transparent">
                  for You
                </span>
              </motion.h1>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-8"
              >
                <Link href="/jobs">
                  <Button
                    size="lg"
                    className="group relative h-14 overflow-hidden rounded-full bg-white px-8 text-base font-semibold text-slate-900 shadow-2xl shadow-white/20 transition-all hover:scale-105 hover:shadow-white/30"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      FIND JOB
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="from-primary/10 absolute inset-0 bg-linear-to-r to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </Link>
              </motion.div>

              {/* Highlight Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="inline-block"
              >
                <Card className="hover:shadow-primary/5 border-slate-700/50 bg-linear-to-br from-slate-800/90 to-slate-900/90 p-6 backdrop-blur-xl transition-all hover:border-slate-600/50 hover:shadow-lg">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                      Be Found, Put Your
                    </p>
                    <p className="text-lg leading-tight font-bold text-white">
                      CV IN FRONT OF GREAT
                    </p>
                    <p className="text-lg leading-tight font-bold text-white">
                      EMPLOYERS
                    </p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Right Column - Globe with Floating Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative order-1 lg:order-2"
            >
              {/* Main Globe Container */}
              <div className="relative mx-auto h-[400px] w-full max-w-[500px] sm:h-[500px] lg:h-[550px] xl:h-[600px]">
                {/* Glow Effect Behind Globe */}
                <div className="from-primary/30 pointer-events-none absolute inset-0 scale-110 rounded-full bg-linear-to-br via-green-500/20 to-emerald-500/30 blur-3xl" />

                {/* Globe */}
                <div className="relative h-full w-full">
                  <Suspense fallback={<GlobeSkeleton />}>
                    <World data={globeSampleAreas} globeConfig={globeConfig} />
                  </Suspense>
                </div>

                {/* Floating Stat Card - Top Right */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: -30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1, duration: 0.7 }}
                  className="absolute -top-2 -right-2 z-20 sm:-right-4 lg:-top-4 lg:-right-8"
                >
                  <Card className="group hover:border-primary/30 hover:shadow-primary/20 border-slate-700/50 bg-linear-to-br from-slate-800/95 to-slate-900/95 p-4 shadow-2xl backdrop-blur-xl transition-all hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="from-primary/20 to-primary/10 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br transition-transform group-hover:scale-110">
                        <Briefcase className="text-primary h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-medium text-gray-400">
                          Active Jobs
                        </p>
                        <p className="text-2xl font-bold text-white">50K+</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Floating Stat Card - Bottom Left */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  className="absolute -bottom-4 -left-2 z-20 sm:-left-4 lg:-bottom-8 lg:-left-8"
                >
                  <Card className="group hover:border-accent/30 hover:shadow-accent/20 border-slate-700/50 bg-linear-to-br from-slate-800/95 to-slate-900/95 p-4 shadow-2xl backdrop-blur-xl transition-all hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="from-accent/20 to-accent/10 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br transition-transform group-hover:scale-110">
                        <Building2 className="text-accent h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-medium text-gray-400">
                          Companies
                        </p>
                        <p className="text-2xl font-bold text-white">10K+</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* User Stats Badge - Bottom Center */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.7 }}
                  className="absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 sm:-bottom-16 lg:-bottom-20"
                >
                  <Card className="group hover:border-primary/30 hover:shadow-primary/20 border-slate-700/50 bg-linear-to-br from-slate-800/95 to-slate-900/95 px-6 py-4 shadow-2xl backdrop-blur-xl transition-all hover:scale-105">
                    <div className="flex flex-col items-center gap-2">
                      <div className="mb-1 flex -space-x-2">
                        {[
                          "from-blue-500 to-blue-600",
                          "from-pink-500 to-pink-600",
                          "from-purple-500 to-purple-600",
                        ].map((gradient, i) => (
                          <div
                            key={i}
                            className={`h-9 w-9 rounded-full border-2 border-slate-800 bg-linear-to-br ${gradient} ring-2 ring-slate-800/50 transition-transform group-hover:scale-110`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                      <p className="text-3xl font-bold text-white">12M</p>
                      <p className="text-xs font-medium text-gray-400">
                        User Worldwide
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Curved Bottom Divider */}
        <div className="absolute inset-x-0 -bottom-px z-10">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L720 0L1440 120V120H0V120Z"
              className="fill-background"
            />
          </svg>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingHero;
