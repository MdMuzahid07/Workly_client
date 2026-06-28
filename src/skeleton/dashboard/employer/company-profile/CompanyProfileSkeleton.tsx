"use client";
import DashboardHeaderContainer from "@/components/dashboard/dashboard-nav/header/DashboardHeaderContainer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2 } from "lucide-react";

export default function CompanyProfileSkeleton() {
  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header Skeleton - Matches DashboardCompanyProfileHeader */}
      <DashboardHeaderContainer>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
              <Building2 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-36 rounded-md sm:h-7 sm:w-52" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="hidden h-4 w-64 rounded-md sm:block" />
            </div>
          </div>
          <Skeleton className="h-9 w-9 shrink-0 rounded-full sm:w-32" />
        </div>
      </DashboardHeaderContainer>

      <div className="space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Completion Header Skeleton - Matches ProfileHeader */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-1.5">
              <Skeleton className="h-7 w-48 rounded-md sm:w-56" />
              <Skeleton className="h-4 w-72 rounded-md sm:w-96" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-14 rounded-md" />
              <Skeleton className="h-3 w-28 rounded-md" />
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-2.5 w-full rounded-full" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>

        {/* Tab Navigation Skeleton - Matches TabsList */}
        <div className="bg-muted/40 border-border scrollbar-none flex h-11 w-full flex-nowrap justify-start gap-1 overflow-x-auto rounded-full border p-1 sm:h-12">
          {["Overview", "Details", "Benefits", "Culture & Values", "Media"].map(
            (_, i) => (
              <Skeleton
                key={i}
                className="h-full w-28 shrink-0 rounded-full sm:w-36"
              />
            ),
          )}
        </div>

        {/* Overview Tab Content Skeleton */}
        <div className="space-y-10">
          {/* 4 Stat Cards Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="bg-card relative overflow-hidden rounded-xl border p-4 shadow-xs sm:p-6"
              >
                <div className="relative z-10 flex flex-col gap-2 sm:gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl sm:h-12 sm:w-12" />
                  <div className="space-y-1.5 pt-0.5 sm:pt-1">
                    <Skeleton className="h-3 w-16 rounded-md sm:w-20" />
                    <Skeleton className="h-6 w-12 rounded-md sm:h-8 sm:w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 2 Section Cards Grid (About & Mission) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <Card
                key={index}
                className="bg-card space-y-6 rounded-2xl border p-6 shadow-xs"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <Skeleton className="h-6 w-40 rounded-md" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-44 rounded-md" />
                      <Skeleton className="h-3 w-64 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-36 w-full rounded-xl" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
