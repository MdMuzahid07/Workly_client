"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import ApplicationCard, {
  Application,
} from "../../components/main/jobs/myAppliedJobs/ApplicationCard";

import { Loader2 } from "lucide-react";
import ErrorState from "../../components/main/jobs/myAppliedJobs/ErrorState";
import { useGetMyApplicationsQuery } from "../../redux/feature/job/jobApi";
import MyAppliedJobsSkeleton from "../../skeleton/job/MyAppliedJobsSkeleton ";

type ApplicationStatus =
  | "pending"
  | "under_review"
  | "accepted"
  | "rejected"
  | null;

const MyAppliedJobsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isFetching, error } = useGetMyApplicationsQuery({
    search: debouncedSearch,
    status: statusFilter,
  });

  const applications = data?.data || [];
  const stats = data?.stats || {
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  };

  const handleStatusFilter = (status: ApplicationStatus) => {
    setStatusFilter(status);
  };

  if (isLoading && !error) {
    return <MyAppliedJobsSkeleton />;
  }

  if (error) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="bg-primary/2 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:mt-16 lg:px-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold sm:text-4xl">
            Applied Jobs
          </h1>
          <p className="text-muted-foreground">
            Track all your job applications and their status
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-foreground text-2xl font-bold sm:text-3xl">
                {stats.total}
              </p>
              <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                Total
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-warning text-2xl font-bold sm:text-3xl">
                {stats.pending}
              </p>
              <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                Pending
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-success text-2xl font-bold sm:text-3xl">
                {stats.accepted}
              </p>
              <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                Accepted
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-destructive text-2xl font-bold sm:text-3xl">
                {stats.rejected}
              </p>
              <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                Rejected
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 space-y-4">
          <div className="bg-card relative rounded-full">
            <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            {isFetching && !isLoading && (
              <Loader2 className="text-primary absolute top-3 right-3 h-4 w-4 animate-spin" />
            )}
            <Input
              placeholder="Search by job title or company..."
              className="bg-muted/40 border-border focus:bg-card focus:border-primary rounded-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter(null)}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("pending")}
              className="rounded-full"
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "under_review" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("under_review")}
              className="rounded-full"
            >
              Under Review
            </Button>
            <Button
              variant={statusFilter === "accepted" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("accepted")}
              className="rounded-full"
            >
              Accepted
            </Button>
            <Button
              variant={statusFilter === "rejected" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("rejected")}
              className="rounded-full"
            >
              Rejected
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {applications.length > 0 ? (
              applications.map((app: Application) => (
                <ApplicationCard key={app.id} app={app} />
              ))
            ) : (
              <Card className="bg-card border-border col-span-full">
                <CardContent className="py-12 text-center">
                  <p className="text-foreground font-semibold">
                    No applications found
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {searchTerm || statusFilter
                      ? "Try adjusting your filters"
                      : "You haven't applied to any jobs yet"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppliedJobsView;
