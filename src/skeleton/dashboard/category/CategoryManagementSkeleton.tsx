"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CategoryManagementSkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Top Header */}
      <div className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div>
              <Skeleton className="mb-2 h-4 w-40" />
              <Skeleton className="h-3 w-60" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Status Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <CardTitle>
                  <Skeleton className="h-3 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-6 w-16" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="bg-card flex flex-col gap-4 rounded-full p-2 sm:flex-row sm:items-center">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>

        {/* Tabs */}
        <Tabs value="all">
          <TabsList className="w-full">
            <TabsTrigger value="all">
              <Skeleton className="h-4 w-20" />
            </TabsTrigger>
            <TabsTrigger value="active">
              <Skeleton className="h-4 w-20" />
            </TabsTrigger>
            <TabsTrigger value="inactive">
              <Skeleton className="h-4 w-20" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <th key={i} className="px-4 py-3">
                            <Skeleton className="h-3 w-20" />
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
                        <tr key={row}>
                          <td className="px-4 py-4">
                            <Skeleton className="mb-2 h-3 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </td>
                          <td className="px-4 py-4">
                            <Skeleton className="h-3 w-8" />
                          </td>
                          <td className="px-4 py-4">
                            <Skeleton className="h-3 w-8" />
                          </td>
                          <td className="px-4 py-4">
                            <Skeleton className="h-3 w-10" />
                          </td>
                          <td className="px-4 py-4">
                            <Skeleton className="h-6 w-12 rounded-full" />
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Skeleton className="h-8 w-8 rounded-md" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CategoryManagementSkeleton;
