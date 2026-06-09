"use client";

import DashboardAdminAdministratorsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminAdministratorsHeader";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKSelect from "@/components/form/WkSelect";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCreateStaffMutation,
  useGetAuditLogsQuery,
  useGetStaffListQuery,
  useGetStaffStatsQuery,
  useLazyGetAuditLogsQuery,
  useSetStaffStatusMutation,
} from "@/redux/feature/admin/adminApi";
import { useAppSelector } from "@/redux/hooks";
import AdminUsersSkeleton from "@/skeleton/dashboard/admin/AdminUsersSkeleton";
import type {
  AdminAuditLogRow,
  AdminStaffRole,
  AdminStaffRow,
  AdminStaffStats,
} from "@/types/adminStaff";
import { format } from "date-fns";
import debounce from "debounce";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Eye,
  Filter,
  History,
  Key,
  Loader2,
  MoreVertical,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  meta?: unknown;
};

const unwrapApiData = <T,>(
  payload: ApiEnvelope<T> | T | undefined,
): T | undefined => {
  if (!payload || typeof payload !== "object") return undefined;
  if ("data" in payload && "success" in payload) {
    return (payload as ApiEnvelope<T>).data;
  }
  return payload as T;
};

const ROLE_PERMISSIONS: Record<AdminStaffRole, string[]> = {
  ADMIN: [
    "Manage employers, job seekers, jobs, and categories",
    "Review moderation queues and reported content",
    "View system audit logs and update portal settings",
    "Create other Admin accounts",
    "Cannot create or manage Super Administrators",
  ],
  SUPER_ADMIN: [
    "Full platform administration access",
    "Create and manage Admin and Super Admin accounts",
    "Activate or deactivate any staff member",
    "Access financial, legal, and system configuration areas",
    "View and export complete audit history",
  ],
};

const downloadCsv = (
  filename: string,
  rows: Record<string, string>[],
): void => {
  if (rows.length === 0) return;

  const headers = Object.keys(rows[0]);
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h] ?? "")).join(",")),
  ];

  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
};

const AdminAdministratorsManagementView = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminStaffRole | null>(null);
  const [page, setPage] = useState(1);
  const [auditPage, setAuditPage] = useState(1);
  const [auditStaffFilter, setAuditStaffFilter] =
    useState<AdminStaffRow | null>(null);
  const [permissionsTarget, setPermissionsTarget] =
    useState<AdminStaffRow | null>(null);
  const [statusTarget, setStatusTarget] = useState<AdminStaffRow | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const auditSectionRef = useRef<HTMLDivElement>(null);
  const currentUser = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [authReady, setAuthReady] = useState(false);
  const limit = 10;
  const auditLimit = 8;

  useEffect(() => {
    const token =
      accessToken ||
      (typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null);
    setAuthReady(Boolean(token));
  }, [accessToken]);

  const skipQueries = !authReady;

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
    data: statsData,
    isLoading: isStatsLoading,
    isError: isStatsError,
    refetch: refetchStats,
  } = useGetStaffStatsQuery(undefined, { skip: skipQueries });
  const {
    data: staffData,
    isLoading: isStaffLoading,
    isFetching: isStaffFetching,
    isError: isStaffError,
    refetch: refetchStaff,
  } = useGetStaffListQuery(
    {
      page,
      limit,
      q: debouncedSearch || undefined,
      role: selectedRole,
    },
    { skip: skipQueries },
  );
  const {
    data: auditData,
    isLoading: isAuditLoading,
    isFetching: isAuditFetching,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isAuditError,
    refetch: refetchAudit,
  } = useGetAuditLogsQuery(
    {
      page: auditPage,
      limit: auditLimit,
      staffId: auditStaffFilter?.id,
    },
    { skip: skipQueries },
  );

  const [fetchAuditLogs] = useLazyGetAuditLogsQuery();
  const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation();
  const [setStaffStatus, { isLoading: isUpdatingStatus }] =
    useSetStaffStatusMutation();

  const roleOptions = useMemo(() => {
    const options = [
      { value: "ADMIN", label: "System Admin" },
      { value: "SUPER_ADMIN", label: "Super Administrator" },
    ];

    if (currentUser?.role === "ADMIN") {
      return options.filter((option) => option.value === "ADMIN");
    }

    return options;
  }, [currentUser]);

  const stats = useMemo(() => {
    const s = unwrapApiData<AdminStaffStats>(statsData);
    return [
      {
        label: "Total Admins",
        value: s?.totalAdmins ?? "0",
        icon: ShieldCheck,
        color: "text-primary",
      },
      {
        label: "Active Now",
        value: s?.activeNow ?? "0",
        icon: Activity,
        color: "text-emerald-500",
      },
      {
        label: "Audit Events",
        value: s?.totalAuditLogs ?? "0",
        icon: History,
        color: "text-blue-500",
      },
      {
        label: "Risk Items",
        value: s?.riskItems ?? "0",
        icon: ShieldAlert,
        color: "text-amber-500",
      },
    ];
  }, [statsData]);

  const staffMembers = useMemo(() => {
    const rows = unwrapApiData<AdminStaffRow[]>(staffData);
    return Array.isArray(rows) ? rows : [];
  }, [staffData]);

  const staffMeta = ((staffData as ApiEnvelope<AdminStaffRow[]> | undefined)
    ?.meta ?? null) as {
    page?: number;
    totalPage?: number;
  } | null;
  const staffTotalPage = staffMeta?.totalPage ?? 1;

  const auditLogs = useMemo(() => {
    const rows = unwrapApiData<AdminAuditLogRow[]>(auditData);
    return Array.isArray(rows) ? rows : [];
  }, [auditData]);

  const auditMeta = ((auditData as ApiEnvelope<AdminAuditLogRow[]> | undefined)
    ?.meta ?? null) as {
    page?: number;
    totalPage?: number;
    total?: number;
  } | null;
  const auditTotalPage = auditMeta?.totalPage ?? 1;

  const canManageStaff = (staff: AdminStaffRow) => {
    if (staff.id === currentUser?.id) return false;
    if (currentUser?.role === "ADMIN" && staff.role === "SUPER_ADMIN") {
      return false;
    }
    return true;
  };

  const onAddAdminSubmit = async (data: {
    fullName: string;
    email: string;
    role: AdminStaffRole;
    phone?: string;
  }) => {
    try {
      await createStaff(data).unwrap();
      toast.success("Administrator created successfully");
      setIsAddAdminOpen(false);
    } catch (error: unknown) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to create administrator",
      );
    }
  };

  const handleConfirmStatusChange = async () => {
    if (!statusTarget) return;

    const isActive = statusTarget.status === "Inactive";
    try {
      await setStaffStatus({ userId: statusTarget.id, isActive }).unwrap();
      toast.success(
        `Administrator ${isActive ? "activated" : "deactivated"} successfully`,
      );
      setStatusTarget(null);
    } catch (error: unknown) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to update status",
      );
    }
  };

  const handleViewAuditLogs = (staff: AdminStaffRow) => {
    setAuditStaffFilter(staff);
    setAuditPage(1);
    auditSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleExportLogs = async () => {
    setIsExporting(true);
    try {
      const exportLimit = 100;
      const allLogs: typeof auditLogs = [];
      let pageToFetch = 1;
      let totalPages = 1;

      do {
        const result = await fetchAuditLogs({
          page: pageToFetch,
          limit: exportLimit,
          staffId: auditStaffFilter?.id,
        }).unwrap();

        const pageLogs = unwrapApiData<AdminAuditLogRow[]>(result) ?? [];
        allLogs.push(...pageLogs);

        const meta = (result as ApiEnvelope<AdminAuditLogRow[]> | undefined)
          ?.meta as { totalPage?: number } | undefined;
        totalPages = meta?.totalPage ?? 1;
        pageToFetch += 1;
      } while (pageToFetch <= totalPages && allLogs.length < 500);

      if (allLogs.length === 0) {
        toast.info("No audit logs available to export yet.");
        return;
      }

      const rows = allLogs.map((log) => ({
        Action: log.action,
        Entity: log.entityType,
        Target: log.target,
        Actor: log.actor,
        Role: log.actorRole,
        Timestamp: format(new Date(log.createdAt), "yyyy-MM-dd HH:mm:ss"),
      }));

      downloadCsv(
        `workly-audit-logs-${format(new Date(), "yyyy-MM-dd")}.csv`,
        rows,
      );
      toast.success(
        `Exported ${rows.length} audit log${rows.length === 1 ? "" : "s"}`,
      );
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to export audit logs";
      toast.error(message);
    } finally {
      setIsExporting(false);
    }
  };

  if (!authReady || (isStatsLoading && isStaffLoading)) {
    return <AdminUsersSkeleton showAuditLogs={true} />;
  }

  const handleRetry = () => {
    void refetchStats();
    void refetchStaff();
    void refetchAudit();
  };

  return (
    <div className="min-h-screen pt-16">
      <DashboardAdminAdministratorsHeader
        onAddAdminClick={() => setIsAddAdminOpen(true)}
        onExportClick={handleExportLogs}
        isExporting={isExporting}
      />

      <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-card rounded-xl border shadow-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(isStatsError || isStaffError) && (
          <div className="border-destructive/30 bg-destructive/5 flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-destructive text-sm font-medium">
              Unable to load administrator data. Please sign in again or retry.
            </p>
            <Button
              variant="outline"
              className="rounded-full font-bold"
              onClick={handleRetry}
            >
              Retry
            </Button>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 shadow-none sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search staff..."
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
                    {selectedRole
                      ? roleOptions.find((role) => role.value === selectedRole)
                          ?.label
                      : "Role Filters"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedRole(null);
                      setPage(1);
                    }}
                    className="cursor-pointer"
                  >
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {roleOptions.map((role) => (
                    <DropdownMenuItem
                      key={role.value}
                      onClick={() => {
                        setSelectedRole(role.value as AdminStaffRole);
                        setPage(1);
                      }}
                      className="cursor-pointer"
                    >
                      {role.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {(searchValue || selectedRole) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchValue("");
                    setDebouncedSearch("");
                    setSelectedRole(null);
                    setPage(1);
                  }}
                  className="text-muted-foreground hover:text-primary rounded-full font-bold"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          <Card className="overflow-hidden rounded-xl border shadow-none">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>System Role</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody
                  className={
                    isStaffFetching && !isStaffLoading
                      ? "opacity-60 transition-opacity"
                      : undefined
                  }
                >
                  {isStaffLoading && staffMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <Loader2 className="text-primary mx-auto h-5 w-5 animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : staffMembers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-muted-foreground h-32 text-center"
                      >
                        No staff members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    staffMembers.map((adm) => (
                      <TableRow
                        key={adm.id}
                        className="group hover:bg-muted/40 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="border-primary/5 h-10 w-10 border-2">
                              <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                {adm.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate font-bold">{adm.name}</p>
                              <p className="text-muted-foreground truncate text-xs">
                                {adm.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-primary/20 bg-primary/5 text-primary font-bold"
                          >
                            {adm.role.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          <div className="text-muted-foreground flex items-center gap-1.5">
                            <History className="h-3 w-3" />
                            {adm.lastLogin
                              ? format(new Date(adm.lastLogin), "MMM d, h:mm a")
                              : "Never"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`border-none font-bold ${
                              adm.status === "Active"
                                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                                : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                            }`}
                            variant="outline"
                          >
                            {adm.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                disabled={isUpdatingStatus}
                                aria-label="Open staff actions"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setPermissionsTarget(adm)}
                              >
                                <Key className="mr-2 h-4 w-4" /> Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleViewAuditLogs(adm)}
                              >
                                <Eye className="mr-2 h-4 w-4" /> Audit Logs
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className={`cursor-pointer ${
                                  adm.status === "Active"
                                    ? "text-destructive"
                                    : "text-emerald-600"
                                }`}
                                disabled={!canManageStaff(adm)}
                                onClick={() => setStatusTarget(adm)}
                              >
                                {adm.status === "Active" ? (
                                  <>
                                    <UserX className="mr-2 h-4 w-4" />{" "}
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="mr-2 h-4 w-4" />{" "}
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Page {page} of {staffTotalPage}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Prev
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                disabled={page >= staffTotalPage}
                onClick={() =>
                  setPage((current) => Math.min(staffTotalPage, current + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        <div ref={auditSectionRef} className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <History className="text-primary h-5 w-5" />
              <h3 className="text-lg font-bold">System Audit Logs</h3>
              {auditStaffFilter && (
                <Badge variant="secondary" className="font-medium">
                  Filtered: {auditStaffFilter.name}
                </Badge>
              )}
            </div>
            {auditStaffFilter && (
              <Button
                variant="ghost"
                className="rounded-full font-bold"
                onClick={() => {
                  setAuditStaffFilter(null);
                  setAuditPage(1);
                }}
              >
                Clear filter
              </Button>
            )}
          </div>

          <Card className="rounded-xl border shadow-none">
            <Table>
              <TableHeader className="bg-muted/30 text-[11px] tracking-wider uppercase">
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody
                className={
                  isAuditFetching && !isAuditLoading
                    ? "opacity-60 transition-opacity"
                    : undefined
                }
              >
                {isAuditLoading && auditLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Loader2 className="text-primary mx-auto h-5 w-5 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : auditLogs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-muted-foreground h-24 text-center"
                    >
                      No audit logs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  auditLogs.map((log) => (
                    <TableRow key={log.id} className="text-xs">
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-muted/50 text-[10px] font-bold"
                        >
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium">
                        {log.entityType}
                      </TableCell>
                      <TableCell className="max-w-[220px] truncate font-bold">
                        {log.target}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {log.actor}
                        <span className="ml-1 text-[10px] opacity-70">
                          ({log.actorRole})
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-right">
                        {format(new Date(log.createdAt), "yyyy-MM-dd HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Page {auditPage} of {auditTotalPage}
              {auditMeta?.total != null ? ` · ${auditMeta.total} events` : ""}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                disabled={auditPage <= 1}
                onClick={() =>
                  setAuditPage((current) => Math.max(1, current - 1))
                }
              >
                Prev
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                disabled={auditPage >= auditTotalPage}
                onClick={() =>
                  setAuditPage((current) =>
                    Math.min(auditTotalPage, current + 1),
                  )
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={Boolean(permissionsTarget)}
        onOpenChange={(open) => {
          if (!open) setPermissionsTarget(null);
        }}
      >
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="text-primary h-5 w-5" />
              Role Permissions
            </DialogTitle>
            <DialogDescription>
              Access scope for{" "}
              <span className="text-foreground font-semibold">
                {permissionsTarget?.name}
              </span>{" "}
              as{" "}
              <span className="text-foreground font-semibold">
                {permissionsTarget?.role.replace("_", " ")}
              </span>
              .
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3 py-2">
            {permissionsTarget &&
              ROLE_PERMISSIONS[permissionsTarget.role].map((permission) => (
                <li key={permission} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>{permission}</span>
                </li>
              ))}
          </ul>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(statusTarget)}
        onOpenChange={(open) => {
          if (!open) setStatusTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {statusTarget?.status === "Active"
                ? "Deactivate administrator?"
                : "Activate administrator?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {statusTarget?.status === "Active" ? (
                <>
                  This will revoke platform access for{" "}
                  <span className="text-foreground font-semibold">
                    {statusTarget?.name}
                  </span>{" "}
                  until reactivated.
                </>
              ) : (
                <>
                  This will restore platform access for{" "}
                  <span className="text-foreground font-semibold">
                    {statusTarget?.name}
                  </span>
                  .
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatingStatus}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isUpdatingStatus}
              onClick={(event) => {
                event.preventDefault();
                void handleConfirmStatusChange();
              }}
              className={
                statusTarget?.status === "Active"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : undefined
              }
            >
              {isUpdatingStatus ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : statusTarget?.status === "Active" ? (
                "Deactivate"
              ) : (
                "Activate"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="text-primary h-5 w-5" />
              Add System Administrator
            </DialogTitle>
            <DialogDescription>
              Create a new administrative account. System roles define access
              levels across the platform.
            </DialogDescription>
          </DialogHeader>

          <WkForm onSubmit={onAddAdminSubmit}>
            <div className="space-y-4 py-4">
              <WKInput
                name="fullName"
                label="Full Name"
                placeholder="e.g. Elena Fisher"
                required
              />
              <WKInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="staff@workly.com"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <WKSelect
                  name="role"
                  label="System Role"
                  options={roleOptions}
                  required
                />
                <WKInput
                  name="phone"
                  label="Phone (Optional)"
                  placeholder="+1..."
                />
              </div>

              <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <p className="text-xs leading-relaxed text-amber-800 italic">
                    Note: A secure magic link will be sent to the{" "}
                    {`administrator's`} email for password setup.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isCreating}
                  onClick={() => setIsAddAdminOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-8 font-bold"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </div>
          </WkForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdministratorsManagementView;
