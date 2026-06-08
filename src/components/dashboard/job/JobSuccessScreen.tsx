"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { Briefcase, LayoutDashboard, Plus, ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";

interface JobSuccessScreenProps {
  jobData: {
    title: string;
    jobType: string;
    location: string;
    status: string;
    isUpdate: boolean;
  };
  onReset: () => void;
}

export default function JobSuccessScreen({
  jobData,
  onReset,
}: JobSuccessScreenProps) {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // Nice readable format for Job Type
  const formatJobType = (type: string) => {
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6"
    >
      {/* Animated Success Badge/Circle */}
      <motion.div
        variants={itemVariants}
        className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            delay: 0.2,
            stiffness: 200,
            damping: 10,
          }}
          className="absolute inset-0 rounded-full bg-emerald-500/5"
        />
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
          className="relative z-10 h-10 w-10"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </motion.div>

      {/* Success Title & Subtitle */}
      <motion.div variants={itemVariants} className="space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          {jobData.isUpdate ? "Changes Saved" : "Successfully Published"}
        </span>
        <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          {jobData.isUpdate ? "Job Posting Updated!" : "Your Job is Live!"}
        </h2>
        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
          {jobData.status === "DRAFT"
            ? "Your draft has been updated. Candidates won't see this listing until you choose to publish it."
            : "Your listing is active. We are now matching potential candidates with the required skills."}
        </p>
      </motion.div>

      {/* Interactive Premium Job Preview Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4 }}
        className="bg-card relative my-8 w-full overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300"
      >
        <div className="bg-primary/[0.02] pointer-events-none absolute top-0 right-0 h-24 w-24 rounded-bl-full" />
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-primary/80 bg-primary/5 rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                Preview
              </span>
              <h3 className="text-foreground mt-2.5 text-lg font-bold">
                {jobData.title || "Untitled Job Listing"}
              </h3>
            </div>
            <span className="bg-muted border-border/60 text-muted-foreground shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium">
              {formatJobType(jobData.jobType)}
            </span>
          </div>

          <div className="border-border/40 text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{jobData.location || "Anywhere"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>
                Status: {jobData.status === "ACTIVE" ? "Active" : "Draft"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
      >
        <Button
          onClick={onReset}
          variant="outline"
          className="border-border/80 hover:bg-muted/50 w-full gap-2 rounded-xl px-5 py-5 text-sm font-semibold sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Post Another Job
        </Button>

        <Button
          onClick={() => router.push("/employer/jobs")}
          className="w-full gap-2 rounded-xl px-5 py-5 text-sm font-semibold sm:w-auto"
        >
          <LayoutDashboard className="h-4 w-4" />
          Manage My Jobs
          <ArrowRight className="ml-0.5 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
