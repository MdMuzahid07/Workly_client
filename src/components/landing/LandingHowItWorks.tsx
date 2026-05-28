"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  CheckSquare,
  FileText,
  PlusCircle,
  Sparkles,
  UserPlus,
  Users2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const seekerSteps = [
  {
    icon: UserPlus,
    title: "1. Create Account",
    desc: "Register a high-fidelity job seeker account and fill out your professional profile to highlight your strengths.",
  },
  {
    icon: FileText,
    title: "2. Upload CV / Resume",
    desc: "Attach your updated curriculum vitae to make it visible to hiring managers looking for matching qualifications.",
  },
  {
    icon: CheckSquare,
    title: "3. Apply to Jobs",
    desc: "Browse dynamic vetted careers and send applications instantly with a highly optimized one-click pipeline.",
  },
];

const employerSteps = [
  {
    icon: PlusCircle,
    title: "1. Post Careers",
    desc: "Draft professional job listings specifying active skill requirements, salary brackets, and location options.",
  },
  {
    icon: Users2,
    title: "2. Review Applicants",
    desc: "Manage submitted seeker resumes inside a collaborative, clean, status-based application pipeline.",
  },
  {
    icon: Sparkles,
    title: "3. Secure Talent",
    desc: "Schedule automated interviews, conduct secure evaluations, and lock in industry-grade elite hires.",
  },
];

const LandingHowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"seeker" | "employer">("seeker");

  const steps = activeTab === "seeker" ? seekerSteps : employerSteps;

  return (
    <section className="bg-background/95 relative overflow-hidden py-24 sm:py-32">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/5 absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full blur-[130px]" />
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

          {/* Interactive Stepper Navigation Tabs */}
          <div className="bg-muted/65 border-border/40 mt-10 inline-flex items-center gap-2 rounded-xl border p-1.5 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("seeker")}
              className={`relative rounded-lg px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                activeTab === "seeker"
                  ? "bg-background text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Candidates
            </button>
            <button
              onClick={() => setActiveTab("employer")}
              className={`relative rounded-lg px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                activeTab === "employer"
                  ? "bg-background text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
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
                  <Card className="group border-border/40 bg-card/45 hover:border-primary/30 relative h-full overflow-hidden p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
                    {/* Hover Glow Light */}
                    <div className="from-primary/10 pointer-events-none absolute -inset-px bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Step Icon Container */}
                      <div className="bg-muted/65 group-hover:bg-primary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:text-white">
                        <step.icon className="h-8 w-8 transition-transform duration-500 group-hover:rotate-6" />
                      </div>

                      {/* Content */}
                      <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-bold tracking-tight transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </Card>

                  {/* Connecting Arrows for non-last steps in larger views */}
                  {index < 2 && (
                    <div className="text-muted-foreground absolute top-1/2 -right-6 hidden translate-x-1/2 -translate-y-1/2 scale-125 sm:block lg:-right-3">
                      <ArrowRight className="h-6 w-6 opacity-35" />
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
