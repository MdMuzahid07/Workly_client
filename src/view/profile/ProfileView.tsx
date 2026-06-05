/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AdditionalInfo } from "@/components/main/profile/AdditionalInfo";
import EducationList from "@/components/main/profile/EducationList";
import ExperienceList from "@/components/main/profile/ExperienceList";
import { PortfolioSection } from "@/components/main/profile/PortfolioSection";
import { ProjectList } from "@/components/main/profile/ProjectList";
import { SectionCard } from "@/components/main/profile/SectionCard";
import { SkillsManager } from "@/components/main/profile/SkillsManager";
import { VolunteerSection } from "@/components/main/profile/VolunteerSection";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/feature/profile/profileApi";
import {
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Info,
  LayoutGrid,
  Loader2,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import JobPreference from "../../components/main/profile/JobPreference";
import ProfileSkeleton from "../../skeleton/profile/overview/ProfileSkeleton";

import { BasicInfoForm } from "@/components/dashboard/profile-tabs/forms/BasicInfoForm";
import { CertificationForm } from "@/components/dashboard/profile-tabs/forms/CertificationForm";
import { EducationForm } from "@/components/dashboard/profile-tabs/forms/EducationForm";
import { ExperienceForm } from "@/components/dashboard/profile-tabs/forms/ExperienceForm";
import { ProjectForm } from "@/components/dashboard/profile-tabs/forms/ProjectForm";
import { SocialLinksForm } from "@/components/dashboard/profile-tabs/forms/SocialLinksForm";
import { VideoResumeForm } from "@/components/dashboard/profile-tabs/forms/VideoResumeForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddressForm } from "../../components/dashboard/profile-tabs/forms/AddressForm";
import { AwardForm } from "../../components/dashboard/profile-tabs/forms/AwardForm";
import { JobPreferenceForm } from "../../components/dashboard/profile-tabs/forms/JobPreferenceForm";
import { LanguageForm } from "../../components/dashboard/profile-tabs/forms/LanguageForm";
import { PublicationForm } from "../../components/dashboard/profile-tabs/forms/PublicationForm";
import { ReferenceForm } from "../../components/dashboard/profile-tabs/forms/ReferenceForm";
import { SoftSkillsForm } from "../../components/dashboard/profile-tabs/forms/SoftSkillsForm";
import { VolunteerForm } from "../../components/dashboard/profile-tabs/forms/VolunteerForm";
import { Button } from "../../components/ui/button";

const createLocalProfile = (userData: any) => ({
  ...userData.profile,
  fullName: userData.fullName,
  email: userData.email,
  phone: userData.phone,
});

const stableStringify = (value: any): string => {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .filter((key) => value[key] !== undefined)
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
};

const ProfileView = () => {
  const [activeModal, setActiveModal] = useState<
    | "basic"
    | "education"
    | "experience"
    | "project"
    | "certification"
    | "social"
    | "address"
    | "volunteer"
    | "award"
    | "publication"
    | "reference"
    | "softSkill"
    | "language"
    | "jobPreference"
    | "video"
    | null
  >(null);

  const { data, isLoading } = useGetProfileQuery(undefined);
  const user = data?.data;

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Local state to track all changes before global save
  const [localProfile, setLocalProfile] = useState<any>(null);
  const [savedProfile, setSavedProfile] = useState<any>(null);

  // Initialize local state when data loads
  useEffect(() => {
    if (user && !localProfile) {
      const initialProfile = createLocalProfile(user);
      setLocalProfile(initialProfile);
      setSavedProfile(initialProfile);
    }
  }, [user, localProfile]);

  const hasUnsavedChanges = useMemo(() => {
    if (!localProfile || !savedProfile) return false;

    return stableStringify(localProfile) !== stableStringify(savedProfile);
  }, [localProfile, savedProfile]);

  const handleGlobalSave = async () => {
    if (!hasUnsavedChanges || !localProfile) return;

    try {
      await updateProfile(localProfile).unwrap();
      setSavedProfile(localProfile);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save profile:", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const updateLocalSection = (section: string, data: any) => {
    setLocalProfile((prev: any) => ({
      ...prev,
      [section]: data,
    }));
    setActiveModal(null);
  };

  const handleAddTechnicalSkill = (skillData: {
    skillName: string;
    experienceYears: number;
    type: "HARD";
  }) => {
    setLocalProfile((prev: any) => {
      const prevSkills = prev?.skills || [];
      const exists = prevSkills.some(
        (skill: any) =>
          (skill?.skillName || skill?.skill || "").toLowerCase() ===
            skillData.skillName.toLowerCase() && skill?.type !== "SOFT",
      );

      if (exists) return prev;

      return {
        ...prev,
        skills: [...prevSkills, skillData],
      };
    });
  };

  const handleRemoveSkill = (idOrIndex: string | number) => {
    setLocalProfile((prev: any) => {
      const prevSkills = prev?.skills || [];
      const nextSkills =
        typeof idOrIndex === "string"
          ? prevSkills.filter((skill: any) => skill.id !== idOrIndex)
          : prevSkills.filter((_: any, index: number) => index !== idOrIndex);

      return { ...prev, skills: nextSkills };
    });
  };

  const handleRemoveLanguage = (idOrIndex: string | number) => {
    setLocalProfile((prev: any) => {
      const prevLanguages = prev?.languages || [];
      const nextLanguages =
        typeof idOrIndex === "string"
          ? prevLanguages.filter((lang: any) => lang.id !== idOrIndex)
          : prevLanguages.filter(
              (_: any, index: number) => index !== idOrIndex,
            );

      return { ...prev, languages: nextLanguages };
    });
  };

  const calculateProgress = () => {
    let progress = 20; // Base: Account Created
    if (localProfile?.avatarUrl) progress += 5;
    if (localProfile?.bio) progress += 5;
    if (localProfile?.location) progress += 5;
    if (localProfile?.headline) progress += 5;
    if (localProfile?.skills?.length > 0) progress += 10;
    if (localProfile?.education?.length > 0) progress += 10;
    if (localProfile?.workExperiences?.length > 0) progress += 10;
    if (localProfile?.projects?.length > 0) progress += 5;
    if (localProfile?.volunteers?.length > 0) progress += 5;
    if (localProfile?.awards?.length > 0) progress += 5;
    if (localProfile?.publications?.length > 0) progress += 5;
    if (localProfile?.references?.length > 0) progress += 5;
    if (localProfile?.languages?.length > 0) progress += 5;
    if (localProfile?.address) progress += 5;
    if (localProfile?.preference) progress += 5;
    return Math.min(progress, 100);
  };

  const progress = calculateProgress();

  if (isLoading && !data) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="bg-background mt-16 min-h-screen pt-8 pb-20">
      <div className="space-y-8 px-4 md:px-6">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="border-primary/20 relative h-32 w-32 overflow-hidden rounded-full border-2 sm:h-16 sm:w-16">
              {user?.profile?.avatarUrl ? (
                <Image
                  src={user?.profile?.avatarUrl || "/placeholder.svg"}
                  alt="User"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="bg-primary/10 text-primary flex h-full w-full items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-foreground text-2xl font-bold">
                Complete Your Profile Now!
              </h1>
              <p className="text-muted-foreground">
                {user?.fullName}
                {user?.profile?.headline || "MERN Stack Developer"}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Button
                onClick={handleGlobalSave}
                disabled={!hasUnsavedChanges || isUpdating}
                className="rounded-full px-8 font-bold shadow-lg transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <div className="text-primary text-right text-xl font-bold">
                {progress}%
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <div
              className={`flex items-center gap-2 rounded-md p-3 text-sm ${progress >= 80 ? "border border-emerald-200 bg-emerald-50 text-emerald-800" : "border border-blue-200 bg-blue-50 text-blue-800"}`}
            >
              {progress >= 80 ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Info className="h-4 w-4" />
              )}
              {progress >= 80
                ? "Excellent! Your profile meets our standards - ready to apply!"
                : "New requirement: We've raised our standards! 80% profile completion is now required."}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-6 h-10 w-full justify-start overflow-x-auto border border-b bg-transparent p-0">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-primary/10 py-3"
            >
              <User className="mr-2 h-4 w-4" /> Personal & Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="data-[state=active]:bg-primary/10 py-3"
            >
              <Briefcase className="mr-2 h-4 w-4" /> Professional
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="data-[state=active]:bg-primary/10 py-3"
            >
              <GraduationCap className="mr-2 h-4 w-4" /> Education & Growth
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="data-[state=active]:bg-primary/10 py-3"
            >
              <LayoutGrid className="mr-2 h-4 w-4" /> Skills & Preferences
            </TabsTrigger>
          </TabsList>

          {/*  Personal & Portfolio Tab */}
          <TabsContent
            value="personal"
            className="animate-in fade-in-50 space-y-8 duration-300"
          >
            {/* Basic Info */}
            <SectionCard
              title="Basic Information"
              isCompleted={true}
              completionPercentage={20}
              onEdit={() => setActiveModal("basic")}
            >
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Full Name
                  </div>
                  <div className="font-medium">
                    {localProfile?.fullName || user?.fullName}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Email
                  </div>
                  <div className="font-medium">
                    {localProfile?.email || user?.email}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Phone
                  </div>
                  <div className="font-medium">
                    {localProfile?.phone || "Not provided"}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Location
                  </div>
                  <div className="font-medium">
                    {localProfile?.location || "Not provided"}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Career Objective
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed font-medium">
                    {localProfile?.bio || "No summary added."}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Portfolio Section */}
            <PortfolioSection
              videoResumeUrl={localProfile?.videoResumeUrl || ""}
              socialLinks={{
                linkedin: localProfile?.linkedInUrl || "",
                github: localProfile?.githubUrl || "",
                website: localProfile?.websiteUrl || "",
                twitter: localProfile?.twitterUrl || "",
                facebook: localProfile?.facebookUrl || "",
              }}
              onAddVideoResume={() => {
                if (!user?.isPremium) {
                  toast.error(
                    "Video Resume is a premium feature. Please upgrade your account.",
                  );
                  return;
                }
                setActiveModal("video");
              }}
              onEditSocials={() => setActiveModal("social")}
            />

            {/* Address Details */}
            <SectionCard
              title="Address Details"
              isCompleted={!!localProfile?.address}
              completionPercentage={5}
              onEdit={() => setActiveModal("address")}
            >
              {localProfile?.address ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Street Address
                    </div>
                    <div className="text-foreground text-sm font-medium">
                      {localProfile.address.street || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      City
                    </div>
                    <div className="text-foreground text-sm font-medium">
                      {localProfile.address.city || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      State / Province
                    </div>
                    <div className="text-foreground text-sm font-medium">
                      {localProfile.address.state || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Zip / Country
                    </div>
                    <div className="text-foreground text-sm font-medium">
                      {localProfile.address.zipCode &&
                      localProfile.address.country
                        ? `${localProfile.address.zipCode}, ${localProfile.address.country}`
                        : localProfile.address.zipCode ||
                          localProfile.address.country ||
                          "N/A"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground text-sm italic">
                  Add permanent and present address.
                </div>
              )}
            </SectionCard>
          </TabsContent>

          {/*  Professional Tab */}
          <TabsContent
            value="professional"
            className="animate-in fade-in-50 space-y-8 duration-300"
          >
            <ExperienceList
              experience={localProfile?.workExperiences || []}
              onAdd={() => setActiveModal("experience")}
            />
            <ProjectList
              projects={localProfile?.projects || []}
              onAdd={() => setActiveModal("project")}
            />
            <VolunteerSection
              volunteer={localProfile?.volunteers || []}
              onAdd={() => setActiveModal("volunteer")}
            />
          </TabsContent>

          {/* Education & Growth Tab */}
          <TabsContent
            value="education"
            className="animate-in fade-in-50 space-y-8 duration-300"
          >
            <EducationList
              education={localProfile?.education || []}
              certifications={localProfile?.certifications || []}
              onAdd={() => setActiveModal("education")}
              onAddCertificate={() => setActiveModal("certification")}
            />
            <AdditionalInfo
              awards={localProfile?.awards || []}
              publications={localProfile?.publications || []}
              references={localProfile?.references || []}
              onAddAward={() => setActiveModal("award")}
              onAddPublication={() => setActiveModal("publication")}
              onAddReference={() => setActiveModal("reference")}
            />
          </TabsContent>

          {/*  Skills & Preferences Tab */}
          <TabsContent
            value="skills"
            className="animate-in fade-in-50 space-y-8 duration-300"
          >
            <SkillsManager
              skills={localProfile?.skills || []}
              languages={localProfile?.languages || []}
              onAddSoftSkill={() => setActiveModal("softSkill")}
              onAddLanguage={() => setActiveModal("language")}
              onAddTechnicalSkill={handleAddTechnicalSkill}
              onRemoveSkill={handleRemoveSkill}
              onRemoveLanguage={handleRemoveLanguage}
            />

            <SectionCard
              title="Job Preferences"
              isCompleted={!!localProfile?.preference}
              completionPercentage={10}
              onEdit={() => setActiveModal("jobPreference")}
            >
              <JobPreference preferences={localProfile?.preference} />
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog
        open={!!activeModal}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {activeModal === "basic" && "Edit Basic Information"}
              {activeModal === "education" && "Add Education"}
              {activeModal === "experience" && "Add Experience"}
              {activeModal === "project" && "Add Project"}
              {activeModal === "certification" && "Add Certification"}
              {activeModal === "social" && "Edit Online Presence"}
              {activeModal === "video" && "Add Video Resume"}
              {activeModal === "address" && "Edit Address Details"}
              {activeModal === "volunteer" && "Add Volunteer Work"}
              {activeModal === "award" && "Add Honor / Award"}
              {activeModal === "publication" && "Add Publication"}
              {activeModal === "reference" && "Add Reference"}
              {activeModal === "softSkill" && "Add Soft Skill"}
              {activeModal === "language" && "Add Language"}
              {activeModal === "jobPreference" && "Edit Job Preferences"}
            </DialogTitle>
            <DialogDescription className="hidden">
              Form to manage your profile details.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {activeModal === "basic" && (
              <BasicInfoForm
                defaultValues={{
                  fullName: localProfile?.fullName || user?.fullName || "",
                  email: localProfile?.email || user?.email || "",
                  phone: localProfile?.phone || user?.phone || "",
                  location: localProfile?.location || "",
                  bio: localProfile?.bio || "",
                  headline: localProfile?.headline || "",
                }}
                onSubmit={async (data) => {
                  setLocalProfile((prev: any) => ({ ...prev, ...data }));
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "education" && (
              <EducationForm
                onSubmit={async (data) => {
                  const newEdu = [...(localProfile?.education || []), data];
                  updateLocalSection("education", newEdu);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "experience" && (
              <ExperienceForm
                onSubmit={async (data) => {
                  const newExp = [
                    ...(localProfile?.workExperiences || []),
                    data,
                  ];
                  updateLocalSection("workExperiences", newExp);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "project" && (
              <ProjectForm
                onSubmit={async (data) => {
                  const newProj = [...(localProfile?.projects || []), data];
                  updateLocalSection("projects", newProj);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "certification" && (
              <CertificationForm
                onSubmit={async (data) => {
                  const newCert = [
                    ...(localProfile?.certifications || []),
                    data,
                  ];
                  updateLocalSection("certifications", newCert);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "social" && (
              <SocialLinksForm
                defaultValues={{
                  linkedin: localProfile?.linkedInUrl || "",
                  github: localProfile?.githubUrl || "",
                  website: localProfile?.websiteUrl || "",
                  twitter: localProfile?.twitterUrl || "",
                  facebook: localProfile?.facebookUrl || "",
                }}
                onSubmit={async (data) => {
                  setLocalProfile((prev: any) => ({
                    ...prev,
                    linkedInUrl: data.linkedin,
                    githubUrl: data.github,
                    websiteUrl: data.website,
                    twitterUrl: data.twitter,
                    facebookUrl: data.facebook,
                  }));
                  setActiveModal(null);
                  toast.success(
                    "Online presence updated! Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "video" && (
              <VideoResumeForm
                defaultValues={{
                  videoUrl: localProfile?.videoResumeUrl || "",
                }}
                onSubmit={async (data) => {
                  setLocalProfile((prev: any) => ({
                    ...prev,
                    videoResumeUrl: data.videoUrl,
                  }));
                  setActiveModal(null);
                  toast.success(
                    "Video resume updated! Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "softSkill" && (
              <SoftSkillsForm
                onSubmit={(data) => {
                  const newSkills = [
                    ...(localProfile?.skills || []),
                    {
                      skillName: data.skill,
                      experienceYears: 0,
                      type: "SOFT",
                    },
                  ];
                  updateLocalSection("skills", newSkills);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "language" && (
              <LanguageForm
                onSubmit={(data) => {
                  const newLangs = [...(localProfile?.languages || []), data];
                  updateLocalSection("languages", newLangs);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "address" && (
              <AddressForm
                defaultValues={
                  localProfile?.address?.presentAddress
                    ? localProfile.address
                    : { presentAddress: localProfile?.address }
                }
                onSubmit={async (data) => {
                  const flattenedAddress = {
                    ...data.presentAddress,
                  };
                  setLocalProfile((prev: any) => ({
                    ...prev,
                    address: flattenedAddress,
                  }));
                  toast.success(
                    "Address updated locally. Click 'Save Changes' to persist.",
                  );
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "volunteer" && (
              <VolunteerForm
                onSubmit={async (data) => {
                  const newVol = [...(localProfile?.volunteers || []), data];
                  updateLocalSection("volunteers", newVol);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "award" && (
              <AwardForm
                onSubmit={async (data) => {
                  const newAward = [...(localProfile?.awards || []), data];
                  updateLocalSection("awards", newAward);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "publication" && (
              <PublicationForm
                onSubmit={async (data) => {
                  const newPub = [...(localProfile?.publications || []), data];
                  updateLocalSection("publications", newPub);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "reference" && (
              <ReferenceForm
                onSubmit={async (data) => {
                  const newRef = [...(localProfile?.references || []), data];
                  updateLocalSection("references", newRef);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "jobPreference" && (
              <JobPreferenceForm
                defaultValues={localProfile?.preference || {}}
                onSubmit={async (data) => {
                  setLocalProfile((prev: any) => ({
                    ...prev,
                    preference: data,
                  }));
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileView;
