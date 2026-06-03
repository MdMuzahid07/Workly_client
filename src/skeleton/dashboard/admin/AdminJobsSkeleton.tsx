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

export default function AdminJobsSkeleton() {
  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header Skeleton */}
      <div className="bg-card border-b py-6">
        <div className="mx-auto flex max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 sm:w-64" />
            <Skeleton className="h-4 w-60 sm:w-80" />
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="bg-card rounded-xl border shadow-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-28 uppercase" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 shadow-none sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-16 rounded-full" />
          </div>
        </div>

        {/* Jobs Table */}
        <Card className="bg-card overflow-hidden rounded-xl border shadow-none">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[350px]">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="ml-auto h-4 w-12" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-3 w-10" />
                      </div>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-3 w-10" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
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
    </div>
  );
}
