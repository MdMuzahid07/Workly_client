"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const JobHeaderSkeleton = () => (
  <Card className="border-primary/10 bg-background/60 animate-pulse overflow-hidden border backdrop-blur-xl">
    <CardHeader className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-1 flex-col gap-6 md:flex-row">
          <div className="bg-card border-primary/10 relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border p-2 shadow-2xl md:h-24 md:w-24">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-5.5 w-16 rounded-md" />
              <Skeleton className="h-5.5 w-20 rounded-md" />
              <Skeleton className="h-5.5 w-14 rounded-md" />
            </div>
            <Skeleton className="h-8 w-3/4 rounded-lg md:h-10" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:mt-8 sm:grid-cols-2 sm:pt-8 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-primary/5 flex items-center gap-3 rounded-2xl p-4"
          >
            <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>
    </CardHeader>
  </Card>
);

const ContentCardSkeleton = ({ lines = 3 }: { lines?: number }) => (
  <Card className="border-primary/10 bg-background/50 animate-pulse border backdrop-blur-sm">
    <CardHeader className="p-4 pb-3 sm:p-6 sm:pb-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-6 w-32 rounded-md" />
      </div>
    </CardHeader>
    <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 rounded-md",
            i === lines - 1 ? "w-2/3" : i === 0 ? "w-full" : "w-5/6",
          )}
        />
      ))}
    </CardContent>
  </Card>
);

const RequirementsSkeleton = () => (
  <Card className="border-primary/10 bg-background/50 animate-pulse border backdrop-blur-sm">
    <CardHeader className="p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-6 w-56 rounded-md" />
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-primary/5 flex items-start gap-3 rounded-xl p-4"
          >
            <Skeleton className="mt-1 h-2 w-2 shrink-0 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const RequiredSkillsSkeleton = () => (
  <Card className="border-primary/10 bg-background/50 animate-pulse border backdrop-blur-sm">
    <CardHeader className="p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-6 w-36 rounded-md" />
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
      <div className="flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-xl" />
        ))}
      </div>
    </CardContent>
  </Card>
);

const BenefitsSkeleton = () => (
  <Card className="border-primary/10 bg-background/50 animate-pulse border backdrop-blur-sm">
    <CardHeader className="p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-6 w-40 rounded-md" />
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-primary/5 flex animate-pulse items-start gap-4 rounded-2xl p-4"
          >
            <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
            <div className="mt-0.5 flex-1 space-y-1.5">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const AboutCompanySkeleton = () => (
  <Card className="border-primary/10 bg-background/50 animate-pulse border backdrop-blur-sm">
    <CardHeader className="p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-6 w-44 rounded-md" />
      </div>
    </CardHeader>
    <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Skeleton className="h-5 w-36 rounded-md" />
        <Skeleton className="h-5 w-24 rounded-md" />
      </div>
    </CardContent>
  </Card>
);

const SidebarSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </CardContent>
    </Card>

    <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-6 w-36 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <div className="bg-border/20 h-px w-full" />
          </div>
        ))}
        <Skeleton className="mt-4 h-10 w-full rounded-xl" />
      </CardContent>
    </Card>

    <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
        <Skeleton className="h-6 w-32 rounded-md" />
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <div className="bg-border/20 h-px w-full" />
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
        <Skeleton className="h-6 w-28 rounded-md" />
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-primary/10 space-y-2 rounded-2xl border p-4"
          >
            <Skeleton className="h-4.5 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
            <Skeleton className="h-3.5 w-1/2 rounded bg-gray-200 dark:bg-slate-800" />
            <Skeleton className="h-3.5 w-1/3 rounded bg-gray-200 dark:bg-slate-800" />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

const JobDetailsSkeleton = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Dynamic Banner Section Skeleton */}
      <div className="bg-muted relative h-64 w-full animate-pulse overflow-hidden lg:h-80">
        <div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent" />
      </div>

      <div className="relative mx-auto -mt-32 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <JobHeaderSkeleton />
            <ContentCardSkeleton lines={4} />
            <RequirementsSkeleton />
            <RequiredSkillsSkeleton />
            <BenefitsSkeleton />
            <AboutCompanySkeleton />
          </div>
          <SidebarSkeleton />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;
