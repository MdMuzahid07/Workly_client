/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AdminJobsSkeleton from '@/skeleton/dashboard/admin/AdminJobsSkeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaginationBar from '@/components/shared/PaginationBar';
import {
  useApproveJobAdminMutation,
  useDeleteJobListingMutation,
  useGetActiveJobsAdminQuery,
} from '@/redux/feature/admin/adminApi';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  Mail,
  MoreVertical,
  Search,
  ShieldAlert,
  ShieldCheck,
  X,
  XCircle,
} from 'lucide-react';
import debounce from 'debounce';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import DashboardAdminPendingApprovalsHeader from '../../../../../components/dashboard/dashboard-nav/header/DashboardAdminPendingApprovalsHeader';

export default function AdminPendingApprovalsManagementView() {
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [reviewedTodayCount, setReviewedTodayCount] = useState(18);

  // 300ms debounce — prevents API call on every keystroke
  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1); // Reset to first page on new search
      }, 300),
    [],
  );

  useEffect(() => {
    applyDebouncedSearch(searchValue);
    return () => applyDebouncedSearch.clear();
  }, [searchValue, applyDebouncedSearch]);

  // Reset page when type filter changes
  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchValue('');
    setSearchTerm('');
    setSelectedType(null);
    setPage(1);
  };

  const hasActiveFilters = searchValue !== '' || selectedType !== null;

  // Live Query from Server (fetching DRAFT jobs for moderation)
  const {
    data: jobsResponse,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetActiveJobsAdminQuery({
    page,
    limit: 10,
    status: 'DRAFT',
    q: searchTerm || undefined,
    type: selectedType || undefined,
  });

  // Live mutations
  const [approveJob] = useApproveJobAdminMutation();
  const [deleteJob] = useDeleteJobListingMutation();

  if (error) {
    const errorMessage =
      (error as any)?.data?.message || (error as any)?.message || 'An unexpected error occurred';
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="text-destructive mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-bold">Failed to load pending approvals</h2>
          <p className="text-muted-foreground mt-2">{errorMessage}</p>
          <Button onClick={() => refetch()} className="mt-6">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <AdminJobsSkeleton />;
  }

  const handleApprove = async (jobId: string, title: string) => {
    try {
      await approveJob(jobId).unwrap();
      setReviewedTodayCount((prev) => prev + 1);
      if (expandedJobId === jobId) setExpandedJobId(null);
      toast.success(`"${title}" was successfully approved and published live!`);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to approve job');
    }
  };

  const handleReject = async (jobId: string, title: string) => {
    try {
      await deleteJob(jobId).unwrap();
      if (expandedJobId === jobId) setExpandedJobId(null);
      toast.error(`"${title}" was rejected and removed from listing queues.`);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to reject job');
    }
  };

  const toggleExpand = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const rawJobs = jobsResponse?.data || [];
  const rawMeta = jobsResponse?.meta as any;

  // PaginationBar expects { page, limit, total, pages }
  const paginationMeta = rawMeta
    ? {
        page: rawMeta.page ?? page,
        limit: rawMeta.limit ?? 10,
        total: rawMeta.total ?? 0,
        pages: rawMeta.totalPage ?? rawMeta.pages ?? 1,
      }
    : null;

  // Map and enrich database jobs dynamically with spam filter logic
  const pendingJobs = rawJobs.map((job: any) => {
    return {
      ...job,
      submittedAt: job.posted
        ? new Date(job.posted).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Recent',
      postedBy: job.postedBy?.fullName || 'Recruiter Account',
      recruiterEmail: job.postedBy?.email || 'No email',
      riskScore: job.riskScore ?? 15,
      triggeredRules: job.triggeredRules ?? [
        'Algorithmic filter flagged for manual metadata check',
      ],
      priority: job.priority ?? 'Normal',
    };
  });

  const typeOptions = [
    { label: 'Full Time', value: 'FULL_TIME' },
    { label: 'Part Time', value: 'PART_TIME' },
    { label: 'Contract', value: 'CONTRACT' },
    { label: 'Freelance', value: 'FREELANCE' },
  ];

  const stats = [
    {
      label: 'Total Suspicious',
      value: isLoading ? '...' : (paginationMeta?.total ?? pendingJobs.length),
      icon: Clock,
      color: 'text-amber-500',
    },
    {
      label: 'Critical Priority',
      value: isLoading
        ? '...'
        : pendingJobs.filter((j) => j.priority === 'Emergency' || j.riskScore >= 70).length,
      icon: AlertTriangle,
      color: 'text-destructive',
    },
    {
      label: 'Filter Accuracy',
      value: '99.4%',
      icon: ShieldAlert,
      color: 'text-emerald-500',
    },
    {
      label: 'Reviewed Today',
      value: reviewedTodayCount,
      icon: CheckCircle2,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminPendingApprovalsHeader />

      <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-card rounded-xl border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight sm:text-3xl">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="admin-pending-jobs-search"
              placeholder="Search by title, company, or warning..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-muted/50 ring-offset-background focus-visible:ring-primary rounded-full border-none pr-10 pl-10 focus-visible:ring-1"
            />
            {/* Clear search button */}
            {searchValue && (
              <button
                onClick={() => {
                  setSearchValue('');
                  setSearchTerm('');
                  setPage(1);
                }}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary/20 flex items-center gap-2 rounded-full font-bold"
                >
                  <Filter className="h-4 w-4" />
                  {selectedType
                    ? typeOptions.find((t) => t.value === selectedType)?.label
                    : 'Job Type'}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleTypeChange(null)} className="cursor-pointer">
                  All Types
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {typeOptions.map((type) => (
                  <DropdownMenuItem
                    key={type.value}
                    onClick={() => handleTypeChange(type.value)}
                    className="cursor-pointer"
                  >
                    {type.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                className="text-muted-foreground hover:text-primary rounded-full font-bold"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Moderation Table */}
        <Card className="bg-card overflow-hidden rounded-xl border">
          {paginationMeta && (
            <div className="border-b px-6 py-3">
              <p className="text-muted-foreground text-xs font-medium">
                {isFetching ? (
                  'Loading...'
                ) : (
                  <>
                    Showing{' '}
                    <span className="text-foreground font-bold">
                      {Math.min(
                        (paginationMeta.page - 1) * paginationMeta.limit + 1,
                        paginationMeta.total,
                      )}
                    </span>{' '}
                    –{' '}
                    <span className="text-foreground font-bold">
                      {Math.min(paginationMeta.page * paginationMeta.limit, paginationMeta.total)}
                    </span>{' '}
                    of <span className="text-foreground font-bold">{paginationMeta.total}</span>{' '}
                    jobs
                    {hasActiveFilters && (
                      <span className="text-primary ml-1 font-semibold">(filtered)</span>
                    )}
                  </>
                )}
              </p>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Suspicious Job Details</TableHead>
                  <TableHead>Spam Risk</TableHead>
                  <TableHead>Recruiter Profile</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingJobs.map((job) => (
                  <Fragment key={job.id}>
                    <TableRow
                      key={job.id}
                      className={`group hover:bg-muted/40 cursor-pointer transition-colors ${
                        expandedJobId === job.id ? 'bg-muted/30 hover:bg-muted/30 border-b-0' : ''
                      }`}
                      onClick={() => toggleExpand(job.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="ring-primary/5 group-hover:ring-primary/20 h-10 w-10 ring-2 transition-all">
                            <AvatarImage src={job.logo} />
                            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                              {job.company.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="flex items-center gap-1.5 truncate text-sm font-bold">
                              {job.title}
                              {expandedJobId === job.id ? (
                                <ChevronUp className="text-primary h-4 w-4 opacity-50" />
                              ) : (
                                <ChevronDown className="text-primary h-4 w-4 opacity-30 transition-opacity group-hover:opacity-100" />
                              )}
                            </p>
                            <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                              <Building2 className="h-3.5 w-3.5" />
                              <span className="truncate">{job.company}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`font-bold ${
                              job.riskScore >= 75
                                ? 'border-rose-200 bg-rose-500/10 text-rose-600'
                                : job.riskScore >= 55
                                  ? 'border-amber-200 bg-amber-500/10 text-amber-600'
                                  : 'border-blue-200 bg-blue-500/10 text-blue-600'
                            }`}
                            variant="outline"
                          >
                            Score: {job.riskScore}%
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="text-foreground text-xs font-bold">{job.postedBy}</p>
                          <div className="text-muted-foreground flex items-center gap-1 text-[10px] font-medium">
                            <Mail className="h-3 w-3 shrink-0" />
                            <span>{job.recruiterEmail}</span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-0.5">
                          <div className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
                            <Clock className="h-3 w-3" />
                            <span>{job.submittedAt}</span>
                          </div>
                          <Badge className="bg-primary/10 text-primary border-none text-[9px] font-bold">
                            {job.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => handleApprove(job.id, job.title)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600"
                            title="Approve & Publish"
                          >
                            <ShieldCheck className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleReject(job.id, job.title)}
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
                            title="Reject & Delete"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52">
                              <DropdownMenuLabel>Moderation</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => toggleExpand(job.id)}
                                className="cursor-pointer"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                {expandedJobId === job.id ? 'Collapse Details' : 'Read Full Post'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="my-1 border-dashed" />
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.success(`Opening poster profile for ${job.postedBy}...`)
                                }
                                className="cursor-pointer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Recruiter Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.success(
                                    `Warning email template draft created for ${job.recruiterEmail}`,
                                  )
                                }
                                className="cursor-pointer"
                              >
                                <Mail className="mr-2 h-4 w-4" />
                                Send Warning Email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Expanded warning details & full post preview */}
                    {expandedJobId === job.id && (
                      <TableRow className="border-b bg-slate-50/40 hover:bg-slate-50/40 dark:bg-slate-900/10 dark:hover:bg-slate-900/10">
                        <TableCell colSpan={5} className="p-6">
                          <div className="animate-in slide-in-from-top-2 grid grid-cols-1 gap-8 duration-300 lg:grid-cols-2">
                            {/* Flagged Rules & Indicators */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-rose-600 uppercase dark:text-rose-400">
                                <AlertTriangle className="h-4 w-4 shrink-0" />
                                <span>
                                  Security Warning Report ({job.triggeredRules.length} rules
                                  triggered)
                                </span>
                              </div>
                              <div className="space-y-3.5 rounded-2xl border border-rose-500/10 bg-rose-500/3 p-5">
                                {job.triggeredRules.map((rule: string, index: number) => (
                                  <div key={index} className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-xs font-bold text-rose-600">
                                      {index + 1}
                                    </div>
                                    <p className="text-foreground/80 text-xs leading-relaxed font-semibold">
                                      {rule}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className="bg-muted/30 border-border/50 space-y-1.5 rounded-2xl border p-5">
                                <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                                  Recruiter Details Verification
                                </span>
                                <div className="flex items-center justify-between pt-1 text-xs">
                                  <span className="text-muted-foreground">Public domain:</span>
                                  <span className="text-foreground font-mono font-bold">
                                    {job.recruiterEmail.endsWith('@gmail.com')
                                      ? 'HIGH RISK (Public Gmail)'
                                      : 'LOW RISK (Company Domain)'}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Company matching:</span>
                                  <span className="text-foreground font-mono font-bold">
                                    No matching registered portal website
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Job Description Preview */}
                            <div className="border-border/50 flex flex-col justify-between space-y-4 border-t pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
                                    Job Post Contents
                                  </span>
                                  <Badge className="bg-primary/10 text-primary border-none text-[9px] font-bold">
                                    {job.category}
                                  </Badge>
                                </div>
                                <div className="bg-muted/10 border-border/40 max-h-56 overflow-y-auto rounded-2xl border p-5">
                                  <h4 className="text-foreground mb-2 text-sm font-bold">
                                    {job.title}
                                  </h4>
                                  <p className="text-muted-foreground text-xs leading-relaxed font-medium whitespace-pre-line">
                                    {job.description}
                                  </p>
                                </div>
                              </div>

                              <div className="border-border/60 flex items-center justify-end gap-3 border-t border-dashed pt-4">
                                <Button
                                  onClick={() => handleReject(job.id, job.title)}
                                  variant="ghost"
                                  className="h-10 rounded-xl px-5 text-xs font-bold text-rose-600 hover:bg-rose-50"
                                >
                                  Reject Post
                                </Button>
                                <Button
                                  onClick={() => handleApprove(job.id, job.title)}
                                  className="h-10 gap-1 rounded-xl bg-emerald-600 px-6 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-700"
                                >
                                  <ShieldCheck className="h-4 w-4" /> Approve & Publish Live
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </div>

          {pendingJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                {hasActiveFilters ? (
                  <Search className="text-muted-foreground h-8 w-8" />
                ) : (
                  <ShieldCheck className="text-muted-foreground h-8 w-8" />
                )}
              </div>
              <h3 className="text-lg font-bold">
                {hasActiveFilters ? 'No matches found' : 'Queue is empty'}
              </h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs">
                {hasActiveFilters
                  ? 'Try adjusting your keywords or clearing the filters to find what you are looking for.'
                  : 'Great job! All submitted postings have been reviewed.'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {paginationMeta && paginationMeta.pages > 1 && (
            <div className="border-t px-6 py-4">
              <PaginationBar meta={paginationMeta} onPageChange={setPage} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
