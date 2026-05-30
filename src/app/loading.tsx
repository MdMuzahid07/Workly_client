"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const statuses = [
  "Getting things ready for you...",
  "Setting up your personalized dashboard...",
  "Loading the latest job listings...",
  "Polishing your workspace...",
  "Almost there, doing a quick final check...",
];

export default function Loading() {
  const [statusIndex, setStatusIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState(0);

  // Status message rotation
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 1800);
    return () => clearInterval(statusInterval);
  }, []);

  // Simulating realistic high-fidelity progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 98;
        // Faster load initially, then slows down simulating actual resolution
        const remaining = 100 - prev;
        const increment = Math.max(0.5, Math.random() * (remaining * 0.15));
        return Math.min(prev + increment, 98);
      });
    }, 500);
    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-[#09090b]">
      {/* Dynamic Keyframes for Shimmer & Pulse */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer-move {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer-move 2s infinite linear;
        }
      `,
        }}
      />

      {/* Atmospheric Background Mesh Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-48 -left-48 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/5"
        />
        <motion.div
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-primary/10 dark:bg-primary/5 absolute -right-48 -bottom-48 h-96 w-96 rounded-full blur-[120px]"
        />
        <div className="bg-primary/5 dark:bg-primary/2 absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" />
      </div>

      {/* Main Glassmorphic Panel Container */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-4 flex w-full max-w-[340px] flex-col items-center rounded-2xl border border-white/20 bg-white/70 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/5 dark:bg-zinc-950/40 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
      >
        {/* Gyroscopic orbital logo container */}
        <div className="relative mt-2 mb-6 flex h-28 w-28 items-center justify-center">
          {/* Central Logo Pulsing Ambient light */}
          <div className="bg-primary/20 dark:bg-primary/10 absolute inset-0 animate-pulse rounded-full blur-xl" />

          {/* Outer Dashed Orbiting Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="border-primary/30 absolute inset-0 rounded-full border border-dashed"
          />

          {/* Inner Custom Orbital Trail Spinner */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="border-t-primary absolute inset-2.5 rounded-full border border-solid border-emerald-500/10"
          />

          {/* Orbiting Laser Dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 flex items-start justify-center"
          >
            <div className="bg-primary h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(51,178,103,1)]" />
          </motion.div>

          {/* Logo Center Shield */}
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-zinc-200/50 bg-white p-2.5 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Image
              src="/logo/workly_job-logo.png"
              alt="Workly Job Logo"
              width={64}
              height={64}
              className="h-auto w-full animate-pulse object-contain select-none"
              draggable={false}
              priority
            />
          </motion.div>
        </div>

        {/* User-Friendly Title */}
        <h3 className="font-barlow mt-1 mb-2 text-center text-base font-extrabold tracking-tight text-zinc-800 select-none dark:text-zinc-100">
          {`Let's`} find your next move
        </h3>

        {/* Quiet visual load indicator and minimal status */}
        <div className="mt-6 flex w-full flex-col items-center">
          <div className="mb-3 flex h-5 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={statusIndex}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 0.5 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="text-center font-sans text-[9px] font-bold tracking-[0.2em] text-zinc-500 uppercase select-none dark:text-zinc-400"
              >
                {statuses[statusIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Premium indefinitely pulsing micro line */}
          <div className="relative h-0.5 w-16 overflow-hidden rounded-full bg-zinc-200/50 dark:bg-zinc-800/80">
            <motion.div
              animate={{
                left: ["-100%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="via-primary absolute top-0 bottom-0 w-8 bg-linear-to-r from-transparent to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
