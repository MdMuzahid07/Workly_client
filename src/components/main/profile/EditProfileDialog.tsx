"use client";

import WKCheckbox from "@/components/form/WKCheckbox";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKSelect from "@/components/form/WkSelect";
import WKTextArea from "@/components/form/WkTextArea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useUpdateProfileMutation } from "../../../redux/feature/profile/profileApi";

interface Skill {
  skillName: string;
  experienceYears: number;
}

interface Preference {
  jobType: string;
  expectedSalary: number;
  preferredLocation: string;
  remoteWork: boolean;
  industry: string;
  workExperience: string;
}

interface Profile {
  bio: string;
  location: string;
  avatarUrl?: string;
  coverUrl?: string;
  resumeUrl?: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  skills: Skill[];
  preference: Preference;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  isVerified: boolean;
  profile: Profile;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (user: User) => void;
}

interface ProfileFormData {
  fullName: string;
  phone: string;
  bio: string;
  location: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  resumeUrl?: string;
  jobType: string;
  expectedSalary: number;
  industry: string;
  workExperience: string;
  preferredLocation: string;
  remoteWork: boolean;
}

const SkillsManagementSection = ({
  skills,
  onSkillsChange,
}: {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}) => {
  const [newSkill, setNewSkill] = useState({
    skillName: "",
    experienceYears: 1,
  });

  const addSkill = () => {
    if (newSkill.skillName.trim()) {
      onSkillsChange([...skills, { ...newSkill }]);
      setNewSkill({ skillName: "", experienceYears: 1 });
    }
  };

  const removeSkill = (index: number) => {
    onSkillsChange(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-foreground text-xl font-semibold">
        Skills & Expertise
      </h3>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-primary text-primary-foreground border-primary flex items-center gap-2 px-3 py-2"
            >
              <span className="font-medium">{skill?.skillName}</span>
              <span className="text-xs opacity-90">
                ({skill?.experienceYears}y)
              </span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="hover:text-destructive ml-1 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="bg-muted/30 border-border grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Label
              htmlFor="newSkill"
              className="text-foreground text-sm font-medium"
            >
              Add New Skill
            </Label>
            <Input
              id="newSkill"
              value={newSkill?.skillName}
              onChange={(e) =>
                setNewSkill((prev) => ({
                  ...prev,
                  skillName: e.target.value,
                }))
              }
              placeholder="e.g., React, Python, Project Management"
              className="mt-1 w-full"
            />
          </div>
          <div>
            <Label
              htmlFor="experience"
              className="text-foreground text-sm font-medium"
            >
              Years of Experience
            </Label>
            <Input
              id="experience"
              type="number"
              min="0"
              max="50"
              value={newSkill?.experienceYears}
              onChange={(e) =>
                setNewSkill((prev) => ({
                  ...prev,
                  experienceYears: Number(e.target.value),
                }))
              }
              className="mt-1 w-full"
            />
          </div>
          <div className="md:col-span-3">
            <Button
              type="button"
              onClick={addSkill}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
              disabled={!newSkill?.skillName?.trim()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditProfileDialog = ({
  isOpen,
  onClose,
  user,
  onSave,
}: ProfileEditModalProps) => {
  const [skills, setSkills] = useState<Skill[]>(user.profile.skills || []);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (data: ProfileFormData) => {
    const updatedUser: User = {
      ...user,
      fullName: data.fullName,
      phone: data.phone,
      profile: {
        ...user.profile,
        bio: data.bio,
        location: data.location,
        websiteUrl: data.websiteUrl,
        linkedInUrl: data.linkedInUrl,
        resumeUrl: data.resumeUrl,
        skills: skills,
        preference: {
          ...user.profile.preference,
          jobType: data.jobType,
          expectedSalary: data.expectedSalary,
          industry: data.industry,
          workExperience: data.workExperience,
          preferredLocation: data.preferredLocation,
          remoteWork: data.remoteWork,
        },
      },
    };

    onSave(updatedUser);
    const response = await updateProfile(updatedUser).unwrap();
    if (response) {
      console.log(response, "Profile updated successfully");
    }

    onClose();
  };

  const defaultValues: ProfileFormData = {
    fullName: user.fullName || "",
    phone: user.phone || "",
    bio: user.profile?.bio || "",
    location: user.profile?.location || "",
    websiteUrl: user.profile?.websiteUrl || "",
    linkedInUrl: user.profile?.linkedInUrl || "",
    resumeUrl: user.profile?.resumeUrl || "",
    jobType: user.profile?.preference?.jobType || "",
    expectedSalary: user.profile?.preference?.expectedSalary || 0,
    industry: user.profile?.preference?.industry || "",
    workExperience: user.profile?.preference?.workExperience || "",
    preferredLocation: user.profile?.preference?.preferredLocation || "",
    remoteWork: user.profile?.preference?.remoteWork || false,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card h-[90dvh] max-h-[900px] w-[95dvw] max-w-5xl p-0 md:h-[80dvh]">
        <DialogHeader className="border-border border-b p-6 pb-4">
          <DialogTitle className="text-foreground text-2xl font-bold">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <WkForm<ProfileFormData>
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          >
            <div className="space-y-8 pb-6">
              <div className="space-y-6">
                <h3 className="text-foreground flex items-center text-xl font-semibold">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKInput
                    name="fullName"
                    label="Full Name"
                    required
                    className="w-full"
                  />
                  <WKInput
                    name="phone"
                    label="Phone Number"
                    type="text"
                    className="w-full"
                  />
                </div>

                <WKTextArea
                  name="bio"
                  label="Professional Bio"
                  rows={4}
                  className="w-full resize-none"
                />

                <WKInput
                  name="location"
                  label="Current Location"
                  className="w-full"
                />
              </div>

              <Separator />

              <div className="space-y-6">
                <h3 className="text-foreground text-xl font-semibold">
                  Professional Links & Files
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKInput
                    name="websiteUrl"
                    label="Personal Website"
                    type="text"
                    className="w-full"
                  />
                  <WKInput
                    name="linkedInUrl"
                    label="LinkedIn Profile"
                    type="text"
                    className="w-full"
                  />
                </div>

                <WKInput
                  name="resumeUrl"
                  label="Resume URL"
                  type="text"
                  className="w-full"
                />
              </div>

              <Separator />

              <SkillsManagementSection
                skills={skills}
                onSkillsChange={setSkills}
              />

              <Separator />

              <div className="space-y-6">
                <h3 className="text-foreground text-xl font-semibold">
                  Job Preferences
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKSelect
                    name="jobType"
                    label="Preferred Job Type"
                    placeholder="Select job type"
                    options={[
                      { value: "FULL_TIME", label: "Full Time" },
                      { value: "PART_TIME", label: "Part Time" },
                      { value: "CONTRACT", label: "Contract" },
                      { value: "FREELANCE", label: "Freelance" },
                      { value: "INTERNSHIP", label: "Internship" },
                      { value: "REMOTE", label: "Remote" },
                    ]}
                    className="w-full"
                  />

                  <WKInput
                    name="expectedSalary"
                    label="Expected Annual Salary (USD)"
                    type="text"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKInput
                    name="industry"
                    label="Preferred Industry"
                    className="w-full"
                  />

                  <WKSelect
                    name="workExperience"
                    label="Experience Level"
                    placeholder="Select experience level"
                    options={[
                      {
                        value: "Entry Level",
                        label: "Entry Level (0-2 years)",
                      },
                      { value: "Mid Level", label: "Mid Level (3-5 years)" },
                      {
                        value: "Senior Level",
                        label: "Senior Level (6-10 years)",
                      },
                      { value: "Executive", label: "Executive (10+ years)" },
                    ]}
                    className="w-full"
                  />
                </div>

                <WKInput
                  name="preferredLocation"
                  label="Preferred Work Location"
                  className="w-full"
                />

                <div className="bg-primary/5 border-primary/20 flex items-center space-x-3 rounded-lg border p-4">
                  <WKCheckbox
                    name="remoteWork"
                    label="I'm open to remote work opportunities"
                  />
                </div>
              </div>
            </div>

            <div className="border-border bg-muted/20 flex flex-col justify-end space-y-3 border-t p-6 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="order-2 w-full bg-transparent sm:order-1 sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground order-1 w-full shadow-lg sm:order-2 sm:w-auto"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </WkForm>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
