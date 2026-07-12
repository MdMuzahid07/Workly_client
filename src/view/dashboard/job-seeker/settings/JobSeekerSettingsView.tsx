'use client';

import DashboardSettingsHeader from '@/components/dashboard/dashboard-nav/header/DashboardSettingsHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useLogoutUserMutation, useDeleteMeMutation } from '@/redux/feature/auth/authApi';
import { logout } from '@/redux/feature/auth/authSlice';
import {
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
} from '@/redux/feature/profile/profileApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSound, setVolume } from '@/redux/feature/notification/notificationSoundSlice';
import { playReceived } from '@/lib/notificationSound';
import { Slider } from '@/components/ui/slider';
import JobSeekerSettingsSkeleton from '@/skeleton/dashboard/job-seeker/settings/JobSeekerSettingsSkeleton';
import JobSeekerPersonalInformationView from '@/view/dashboard/job-seeker/personal-information/JobSeekerPersonalInformationView';
import JobSeekerSecurityView from '@/view/dashboard/job-seeker/security/JobSeekerSecurityView';
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
  Volume2,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import SignOutModal from '@/components/shared/SignOutModal';

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled?: boolean;
}

const notificationSettingsSeed: SettingItem[] = [
  {
    id: 'jobRecommendations',
    label: 'Job Recommendations',
    description: 'Get notified about jobs matching your profile',
    icon: <Zap className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: 'applicationUpdates',
    label: 'Application Updates',
    description: 'Updates on your job applications',
    icon: <Mail className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: 'messages',
    label: 'Messages',
    description: 'Notifications when recruiters message you',
    icon: <BellRing className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: 'interviewUpdates',
    label: 'Interview Updates',
    description: 'Interview scheduling and reminders',
    icon: <Smartphone className="h-5 w-5" />,
    enabled: true,
  },
];

const privacySettingsSeed: SettingItem[] = [
  {
    id: 'profileVisibility',
    label: 'Public Profile',
    description: 'Allow recruiters to find your profile',
    icon: <Globe className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: 'profileViews',
    label: 'Profile Views',
    description: 'See who viewed your profile',
    icon: <Eye className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: 'searchVisibility',
    label: 'Search Visibility',
    description: 'Appear in recruiter search results',
    icon: <ShieldCheck className="h-5 w-5" />,
    enabled: true,
  },
];

export default function JobSeekerSettingsView() {
  const dispatch = useAppDispatch();
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const [deleteMe, { isLoading: isDeleting }] = useDeleteMeMutation();

  const { data: settingsData, isLoading: isSettingsLoading } = useGetUserSettingsQuery(undefined);
  const [updateSettings, { isLoading: isSaving }] = useUpdateUserSettingsMutation();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const [notifications, setNotifications] = useState(notificationSettingsSeed);
  const [privacy, setPrivacy] = useState(privacySettingsSeed);
  const [activeSection, setActiveSection] = useState<'main' | 'personal' | 'security'>('main');

  const soundSettings = useAppSelector((state) => state.notificationSound);

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
            item.id === 'profileVisibility'
              ? data.profileVisibility === 'PUBLIC'
              : (data[item.id] ?? item.enabled),
        })),
      );
    }
  }, [settingsData]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  const togglePrivacy = (id: string) => {
    setPrivacy((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
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
          if (item.id === 'profileVisibility') {
            acc.profileVisibility = item.enabled ? 'PUBLIC' : 'PRIVATE';
          } else {
            acc[item.id] = !!item.enabled;
          }
          return acc;
        }, {}),
      };

      await updateSettings(mergedSettings).unwrap();
      toast.success('Settings updated successfully');
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || 'Failed to update settings');
    }
  };

  const handleSignOut = () => {
    setIsSignOutModalOpen(true);
  };

  const handleConfirmSignOut = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      // ignore
    } finally {
      dispatch(logout());
      window.location.href = '/';
    }
  };

  const handleDeleteAccount = () => {
    setDeleteConfirmText('');
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }
    try {
      await deleteMe().unwrap();
      toast.success('Account deleted successfully');
      setIsDeleteOpen(false);
      dispatch(logout());
      window.location.href = '/';
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || 'Failed to delete account');
    }
  };

  if (activeSection === 'personal') {
    return <JobSeekerPersonalInformationView onBack={() => setActiveSection('main')} />;
  }

  if (activeSection === 'security') {
    return <JobSeekerSecurityView onBack={() => setActiveSection('main')} />;
  }

  return (
    <div className="min-h-screen pt-8">
      <DashboardSettingsHeader isSaving={isSaving} onSave={handleSaveSettings} />

      {isSettingsLoading ? (
        <JobSeekerSettingsSkeleton />
      ) : (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-10">
            {/* Account */}
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight sm:text-xl">Account</h2>
                <p className="text-muted-foreground text-sm font-medium opacity-80">
                  Manage your account information and security
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card
                  onClick={() => setActiveSection('personal')}
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
                  onClick={() => setActiveSection('security')}
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
                  return (
                    <Card key={item.id} className="border-border/60 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 text-primary shrink-0 rounded-xl p-3">
                            {item.icon}
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

            {/* Audio Settings */}
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight sm:text-xl">Audio Settings</h2>
                <p className="text-muted-foreground text-sm font-medium opacity-80">
                  Control sound alerts for new chat messages
                </p>
              </div>

              <Card className="border-border/60 space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary shrink-0 rounded-xl p-3">
                      <Volume2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-foreground text-sm font-bold tracking-tight sm:text-base">
                        Chat Sounds
                      </h3>
                      <p className="text-muted-foreground text-xs font-semibold opacity-70">
                        Play sound effects on sending and receiving messages
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={soundSettings?.enabled ?? true}
                    onCheckedChange={() => dispatch(toggleSound())}
                    className="data-[state=checked]:bg-primary cursor-pointer"
                  />
                </div>

                {(soundSettings?.enabled ?? true) && (
                  <div className="space-y-2 pt-2 pr-4 pl-14">
                    <div className="text-muted-foreground flex items-center justify-between text-xs font-bold">
                      <span>Volume</span>
                      <span>{Math.round((soundSettings?.volume ?? 0.5) * 100)}%</span>
                    </div>
                    <Slider
                      defaultValue={[soundSettings?.volume ?? 0.5]}
                      value={[soundSettings?.volume ?? 0.5]}
                      max={1}
                      min={0}
                      step={0.05}
                      onValueChange={(val) => {
                        if (val[0] !== undefined) {
                          dispatch(setVolume(val[0]));
                        }
                      }}
                      onValueCommit={() => {
                        // Play a brief chime to preview the volume
                        playReceived();
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </Card>
            </section>

            <Separator className="bg-border/50" />

            {/* Privacy */}
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight sm:text-xl">Privacy Settings</h2>
                <p className="text-muted-foreground text-sm font-medium opacity-80">
                  Control your visibility and data sharing
                </p>
              </div>

              <div className="space-y-3">
                {privacy.map((item) => {
                  return (
                    <Card key={item.id} className="border-border/60 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 text-primary shrink-0 rounded-xl p-3">
                            {item.icon}
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
      )}

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-card max-w-md rounded-2xl border p-6 shadow-2xl">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-destructive text-xl font-black tracking-tight">
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm leading-relaxed font-medium">
              This action is permanent and cannot be undone. All your profile details, documents,
              and job applications will be permanently deleted.
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
            <AlertDialogCancel className="h-10 rounded-full font-bold">Cancel</AlertDialogCancel>
            <Button
              onClick={handleConfirmDelete}
              disabled={isDeleting || deleteConfirmText !== 'DELETE'}
              variant="destructive"
              className="shadow-destructive/10 h-10 rounded-full font-bold shadow-lg"
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SignOutModal
        open={isSignOutModalOpen}
        onOpenChange={setIsSignOutModalOpen}
        onConfirm={handleConfirmSignOut}
        isLoading={isLoggingOut}
      />
    </div>
  );
}
