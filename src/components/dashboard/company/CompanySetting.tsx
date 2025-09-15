/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Facebook,
  Github,
  Globe,
  Instagram,
  Link,
  Linkedin,
  Plus,
  Save,
  Settings,
  Shield,
  Trash2,
  Twitter,
} from "lucide-react";
import { useState } from "react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface CompanySettings {
  notifications: {
    emailNotifications: boolean;
    applicationAlerts: boolean;
    jobExpiryReminders: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private";
    showEmployeeCount: boolean;
    showSalaryRanges: boolean;
    allowDirectMessages: boolean;
  };
  jobPosting: {
    autoExpireJobs: boolean;
    jobExpiryDays: number;
    requireApproval: boolean;
    maxActiveJobs: number;
  };
  billing: {
    plan: string;
    billingEmail: string;
    autoRenew: boolean;
  };
}

const CompanySetting = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [isAddSocialOpen, setIsAddSocialOpen] = useState(false);

  const [settings, setSettings] = useState<CompanySettings>({
    notifications: {
      emailNotifications: true,
      applicationAlerts: true,
      jobExpiryReminders: true,
      weeklyReports: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmployeeCount: true,
      showSalaryRanges: false,
      allowDirectMessages: true,
    },
    jobPosting: {
      autoExpireJobs: true,
      jobExpiryDays: 30,
      requireApproval: false,
      maxActiveJobs: 10,
    },
    billing: {
      plan: "Professional",
      billingEmail: "billing@techflow.com",
      autoRenew: true,
    },
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      id: "1",
      platform: "LinkedIn",
      url: "https://linkedin.com/company/techflow",
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      id: "2",
      platform: "Twitter",
      url: "https://twitter.com/techflow",
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      id: "3",
      platform: "GitHub",
      url: "https://github.com/techflow",
      icon: <Github className="h-4 w-4" />,
    },
  ]);

  const availablePlatforms = [
    { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
    { name: "Twitter", icon: <Twitter className="h-4 w-4" /> },
    { name: "GitHub", icon: <Github className="h-4 w-4" /> },
    { name: "Facebook", icon: <Facebook className="h-4 w-4" /> },
    { name: "Instagram", icon: <Instagram className="h-4 w-4" /> },
    { name: "Website", icon: <Globe className="h-4 w-4" /> },
  ];

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // fake api call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const updateNotificationSetting = (
    key: keyof CompanySettings["notifications"],
    value: boolean,
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const updatePrivacySetting = (
    key: keyof CompanySettings["privacy"],
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
  };

  const updateJobPostingSetting = (
    key: keyof CompanySettings["jobPosting"],
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      jobPosting: {
        ...prev.jobPosting,
        [key]: value,
      },
    }));
  };

  const addSocialLink = (platform: string, url: string) => {
    const platformData = availablePlatforms.find((p) => p.name === platform);
    if (platformData && url.trim()) {
      const newLink: SocialLink = {
        id: Date.now().toString(),
        platform,
        url: url.trim(),
        icon: platformData.icon,
      };
      setSocialLinks((prev) => [...prev, newLink]);
      setIsAddSocialOpen(false);
    }
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updateSocialLink = (id: string, url: string) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url } : link)),
    );
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-foreground flex items-center text-2xl font-bold">
                <Settings className="mr-2 h-6 w-6" />
                Company Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your company preferences and configurations
              </p>
            </div>
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Posting Settings</CardTitle>
                <CardDescription>
                  Configure how your job postings behave
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-expire jobs</Label>
                    <p className="text-muted-foreground text-sm">
                      Automatically expire job postings after a set period
                    </p>
                  </div>
                  <Switch
                    checked={settings.jobPosting.autoExpireJobs}
                    onCheckedChange={(checked: any) =>
                      updateJobPostingSetting("autoExpireJobs", checked)
                    }
                  />
                </div>

                {settings.jobPosting.autoExpireJobs && (
                  <div className="space-y-2">
                    <Label htmlFor="expiryDays">Job expiry (days)</Label>
                    <Input
                      id="expiryDays"
                      type="number"
                      value={settings.jobPosting.jobExpiryDays}
                      onChange={(e) =>
                        updateJobPostingSetting(
                          "jobExpiryDays",
                          Number.parseInt(e.target.value),
                        )
                      }
                      className="w-32"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require approval for job posts</Label>
                    <p className="text-muted-foreground text-sm">
                      All job posts must be approved before going live
                    </p>
                  </div>
                  <Switch
                    checked={settings.jobPosting.requireApproval}
                    onCheckedChange={(checked: any) =>
                      updateJobPostingSetting("requireApproval", checked)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxJobs">Maximum active jobs</Label>
                  <Input
                    id="maxJobs"
                    type="number"
                    value={settings.jobPosting.maxActiveJobs}
                    onChange={(e) =>
                      updateJobPostingSetting(
                        "maxActiveJobs",
                        Number.parseInt(e.target.value),
                      )
                    }
                    className="w-32"
                  />
                  <p className="text-muted-foreground text-sm">
                    Maximum number of jobs that can be active at once
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Receive general email notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked: any) =>
                      updateNotificationSetting("emailNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Application alerts</Label>
                    <p className="text-muted-foreground text-sm">
                      Get notified when someone applies to your jobs
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.applicationAlerts}
                    onCheckedChange={(checked: any) =>
                      updateNotificationSetting("applicationAlerts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Job expiry reminders</Label>
                    <p className="text-muted-foreground text-sm">
                      Remind me when jobs are about to expire
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.jobExpiryReminders}
                    onCheckedChange={(checked: any) =>
                      updateNotificationSetting("jobExpiryReminders", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly reports</Label>
                    <p className="text-muted-foreground text-sm">
                      Receive weekly analytics and performance reports
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(checked: any) =>
                      updateNotificationSetting("weeklyReports", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control your {`company's`} privacy and visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Profile visibility</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={
                          settings.privacy.profileVisibility === "public"
                        }
                        onChange={(e) =>
                          updatePrivacySetting(
                            "profileVisibility",
                            e.target.value,
                          )
                        }
                        className="text-primary"
                      />
                      <span>Public</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={
                          settings.privacy.profileVisibility === "private"
                        }
                        onChange={(e) =>
                          updatePrivacySetting(
                            "profileVisibility",
                            e.target.value,
                          )
                        }
                        className="text-primary"
                      />
                      <span>Private</span>
                    </label>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Public profiles are visible to all users, private profiles
                    are only visible to logged-in users
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show employee count</Label>
                    <p className="text-muted-foreground text-sm">
                      Display the number of employees on your profile
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.showEmployeeCount}
                    onCheckedChange={(checked: any) =>
                      updatePrivacySetting("showEmployeeCount", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show salary ranges</Label>
                    <p className="text-muted-foreground text-sm">
                      Display salary ranges on job postings
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.showSalaryRanges}
                    onCheckedChange={(checked: any) =>
                      updatePrivacySetting("showSalaryRanges", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow direct messages</Label>
                    <p className="text-muted-foreground text-sm">
                      Let job seekers send direct messages to your company
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.allowDirectMessages}
                    onCheckedChange={(checked: any) =>
                      updatePrivacySetting("allowDirectMessages", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Link className="mr-2 h-5 w-5" />
                      Social Media Links
                    </CardTitle>
                    <CardDescription>
                      Add your {`company's`} social media profiles
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isAddSocialOpen}
                    onOpenChange={setIsAddSocialOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Link
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Social Media Link</DialogTitle>
                        <DialogDescription>
                          Add a new social media profile for your company
                        </DialogDescription>
                      </DialogHeader>
                      <AddSocialLinkForm
                        onAdd={addSocialLink}
                        availablePlatforms={availablePlatforms}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center space-x-4 rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-3">
                        {link.icon}
                        <span className="font-medium">{link.platform}</span>
                      </div>
                      <div className="flex-1">
                        <Input
                          value={link.url}
                          onChange={(e) =>
                            updateSocialLink(link.id, e.target.value)
                          }
                          placeholder={`Enter ${link.platform} URL`}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSocialLink(link.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {socialLinks.length === 0 && (
                    <div className="py-8 text-center">
                      <Link className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                      <h3 className="text-foreground mb-2 text-lg font-medium">
                        No social links added
                      </h3>
                      <p className="text-muted-foreground">
                        Add your {`company's`} social media profiles to increase
                        visibility
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <p className="text-muted-foreground text-sm">
                      Professional Plan
                    </p>
                  </div>
                  <Badge className="bg-primary/10 text-primary">Active</Badge>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingEmail">Billing Email</Label>
                  <Input
                    id="billingEmail"
                    type="email"
                    value={settings.billing.billingEmail}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        billing: {
                          ...prev.billing,
                          billingEmail: e.target.value,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-renew subscription</Label>
                    <p className="text-muted-foreground text-sm">
                      Automatically renew your subscription each billing cycle
                    </p>
                  </div>
                  <Switch
                    checked={settings.billing.autoRenew}
                    onCheckedChange={(checked: any) =>
                      setSettings((prev) => ({
                        ...prev,
                        billing: { ...prev.billing, autoRenew: checked },
                      }))
                    }
                  />
                </div>

                <div className="border-t pt-4">
                  <div className="flex space-x-3">
                    <Button variant="outline">View Billing History</Button>
                    <Button variant="outline">Update Payment Method</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your company account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Company Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your company account and remove all associated
                        data including jobs, applications, and employee records.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

function AddSocialLinkForm({
  onAdd,
  availablePlatforms,
}: {
  onAdd: (platform: string, url: string) => void;
  availablePlatforms: { name: string; icon: React.ReactNode }[];
}) {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatform && url.trim()) {
      onAdd(selectedPlatform, url);
      setSelectedPlatform("");
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Platform</Label>
        <div className="grid grid-cols-3 gap-2">
          {availablePlatforms.map((platform) => (
            <button
              key={platform.name}
              type="button"
              onClick={() => setSelectedPlatform(platform.name)}
              className={`hover:bg-accent flex items-center space-x-2 rounded-lg border p-3 ${
                selectedPlatform === platform.name
                  ? "border-primary bg-primary/5"
                  : ""
              }`}
            >
              {platform.icon}
              <span className="text-sm">{platform.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={`Enter ${selectedPlatform || "social media"} URL`}
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSelectedPlatform("");
            setUrl("");
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!selectedPlatform || !url.trim()}>
          Add Link
        </Button>
      </div>
    </form>
  );
}

export default CompanySetting;
