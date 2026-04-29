/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  useListResumesQuery,
  useUploadResumeMutation,
} from "@/redux/feature/resume/resumeApi";
import { motion } from "framer-motion";
import { Loader2, Plus, UploadCloud } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import DashboardCVManagerHeader from "../../components/dashboard/dashboard-nav/header/DashboardCVManagerHeader";
import CVCard from "../../components/main/cv-manager/CVCard";

const CVManagerView = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: response, isLoading } = useListResumesQuery({});
  const [uploadResume, { isLoading: isUploading }] = useUploadResumeMutation();

  const resumes = response?.data || [];

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
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

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

      <div className="space-y-8 px-4 sm:px-6 sm:py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Your Resumes</h2>
            <p className="text-muted-foreground text-sm font-medium">
              You have {resumes.length} active resumes on file.
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

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20 overflow-hidden rounded-2xl border">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="bg-primary/10 text-primary h-12 w-12 shrink-0 rounded-full p-3">
                <Plus className="h-full w-full rotate-45" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Pro Tip: Version Control</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium opacity-80">
                  Tailoring your resume to specific job descriptions increases
                  your chances of landing an interview by 40%. Manage versions
                  for different career paths right here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CVManagerView;
