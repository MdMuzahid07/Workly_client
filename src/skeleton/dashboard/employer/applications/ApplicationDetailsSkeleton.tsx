"use client";

import DashboardApplicationsHeader from "@/components/dashboard/dashboard-nav/header/DashboardJobApplicationsHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";

export default function ApplicationDetailsSkeleton() {
  return (
    <div className="min-h-screen pt-16">
      <DashboardApplicationsHeader />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Back navigation and header skeleton */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            {/* Back button */}
            <Button
              variant="ghost"
              disabled
              className="text-muted-foreground -ml-3 gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Applications
            </Button>

            <div className="flex items-center gap-4">
              {/* Avatar skeleton */}
              <Skeleton className="border-border h-16 w-16 rounded-full border-2" />
              <div className="space-y-2">
                {/* Name and Job Title skeleton */}
                <Skeleton className="h-6 w-48" />
                <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  <span>Applied for</span>
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons (renders actual static buttons but skeleton for dynamic ones) */}
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-10 w-28 rounded-full" />{" "}
            {/* Move to Status skeleton */}
            <Button
              variant="outline"
              disabled
              className="border-border rounded-full"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
            <Button
              variant="outline"
              disabled
              className="text-destructive hover:bg-destructive/5 hover:text-destructive border-destructive/20 rounded-full"
            >
              Reject
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left 2/3 Content: Cover Letter & Resume Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Static Tab Bar layout with skeletons inside */}
            <div className="bg-muted/40 flex h-auto w-full max-w-[280px] flex-wrap justify-start gap-1 rounded-full border p-1 md:w-auto">
              <Button
                variant="ghost"
                disabled
                className="bg-background text-foreground rounded-full px-5 py-2 text-xs font-bold tracking-tight shadow-xs"
              >
                Candidate Profile
              </Button>
              <Button
                variant="ghost"
                disabled
                className="text-muted-foreground rounded-full px-5 py-2 text-xs font-bold tracking-tight"
              >
                Cover Letter
              </Button>
            </div>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-lg">
                  Professional Background
                </CardTitle>
                <CardDescription>
                  Education, work history, and skills as registered in the
                  {`candidate's`} profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Work Experience */}
                <div className="space-y-4">
                  <h3 className="text-muted-foreground flex items-center gap-2 border-b pb-2 text-sm font-semibold tracking-wider uppercase">
                    <Briefcase className="text-primary h-4 w-4" /> Work
                    Experience
                  </h3>
                  <div className="relative mt-4 ml-2 space-y-6 border-l pl-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="relative space-y-2">
                        <div className="bg-border ring-background absolute top-1.5 -left-[21px] h-2 w-2 rounded-full ring-4" />
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3.5 w-32" />
                        <div className="space-y-1.5 pt-2">
                          <Skeleton className="h-3.5 w-full" />
                          <Skeleton className="h-3.5 w-[85%]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <h3 className="text-muted-foreground flex items-center gap-2 border-b pb-2 text-sm font-semibold tracking-wider uppercase">
                    <GraduationCap className="text-primary h-4 w-4" /> Education
                  </h3>
                  <div className="relative mt-4 ml-2 space-y-6 border-l pl-4">
                    <div className="relative space-y-2">
                      <div className="bg-border ring-background absolute top-1.5 -left-[21px] h-2 w-2 rounded-full ring-4" />
                      <Skeleton className="h-5 w-56" />
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3.5 w-32" />
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="text-muted-foreground flex items-center gap-2 border-b pb-2 text-sm font-semibold tracking-wider uppercase">
                    <Award className="text-primary h-4 w-4" /> Skills
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-7 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right 1/3 Content: Summary and Quick Details */}
          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-muted-foreground text-base font-bold tracking-wider uppercase">
                  Application Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-muted-foreground text-sm">
                    Current Status
                  </span>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-muted-foreground text-sm">
                    Applied On
                  </span>
                  <Skeleton className="h-4 w-32" />
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-muted-foreground text-sm">
                    Total Experience
                  </span>
                  <Skeleton className="h-4 w-16" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Location
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <MapPin className="text-primary h-4 w-4 shrink-0" />
                    <Skeleton className="h-4 w-36" />
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-muted-foreground text-base font-bold tracking-wider uppercase">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold uppercase">
                    <Mail className="text-primary h-3.5 w-3.5" /> Email Address
                  </span>
                  <Skeleton className="h-4 w-52" />
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold uppercase">
                    <Phone className="text-primary h-3.5 w-3.5" /> Phone Number
                  </span>
                  <Skeleton className="h-4 w-36" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
