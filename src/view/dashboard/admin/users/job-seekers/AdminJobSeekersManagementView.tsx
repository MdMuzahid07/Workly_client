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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  FileText,
  Filter,
  Github,
  Globe,
  Linkedin,
  Loader2,
  MapPin,
  MoreVertical,
  Search,
  Trash2,
  TrendingUp,
  UserX,
  Users,
  LockOpen,
} from 'lucide-react';
import DeleteConfirmationModal from '@/components/shared/DeleteConfirmationModal';
import { downloadAdminJobSeekerResume } from '@/lib/pdfSource';
import debounce from 'debounce';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import DashboardAdminJobSeekersHeader from '../../../../../components/dashboard/dashboard-nav/header/DashboardAdminJobSeekersHeader';
import type { AdminJobSeekerRow, AdminJobSeekerStatus } from '@/types/adminJobSeekers';
import {
  useDeleteJobSeekerAdminMutation,
  useGetJobSeekerStatsQuery,
  useGetJobSeekersAdminQuery,
  useReactivateJobSeekerAdminMutation,
  useSuspendJobSeekerAdminMutation,
  useClearUserLockoutMutation,
} from '@/redux/feature/admin/adminApi';
import AdminUsersSkeleton from '@/skeleton/dashboard/admin/AdminUsersSkeleton';

const AdminJobSeekersManagementView = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<AdminJobSeekerStatus | null>(null);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<AdminJobSeekerRow | null>(null);
  const [downloadingResumeId, setDownloadingResumeId] = useState<string | null>(null);
  const limit = 20;

  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setPage(1);
      }, 300),
    [],
  );

  useEffect(() => {
    applyDebouncedSearch(searchValue);
    return () => applyDebouncedSearch.clear();
  }, [applyDebouncedSearch, searchValue]);

  const {
    data: statsEnvelope,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetJobSeekerStatsQuery();

  const {
    data: listEnvelope,
    isLoading: listLoading,
    isFetching,
    isError: listError,
    refetch,
  } = useGetJobSeekersAdminQuery({
    page,
    limit,
    q: debouncedSearch || undefined,
    status: selectedStatus,
  });

  const jobSeekers = useMemo(
    () => (Array.isArray(listEnvelope?.data) ? listEnvelope!.data : []),
    [listEnvelope],
  );

  const meta = (listEnvelope?.meta ?? null) as {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  } | null;
  const totalPage = meta?.totalPage ?? 1;

  const stats = useMemo(() => {
    const s = statsEnvelope?.data;
    return [
      {
        label: 'Total Job Seekers',
        value: s ? String(s.totalJobSeekers) : '—',
        icon: Users,
        color: 'text-blue-500',
      },
      {
        label: 'Active Resumes',
        value: s ? String(s.activeResumes) : '—',
        icon: FileText,
        color: 'text-emerald-500',
      },
      {
        label: 'Portfolios Shared',
        value: s ? String(s.portfoliosShared) : '—',
        icon: Globe,
        color: 'text-purple-500',
      },
      {
        label: 'High Match Rate',
        value: s ? `${s.highMatchRate}%` : '—',
        icon: TrendingUp,
        color: 'text-amber-500',
      },
    ];
  }, [statsEnvelope]);

  const statusOptions: AdminJobSeekerStatus[] = ['Hired', 'Looking', 'Active', 'Suspended'];

  const [suspend, { isLoading: suspending }] = useSuspendJobSeekerAdminMutation();
  const [reactivate, { isLoading: reactivating }] = useReactivateJobSeekerAdminMutation();
  const [remove, { isLoading: deleting }] = useDeleteJobSeekerAdminMutation();
  const [clearLockout] = useClearUserLockoutMutation();
  const busy = suspending || reactivating || deleting;

  const handleStatusToggle = async (jobSeeker: AdminJobSeekerRow) => {
    try {
      if (jobSeeker.status === 'Suspended') {
        await reactivate(jobSeeker.id).unwrap();
        toast.success(`${jobSeeker.name} has been reactivated`);
      } else {
        await suspend(jobSeeker.id).unwrap();
        toast.success(`${jobSeeker.name} has been suspended`);
      }
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        'Failed to update candidate status';
      toast.error(message);
    }
  };

  const handleClearLockout = async (userId: string) => {
    try {
      await clearLockout(userId).unwrap();
      toast.success('User lockout cleared successfully');
      refetch();
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message || 'Failed to clear user lockout';
      toast.error(message);
    }
  };

  const handleDownloadResume = async (jobSeeker: AdminJobSeekerRow) => {
    if (!jobSeeker.hasResume) {
      toast.error('No resume available for this candidate');
      return;
    }

    setDownloadingResumeId(jobSeeker.id);
    try {
      await downloadAdminJobSeekerResume(
        jobSeeker.id,
        `${jobSeeker.name.replace(/\s+/g, '-')}-resume.pdf`,
      );
      toast.success('Resume downloaded successfully');
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to download resume. Please try again.',
      );
    } finally {
      setDownloadingResumeId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await remove(deleteTarget.id).unwrap();
  };

  if (statsLoading || listLoading) {
    return <AdminUsersSkeleton />;
  }

  return (
    <div className="min-h-screen pt-16">
      <DashboardAdminJobSeekersHeader />

      <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-card rounded-xl border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-xs font-medium tracking-wider uppercase sm:text-sm">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold sm:text-3xl">{stat.value}</div>
                {statsError && (
                  <p className="text-destructive mt-2 text-xs font-medium">Unable to load stats.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by candidate name or email..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-muted/50 ring-offset-background focus-visible:ring-primary rounded-full border-none pl-10 focus-visible:ring-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary/20 flex items-center gap-2 rounded-full font-bold"
                >
                  <Filter className="h-4 w-4" />
                  {selectedStatus || 'Status Filters'}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedStatus(null);
                    setPage(1);
                  }}
                  className="cursor-pointer"
                >
                  All Status
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setPage(1);
                    }}
                    className="cursor-pointer"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchValue || selectedStatus) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchValue('');
                  setDebouncedSearch('');
                  setSelectedStatus(null);
                  setPage(1);
                }}
                className="text-muted-foreground hover:text-primary rounded-full font-bold"
              >
                Reset
              </Button>
            )}

            {(listError || statsError) && (
              <Button
                variant="ghost"
                onClick={() => refetch()}
                className="text-muted-foreground hover:text-primary rounded-full font-bold"
              >
                Retry
              </Button>
            )}
          </div>
        </div>

        {/* Job Seekers Table */}
        <Card className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Candidate</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Experience/Skill</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Socials</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobSeekers.map((js) => (
                  <TableRow key={js.id} className="group hover:bg-muted/40 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="ring-primary/5 group-hover:ring-primary/20 h-10 w-10 ring-2 transition-all">
                          <AvatarImage src={js.avatar} />
                          <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                            {js.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-bold">{js.name}</p>
                          <p className="text-muted-foreground truncate text-xs">{js.email}</p>
                          {js.lockedUntil && new Date(js.lockedUntil) > new Date() ? (
                            <span className="mt-0.5 block text-[10px] font-bold text-red-500">
                              Locked until {new Date(js.lockedUntil).toLocaleString()}
                            </span>
                          ) : js.failedLoginAttempts > 0 ? (
                            <span className="mt-0.5 block text-[10px] font-semibold text-amber-500">
                              {js.failedLoginAttempts} failed attempts
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <MapPin className="text-muted-foreground h-3 w-3" />
                        {js.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-semibold">{js.experience}</p>
                        <Badge
                          variant="outline"
                          className="border-primary/20 bg-primary/5 text-primary pointer-events-none mt-1 h-5 text-[10px]"
                        >
                          {js.primarySkill}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`font-bold ${
                          js.status === 'Hired'
                            ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                            : js.status === 'Looking'
                              ? 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                              : 'bg-muted text-muted-foreground'
                        }`}
                        variant="secondary"
                      >
                        {js.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {js.socials.github && (
                          <a
                            href={js.socials.github}
                            className="text-muted-foreground transition-colors hover:text-black"
                            title="GitHub"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {js.socials.linkedin && (
                          <a
                            href={js.socials.linkedin}
                            className="text-muted-foreground transition-colors hover:text-blue-600"
                            title="LinkedIn"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {js.socials.portfolio && (
                          <a
                            href={js.socials.portfolio}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title="Portfolio"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {downloadingResumeId === js.id ? (
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          disabled
                          aria-label="Downloading resume"
                        >
                          <Loader2 className="text-primary h-4 w-4 animate-spin" />
                        </Button>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              aria-label="Open actions menu"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild className="cursor-pointer">
                              <Link href={`/browse-candidates/${js.id}`} target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Full Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              disabled={!js.hasResume}
                              onClick={() => handleDownloadResume(js)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {((js.lockedUntil && new Date(js.lockedUntil) > new Date()) ||
                              js.failedLoginAttempts > 0) && (
                              <DropdownMenuItem
                                className="cursor-pointer font-bold text-emerald-600"
                                disabled={busy}
                                onClick={() => handleClearLockout(js.id)}
                              >
                                <LockOpen className="mr-2 h-4 w-4" />
                                Clear Lockout
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="cursor-pointer text-amber-600"
                              disabled={busy}
                              onClick={() => handleStatusToggle(js)}
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              {js.status === 'Suspended' ? 'Reactivate User' : 'Suspend User'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive cursor-pointer"
                              disabled={busy}
                              onClick={() => setDeleteTarget(js)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Profile
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {!listLoading && !isFetching && jobSeekers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                <AlertTriangle className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">No candidates found</h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs">
                Try searching for a different name, skill, or email address.
              </p>
            </div>
          )}
        </Card>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Page {page} of {totalPage}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              disabled={page >= totalPage}
              onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete candidate profile?"
        description="This will permanently remove the candidate from the platform and deactivate their account. This action cannot be undone."
        itemName={deleteTarget?.name}
      />
    </div>
  );
};

export default AdminJobSeekersManagementView;
