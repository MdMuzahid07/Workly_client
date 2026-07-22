'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EmployerPricingSkeleton() {
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

      {/* 2. Header Section Skeleton */}
      <div className="space-y-4 text-center">
        {/* Badge Placeholder */}
        <Skeleton className="bg-muted/60 mx-auto h-6 w-48 rounded-full" />
        <div className="space-y-2.5">
          {/* Title Placeholder */}
          <Skeleton className="bg-muted/60 mx-auto h-9 w-80 rounded-md sm:h-10 sm:w-96" />
          {/* Subtitle Placeholder */}
          <Skeleton className="bg-muted/40 mx-auto h-4 w-[34rem] max-w-full rounded-md" />
          <Skeleton className="bg-muted/30 mx-auto h-4 w-80 max-w-full rounded-md" />
        </div>
      </div>

      {/* 2. Grid of 3 Cards (Free, Growth, Enterprise) */}
      <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => {
          // Card 1 = index 1 is "Growth", which has the "Most Popular" badge
          const isGrowthCard = i === 1;

          return (
            <Card
              key={i}
              className={`bg-card relative flex min-h-[480px] flex-col justify-between rounded-2xl border shadow-xs ${
                isGrowthCard ? 'border-primary/40 ring-primary/20 ring-1' : 'border-border/50'
              }`}
            >
              {isGrowthCard && (
                <div className="absolute top-0 right-6 -translate-y-1/2">
                  {/* "Most Popular" badge placeholder */}
                  <Skeleton className="bg-primary/30 h-6 w-24 rounded-full" />
                </div>
              )}

              <CardHeader className="space-y-4 p-6 pb-4">
                {/* Icon Placeholder */}
                <Skeleton className="bg-muted/60 h-12 w-12 rounded-2xl" />
                <div className="space-y-2">
                  {/* Card Title Placeholder */}
                  <Skeleton className="bg-muted/60 h-6 w-24 rounded-md" />
                  {/* Card Subtitle Placeholder */}
                  <Skeleton className="bg-muted/40 h-4 w-full rounded-md" />
                </div>
                <div className="flex items-baseline gap-1 py-1.5">
                  {/* Price Placeholder */}
                  <Skeleton className="bg-muted/60 h-10 w-28 rounded-md" />
                  <Skeleton className="bg-muted/40 h-4 w-12 rounded-md" />
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-6 p-6 pt-0">
                {/* Divider Line */}
                <Skeleton className="bg-muted/30 h-px w-full" />
                <div className="space-y-4">
                  {/* Checklist placeholders */}
                  {Array.from({ length: i === 0 ? 5 : i === 1 ? 6 : 7 }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Skeleton className="bg-muted/50 h-4.5 w-4.5 shrink-0 rounded-full" />
                      <Skeleton className="bg-muted/40 h-4 w-full rounded-md" />
                    </div>
                  ))}
                </div>
              </CardContent>

              <div className="p-6 pt-0">
                {/* CTA Button Placeholder */}
                <Skeleton className="bg-muted/60 h-11 w-full rounded-xl" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
