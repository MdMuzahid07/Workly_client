/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CompanyProfile } from "@/types/company-profile";
import { PROFILE_TABS } from "@/constants/company-mock-data";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import CompanyProfileSkeleton from "@/skeleton/dashboard/employer/company-profile/CompanyProfileSkeleton";
import DashboardCompanyProfileHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardCompanyProfileHeader";
import CompanyProfileBenefitsTab from "../../../../components/dashboard/profile-tabs/CompanyProfileBenefitsTab";
import CompanyProfileCultureValuesTab from "../../../../components/dashboard/profile-tabs/CompanyProfileCultureValuesTab";
import CompanyProfileDetailsTab from "../../../../components/dashboard/profile-tabs/CompanyProfileDetailsTab";
import CompanyProfileMediaTabs from "../../../../components/dashboard/profile-tabs/CompanyProfileMediaTabs";
import CompanyProfileOverviewTab from "../../../../components/dashboard/profile-tabs/CompanyProfileOverviewTab";
import { ProfileHeader } from "../../../../components/dashboard/profile-tabs/ProfileHeader";

/**
 * Main view component for managing company profile
 * Handles the overall layout and tab navigation for company profile management
 */
const ManageCompanyProfileView = () => {
  // Use custom hook for all business logic and state management
  const {
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    currentProfile,
    editedProfile,
    isLoading,
    isSaving,
    profileCompletion,
    handleSave,
    handleCancel,
    updateField,
    handleMissionChange,
    handleValuesChange,
    handleBenefitsChange,
    handleSocialLinksChange,
    socialLinks,
  } = useCompanyProfile();

  // Loading state
  if (isLoading || !currentProfile) {
    return <CompanyProfileSkeleton />;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header with edit/save controls */}
      <DashboardCompanyProfileHeader
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        isSaving={isSaving}
        handleSave={handleSave}
        handleCancel={handleCancel}
        currentProfile={currentProfile}
      />

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile completion header */}
        <ProfileHeader profileCompletion={profileCompletion} />

        {/* Tab navigation and content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full space-y-8"
        >
          {/* Tab list */}
          <TabsList className="bg-muted/40 border-border scrollbar-none flex h-11 w-full flex-nowrap justify-start gap-1 overflow-x-auto rounded-full border p-1 sm:h-12">
            {PROFILE_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground inline-flex h-full shrink-0 items-center gap-2 rounded-full px-5 text-xs font-bold tracking-tight whitespace-nowrap transition-all duration-300 sm:px-6 sm:text-sm"
              >
                <tab.icon className="h-4 w-4 shrink-0 transition-colors" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CompanyProfileOverviewTab
              currentProfile={currentProfile}
              isEditing={isEditing}
              updateField={updateField as any}
              editedProfile={editedProfile as Partial<CompanyProfile>}
            />

            <CompanyProfileDetailsTab
              currentProfile={currentProfile}
              isEditing={isEditing}
              updateField={updateField as any}
              editedProfile={editedProfile as Partial<CompanyProfile>}
              socialLinks={socialLinks}
              onSocialLinksChange={handleSocialLinksChange}
            />

            <CompanyProfileBenefitsTab
              currentProfile={currentProfile}
              isEditing={isEditing}
              onBenefitsChange={handleBenefitsChange}
            />

            <CompanyProfileCultureValuesTab
              currentProfile={currentProfile}
              isEditing={isEditing}
              onMissionChange={handleMissionChange}
              onValuesChange={handleValuesChange}
              initialValues={currentProfile.values}
            />

            <CompanyProfileMediaTabs
              isEditing={isEditing}
              currentProfile={currentProfile}
              updateField={updateField as any}
              editedProfile={editedProfile as Partial<CompanyProfile>}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageCompanyProfileView;
