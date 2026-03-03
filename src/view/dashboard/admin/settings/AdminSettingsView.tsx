"use client";

import DashboardAdminSettingsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminSettingsHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  BellRing,
  ChevronRight,
  Globe,
  Lock,
  Monitor,
  Sparkles,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import AdminBrandingView from "./AdminBrandingView";
import AdminPersonalInformationView from "./AdminPersonalInformationView";
import AdminSecurityView from "./AdminSecurityView";

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled?: boolean;
}

const platformControlsSeed: SettingItem[] = [
  {
    id: "ai-match",
    label: "AI Matchmaking Engine",
    description: "Real-time candidate-to-job scoring using LLMs",
    icon: <Sparkles className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "user-reg",
    label: "Public Registration",
    description: "Allow new employers and candidates to sign up",
    icon: <User className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "notifications",
    label: "Global Notification Relay",
    description: "System dispatching for all outbound alerts",
    icon: <BellRing className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: "audit-log",
    label: "Extended Audit Logging",
    description: "Track all administrative actions for 365 days",
    icon: <Zap className="h-5 w-5" />,
    enabled: true,
  },
];

const AdminSettingsView = () => {
  const [activeSection, setActiveSection] = useState<
    "main" | "personal" | "security" | "branding"
  >("main");
  const [isSaving, setIsSaving] = useState(false);
  const [controls, setControls] = useState(platformControlsSeed);

  const toggleControl = (id: string) => {
    setControls((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  if (activeSection === "personal") {
    return (
      <AdminPersonalInformationView onBack={() => setActiveSection("main")} />
    );
  }

  if (activeSection === "security") {
    return <AdminSecurityView onBack={() => setActiveSection("main")} />;
  }

  if (activeSection === "branding") {
    return <AdminBrandingView onBack={() => setActiveSection("main")} />;
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminSettingsHeader isSaving={isSaving} onSave={handleSave} />

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10 pb-20">
          {/* Account & Security */}
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                Administrative Account
              </h2>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                Manage your profile and portal access security
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div onClick={() => setActiveSection("personal")}>
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl ring-4 ring-transparent transition-all">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">
                          Personal Information
                        </h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Identity, email, system profile
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
                  </div>
                </Card>
              </div>

              <div onClick={() => setActiveSection("security")}>
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl ring-4 ring-transparent transition-all">
                        <Lock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">
                          Security & Access
                        </h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Password, MFA, session control
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
                  </div>
                </Card>
              </div>

              <div
                onClick={() => setActiveSection("branding")}
                className="sm:col-span-2"
              >
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl ring-4 ring-transparent transition-all">
                        <Globe className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">
                          Portal Branding
                        </h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Site name, slogans, support alias and identity
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-[10px] font-bold tracking-widest uppercase opacity-0 transition-opacity group-hover:opacity-100">
                        Global Config
                      </span>
                      <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <Separator className="border-dashed opacity-50" />

          {/* Platform Controls */}
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                System Intelligence & Logic
              </h2>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                Core engine parameters and automation toggles
              </p>
            </div>

            <div className="grid gap-3">
              {controls.map((item) => (
                <Card
                  key={item.id}
                  className="bg-card hover:border-primary/20 rounded-xl border-2 p-5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary ring-primary/5 flex h-10 w-10 items-center justify-center rounded-xl ring-2">
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
                      onCheckedChange={() => toggleControl(item.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="border-dashed opacity-50" />

          {/* Vital Controls */}
          <section className="pb-12">
            <div className="mb-6">
              <h2 className="text-destructive text-lg font-bold tracking-tight sm:text-xl">
                Platform Vital Controls
              </h2>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                Critical system-wide availability management
              </p>
            </div>

            <div className="grid gap-3">
              <Card className="border-destructive/30 bg-destructive/5 hover:border-destructive rounded-xl border-2 p-5 transition-all duration-300">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-destructive shadow-destructive/20 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg">
                      <Monitor className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-destructive font-bold tracking-tight">
                        Maintenance Mode
                      </h3>
                      <p className="text-muted-foreground text-xs font-bold opacity-70">
                        Restrict access to administrators only
                      </p>
                    </div>
                  </div>
                  <div className="border-destructive/10 flex items-center gap-3 rounded-full border bg-white/50 px-4 py-1.5 dark:bg-black/20">
                    <span className="text-destructive text-[10px] font-bold tracking-widest uppercase">
                      OFFLINE
                    </span>
                    <Switch className="data-[state=checked]:bg-destructive" />
                  </div>
                </div>
              </Card>

              <Card className="bg-card hover:border-destructive/20 rounded-xl border-2 p-5 transition-all duration-300">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-destructive/10 text-destructive ring-destructive/5 flex h-10 w-10 items-center justify-center rounded-xl ring-2">
                      <Trash2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight">
                        Factory System Reset
                      </h3>
                      <p className="text-muted-foreground text-xs font-medium opacity-70">
                        Wipe all cache and transient system data
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-full px-6 text-[10px] font-bold tracking-widest uppercase"
                  >
                    Reset Now
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsView;
