"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Link from "next/link";

export default function FollowedCompanyPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Followed Companies
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Companies you follow. Get updates when they post new jobs.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            Follow companies from their profile pages to see them here and get
            job alerts.
          </p>
          <Link href="/companies">
            <Button variant="outline">Browse companies</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
