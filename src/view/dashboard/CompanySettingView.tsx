/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Settings } from "lucide-react";
import { useState } from "react";
import BillingSettingTab from "../../components/dashboard/company-settings/settings-tabs/BillingSettingTab";
import JobPostingManagementTab from "../../components/dashboard/company-settings/settings-tabs/JobPostingManagementTab";
import NotificationSettingTab from "../../components/dashboard/company-settings/settings-tabs/NotificationSettingTab";
import PrivacySettingTab from "../../components/dashboard/company-settings/settings-tabs/PrivacySettingTab";
import SocialLinkSettingTab from "../../components/dashboard/company-settings/settings-tabs/SocialLinkSettingTab";

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

          <SocialLinkSettingTab />

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
