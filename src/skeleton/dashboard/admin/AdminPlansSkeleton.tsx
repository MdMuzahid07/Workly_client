import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminPlansSkeletonProps {
  showTransactions?: boolean;
}

export default function AdminPlansSkeleton({
  showTransactions = false,
}: AdminPlansSkeletonProps) {
  return (
    <div className="bg-background min-h-screen pt-16">
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

      <div className="mx-auto max-w-full space-y-10 px-4 py-8 pb-20 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="bg-card rounded-xl border shadow-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-28 uppercase" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-8 w-24 font-bold" />
                <Skeleton className="h-3 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        {showTransactions ? (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 shadow-none sm:flex-row sm:items-center">
              <Skeleton className="h-10 flex-1 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-32 rounded-full" />
                <Skeleton className="h-10 w-16 rounded-full" />
              </div>
            </div>

            {/* Transactions Table */}
            <Card className="bg-card overflow-hidden rounded-xl border shadow-none">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>
                      <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-24" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-16" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-12" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-16" />
                    </TableHead>
                    <TableHead className="text-right">
                      <Skeleton className="ml-auto h-4 w-16" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-24 font-bold" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-10 font-bold" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="ml-auto h-8 w-8 rounded-full" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Tab Selector */}
            <div className="flex justify-center border-b pb-6">
              <Skeleton className="h-14 w-80 rounded-2xl" />
            </div>

            {/* Plans Cards Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card
                  key={i}
                  className="bg-card space-y-4 rounded-xl border p-6 shadow-none"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-xl" />
                  </div>
                  <Skeleton className="h-10 w-32" />
                  <div className="space-y-2 pt-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-6">
                    <Skeleton className="h-10 flex-1 rounded-xl" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                  </div>
                </Card>
              ))}
            </div>

            {/* Action Banner */}
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        )}
      </div>
    </div>
  );
}
