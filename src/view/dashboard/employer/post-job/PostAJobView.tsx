"use client";

import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardPostAJobHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardPostAJobHeader";
import CreateNewJobForm from "../../../../components/dashboard/job/create-job-form";
import StepProgress from "../../../../components/dashboard/job/StepProgress";
import JobSuccessScreen from "../../../../components/dashboard/job/JobSuccessScreen";
import { AnimatePresence, motion } from "framer-motion";
import UpgradeGate from "@/components/ui/UpgradeGate";

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Basic Info", description: "Job details" },
  { id: 2, title: "Job Details", description: "Description & skills" },
  { id: 3, title: "Compensation", description: "Salary & benefits" },
  { id: 4, title: "Final Settings", description: "Application details" },
];

const PostAJobView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [successJob, setSuccessJob] = useState<{
    title: string;
    jobType: string;
    location: string;
    status: string;
    isUpdate: boolean;
  } | null>(null);

  // Load saved step on mount
  useEffect(() => {
    const savedStep = localStorage.getItem("workly_post_job_step");
    if (savedStep) {
      setCurrentStep(Number(savedStep));
    }
  }, []);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem("workly_post_job_step", String(step));
  };

  const handleSuccess = (jobData: {
    title: string;
    jobType: string;
    location: string;
    status: string;
    isUpdate: boolean;
  }) => {
    setSuccessJob(jobData);
  };

  const handleReset = () => {
    setSuccessJob(null);
    setCurrentStep(1);
  };

  return (
    <div className="dark:bg-background/20 min-h-screen bg-slate-50/45 pt-16">
      <DashboardPostAJobHeader
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        currentStep={currentStep}
      />

      <div className="container mx-auto px-4 py-6 sm:px-6 lg:py-10">
        <UpgradeGate
          feature="maxActiveJobs"
          title="Active Job Posts Limit Reached"
          description="You have reached the maximum active job post limit allowed by your current subscription tier. Upgrade your plan to post more jobs."
        >
          <AnimatePresence mode="wait">
            {successJob ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-card relative overflow-hidden rounded-3xl border p-8 sm:p-16"
              >
                <JobSuccessScreen jobData={successJob} onReset={handleReset} />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8"
              >
                {/* Left Split Pane: Stepper & Details Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-4 xl:col-span-3">
                  <div className="bg-card relative overflow-hidden rounded-2xl border p-4 lg:p-5 xl:p-6">
                    <StepProgress
                      steps={STEPS}
                      currentStep={currentStep}
                      onStepChange={handleStepChange}
                    />
                  </div>

                  {/* Premium Tip Panel (Desktop Only) */}
                  <div className="relative hidden overflow-hidden rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-5 lg:block">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                        <Lightbulb className="h-4 w-4 shrink-0 animate-pulse" />
                        <span className="text-[11px] font-bold tracking-wider uppercase">
                          Employer Pro-Tip
                        </span>
                      </div>
                      <p className="text-muted-foreground/80 text-[11px] leading-relaxed font-medium">
                        Detailed requirements and specific skills significantly
                        increase candidate match accuracy and improve overall
                        application quality.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Split Pane: Form container */}
                <div className="bg-card relative overflow-hidden rounded-3xl border p-6 sm:p-10 lg:col-span-8 xl:col-span-9">
                  <div className="relative z-10">
                    <CreateNewJobForm
                      currentStep={currentStep}
                      onStepChange={handleStepChange}
                      onSuccess={handleSuccess}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </UpgradeGate>
      </div>
    </div>
  );
};

export default PostAJobView;
