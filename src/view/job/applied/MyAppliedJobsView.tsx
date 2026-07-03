"use client";

import DashboardAppliedJobsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAppliedJobsHeader";
import { ApplicationRow } from "@/components/main/jobs/myAppliedJobs/ApplicationRow";
import { ApplicationStats } from "@/components/main/jobs/myAppliedJobs/ApplicationStats";
import ErrorState from "@/components/main/jobs/myAppliedJobs/ErrorState";
import PaginationBar from "@/components/shared/PaginationBar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetMyApplicationsQuery,
  useGetMyApplicationSummaryQuery,
  useWithdrawApplicationMutation,
} from "@/redux/feature/application/applicationApi";
import { ApplicationStatus, MyAppliedJob } from "@/types/application";
import debounce from "debounce";
import { AnimatePresence } from "framer-motion";
import { AlertTriangle, FilterX, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type DateFilter = "all" | "today" | "last_7_days" | "this_month";

import MyAppliedJobsSkeleton from "@/skeleton/job/applied/MyAppliedJobsSkeleton";

const MyAppliedJobsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all",
  );
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState("10");

  // UI State for search
  const [searchValue, setSearchValue] = useState("");
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);

  // Custom dialog state for confirmation
  const [selectedWithdrawId, setSelectedWithdrawId] = useState<string | null>(
    null,
  );
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

  const jobsLimit = parseInt(limit);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.clear();
  }, [searchValue, debouncedSearch]);

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit: jobsLimit,
      q: searchTerm || undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
      dateFilter: dateFilter !== "all" ? dateFilter : undefined,
    }),
    [currentPage, dateFilter, jobsLimit, searchTerm, statusFilter],
  );

  const {
    data: applicationsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMyApplicationsQuery(queryParams);
  const { data: summaryResponse } = useGetMyApplicationSummaryQuery(undefined);
  const [withdrawApplication] = useWithdrawApplicationMutation();

  const applications = (applicationsResponse?.data || []) as MyAppliedJob[];
  const meta = applicationsResponse?.meta || {
    page: currentPage,
    limit: jobsLimit,
    total: 0,
    pages: 0,
  };
  const totalResults = meta.total || 0;
  const totalPages = meta.pages || Math.ceil(totalResults / jobsLimit);

  // Pagination Meta for shared component
  const paginationMeta = {
    page: meta.page || currentPage,
    limit: meta.limit || jobsLimit,
    total: totalResults,
    pages: totalPages,
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
    setCurrentPage(1);
  };

  const handleLimitChange = (val: string) => {
    setLimit(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as ApplicationStatus | "all");
    setCurrentPage(1);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value as DateFilter);
    setCurrentPage(1);
  };

  const handleWithdrawClick = (applicationId: string) => {
    setSelectedWithdrawId(applicationId);
    setIsWithdrawDialogOpen(true);
  };

  const handleConfirmWithdraw = async () => {
    if (!selectedWithdrawId) return;
    const targetId = selectedWithdrawId;

    // Close modal immediately for smooth responsiveness
    setIsWithdrawDialogOpen(false);
    setSelectedWithdrawId(null);

    setWithdrawingId(targetId);
    toast.loading("Withdrawing application...", { id: "withdraw-application" });

    try {
      await withdrawApplication(targetId).unwrap();
      toast.success("Application withdrawn", { id: "withdraw-application" });
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: { message?: string } }).data?.message ===
          "string"
          ? (error as { data: { message: string } }).data.message
          : "Failed to withdraw application";

      toast.error(message, { id: "withdraw-application" });
    } finally {
      setWithdrawingId(null);
    }
  };

  const stats = useMemo(() => {
    const summary = summaryResponse?.data;

    return {
      total: summary?.total || 0,
      inReview: summary?.inReview || 0,
      interviewing: summary?.interviewing || 0,
      offer: summary?.offer || 0,
    };
  }, [summaryResponse]);

  const hasActiveFilters =
    searchValue !== "" || statusFilter !== "all" || dateFilter !== "all";

  if (isLoading && !applicationsResponse) {
    return <MyAppliedJobsSkeleton />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen pt-8">
      <DashboardAppliedJobsHeader />

      <div className="space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
        <ApplicationStats stats={stats} />

        {/* Filter Bar */}
        <Card className="bg-card rounded-2xl border">
          <CardContent className="flex flex-col gap-3 p-3.5 sm:p-4 md:flex-row md:items-center md:justify-between">
            <div className="group relative w-full max-w-md flex-1">
              <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
              <Input
                placeholder="Search job title or company..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-muted/20 border-border focus:bg-background h-9 rounded-full pl-9 text-xs transition-all sm:h-10 sm:text-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                <SelectTrigger className="h-8 w-auto cursor-pointer rounded-full text-xs font-semibold sm:h-10 sm:text-sm">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem className="cursor-pointer rounded-lg" value="all">
                    All Time
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="today"
                  >
                    Today
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="last_7_days"
                  >
                    Last 7 Days
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="this_month"
                  >
                    This Month
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={handleStatusChange}>
                <SelectTrigger className="h-8 w-auto cursor-pointer rounded-full text-xs font-semibold sm:h-10 sm:text-sm">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem className="cursor-pointer rounded-lg" value="all">
                    All Statuses
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="SUBMITTED"
                  >
                    Submitted
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="REVIEWING"
                  >
                    Reviewing
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="SHORTLISTED"
                  >
                    Shortlisted
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="INTERVIEWED"
                  >
                    Interviewing
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="OFFERED"
                  >
                    Offer Received
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="ACCEPTED"
                  >
                    Accepted
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="REJECTED"
                  >
                    Rejected
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer rounded-lg"
                    value="WITHDRAWN"
                  >
                    Withdrawn
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="hover:bg-destructive/5 hover:text-destructive h-8 rounded-full px-3 text-xs font-bold transition-colors sm:h-10 sm:px-4 sm:text-sm"
                disabled={!hasActiveFilters}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table Section */}
        <Card className="bg-card overflow-hidden rounded-xl border">
          <CardHeader className="bg-muted/5 border-b px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base font-black tracking-tight sm:text-lg">
                  Applications List
                </CardTitle>
                <p className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase opacity-60">
                  Manage your active job journey
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                    Show:
                  </span>
                  <Select value={limit} onValueChange={handleLimitChange}>
                    <SelectTrigger className="h-8 w-[70px] rounded-full text-xs font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem
                        className="cursor-pointer rounded-lg"
                        value="10"
                      >
                        10
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer rounded-lg"
                        value="20"
                      >
                        20
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer rounded-lg"
                        value="50"
                      >
                        50
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/5 text-primary border-primary/10 rounded-full border px-3 py-1.5 text-[10px] font-black tracking-widest uppercase"
                >
                  {totalResults} Applied
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[480px] md:min-w-full">
                <TableHeader className="bg-muted/10">
                  <TableRow className="border-b hover:bg-transparent">
                    <TableHead className="text-muted-foreground/70 py-3 pl-3 text-[10px] font-black tracking-[0.2em] uppercase sm:py-4 sm:pl-6">
                      Company & Role
                    </TableHead>
                    <TableHead className="text-muted-foreground/70 hidden py-4 text-[10px] font-black tracking-[0.2em] uppercase md:table-cell">
                      Location
                    </TableHead>
                    <TableHead className="text-muted-foreground/70 px-2 py-3 text-center text-[10px] font-black tracking-[0.2em] uppercase sm:py-4">
                      Status
                    </TableHead>
                    <TableHead className="text-muted-foreground/70 hidden py-4 text-right text-[10px] font-black tracking-[0.2em] uppercase md:table-cell">
                      Date Applied
                    </TableHead>
                    <TableHead className="text-muted-foreground/70 py-3 pr-3 text-right text-[10px] font-black tracking-[0.2em] uppercase sm:py-4 sm:pr-6">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-border/30 divide-y">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {isLoading || isFetching ? (
                      <TableRow>
                        <TableCell colSpan={5} className="py-16 text-center">
                          <span className="text-muted-foreground text-sm font-medium">
                            Loading applications...
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : applications.length > 0 ? (
                      applications.map((app) => (
                        <ApplicationRow
                          key={app.id}
                          app={app}
                          isWithdrawing={withdrawingId === app.id}
                          onWithdraw={handleWithdrawClick}
                        />
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="py-24 text-center">
                          <div className="flex flex-col items-center gap-6">
                            <div className="bg-muted/20 ring-muted/5 rounded-full p-8 ring-8">
                              <FilterX className="text-muted-foreground/30 h-10 w-10" />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xl font-black tracking-tight">
                                Search results found nothing
                              </p>
                              <p className="text-muted-foreground mx-auto max-w-xs text-sm font-medium">
                                Try broadening your search terms or resetting
                                the filters entirely.
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              onClick={handleClearFilters}
                              className="h-11 rounded-xl px-6 font-bold"
                            >
                              Clear All Filters
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {/* Shared Pagination Bar */}
            <PaginationBar
              meta={paginationMeta}
              onPageChange={setCurrentPage}
              className="bg-muted/5 border-t px-6 py-6"
            />
          </CardContent>
        </Card>
      </div>

      {/* Premium Custom Withdrawal Confirmation Modal */}
      <AlertDialog
        open={isWithdrawDialogOpen}
        onOpenChange={setIsWithdrawDialogOpen}
      >
        <AlertDialogContent className="bg-card max-w-md overflow-hidden rounded-2xl border-none p-6 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 ring-8 ring-amber-500/5">
              <AlertTriangle className="h-8 w-8 animate-pulse" />
            </div>
            <AlertDialogTitle className="text-foreground text-xl font-black tracking-tight">
              Withdraw Application?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed font-medium">
              Are you sure you want to withdraw your application? This action is
              permanent and cannot be undone. You will lose your spot in the
              recruitment pool.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-4">
            <AlertDialogCancel className="border-border hover:bg-muted text-foreground h-11 flex-1 rounded-full border bg-transparent px-6 font-bold transition-all sm:flex-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmWithdraw}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground h-11 flex-1 rounded-full border-none px-6 font-bold shadow-sm transition-all hover:shadow sm:flex-none"
            >
              Yes, Withdraw
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyAppliedJobsView;
