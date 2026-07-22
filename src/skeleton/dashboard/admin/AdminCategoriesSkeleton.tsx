import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminCategoriesSkeleton() {
  return (
    <div className="bg-background min-h-screen pt-16 lg:pt-20">
      {/* Header Skeleton */}
      <div className="bg-card border-b py-6">
        <div className="mx-auto flex max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 sm:w-64" />
            <Skeleton className="h-4 w-60 sm:w-80" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>

      <div className="space-y-8 px-4 py-8 pb-20 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-card border shadow-none">
              <CardHeader className="pb-3">
                <Skeleton className="h-4 w-28" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3.5 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-card flex flex-col gap-4 rounded-full border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </div>

        {/* Tabs & Table */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Card className="bg-card rounded-xl border p-6 shadow-none">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    {['Category', 'Jobs', 'Active', 'Applications', 'Status', 'Actions'].map(
                      (_, idx) => (
                        <th key={idx} className="px-4 py-3 text-left">
                          <Skeleton className="h-4 w-16" />
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                          <div className="mt-2 flex gap-1.5">
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="h-5 w-20 rounded-full" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-8" />
                      </td>
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-8" />
                      </td>
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-8" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-10 rounded-full" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Skeleton className="ml-auto h-8 w-8 rounded-full" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
