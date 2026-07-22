import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminSettingsSkeleton() {
  return (
    <div className="bg-background min-h-screen pt-16 lg:pt-20">
      {/* Header Skeleton */}
      <div className="bg-card border-b py-6">
        <div className="mx-auto flex max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 sm:w-64" />
            <Skeleton className="h-4 w-60 sm:w-80" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10 pb-20">
          {/* Account & Security Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-52" />
              <Skeleton className="h-4 w-72" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="bg-card rounded-xl border-2 p-5 shadow-none">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-xl" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4.5 w-32" />
                        <Skeleton className="h-3 w-44" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                </Card>
              ))}

              <Card className="bg-card rounded-xl border-2 p-5 shadow-none sm:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4.5 w-28" />
                      <Skeleton className="h-3 w-64" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </Card>
            </div>
          </section>

          <Skeleton className="h-px w-full" />

          {/* Platform Intelligence & Logic Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-60" />
              <Skeleton className="h-4 w-80" />
            </div>

            <div className="grid gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-card rounded-xl border-2 p-5 shadow-none">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-64" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-10 rounded-full" />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Skeleton className="h-px w-full" />

          {/* Vital Controls Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-64" />
            </div>

            <div className="grid gap-3">
              {/* Maintenance Mode Card */}
              <Card className="bg-muted/10 rounded-xl border-2 p-5 shadow-none">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4.5 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                  <div className="bg-muted/20 flex items-center gap-3 rounded-full border px-4 py-1.5">
                    <Skeleton className="h-3.5 w-14" />
                    <Skeleton className="h-6 w-10 rounded-full" />
                  </div>
                </div>
              </Card>

              {/* Reset Card */}
              <Card className="bg-card rounded-xl border-2 p-5 shadow-none">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-56" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
