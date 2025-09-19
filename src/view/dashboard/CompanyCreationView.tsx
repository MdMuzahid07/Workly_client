"use client";

import type React from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { Building2, Globe, Mail, MapPin, Phone, Upload } from "lucide-react";
import { useState } from "react";

interface CompanyFormData {
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
}

const CompanyCreationView = () => {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: "",
    slug: "",
    description: "",
    industry: "",
    size: "",
    location: "",
    websiteUrl: "",
    contactEmail: "",
    contactPhone: "",
    founded: "",
    logoUrl: "",
    coverUrl: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Design",
    "Sales",
    "Remote",
    "Startup",
    "Enterprise",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const handleInputChange = (field: keyof CompanyFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from company name
    if (field === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Company data:", formData);
    setIsSubmitting(false);
    // In real app, redirect to company dashboard
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen py-4 sm:py-8">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="text-foreground mb-2 text-2xl font-bold sm:text-3xl">
            Create Your Company Profile
          </h1>
          <p className="text-muted-foreground px-4 text-sm sm:text-base">
            Set up your company profile to start posting jobs and attracting
            talent
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium sm:h-10 sm:w-10 ${
                    step <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`mx-1 h-0.5 w-8 sm:mx-2 sm:w-16 ${step < currentStep ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center">
            <div className="text-muted-foreground grid grid-cols-3 gap-4 text-center text-xs sm:flex sm:space-x-16 sm:text-sm">
              <span
                className={currentStep >= 1 ? "text-primary font-medium" : ""}
              >
                Basic Info
              </span>
              <span
                className={currentStep >= 2 ? "text-primary font-medium" : ""}
              >
                Details
              </span>
              <span
                className={currentStep >= 3 ? "text-primary font-medium" : ""}
              >
                Media & Contact
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Building2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Basic Company Information
                </CardTitle>
                <CardDescription className="text-sm">
                  Tell us about your {`company's`} core details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Company Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter company name"
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-sm font-medium">
                      Company URL Slug *
                    </Label>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0">
                      <span className="text-muted-foreground truncate text-xs sm:mr-2 sm:text-sm">
                        workly.com/company/
                      </span>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) =>
                          handleInputChange("slug", e.target.value)
                        }
                        placeholder="company-slug"
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Company Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe your company, mission, and what makes you unique..."
                    rows={4}
                    required
                    className="resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-sm font-medium">
                      Industry *
                    </Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) =>
                        handleInputChange("industry", value)
                      }
                    >
                      <SelectTrigger className="h-10 sm:h-11">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size" className="text-sm font-medium">
                      Company Size *
                    </Label>
                    <Select
                      value={formData.size}
                      onValueChange={(value) =>
                        handleInputChange("size", value)
                      }
                    >
                      <SelectTrigger className="h-10 sm:h-11">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Location & Details */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Location & Company Details
                </CardTitle>
                <CardDescription className="text-sm">
                  Add location and founding information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Headquarters Location *
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="e.g., San Francisco, CA"
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founded" className="text-sm font-medium">
                      Founded Year
                    </Label>
                    <Input
                      id="founded"
                      value={formData.founded}
                      onChange={(e) =>
                        handleInputChange("founded", e.target.value)
                      }
                      placeholder="e.g., 2018"
                      type="number"
                      min="1800"
                      max={new Date().getFullYear()}
                      className="h-10 sm:h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="text-sm font-medium">
                    Company Website
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Globe className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                    <Input
                      id="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        handleInputChange("websiteUrl", e.target.value)
                      }
                      placeholder="https://yourcompany.com"
                      type="url"
                      className="h-10 sm:h-11"
                    />
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-3 sm:p-4">
                  <h4 className="mb-2 text-sm font-medium sm:text-base">
                    Why add these details?
                  </h4>
                  <ul className="text-muted-foreground space-y-1 text-xs sm:text-sm">
                    <li>
                      • Location helps candidates find relevant opportunities
                    </li>
                    <li>• Company website builds trust and credibility</li>
                    <li>
                      • Founded year shows company stability and experience
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Media & Contact */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Media & Contact Information
                </CardTitle>
                <CardDescription className="text-sm">
                  Add your logo and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contactEmail"
                      className="text-sm font-medium"
                    >
                      Contact Email *
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                      <Input
                        id="contactEmail"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          handleInputChange("contactEmail", e.target.value)
                        }
                        placeholder="contact@yourcompany.com"
                        type="email"
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contactPhone"
                      className="text-sm font-medium"
                    >
                      Contact Phone
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                      <Input
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          handleInputChange("contactPhone", e.target.value)
                        }
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Company Logo</Label>
                    <div className="border-border rounded-lg border-2 border-dashed p-4 text-center sm:p-6">
                      <Upload className="text-muted-foreground mx-auto mb-2 h-6 w-6 sm:h-8 sm:w-8" />
                      <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
                        Upload your company logo (PNG, JPG up to 2MB)
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent sm:w-auto"
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Cover Image (Optional)
                    </Label>
                    <div className="border-border rounded-lg border-2 border-dashed p-4 text-center sm:p-6">
                      <Upload className="text-muted-foreground mx-auto mb-2 h-6 w-6 sm:h-8 sm:w-8" />
                      <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
                        Upload a cover image for your company profile
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent sm:w-auto"
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-accent rounded-lg p-3 sm:p-4">
                  <h4 className="mb-2 text-sm font-medium sm:text-base">
                    📋 Review Your Information
                  </h4>
                  <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 sm:gap-4 sm:text-sm">
                    <div className="space-y-1">
                      <p>
                        <strong>Company:</strong>{" "}
                        <span className="break-words">
                          {formData.name || "Not set"}
                        </span>
                      </p>
                      <p>
                        <strong>Industry:</strong>{" "}
                        {formData.industry || "Not set"}
                      </p>
                      <p>
                        <strong>Size:</strong> {formData.size || "Not set"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p>
                        <strong>Location:</strong>{" "}
                        <span className="break-words">
                          {formData.location || "Not set"}
                        </span>
                      </p>
                      <p>
                        <strong>Website:</strong>{" "}
                        <span className="break-all">
                          {formData.websiteUrl || "Not set"}
                        </span>
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        <span className="break-all">
                          {formData.contactEmail || "Not set"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex flex-col items-center justify-between space-y-3 sm:mt-8 sm:flex-row sm:space-y-0">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="order-2 w-full bg-transparent sm:order-1 sm:w-auto"
            >
              Previous
            </Button>
            <div className="order-1 flex w-full space-x-3 sm:order-2 sm:w-auto">
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 sm:flex-none"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none"
                >
                  {isSubmitting ? "Creating Company..." : "Create Company"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCreationView;
