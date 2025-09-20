/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Link,
  Linkedin,
  Plus,
  Save,
  Settings,
  Trash2,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import AddCompanySocialLink from "../../components/dashboard/company-settings/AddCompanySocialLink";
import BillingSettingTab from "../../components/dashboard/company-settings/settings-tabs/BillingSettingTab";
import JobPostingManagementTab from "../../components/dashboard/company-settings/settings-tabs/JobPostingManagementTab";
import NotificationSettingTab from "../../components/dashboard/company-settings/settings-tabs/NotificationSettingTab";
import PrivacySettingTab from "../../components/dashboard/company-settings/settings-tabs/PrivacySettingTab";

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

const CompanySettingsView = () => {
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const updateSettings = (
    section: keyof CompanySettings,
    key: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
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
      {/* Header - Mobile Responsive */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-foreground flex items-center text-xl font-bold sm:text-2xl">
                <Settings className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Company Settings
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Manage your company preferences and configurations
              </p>
            </div>
            <Button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="w-full sm:w-auto"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Mobile optimized tabs */}
          <div className="w-full overflow-x-auto">
            <TabsList className="grid w-full min-w-[600px] grid-cols-5 sm:min-w-0">
              <TabsTrigger value="general" className="text-xs sm:text-sm">
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="text-xs sm:text-sm">
                Privacy
              </TabsTrigger>
              <TabsTrigger value="social" className="text-xs sm:text-sm">
                Social Links
              </TabsTrigger>
              <TabsTrigger value="billing" className="text-xs sm:text-sm">
                Billing
              </TabsTrigger>
            </TabsList>
          </div>

          <JobPostingManagementTab
            updateSettings={updateSettings}
            settings={settings}
          />

          <NotificationSettingTab
            updateSettings={updateSettings}
            settings={settings}
          />

          <PrivacySettingTab
            updateSettings={updateSettings}
            settings={settings}
          />

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                      <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Link
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="mx-4 max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Social Media Link</DialogTitle>
                        <DialogDescription>
                          Add a new social media profile for your company
                        </DialogDescription>
                      </DialogHeader>
                      <AddCompanySocialLink
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
                      className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:gap-4"
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
                        className="text-destructive hover:text-destructive w-full sm:w-auto"
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

          <BillingSettingTab
            updateSettings={updateSettings}
            settings={settings}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default CompanySettingsView;
