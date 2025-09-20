/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import BillingSettingTab from "../../components/dashboard/company-settings/settings-tabs/BillingSettingTab";
import JobPostingManagementTab from "../../components/dashboard/company-settings/settings-tabs/JobPostingManagementTab";
import NotificationSettingTab from "../../components/dashboard/company-settings/settings-tabs/NotificationSettingTab";
import PrivacySettingTab from "../../components/dashboard/company-settings/settings-tabs/PrivacySettingTab";
import SocialLinkSettingTab from "../../components/dashboard/company-settings/settings-tabs/SocialLinkSettingTab";
import DashboardCompanySettingsHeader from "../../components/dashboard/dashboard-nav/header/DashboardCompanySettingsHeader";

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
    <div className="min-h-screen bg-gray-50">
      <DashboardCompanySettingsHeader
        handleSaveSettings={handleSaveSettings}
        isSaving={isSaving}
      />

      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
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
