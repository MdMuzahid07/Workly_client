"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logo/workly_job-logo.png"
          alt="Workly"
          width={58}
          height={58}
          priority
        />

        <div
          role="status"
          aria-live="polite"
          className="mt-2 flex flex-col items-center"
        >
          <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
          <span className="sr-only">Loading…</span>
        </div>
      </div>
    </div>
  );
}
