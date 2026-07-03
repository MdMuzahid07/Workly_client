"use client";
import { Badge } from "@/components/ui/badge";
import { Apple, Bell, Play, Smartphone, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import QRCode from "react-qr-code";
import HoverHint from "../HoverHint";
import { useGetPublicSystemSettingsQuery } from "@/redux/feature/admin/adminApi";

const MobileAppRecommend = () => {
  const { data: settingsData } = useGetPublicSystemSettingsQuery();
  const qrCodeUrl =
    settingsData?.data?.qrCodeUrl || "https://mdmuzahid.vercel.app";

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/5 absolute inset-0" />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-primary/20 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.04, 0.1, 0.04],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-accent/20 absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-[100px]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-primary/10 to-primary/5 dark:to-primary-950/20 relative overflow-hidden rounded-[2.5rem] border bg-linear-to-br from-emerald-500/5 via-teal-500/5 p-8 backdrop-blur-md sm:p-12 lg:p-16 dark:from-emerald-950/20 dark:via-zinc-900/30">
          {/* Inner Glow */}
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-linear-to-br to-transparent opacity-30 dark:opacity-50" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Promotion Content */}
            <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex"
              >
                <Badge className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm transition-all">
                  <Smartphone className="h-3.5 w-3.5" />
                  Available on iOS & Android
                </Badge>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:leading-tight"
              >
                Take Your Career Search to the{" "}
                <span className="to-primary bg-linear-to-r from-emerald-500 bg-clip-text text-transparent">
                  Next Level
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground mt-4 mb-10 max-w-xl text-base leading-relaxed sm:text-lg"
              >
                Download the Workly_job mobile app today. Search jobs, apply
                instantly with one-tap, and get real-time notifications right in
                your pocket.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8 lg:justify-start lg:gap-10"
              >
                {/* QR Code Section */}
                <div className="order-1 flex flex-col items-center justify-center gap-3 sm:order-2 sm:flex-row sm:border-l sm:border-zinc-200 sm:pl-6 lg:pl-8 dark:sm:border-zinc-800">
                  <div className="bg-background border-border/50 flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border p-2 shadow-sm sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                    <QRCode
                      value={qrCodeUrl}
                      size={200}
                      bgColor="transparent"
                      fgColor="currentColor"
                      className="text-foreground h-full w-full"
                      level="M"
                    />
                  </div>
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="text-foreground text-sm leading-none font-bold">
                      Scan to Download
                    </span>
                    <span className="text-muted-foreground mt-1.5 text-[10px] leading-none">
                      Use phone camera
                    </span>
                  </div>
                </div>

                {/* Buttons Container */}
                <div className="order-2 flex flex-row items-center justify-center gap-3 sm:flex-col sm:gap-4 lg:order-1 lg:items-start lg:justify-start">
                  {/* App Store Button */}
                  <HoverHint hint="Coming soon">
                    <button className="group hover:border-primary/50 hover:shadow-primary/5 relative z-10 flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-98 sm:gap-4 sm:rounded-2xl sm:px-8 sm:py-3.5">
                      {/* Dynamic Gradient Overlay */}
                      <div className="from-primary/20 to-accent/20 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <Apple className="relative z-10 h-5 w-5 text-white transition-colors duration-300 sm:h-7 sm:w-7" />

                      <div className="relative z-10 flex flex-col items-start leading-none">
                        <span className="mb-0.5 text-[7px] font-extrabold tracking-widest text-zinc-400 uppercase sm:mb-1.5 sm:text-[9px]">
                          Download on the
                        </span>
                        <span className="text-xs font-black tracking-wide sm:text-lg">
                          App Store
                        </span>
                      </div>
                    </button>
                  </HoverHint>

                  {/* Play Store Button */}
                  <HoverHint hint="Under Development">
                    <button className="group hover:border-primary/50 hover:shadow-primary/5 relative z-10 flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-98 sm:gap-4 sm:rounded-2xl sm:px-8 sm:py-3.5">
                      {/* Dynamic Gradient Overlay */}
                      <div className="from-primary/20 to-accent/20 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <Play className="relative z-10 h-5 w-5 fill-white text-white transition-colors duration-300 sm:h-7 sm:w-7" />

                      <div className="relative z-10 flex flex-col items-start leading-none">
                        <span className="mb-0.5 text-[7px] font-extrabold tracking-widest text-zinc-400 uppercase sm:mb-1.5 sm:text-[9px]">
                          Get it on
                        </span>
                        <span className="text-xs font-black tracking-wide sm:text-lg">
                          Google Play
                        </span>
                      </div>
                    </button>
                  </HoverHint>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Premium CSS Smartphone Mockup */}
            <div className="relative hidden items-center justify-center pt-8 sm:flex lg:col-span-5 lg:pt-0">
              {/* Floating Element 1: Match Rating */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-background/95 border-primary/20 absolute -top-2 left-0 z-20 flex max-w-[130px] items-center gap-2.5 rounded-xl border p-3 shadow-xl backdrop-blur-md sm:left-4 md:left-8 lg:-left-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground truncate text-[10px] font-extrabold">
                    98% Match
                  </span>
                  <span className="text-muted-foreground truncate text-[8.5px]">
                    Perfect fit
                  </span>
                </div>
              </motion.div>

              {/* Floating Element 2: Notification Received */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="bg-background/95 border-primary/20 absolute right-0 bottom-16 z-20 flex max-w-[140px] items-center gap-2.5 rounded-xl border p-3 shadow-xl backdrop-blur-md sm:right-4 md:right-8 lg:-right-4"
              >
                <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground truncate text-[10px] font-extrabold">
                    Offer Received
                  </span>
                  <span className="text-muted-foreground truncate text-[8.5px]">
                    Vercel Inc.
                  </span>
                </div>
              </motion.div>

              {/* Floating Element 3: Star Review Badge */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-6 left-2 z-20 flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950 px-3.5 py-1.5 text-white shadow-lg sm:left-6 md:left-12 lg:-left-6"
              >
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] leading-none font-black">4.9</span>
                <span className="text-[8.5px] leading-none text-zinc-400">
                  iOS store rating
                </span>
              </motion.div>

              {/* Smartphone Mockup Body */}
              <div className="relative mx-auto h-[440px] w-[220px] rounded-[36px] border-4 border-slate-900 bg-slate-950 p-2 shadow-2xl dark:border-slate-800">
                {/* Notch / Dynamic Island */}
                <div className="absolute top-3.5 left-1/2 z-30 h-3.5 w-14 -translate-x-1/2 rounded-full bg-slate-900" />

                {/* Simulated Screen */}
                <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-slate-900 p-2.5 select-none">
                  {/* Screen Gradient Background */}
                  <div className="from-primary/10 bg-linear-to absolute inset-0 -z-10 via-zinc-950 to-zinc-950" />

                  {/* App Navigation */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-500">
                        <svg
                          className="h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 12l3 9 4-14 4 14 3-9" />
                        </svg>
                      </div>
                      <span className="text-[9.5px] font-black tracking-tight text-white">
                        Workly<span className="text-emerald-500">Job</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  </div>

                  {/* App Search Input */}
                  <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-white/5 bg-zinc-800/40 p-2">
                    <Smartphone className="h-2.5 w-2.5 text-zinc-500" />
                    <span className="text-[8.5px] text-zinc-400">
                      Search 10,000+ jobs...
                    </span>
                  </div>

                  {/* Job Feed */}
                  <div className="mt-3.5 space-y-2">
                    <span className="block px-0.5 text-[7.5px] font-bold tracking-wider text-zinc-500 uppercase">
                      Recommended For You
                    </span>

                    {/* App Job Card 1 */}
                    <div className="space-y-1 rounded-xl border border-white/5 bg-zinc-800/50 p-2">
                      <div className="flex items-center justify-between">
                        <span className="max-w-[110px] truncate text-[8.5px] font-bold text-white">
                          React Developer
                        </span>
                        <span className="shrink-0 text-[7.5px] font-semibold text-emerald-500">
                          $120K
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[6.5px] text-zinc-400">
                        <span className="max-w-20 truncate">Vercel Inc.</span>
                        <span>Remote</span>
                      </div>
                      <div className="flex gap-1 pt-0.5">
                        <span className="bg-primary/10 text-primary rounded-sm px-1 text-[5.5px]">
                          Hot
                        </span>
                        <span className="rounded-sm bg-zinc-700 px-1 text-[5.5px] text-zinc-300">
                          Full-time
                        </span>
                      </div>
                    </div>

                    {/* App Job Card 2 */}
                    <div className="space-y-1 rounded-xl border border-white/5 bg-zinc-800/50 p-2">
                      <div className="flex items-center justify-between">
                        <span className="max-w-[110px] truncate text-[8.5px] font-bold text-white">
                          UI/UX Architect
                        </span>
                        <span className="shrink-0 text-[7.5px] font-semibold text-emerald-500">
                          $140K
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[6.5px] text-zinc-400">
                        <span className="max-w-20 truncate">Figma</span>
                        <span>SF / Hybrid</span>
                      </div>
                      <div className="flex gap-1 pt-0.5">
                        <span className="bg-primary/10 text-primary rounded-sm px-1 text-[5.5px]">
                          Design
                        </span>
                        <span className="rounded-sm bg-zinc-700 px-1 text-[5.5px] text-zinc-300">
                          Full-time
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Blurred Shapes */}
          <div className="bg-primary/20 absolute top-1/2 -right-40 h-80 w-80 -translate-y-1/2 rounded-full blur-[80px]" />
          <div className="bg-accent/20 absolute top-1/2 -left-40 h-80 w-80 -translate-y-1/2 rounded-full blur-[80px]" />
        </div>
      </div>
    </section>
  );
};

export default MobileAppRecommend;
