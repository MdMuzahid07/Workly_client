"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  STAFF_ROLE_DEFINITIONS,
  STAFF_ROLE_OPTIONS,
} from "@/constants/adminStaffPermissions";
import type { AdminStaffRole, AdminStaffRow } from "@/types/adminStaff";
import {
  CheckCircle2,
  Info,
  Key,
  Loader2,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type AdminStaffPermissionsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: AdminStaffRow | null;
  currentUserId?: string;
  currentUserRole?: string;
  onSaveRole: (userId: string, role: AdminStaffRole) => Promise<void>;
  isSaving?: boolean;
};

const AdminStaffPermissionsDialog = ({
  open,
  onOpenChange,
  staff,
  currentUserId,
  currentUserRole,
  onSaveRole,
  isSaving = false,
}: AdminStaffPermissionsDialogProps) => {
  const [draftRole, setDraftRole] = useState<AdminStaffRole>("ADMIN");

  useEffect(() => {
    if (staff) {
      setDraftRole(staff.role);
    }
  }, [staff]);

  const canEditRole =
    currentUserRole === "SUPER_ADMIN" &&
    staff != null &&
    staff.id !== currentUserId;

  const roleDefinition = STAFF_ROLE_DEFINITIONS[draftRole];
  const hasChanges = staff != null && draftRole !== staff.role;

  const roleOptions = useMemo(() => {
    if (currentUserRole === "SUPER_ADMIN") {
      return STAFF_ROLE_OPTIONS;
    }
    return STAFF_ROLE_OPTIONS.filter((option) => option.value === "ADMIN");
  }, [currentUserRole]);

  const handleSave = async () => {
    if (!staff || !hasChanges) return;
    await onSaveRole(staff.id, draftRole);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px]">
        <DialogHeader className="space-y-1 px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Key className="text-primary h-5 w-5" />
            Role Permissions
          </DialogTitle>
          <DialogDescription>
            Review access scope and update the system role when permitted.
          </DialogDescription>
        </DialogHeader>

        {staff && (
          <>
            <div className="px-6 pb-4">
              <div className="bg-muted/40 flex items-center gap-3 rounded-xl border p-3">
                <Avatar className="border-primary/10 h-11 w-11 border-2">
                  <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                    {staff.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{staff.name}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {staff.email}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <Badge
                    variant="outline"
                    className="border-primary/20 bg-primary/5 text-primary font-semibold"
                  >
                    {STAFF_ROLE_DEFINITIONS[staff.role].label}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      staff.status === "Active"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }
                  >
                    {staff.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-6 pb-4">
              {canEditRole ? (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">System role</Label>
                  <RadioGroup
                    value={draftRole}
                    onValueChange={(value) =>
                      setDraftRole(value as AdminStaffRole)
                    }
                    className="grid gap-3"
                  >
                    {roleOptions.map((option) => (
                      <label
                        key={option.value}
                        htmlFor={`staff-role-${option.value}`}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                          draftRole === option.value
                            ? "border-primary bg-primary/5 ring-primary/20 ring-1"
                            : "hover:bg-muted/40"
                        }`}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`staff-role-${option.value}`}
                          className="mt-0.5"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="text-primary h-4 w-4 shrink-0" />
                            <span className="text-sm font-semibold">
                              {option.label}
                            </span>
                          </div>
                          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <div className="flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 p-3 text-blue-900">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-xs leading-relaxed">
                    {staff.id === currentUserId
                      ? "You cannot change your own role. Ask another Super Administrator if an update is required."
                      : "View only. Only Super Administrators can change staff roles."}
                  </p>
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">Access granted</p>
                  <p className="text-muted-foreground text-xs">
                    Permissions included with{" "}
                    <span className="text-foreground font-medium">
                      {roleDefinition.label}
                    </span>
                  </p>
                </div>
                <ul className="space-y-2">
                  {roleDefinition.granted.map((permission) => (
                    <li
                      key={permission}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {roleDefinition.restricted.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Restrictions</p>
                  <ul className="space-y-2">
                    {roleDefinition.restricted.map((restriction) => (
                      <li
                        key={restriction}
                        className="flex items-start gap-2 text-sm"
                      >
                        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <span className="text-muted-foreground">
                          {restriction}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <DialogFooter className="bg-muted/20 gap-2 border-t px-6 py-4 sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                className="rounded-full"
                disabled={isSaving}
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
              {canEditRole && (
                <Button
                  type="button"
                  className="rounded-full px-6 font-semibold"
                  disabled={!hasChanges || isSaving}
                  onClick={() => void handleSave()}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save role"
                  )}
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminStaffPermissionsDialog;
