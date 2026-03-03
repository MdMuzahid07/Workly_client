"use client";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  UserPlus,
  UserX,
} from "lucide-react";
import { useState } from "react";
import DashboardAdminAdministratorsHeader from "../../components/dashboard/dashboard-nav/header/DashboardAdminAdministratorsHeader";

const AdminAdministratorsManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Mock roles aligned with UserRole enum
  const roleOptions = [
    { value: "ADMIN", label: "System Admin" },
    { value: "SUPER_ADMIN", label: "Super Administrator" },
  ];

  // Mock data for admins
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [admins, setAdmins] = useState([
    {
      id: "1",
      name: "Master Controller",
      avatar: "",
      email: "super@workly.com",
      role: "SUPER_ADMIN",
      status: "Active",
      lastLogin: "2 mins ago",
    },
    {
      id: "2",
      name: "Staff Manager",
      avatar: "",
      email: "staff@workly.com",
      role: "ADMIN",
      status: "Active",
      lastLogin: "1 hour ago",
    },
  ]);

  // Mock audit logs mirroring AuditLog model
  const auditLogs = [
    {
      id: "1",
      action: "UPDATE_ROLE",
      entityType: "User",
      target: "John Editor",
      actor: "Super Admin",
      createdAt: "2024-03-03 14:20",
    },
    {
      id: "2",
      action: "DEACTIVATE",
      entityType: "User",
      target: "Sarah Mod",
      actor: "Super Admin",
      createdAt: "2024-03-03 12:45",
    },
    {
      id: "3",
      action: "LOGIN",
      entityType: "User",
      target: "Master Controller",
      actor: "System",
      createdAt: "2024-03-03 15:10",
    },
  ];

  const stats = [
    {
      label: "Total Admins",
      value: "8",
      icon: ShieldCheck,
      color: "text-primary",
    },
    {
      label: "Active Now",
      value: "3",
      icon: Activity,
      color: "text-emerald-500",
    },
    {
      label: "Audit Events",
      value: "142",
      icon: History,
      color: "text-blue-500",
    },
    {
      label: "Risk Items",
      value: "0",
      icon: ShieldAlert,
      color: "text-amber-500",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAddAdminSubmit = (data: any) => {
    console.log("Adding new admin:", data);
    // In real app, this would be an API call
    setIsAddAdminOpen(false);
  };

  const filteredAdmins = admins.filter(
    (adm) =>
      (adm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adm.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedRole || adm.role === selectedRole),
  );

  return (
    <div className="min-h-screen pt-16">
      <DashboardAdminAdministratorsHeader
        onAddAdminClick={() => setIsAddAdminOpen(true)}
      />

      <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
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
                <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search & Main Table */}
        <div className="space-y-4">
          <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
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

          <Card className="overflow-hidden rounded-xl border">
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
                {filteredAdmins.map((adm) => (
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
                        {adm.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      <div className="text-muted-foreground flex items-center gap-1.5">
                        <History className="h-3 w-3" />
                        {adm.lastLogin}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="border-none bg-emerald-500/10 font-bold text-emerald-600 hover:bg-emerald-500/20"
                        variant="outline"
                      >
                        {adm.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
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
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <UserX className="mr-2 h-4 w-4" /> Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
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
          <Card className="rounded-xl border">
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
                {auditLogs.map((log) => (
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
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right">
                      {log.createdAt}
                    </TableCell>
                  </TableRow>
                ))}
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
                  onClick={() => setIsAddAdminOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="px-8 font-bold">
                  Create Account
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
