"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockResumes } from "@/data/mockCVs";
import { motion } from "framer-motion";
import { Plus, UploadCloud } from "lucide-react";
import DashboardCVManagerHeader from "../../components/dashboard/dashboard-nav/header/DashboardCVManagerHeader";
import CVCard from "../../components/main/cv-manager/CVCard";

const CVManagerView = () => {
  return (
    <div className="min-h-screen pt-16">
      <DashboardCVManagerHeader />

      <div className="space-y-8 px-4 sm:px-6 sm:py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Your Resumes</h2>
            <p className="text-muted-foreground text-sm font-medium">
              You have {mockResumes.length} active resumes on file.
            </p>
          </div>
          <Button className="shadow-primary/10 h-11 rounded-full px-6 font-bold shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Upload New Version
          </Button>
        </div>

        {/* CV Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockResumes.map((resume, index) => (
            <CVCard key={resume.id} resume={resume} index={index} />
          ))}

          {/* Upload Placeholder Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: mockResumes.length * 0.1 }}
          >
            <Card className="group border-border bg-muted/5 hover:bg-muted/10 hover:border-primary/50 flex h-full min-h-[200px] cursor-pointer flex-col items-center justify-center border-2 border-dashed text-center transition-all">
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <div className="bg-muted/20 group-hover:bg-primary/10 rounded-full p-4 transition-colors">
                  <UploadCloud className="text-muted-foreground group-hover:text-primary h-8 w-8 transition-colors" />
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
