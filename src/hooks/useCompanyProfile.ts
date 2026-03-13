/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetMyCompanyQuery,
  useUpdateCompanyByIdMutation,
} from "@/redux/feature/company/companyApi";
import { CompanyBenefit } from "@/types/company-benefit";
import { CompanyProfile, SocialLink } from "@/types/company-profile";
import {
  calculateProfileCompletion,
  extractIndustryId,
  mapApiDataToProfile,
  parseBenefitsFromApi,
  prepareBenefitsForApi,
} from "@/utils/company-profile-utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook for managing company profile state and operations
 * Encapsulates all business logic for the company profile management view
 */
export const useCompanyProfile = () => {
  // ===== State Management =====
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null,
  );
  const [editedProfile, setEditedProfile] = useState<CompanyProfile | null>(
    null,
  );
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [benefits, setBenefits] = useState<CompanyBenefit[]>([]);

  // ===== API Integration =====
  const {
    data: companyData,
    isLoading: isLoadingCompany,
    error: companyError,
    refetch: refetchCompany,
  } = useGetMyCompanyQuery(undefined);

  const [updateCompany, { isLoading: isSaving }] =
    useUpdateCompanyByIdMutation();

  // ===== Initialize data from API =====
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
  }, [companyData]);

  // ===== Handlers =====

  /**
   * Saves the edited profile to the backend
   */
  const handleSave = useCallback(async () => {
    if (!companyId) {
      toast.error("Company not found");
      return;
    }

    try {
      if (!editedProfile) return;

      // Prepare social links
      const socialLinksData = socialLinks.map(({ id, platform, url }) => ({
        id,
        platform,
        url,
      }));

      const benefitsData = prepareBenefitsForApi(benefits);

      // Prepare update payload
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

      // Add industry ID if present
      const industryId = extractIndustryId(editedProfile.industry);
      if (industryId) {
        updatePayload.industryId = industryId;
      }

      // Update company
      await updateCompany({
        companyId,
        ...updatePayload,
      }).unwrap();

      // Refetch to get updated data
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
    updateCompany,
    refetchCompany,
  ]);

  /**
   * Cancels editing and reverts to saved profile
   */
  const handleCancel = useCallback(() => {
    if (companyProfile) {
      setEditedProfile(companyProfile);
      setSocialLinks(companyProfile.socialLinks || []);
      setBenefits(companyProfile.benefits || []);
    }
    setIsEditing(false);
  }, [companyProfile]);

  /**
   * Updates a specific field in the edited profile
   */
  const updateField = useCallback((field: keyof CompanyProfile, value: any) => {
    setEditedProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      } as CompanyProfile;
    });
  }, []);

  /**
   * Updates the company mission statement
   */
  const handleMissionChange = useCallback(
    (mission: string) => {
      updateField("mission", mission);
    },
    [updateField],
  );

  /**
   * Updates the company culture summary
   */

  /**
   * Updates the company values
   */
  const handleValuesChange = useCallback(
    (values: string[]) => {
      updateField("values", values);
    },
    [updateField],
  );

  /**
   * Updates the company benefits
   */
  const handleBenefitsChange = useCallback(
    (updatedBenefits: CompanyBenefit[]) => {
      setBenefits(updatedBenefits);
      updateField("benefits", updatedBenefits);
    },
    [updateField],
  );

  /**
   * Updates the company social links
   */
  const handleSocialLinksChange = useCallback(
    (links: SocialLink[]) => {
      setSocialLinks(links);
      updateField("socialLinks", links);
    },
    [updateField],
  );

  // ===== Computed Values =====

  /**
   * Current profile based on editing mode
   */
  const currentProfile = useMemo(
    () => (isEditing ? editedProfile : companyProfile),
    [isEditing, editedProfile, companyProfile],
  ) as CompanyProfile;

  /**
   * Profile completion percentage
   */
  const profileCompletion = useMemo(
    () => calculateProfileCompletion(currentProfile),
    [currentProfile],
  );

  // ===== Return Hook Interface =====
  return {
    // State
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    currentProfile,
    editedProfile,
    companyProfile,

    // Loading states
    isLoading: isLoadingCompany,
    isSaving,
    error: companyError,

    // Computed values
    profileCompletion,

    // Handlers
    handleSave,
    handleCancel,
    updateField,
    handleMissionChange,
    handleValuesChange,
    handleBenefitsChange,
    handleSocialLinksChange,

    // Data
    socialLinks,
    benefits,

    // Utilities
    refetchCompany,
  };
};
