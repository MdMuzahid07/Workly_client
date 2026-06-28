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
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/feature/profile/profileApi";
import { useUploadSingleFileMutation } from "@/redux/feature/upload/uploadApi";
import { calculateJobSeekerProfileCompletion } from "@/utils/profile-utils";
import {
  Briefcase,
  Camera,
  Check,
  CheckCircle2,
  GraduationCap,
  Info,
  LayoutGrid,
  Loader2,
  Star,
  User,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";
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

const createLocalProfile = (userData: any) => {
  const profile = userData.profile || {};
  const education = (profile.education || []).map((edu: any) => ({
    ...edu,
    institute: edu.institute || edu.institution || "",
    result: edu.result || edu.grade || "",
  }));
  return {
    ...profile,
    education,
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone,
  };
};

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

const formatDateForInput = (dateString?: string | Date) => {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  } catch {
    return "";
  }
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
  const [uploadSingleFile, { isLoading: isUploadingAvatar }] =
    useUploadSingleFileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadSingleFile(formData).unwrap();
      if (res.success && res.data?.url) {
        const newAvatarUrl = res.data.url;
        setLocalProfile((prev: any) => ({ ...prev, avatarUrl: newAvatarUrl }));
        toast.success("Image uploaded! Click 'Save Changes' to apply.");
      }
    } catch (err: any) {
      console.error("Failed to upload avatar:", err);
      toast.error(err?.data?.message || "Failed to upload profile picture");
    } finally {
      if (e.target) e.target.value = "";
    }
  };

  // Local state to track all changes before global save
  const [localProfile, setLocalProfile] = useState<any>(null);
  const [savedProfile, setSavedProfile] = useState<any>(null);

  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<
    number | null
  >(null);
  const [experienceToDeleteIndex, setExperienceToDeleteIndex] = useState<
    number | null
  >(null);

  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(
    null,
  );
  const [projectToDeleteIndex, setProjectToDeleteIndex] = useState<
    number | null
  >(null);

  const [editingVolunteer, setEditingVolunteer] = useState<any>(null);
  const [editingVolunteerIndex, setEditingVolunteerIndex] = useState<
    number | null
  >(null);
  const [volunteerToDeleteIndex, setVolunteerToDeleteIndex] = useState<
    number | null
  >(null);

  const [editingEdu, setEditingEdu] = useState<any>(null);
  const [editingEduIndex, setEditingEduIndex] = useState<number | null>(null);
  const [eduToDeleteIndex, setEduToDeleteIndex] = useState<number | null>(null);

  const [editingCert, setEditingCert] = useState<any>(null);
  const [editingCertIndex, setEditingCertIndex] = useState<number | null>(null);
  const [certToDeleteIndex, setCertToDeleteIndex] = useState<number | null>(
    null,
  );

  const [editingAward, setEditingAward] = useState<any>(null);
  const [editingAwardIndex, setEditingAwardIndex] = useState<number | null>(
    null,
  );
  const [awardToDeleteIndex, setAwardToDeleteIndex] = useState<number | null>(
    null,
  );

  const [editingPub, setEditingPub] = useState<any>(null);
  const [editingPubIndex, setEditingPubIndex] = useState<number | null>(null);
  const [pubToDeleteIndex, setPubToDeleteIndex] = useState<number | null>(null);

  const [editingRef, setEditingRef] = useState<any>(null);
  const [editingRefIndex, setEditingRefIndex] = useState<number | null>(null);
  const [refToDeleteIndex, setRefToDeleteIndex] = useState<number | null>(null);

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

  const progress = calculateJobSeekerProfileCompletion(localProfile);

  if (isLoading && !data) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="bg-background min-h-screen pt-3 pb-12 sm:pt-4 sm:pb-16 lg:pt-6 lg:pb-20">
      <div className="space-y-4 px-3 sm:space-y-6 sm:px-6 lg:space-y-8 lg:px-8">
        {/* Hidden File Input for Avatar Upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarUpload}
          className="hidden"
          accept="image/*"
        />

        {/* Header Profile Card */}
        <Card className="border-border bg-card/60 relative gap-0 overflow-hidden rounded-2xl border p-0 backdrop-blur-xl transition-all duration-300">
          {/* Cover Banner (Waves on mobile, delicate gradient on desktop) */}
          <div className="relative h-32 w-full overflow-hidden sm:h-20">
            {/* Mobile Unsplash Banner */}
            <div className="absolute inset-0 sm:hidden">
              <Image
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1000&auto=format&fit=crop&q=80"
                alt="Cover Banner Mobile"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Desktop Gradient Banner */}
            <div className="from-primary/15 via-primary/10 to-primary/5 absolute inset-0 hidden bg-linear-to-r sm:block" />

            {/* Progress Bar overlay (only for mobile, since desktop has it below) */}
            <Progress
              value={progress}
              className="absolute right-0 bottom-0 left-0 h-1.5 rounded-none bg-black/10 sm:hidden"
            />

            {/* Save Changes button positioned absolute top-right of cover banner on Mobile only */}
            <div className="absolute top-3 right-3 z-10 sm:hidden">
              <Button
                onClick={handleGlobalSave}
                disabled={!hasUnsavedChanges || isUpdating}
                size="sm"
                className="bg-background/80 hover:bg-background/95 text-foreground border-border/40 h-8 rounded-full border px-4 text-xs font-semibold backdrop-blur-md transition-all active:scale-95 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          <CardContent className="relative p-3 sm:p-4 md:p-6">
            {/* --- Mobile View (Centered Layout) --- */}
            <div className="flex flex-col items-center text-center sm:hidden">
              {/* Centered Overlapping Avatar */}
              <div className="relative -mt-14 mb-4 shrink-0">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group bg-background border-background relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border-[3px] ring-[3px] ring-emerald-500/90 transition-transform duration-300 hover:scale-102 dark:ring-emerald-400/90"
                >
                  {localProfile?.avatarUrl || user?.profile?.avatarUrl ? (
                    <Image
                      src={
                        localProfile?.avatarUrl ||
                        user?.profile?.avatarUrl ||
                        "/placeholder.svg"
                      }
                      alt="User"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="bg-primary/10 text-primary flex h-full w-full items-center justify-center">
                      <User className="h-12 w-12" />
                    </div>
                  )}
                  {/* Camera Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {isUploadingAvatar ? (
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    ) : (
                      <>
                        <Camera className="h-6 w-6 text-white" />
                        <span className="mt-0.5 text-[9px] font-bold tracking-wider uppercase">
                          Upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {/* Check Overlay badge */}
                <div className="border-background pointer-events-none absolute right-1 bottom-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-emerald-500 text-white">
                  <Check className="h-3 w-3 stroke-[3.5] font-extrabold text-white" />
                </div>
              </div>

              {/* Name & Headline */}
              <div className="max-w-xl space-y-1">
                <h2 className="text-foreground text-lg font-bold tracking-tight">
                  {user?.fullName || "Muzahid Seeker"}
                </h2>
                <p className="text-muted-foreground mx-auto max-w-xs text-xs leading-relaxed font-medium">
                  {user?.profile?.headline || "MERN Stack Developer"}
                </p>
              </div>

              {/* Centered Badges Row */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {/* Strength Badge */}
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-500/15 dark:text-emerald-400">
                  <Zap className="h-3.5 w-3.5 fill-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
                  <span>{progress}% Strength</span>
                </div>

                {/* Star Candidate Badge */}
                {progress >= 80 && (
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-emerald-600">
                    <Star className="h-3.5 w-3.5 fill-white text-white" />
                    <span>Top Candidate</span>
                  </div>
                )}
              </div>
            </div>

            {/* --- Tablet/Desktop View (Inline/Previous Layout) --- */}
            <div className="-mt-10 mb-0 hidden sm:flex sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group border-background bg-muted relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-full border-4 shadow-sm"
                >
                  {localProfile?.avatarUrl || user?.profile?.avatarUrl ? (
                    <Image
                      src={
                        localProfile?.avatarUrl ||
                        user?.profile?.avatarUrl ||
                        "/placeholder.svg"
                      }
                      alt="User"
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="bg-primary/10 text-primary flex h-full w-full items-center justify-center">
                      <User className="h-10 sm:h-10" />
                    </div>
                  )}
                  {/* Camera Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {isUploadingAvatar ? (
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    ) : (
                      <>
                        <Camera className="h-5 w-5 text-white" />
                        <span className="mt-0.5 text-[8px] font-bold tracking-wider uppercase">
                          Upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="min-w-0 pt-2">
                  <h2 className="text-foreground truncate text-lg font-bold tracking-tight md:text-xl">
                    {user?.fullName || "Job Seeker"}
                  </h2>
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs font-medium sm:text-sm">
                    {user?.profile?.headline || "MERN Stack Developer"}
                  </p>
                </div>
              </div>

              {/* CTA & Strength on Desktop */}
              <div className="flex shrink-0 items-center gap-3">
                <div className="bg-muted/60 border-border/50 flex items-center gap-1.5 rounded-full border px-3 py-1">
                  <span className="text-muted-foreground text-xs font-semibold">
                    Profile Strength:
                  </span>
                  <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-extrabold">
                    {progress}%
                  </div>
                </div>

                <Button
                  onClick={handleGlobalSave}
                  disabled={!hasUnsavedChanges || isUpdating}
                  size="sm"
                  className="h-8 rounded-full px-5 text-xs font-bold shadow-sm transition-all active:scale-95"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>

            {/* Progress bar and Alert banner for Tablet/Desktop below the row */}
            <div className="border-border/50 mt-4 hidden space-y-3 border-t pt-4 sm:block">
              <Progress value={progress} className="h-1.5" />
              <div
                className={`flex items-center gap-2 rounded-lg p-2.5 text-xs ${progress >= 80 ? "border border-emerald-100/50 bg-emerald-50/50 text-emerald-800 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-emerald-300" : "border border-blue-100/50 bg-blue-50/50 text-blue-800 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-blue-300"}`}
              >
                {progress >= 80 ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Info className="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                )}
                <span className="leading-none font-medium">
                  {progress >= 80
                    ? "Excellent! Your profile meets our standards - ready to apply!"
                    : "Complete 80% profile strength to start applying for jobs."}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs defaultValue="personal" className="w-full">
          <div className="scrollbar-none mb-4 w-full overflow-x-auto sm:mb-6">
            <TabsList className="bg-muted/30 border-border/50 flex h-10 w-full min-w-max gap-1 rounded-full border p-1 whitespace-nowrap lg:grid lg:h-12 lg:min-w-0 lg:grid-cols-4 lg:whitespace-normal">
              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground inline-flex h-full w-full shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-all lg:w-full lg:shrink lg:px-5 lg:text-sm"
              >
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Personal &
                Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="professional"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground inline-flex h-full w-full shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-all lg:w-full lg:shrink lg:px-5 lg:text-sm"
              >
                <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Professional
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground inline-flex h-full w-full shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-all lg:w-full lg:shrink lg:px-5 lg:text-sm"
              >
                <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{" "}
                Education & Growth
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground inline-flex h-full w-full shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-all lg:w-full lg:shrink lg:px-5 lg:text-sm"
              >
                <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Skills &
                Preferences
              </TabsTrigger>
            </TabsList>
          </div>

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
              onAdd={() => {
                setEditingExperience(null);
                setEditingExperienceIndex(null);
                setActiveModal("experience");
              }}
              onEdit={(exp, index) => {
                setEditingExperience(exp);
                setEditingExperienceIndex(index);
                setActiveModal("experience");
              }}
              onDelete={(index) => {
                setExperienceToDeleteIndex(index);
              }}
            />
            <ProjectList
              projects={localProfile?.projects || []}
              onAdd={() => {
                setEditingProject(null);
                setEditingProjectIndex(null);
                setActiveModal("project");
              }}
              onEdit={(project, index) => {
                setEditingProject(project);
                setEditingProjectIndex(index);
                setActiveModal("project");
              }}
              onDelete={(index) => {
                setProjectToDeleteIndex(index);
              }}
            />
            <VolunteerSection
              volunteer={localProfile?.volunteers || []}
              onAdd={() => {
                setEditingVolunteer(null);
                setEditingVolunteerIndex(null);
                setActiveModal("volunteer");
              }}
              onEdit={(vol, index) => {
                setEditingVolunteer(vol);
                setEditingVolunteerIndex(index);
                setActiveModal("volunteer");
              }}
              onDelete={(index) => {
                setVolunteerToDeleteIndex(index);
              }}
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
              onAdd={() => {
                setEditingEdu(null);
                setEditingEduIndex(null);
                setActiveModal("education");
              }}
              onAddCertificate={() => {
                setEditingCert(null);
                setEditingCertIndex(null);
                setActiveModal("certification");
              }}
              onEditEdu={(edu, index) => {
                setEditingEdu(edu);
                setEditingEduIndex(index);
                setActiveModal("education");
              }}
              onDeleteEdu={(index) => {
                setEduToDeleteIndex(index);
              }}
              onEditCert={(cert, index) => {
                setEditingCert(cert);
                setEditingCertIndex(index);
                setActiveModal("certification");
              }}
              onDeleteCert={(index) => {
                setCertToDeleteIndex(index);
              }}
            />
            <AdditionalInfo
              awards={localProfile?.awards || []}
              publications={localProfile?.publications || []}
              references={localProfile?.references || []}
              onAddAward={() => {
                setEditingAward(null);
                setEditingAwardIndex(null);
                setActiveModal("award");
              }}
              onAddPublication={() => {
                setEditingPub(null);
                setEditingPubIndex(null);
                setActiveModal("publication");
              }}
              onAddReference={() => {
                setEditingRef(null);
                setEditingRefIndex(null);
                setActiveModal("reference");
              }}
              onEditAward={(award, index) => {
                setEditingAward(award);
                setEditingAwardIndex(index);
                setActiveModal("award");
              }}
              onDeleteAward={(index) => {
                setAwardToDeleteIndex(index);
              }}
              onEditPublication={(pub, index) => {
                setEditingPub(pub);
                setEditingPubIndex(index);
                setActiveModal("publication");
              }}
              onDeletePublication={(index) => {
                setPubToDeleteIndex(index);
              }}
              onEditReference={(ref, index) => {
                setEditingRef(ref);
                setEditingRefIndex(index);
                setActiveModal("reference");
              }}
              onDeleteReference={(index) => {
                setRefToDeleteIndex(index);
              }}
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
        onOpenChange={(open) => {
          if (!open) {
            setActiveModal(null);
            setEditingExperience(null);
            setEditingExperienceIndex(null);
            setEditingProject(null);
            setEditingProjectIndex(null);
            setEditingVolunteer(null);
            setEditingVolunteerIndex(null);
            setEditingEdu(null);
            setEditingEduIndex(null);
            setEditingCert(null);
            setEditingCertIndex(null);
            setEditingAward(null);
            setEditingAwardIndex(null);
            setEditingPub(null);
            setEditingPubIndex(null);
            setEditingRef(null);
            setEditingRefIndex(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {activeModal === "basic" && "Edit Basic Information"}
              {activeModal === "education" &&
                (editingEduIndex !== null ? "Edit Education" : "Add Education")}
              {activeModal === "experience" &&
                (editingExperienceIndex !== null
                  ? "Edit Experience"
                  : "Add Experience")}
              {activeModal === "project" &&
                (editingProjectIndex !== null ? "Edit Project" : "Add Project")}
              {activeModal === "certification" &&
                (editingCertIndex !== null
                  ? "Edit Certification"
                  : "Add Certification")}
              {activeModal === "social" && "Edit Online Presence"}
              {activeModal === "video" && "Add Video Resume"}
              {activeModal === "address" && "Edit Address Details"}
              {activeModal === "volunteer" &&
                (editingVolunteerIndex !== null
                  ? "Edit Volunteer Work"
                  : "Add Volunteer Work")}
              {activeModal === "award" &&
                (editingAwardIndex !== null
                  ? "Edit Honor / Award"
                  : "Add Honor / Award")}
              {activeModal === "publication" &&
                (editingPubIndex !== null
                  ? "Edit Publication"
                  : "Add Publication")}
              {activeModal === "reference" &&
                (editingRefIndex !== null ? "Edit Reference" : "Add Reference")}
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
                defaultValues={
                  editingEdu
                    ? {
                        level: editingEdu.level || "",
                        degree: editingEdu.degree || "",
                        institute: editingEdu.institute || "",
                        year: editingEdu.year ? String(editingEdu.year) : "",
                        result: editingEdu.result || "",
                        currentlyStudying:
                          editingEdu.currentlyStudying ||
                          editingEdu.current ||
                          false,
                      }
                    : undefined
                }
                onSubmit={async (data) => {
                  let newEdu;
                  if (
                    editingEduIndex !== null &&
                    editingEduIndex !== undefined
                  ) {
                    const existing = (localProfile?.education || [])[
                      editingEduIndex
                    ];
                    const updatedItem = {
                      ...existing,
                      ...data,
                    };
                    newEdu = [...(localProfile?.education || [])];
                    newEdu[editingEduIndex] = updatedItem;
                  } else {
                    newEdu = [...(localProfile?.education || []), data];
                  }
                  updateLocalSection("education", newEdu);
                  setEditingEdu(null);
                  setEditingEduIndex(null);
                  toast.success(
                    editingEduIndex !== null
                      ? "Education updated locally. Click 'Save Changes' to persist."
                      : "Education added locally. Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => {
                  setActiveModal(null);
                  setEditingEdu(null);
                  setEditingEduIndex(null);
                }}
              />
            )}
            {activeModal === "experience" && (
              <ExperienceForm
                defaultValues={
                  editingExperience
                    ? {
                        designation:
                          editingExperience.jobTitle ||
                          editingExperience.designation ||
                          "",
                        company: editingExperience.company || "",
                        employmentType:
                          editingExperience.employmentType || "Full-time",
                        location: editingExperience.location || "",
                        startDate: formatDateForInput(
                          editingExperience.startDate,
                        ),
                        endDate: formatDateForInput(editingExperience.endDate),
                        currentlyWorking:
                          editingExperience.currentlyWorking ||
                          editingExperience.current ||
                          false,
                        description: editingExperience.description || "",
                      }
                    : undefined
                }
                onSubmit={async (data) => {
                  let newExp;
                  if (
                    editingExperienceIndex !== null &&
                    editingExperienceIndex !== undefined
                  ) {
                    const existing = (localProfile?.workExperiences || [])[
                      editingExperienceIndex
                    ];
                    const updatedItem = {
                      ...existing,
                      ...data,
                      jobTitle: data.designation,
                      current: data.currentlyWorking || false,
                    };
                    newExp = [...(localProfile?.workExperiences || [])];
                    newExp[editingExperienceIndex] = updatedItem;
                  } else {
                    newExp = [
                      ...(localProfile?.workExperiences || []),
                      {
                        ...data,
                        jobTitle: data.designation,
                        current: data.currentlyWorking || false,
                      },
                    ];
                  }
                  updateLocalSection("workExperiences", newExp);
                  setEditingExperience(null);
                  setEditingExperienceIndex(null);
                  toast.success(
                    editingExperienceIndex !== null
                      ? "Experience updated locally. Click 'Save Changes' to persist."
                      : "Experience added locally. Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => {
                  setActiveModal(null);
                  setEditingExperience(null);
                  setEditingExperienceIndex(null);
                }}
              />
            )}
            {activeModal === "project" && (
              <ProjectForm
                defaultValues={
                  editingProject
                    ? {
                        title: editingProject.title || "",
                        description: editingProject.description || "",
                        technologies: editingProject.technologies || [],
                        projectUrl: editingProject.projectUrl || "",
                        repoUrl: editingProject.repoUrl || "",
                        startDate: formatDateForInput(editingProject.startDate),
                        endDate: formatDateForInput(editingProject.endDate),
                      }
                    : undefined
                }
                onSubmit={async (data) => {
                  let newProj;
                  if (
                    editingProjectIndex !== null &&
                    editingProjectIndex !== undefined
                  ) {
                    const existing = (localProfile?.projects || [])[
                      editingProjectIndex
                    ];
                    const updatedItem = {
                      ...existing,
                      ...data,
                    };
                    newProj = [...(localProfile?.projects || [])];
                    newProj[editingProjectIndex] = updatedItem;
                  } else {
                    newProj = [...(localProfile?.projects || []), data];
                  }
                  updateLocalSection("projects", newProj);
                  setEditingProject(null);
                  setEditingProjectIndex(null);
                  toast.success(
                    editingProjectIndex !== null
                      ? "Project updated locally. Click 'Save Changes' to persist."
                      : "Project added locally. Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => {
                  setActiveModal(null);
                  setEditingProject(null);
                  setEditingProjectIndex(null);
                }}
              />
            )}
            {activeModal === "certification" && (
              <CertificationForm
                defaultValues={
                  editingCert
                    ? {
                        name: editingCert.name || "",
                        organization:
                          editingCert.issuingOrg ||
                          editingCert.organization ||
                          "",
                        credentialId: editingCert.credentialId || "",
                        issueDate: formatDateForInput(editingCert.issueDate),
                        expirationDate: formatDateForInput(
                          editingCert.expiryDate || editingCert.expirationDate,
                        ),
                        credentialUrl: editingCert.credentialUrl || "",
                      }
                    : undefined
                }
                onSubmit={async (data) => {
                  let newCert;
                  if (
                    editingCertIndex !== null &&
                    editingCertIndex !== undefined
                  ) {
                    const existing = (localProfile?.certifications || [])[
                      editingCertIndex
                    ];
                    const updatedItem = {
                      ...existing,
                      ...data,
                      issuingOrg: data.organization,
                      expiryDate: data.expirationDate,
                    };
                    newCert = [...(localProfile?.certifications || [])];
                    newCert[editingCertIndex] = updatedItem;
                  } else {
                    newCert = [
                      ...(localProfile?.certifications || []),
                      {
                        ...data,
                        issuingOrg: data.organization,
                        expiryDate: data.expirationDate,
                      },
                    ];
                  }
                  updateLocalSection("certifications", newCert);
                  setEditingCert(null);
                  setEditingCertIndex(null);
                  toast.success(
                    editingCertIndex !== null
                      ? "Certification updated locally. Click 'Save Changes' to persist."
                      : "Certification added locally. Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => {
                  setActiveModal(null);
                  setEditingCert(null);
                  setEditingCertIndex(null);
                }}
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
                defaultValues={
                  editingVolunteer
                    ? {
                        organization: editingVolunteer.organization || "",
                        role: editingVolunteer.role || "",
                        startDate: formatDateForInput(
                          editingVolunteer.startDate,
                        ),
                        endDate: formatDateForInput(editingVolunteer.endDate),
                        currentlyVolunteering:
                          editingVolunteer.currentlyVolunteering ||
                          editingVolunteer.current ||
                          false,
                        description: editingVolunteer.description || "",
                      }
                    : undefined
                }
                onSubmit={async (data) => {
                  let newVol;
                  if (
                    editingVolunteerIndex !== null &&
                    editingVolunteerIndex !== undefined
                  ) {
                    const existing = (localProfile?.volunteers || [])[
                      editingVolunteerIndex
                    ];
                    const updatedItem = {
                      ...existing,
                      ...data,
                      current: data.currentlyVolunteering || false,
                    };
                    newVol = [...(localProfile?.volunteers || [])];
                    newVol[editingVolunteerIndex] = updatedItem;
                  } else {
                    newVol = [
                      ...(localProfile?.volunteers || []),
                      {
                        ...data,
                        current: data.currentlyVolunteering || false,
                      },
                    ];
                  }
                  updateLocalSection("volunteers", newVol);
                  setEditingVolunteer(null);
                  setEditingVolunteerIndex(null);
                  toast.success(
                    editingVolunteerIndex !== null
                      ? "Volunteer work updated locally. Click 'Save Changes' to persist."
                      : "Volunteer work added locally. Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => {
                  setActiveModal(null);
                  setEditingVolunteer(null);
                  setEditingVolunteerIndex(null);
                }}
              />
            )}
            {activeModal === "award" && (
              <AwardForm
                defaultValues={
                  editingAward
                    ? {
                        title: editingAward.title || "",
                        organization:
                          editingAward.issuer ||
                          editingAward.organization ||
                          "",
                        date: formatDateForInput(
                          editingAward.issueDate || editingAward.date,
                        ),
                        description: editingAward.description || "",
                      }
                    : undefined
                }
                onSubmit={async (data) => {
                  let newAward;
                  if (
                    editingAwardIndex !== null &&
                    editingAwardIndex !== undefined
                  ) {
                    const existing = (localProfile?.awards || [])[
                      editingAwardIndex
                    ];
                    const updatedItem = {
                      ...existing,
                      ...data,
                      issuer: data.organization,
                      issueDate: data.date,
                    };
                    newAward = [...(localProfile?.awards || [])];
                    newAward[editingAwardIndex] = updatedItem;
                  } else {
                    newAward = [
                      ...(localProfile?.awards || []),
                      {
                        ...data,
                        issuer: data.organization,
                        issueDate: data.date,
                      },
                    ];
                  }
                  updateLocalSection("awards", newAward);
                  setEditingAward(null);
                  setEditingAwardIndex(null);
                  toast.success(
                    editingAwardIndex !== null
                      ? "Award updated locally. Click 'Save Changes' to persist."
                      : "Award added locally. Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => {
                  setActiveModal(null);
                  setEditingAward(null);
                  setEditingAwardIndex(null);
                }}
              />
            )}
            {activeModal === "publication" && (
              <PublicationForm
                defaultValues={
                  editingPub
                    ? {
                        title: editingPub.title || "",
                        publisher: editingPub.publisher || "",
                        date: formatDateForInput(
                          editingPub.publishDate || editingPub.date,
                        ),
                        url: editingPub.link || editingPub.url || "",
                        description: editingPub.description || "",
                      }
                    : undefined
                }
                onSubmit={async (data) => {
                  let newPub;
                  if (
                    editingPubIndex !== null &&
                    editingPubIndex !== undefined
                  ) {
                    const existing = (localProfile?.publications || [])[
                      editingPubIndex
                    ];
                    const updatedItem = {
                      ...existing,
                      ...data,
                      link: data.url,
                      publishDate: data.date,
                    };
                    newPub = [...(localProfile?.publications || [])];
                    newPub[editingPubIndex] = updatedItem;
                  } else {
                    newPub = [
                      ...(localProfile?.publications || []),
                      {
                        ...data,
                        link: data.url,
                        publishDate: data.date,
                      },
                    ];
                  }
                  updateLocalSection("publications", newPub);
                  setEditingPub(null);
                  setEditingPubIndex(null);
                  toast.success(
                    editingPubIndex !== null
                      ? "Publication updated locally. Click 'Save Changes' to persist."
                      : "Publication added locally. Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => {
                  setActiveModal(null);
                  setEditingPub(null);
                  setEditingPubIndex(null);
                }}
              />
            )}
            {activeModal === "reference" && (
              <ReferenceForm
                defaultValues={
                  editingRef
                    ? {
                        name: editingRef.name || "",
                        relationship: editingRef.relationship || "",
                        company: editingRef.company || "",
                        position: editingRef.position || "",
                        email: editingRef.email || "",
                        phone: editingRef.phone || "",
                      }
                    : undefined
                }
                onSubmit={async (data) => {
                  let newRef;
                  if (
                    editingRefIndex !== null &&
                    editingRefIndex !== undefined
                  ) {
                    const existing = (localProfile?.references || [])[
                      editingRefIndex
                    ];
                    const updatedItem = {
                      ...existing,
                      ...data,
                    };
                    newRef = [...(localProfile?.references || [])];
                    newRef[editingRefIndex] = updatedItem;
                  } else {
                    newRef = [...(localProfile?.references || []), data];
                  }
                  updateLocalSection("references", newRef);
                  setEditingRef(null);
                  setEditingRefIndex(null);
                  toast.success(
                    editingRefIndex !== null
                      ? "Reference updated locally. Click 'Save Changes' to persist."
                      : "Reference added locally. Click 'Save Changes' to persist.",
                  );
                }}
                onCancel={() => {
                  setActiveModal(null);
                  setEditingRef(null);
                  setEditingRefIndex(null);
                }}
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

      <DeleteConfirmationModal
        open={experienceToDeleteIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setExperienceToDeleteIndex(null);
          }
        }}
        title="Delete Work Experience"
        description="Are you sure you want to delete this work experience?"
        onConfirm={async () => {
          if (experienceToDeleteIndex !== null) {
            setLocalProfile((prev: any) => {
              const prevExp = prev?.workExperiences || [];
              const nextExp = prevExp.filter(
                (_: any, i: number) => i !== experienceToDeleteIndex,
              );
              return { ...prev, workExperiences: nextExp };
            });
            toast.success(
              "Experience deleted locally. Click 'Save Changes' to persist.",
            );
          }
        }}
      />

      <DeleteConfirmationModal
        open={projectToDeleteIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setProjectToDeleteIndex(null);
          }
        }}
        title="Delete Project"
        description="Are you sure you want to delete this project?"
        onConfirm={async () => {
          if (projectToDeleteIndex !== null) {
            setLocalProfile((prev: any) => {
              const prevProj = prev?.projects || [];
              const nextProj = prevProj.filter(
                (_: any, i: number) => i !== projectToDeleteIndex,
              );
              return { ...prev, projects: nextProj };
            });
            toast.success(
              "Project deleted locally. Click 'Save Changes' to persist.",
            );
          }
        }}
      />

      <DeleteConfirmationModal
        open={volunteerToDeleteIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setVolunteerToDeleteIndex(null);
          }
        }}
        title="Delete Volunteer Work"
        description="Are you sure you want to delete this volunteer work?"
        onConfirm={async () => {
          if (volunteerToDeleteIndex !== null) {
            setLocalProfile((prev: any) => {
              const prevVol = prev?.volunteers || [];
              const nextVol = prevVol.filter(
                (_: any, i: number) => i !== volunteerToDeleteIndex,
              );
              return { ...prev, volunteers: nextVol };
            });
            toast.success(
              "Volunteer work deleted locally. Click 'Save Changes' to persist.",
            );
          }
        }}
      />

      <DeleteConfirmationModal
        open={eduToDeleteIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEduToDeleteIndex(null);
          }
        }}
        title="Delete Education"
        description="Are you sure you want to delete this education record?"
        onConfirm={async () => {
          if (eduToDeleteIndex !== null) {
            setLocalProfile((prev: any) => {
              const prevEdu = prev?.education || [];
              const nextEdu = prevEdu.filter(
                (_: any, i: number) => i !== eduToDeleteIndex,
              );
              return { ...prev, education: nextEdu };
            });
            toast.success(
              "Education record deleted locally. Click 'Save Changes' to persist.",
            );
          }
        }}
      />

      <DeleteConfirmationModal
        open={certToDeleteIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setCertToDeleteIndex(null);
          }
        }}
        title="Delete Certification"
        description="Are you sure you want to delete this certification?"
        onConfirm={async () => {
          if (certToDeleteIndex !== null) {
            setLocalProfile((prev: any) => {
              const prevCert = prev?.certifications || [];
              const nextCert = prevCert.filter(
                (_: any, i: number) => i !== certToDeleteIndex,
              );
              return { ...prev, certifications: nextCert };
            });
            toast.success(
              "Certification deleted locally. Click 'Save Changes' to persist.",
            );
          }
        }}
      />

      <DeleteConfirmationModal
        open={awardToDeleteIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setAwardToDeleteIndex(null);
          }
        }}
        title="Delete Honor / Award"
        description="Are you sure you want to delete this honor/award?"
        onConfirm={async () => {
          if (awardToDeleteIndex !== null) {
            setLocalProfile((prev: any) => {
              const prevAward = prev?.awards || [];
              const nextAward = prevAward.filter(
                (_: any, i: number) => i !== awardToDeleteIndex,
              );
              return { ...prev, awards: nextAward };
            });
            toast.success(
              "Award deleted locally. Click 'Save Changes' to persist.",
            );
          }
        }}
      />

      <DeleteConfirmationModal
        open={pubToDeleteIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPubToDeleteIndex(null);
          }
        }}
        title="Delete Publication"
        description="Are you sure you want to delete this publication?"
        onConfirm={async () => {
          if (pubToDeleteIndex !== null) {
            setLocalProfile((prev: any) => {
              const prevPub = prev?.publications || [];
              const nextPub = prevPub.filter(
                (_: any, i: number) => i !== pubToDeleteIndex,
              );
              return { ...prev, publications: nextPub };
            });
            toast.success(
              "Publication deleted locally. Click 'Save Changes' to persist.",
            );
          }
        }}
      />

      <DeleteConfirmationModal
        open={refToDeleteIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setRefToDeleteIndex(null);
          }
        }}
        title="Delete Reference"
        description="Are you sure you want to delete this reference?"
        onConfirm={async () => {
          if (refToDeleteIndex !== null) {
            setLocalProfile((prev: any) => {
              const prevRef = prev?.references || [];
              const nextRef = prevRef.filter(
                (_: any, i: number) => i !== refToDeleteIndex,
              );
              return { ...prev, references: nextRef };
            });
            toast.success(
              "Reference deleted locally. Click 'Save Changes' to persist.",
            );
          }
        }}
      />
    </div>
  );
};

export default ProfileView;
