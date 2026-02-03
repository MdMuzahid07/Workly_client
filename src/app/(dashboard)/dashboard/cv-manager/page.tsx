"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProfileQuery } from "@/redux/feature/profile/profileApi";
import { useAppSelector } from "@/redux/hooks";
import { FileText, Upload } from "lucide-react";
import Link from "next/link";

export default function CVManagerPage() {
  const { user } = useAppSelector((state) => state.auth) || {};
  const { data } = useGetProfileQuery(undefined, { skip: !user?.id });
  const resumeUrl = data?.data?.profile?.resumeUrl;

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            CV / Resume Manager
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Upload and manage your resumes. Use different versions for different
            job types.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeUrl ? (
            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">
                Current resume on file
              </p>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View resume
              </a>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No resume uploaded yet. Add one from your profile.
            </p>
          )}
          <Link href="/dashboard/profile">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              {resumeUrl ? "Update resume" : "Add resume in profile"}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
