'use client';

import { Button } from '@/components/ui/button';
import { useGetPublicStatusQuery } from '@/redux/feature/system/systemApi';
import { CheckCircle2, Lock, MapPin, RefreshCw, Settings2, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MaintenancePage() {
  const { data: statusData, isFetching, refetch } = useGetPublicStatusQuery();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 14, seconds: 13 });

  const [progressPercent, setProgressPercent] = useState<number>(78);

  useEffect(() => {
    const calculateTimer = () => {
      const estimatedEnd = statusData?.estimatedEnd;
      const setAt = statusData?.setAt;

      if (!estimatedEnd) {
        // Dynamic countdown simulation if no fixed duration set
        const now = new Date();
        const remSecs = 853 - (now.getSeconds() % 60);
        const m = Math.floor(remSecs / 60);
        const s = remSecs % 60;
        setTimeLeft({ days: 0, hours: 0, minutes: m, seconds: s });
        setProgressPercent(82);
        return;
      }

      const endMs = new Date(estimatedEnd).getTime();
      const startMs = setAt ? new Date(setAt).getTime() : endMs - 3600 * 1000;
      const nowMs = Date.now();

      const remainingMs = Math.max(0, endMs - nowMs);
      const totalDurationMs = Math.max(1, endMs - startMs);

      const elapsedMs = Math.min(totalDurationMs, nowMs - startMs);
      const percent = Math.min(100, Math.max(8, Math.round((elapsedMs / totalDurationMs) * 100)));
      setProgressPercent(percent);

      const totalSecs = Math.floor(remainingMs / 1000);
      const d = Math.floor(totalSecs / (24 * 3600));
      const h = Math.floor((totalSecs % (24 * 3600)) / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    calculateTimer();
    const interval = setInterval(calculateTimer, 1000);
    return () => clearInterval(interval);
  }, [statusData]);

  // Format digital countdown string including seconds with space padding (e.g. 14 : 13 : 45)
  const formatCountdownWithSeconds = () => {
    const pad = (num: number) => String(num).padStart(2, '0');
    if (timeLeft.days > 0) {
      return `${timeLeft.days}d  ${pad(timeLeft.hours)} : ${pad(timeLeft.minutes)} : ${pad(timeLeft.seconds)}`;
    }
    if (timeLeft.hours > 0) {
      return `${pad(timeLeft.hours)} : ${pad(timeLeft.minutes)} : ${pad(timeLeft.seconds)}`;
    }
    return `${pad(timeLeft.minutes)} : ${pad(timeLeft.seconds)}`;
  };

  return (
    <div className="light relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f8fafc] px-4 py-12 font-sans text-slate-900 selection:bg-emerald-500 selection:text-white sm:px-6 lg:px-12">
      {/* Soft Light Mode Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Tilted Polaroid Server Cat Photo Card */}
          <motion.div
            initial={{ opacity: 0, rotate: -5, scale: 0.95 }}
            animate={{ opacity: 1, rotate: -2, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center lg:col-span-5"
          >
            <div className="hover:shadow-3xl relative w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xl shadow-slate-300/60 transition-all hover:rotate-0">
              {/* Top-Right Attached Inspector Badge */}
              <div className="absolute -top-4 -right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-emerald-50 text-emerald-600 shadow-md ring-1 ring-emerald-200">
                <Wrench className="h-5 w-5" />
              </div>

              {/* Photo Frame Container */}
              <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-950 sm:h-72">
                <Image
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80"
                  alt="Head Meowcanis Server Inspection"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>

              {/* Card Footer Information */}
              <div className="mt-4 flex items-center justify-between px-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>Server Room 04-B</span>
                </div>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold tracking-wider text-emerald-600 uppercase">
                  INSPECTING
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Content & Telemetry Countdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-start text-left lg:col-span-7"
          >
            {/* Top Pill Tag */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 backdrop-blur-md">
              <Settings2 className="h-3.5 w-3.5 animate-spin text-emerald-600 [animation-duration:6s]" />
              <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase">
                System Maintenance
              </span>
            </div>

            {/* Exact Requested Hero Heading */}
            <h1 className="text-3xl leading-tight font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-5xl">
              The Meowcanis is <br className="hidden sm:inline" />
              <span className="text-emerald-600">Investigating</span>
            </h1>

            {/* Exact Requested Subtitle Text */}
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Our head meowcanis is currently inspecting the server racks for stray yarn and
              hairballs. Normal service will resume shortly.
            </p>

            {/* Dark Telemetry Countdown Box */}
            <div className="mt-8 w-full max-w-lg rounded-2xl bg-[#0b1329] p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                  Estimated Return
                </p>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Digital Countdown Display Including Seconds */}
              <div className="mt-3 font-mono text-3xl font-black tracking-wider text-white sm:text-4xl">
                {formatCountdownWithSeconds()}
              </div>

              {/* Animated Progress Bar */}
              <div className="relative mt-5 h-2.5 w-full overflow-hidden rounded-full bg-slate-800/80">
                <motion.div
                  className="h-full rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex w-full flex-wrap items-center gap-4 sm:w-auto">
              <Button
                onClick={() => refetch()}
                disabled={isFetching}
                className="h-12 w-full cursor-pointer rounded-xl bg-emerald-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-95 sm:w-auto"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Checking Status...' : 'Refresh Status'}
              </Button>

              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-12 w-full cursor-pointer rounded-xl border-slate-300 bg-white px-7 text-sm font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-950 active:scale-95 sm:w-auto"
                >
                  <Lock className="mr-2 h-4 w-4 text-emerald-600" />
                  Administrator Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
