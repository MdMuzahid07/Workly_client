/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Loading from "../../app/loading";
import DashboardCompanyProfileHeader from "../../components/dashboard/dashboard-nav/header/DashboardCompanyProfileHeader";
import CompanyProfileBenefitsTab from "../../components/dashboard/profile-tabs/CompanyProfileBenefitsTab";
import CompanyProfileCultureValuesTab from "../../components/dashboard/profile-tabs/CompanyProfileCultureValuesTab";
import CompanyProfileDetailsTab from "../../components/dashboard/profile-tabs/CompanyProfileDetailsTab";
import CompanyProfileMediaTabs from "../../components/dashboard/profile-tabs/CompanyProfileMediaTabs";
import CompanyProfileOverviewTab from "../../components/dashboard/profile-tabs/CompanyProfileOverviewTab";
import { Button } from "../../components/ui/button";
import {
  useGetMyCompanyQuery,
  useUpdateCompanyByIdMutation,
} from "../../redux/feature/company/companyApi";
import { CompanyBenefit } from "../../types/company-benefit";

export interface CompanyProfile {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string | { id: string; name: string } | null;
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
  mission?: string;
  values?: string[];
  benefits?: CompanyBenefit[];
  socialLinks?: Array<{ id?: string; platform: string; url: string }>;
  stats?: {
    totalEmployees: number;
    totalJobs: number;
    totalApplications: number;
    profileViews: number;
  };
  _count?: {
    employees?: number;
    jobs?: number;
  };
}

interface ApiCompanyData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  industry?: { id: string; name: string } | null;
  size?: string;
  location?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  founded?: string;
  logoUrl?: string;
  coverUrl?: string;
  isVerified?: boolean;
  verifiedAt?: string | null;
  mission?: string;
  values?: string[];
  benefits?: CompanyBenefit[];
  socialLinks?: Array<{ id?: string; platform: string; url: string }>;
  _count?: {
    employees?: number;
    jobs?: number;
  };
}

const DEFAULT_PROFILE: CompanyProfile = {
  id: "",
  name: "",
  slug: "",
  description: "",
  industry: null,
  size: "",
  location: "",
  websiteUrl: "",
  contactEmail: "",
  contactPhone: "",
  founded: "",
  logoUrl: "",
  coverUrl: "",
  isVerified: false,
  verifiedAt: null,
  mission: "",
  values: [],
  benefits: [],
  socialLinks: [],
  stats: {
    totalEmployees: 0,
    totalJobs: 0,
    totalApplications: 0,
    profileViews: 0,
  },
};

// ==== format date for input field =====>
const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toISOString().split("T")[0];
  } catch {
    return dateString;
  }
};

// ====== parse benefits from API response =====>
const parseBenefitsFromApi = (benefits: any[]): CompanyBenefit[] => {
  if (!benefits || !Array.isArray(benefits)) return [];

  return benefits.map((benefit: any) => ({
    id:
      benefit.id ||
      `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: benefit.title || "",
    description: benefit.description || "",
    category: benefit.category || "",
    icon: benefit.icon || "award",
    isActive: benefit.isActive ?? true,
    createdAt: benefit.createdAt ? new Date(benefit.createdAt) : undefined,
    updatedAt: benefit.updatedAt ? new Date(benefit.updatedAt) : undefined,
  }));
};

// ===== prepare benefits for API payload ===>
const prepareBenefitsForApi = (benefits: CompanyBenefit[]): any[] => {
  return benefits.map((benefit) => ({
    title: benefit.title,
    description: benefit.description || undefined,
    category: benefit.category || undefined,
    icon: benefit.icon || undefined,
    isActive: benefit.isActive,
  }));
};

const ManageCompanyProfileView = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyProfile, setCompanyProfile] =
    useState<CompanyProfile>(DEFAULT_PROFILE);
  const [editedProfile, setEditedProfile] =
    useState<CompanyProfile>(DEFAULT_PROFILE);
  const [socialLinks, setSocialLinks] = useState<
    Array<{ id?: string; platform: string; url: string }>
  >([]);
  const [benefits, setBenefits] = useState<CompanyBenefit[]>([]);

  const {
    data: companyData,
    isLoading: isLoadingCompany,
    error: companyError,
    refetch: refetchCompany,
  } = useGetMyCompanyQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const [updateCompany, { isLoading: isSaving }] =
    useUpdateCompanyByIdMutation();

  // ===== map API data to frontend structure ===>
  const mapApiDataToProfile = useCallback(
    (company: ApiCompanyData): CompanyProfile => {
      return {
        id: company.id,
        name: company.name || "",
        slug: company.slug || "",
        description: company.description || "",
        industry: company.industry || null,
        size: company.size || "",
        location: company.location || "",
        websiteUrl: company.websiteUrl || "",
        contactEmail: company.contactEmail || "",
        contactPhone: company.contactPhone || "",
        founded: formatDateForInput(company.founded),
        logoUrl: company.logoUrl || "",
        coverUrl: company.coverUrl || "",
        isVerified: company.isVerified || false,
        verifiedAt: company.verifiedAt || null,
        mission: company.mission || "",
        values: company.values || [],
        benefits: parseBenefitsFromApi(company.benefits || []),
        socialLinks: company.socialLinks || [],
        stats: {
          totalEmployees: company._count?.employees || 0,
          totalJobs: company._count?.jobs || 0,
          totalApplications: 0,
          profileViews: 0,
        },
      };
    },
    [],
  );

  // ===== initialize data from API ====>
  useEffect(() => {
    if (companyData?.data) {
      const company = companyData.data;
      setCompanyId(company.id);

      const mappedProfile = mapApiDataToProfile(company);

      setCompanyProfile(mappedProfile);
      setEditedProfile(mappedProfile);
      setSocialLinks(company.socialLinks || []);
      setBenefits(parseBenefitsFromApi(company.benefits));
    }
  }, [companyData, mapApiDataToProfile]);

  // ===== extract industry ID from industry field ===>
  const extractIndustryId = useCallback((industry: any): string | undefined => {
    if (!industry) return undefined;

    if (typeof industry === "string") {
      return industry;
    }

    if (typeof industry === "object" && industry.id) {
      return industry.id;
    }

    return undefined;
  }, []);

  const handleSave = useCallback(async () => {
    if (!companyId) {
      toast.error("Company not found");
      return;
    }

    try {
      // ==== prepare social links =====>
      const socialLinksData = socialLinks.map(({ id, platform, url }) => ({
        id,
        platform,
        url,
      }));

      const benefitsData = prepareBenefitsForApi(benefits);

      // ===== prepare update payload ====>
      const updatePayload: any = {
        name: editedProfile.name,
        description: editedProfile.description,
        location: editedProfile.location,
        websiteUrl: editedProfile.websiteUrl,
        contactEmail: editedProfile.contactEmail,
        contactPhone: editedProfile.contactPhone,
        founded: editedProfile.founded,
        logoUrl: editedProfile.logoUrl,
        coverUrl: editedProfile.coverUrl,
        size: editedProfile.size,
        mission: editedProfile.mission,
        values: editedProfile.values || [],
        socialLinks: socialLinksData,
        benefits: benefitsData,
      };

      // ====== add industry ID if present ====>
      const industryId = extractIndustryId(editedProfile.industry);
      if (industryId) {
        updatePayload.industryId = industryId;
      }

      // ==== update company ====>
      await updateCompany({
        companyId,
        ...updatePayload,
      }).unwrap();

      //  ==== refetch to get updated data=====>
      await refetchCompany();

      toast.success("Company profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(
        error?.data?.message ||
          error?.data?.errorSources?.message ||
          error?.message ||
          "Failed to update company profile",
      );
    }
  }, [
    companyId,
    socialLinks,
    benefits,
    editedProfile,
    extractIndustryId,
    updateCompany,
    refetchCompany,
  ]);

  const handleCancel = useCallback(() => {
    setEditedProfile(companyProfile);
    setSocialLinks(companyProfile.socialLinks || []);
    setBenefits(companyProfile.benefits || []);
    setIsEditing(false);
  }, [companyProfile]);

  // ===== update a field in edited profile ===>
  const updateField = useCallback((field: keyof CompanyProfile, value: any) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleMissionChange = useCallback(
    (mission: string) => {
      updateField("mission", mission);
    },
    [updateField],
  );

  const handleValuesChange = useCallback(
    (values: string[]) => {
      updateField("values", values);
    },
    [updateField],
  );

  const handleBenefitsChange = useCallback(
    (updatedBenefits: CompanyBenefit[]) => {
      setBenefits(updatedBenefits);
      updateField("benefits", updatedBenefits);
    },
    [updateField],
  );

  const handleSocialLinksChange = useCallback(
    (links: Array<{ id?: string; platform: string; url: string }>) => {
      setSocialLinks(links);
      updateField("socialLinks", links);
    },
    [updateField],
  );

  // ======= current profile based on editing mode ====>
  const currentProfile = useMemo(
    () => (isEditing ? editedProfile : companyProfile),
    [isEditing, editedProfile, companyProfile],
  );

  if (isLoadingCompany) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Error state
  if (companyError || !companyData?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-destructive mb-2">
            Failed to load company profile
          </div>
          <div className="text-muted-foreground mb-4 text-sm">
            {companyError ? "Please try again later" : "Company not found"}
          </div>
          <Button onClick={() => refetchCompany()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Company Details" },
    { id: "benefits", label: "Benefits" },
    { id: "culture", label: "Culture & Values" },
    { id: "media", label: "Media & Branding" },
  ] as const;

  return (
    <div className="bg-background min-h-screen">
      <DashboardCompanyProfileHeader
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        isSaving={isSaving}
        handleSave={handleSave}
        handleCancel={handleCancel}
        currentProfile={currentProfile}
      />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="overflow-x-auto">
            <TabsList className="bg-muted/50 inline-flex w-full min-w-fit p-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-background data-[state=active]:text-foreground flex-1 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors data-[state=active]:shadow-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
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
          />
        </Tabs>
      </div>
    </div>
  );
};

export default ManageCompanyProfileView;
