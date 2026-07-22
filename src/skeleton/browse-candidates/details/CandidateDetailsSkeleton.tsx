'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppSelector } from '../../../redux/hooks';

const CandidateDetailsSkeleton = () => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const isEmployer =
    currentUser?.role === 'EMPLOYER' ||
    currentUser?.role === 'ADMIN' ||
    currentUser?.role === 'SUPER_ADMIN';

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Banner Skeleton */}
      <Skeleton className="h-64 w-full lg:h-80" />

      <div className="relative mx-auto -mt-32 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Premium Header Card Skeleton */}
            <Card className="bg-background/60 overflow-hidden border backdrop-blur-xl">
              <CardHeader className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="bg-card relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-2xl md:h-32 md:w-32 dark:border-slate-800">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Skeleton className="h-6 w-20 rounded-md" />
                        <Skeleton className="h-6 w-24 rounded-md" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-48 sm:w-64" />
                        <Skeleton className="h-6 w-6 shrink-0 rounded-full" />
                      </div>
                      <Skeleton className="h-6 w-56 max-w-full" />
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {isEmployer && <Skeleton className="h-10 w-10 rounded-xl" />}
                    <Skeleton className="h-10 w-10 rounded-xl" />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Skeleton className="h-10 w-32 rounded-full" />
                  <Skeleton className="h-10 w-36 rounded-full" />
                </div>
              </CardHeader>
            </Card>

            {/* Professional Summary Skeleton */}
            <Card className="bg-background/50 border backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2 p-4 pt-0 sm:p-6 sm:pt-0">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>

            {/* Skills & Expertise Skeleton */}
            <Card className="bg-background/50 border backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-8 w-24 rounded-xl" />
                  <Skeleton className="h-8 w-28 rounded-xl" />
                  <Skeleton className="h-8 w-20 rounded-xl" />
                  <Skeleton className="h-8 w-32 rounded-xl" />
                </div>
              </CardContent>
            </Card>

            {/* Work Experience Skeleton */}
            <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-6 w-36" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
                {[1, 2].map((i) => (
                  <div key={i} className="relative pl-8">
                    {i === 1 && (
                      <div className="bg-primary/10 absolute top-8 left-[11px] h-full w-0.5" />
                    )}
                    <div className="bg-primary/5 border-primary/20 absolute top-1 left-0 h-6 w-6 rounded-full border-2" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3.5 w-24" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education Skeleton */}
            <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <Skeleton className="h-6 w-6 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3.5 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Candidate Info Skeleton */}
            <Card className="bg-background/50 border backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <Skeleton className="h-5 w-36" />
              </CardHeader>
              <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Links Skeleton */}
            <Card className="bg-background/50 border backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <Skeleton className="h-5 w-16" />
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3 p-4 pt-0 sm:grid-cols-2 sm:p-6 sm:pt-0 md:grid-cols-3 lg:grid-cols-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="border-primary/10 bg-primary/5 flex items-center justify-between rounded-xl border p-3"
                  >
                    <div className="flex w-full min-w-0 items-center gap-3">
                      <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                      <div className="flex w-full min-w-0 flex-col gap-1.5">
                        <Skeleton className="h-3.5 w-16 rounded" />
                        <Skeleton className="h-2.5 w-24 rounded" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-4 shrink-0 rounded" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Verified Skeleton Card */}
            <Card className="bg-card overflow-hidden border">
              <div className="space-y-4 p-4 text-center sm:p-6">
                <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                <Skeleton className="mx-auto h-6 w-36" />
                <Skeleton className="mx-auto h-4 w-full" />
                <Skeleton className="mx-auto h-4 w-5/6" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsSkeleton;
