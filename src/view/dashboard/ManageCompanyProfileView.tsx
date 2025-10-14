/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import DashboardCompanyProfileHeader from "../../components/dashboard/dashboard-nav/header/DashboardCompanyProfileHeader";
import CompanyProfileCultureValuesTab from "../../components/dashboard/profile-tabs/CompanyProfileCultureValuesTab";
import CompanyProfileDetailsTab from "../../components/dashboard/profile-tabs/CompanyProfileDetailsTab";
import CompanyProfileMediaTabs from "../../components/dashboard/profile-tabs/CompanyProfileMediaTabs";
import CompanyProfileOverviewTab from "../../components/dashboard/profile-tabs/CompanyProfileOverviewTab";

export interface CompanyProfile {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
  founded: string;
  logoUrl: string;
  coverUrl: string;
  isVerified: boolean;
  verifiedAt: string | null;
  mission: string;
  values: string[];
  benefits: string[];
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    facebook: string;
  };
  stats: {
    totalEmployees: number;
    totalJobs: number;
    totalApplications: number;
    profileViews: number;
  };
}

const ManageCompanyProfileView = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // fake data
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    id: "1",
    name: "TechFlow Inc.",
    slug: "techflow-inc",
    description:
      "Leading software development company specializing in web applications and cloud solutions. We're passionate about creating innovative technology that solves real-world problems and helps businesses thrive in the digital age.",
    industry: "Technology",
    size: "100-500 employees",
    location: "San Francisco, CA",
    websiteUrl: "https://techflow.com",
    contactEmail: "contact@techflow.com",
    contactPhone: "+1 (555) 123-4567",
    founded: "2018",
    logoUrl: "/generic-company-logo.png",
    coverUrl: "",
    isVerified: true,
    verifiedAt: "2023-06-15T10:30:00Z",
    mission:
      "To empower businesses through cutting-edge technology solutions that drive growth and innovation.",
    values: [
      "Innovation First",
      "Customer Success",
      "Team Collaboration",
      "Quality Excellence",
      "Continuous Learning",
    ],
    benefits: [
      "Health Insurance",
      "Remote Work",
      "Flexible Hours",
      "Professional Development",
      "Stock Options",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/techflow",
      twitter: "https://twitter.com/techflow",
      github: "https://github.com/techflow",
      facebook: "",
    },
    stats: {
      totalEmployees: 250,
      totalJobs: 12,
      totalApplications: 156,
      profileViews: 1240,
    },
  });

  const [editedProfile, setEditedProfile] =
    useState<CompanyProfile>(companyProfile);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCompanyProfile(editedProfile);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditedProfile(companyProfile);
    setIsEditing(false);
  };

  const updateField = (field: keyof CompanyProfile, value: any) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addValue = (newValue: string) => {
    if (newValue.trim() && !editedProfile.values.includes(newValue.trim())) {
      setEditedProfile((prev) => ({
        ...prev,
        values: [...prev.values, newValue.trim()],
      }));
    }
  };

  const removeValue = (valueToRemove: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      values: prev.values.filter((value) => value !== valueToRemove),
    }));
  };

  const addBenefit = (newBenefit: string) => {
    if (
      newBenefit.trim() &&
      !editedProfile.benefits.includes(newBenefit.trim())
    ) {
      setEditedProfile((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((benefit) => benefit !== benefitToRemove),
    }));
  };

  const currentProfile = isEditing ? editedProfile : companyProfile;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <DashboardCompanyProfileHeader
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        isSaving={isSaving}
        handleSave={handleSave}
        handleCancel={handleCancel}
        currentProfile={currentProfile}
      />

      <div className="container mx-auto px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="overflow-x-auto">
            <TabsList className="grid w-full min-w-[600px] grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Company Details</TabsTrigger>
              <TabsTrigger value="culture">Culture & Values</TabsTrigger>
              <TabsTrigger value="media">Media & Branding</TabsTrigger>
            </TabsList>
          </div>

          <CompanyProfileOverviewTab
            currentProfile={currentProfile}
            isEditing={isEditing}
            updateField={updateField}
            editedProfile={editedProfile}
          />

          <CompanyProfileDetailsTab
            currentProfile={currentProfile}
            isEditing={isEditing}
            updateField={updateField}
            editedProfile={editedProfile}
          />

          <CompanyProfileCultureValuesTab
            currentProfile={currentProfile}
            isEditing={isEditing}
            addValue={addValue}
            removeValue={removeValue}
            addBenefit={addBenefit}
            removeBenefit={removeBenefit}
          />

          <CompanyProfileMediaTabs
            isEditing={isEditing}
            currentProfile={currentProfile}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default ManageCompanyProfileView;
