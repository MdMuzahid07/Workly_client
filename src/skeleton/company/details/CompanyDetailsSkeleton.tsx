'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const HeaderSkeleton = () => (
  <Card className="border-primary/10 bg-background/50 animate-pulse overflow-hidden border backdrop-blur-sm">
    <CardHeader className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-1 flex-col gap-6 md:flex-row">
          <div className="bg-card border-primary/10 relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border p-2 shadow-2xl sm:h-32 sm:w-32">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <Skeleton className="h-8 w-48 rounded-lg sm:h-10 sm:w-64" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                <Skeleton className="h-5 w-40 rounded" />
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:shrink-0">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
      </div>
    </CardHeader>
  </Card>
);

const AboutCompanySkeleton = () => (
  <Card className="border-primary/10 bg-background/50 animate-pulse border backdrop-blur-sm">
    <CardHeader className="p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-6 w-48 rounded" />
      </div>
    </CardHeader>
    <CardContent className="space-y-6 p-4 pt-0 sm:space-y-8 sm:p-6 sm:pt-0">
      <div>
        <Skeleton className="mb-3 h-4 w-36 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      </div>

      <div>
        <Skeleton className="mb-4 h-4 w-36 rounded" />
        <div className="bg-primary/5 border-primary/10 relative space-y-2.5 overflow-hidden rounded-2xl border p-6">
          <Skeleton className="h-5.5 w-full rounded" />
          <Skeleton className="h-5.5 w-3/4 rounded" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const CoreValuesSkeleton = () => (
  <Card className="border-primary/10 bg-background/50 animate-pulse border backdrop-blur-sm">
    <CardHeader className="p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-6 w-32 rounded" />
      </div>
      <Skeleton className="mt-1.5 h-4 w-72 rounded" />
    </CardHeader>
    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-primary/10 flex items-center gap-4 rounded-2xl border p-4">
            <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const BenefitsSkeleton = () => (
  <Card className="border-primary/10 bg-background/50 animate-pulse border backdrop-blur-sm">
    <CardHeader className="p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-6 w-40 rounded" />
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border-primary/10 flex flex-col gap-3 rounded-2xl border p-5">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
            <Skeleton className="h-4 w-full rounded" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const OpenPositionsSkeleton = () => (
  <Card className="border-primary/10 bg-background/50 animate-pulse scroll-mt-24 border backdrop-blur-sm">
    <CardHeader className="p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-6 w-48 rounded" />
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="border-primary/10 space-y-3 rounded-2xl border p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5.5 w-48 rounded" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
                <Skeleton className="h-6 w-32 rounded-md" />
              </div>
              <Skeleton className="h-10 w-28 shrink-0 rounded-xl sm:self-center" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SidebarSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
      <CardContent className="space-y-3 p-4 sm:p-6">
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </CardContent>
    </Card>

    <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
        <Skeleton className="h-6 w-36 rounded" />
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
            <div className="bg-border/20 h-px w-full" />
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
        <Skeleton className="h-6 w-44 rounded" />
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-12 rounded" />
              <Skeleton className="h-4 w-36 rounded" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
        <Skeleton className="h-6 w-36 rounded" />
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-primary/10 flex items-center gap-3 rounded-xl border p-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="ml-auto h-4 w-4 rounded" />
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
        <Skeleton className="h-6 w-40 rounded" />
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-primary/10 space-y-2 rounded-xl border p-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 shrink-0 rounded" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-3.5 w-32 rounded" />
              </div>
            </div>
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

const CompanyDetailsSkeleton = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Dynamic Banner Section Skeleton */}
      <div className="bg-muted relative h-64 w-full animate-pulse overflow-hidden lg:h-80">
        <div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent" />
      </div>

      <div className="relative mx-auto -mt-32 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <HeaderSkeleton />
            <AboutCompanySkeleton />
            <CoreValuesSkeleton />
            <BenefitsSkeleton />
            <OpenPositionsSkeleton />
          </div>
          <SidebarSkeleton />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsSkeleton;
