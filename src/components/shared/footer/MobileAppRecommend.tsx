"use client";
import { Apple, Play } from "lucide-react";
import { motion } from "motion/react";
import HoverHint from "../HoverHint";

const MobileAppRecommend = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/5 absolute inset-0" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
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
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
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
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-16 lg:p-20">
          {/* Inner Glow */}
          <div className="from-primary/10 pointer-events-none absolute inset-0 bg-linear-to-br to-transparent opacity-50" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-primary/10 mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm"
            >
              <span className="bg-primary flex h-2 w-2 rounded-full" />
              <span className="text-foreground/80">
                Available on iOS & Android
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-foreground mb-6 text-3xl font-bold tracking-tight sm:text-5xl lg:max-w-3xl"
            >
              Take Your Career Search to the Next Level
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg leading-relaxed"
            >
              Download the Workly_job mobile app today. Search jobs, apply
              instantly, and get real-time notifications right in your pocket.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            >
              {/* App Store Button */}
              <HoverHint hint="Coming soon">
                <button className="group relative flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-white ring-1 ring-white/20 transition-all hover:scale-105 hover:bg-zinc-900 active:scale-95 sm:gap-3 sm:rounded-2xl sm:px-8 sm:py-4">
                  <Apple className="h-6 w-6 transition-transform group-hover:scale-110 sm:h-8 sm:w-8" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="mb-0.5 text-[8px] font-medium text-zinc-400 sm:mb-1 sm:text-[10px]">
                      Download on the
                    </span>
                    <span className="text-base font-bold tracking-wide sm:text-xl">
                      App Store
                    </span>
                  </div>
                </button>
              </HoverHint>

              {/* Play Store Button */}
              <HoverHint hint="Coming soon">
                <button className="group relative flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-white ring-1 ring-white/20 transition-all hover:scale-105 hover:bg-zinc-900 active:scale-95 sm:gap-3 sm:rounded-2xl sm:px-8 sm:py-4">
                  <Play className="h-6 w-6 fill-white transition-transform group-hover:scale-110 sm:h-8 sm:w-8" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="mb-0.5 text-[8px] font-medium text-zinc-400 sm:mb-1 sm:text-[10px]">
                      Get it on
                    </span>
                    <span className="text-base font-bold tracking-wide sm:text-xl">
                      Google Play
                    </span>
                  </div>
                </button>
              </HoverHint>
            </motion.div>
          </div>

          {/* Abstract Shape Decorations */}
          <div className="bg-primary/20 absolute top-1/2 -right-40 h-80 w-80 -translate-y-1/2 rounded-full blur-[80px]" />
          <div className="bg-accent/20 absolute top-1/2 -left-40 h-80 w-80 -translate-y-1/2 rounded-full blur-[80px]" />
        </div>
      </div>
    </section>
  );
};

export default MobileAppRecommend;
