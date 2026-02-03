"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EmployerTalentPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/employer/applications");
  }, [router]);
  return null;
}
