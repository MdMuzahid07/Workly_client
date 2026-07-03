"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardMessagesHeader from "@/components/dashboard/dashboard-nav/header/DashboardMessagesHeader";

const ConversationSidebarSkeleton = () => (
  <div className="xl:col-span-3.5 h-full lg:col-span-4">
    <Card className="bg-card flex h-full flex-col overflow-hidden rounded-2xl border shadow-xs">
      <CardHeader className="border-border/40 border-b p-3.5 sm:p-4">
        <Skeleton className="h-10 w-full rounded-full" />
      </CardHeader>

      <CardContent className="flex-1 p-2">
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl p-3">
              <Skeleton className="h-11 w-11 shrink-0 rounded-xl sm:h-12 sm:w-12" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3 rounded-md" />
                <Skeleton className="h-3 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const ChatAreaSkeleton = () => (
  <div className="xl:col-span-8.5 hidden h-full flex-col lg:col-span-8 lg:flex">
    <Card className="bg-card flex h-full flex-col overflow-hidden rounded-2xl border shadow-xs">
      <CardHeader className="border-border/40 border-b p-3.5 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl sm:h-11 sm:w-11" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="bg-muted/5 flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`flex max-w-[75%] items-end gap-2 ${
                i % 2 === 0 ? "" : "flex-row-reverse"
              }`}
            >
              <Skeleton className="h-7 w-7 shrink-0 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton
                  className={`h-10 w-[180px] rounded-2xl sm:w-[240px] ${
                    i % 2 === 0 ? "bg-card" : "bg-primary/40"
                  }`}
                />
                <Skeleton className="h-3 w-12 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="border-border/40 flex items-center gap-2 border-t p-2.5 sm:p-3">
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
        <Skeleton className="h-10 flex-1 rounded-full" />
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      </div>
    </Card>
  </div>
);

const MessageViewSkeleton = () => {
  return (
    <div className="min-h-screen">
      <DashboardMessagesHeader />
      <div className="space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
        <div className="grid h-[calc(100vh-170px)] grid-cols-1 gap-4 sm:h-[calc(100vh-160px)] lg:grid-cols-12">
          <ConversationSidebarSkeleton />
          <ChatAreaSkeleton />
        </div>
      </div>
    </div>
  );
};

export default MessageViewSkeleton;
