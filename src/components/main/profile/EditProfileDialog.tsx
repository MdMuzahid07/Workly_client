/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  isVerified: boolean;
  profile: {
    bio: string;
    location: string;
    avatarUrl?: string;
    coverUrl?: string;
    resumeUrl?: string;
    websiteUrl?: string;
    linkedInUrl?: string;
    skills: Array<{
      skillName: string;
      experienceYears: number;
    }>;
    preference: {
      jobType: string;
      expectedSalary: number;
      preferredLocation: string;
      remoteWork: boolean;
      industry: string;
      workExperience: string;
    };
  };
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (user: User) => void;
}

const EditProfileDialog = ({
  isOpen,
  onClose,
  user,
  onSave,
}: ProfileEditModalProps) => {
  const [formData, setFormData] = useState(user);
  const [newSkill, setNewSkill] = useState({
    skillName: "",
    experienceYears: 1,
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const updateProfile = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const updatePreference = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        preference: {
          ...prev.profile.preference,
          [field]: value,
        },
      },
    }));
  };

  const addSkill = () => {
    if (newSkill.skillName.trim()) {
      setFormData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          skills: [...prev.profile.skills, { ...newSkill }],
        },
      }));
      setNewSkill({ skillName: "", experienceYears: 1 });
    }
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        skills: prev.profile.skills.filter((_, i) => i !== index),
      },
    }));
  };

  const updateSkill = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        skills: prev.profile.skills.map((skill, i) =>
          i === index ? { ...skill, [field]: value } : skill,
        ),
      },
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[90vh] max-h-[900px] w-[95vw] max-w-4xl p-0">
        <DialogHeader className="border-border border-b p-6 pb-4">
          <DialogTitle className="text-foreground text-2xl font-bold">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-8 pb-6">
            <div className="space-y-6">
              <h3 className="text-foreground flex items-center text-xl font-semibold">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-foreground text-sm font-medium"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="w-full"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-foreground text-sm font-medium"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-foreground text-sm font-medium"
                >
                  Professional Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.profile.bio}
                  onChange={(e) => updateProfile("bio", e.target.value)}
                  rows={4}
                  className="w-full resize-none"
                  placeholder="Tell us about your professional background, experience, and what you're passionate about..."
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-foreground text-sm font-medium"
                >
                  Current Location
                </Label>
                <Input
                  id="location"
                  value={formData.profile.location}
                  onChange={(e) => updateProfile("location", e.target.value)}
                  className="w-full"
                  placeholder="City, State/Country"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="text-foreground text-xl font-semibold">
                Professional Links & Files
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="website"
                    className="text-foreground text-sm font-medium"
                  >
                    Personal Website
                  </Label>
                  <Input
                    id="website"
                    value={formData.profile.websiteUrl || ""}
                    onChange={(e) =>
                      updateProfile("websiteUrl", e.target.value)
                    }
                    placeholder="https://yourwebsite.com"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="linkedin"
                    className="text-foreground text-sm font-medium"
                  >
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.profile.linkedInUrl || ""}
                    onChange={(e) =>
                      updateProfile("linkedInUrl", e.target.value)
                    }
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="resume"
                  className="text-foreground text-sm font-medium"
                >
                  Resume URL
                </Label>
                <Input
                  id="resume"
                  value={formData.profile.resumeUrl || ""}
                  onChange={(e) => updateProfile("resumeUrl", e.target.value)}
                  placeholder="https://drive.google.com/file/d/your-resume"
                  className="w-full"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="text-foreground text-xl font-semibold">
                Skills & Expertise
              </h3>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.profile.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary text-primary-foreground border-primary flex items-center gap-2 px-3 py-2"
                    >
                      <span className="font-medium">{skill.skillName}</span>
                      <span className="text-xs opacity-90">
                        ({skill.experienceYears}y)
                      </span>
                      <button
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
                      value={newSkill.skillName}
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
                      value={newSkill.experienceYears}
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
                      disabled={!newSkill.skillName.trim()}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Skill
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="text-foreground text-xl font-semibold">
                Job Preferences
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="jobType"
                    className="text-foreground text-sm font-medium"
                  >
                    Preferred Job Type
                  </Label>
                  <Select
                    value={formData.profile.preference.jobType}
                    onValueChange={(value) =>
                      updatePreference("jobType", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Full Time</SelectItem>
                      <SelectItem value="PART_TIME">Part Time</SelectItem>
                      <SelectItem value="CONTRACT">Contract</SelectItem>
                      <SelectItem value="FREELANCE">Freelance</SelectItem>
                      <SelectItem value="INTERNSHIP">Internship</SelectItem>
                      <SelectItem value="REMOTE">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="expectedSalary"
                    className="text-foreground text-sm font-medium"
                  >
                    Expected Annual Salary (USD)
                  </Label>
                  <Input
                    id="expectedSalary"
                    type="number"
                    min="0"
                    value={formData.profile.preference.expectedSalary}
                    onChange={(e) =>
                      updatePreference("expectedSalary", Number(e.target.value))
                    }
                    className="w-full"
                    placeholder="120000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="industry"
                    className="text-foreground text-sm font-medium"
                  >
                    Preferred Industry
                  </Label>
                  <Input
                    id="industry"
                    value={formData.profile.preference.industry}
                    onChange={(e) =>
                      updatePreference("industry", e.target.value)
                    }
                    className="w-full"
                    placeholder="Technology, Healthcare, Finance, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="workExperience"
                    className="text-foreground text-sm font-medium"
                  >
                    Experience Level
                  </Label>
                  <Select
                    value={formData.profile.preference.workExperience}
                    onValueChange={(value) =>
                      updatePreference("workExperience", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry Level">
                        Entry Level (0-2 years)
                      </SelectItem>
                      <SelectItem value="Mid Level">
                        Mid Level (3-5 years)
                      </SelectItem>
                      <SelectItem value="Senior Level">
                        Senior Level (6-10 years)
                      </SelectItem>
                      <SelectItem value="Executive">
                        Executive (10+ years)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="preferredLocation"
                  className="text-foreground text-sm font-medium"
                >
                  Preferred Work Location
                </Label>
                <Input
                  id="preferredLocation"
                  value={formData.profile.preference.preferredLocation}
                  onChange={(e) =>
                    updatePreference("preferredLocation", e.target.value)
                  }
                  className="w-full"
                  placeholder="San Francisco, CA or Remote"
                />
              </div>

              <div className="bg-primary/5 border-primary/20 flex items-center space-x-3 rounded-lg border p-4">
                <Checkbox
                  id="remoteWork"
                  checked={formData.profile.preference.remoteWork}
                  onCheckedChange={(checked) =>
                    updatePreference("remoteWork", checked)
                  }
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="remoteWork"
                  className="text-foreground cursor-pointer text-sm font-medium"
                >
                  {`I'm`} open to remote work opportunities
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="border-border bg-muted/20 flex flex-col justify-end space-y-3 border-t p-6 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="order-2 w-full bg-transparent sm:order-1 sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-primary-foreground order-1 w-full shadow-lg sm:order-2 sm:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
