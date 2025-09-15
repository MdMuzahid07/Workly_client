/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Building2,
  Calendar,
  Edit3,
  Eye,
  Save,
  Shield,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

interface CompanyProfile {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string;
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
  mission: string;
  values: string[];
  benefits: string[];
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    facebook: string;
  };
  stats: {
    totalEmployees: number;
    totalJobs: number;
    totalApplications: number;
    profileViews: number;
  };
}

const ManageCompanyProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // fake data
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    id: "1",
    name: "TechFlow Inc.",
    slug: "techflow-inc",
    description:
      "Leading software development company specializing in web applications and cloud solutions. We're passionate about creating innovative technology that solves real-world problems and helps businesses thrive in the digital age.",
    industry: "Technology",
    size: "100-500 employees",
    location: "San Francisco, CA",
    websiteUrl: "https://techflow.com",
    contactEmail: "contact@techflow.com",
    contactPhone: "+1 (555) 123-4567",
    founded: "2018",
    logoUrl: "/generic-company-logo.png",
    coverUrl: "",
    isVerified: true,
    verifiedAt: "2023-06-15T10:30:00Z",
    mission:
      "To empower businesses through cutting-edge technology solutions that drive growth and innovation.",
    values: [
      "Innovation First",
      "Customer Success",
      "Team Collaboration",
      "Quality Excellence",
      "Continuous Learning",
    ],
    benefits: [
      "Health Insurance",
      "Remote Work",
      "Flexible Hours",
      "Professional Development",
      "Stock Options",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/techflow",
      twitter: "https://twitter.com/techflow",
      github: "https://github.com/techflow",
      facebook: "",
    },
    stats: {
      totalEmployees: 250,
      totalJobs: 12,
      totalApplications: 156,
      profileViews: 1240,
    },
  });

  const [editedProfile, setEditedProfile] =
    useState<CompanyProfile>(companyProfile);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCompanyProfile(editedProfile);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditedProfile(companyProfile);
    setIsEditing(false);
  };

  const updateField = (field: keyof CompanyProfile, value: any) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addValue = (newValue: string) => {
    if (newValue.trim() && !editedProfile.values.includes(newValue.trim())) {
      setEditedProfile((prev) => ({
        ...prev,
        values: [...prev.values, newValue.trim()],
      }));
    }
  };

  const removeValue = (valueToRemove: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      values: prev.values.filter((value) => value !== valueToRemove),
    }));
  };

  const addBenefit = (newBenefit: string) => {
    if (
      newBenefit.trim() &&
      !editedProfile.benefits.includes(newBenefit.trim())
    ) {
      setEditedProfile((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((benefit) => benefit !== benefitToRemove),
    }));
  };

  const currentProfile = isEditing ? editedProfile : companyProfile;

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={currentProfile.logoUrl || "/placeholder.svg"}
                  alt={currentProfile.name}
                />
                <AvatarFallback className="text-lg">
                  {currentProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-foreground text-2xl font-bold">
                    {currentProfile.name}
                  </h1>
                  {currentProfile.isVerified && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {currentProfile.industry} • {currentProfile.location}
                </p>
                <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {currentProfile.stats.totalEmployees} employees
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Founded {currentProfile.founded}
                  </span>
                  <span className="flex items-center">
                    <Eye className="mr-1 h-4 w-4" />
                    {currentProfile.stats.profileViews} profile views
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Company Details</TabsTrigger>
            <TabsTrigger value="culture">Culture & Values</TabsTrigger>
            <TabsTrigger value="media">Media & Branding</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Company Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">
                        Total Jobs
                      </p>
                      <p className="text-primary text-2xl font-bold">
                        {currentProfile.stats.totalJobs}
                      </p>
                    </div>
                    <Building2 className="text-muted-foreground h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">
                        Applications
                      </p>
                      <p className="text-primary text-2xl font-bold">
                        {currentProfile.stats.totalApplications}
                      </p>
                    </div>
                    <Users className="text-muted-foreground h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">
                        Employees
                      </p>
                      <p className="text-primary text-2xl font-bold">
                        {currentProfile.stats.totalEmployees}
                      </p>
                    </div>
                    <Users className="text-muted-foreground h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">
                        Profile Views
                      </p>
                      <p className="text-primary text-2xl font-bold">
                        {currentProfile.stats.profileViews}
                      </p>
                    </div>
                    <Eye className="text-muted-foreground h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>About {currentProfile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={4}
                    placeholder="Describe your company..."
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {currentProfile.description}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Mission Statement */}
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.mission}
                    onChange={(e) => updateField("mission", e.target.value)}
                    rows={3}
                    placeholder="What is your company's mission?"
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {currentProfile.mission}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Basic details about your company
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.name}
                        onChange={(e) => updateField("name", e.target.value)}
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {currentProfile.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    {isEditing ? (
                      <Select
                        value={editedProfile.industry}
                        onValueChange={(value) =>
                          updateField("industry", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {currentProfile.industry}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Company Size</Label>
                    {isEditing ? (
                      <Select
                        value={editedProfile.size}
                        onValueChange={(value) => updateField("size", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10 employees">
                            1-10 employees
                          </SelectItem>
                          <SelectItem value="11-50 employees">
                            11-50 employees
                          </SelectItem>
                          <SelectItem value="51-200 employees">
                            51-200 employees
                          </SelectItem>
                          <SelectItem value="201-500 employees">
                            201-500 employees
                          </SelectItem>
                          <SelectItem value="501-1000 employees">
                            501-1000 employees
                          </SelectItem>
                          <SelectItem value="1000+ employees">
                            1000+ employees
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {currentProfile.size}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Founded</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.founded}
                        onChange={(e) => updateField("founded", e.target.value)}
                        type="number"
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {currentProfile.founded}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.location}
                        onChange={(e) =>
                          updateField("location", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {currentProfile.location}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Website</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.websiteUrl}
                        onChange={(e) =>
                          updateField("websiteUrl", e.target.value)
                        }
                        type="url"
                      />
                    ) : (
                      <a
                        href={currentProfile.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        {currentProfile.websiteUrl}
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.contactEmail}
                        onChange={(e) =>
                          updateField("contactEmail", e.target.value)
                        }
                        type="email"
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {currentProfile.contactEmail}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Phone</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.contactPhone}
                        onChange={(e) =>
                          updateField("contactPhone", e.target.value)
                        }
                        type="tel"
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {currentProfile.contactPhone}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="culture" className="space-y-6">
            {/* Company Values */}
            <Card>
              <CardHeader>
                <CardTitle>Company Values</CardTitle>
                <CardDescription>
                  What principles guide your company?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.values.map((value, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm"
                      >
                        {value}
                        {isEditing && (
                          <button
                            onClick={() => removeValue(value)}
                            className="text-muted-foreground hover:text-foreground ml-2"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a company value..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addValue(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                          const input = e.currentTarget
                            .previousElementSibling as HTMLInputElement;
                          addValue(input.value);
                          input.value = "";
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Employee Benefits</CardTitle>
                <CardDescription>
                  What benefits do you offer to employees?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        <Award className="mr-1 h-3 w-3" />
                        {benefit}
                        {isEditing && (
                          <button
                            onClick={() => removeBenefit(benefit)}
                            className="text-muted-foreground hover:text-foreground ml-2"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add an employee benefit..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addBenefit(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                          const input = e.currentTarget
                            .previousElementSibling as HTMLInputElement;
                          addBenefit(input.value);
                          input.value = "";
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Media</CardTitle>
                <CardDescription>
                  Upload your company logo and cover image
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    <div className="border-border rounded-lg border-2 border-dashed p-6 text-center">
                      {currentProfile.logoUrl ? (
                        <div className="space-y-2">
                          <Avatar className="mx-auto h-16 w-16">
                            <AvatarImage
                              src={currentProfile.logoUrl || "/placeholder.svg"}
                              alt="Company logo"
                            />
                            <AvatarFallback>Logo</AvatarFallback>
                          </Avatar>
                          {isEditing && (
                            <Button type="button" variant="outline" size="sm">
                              Change Logo
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="text-muted-foreground mx-auto h-8 w-8" />
                          <p className="text-muted-foreground text-sm">
                            Upload company logo
                          </p>
                          {isEditing && (
                            <Button type="button" variant="outline" size="sm">
                              Choose File
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="border-border rounded-lg border-2 border-dashed p-6 text-center">
                      <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                      <p className="text-muted-foreground mb-2 text-sm">
                        Upload cover image
                      </p>
                      {isEditing && (
                        <Button type="button" variant="outline" size="sm">
                          Choose File
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageCompanyProfile;
