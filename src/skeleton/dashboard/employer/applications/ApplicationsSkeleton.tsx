"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ApplicationsSkeleton() {
  return (
    <div className="mt-16 min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-card border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div>
              <Skeleton className="mb-2 h-5 w-40" />
              <Skeleton className="h-3.5 w-60" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        {/* Status Cards Skeletons */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-card border">
              <CardContent className="flex items-center justify-between p-5">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-7 w-12" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Bar Skeleton */}
        <Card className="bg-card border p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Skeleton className="h-10 w-full max-w-sm rounded-lg" />
            <Skeleton className="h-10 w-44 rounded-lg" />
            <Skeleton className="h-10 w-44 rounded-lg" />
          </div>
        </Card>

        {/* Table List Skeleton */}
        <div className="bg-card rounded-2xl border px-4 py-6 md:px-6 md:py-8">
          <Tabs value="all" className="w-full">
            <TabsList className="bg-card h-10 w-full flex-wrap justify-start border p-0">
              {[
                "All",
                "Submitted",
                "Reviewing",
                "Shortlisted",
                "Interviewed",
                "Rejected",
              ].map((label, idx) => (
                <TabsTrigger
                  key={idx}
                  className="min-w-32 rounded-full py-3"
                  value={idx === 0 ? "all" : label.toUpperCase()}
                  disabled
                >
                  <Skeleton className="h-4 w-20" />
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <Card className="border-0 bg-transparent shadow-none">
                <CardHeader className="px-0">
                  <CardTitle className="text-lg sm:text-xl">
                    <Skeleton className="h-5 w-36" />
                  </CardTitle>
                  <Skeleton className="mt-1 h-4 w-24" />
                </CardHeader>
                <CardContent className="px-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            <Skeleton className="h-4 w-20" />
                          </TableHead>
                          <TableHead>
                            <Skeleton className="h-4 w-20" />
                          </TableHead>
                          <TableHead>
                            <Skeleton className="h-4 w-20" />
                          </TableHead>
                          <TableHead>
                            <Skeleton className="h-4 w-24" />
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
                              <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-1.5">
                                  <Skeleton className="h-4 w-32" />
                                  <Skeleton className="h-3 w-40" />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-4 w-36" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-4 w-28" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-6 w-20 rounded-full" />
                            </TableCell>
                            <TableCell className="text-right">
                              <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
