/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  useListResumesQuery,
  useUploadResumeMutation,
} from "@/redux/feature/resume/resumeApi";
import { useCanAccess, useEntitlements } from "@/hooks/useEntitlements";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Crown,
  Loader2,
  Plus,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import CVManagerSkeleton from "@/skeleton/cv-manager/CVManagerSkeleton";
import Link from "next/link";
import { useRef } from "react";
import { toast } from "sonner";
import DashboardCVManagerHeader from "../../components/dashboard/dashboard-nav/header/DashboardCVManagerHeader";
import CVCard from "../../components/main/cv-manager/CVCard";

const CVManagerView = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isJobSeeker = user?.role === "JOB_SEEKER";

  const { limit, isLoading: isLimitLoading } = useCanAccess("maxResumes");
  const { planName } = useEntitlements();

  const isPremium = planName === "Premium";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: response, isLoading } = useListResumesQuery({});
  const [uploadResume, { isLoading: isUploading }] = useUploadResumeMutation();

  const resumes = response?.data || [];
  const hasReachedLimit = !isLimitLoading && resumes.length >= limit;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    try {
      toast.loading("Uploading resume...", { id: "upload-resume" });
      const formData = new FormData();
      formData.append("file", file);
      await uploadResume(formData).unwrap();
      toast.success("Resume uploaded successfully", { id: "upload-resume" });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload resume", {
        id: "upload-resume",
      });
    }
  };

  const triggerUpload = () => {
    if (hasReachedLimit) {
      toast.error(
        `You have reached the maximum limit of ${limit} resume versions allowed by your current plan. Go Premium for unlimited uploads!`,
      );
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen pt-16">
      <DashboardCVManagerHeader />

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
      />

      {isLoading || isLimitLoading ? (
        <CVManagerSkeleton />
      ) : (
        <div className="space-y-8 px-4 sm:px-6 sm:py-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Your Resumes</h2>
              <p className="text-muted-foreground text-sm font-medium">
                You have {resumes.length} of{" "}
                {limit === 9999 ? "unlimited" : limit} active resumes on file.
              </p>
            </div>
            <Button
              className="shadow-primary/10 h-11 rounded-full px-6 font-bold shadow-lg"
              onClick={triggerUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Upload New Version
            </Button>
          </div>

          {/* CV Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume: any, index: number) => (
              <CVCard key={resume.id} resume={resume} index={index} />
            ))}

            {/* Upload Placeholder Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: resumes.length * 0.1 }}
              onClick={triggerUpload}
              className={cn(isUploading && "pointer-events-none opacity-50")}
            >
              <Card className="group border-border bg-muted/5 hover:bg-muted/10 hover:border-primary/50 flex h-full min-h-[200px] cursor-pointer flex-col items-center justify-center border-2 border-dashed text-center transition-all">
                <CardContent className="flex flex-col items-center gap-4 p-6">
                  <div className="bg-muted/20 group-hover:bg-primary/10 rounded-full p-4 transition-colors">
                    {isUploading ? (
                      <Loader2 className="text-primary h-8 w-8 animate-spin" />
                    ) : (
                      <UploadCloud className="text-muted-foreground group-hover:text-primary h-8 w-8 transition-colors" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Add another resume</p>
                    <p className="text-muted-foreground text-xs">
                      Drop your PDF here or click to browse
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Premium Upgrade Hint for Free/Pro Users */}
          {!isPremium && isJobSeeker && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="from-primary/10 via-background border-primary/10 to-primary/5 relative overflow-hidden rounded-2xl border-2 bg-linear-to-br p-8"
            >
              <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="bg-primary shadow-primary/20 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight">
                      Version Control is a{" "}
                      <span className="text-primary">Premium</span> Perk
                    </h3>
                    <p className="text-muted-foreground max-w-xl text-sm leading-relaxed font-medium opacity-80">
                      Maintain multiple versions of your resume tailored for
                      different roles. Premium members can upload up to
                      unlimited distinct resumes for maximum application
                      precision.
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="shadow-primary/20 h-14 rounded-2xl px-8 font-black shadow-xl"
                >
                  <Link
                    href="/dashboard/pricing"
                    className="flex items-center gap-2"
                  >
                    Upgrade to Premium
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
              {/* Background Decoration */}
              <div className="bg-primary/5 absolute -top-12 -right-12 h-48 w-48 rounded-full blur-3xl" />
            </motion.div>
          )}

          {/* Standard Tip Card (only if premium or no resumes yet) */}
          {(isPremium || resumes.length === 0) && (
            <Card className="bg-primary/5 border-primary/20 overflow-hidden rounded-2xl border">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="bg-primary/10 text-primary h-12 w-12 shrink-0 rounded-full p-3">
                    <ShieldCheck className="h-full w-full" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">
                      Pro Tip: Strategic Tailoring
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium opacity-80">
                      Landing a dream role often requires highlighting different
                      strengths. Managing multiple resumes allows you to pivot
                      your profile for different career paths instantly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CVManagerView;
