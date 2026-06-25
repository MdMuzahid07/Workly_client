"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  CheckSquare,
  FileText,
  PlusCircle,
  UserCheck,
  UserPlus,
  Users2,
  Workflow,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const seekerSteps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Account",
    desc: "Register a high-fidelity job seeker account and fill out your professional profile to highlight your strengths.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Upload CV / Resume",
    desc: "Attach your updated curriculum vitae to make it visible to hiring managers looking for matching qualifications.",
  },
  {
    number: "03",
    icon: CheckSquare,
    title: "Apply to Jobs",
    desc: "Browse dynamic vetted careers and send applications instantly with a highly optimized one-click pipeline.",
  },
];

const employerSteps = [
  {
    number: "01",
    icon: PlusCircle,
    title: "Post Careers",
    desc: "Draft professional job listings specifying active skill requirements, salary brackets, and location options.",
  },
  {
    number: "02",
    icon: Users2,
    title: "Review Applicants",
    desc: "Manage submitted seeker resumes inside a collaborative, clean, status-based application pipeline.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Secure Talent",
    desc: "Schedule automated interviews, conduct secure evaluations, and lock in industry-grade elite hires.",
  },
];

const LandingHowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"seeker" | "employer">("seeker");

  const steps = activeTab === "seeker" ? seekerSteps : employerSteps;

  return (
    <section className="bg-background/95 relative overflow-hidden py-24 sm:py-32">
      {/* Premium Atmospheric Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/5 absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full blur-[130px]" />
        <div className="bg-accent/5 absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full blur-[120px]" />
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
              <Workflow className="h-4 w-4" />
              Hiring Pipeline
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            How Does{" "}
            <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
              {`Workly`}
            </span>{" "}
            Work?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base sm:text-lg"
          >
            Get matching opportunities in just three quick steps. Choose your
            journey to get started.
          </motion.p>

          {/* Interactive Stepper Navigation Tabs with Sliding pill animation */}
          <div className="bg-muted/65 border-border/30 relative mt-10 inline-flex items-center gap-1 rounded-2xl border p-1.5 shadow-xs backdrop-blur-md">
            <button
              onClick={() => setActiveTab("seeker")}
              className={`relative cursor-pointer rounded-xl px-6 py-3 text-sm font-extrabold transition-all duration-300 ${
                activeTab === "seeker"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "seeker" && (
                <motion.div
                  layoutId="active-step-tab"
                  className="bg-card border-border/50 absolute inset-0 -z-1 rounded-xl border shadow-xs"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              For Candidates
            </button>
            <button
              onClick={() => setActiveTab("employer")}
              className={`relative cursor-pointer rounded-xl px-6 py-3 text-sm font-extrabold transition-all duration-300 ${
                activeTab === "employer"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "employer" && (
                <motion.div
                  layoutId="active-step-tab"
                  className="bg-card border-border/50 absolute inset-0 -z-1 rounded-xl border shadow-xs"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              For Employers
            </button>
          </div>
        </div>

        {/* Dynamic Stepper Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="grid gap-8 sm:grid-cols-3"
            >
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="group border-border/40 from-card/60 to-card/10 hover:border-primary relative h-full overflow-hidden rounded-2xl border bg-linear-to-b p-8 backdrop-blur-md transition-all duration-500">
                    {/* Background Sequence Watermark */}
                    <span className="text-foreground/[0.04] group-hover:text-primary/[0.08] absolute top-4 right-6 text-7xl font-extrabold transition-all duration-500 select-none">
                      {step.number}
                    </span>

                    {/* Glowing Accent Corner Overlay */}
                    <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Step Icon Container */}
                      <div className="from-primary/10 to-accent/10 border-primary/10 group-hover:from-primary group-hover:to-accent text-primary mb-6 flex h-16 w-16 origin-center items-center justify-center rounded-2xl border bg-linear-to-br transition-all duration-500 will-change-transform group-hover:rotate-6 group-hover:text-white">
                        <step.icon className="h-8 w-8" />
                      </div>

                      {/* Content */}
                      <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-bold tracking-tight transition-all duration-500">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </Card>

                  {/* Connecting Arrows for non-last steps in larger views */}
                  {index < 2 && (
                    <div className="text-primary/45 pointer-events-none absolute top-1/2 -right-6 z-20 hidden translate-x-1/2 -translate-y-1/2 sm:block lg:-right-3">
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LandingHowItWorks;
