"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobSeekerPricingSkeleton() {
  return (
    <div className="animate-pulse space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      {/* 1. Subscription Status Card Skeleton */}
      <Card className="border-border/50 bg-card overflow-hidden rounded-2xl border shadow-xs">
        <CardContent className="p-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {/* Icon placeholder */}
              <Skeleton className="bg-muted/60 h-12 w-12 shrink-0 rounded-2xl" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {/* Status title bar */}
                  <Skeleton className="bg-muted/60 h-5 w-36 rounded-md" />
                  {/* Status badge bar */}
                  <Skeleton className="bg-muted/50 h-5 w-16 rounded-full" />
                </div>
                {/* Renew date bar */}
                <Skeleton className="bg-muted/40 h-4 w-48 rounded-md" />
              </div>
            </div>

            {/* Right-side Usage block placeholder */}
            <div className="flex max-w-md flex-1 flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <Skeleton className="bg-muted/60 h-4 w-32 rounded-md" />
                <Skeleton className="bg-muted/50 h-4 w-20 rounded-md" />
              </div>
              <Skeleton className="bg-muted/40 h-2 w-full rounded-full" />
              <Skeleton className="bg-muted/30 h-3 w-40 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Main Header Section Skeleton */}
      <div className="space-y-4 text-center">
        {/* Badge placeholder */}
        <Skeleton className="bg-muted/60 mx-auto h-6 w-44 rounded-full" />
        <div className="space-y-2.5">
          {/* Main Title bar */}
          <Skeleton className="bg-muted/60 mx-auto h-9 w-80 rounded-md sm:h-10 sm:w-96" />
          {/* Subtitle description bars */}
          <Skeleton className="bg-muted/40 mx-auto h-4 w-[34rem] max-w-full rounded-md" />
          <Skeleton className="bg-muted/30 mx-auto h-4 w-80 max-w-full rounded-md" />
        </div>
      </div>

      {/* 3. Pricing Cards Grid (4 Columns to match Free, Starter, Pro, Premium) */}
      <div className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="border-border/50 bg-card flex min-h-[480px] flex-col justify-between rounded-2xl border shadow-xs"
          >
            <CardHeader className="space-y-4 p-6 pb-4">
              {/* Icon box placeholder */}
              <Skeleton className="bg-muted/60 h-12 w-12 rounded-2xl" />
              <div className="space-y-2">
                {/* Card Title bar */}
                <Skeleton className="bg-muted/60 h-6 w-24 rounded-md" />
                {/* Card description bar */}
                <Skeleton className="bg-muted/40 h-4 w-full rounded-md" />
              </div>
              <div className="flex items-baseline gap-1 py-1.5">
                {/* Price tag bar */}
                <Skeleton className="bg-muted/60 h-10 w-28 rounded-md" />
                <Skeleton className="bg-muted/40 h-4 w-12 rounded-md" />
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-6 p-6 pt-0">
              {/* Divider line placeholder */}
              <Skeleton className="bg-muted/30 h-px w-full" />
              <div className="space-y-4">
                {/* Feature checklist placeholder lines */}
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Skeleton className="bg-muted/50 h-4.5 w-4.5 shrink-0 rounded-full" />
                    <Skeleton className="bg-muted/40 h-4 w-full rounded-md" />
                  </div>
                ))}
              </div>
            </CardContent>

            <div className="p-6 pt-0">
              {/* CTA button placeholder */}
              <Skeleton className="bg-muted/60 h-11 w-full rounded-xl" />
            </div>
          </Card>
        ))}
      </div>

      {/* 4. FAQ Section Skeleton */}
      <div className="space-y-8 pt-10 text-center">
        <div className="space-y-2">
          {/* FAQ Title bar */}
          <Skeleton className="bg-muted/60 mx-auto h-8 w-64 rounded-md" />
          {/* FAQ Subtitle bar */}
          <Skeleton className="bg-muted/40 mx-auto h-4 w-96 max-w-full rounded-md" />
        </div>
        <div className="mx-auto grid max-w-4xl gap-4 text-left">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="border-border/50 bg-card rounded-xl border p-5"
            >
              <div className="space-y-3">
                {/* FAQ Question bar */}
                <Skeleton className="bg-muted/60 h-5 w-2/3 rounded-md" />
                {/* FAQ Answer bars */}
                <Skeleton className="bg-muted/40 h-4 w-full rounded-md" />
                <Skeleton className="bg-muted/30 h-4 w-5/6 rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
