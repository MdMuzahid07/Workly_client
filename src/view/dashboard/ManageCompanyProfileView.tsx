/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROFILE_TABS } from "@/constants/company-mock-data";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import Loading from "../../app/loading";
import DashboardCompanyProfileHeader from "../../components/dashboard/dashboard-nav/header/DashboardCompanyProfileHeader";
import CompanyProfileBenefitsTab from "../../components/dashboard/profile-tabs/CompanyProfileBenefitsTab";
import CompanyProfileCultureValuesTab from "../../components/dashboard/profile-tabs/CompanyProfileCultureValuesTab";
import CompanyProfileDetailsTab from "../../components/dashboard/profile-tabs/CompanyProfileDetailsTab";
import CompanyProfileMediaTabs from "../../components/dashboard/profile-tabs/CompanyProfileMediaTabs";
import CompanyProfileOverviewTab from "../../components/dashboard/profile-tabs/CompanyProfileOverviewTab";
import { ProfileHeader } from "../../components/dashboard/profile-tabs/ProfileHeader";

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
    handleCultureSummaryChange,
    handleValuesChange,
    handleBenefitsChange,
    handleSocialLinksChange,
    socialLinks,
  } = useCompanyProfile();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
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

      <div className="mt-16 px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile completion header */}
        <ProfileHeader profileCompletion={profileCompletion} />

        {/* Tab navigation and content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full space-y-8"
        >
          {/* Tab list */}
          <div className="scrollbar-none -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <TabsList className="bg-muted/40 border-border h-10 w-full justify-start rounded-full border p-0">
              {PROFILE_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-primary/10 flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold tracking-tight transition-all duration-300"
                >
                  <tab.icon className="text-muted-foreground group-data-[state=active]:text-primary h-4.5 w-4.5 transition-colors" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab content */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CompanyProfileOverviewTab
              currentProfile={currentProfile}
              isEditing={isEditing}
              updateField={updateField as any}
              editedProfile={editedProfile}
            />

            <CompanyProfileDetailsTab
              currentProfile={currentProfile}
              isEditing={isEditing}
              updateField={updateField as any}
              editedProfile={editedProfile}
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
              onCultureSummaryChange={handleCultureSummaryChange}
              onValuesChange={handleValuesChange}
              initialValues={currentProfile.values}
            />

            <CompanyProfileMediaTabs
              isEditing={isEditing}
              currentProfile={currentProfile}
              updateField={updateField as any}
              editedProfile={editedProfile}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageCompanyProfileView;
