"use client";

import DashboardSettingsHeader from "@/components/dashboard/dashboard-nav/header/DashboardSettingsHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useLogoutUserMutation } from "@/redux/feature/auth/authApi";
import { logout } from "@/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import JobSeekerPersonalInformationView from "@/view/dashboard/JobSeekerPersonalInformationView";
import JobSeekerSecurityView from "@/view/dashboard/JobSeekerSecurityView";
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
import { useState } from "react";

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled?: boolean;
}

const notificationSettingsSeed: SettingItem[] = [
  {
    id: "email-jobs",
    label: "Job Recommendations",
    description: "Get notified about jobs matching your profile",
    icon: <Zap className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "email-applications",
    label: "Application Updates",
    description: "Updates on your job applications",
    icon: <Mail className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "email-messages",
    label: "Messages",
    description: "Notifications when recruiters message you",
    icon: <BellRing className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "email-interviews",
    label: "Interview Updates",
    description: "Interview scheduling and reminders",
    icon: <Smartphone className="h-5 w-5" />,
    enabled: true,
  },
];

const privacySettingsSeed: SettingItem[] = [
  {
    id: "profile-public",
    label: "Public Profile",
    description: "Allow recruiters to find your profile",
    icon: <Globe className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "profile-views",
    label: "Profile Views",
    description: "See who viewed your profile",
    icon: <Eye className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "search-visibility",
    label: "Search Visibility",
    description: "Appear in recruiter search results",
    icon: <ShieldCheck className="h-5 w-5" />,
    enabled: true,
  },
];

export default function JobSeekerSettingsView() {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const [notifications, setNotifications] = useState(notificationSettingsSeed);
  const [privacy, setPrivacy] = useState(privacySettingsSeed);
  const [activeSection, setActiveSection] = useState<
    "main" | "personal" | "security"
  >("main");

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

  const handleSignOut = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
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
      <div className="min-h-screen pt-16">
        <DashboardSettingsHeader />
        <JobSeekerPersonalInformationView
          onBack={() => setActiveSection("main")}
        />
      </div>
    );
  }

  if (activeSection === "security") {
    return (
      <div className="min-h-screen pt-16">
        <DashboardSettingsHeader />
        <JobSeekerSecurityView onBack={() => setActiveSection("main")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <DashboardSettingsHeader />

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
              <div onClick={() => setActiveSection("personal")}>
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:ring-primary/5 flex h-12 w-12 items-center justify-center rounded-lg ring-4 ring-transparent transition-all">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">
                          Personal Information
                        </h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Name, email, phone number
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
                          Change password, two-factor auth
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
                Control how you receive updates and alerts
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
                Manage your profile visibility and data
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
                Critical account actions
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
                        Exit your current session comfortably
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
    </div>
  );
}
