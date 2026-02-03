"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardFindJobsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/jobs");
  }, [router]);
  return null;
}
