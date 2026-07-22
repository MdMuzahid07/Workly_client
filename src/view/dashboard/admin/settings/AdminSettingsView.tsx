/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DashboardAdminSettingsHeader from '@/components/dashboard/dashboard-nav/header/DashboardAdminSettingsHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
} from '@/redux/feature/admin/adminApi';
import {
  BellRing,
  ChevronRight,
  Clock,
  Cpu,
  Globe,
  Lock,
  Minus,
  Monitor,
  Plus,
  Timer,
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AdminBrandingView from './AdminBrandingView';
import AdminSettingsSkeleton from '@/skeleton/dashboard/admin/AdminSettingsSkeleton';
import AdminPersonalInformationView from './AdminPersonalInformationView';
import AdminSecurityView from './AdminSecurityView';
import AdminBroadcastView from './AdminBroadcastView';

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled?: boolean;
}

const platformControlsSeed: SettingItem[] = [
  {
    id: 'aiMatchmaking',
    label: 'AI Matchmaking Engine',
    description: 'Real-time candidate-to-job scoring using LLMs',
    icon: <Cpu className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: 'publicRegistration',
    label: 'Public Registration',
    description: 'Allow new employers and candidates to sign up',
    icon: <User className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: 'globalNotifications',
    label: 'Global Notification Relay',
    description: 'System dispatching for all outbound alerts',
    icon: <BellRing className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: 'extendedAuditLogging',
    label: 'Extended Audit Logging',
    description: 'Track all administrative actions for 365 days',
    icon: <Zap className="h-5 w-5" />,
    enabled: true,
  },
];

const AdminSettingsView = () => {
  const [activeSection, setActiveSection] = useState<
    'main' | 'personal' | 'security' | 'branding' | 'broadcast'
  >('main');
  const { data: settingsData, isLoading } = useGetSystemSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateSystemSettingsMutation();

  const [controls, setControls] = useState(platformControlsSeed);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [durationDays, setDurationDays] = useState(0);
  const [durationHours, setDurationHours] = useState(1);
  const [durationMinutes, setDurationMinutes] = useState(0);

  useEffect(() => {
    if (settingsData?.data) {
      const data = settingsData.data;
      setControls((prev) =>
        prev.map((item) => ({
          ...item,
          enabled: data[item.id] ?? item.enabled,
        })),
      );
      setMaintenanceMode(data.maintenanceMode ?? false);

      if (data.maintenanceEstimatedEnd) {
        const remainingMs = new Date(data.maintenanceEstimatedEnd).getTime() - Date.now();
        if (remainingMs > 0) {
          const totalMins = Math.floor(remainingMs / (1000 * 60));
          setDurationDays(Math.floor(totalMins / (24 * 60)));
          setDurationHours(Math.floor((totalMins % (24 * 60)) / 60));
          setDurationMinutes(totalMins % 60);
        }
      }
    }
  }, [settingsData]);

  const toggleControl = (id: string) => {
    setControls((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  const handleSave = async () => {
    try {
      const totalMins =
        Number(durationDays) * 24 * 60 + Number(durationHours) * 60 + Number(durationMinutes);

      const maintenanceEstimatedEnd =
        maintenanceMode && totalMins > 0
          ? new Date(Date.now() + totalMins * 60 * 1000).toISOString()
          : null;

      const payload = {
        ...controls.reduce((acc: any, item) => {
          acc[item.id] = item.enabled;
          return acc;
        }, {}),
        maintenanceMode,
        maintenanceEstimatedEnd,
      };
      await updateSettings(payload).unwrap();
      toast.success('System settings updated');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update settings');
    }
  };

  if (isLoading) {
    return <AdminSettingsSkeleton />;
  }

  if (activeSection === 'personal') {
    return <AdminPersonalInformationView onBack={() => setActiveSection('main')} />;
  }

  if (activeSection === 'security') {
    return <AdminSecurityView onBack={() => setActiveSection('main')} />;
  }

  if (activeSection === 'branding') {
    return <AdminBrandingView onBack={() => setActiveSection('main')} />;
  }

  if (activeSection === 'broadcast') {
    return <AdminBroadcastView onBack={() => setActiveSection('main')} />;
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
              <div onClick={() => setActiveSection('personal')}>
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl ring-4 ring-transparent transition-all">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">Personal Information</h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Identity, email, system profile
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
                  </div>
                </Card>
              </div>

              <div onClick={() => setActiveSection('security')}>
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl ring-4 ring-transparent transition-all">
                        <Lock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">Security & Access</h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Password, MFA, session control
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
                  </div>
                </Card>
              </div>

              <div onClick={() => setActiveSection('branding')}>
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl ring-4 ring-transparent transition-all">
                        <Globe className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">Portal Branding</h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Site name, slogans, logos
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
                  </div>
                </Card>
              </div>

              <div onClick={() => setActiveSection('broadcast')}>
                <Card className="group bg-card hover:border-primary/50 relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl ring-4 ring-transparent transition-all">
                        <BellRing className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">Broadcast announcement</h3>
                        <p className="text-muted-foreground text-xs font-medium opacity-70">
                          Push notifications & emails
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
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
                        <h3 className="text-sm font-bold tracking-tight">{item.label}</h3>
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
              <Card
                className={`rounded-xl border-2 p-5 transition-all duration-300 ${maintenanceMode ? 'border-destructive bg-destructive/10 shadow-destructive/10 shadow-lg' : 'border-border bg-card hover:border-destructive/30'}`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg transition-all ${maintenanceMode ? 'bg-destructive shadow-destructive/30 animate-pulse text-white' : 'bg-muted text-muted-foreground'}`}
                    >
                      <Monitor className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-foreground text-base font-bold tracking-tight">
                          Maintenance Mode
                        </h3>
                      </div>
                      <p className="text-muted-foreground mt-0.5 text-xs font-medium">
                        {maintenanceMode
                          ? 'Site access is locked down. Non-admin users (including landing page) are redirected to /maintenance.'
                          : 'Platform is live and accessible to all job seekers and employers.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase transition-all ${
                        maintenanceMode
                          ? 'bg-destructive text-destructive-foreground border-destructive/50 shadow-sm'
                          : 'border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {maintenanceMode ? 'MAINTENANCE MODE ON' : 'MAINTENANCE MODE OFF'}
                    </span>
                    <Switch
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                      className="data-[state=checked]:bg-destructive"
                    />
                  </div>
                </div>

                {maintenanceMode && (
                  <div className="border-destructive/20 mt-6 space-y-5 border-t pt-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Timer className="text-destructive h-4 w-4 animate-pulse" />
                        <h4 className="text-foreground text-xs font-extrabold tracking-wider uppercase">
                          Maintenance Duration & Return Telemetry
                        </h4>
                      </div>
                      <span className="text-muted-foreground text-[11px] font-medium">
                        Auto-calculates countdown target
                      </span>
                    </div>

                    {/* Quick Preset Duration Pills */}
                    <div>
                      <label className="text-muted-foreground mb-2 block text-[11px] font-bold tracking-wider uppercase">
                        Quick Preset Windows
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: '15 Mins', d: 0, h: 0, m: 15 },
                          { label: '30 Mins', d: 0, h: 0, m: 30 },
                          { label: '1 Hour', d: 0, h: 1, m: 0 },
                          { label: '2 Hours', d: 0, h: 2, m: 0 },
                          { label: '6 Hours', d: 0, h: 6, m: 0 },
                          { label: '12 Hours', d: 0, h: 12, m: 0 },
                          { label: '1 Day', d: 1, h: 0, m: 0 },
                        ].map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setDurationDays(preset.d);
                              setDurationHours(preset.h);
                              setDurationMinutes(preset.m);
                            }}
                            className="border-input bg-background hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive text-foreground cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-bold transition-all active:scale-95"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Steppers Grid */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {/* Days Stepper */}
                      <div className="border-input bg-background flex flex-col justify-between rounded-xl border p-3 shadow-2xs">
                        <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                          Days
                        </span>
                        <div className="mt-2 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setDurationDays((v) => Math.max(0, v - 1))}
                            className="border-input bg-muted hover:bg-destructive/10 hover:text-destructive flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-foreground font-mono text-lg font-black">
                            {durationDays}
                          </span>
                          <button
                            type="button"
                            onClick={() => setDurationDays((v) => Math.min(30, v + 1))}
                            className="border-input bg-muted hover:bg-destructive/10 hover:text-destructive flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Hours Stepper */}
                      <div className="border-input bg-background flex flex-col justify-between rounded-xl border p-3 shadow-2xs">
                        <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                          Hours
                        </span>
                        <div className="mt-2 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setDurationHours((v) => Math.max(0, v - 1))}
                            className="border-input bg-muted hover:bg-destructive/10 hover:text-destructive flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-foreground font-mono text-lg font-black">
                            {durationHours}
                          </span>
                          <button
                            type="button"
                            onClick={() => setDurationHours((v) => Math.min(23, v + 1))}
                            className="border-input bg-muted hover:bg-destructive/10 hover:text-destructive flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Minutes Stepper */}
                      <div className="border-input bg-background flex flex-col justify-between rounded-xl border p-3 shadow-2xs">
                        <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                          Minutes
                        </span>
                        <div className="mt-2 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setDurationMinutes((v) => Math.max(0, v - 1))}
                            className="border-input bg-muted hover:bg-destructive/10 hover:text-destructive flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-foreground font-mono text-lg font-black">
                            {durationMinutes}
                          </span>
                          <button
                            type="button"
                            onClick={() => setDurationMinutes((v) => Math.min(59, v + 1))}
                            className="border-input bg-muted hover:bg-destructive/10 hover:text-destructive flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Target Return Preview */}
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <Clock className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <span>Estimated Public Live Return: </span>
                        <span className="text-foreground font-mono font-bold">
                          {(() => {
                            const totalMins =
                              durationDays * 24 * 60 + durationHours * 60 + durationMinutes;
                            if (totalMins === 0) return 'Indefinite / Untimed';
                            const targetDate = new Date(Date.now() + totalMins * 60 * 1000);
                            return `${targetDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} at ${targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              <Card className="bg-card hover:border-destructive/20 rounded-xl border-2 p-5 transition-all duration-300">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-destructive/10 text-destructive ring-destructive/5 flex h-10 w-10 items-center justify-center rounded-xl ring-2">
                      <Trash2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight">Factory System Reset</h3>
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
