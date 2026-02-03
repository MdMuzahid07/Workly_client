"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Link from "next/link";

export default function JobViewHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Job View History
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Jobs you’ve recently viewed. Quick access to continue your search.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            Your recently viewed jobs will appear here. Start browsing to build
            your history.
          </p>
          <Link href="/dashboard/find-jobs">
            <Button>Find jobs</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
