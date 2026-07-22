'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import DashboardMessagesHeader from '@/components/dashboard/dashboard-nav/header/DashboardMessagesHeader';

const ConversationSidebarSkeleton = () => (
  <div className="xl:col-span-3.5 h-full min-h-0 lg:col-span-4">
    <Card className="bg-card flex h-full flex-col gap-0 overflow-hidden rounded-2xl border p-0 shadow-xs">
      <div className="border-border/40 border-b p-3.5 sm:p-4">
        <Skeleton className="h-10 w-full rounded-full" />
      </div>

      <CardContent className="min-h-0 flex-1 overflow-hidden p-2">
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
  <div className="xl:col-span-8.5 hidden h-full min-h-0 flex-col lg:col-span-8 lg:flex">
    <Card className="bg-card flex h-full flex-col gap-0 overflow-hidden rounded-none border-0 p-0 shadow-none lg:rounded-2xl lg:border lg:shadow-xs">
      {/* Chat Header */}
      <div className="border-border/40 bg-card/80 sticky top-0 z-10 flex h-11 min-h-11 items-center border-b px-3.5 py-0 backdrop-blur-md sm:h-14 sm:min-h-14 sm:px-4 lg:h-16 lg:min-h-16 lg:rounded-t-2xl lg:px-4 lg:py-0">
        <div className="flex w-full items-center justify-between">
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
      </div>

      <CardContent className="bg-muted/5 min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`flex max-w-[75%] items-end gap-2 ${
                i % 2 === 0 ? '' : 'flex-row-reverse'
              }`}
            >
              <Skeleton className="h-7 w-7 shrink-0 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton
                  className={`h-10 w-[180px] rounded-2xl sm:w-[240px] ${
                    i % 2 === 0 ? 'bg-card' : 'bg-primary/40'
                  }`}
                />
                <Skeleton className="h-3 w-12 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="border-border/40 bg-card/90 sticky bottom-0 z-10 flex items-center gap-2 border-t p-2.5 backdrop-blur-md sm:p-3 lg:rounded-b-2xl">
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
        <Skeleton className="h-10 flex-1 rounded-full" />
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      </div>
    </Card>
  </div>
);

const MessageViewSkeleton = () => {
  return (
    <div className="min-h-screen px-3.5 sm:px-6">
      <DashboardMessagesHeader />
      <div className="grid h-[calc(100vh-130px)] grid-cols-1 gap-4 sm:h-[calc(100vh-120px)] lg:grid-cols-12">
        <ConversationSidebarSkeleton />
        <ChatAreaSkeleton />
      </div>
    </div>
  );
};

export default MessageViewSkeleton;
