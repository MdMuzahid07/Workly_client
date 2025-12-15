/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BillingSettingTab from "../../components/dashboard/company-settings/settings-tabs/BillingSettingTab";
import JobPostingManagementTab from "../../components/dashboard/company-settings/settings-tabs/JobPostingManagementTab";
import NotificationSettingTab from "../../components/dashboard/company-settings/settings-tabs/NotificationSettingTab";
import PrivacySettingTab from "../../components/dashboard/company-settings/settings-tabs/PrivacySettingTab";
import SocialLinkSettingTab from "../../components/dashboard/company-settings/settings-tabs/SocialLinkSettingTab";
import DashboardCompanySettingsHeader from "../../components/dashboard/dashboard-nav/header/DashboardCompanySettingsHeader";
import {
  useGetMyCompanyQuery,
  useUpdateCompanySettingsMutation,
} from "../../redux/feature/company/companyApi";

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
  const [companyId, setCompanyId] = useState<string | null>(null);

  const {
    data: companyData,
    isLoading: isLoadingCompany,
    error: companyError,
  } = useGetMyCompanyQuery(undefined, {
    skip: false,
  });

  const [updateCompanySettings, { isLoading: isSaving }] =
    useUpdateCompanySettingsMutation();

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
      billingEmail: "",
      autoRenew: true,
    },
  });

  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  // ====== load company data when it's fetched =====>
  useEffect(() => {
    if (companyData?.data) {
      const company = companyData.data;
      setCompanyId(company.id);

      // ==== map company data to settings =======>
      setSettings((prev) => ({
        ...prev,
        billing: {
          ...prev.billing,
          billingEmail: company.contactEmail || "",
        },
        //  ====== you can add more mappings here when settings are stored in the database =====>
      }));

      // ==== set social links ====>
      if (company.socialLinks) {
        setSocialLinks(company.socialLinks);
      }
    }
  }, [companyData]);

  const handleSaveSettings = async () => {
    if (!companyId) {
      toast.error("Company not found");
      return;
    }

    try {
      // ======= strip React elements (icons) from socialLinks before sending to API =====>
      const socialLinksData = socialLinks.map(({ id, platform, url }) => ({
        id,
        platform,
        url,
      }));

      await updateCompanySettings({
        companyId,
        ...settings,
        socialLinks: socialLinksData,
      }).unwrap();

      toast.success("Settings saved successfully");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.data?.errorSources?.message ||
          "Failed to save settings",
      );
    }
  };

  const handleSocialLinksChange = (links: any[]) => {
    setSocialLinks(links);
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

  if (isLoadingCompany) {
    return (
      <div className="bg-primary/2 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">
            Loading company settings...
          </div>
        </div>
      </div>
    );
  }

  if (companyError || !companyData?.data) {
    return (
      <div className="bg-primary/2 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-destructive mb-2">
            Failed to load company settings
          </div>
          <div className="text-muted-foreground text-sm">
            {companyError ? "Please try again later" : "Company not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary/2 min-h-screen">
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

          <SocialLinkSettingTab
            socialLinks={socialLinks}
            onSocialLinksChange={handleSocialLinksChange}
          />

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
