"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSidebarSkeleton = () => (
  <div className="hidden space-y-6 lg:col-span-4 lg:block">
    <Card className="bg-card rounded-2xl">
      <CardContent className="p-8">
        <div className="flex flex-col items-center space-y-6 text-center">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="mx-auto h-6 w-40" />
            <Skeleton className="mx-auto h-4 w-28" />
          </div>
          <Skeleton className="h-16 w-full rounded-xl" />
          <div className="w-full space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full rounded-full" />
            ))}
          </div>
          <div className="grid w-full grid-cols-2 gap-3 pt-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-9 w-full rounded-md" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Skeleton className="h-5 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded-full" />
        ))}
      </CardContent>
    </Card>
  </div>
);

const SkillsSkeleton = () => (
  <Card className="bg-card border-0">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold">
        <Skeleton className="h-5 w-40" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-muted/40 space-y-3 rounded-xl p-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const JobPreferenceSkeleton = () => (
  <Card className="bg-card border-0">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold">
        <Skeleton className="h-5 w-40" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-muted/40 flex items-start space-x-3 rounded-xl p-4"
          >
            <Skeleton className="h-5 w-5 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ProfileHeaderSkeleton = () => (
  <div className="mb-8 lg:hidden">
    <Card className="from-card to-muted/30 border-0">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Skeleton className="h-32 w-32 rounded-full" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
          <div className="text-muted-foreground w-full space-y-2 text-sm">
            <Skeleton className="mx-auto h-4 w-40" />
            <Skeleton className="mx-auto h-4 w-48" />
          </div>
          <div className="flex w-full max-w-sm space-x-3">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const CareerStatsSkeleton = () => (
  <Card className="bg-card border-0">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center text-xl font-semibold">
        <Skeleton className="h-6 w-48" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    </CardContent>
  </Card>
);

const ProfileSkeleton = () => (
  <div className="bg-primary/2 min-h-screen">
    <div className="mx-auto max-w-6xl px-6 py-6 md:pt-24 xl:px-0">
      <ProfileHeaderSkeleton />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <ProfileSidebarSkeleton />
        <div className="space-y-6 lg:col-span-8">
          <SkillsSkeleton />
          <JobPreferenceSkeleton />
          <CareerStatsSkeleton />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;
