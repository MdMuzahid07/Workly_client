"use client";

import { Button } from "@/components/ui/button";
import { useCanAccess } from "@/hooks/useEntitlements";
import { useAppSelector } from "@/redux/hooks";
import { PlanFeatureFlags } from "@/types/subscription";
import { motion, Variants } from "framer-motion";
import {
  BarChart3,
  Crown,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import ParticlesBg from "../main/auth/ParticlesBg";

interface UpgradeGateProps {
  feature: keyof PlanFeatureFlags;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  title?: string;
  description?: string;
}

interface FeatureConfig {
  badge: string;
  headline: string;
  highlightWord: string;
  description: string;
  cards: { icon: LucideIcon; title: string; subtitle: string }[];
  primaryCta: string;
  trust: string;
}

const FEATURE_CONFIG: Record<string, FeatureConfig> = {
  canViewAnalytics: {
    badge: "PREMIUM EXPERIENCE",
    headline: "Unlock Powerful Hiring",
    highlightWord: "Analytics.",
    description:
      "Gain full visibility into your hiring funnel with detailed performance reports, candidate insights, and team metrics.",
    cards: [
      {
        icon: BarChart3,
        title: "Funnel Reports",
        subtitle: "Conversion at every stage",
      },
      {
        icon: TrendingUp,
        title: "Job Performance",
        subtitle: "See which roles attract talent",
      },
      {
        icon: Users,
        title: "Team Metrics",
        subtitle: "Track recruiter activity",
      },
    ],
    primaryCta: "Go Premium Now",
    trust: "Trusted by 12,000+ hiring teams worldwide",
  },
  canMessage: {
    badge: "PREMIUM EXPERIENCE",
    headline: "Connect Directly with",
    highlightWord: "Top Candidates.",
    description:
      "Send and receive real-time messages with job seekers. Build relationships with candidates before they apply elsewhere.",
    cards: [
      {
        icon: MessageSquare,
        title: "Direct Messaging",
        subtitle: "No email back-and-forth",
      },
      {
        icon: Zap,
        title: "Real-time Chat",
        subtitle: "Instant delivery & receipts",
      },
      {
        icon: Users,
        title: "Unified Inbox",
        subtitle: "All conversations in one place",
      },
    ],
    primaryCta: "Go Premium Now",
    trust: "Trusted by 12,000+ hiring teams worldwide",
  },
  canMessageEmployer: {
    badge: "PREMIUM EXPERIENCE",
    headline: "Message Recruiters",
    highlightWord: "Directly.",
    description:
      "Skip the queue and reach hiring managers directly. Follow up on applications and stand out from other candidates.",
    cards: [
      {
        icon: MessageSquare,
        title: "Direct Outreach",
        subtitle: "Message any recruiter",
      },
      {
        icon: Search,
        title: "Application Follow-up",
        subtitle: "Stay top of mind",
      },
      {
        icon: Zap,
        title: "Priority Delivery",
        subtitle: "Messages delivered instantly",
      },
    ],
    primaryCta: "Go Premium Now",
    trust: "Trusted by 50,000+ professionals worldwide",
  },
};

const DEFAULT_CONFIG: FeatureConfig = {
  badge: "PREMIUM EXPERIENCE",
  headline: "Unlock Advanced",
  highlightWord: "Career Growth.",
  description:
    "Get access to our advanced matching engine that surfaces the most relevant job opportunities tailored specifically to your expertise.",
  cards: [
    {
      icon: Sparkles,
      title: "99% Precision Match",
      subtitle: "Based on your exact skills",
    },
    { icon: Zap, title: "Smart Insights", subtitle: "Know why you're a fit" },
    {
      icon: TrendingUp,
      title: "Priority Access",
      subtitle: "See new jobs before others",
    },
  ],
  primaryCta: "Go Premium Now",
  trust: "Trusted by 50,000+ professionals worldwide",
};

// Cinematic easeOut transition
const customEaseOut = [0.25, 1, 0.5, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: customEaseOut,
    },
  },
};

const iconVariants: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.12,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};

export default function UpgradeGate({
  feature,
  children,
  fallback,
  title,
  description,
}: UpgradeGateProps) {
  const { hasAccess, isLoading, limit, current } = useCanAccess(feature);
  const { user } = useAppSelector((state) => state.auth) || {};

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  if (hasAccess) return <>{children}</>;
  if (fallback) return <>{fallback}</>;

  const isEmployer = user?.role === "EMPLOYER";
  const pricingLink = isEmployer ? "/employer/pricing" : "/dashboard/pricing";
  const cfg = FEATURE_CONFIG[feature] ?? DEFAULT_CONFIG;

  return (
    <div className="relative flex min-h-[calc(100vh-140px)] w-full items-center justify-center overflow-hidden px-4 py-6 sm:py-8">
      {/* 
        ✨ PAGE BACKGROUND PARTICLES:
        Animates in the page background behind the card container.
        Using z-0 to render on top of the page background, but below the z-10 card container.
      */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ParticlesBg active={true} />
      </div>

      {/* 
        🧠 OPTIMIZED PREVIEW:
        Render with a delayed fade-in (delay: 0.5s) to ensure the card's entry animation 
        is processed at 120fps without GPU bottlenecks from CSS filters.
        Using z-0 to render behind the main card (z-10).
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 scale-[1.01] overflow-hidden blur-lg filter will-change-[filter,opacity] select-none"
      >
        {children}
      </motion.div>

      {/* CSS Animation Injector for Shimmer Button */}
      <style jsx global>{`
        @keyframes custom-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-btn-shimmer {
          background-size: 200% 100%;
          animation: custom-shimmer 3s infinite linear;
        }
      `}</style>

      {/* 
        Floating premium card container.
        - Mobile: p-6, rounded-[32px], bg-card, border border-border/80.
        - Desktop: border-2, rounded-[40px], bg-gradient-to-br, backdrop-blur.
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: customEaseOut,
        }}
        className="bg-card sm:via-card dark:sm:via-card border-border/80 relative z-10 w-full max-w-4xl overflow-hidden rounded-[32px] border p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] will-change-[transform,opacity] sm:rounded-[40px] sm:bg-gradient-to-br sm:from-emerald-50/40 sm:to-teal-50/20 sm:p-10 sm:shadow-none sm:backdrop-blur-md md:p-12 lg:p-16 dark:sm:from-emerald-950/10 dark:sm:to-teal-950/10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center"
        >
          {/* Green premium experience pill badge */}
          <div className="mb-5 overflow-hidden sm:mb-8">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100/80 bg-emerald-50/50 px-4 py-1.5 sm:px-5 sm:py-2 dark:border-emerald-950/30 dark:bg-emerald-950/20"
            >
              <Crown className="h-3.5 w-3.5 text-emerald-600 sm:h-4 sm:w-4 dark:text-emerald-400" />
              <span className="text-[9px] font-bold tracking-widest text-emerald-700 uppercase sm:text-[10px] dark:text-emerald-400">
                {cfg.badge}
              </span>
            </motion.div>
          </div>

          {/* Headline */}
          <div className="mb-3 overflow-hidden sm:mb-5">
            <motion.h1
              variants={itemVariants}
              className="text-foreground max-w-3xl text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[44px]"
            >
              {title ? (
                title
              ) : (
                <>
                  {cfg.headline}{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {cfg.highlightWord}
                  </span>
                </>
              )}
            </motion.h1>
          </div>

          {/* Subtitle description */}
          <div className="mb-6 overflow-hidden sm:mb-10">
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mx-auto max-w-2xl text-xs leading-relaxed sm:text-sm md:text-base"
            >
              {description || cfg.description}
            </motion.p>
          </div>

          {/* Usage limit bar if quota applies */}
          {limit > 0 && (
            <motion.div
              variants={itemVariants}
              className="border-border bg-card/60 mx-auto mb-8 w-full max-w-xs rounded-xl border px-4 py-2.5 text-left"
            >
              <div className="text-muted-foreground mb-1.5 flex justify-between text-xs font-semibold">
                <span>Usage limit reached</span>
                <span className="text-foreground">
                  {current} / {limit}
                </span>
              </div>
              <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-emerald-600"
                  style={{
                    width: `${Math.min(100, (current / limit) * 100)}%`,
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* 
            Row of clean cards (Always 3 columns)
            - Restored on mobile to display horizontally inside a grid.
          */}
          <motion.div
            variants={itemVariants}
            className="mb-8 grid w-full max-w-3xl grid-cols-3 gap-2 sm:mb-12 sm:gap-5"
          >
            {cfg.cards.map(({ icon: Icon, title: cardTitle, subtitle }) => (
              <motion.div
                key={cardTitle}
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: { y: 0 },
                  hover: {
                    y: -6,
                    borderColor: "rgba(16, 185, 129, 0.50)",
                  },
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="bg-card border-border/50 flex cursor-pointer flex-col items-center rounded-2xl border p-2.5 text-center transition-colors duration-300 sm:p-6"
              >
                {/* Compact icon container */}
                <motion.div
                  variants={iconVariants}
                  className="mb-2 flex h-9 w-9 animate-none items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 sm:mb-4 sm:h-12 sm:w-12 dark:border-emerald-900/30 dark:bg-emerald-950/20"
                >
                  <Icon className="h-4.5 w-4.5 text-emerald-600 sm:h-5.5 sm:w-5.5 dark:text-emerald-400" />
                </motion.div>
                <p className="text-foreground mb-0.5 text-[10px] leading-tight font-bold sm:mb-1.5 sm:text-[13px]">
                  {cardTitle}
                </p>
                <p className="text-muted-foreground hidden text-[10px] leading-snug sm:block sm:text-[11px]">
                  {subtitle}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA & Trust Assurance Block */}
          <motion.div
            variants={itemVariants}
            className="flex w-full flex-col items-center gap-4"
          >
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Link href={pricingLink} className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <Button className="animate-btn-shimmer h-11 w-full rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 px-8 text-xs font-bold text-white transition-all sm:h-12 sm:rounded-2xl sm:px-10 sm:text-sm">
                    Go Premium Now
                    <span className="ml-2 font-normal">→</span>
                  </Button>
                </motion.div>
              </Link>

              <Link href={pricingLink} className="w-full text-center sm:w-auto">
                <motion.span
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center justify-center gap-1 py-2 text-[11px] font-bold transition-colors sm:text-xs"
                >
                  View all premium benefits
                  <span className="ml-1 font-normal">→</span>
                </motion.span>
              </Link>
            </div>

            {/* Risk Reversal */}
            <div className="text-muted-foreground mt-1 flex flex-wrap items-center justify-center gap-1 text-[10px] font-semibold sm:mt-2 sm:gap-1.5 sm:text-[11px]">
              <ShieldCheck className="h-4 w-4 text-emerald-600 sm:h-4.5 sm:w-4.5 dark:text-emerald-400" />
              <span>14-Day Money-Back Guarantee</span>
              <span className="text-border mx-1 hidden sm:inline">•</span>
              <span>Cancel Anytime</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer social proof */}
        <motion.div
          variants={itemVariants}
          className="border-border/40 mt-10 w-full border-t pt-5 text-center sm:mt-14 sm:pt-6"
        >
          <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase sm:text-[11px]">
            {cfg.trust}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
