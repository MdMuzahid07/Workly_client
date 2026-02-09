"use client";

import DashboardJobViewHistoryHeader from "@/components/dashboard/dashboard-nav/header/DashboardJobViewHistoryHeader";
import JobCard from "@/components/main/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockJobHistory } from "@/data/mockJobHistory";
import { AnimatePresence } from "framer-motion";
import { Briefcase, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const JobViewHistoryView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");

  const jobTypes = ["all", "FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];

  return (
    <div className="min-h-screen pt-16">
      <DashboardJobViewHistoryHeader />
      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        {/* Filter Bar */}
        <Card className="bg-card rounded-xl border">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              {/* Search Placeholder */}
              <div className="group relative max-w-md flex-1">
                <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
                <Input
                  placeholder="Search your history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-muted/20 border-border focus:bg-background h-11 rounded-full pl-9 transition-all"
                />
              </div>

              {/* Job Type Filter UI */}
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
                  Type:
                </span>
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger className="bg-muted/20 border-border h-10 w-48 cursor-pointer rounded-full font-bold">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {jobTypes.map((type) => (
                      <SelectItem
                        key={type}
                        className="cursor-pointer rounded-lg font-medium"
                        value={type}
                      >
                        {type === "all" ? "All Types" : type.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/dashboard/find-jobs">
                <Button className="h-11 rounded-full px-6 font-bold shadow-sm">
                  Find More Jobs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {mockJobHistory.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              mockJobHistory.map((job, index) => (
                <JobCard key={job.id} job={job} inDashboard={true} />
              ))
            ) : (
              <div className="bg-card col-span-full flex flex-col items-center gap-4 rounded-xl border-2 border-dashed py-24 text-center">
                <div className="bg-muted/20 rounded-full p-6">
                  <Briefcase className="text-muted-foreground/20 h-10 w-10" />
                </div>
                <p className="text-muted-foreground text-sm font-bold italic">
                  Your viewing history is currently empty.
                </p>
                <Link href="/dashboard/find-jobs">
                  <Button className="mt-2 rounded-full font-bold">
                    Start exploring jobs
                  </Button>
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default JobViewHistoryView;
