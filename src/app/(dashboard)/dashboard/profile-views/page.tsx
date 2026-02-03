"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default function ProfileViewsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Profile Views
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            See who has viewed your profile. This feature helps you track
            employer interest.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Profile view tracking will appear here when employers view your
            profile. Keep your profile complete and up to date to attract more
            views.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
