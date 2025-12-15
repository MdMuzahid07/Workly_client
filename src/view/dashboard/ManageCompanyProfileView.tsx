/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardCompanyProfileHeader from "../../components/dashboard/dashboard-nav/header/DashboardCompanyProfileHeader";
import CompanyProfileCultureValuesTab from "../../components/dashboard/profile-tabs/CompanyProfileCultureValuesTab";
import CompanyProfileDetailsTab from "../../components/dashboard/profile-tabs/CompanyProfileDetailsTab";
import CompanyProfileMediaTabs from "../../components/dashboard/profile-tabs/CompanyProfileMediaTabs";
import CompanyProfileOverviewTab from "../../components/dashboard/profile-tabs/CompanyProfileOverviewTab";
import {
  useGetMyCompanyQuery,
  useUpdateCompanyByIdMutation,
} from "../../redux/feature/company/companyApi";

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
  benefits?:
    | Array<{ id?: string; title: string; description?: string }>
    | string[];
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

const ManageCompanyProfileView = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const {
    data: companyData,
    isLoading: isLoadingCompany,
    error: companyError,
  } = useGetMyCompanyQuery(undefined, {
    skip: false,
  });

  const [updateCompany, { isLoading: isSaving }] =
    useUpdateCompanyByIdMutation();

  const defaultProfile: CompanyProfile = {
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

  const [companyProfile, setCompanyProfile] =
    useState<CompanyProfile>(defaultProfile);
  const [editedProfile, setEditedProfile] =
    useState<CompanyProfile>(defaultProfile);
  const [socialLinks, setSocialLinks] = useState<
    Array<{ id?: string; platform: string; url: string }>
  >([]);

  useEffect(() => {
    if (companyData?.data) {
      const company = companyData.data;
      setCompanyId(company.id);

      let formattedFounded = "";
      if (company.founded) {
        try {
          const date = new Date(company.founded);
          formattedFounded = date.toISOString().split("T")[0];
        } catch {
          formattedFounded = company.founded;
        }
      }

      // ============= map backend data to frontend structure =====>
      const mappedProfile: CompanyProfile = {
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
        founded: formattedFounded,
        logoUrl: company.logoUrl || "",
        coverUrl: company.coverUrl || "",
        isVerified: company.isVerified || false,
        verifiedAt: company.verifiedAt
          ? new Date(company.verifiedAt).toISOString()
          : null,
        mission: company.mission || "",
        values: company.values || [],
        benefits: company.benefits?.map((b: any) => b.title || b) || [],
        socialLinks: company.socialLinks || [],
        stats: {
          totalEmployees: company._count?.employees || 0,
          totalJobs: company._count?.jobs || 0,
          totalApplications: 0,
          profileViews: 0,
        },
      };

      setCompanyProfile(mappedProfile);
      setEditedProfile(mappedProfile);

      // ======= set social links separately =====>
      if (company.socialLinks) {
        setSocialLinks(company.socialLinks);
      }
    }
  }, [companyData]);

  const handleSave = async () => {
    if (!companyId) {
      toast.error("Company not found");
      return;
    }

    try {
      // ==== strip React elements (icons) from socialLinks before sending to API ====>
      const socialLinksData = socialLinks.map(({ id, platform, url }) => ({
        id,
        platform,
        url,
      }));

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
      };

      // ===== extract industryId from the industry field ======>
      //  ===== it can be: string (industryId), object with id, or null ====>
      if (editedProfile.industry) {
        if (typeof editedProfile.industry === "string") {
          // ====== if it's already a string (industryId), use it directly ===>
          updatePayload.industryId = editedProfile.industry;
        } else if (
          typeof editedProfile.industry === "object" &&
          editedProfile.industry.id
        ) {
          // ===== if it's an object with id property, extract the id ===>
          updatePayload.industryId = editedProfile.industry.id;
        }
      }

      // ====== add benefits if they exist ====>
      if (editedProfile.benefits && editedProfile.benefits.length > 0) {
        updatePayload.benefits = editedProfile.benefits.map((benefit: any) => {
          if (typeof benefit === "string") {
            return { title: benefit, isActive: true };
          }
          return benefit;
        });
      }

      await updateCompany({
        companyId,
        ...updatePayload,
      }).unwrap();

      toast.success("Company profile updated successfully");

      // ==== clean editedProfile before setting it to avoid React elements ======>
      const cleanedProfile = {
        ...editedProfile,
        socialLinks: socialLinksData,
      };

      setCompanyProfile(cleanedProfile);
      setEditedProfile(cleanedProfile);
      setIsEditing(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.data?.errorSources?.message ||
          "Failed to update company profile",
      );
    }
  };

  const handleSocialLinksChange = (
    links: Array<{ id?: string; platform: string; url: string }>,
  ) => {
    setSocialLinks(links);
    // ===== also update editedProfile to keep in sync ====>
    setEditedProfile((prev) => ({
      ...prev,
      socialLinks: links,
    }));
  };

  const handleCancel = () => {
    setEditedProfile(companyProfile);
    setSocialLinks(companyProfile.socialLinks || []);
    setIsEditing(false);
  };

  const updateField = (field: keyof CompanyProfile, value: any) => {
    setEditedProfile((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };
      return updated;
    });
  };

  const addValue = (newValue: string) => {
    const currentValues = editedProfile.values || [];
    if (newValue.trim() && !currentValues.includes(newValue.trim())) {
      setEditedProfile((prev) => ({
        ...prev,
        values: [...(prev.values || []), newValue.trim()],
      }));
    }
  };

  const removeValue = (valueToRemove: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      values: (prev.values || []).filter((value) => value !== valueToRemove),
    }));
  };

  const addBenefit = (newBenefit: string) => {
    const currentBenefits = editedProfile.benefits || [];
    const benefitStrings = currentBenefits.map((b: any) =>
      typeof b === "string" ? b : b.title || "",
    );
    if (newBenefit.trim() && !benefitStrings.includes(newBenefit.trim())) {
      setEditedProfile((prev) => {
        const prevBenefits = prev.benefits || [];
        const prevStrings = prevBenefits.map((b: any) =>
          typeof b === "string" ? b : b.title || "",
        );
        return {
          ...prev,
          benefits: [...prevStrings, newBenefit.trim()] as string[],
        };
      });
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setEditedProfile((prev) => {
      const currentBenefits = prev.benefits || [];
      const benefitStrings = currentBenefits.map((b: any) =>
        typeof b === "string" ? b : b.title || "",
      );
      const filtered = benefitStrings.filter(
        (benefit) => benefit !== benefitToRemove,
      );
      return {
        ...prev,
        benefits: filtered as string[],
      };
    });
  };

  const currentProfile = isEditing ? editedProfile : companyProfile;

  if (isLoadingCompany) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">
            Loading company profile...
          </div>
        </div>
      </div>
    );
  }

  if (companyError || !companyData?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-destructive mb-2">
            Failed to load company profile
          </div>
          <div className="text-muted-foreground text-sm">
            {companyError ? "Please try again later" : "Company not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
            socialLinks={socialLinks}
            onSocialLinksChange={handleSocialLinksChange}
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
