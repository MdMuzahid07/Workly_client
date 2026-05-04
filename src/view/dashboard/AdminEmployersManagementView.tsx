"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteEmployerAdminMutation,
  useGetEmployerStatsQuery,
  useGetEmployersAdminQuery,
  useReactivateEmployerAdminMutation,
  useSuspendEmployerAdminMutation,
  useVerifyCompanyAdminMutation,
} from "@/redux/feature/admin/adminApi";
import type { AdminEmployerStatus } from "@/types/adminEmployers";
import {
  AlertTriangle,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Filter,
  MoreVertical,
  Search,
  ShieldCheck,
  Trash2,
  UserX,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import DashboardAdminEmployersHeader from "../../components/dashboard/dashboard-nav/header/DashboardAdminEmployersHeader";

const AdminEmployersManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<AdminEmployerStatus | null>(null);

  const [page, setPage] = useState(1);
  const limit = 20;

  const {
    data: statsEnvelope,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetEmployerStatsQuery();

  const {
    data: listEnvelope,
    isLoading: listLoading,
    isFetching,
    isError: listError,
    refetch,
  } = useGetEmployersAdminQuery({
    page,
    limit,
    q: searchTerm || undefined,
    status: selectedStatus,
  });

  const employers = useMemo(
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
        label: "Total Employers",
        value: s ? String(s.totalEmployers) : "—",
        icon: Building2,
        color: "text-blue-500",
      },
      {
        label: "Verified Companies",
        value: s ? String(s.verifiedCompanies) : "—",
        icon: CheckCircle2,
        color: "text-emerald-500",
      },
      {
        label: "Pending Verification",
        value: s ? String(s.pendingVerification) : "—",
        icon: ShieldCheck,
        color: "text-amber-500",
      },
      {
        label: "Active Jobs",
        value: s ? String(s.activeJobs) : "—",
        icon: Briefcase,
        color: "text-purple-500",
      },
    ];
  }, [statsEnvelope]);

  const statusOptions: AdminEmployerStatus[] = [
    "Verified",
    "Pending",
    "Suspended",
  ];

  const [verifyCompany, { isLoading: verifying }] =
    useVerifyCompanyAdminMutation();
  const [suspendEmployer, { isLoading: suspending }] =
    useSuspendEmployerAdminMutation();
  const [reactivateEmployer, { isLoading: reactivating }] =
    useReactivateEmployerAdminMutation();
  const [deleteEmployer, { isLoading: deleting }] =
    useDeleteEmployerAdminMutation();

  const busy = verifying || suspending || reactivating || deleting;

  return (
    <div className="min-h-screen pt-16">
      <DashboardAdminEmployersHeader />

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
                <div className="text-2xl font-bold sm:text-3xl">
                  {statsLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    stat.value
                  )}
                </div>
                {statsError && (
                  <p className="text-destructive mt-2 text-xs font-medium">
                    Unable to load stats.
                  </p>
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
              placeholder="Search by company name or owner email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  {selectedStatus || "Status Filters"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setSelectedStatus(null)}
                  className="cursor-pointer"
                >
                  All Status
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className="cursor-pointer"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchTerm || selectedStatus) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
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

        {/* Employers Table */}
        <Card className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Company</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Active Jobs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(listLoading || isFetching) &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={`sk-${i}`}>
                      <TableCell colSpan={6}>
                        <div className="flex items-center gap-3 py-2">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-56" />
                            <Skeleton className="h-3 w-40" />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                {employers.map((emp) => (
                  <TableRow
                    key={emp.id}
                    className="group hover:bg-muted/40 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="ring-primary/5 group-hover:ring-primary/20 h-10 w-10 ring-2 transition-all">
                          <AvatarImage src={emp.logo} />
                          <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                            {emp.companyName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-bold">
                            {emp.companyName}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {emp.industry}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{emp.ownerName}</p>
                        <p className="text-muted-foreground truncate text-xs">
                          {emp.ownerEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary font-bold"
                      >
                        {emp.activeJobs} Jobs
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`font-bold ${
                          emp.status === "Verified"
                            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                            : emp.status === "Pending"
                              ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                              : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                        }`}
                        variant="secondary"
                      >
                        {emp.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm font-medium">
                      {new Date(emp.joinedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild className="cursor-pointer">
                            <Link
                              href={`/companies/${emp.slug}`}
                              target="_blank"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Briefcase className="mr-2 h-4 w-4" />
                            Manage Jobs
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {emp.status !== "Verified" && (
                            <DropdownMenuItem
                              className="cursor-pointer text-emerald-600"
                              disabled={busy}
                              onClick={() => verifyCompany(emp.id)}
                            >
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Verify Account
                            </DropdownMenuItem>
                          )}
                          {emp.status !== "Suspended" ? (
                            <DropdownMenuItem
                              className="cursor-pointer text-amber-600"
                              disabled={busy || !emp.ownerId}
                              onClick={() =>
                                emp.ownerId
                                  ? suspendEmployer(emp.ownerId)
                                  : undefined
                              }
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Suspend Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="cursor-pointer text-emerald-600"
                              disabled={busy || !emp.ownerId}
                              onClick={() =>
                                emp.ownerId
                                  ? reactivateEmployer(emp.ownerId)
                                  : undefined
                              }
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Reactivate Account
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-destructive cursor-pointer"
                            disabled={busy || !emp.ownerId}
                            onClick={() =>
                              emp.ownerId
                                ? deleteEmployer(emp.ownerId)
                                : undefined
                            }
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {!listLoading && !isFetching && employers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                <AlertTriangle className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">No employers found</h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs">
                We {`couldn't`} find any company matching your search criteria.
                Try a different term.
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
    </div>
  );
};

export default AdminEmployersManagementView;
