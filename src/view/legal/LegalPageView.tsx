"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface LegalPageViewProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

const LegalPageView = ({
  title,
  lastUpdated,
  children,
}: LegalPageViewProps) => {
  return (
    <div className="bg-background mt-16 min-h-screen pt-16 pb-20 md:mt-20">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-4 text-sm font-medium tracking-widest uppercase">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Area */}
        <Card className="bg-card rounded-2xl border shadow-none">
          <CardContent className="prose prose-zinc dark:prose-invert max-w-none p-8 sm:p-12">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalPageView;
