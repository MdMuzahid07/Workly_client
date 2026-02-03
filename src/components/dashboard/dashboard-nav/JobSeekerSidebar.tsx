"use client";

import JobSeekerSidebarView from "./JobSeekerSidebarView";

export default function JobSeekerSidebar({
  isOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return <JobSeekerSidebarView isOpen={isOpen} onOpenChange={onOpenChange} />;
}
