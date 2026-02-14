"use client";
import AdminSidebarView from "./AdminSidebarView";

export default function AdminSidebar({
  isOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return <AdminSidebarView isOpen={isOpen} onOpenChange={onOpenChange} />;
}
