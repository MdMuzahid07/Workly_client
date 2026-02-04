"use client";

import DashboardHeaderContainer from "@/components/dashboard/dashboard-nav/header/DashboardHeaderContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useLogoutUserMutation } from "@/redux/feature/auth/authApi";
import { logout } from "@/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  Bell,
  ChevronRight,
  Eye,
  Globe,
  Lock,
  LogOut,
  Trash2,
  User,
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
    icon: <Bell className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "email-applications",
    label: "Application Updates",
    description: "Updates on your job applications",
    icon: <Bell className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "email-messages",
    label: "Messages",
    description: "Notifications when recruiters message you",
    icon: <Bell className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "email-interviews",
    label: "Interview Updates",
    description: "Interview scheduling and reminders",
    icon: <Bell className="h-5 w-5" />,
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
    icon: <Globe className="h-5 w-5" />,
    enabled: true,
  },
];

export default function JobSeekerSettingsView() {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const [notifications, setNotifications] = useState(notificationSettingsSeed);
  const [privacy, setPrivacy] = useState(privacySettingsSeed);

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

  return (
    <div className="min-h-screen">
      <DashboardHeaderContainer>
        <div className="flex w-full flex-col gap-1">
          <h1 className="text-2xl font-bold sm:text-3xl">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Manage your account preferences and privacy
          </p>
        </div>
      </DashboardHeaderContainer>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Account */}
        <section className="mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold sm:text-xl">Account</h2>
            <p className="text-muted-foreground text-sm">
              Manage your account information
            </p>
          </div>

          <div className="space-y-3">
            <Card className="group border-border/50 bg-card/50 cursor-pointer p-5 transition-all hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Personal Information</h3>
                    <p className="text-muted-foreground text-sm">
                      Name, email, phone number
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors" />
              </div>
            </Card>

            <Card className="group border-border/50 bg-card/50 cursor-pointer p-5 transition-all hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Password & Security</h3>
                    <p className="text-muted-foreground text-sm">
                      Change password, two-factor auth
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors" />
              </div>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Notifications */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold sm:text-xl">
              Notification Preferences
            </h2>
            <p className="text-muted-foreground text-sm">
              Control how we contact you
            </p>
          </div>

          <div className="space-y-4">
            {notifications.map((item) => (
              <Card key={item.id} className="border-border/50 bg-card/50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.label}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={!!item.enabled}
                    onCheckedChange={() => toggleNotification(item.id)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Privacy */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold sm:text-xl">
              Privacy & Visibility
            </h2>
            <p className="text-muted-foreground text-sm">
              Control who can see your information
            </p>
          </div>

          <div className="space-y-4">
            {privacy.map((item) => (
              <Card key={item.id} className="border-border/50 bg-card/50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 text-accent flex h-10 w-10 items-center justify-center rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.label}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={!!item.enabled}
                    onCheckedChange={() => togglePrivacy(item.id)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Danger Zone */}
        <section>
          <div className="mb-6">
            <h2 className="text-lg font-bold sm:text-xl">Account Management</h2>
            <p className="text-muted-foreground text-sm">
              Permanently delete or deactivate your account
            </p>
          </div>

          <div className="space-y-3">
            <Card className="border-border/50 bg-card/50 p-5 transition-all hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-destructive/10 text-destructive flex h-10 w-10 items-center justify-center rounded-lg">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sign Out</h3>
                    <p className="text-muted-foreground text-sm">
                      Sign out from this device
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </Card>

            <Card className="border-destructive/20 bg-card/50 border-2 p-5 transition-all hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-destructive/10 text-destructive flex h-10 w-10 items-center justify-center rounded-lg">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Delete Account</h3>
                    <p className="text-muted-foreground text-sm">
                      Permanently delete your account and all data
                    </p>
                  </div>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
