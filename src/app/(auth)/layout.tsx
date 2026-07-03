/* eslint-disable @next/next/no-img-element */
"use client";

import WJLogo from "@/components/shared/WJLogo";
import { Button } from "@/components/ui/button";
import { useGetJobsQuery } from "@/redux/feature/job/jobApi";
import { CheckCircle2, MoveLeft, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: jobsData } = useGetJobsQuery({ limit: 1 });

  const totalActiveJobs =
    jobsData?.meta?.total ||
    (Array.isArray(jobsData?.data) ? jobsData.data.length : 0);

  const isEmployerRole = searchParams.get("role") === "employer";

  const getPageContent = () => {
    if (pathname.includes("/login")) {
      return {
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
        badge: "Candidate & Employer Portal",
        headline: "Empowering career-defining moves.",
        sub: "Access real-time job listings, manage ongoing applications, and connect directly with verified enterprise hiring managers.",
        statLabel: "Live Active Listings",
        statValue: totalActiveJobs > 0 ? `${totalActiveJobs}` : "Real-Time",
      };
    }
    if (pathname.includes("/register")) {
      if (isEmployerRole) {
        return {
          image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
          badge: "Enterprise Recruiter",
          headline: "Find the visionaries your team needs.",
          sub: "Post jobs, search verified professional candidate profiles, and manage your pipeline in one secure workspace.",
          statLabel: "Talent Pool",
          statValue: "100% Verified",
        };
      }
      return {
        image:
          "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80",
        badge: "Create Free Account",
        headline: "Where great talent meets vision.",
        sub: "Build your verified professional profile to showcase your skills and experience directly to recruiters.",
        statLabel: "Platform Verification",
        statValue: "100% Verified",
      };
    }
    if (pathname.includes("/forgot-password")) {
      return {
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80",
        badge: "Account Recovery",
        headline: "Security & seamless access.",
        sub: "We prioritize your data privacy. Reset your password safely using secure multi-factor authentication protocols.",
        statLabel: "Security Protocol",
        statValue: "AES-256",
      };
    }
    if (pathname.includes("/reset-password")) {
      return {
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
        badge: "Credential Update",
        headline: "Protecting your digital identity.",
        sub: "Set a strong, unique password to ensure your profile details and private messages remain protected.",
        statLabel: "Account Status",
        statValue: "Encrypted",
      };
    }
    if (
      pathname.includes("/verify-email") ||
      pathname.includes("/verification-sent")
    ) {
      return {
        image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
        badge: "Trust & Safety",
        headline: "Verification keeps us authentic.",
        sub: "Verifying your email address enables direct recruiter messaging and priority candidate placement.",
        statLabel: "Email Dispatch",
        statValue: "Automated",
      };
    }
    return {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      badge: "WorklyJob Platform",
      headline: "Elevate your professional journey.",
      sub: "Join ambitious professionals and enterprise hiring teams building modern careers together.",
      statLabel: "Live Portal",
      statValue: "Connected",
    };
  };

  const { image, badge, headline, sub, statLabel, statValue } =
    getPageContent();

  return (
    <div className="flex min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Panel - Real Platform Information Showcase */}
      <aside className="relative hidden h-full flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white select-none lg:flex">
        {/* Unsplash Background Image with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt="WorklyJob workplace showcase"
            className="h-full w-full scale-105 object-cover object-center transition-all duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/25" />
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]" />
        </div>

        {/* Top Header Branding */}
        <div className="relative z-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WJLogo />
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
              WorklyJob
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>Enterprise Recruitment Portal</span>
          </div>
        </div>

        {/* Bottom Editorial Content Section with Real Live Information */}
        <div className="relative z-20 mt-auto space-y-6 pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-300 shadow-xs backdrop-blur-md">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {badge}
          </div>

          <div className="max-w-lg space-y-3">
            <h1 className="text-3xl leading-[1.15] font-black tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
              {headline}
            </h1>
            <p className="text-base leading-relaxed font-medium text-slate-200/90">
              {sub}
            </p>
          </div>

          {/* Real System Metrics & Security Status Bar */}
          <div className="flex items-center gap-6 border-t border-white/15 pt-6">
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-white">
                {statValue}
              </p>
              <p className="text-xs font-medium text-slate-300/80">
                {statLabel}
              </p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-slate-200">
                Live Enterprise Database Verified
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Panel - Form Content */}
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 lg:p-12">
        <nav className="absolute top-4 left-4 md:top-8 md:left-8">
          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-primary rounded-full font-semibold"
          >
            <Link href="/" className="flex items-center gap-2">
              <MoveLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </nav>
        <div className="mx-auto w-full max-w-md space-y-6">{children}</div>
      </main>
    </div>
  );
}
