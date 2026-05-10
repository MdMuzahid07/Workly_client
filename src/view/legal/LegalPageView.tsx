"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LegalPageViewProps {
  title: string;
  lastUpdated?: string;
  intro?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

const LegalPageView = ({
  title,
  lastUpdated,
  intro,
  isLoading,
  children,
}: LegalPageViewProps) => {
  return (
    <div className="bg-background mt-16 min-h-screen pt-16 pb-20 md:mt-20">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {isLoading ? (
              <Skeleton className="mx-auto h-12 w-3/4 md:mx-0" />
            ) : (
              title
            )}
          </h1>
          {isLoading ? (
            <Skeleton className="mx-auto mt-4 h-4 w-48 md:mx-0" />
          ) : lastUpdated ? (
            <p className="text-muted-foreground mt-4 text-sm font-medium tracking-widest uppercase">
              Last Updated: {lastUpdated}
            </p>
          ) : null}
          {isLoading ? (
            <Skeleton className="mt-6 h-16 w-full" />
          ) : intro ? (
            <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed">
              {intro}
            </p>
          ) : null}
        </div>

        {/* Content Area */}
        <Card className="bg-card rounded-2xl border shadow-none">
          <CardContent className="prose prose-zinc dark:prose-invert max-w-none p-8 sm:p-12">
            {isLoading ? (
              <div className="space-y-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-8 w-1/3" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              children
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalPageView;
