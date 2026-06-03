/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardAdminAdministratorsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminAdministratorsHeader";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKSelect from "@/components/form/WkSelect";
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
import AdminUsersSkeleton from "@/skeleton/dashboard/admin/AdminUsersSkeleton";
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
  useSetStaffStatusMutation,
} from "@/redux/feature/admin/adminApi";
import { format } from "date-fns";
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  Eye,
  Filter,
  History,
  Key,
  MoreVertical,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { useAppSelector } from "@/redux/hooks";

const AdminAdministratorsManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const currentUser = useAppSelector((state) => state.auth.user);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auditPage, setAuditPage] = useState(1);
  const limit = 10;

  // API Hooks
  const { data: statsData, isLoading: isStatsLoading } =
    useGetStaffStatsQuery();
  const { data: staffData, isLoading: isStaffLoading } = useGetStaffListQuery({
    page,
    limit,
    q: searchTerm || undefined,
    role: selectedRole || undefined,
  });
  const { data: auditData, isLoading: isAuditLoading } = useGetAuditLogsQuery({
    page: auditPage,
    limit: 5,
  });

  const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation();
  const [setStaffStatus, { isLoading: isUpdatingStatus }] =
    useSetStaffStatusMutation();

  const roleOptions = useMemo(() => {
    const options = [
      { value: "ADMIN", label: "System Admin" },
      { value: "SUPER_ADMIN", label: "Super Administrator" },
    ];

    if (currentUser?.role === "ADMIN") {
      return options.filter((o) => o.value === "ADMIN");
    }

    return options;
  }, [currentUser]);

  const stats = useMemo(() => {
    const s = statsData?.data;
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

  if (isStaffLoading || isStatsLoading || isAuditLoading) {
    return <AdminUsersSkeleton showAuditLogs={true} />;
  }

  const onAddAdminSubmit = async (data: any) => {
    try {
      await createStaff(data).unwrap();
      toast.success("Administrator created successfully");
      setIsAddAdminOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create administrator");
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const isActive = currentStatus === "Inactive";
    try {
      await setStaffStatus({ userId, isActive }).unwrap();
      toast.success(
        `Administrator ${isActive ? "activated" : "deactivated"} successfully`,
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const staffMembers = staffData?.data || [];
  const auditLogs = auditData?.data || [];

  return (
    <div className="min-h-screen pt-16">
      <DashboardAdminAdministratorsHeader
        onAddAdminClick={() => setIsAddAdminOpen(true)}
      />

      <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats Grid */}
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

        {/* Search & Main Table */}
        <div className="space-y-4">
          <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 shadow-none sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search staff..."
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
                    {selectedRole
                      ? roleOptions.find((r) => r.value === selectedRole)?.label
                      : "Role Filters"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setSelectedRole(null)}
                    className="cursor-pointer"
                  >
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {roleOptions.map((role) => (
                    <DropdownMenuItem
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      className="cursor-pointer"
                    >
                      {role.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {(searchTerm || selectedRole) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedRole(null);
                  }}
                  className="text-muted-foreground hover:text-primary rounded-full font-bold"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          <Card className="overflow-hidden rounded-xl border shadow-none">
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
              <TableBody>
                {staffMembers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-muted-foreground h-32 text-center"
                    >
                      No staff members found.
                    </TableCell>
                  </TableRow>
                ) : (
                  staffMembers.map((adm: any) => (
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
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="cursor-pointer">
                              <Key className="mr-2 h-4 w-4" /> Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" /> Audit Logs
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className={`cursor-pointer ${adm.status === "Active" ? "text-destructive" : "text-emerald-600"}`}
                              onClick={() =>
                                handleToggleStatus(adm.id, adm.status)
                              }
                            >
                              {adm.status === "Active" ? (
                                <>
                                  <UserX className="mr-2 h-4 w-4" /> Deactivate
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
          </Card>
        </div>

        {/* Audit Log Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <History className="text-primary h-5 w-5" />
            <h3 className="text-lg font-bold">System Audit Logs</h3>
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
              <TableBody>
                {auditLogs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-muted-foreground h-24 text-center"
                    >
                      No audit logs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  auditLogs.map((log: any) => (
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
                      <TableCell className="font-bold">{log.target}</TableCell>
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
        </div>
      </div>

      {/* Add Admin Dialog */}
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
