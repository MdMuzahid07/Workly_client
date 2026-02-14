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
import { useGetProfileQuery } from "@/redux/feature/profile/profileApi";
import {
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Info,
  LayoutGrid,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import JobPreference from "../../components/main/profile/JobPreference";
import ProfileSkeleton from "../../skeleton/profile/ProfileSkeleton";

import { BasicInfoForm } from "@/components/dashboard/profile-tabs/forms/BasicInfoForm";
import { EducationForm } from "@/components/dashboard/profile-tabs/forms/EducationForm";
import { ExperienceForm } from "@/components/dashboard/profile-tabs/forms/ExperienceForm";
import { ProjectForm } from "@/components/dashboard/profile-tabs/forms/ProjectForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddressForm } from "../../components/dashboard/profile-tabs/forms/AddressForm";
import { AwardForm } from "../../components/dashboard/profile-tabs/forms/AwardForm";
import { CertificationForm } from "../../components/dashboard/profile-tabs/forms/CertificationForm";
import { JobPreferenceForm } from "../../components/dashboard/profile-tabs/forms/JobPreferenceForm";
import { LanguageForm } from "../../components/dashboard/profile-tabs/forms/LanguageForm";
import { PublicationForm } from "../../components/dashboard/profile-tabs/forms/PublicationForm";
import { ReferenceForm } from "../../components/dashboard/profile-tabs/forms/ReferenceForm";
import { ResumeForm } from "../../components/dashboard/profile-tabs/forms/ResumeForm";
import { SocialLinksForm } from "../../components/dashboard/profile-tabs/forms/SocialLinksForm";
import { SoftSkillsForm } from "../../components/dashboard/profile-tabs/forms/SoftSkillsForm";
import { VideoResumeForm } from "../../components/dashboard/profile-tabs/forms/VideoResumeForm";
import { VolunteerForm } from "../../components/dashboard/profile-tabs/forms/VolunteerForm";

const ProfileView = () => {
  const [activeModal, setActiveModal] = useState<
    | "basic"
    | "education"
    | "experience"
    | "project"
    | "resume"
    | "video"
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
    | null
  >(null);
  const { data, isLoading } = useGetProfileQuery(undefined);
  const user = data?.data;

  // Mock progress calculation
  const calculateProgress = () => {
    let progress = 20; // Base account creation
    if (user?.profile?.avatarUrl) progress += 10;
    if (user?.profile?.bio) progress += 10;
    if (user?.profile?.location) progress += 10;
    if (user?.profile?.skills?.length > 0) progress += 20;
    if (user?.profile?.preference?.jobType) progress += 10;
    return Math.min(progress, 100);
  };

  const progress = calculateProgress();

  if (isLoading && !data) {
    return <ProfileSkeleton />;
  }

  const mockEducation = [
    {
      level: "Bachelor",
      degree: "Bachelor of Science (BSc)",
      institute: "National University",
      year: "2026",
      result: "GPA 4",
    },
  ];

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
            <div className="text-primary ml-auto text-right text-xl font-bold">
              {progress}%
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
                  <div className="font-medium">{user?.fullName}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Email
                  </div>
                  <div className="font-medium">{user?.email}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Phone
                  </div>
                  <div className="font-medium">
                    {user?.phone || "Not provided"}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Location
                  </div>
                  <div className="font-medium">
                    {user?.profile?.location || "Not provided"}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Career Objective
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed font-medium">
                    {user?.profile?.bio || "No summary added."}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Portfolio Section */}
            <PortfolioSection
              socialLinks={{
                linkedin: "linkedin.com/in/oliver",
                github: "github.com/oliver",
                website: "oliver.dev",
              }}
              onAddResume={() => setActiveModal("resume")}
              onAddVideoResume={() => setActiveModal("video")}
              onEditSocials={() => setActiveModal("social")}
            />

            {/* Address */}
            <SectionCard
              title="Address Details"
              noData
              onAdd={() => setActiveModal("address")}
            >
              <div className="text-muted-foreground py-4 text-center text-sm">
                Add permanent and present address.
              </div>
            </SectionCard>
          </TabsContent>

          {/*  Professional Tab */}
          <TabsContent
            value="professional"
            className="animate-in fade-in-50 space-y-8 duration-300"
          >
            <ExperienceList
              experience={[
                {
                  designation: "Senior Frontend Developer",
                  company: "Tech Corp",
                  startDate: "Jan 2024",
                  currentlyWorking: true,
                  employmentType: "Full-time",
                  description:
                    "Led the migration to Next.js 14, improving performance by 40%.",
                },
              ]}
              onAdd={() => setActiveModal("experience")}
            />
            <ProjectList
              projects={[
                {
                  title: "E-Commerce Platform Redesign",
                  description:
                    "Complete overhaul of a high-traffic retail site using React and Node.js.",
                  technologies: ["React", "Redux", "Node.js"],
                },
              ]}
              onAdd={() => setActiveModal("project")}
            />
            <VolunteerSection
              volunteer={[]}
              onAdd={() => setActiveModal("volunteer")}
            />
          </TabsContent>

          {/* Education & Growth Tab */}
          <TabsContent
            value="education"
            className="animate-in fade-in-50 space-y-8 duration-300"
          >
            <EducationList
              education={mockEducation}
              onAdd={() => setActiveModal("education")}
              onAddCertificate={() => setActiveModal("certification")}
            />
            <AdditionalInfo
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
              skills={user?.profile?.skills}
              onAddSoftSkill={() => setActiveModal("softSkill")}
              onAddLanguage={() => setActiveModal("language")}
            />

            <SectionCard
              title="Job Preferences"
              isCompleted={!!user?.profile?.preference}
              completionPercentage={10}
              onEdit={() => setActiveModal("jobPreference")}
            >
              <JobPreference preferences={user?.profile?.preference} />
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
              {activeModal === "resume" && "Upload Resume"}
              {activeModal === "video" && "Add Video Resume"}
              {activeModal === "certification" && "Add Certification"}
              {activeModal === "social" && "Edit Online Presence"}
              {activeModal === "address" && "Edit Address Details"}
              {activeModal === "volunteer" && "Add Volunteer Work"}
              {activeModal === "award" && "Add Honor / Award"}
              {activeModal === "publication" && "Add Publication"}
              {activeModal === "reference" && "Add Reference"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {activeModal === "basic" && (
              <BasicInfoForm
                defaultValues={{
                  fullName: user?.fullName || "",
                  email: user?.email || "",
                  phone: user?.phone || "",
                  location: user?.profile?.location || "",
                  bio: user?.profile?.bio || "",
                  headline: user?.profile?.headline || "",
                }}
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "education" && (
              <EducationForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "experience" && (
              <ExperienceForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "project" && (
              <ProjectForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "resume" && (
              <ResumeForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "video" && (
              <VideoResumeForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "certification" && (
              <CertificationForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "social" && (
              <SocialLinksForm
                defaultValues={{
                  linkedin: "linkedin.com/in/mr_oliver",
                  github: "github.com/oliver",
                  website: "Oliver",
                }}
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "address" && (
              <AddressForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "volunteer" && (
              <VolunteerForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "award" && (
              <AwardForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "publication" && (
              <PublicationForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "reference" && (
              <ReferenceForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "softSkill" && (
              <SoftSkillsForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "language" && (
              <LanguageForm
                onSubmit={(data) => {
                  console.log(data);
                  setActiveModal(null);
                }}
                onCancel={() => setActiveModal(null)}
              />
            )}
            {activeModal === "jobPreference" && (
              <JobPreferenceForm
                defaultValues={user?.profile?.preference || {}}
                onSubmit={(data) => {
                  console.log(data);
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
