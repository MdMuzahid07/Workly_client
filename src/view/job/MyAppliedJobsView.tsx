"use client";

import DashboardAppliedJobsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAppliedJobsHeader";
import { ApplicationRow } from "@/components/main/jobs/myAppliedJobs/ApplicationRow";
import { ApplicationStats } from "@/components/main/jobs/myAppliedJobs/ApplicationStats";
import ErrorState from "@/components/main/jobs/myAppliedJobs/ErrorState";
import PaginationBar from "@/components/shared/PaginationBar";
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
import { FilterX, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type DateFilter = "all" | "today" | "last_7_days" | "this_month";

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

  const handleWithdraw = async (applicationId: string) => {
    const shouldWithdraw = window.confirm(
      "Withdraw this application? You cannot undo this action.",
    );

    if (!shouldWithdraw) return;

    setWithdrawingId(applicationId);
    toast.loading("Withdrawing application...", { id: "withdraw-application" });

    try {
      await withdrawApplication(applicationId).unwrap();
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

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen pt-16">
      <DashboardAppliedJobsHeader />

      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        <ApplicationStats stats={stats} />

        {/* Filter Bar */}
        <Card className="bg-card rounded-xl border">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div className="group relative max-w-md flex-1">
              <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
              <Input
                placeholder="Search job title or company..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-muted/20 border-border focus:bg-background h-11 rounded-full pl-9 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                <SelectTrigger className="h-10 w-40 cursor-pointer rounded-full font-semibold">
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
                <SelectTrigger className="h-10 w-[170px] cursor-pointer rounded-full font-semibold">
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
                className="hover:bg-destructive/5 hover:text-destructive h-10 rounded-full px-4 font-bold transition-colors"
                disabled={!hasActiveFilters}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table Section */}
        <Card className="bg-card overflow-hidden rounded-xl border">
          <CardHeader className="bg-muted/5 border-b px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg font-black tracking-tight">
                  Applications List
                </CardTitle>
                <p className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase opacity-60">
                  Manage your active job journey
                </p>
              </div>
              <div className="flex items-center gap-4">
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
                  className="bg-primary/5 text-primary border-primary/10 rounded-full border px-3 py-2 text-[10px] font-black tracking-widest uppercase"
                >
                  {totalResults} Applied
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow className="border-b hover:bg-transparent">
                    <TableHead className="text-muted-foreground/70 py-4 pl-6 text-[10px] font-black tracking-[0.2em] uppercase">
                      Company & Role
                    </TableHead>
                    <TableHead className="text-muted-foreground/70 hidden py-4 text-[10px] font-black tracking-[0.2em] uppercase md:table-cell">
                      Location
                    </TableHead>
                    <TableHead className="text-muted-foreground/70 py-4 text-center text-[10px] font-black tracking-[0.2em] uppercase">
                      Status
                    </TableHead>
                    <TableHead className="text-muted-foreground/70 hidden py-4 text-right text-[10px] font-black tracking-[0.2em] uppercase md:table-cell">
                      Date Applied
                    </TableHead>
                    <TableHead className="text-muted-foreground/70 py-4 pr-6 text-right text-[10px] font-black tracking-[0.2em] uppercase">
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
                          onWithdraw={handleWithdraw}
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
    </div>
  );
};

export default MyAppliedJobsView;
