"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ConversationSidebarSkeleton = () => (
  <div className="lg:col-span-4 xl:col-span-3">
    <Card className="h-full">
      <CardHeader className="pb-3">
        <Skeleton className="h-10 w-full rounded-full" />
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-2 px-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="hover:bg-muted/40 flex items-start space-x-3 rounded-lg border border-transparent p-3"
            >
              <div className="relative">
                <Skeleton className="h-10 w-10 rounded-full" />
                {i % 2 === 0 && (
                  <div className="bg-primary border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2"></div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-2 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
              {i === 0 && (
                <Skeleton className="h-5 w-5 rounded-full" /> // unread badge placeholder
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const ChatAreaSkeleton = () => (
  <div className="flex flex-col lg:col-span-8 xl:col-span-9">
    <Card className="flex h-full flex-col">
      <CardHeader className="border-border hidden border-b pb-3 lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-3 w-32" />
              <Skeleton className="mt-1 h-2 w-24" />
            </div>
          </div>
          <div className="flex space-x-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-md" />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-6 overflow-y-auto p-4">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`flex max-w-[80%] items-start space-x-2 ${
                i % 2 === 0 ? "" : "flex-row-reverse space-x-reverse"
              }`}
            >
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton
                  className={`h-5 w-[180px] rounded-lg ${
                    i % 2 === 0 ? "bg-muted" : "bg-primary/40"
                  }`}
                />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="border-border flex items-center space-x-2 border-t p-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </Card>
  </div>
);

const MessageViewSkeleton = () => {
  return (
    <div className="md:bg-primary/2 bg-background min-h-screen md:pt-20">
      <div className="border-border bg-card sticky top-0 z-50 flex w-full border-b md:hidden">
        <div className="max-w-6xl p-4">
          <Skeleton className="h-6 w-40" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-12">
          <ConversationSidebarSkeleton />
          <ChatAreaSkeleton />
        </div>
      </div>
    </div>
  );
};

export default MessageViewSkeleton;
