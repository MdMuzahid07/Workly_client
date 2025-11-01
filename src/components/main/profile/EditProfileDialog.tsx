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
import { useUpdateProfileMutation } from "@/redux/feature/profile/profileApi";
import { AlertCircle, Plus, Sparkles, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

// ==================== Types ====================
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

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (user: User) => void;
}

// ==================== Constants ====================
const LIMITS = {
  MAX_SKILLS: 50,
  MAX_SKILL_NAME: 100,
  MAX_EXPERIENCE_YEARS: 50,
} as const;

const JOB_TYPE_OPTIONS = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "REMOTE", label: "Remote" },
] as const;

const EXPERIENCE_OPTIONS = [
  { value: "Entry Level", label: "Entry Level (0-2 years)" },
  { value: "Mid Level", label: "Mid Level (3-5 years)" },
  { value: "Senior Level", label: "Senior Level (6-10 years)" },
  { value: "Executive", label: "Executive (10+ years)" },
] as const;

// ==================== Helper Functions ====================
const skillHelpers = {
  sanitize: (name: string) => name.trim().replace(/\s+/g, " "),
  isDuplicate: (skills: Skill[], name: string) =>
    skills.some((s) => s.skillName.toLowerCase() === name.toLowerCase()),
  isValidExperience: (years: number) =>
    years >= 0 && years <= LIMITS.MAX_EXPERIENCE_YEARS,
};

// ==================== Skills Management Component ====================
interface SkillsManagementProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

const SkillsManagement = ({
  skills,
  onSkillsChange,
}: SkillsManagementProps) => {
  const [newSkill, setNewSkill] = useState<Skill>({
    skillName: "",
    experienceYears: 1,
  });
  const [error, setError] = useState("");

  const validateAndAddSkill = useCallback(() => {
    const trimmedName = skillHelpers.sanitize(newSkill.skillName);

    if (!trimmedName) {
      setError("Skill name cannot be empty");
      return;
    }

    if (trimmedName.length > LIMITS.MAX_SKILL_NAME) {
      setError(`Skill name cannot exceed ${LIMITS.MAX_SKILL_NAME} characters`);
      return;
    }

    if (skillHelpers.isDuplicate(skills, trimmedName)) {
      setError("This skill has already been added");
      return;
    }

    if (!skillHelpers.isValidExperience(newSkill.experienceYears)) {
      setError(
        `Experience must be between 0 and ${LIMITS.MAX_EXPERIENCE_YEARS} years`,
      );
      return;
    }

    if (skills.length >= LIMITS.MAX_SKILLS) {
      setError(`Maximum ${LIMITS.MAX_SKILLS} skills allowed`);
      return;
    }

    onSkillsChange([...skills, { ...newSkill, skillName: trimmedName }]);
    setNewSkill({ skillName: "", experienceYears: 1 });
    setError("");
    toast.success("Skill added successfully");
  }, [newSkill, skills, onSkillsChange]);

  const removeSkill = useCallback(
    (index: number) => {
      const removed = skills[index];
      onSkillsChange(skills.filter((_, i) => i !== index));
      toast.success(`${removed.skillName} removed`);
    },
    [skills, onSkillsChange],
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateAndAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-foreground flex items-center text-xl font-semibold">
          <Sparkles className="text-primary mr-2 h-5 w-5" />
          Skills & Expertise
        </h3>
        <Badge variant="secondary" className="text-xs">
          {skills.length} / {LIMITS.MAX_SKILLS}
        </Badge>
      </div>

      {/* Skills Display */}
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={`${skill.skillName}-${index}`}
              variant="secondary"
              className="bg-primary text-primary-foreground border-primary flex items-center gap-2 px-3 py-2 transition-all hover:scale-105"
            >
              <span className="font-medium">{skill.skillName}</span>
              <span className="text-xs opacity-90">
                ({skill.experienceYears}y)
              </span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="hover:text-destructive ml-1 transition-colors"
                aria-label={`Remove ${skill.skillName}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 border-border flex items-center justify-center rounded-lg border border-dashed p-8">
          <div className="space-y-2 text-center">
            <AlertCircle className="text-muted-foreground mx-auto h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              No skills added yet. Add your first skill below!
            </p>
          </div>
        </div>
      )}

      {/* Add Skill Form */}
      <div className="bg-muted/30 border-border space-y-4 rounded-lg border p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Label
              htmlFor="newSkill"
              className="text-foreground text-sm font-medium"
            >
              Add New Skill *
            </Label>
            <Input
              id="newSkill"
              value={newSkill.skillName}
              onChange={(e) => {
                setNewSkill((prev) => ({ ...prev, skillName: e.target.value }));
                setError("");
              }}
              onKeyPress={handleKeyPress}
              placeholder="e.g., React, Python, Project Management"
              className="mt-1 w-full"
              maxLength={LIMITS.MAX_SKILL_NAME}
            />
          </div>
          <div>
            <Label
              htmlFor="experience"
              className="text-foreground text-sm font-medium"
            >
              Years *
            </Label>
            <Input
              id="experience"
              type="number"
              min="0"
              max={LIMITS.MAX_EXPERIENCE_YEARS}
              step="0.5"
              value={newSkill.experienceYears}
              onChange={(e) => {
                setNewSkill((prev) => ({
                  ...prev,
                  experienceYears: Number(e.target.value),
                }));
                setError("");
              }}
              className="mt-1 w-full"
            />
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive flex items-start gap-2 rounded-md p-3 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="button"
          onClick={validateAndAddSkill}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
          disabled={
            !newSkill.skillName.trim() || skills.length >= LIMITS.MAX_SKILLS
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>
    </div>
  );
};

// ==================== Main Component ====================
const EditProfileDialog = ({
  isOpen,
  onClose,
  user,
  onSave,
}: EditProfileDialogProps) => {
  const [skills, setSkills] = useState<Skill[]>(user?.profile?.skills || []);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (data: ProfileFormData) => {
    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

    try {
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
          skills,
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

      await updateProfile(updatedUser).unwrap();
      onSave(updatedUser);
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const defaultValues: ProfileFormData = useMemo(
    () => ({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      bio: user?.profile?.bio || "",
      location: user?.profile?.location || "",
      websiteUrl: user?.profile?.websiteUrl || "",
      linkedInUrl: user?.profile?.linkedInUrl || "",
      resumeUrl: user?.profile?.resumeUrl || "",
      jobType: user?.profile?.preference?.jobType || "FULL_TIME",
      expectedSalary: user?.profile?.preference?.expectedSalary || 0,
      industry: user?.profile?.preference?.industry || "",
      workExperience:
        user?.profile?.preference?.workExperience || "Entry Level",
      preferredLocation: user?.profile?.preference?.preferredLocation || "",
      remoteWork: user?.profile?.preference?.remoteWork || false,
    }),
    [user],
  );

  const handleClose = useCallback(() => {
    setSkills(user?.profile?.skills || []);
    onClose();
  }, [user, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card h-[90dvh] max-h-[900px] w-[95dvw] max-w-5xl p-0 md:h-[85dvh]">
        <DialogHeader className="border-border border-b p-6 pb-4">
          <DialogTitle className="text-foreground text-2xl font-bold">
            Edit Profile
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Update your profile information and preferences
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <WkForm<ProfileFormData>
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          >
            <div className="space-y-8 pb-6">
              {/* Basic Information */}
              <section className="space-y-6">
                <h3 className="text-foreground text-xl font-semibold">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKInput name="fullName" label="Full Name" required />
                  <WKInput name="phone" label="Phone Number" />
                </div>
                <WKTextArea name="bio" label="Professional Bio" rows={4} />
                <WKInput name="location" label="Current Location" />
              </section>

              <Separator />

              {/* Professional Links */}
              <section className="space-y-6">
                <h3 className="text-foreground text-xl font-semibold">
                  Professional Links & Files
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKInput name="websiteUrl" label="Personal Website" />
                  <WKInput name="linkedInUrl" label="LinkedIn Profile" />
                </div>
                <WKInput name="resumeUrl" label="Resume URL" />
              </section>

              <Separator />

              {/* Skills */}
              <SkillsManagement skills={skills} onSkillsChange={setSkills} />

              <Separator />

              {/* Job Preferences */}
              <section className="space-y-6">
                <h3 className="text-foreground text-xl font-semibold">
                  Job Preferences
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKSelect
                    name="jobType"
                    label="Preferred Job Type"
                    placeholder="Select job type"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    options={JOB_TYPE_OPTIONS}
                  />
                  <WKInput
                    name="expectedSalary"
                    label="Expected Annual Salary (USD)"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKInput name="industry" label="Preferred Industry" />
                  <WKSelect
                    name="workExperience"
                    label="Experience Level"
                    placeholder="Select experience level"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    options={EXPERIENCE_OPTIONS}
                  />
                </div>
                <WKInput
                  name="preferredLocation"
                  label="Preferred Work Location"
                />
                <div className="bg-primary/5 border-primary/20 rounded-lg border p-4">
                  <WKCheckbox
                    name="remoteWork"
                    label="I'm open to remote work opportunities"
                  />
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="border-border bg-muted/20 sticky bottom-0 flex flex-col gap-3 border-t p-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="w-full bg-transparent sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || skills.length === 0}
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full shadow-lg sm:w-auto"
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
