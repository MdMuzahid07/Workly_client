"use client";
import EmployerSidebarView from "./EmployerSidebarView";

export default function EmployerSidebar({
  isOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return <EmployerSidebarView isOpen={isOpen} onOpenChange={onOpenChange} />;
}
