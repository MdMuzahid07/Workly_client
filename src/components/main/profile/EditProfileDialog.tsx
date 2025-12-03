/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import WKCheckbox from "@/components/form/WKCheckbox";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKSelect from "@/components/form/WkSelect";
import WKTextArea from "@/components/form/WkTextArea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUpdateProfileMutation } from "@/redux/feature/profile/profileApi";
import { Check, FileText, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { useUploadSingleFileMutation } from "../../../redux/feature/upload/uploadApi";
import ProfileSkillManagement from "./ProfileSkillManagement";

// ========== Types =============>
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

// ==================== main component ================>

const EditProfileDialog = ({
  isOpen,
  onClose,
  user,
  onSave,
}: EditProfileDialogProps) => {
  const [skills, setSkills] = useState<Skill[]>(user?.profile?.skills || []);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [avatar, setAvatar] = useState<string | null>(
    user?.profile?.avatarUrl || null,
  );
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState<string | null>(
    user?.profile?.resumeUrl || null,
  );

  const [uploadSingleFile, { isLoading: isUploading }] =
    useUploadSingleFileMutation();

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleAvatarUpload = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadSingleFile(formData).unwrap();
      setAvatar(result.data.url);
      toast.success("Avatar uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload avatar. Please try again.");
    }
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [".pdf", ".doc", ".docx"];
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

      if (!validTypes.includes(fileExtension)) {
        toast.error("Please upload a valid resume file (PDF, DOC, DOCX)");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setResumeFile(file);
      toast.success("Resume file selected");
    }
  };

  const handleRemoveResumeFile = () => {
    setResumeFile(null);
    setUploadedResumeUrl(null);
    toast.success("Resume removed");
  };

  const handleSubmit = async (data: ProfileFormData) => {
    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

    try {
      let finalResumeUrl = uploadedResumeUrl;

      // Upload resume file if a new one is selected
      if (resumeFile) {
        const formData = new FormData();
        formData.append("file", resumeFile);

        const resumeResult = await uploadSingleFile(formData).unwrap();
        if (resumeResult.success) {
          finalResumeUrl = resumeResult.data.url;
          setUploadedResumeUrl(finalResumeUrl);
        }
      }

      //==================== helper function to convert empty string to null ================>
      const sanitizeValue = (value: any) => {
        if (value === "" || value === undefined) return null;
        return value;
      };

      const updatePayload = {
        bio: sanitizeValue(data.bio),
        location: sanitizeValue(data.location),
        websiteUrl: sanitizeValue(data.websiteUrl),
        avatarUrl: avatar || user.profile.avatarUrl,
        linkedInUrl: sanitizeValue(data.linkedInUrl),
        resumeUrl: finalResumeUrl || null,
        skills: skills,
        preference: {
          jobType: data.jobType,
          expectedSalary:
            data.expectedSalary && Number(data.expectedSalary) > 0
              ? Number(data.expectedSalary)
              : null,
          industry: sanitizeValue(data.industry),
          workExperience: sanitizeValue(data.workExperience),
          preferredLocation: sanitizeValue(data.preferredLocation),
          remoteWork: Boolean(data.remoteWork),
        },
      };

      console.log("Sending payload:", JSON.stringify(updatePayload, null, 2));

      // ============  send only profile data to api ====>
      await updateProfile(updatePayload).unwrap();

      // ======= update local user state with the new data==============>
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
          resumeUrl: finalResumeUrl || undefined,
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
    setResumeFile(null);
    setUploadedResumeUrl(user?.profile?.resumeUrl || null);
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
                <div>
                  <Label className="text-foreground text-sm font-medium">
                    Profile Picture
                  </Label>

                  <div className="mt-2 flex items-center gap-4">
                    {user?.profile?.avatarUrl || avatar ? (
                      <Image
                        src={avatar || user.profile.avatarUrl!}
                        alt={`${user.fullName || "User"} avatar`}
                        className={`h-16 w-16 rounded-full border object-cover ${isUploading ? "animate-pulse" : ""}`}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full text-lg font-semibold">
                        {user?.fullName
                          ? user.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()
                          : "U"}
                      </div>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="avatarUpload"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block cursor-pointer rounded-full px-4 py-2 text-sm font-medium"
                      >
                        Choose Image
                      </label>
                      <input
                        id="avatarUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleAvatarUpload(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKInput name="fullName" label="Full Name" required />
                  <WKInput name="phone" label="Phone Number" />
                </div>
                <WKTextArea name="bio" label="Professional Bio" rows={4} />
                <WKInput name="location" label="Current Location" />
              </section>

              <Separator />

              {/* Professional Links & Resume */}
              <section className="space-y-6">
                <h3 className="text-foreground text-xl font-semibold">
                  Professional Links & Files
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WKInput name="websiteUrl" label="Personal Website" />
                  <WKInput name="linkedInUrl" label="LinkedIn Profile" />
                </div>

                {/* Resume Upload Section */}
                <div className="space-y-4">
                  <Label className="text-foreground text-sm font-medium">
                    Resume
                  </Label>

                  {/* Upload Area */}
                  {!resumeFile && !uploadedResumeUrl && (
                    <div className="border-border bg-muted/30 rounded-lg border-2 border-dashed">
                      <label
                        htmlFor="resume-upload"
                        className="flex cursor-pointer flex-col items-center justify-center px-6 py-8"
                      >
                        <div className="bg-muted mb-4 rounded-full p-4">
                          <Upload className="text-muted-foreground h-8 w-8" />
                        </div>

                        <div className="space-y-2 text-center">
                          <p className="text-foreground font-medium">
                            Drop your resume here or{" "}
                            <span className="text-primary underline">
                              browse
                            </span>
                          </p>
                          <p className="text-muted-foreground text-sm">
                            PDF, DOC, DOCX up to 5MB
                          </p>
                        </div>

                        <input
                          id="resume-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeFileChange}
                        />
                      </label>
                    </div>
                  )}

                  {/* Selected File Display */}
                  {resumeFile && (
                    <div className="border-primary/20 bg-primary/5 rounded-lg border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          <div className="bg-primary/10 shrink-0 rounded-lg p-2">
                            <FileText className="text-primary h-6 w-6" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <p className="text-foreground truncate font-medium">
                                {resumeFile.name}
                              </p>
                              <Check className="text-primary h-4 w-4 shrink-0" />
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {formatFileSize(resumeFile.size)}
                            </p>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveResumeFile}
                          className="hover:bg-destructive/10 hover:text-destructive shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Existing Resume Display */}
                  {!resumeFile && uploadedResumeUrl && (
                    <div className="border-border bg-muted/30 rounded-lg border p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-lg p-2">
                            <FileText className="text-muted-foreground h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-foreground text-sm font-medium">
                              Current Resume
                            </p>
                            <a
                              href={uploadedResumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-xs hover:underline"
                            >
                              View Resume
                            </a>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <label htmlFor="resume-upload-replace">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="cursor-pointer"
                              asChild
                            >
                              <span>Replace</span>
                            </Button>
                            <input
                              id="resume-upload-replace"
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeFileChange}
                            />
                          </label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveResumeFile}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <Separator />

              {/* Skills */}
              <ProfileSkillManagement
                skills={skills}
                onSkillsChange={setSkills}
              />

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
                    type="number"
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
                className="hover:bg-destructive! w-full hover:text-white sm:w-auto"
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
