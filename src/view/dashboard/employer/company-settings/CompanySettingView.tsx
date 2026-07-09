/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useLogoutUserMutation,
  useDeleteMeMutation,
} from "@/redux/feature/auth/authApi";
import { logout } from "@/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  BellRing,
  ChevronRight,
  Eye,
  Globe,
  Lock,
  LogOut,
  Mail,
  ShieldCheck,
  Smartphone,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCompanySettingsHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardCompanySettingsHeader";
import {
  useGetMyCompanyQuery,
  useUpdateCompanySettingsMutation,
} from "../../../../redux/feature/company/companyApi";
import CompanyPersonalInformationView from "../company-personal-information/CompanyPersonalInformationView";
import CompanySecurityView from "../company-security/CompanySecurityView";
import { toast } from "sonner";

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled?: boolean;
}

const notificationSettingsSeed: SettingItem[] = [
  {
    id: "emailNotifications",
    label: "Email Notifications",
    description: "Receive updates and alerts via email",
    icon: <Mail className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "applicationAlerts",
    label: "Application Alerts",
    description: "Get notified when new candidates apply",
    icon: <Zap className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "jobExpiryReminders",
    label: "Job Expiry Reminders",
    description: "Notifications before your job posts expire",
    icon: <Smartphone className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "weeklyReports",
    label: "Weekly Reports",
    description: "Receive a summary of hiring activity",
    icon: <BellRing className="h-5 w-5" />,
    enabled: false,
  },
];

const privacySettingsSeed: SettingItem[] = [
  {
    id: "profileVisibility",
    label: "Profile Visibility",
    description: "Allow candidates to see your company profile",
    icon: <Globe className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "showEmployeeCount",
    label: "Show team member count",
    description: "Display your size on your public profile",
    icon: <Eye className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "allowDirectMessages",
    label: "Allow Direct Messages",
    description: "Let candidates message your company contact",
    icon: <ShieldCheck className="h-5 w-5" />,
    enabled: true,
  },
];

const CompanySettingsView = () => {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const [deleteMe, { isLoading: isDeleting }] = useDeleteMeMutation();
  const [activeSection, setActiveSection] = useState<
    "main" | "personal" | "security"
  >("main");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const { data: companyData, isLoading: isLoadingCompany } =
    useGetMyCompanyQuery(undefined);

  const [updateCompanySettings, { isLoading: isSaving }] =
    useUpdateCompanySettingsMutation();

  const [notifications, setNotifications] = useState(notificationSettingsSeed);
  const [privacy, setPrivacy] = useState(privacySettingsSeed);

  // Sync state with fetched data
  useEffect(() => {
    const settings = companyData?.data?.companySettings;
    if (settings) {
      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          enabled: settings[item.id] ?? item.enabled,
        })),
      );
      setPrivacy((prev) =>
        prev.map((item) => ({
          ...item,
          enabled: settings[item.id] ?? item.enabled,
        })),
      );
    }
  }, [companyData]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const togglePrivacy = (id: string) => {
    setPrivacy((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const handleSaveSettings = async () => {
    if (!companyData?.data?.id) {
      toast.error("Company data not loaded");
      return;
    }
    try {
      const mergedSettings = {
        ...notifications.reduce((acc: any, item) => {
          acc[item.id] = item.enabled;
          return acc;
        }, {}),
        ...privacy.reduce((acc: any, item) => {
          acc[item.id] = item.enabled;
          return acc;
        }, {}),
      };

      await updateCompanySettings({
        companyId: companyData.data.id,
        ...mergedSettings,
      }).unwrap();
      toast.success("Settings updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update settings");
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser(undefined).unwrap();
    } catch {
      // ignore
    } finally {
      dispatch(logout());
      window.location.href = "/";
    }
  };

  const handleDeleteAccount = () => {
    setDeleteConfirmText("");
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmText !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }
    try {
      await deleteMe().unwrap();
      toast.success("Company account deleted successfully");
      setIsDeleteOpen(false);
      dispatch(logout());
      window.location.href = "/";
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to delete company account");
    }
  };

  if (isLoadingCompany) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground animate-pulse font-medium">
          Loading settings...
        </div>
      </div>
    );
  }

  if (activeSection === "personal") {
    return (
      <CompanyPersonalInformationView onBack={() => setActiveSection("main")} />
    );
  }

  if (activeSection === "security") {
    return <CompanySecurityView onBack={() => setActiveSection("main")} />;
  }

  return (
    <div className="bg-background min-h-screen">
      <DashboardCompanySettingsHeader
        handleSaveSettings={handleSaveSettings}
        isSaving={isSaving}
      />

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Account */}
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-black tracking-tight sm:text-xl">
                Account
              </h2>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                Manage your company contact information and security
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div onClick={() => setActiveSection("personal")}>
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:ring-primary/5 flex h-12 w-12 items-center justify-center rounded-lg ring-4 ring-transparent transition-all">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">
                          Account Profile
                        </h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Your login identity and personal user info
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
                  </div>
                </Card>
              </div>

              <div onClick={() => setActiveSection("security")}>
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:ring-primary/5 flex h-12 w-12 items-center justify-center rounded-lg ring-4 ring-transparent transition-all">
                        <Lock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">
                          Password & Security
                        </h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Change password, session security
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <Separator className="opacity-50" />

          {/* Notifications */}
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-black tracking-tight sm:text-xl">
                Notification Preferences
              </h2>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                Control how your company receives updates and alerts
              </p>
            </div>

            <div className="grid gap-3">
              {notifications.map((item) => (
                <Card
                  key={item.id}
                  className="bg-card hover:border-primary/20 rounded-xl border p-5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary ring-primary/5 flex h-10 w-10 items-center justify-center rounded-lg ring-2">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold tracking-tight">
                          {item.label}
                        </h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!!item.enabled}
                      onCheckedChange={() => toggleNotification(item.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="opacity-50" />

          {/* Privacy */}
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-black tracking-tight sm:text-xl">
                Privacy & Visibility
              </h2>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                Manage your company profile visibility and data display
              </p>
            </div>

            <div className="grid gap-3">
              {privacy.map((item) => (
                <Card
                  key={item.id}
                  className="bg-card hover:border-primary/20 rounded-xl border p-5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary ring-primary/5 flex h-10 w-10 items-center justify-center rounded-lg ring-2">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold tracking-tight">
                          {item.label}
                        </h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!!item.enabled}
                      onCheckedChange={() => togglePrivacy(item.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="opacity-50" />

          {/* Danger Zone */}
          <section className="pb-12">
            <div className="mb-6">
              <h2 className="text-destructive text-lg font-black tracking-tight sm:text-xl">
                Danger Zone
              </h2>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                Critical company account actions
              </p>
            </div>

            <div className="grid gap-3">
              <Card className="bg-card hover:border-destructive/20 rounded-xl border p-5 transition-all duration-300">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-destructive/10 text-destructive ring-destructive/5 flex h-10 w-10 items-center justify-center rounded-lg ring-2">
                      <LogOut className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight">
                        Sign Out
                      </h3>
                      <p className="text-muted-foreground text-xs font-medium opacity-70">
                        Exit your current hiring session
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground w-full bg-transparent font-bold sm:w-auto"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </Card>

              <Card className="border-destructive/30 bg-destructive/5 hover:border-destructive rounded-xl border-2 p-5 transition-all duration-300">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-destructive text-destructive-foreground shadow-destructive/20 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
                      <Trash2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-destructive font-bold tracking-tight">
                        Delete Company Account
                      </h3>
                      <p className="text-muted-foreground text-xs font-medium opacity-70">
                        Permanently remove all company data and job posts
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleDeleteAccount}
                    variant="destructive"
                    className="w-full font-bold sm:w-auto"
                  >
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-card max-w-md rounded-2xl border p-6 shadow-2xl">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-destructive text-xl font-black tracking-tight">
              Delete Company Account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm leading-relaxed font-medium">
              This action is permanent and cannot be undone. All your company
              details, job posts, and candidate applications will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="my-4 space-y-2">
            <label className="text-foreground text-xs font-bold tracking-wider uppercase">
              Type <span className="text-destructive">DELETE</span> to confirm
            </label>
            <Input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="DELETE"
              className="bg-muted/30 focus-visible:ring-destructive/20 text-destructive placeholder:text-muted-foreground/40 h-10 border-red-200/50 text-sm font-bold placeholder:font-normal"
            />
          </div>

          <AlertDialogFooter className="mt-6 flex gap-2">
            <AlertDialogCancel className="h-10 rounded-full font-bold">
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleConfirmDelete}
              disabled={isDeleting || deleteConfirmText !== "DELETE"}
              variant="destructive"
              className="shadow-destructive/10 h-10 rounded-full font-bold shadow-lg"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CompanySettingsView;
