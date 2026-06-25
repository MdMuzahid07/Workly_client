"use client";

import DashboardSettingsHeader from "@/components/dashboard/dashboard-nav/header/DashboardSettingsHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useLogoutUserMutation } from "@/redux/feature/auth/authApi";
import { logout } from "@/redux/feature/auth/authSlice";
import {
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
} from "@/redux/feature/profile/profileApi";
import { useAppDispatch } from "@/redux/hooks";
import JobSeekerPersonalInformationView from "@/view/dashboard/job-seeker/personal-information/JobSeekerPersonalInformationView";
import JobSeekerSecurityView from "@/view/dashboard/job-seeker/security/JobSeekerSecurityView";
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
import { toast } from "sonner";
import JobSeekerSettingsSkeleton from "@/skeleton/dashboard/job-seeker/settings/JobSeekerSettingsSkeleton";

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled?: boolean;
}

const notificationSettingsSeed: SettingItem[] = [
  {
    id: "jobRecommendations",
    label: "Job Recommendations",
    description: "Get notified about jobs matching your profile",
    icon: <Zap className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "applicationUpdates",
    label: "Application Updates",
    description: "Updates on your job applications",
    icon: <Mail className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "messages",
    label: "Messages",
    description: "Notifications when recruiters message you",
    icon: <BellRing className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "interviewUpdates",
    label: "Interview Updates",
    description: "Interview scheduling and reminders",
    icon: <Smartphone className="h-5 w-5" />,
    enabled: true,
  },
];

const privacySettingsSeed: SettingItem[] = [
  {
    id: "profileVisibility",
    label: "Public Profile",
    description: "Allow recruiters to find your profile",
    icon: <Globe className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "profileViews",
    label: "Profile Views",
    description: "See who viewed your profile",
    icon: <Eye className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "searchVisibility",
    label: "Search Visibility",
    description: "Appear in recruiter search results",
    icon: <ShieldCheck className="h-5 w-5" />,
    enabled: true,
  },
];

export default function JobSeekerSettingsView() {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const { data: settingsData, isLoading: isSettingsLoading } =
    useGetUserSettingsQuery(undefined);
  const [updateSettings, { isLoading: isSaving }] =
    useUpdateUserSettingsMutation();

  const [notifications, setNotifications] = useState(notificationSettingsSeed);
  const [privacy, setPrivacy] = useState(privacySettingsSeed);
  const [activeSection, setActiveSection] = useState<
    "main" | "personal" | "security"
  >("main");

  useEffect(() => {
    if (settingsData?.data) {
      const data = settingsData.data;
      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          enabled: data[item.id] ?? item.enabled,
        })),
      );
      setPrivacy((prev) =>
        prev.map((item) => ({
          ...item,
          enabled:
            item.id === "profileVisibility"
              ? data.profileVisibility === "PUBLIC"
              : (data[item.id] ?? item.enabled),
        })),
      );
    }
  }, [settingsData]);

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
    try {
      const mergedSettings: Record<string, boolean | string> = {
        ...notifications.reduce<Record<string, boolean>>((acc, item) => {
          acc[item.id] = !!item.enabled;
          return acc;
        }, {}),
        ...privacy.reduce<Record<string, boolean | string>>((acc, item) => {
          if (item.id === "profileVisibility") {
            acc.profileVisibility = item.enabled ? "PUBLIC" : "PRIVATE";
          } else {
            acc[item.id] = !!item.enabled;
          }
          return acc;
        }, {}),
      };

      await updateSettings(mergedSettings).unwrap();
      toast.success("Settings updated successfully");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update settings");
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      // ignore
    } finally {
      dispatch(logout());
      window.location.href = "/";
    }
  };

  if (activeSection === "personal") {
    return (
      <JobSeekerPersonalInformationView
        onBack={() => setActiveSection("main")}
      />
    );
  }

  if (activeSection === "security") {
    return <JobSeekerSecurityView onBack={() => setActiveSection("main")} />;
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardSettingsHeader
        isSaving={isSaving}
        onSave={handleSaveSettings}
      />

      {isSettingsLoading ? (
        <JobSeekerSettingsSkeleton />
      ) : (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-10">
            {/* Account */}
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight sm:text-xl">
                  Account
                </h2>
                <p className="text-muted-foreground text-sm font-medium opacity-80">
                  Manage your account information and security
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card
                  onClick={() => setActiveSection("personal")}
                  className="border-border/60 hover:border-primary/50 relative cursor-pointer overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary rounded-xl p-3">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-foreground text-sm font-bold tracking-tight sm:text-base">
                          Personal Information
                        </h3>
                        <p className="text-muted-foreground text-xs font-semibold opacity-70">
                          Name, bio, and location
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground/60 h-5 w-5" />
                  </div>
                </Card>

                <Card
                  onClick={() => setActiveSection("security")}
                  className="border-border/60 hover:border-primary/50 relative cursor-pointer overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary rounded-xl p-3">
                        <Lock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-foreground text-sm font-bold tracking-tight sm:text-base">
                          Login & Security
                        </h3>
                        <p className="text-muted-foreground text-xs font-semibold opacity-70">
                          Password and active sessions
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground/60 h-5 w-5" />
                  </div>
                </Card>
              </div>
            </section>

            <Separator className="bg-border/50" />

            {/* Notifications */}
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight sm:text-xl">
                  Notification Preferences
                </h2>
                <p className="text-muted-foreground text-sm font-medium opacity-80">
                  Choose what updates you want to receive
                </p>
              </div>

              <div className="space-y-3">
                {notifications.map((item) => {
                  const Icon =
                    item.id === "emailAlerts"
                      ? Mail
                      : item.id === "pushNotifications"
                        ? Smartphone
                        : BellRing;
                  return (
                    <Card key={item.id} className="border-border/60 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 text-primary rounded-xl p-3">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-foreground text-sm font-bold tracking-tight sm:text-base">
                              {item.label}
                            </h3>
                            <p className="text-muted-foreground text-xs font-semibold opacity-70">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={item.enabled}
                          onCheckedChange={() => toggleNotification(item.id)}
                          className="data-[state=checked]:bg-primary cursor-pointer"
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            <Separator className="bg-border/50" />

            {/* Privacy */}
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight sm:text-xl">
                  Privacy Settings
                </h2>
                <p className="text-muted-foreground text-sm font-medium opacity-80">
                  Control your visibility and data sharing
                </p>
              </div>

              <div className="space-y-3">
                {privacy.map((item) => {
                  const Icon =
                    item.id === "profileVisibility"
                      ? Eye
                      : item.id === "marketingEmails"
                        ? Zap
                        : ShieldCheck;
                  return (
                    <Card key={item.id} className="border-border/60 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 text-primary rounded-xl p-3">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-foreground text-sm font-bold tracking-tight sm:text-base">
                              {item.label}
                            </h3>
                            <p className="text-muted-foreground text-xs font-semibold opacity-70">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={item.enabled}
                          onCheckedChange={() => togglePrivacy(item.id)}
                          className="data-[state=checked]:bg-primary cursor-pointer"
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            <Separator className="bg-border/50" />

            {/* Danger Zone */}
            <section>
              <div className="mb-6">
                <h2 className="text-destructive text-lg font-black tracking-tight sm:text-xl">
                  Danger Zone
                </h2>
                <p className="text-muted-foreground text-sm font-medium opacity-80">
                  Irreversible and destructive actions
                </p>
              </div>

              <div className="space-y-4">
                <Card className="border-destructive/20 bg-destructive/5 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-destructive/10 text-destructive rounded-xl p-3">
                        <LogOut className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-foreground text-sm font-bold tracking-tight sm:text-base">
                          Sign Out
                        </h3>
                        <p className="text-muted-foreground text-xs font-semibold opacity-70">
                          Sign out of your active session on this device
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive w-full font-bold hover:text-white sm:w-auto"
                    >
                      Sign Out
                    </Button>
                  </div>
                </Card>

                <Card className="border-destructive/20 bg-destructive/5 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-destructive/10 text-destructive rounded-xl p-3">
                        <Trash2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-destructive font-bold tracking-tight">
                          Delete Account
                        </h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Permanently remove all your data and access
                        </p>
                      </div>
                    </div>
                    <Button
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
      )}
    </div>
  );
}
