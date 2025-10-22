"use client";

import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKSelect from "@/components/form/WkSelect";
import WKTextArea from "@/components/form/WkTextArea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Globe, Mail, MapPin, Phone, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

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

const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "remote", label: "Remote" },
  { value: "startup", label: "Startup" },
  { value: "enterprise", label: "Enterprise" },
];

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

// Auto-generate slug component wrapper
const SlugAutoGenerator = () => {
  const { watch, setValue } = useFormContext<CompanyFormData>();
  const name = watch("name");

  useEffect(() => {
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [name, setValue]);

  return null;
};

// Step 1: Basic Information
const BasicInfoStep = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Building2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Basic Company Information
        </CardTitle>
        <CardDescription className="text-sm">
          Tell us about your company&apos;s core details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <WKInput
            name="name"
            label="Company Name"
            required
            className="h-10 sm:h-11"
          />
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Company URL Slug <span className="text-destructive ml-1">*</span>
            </label>
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0">
              <span className="text-muted-foreground truncate text-xs sm:mr-2 sm:text-sm">
                workly.com/company/
              </span>
              <WKInput name="slug" label="" required className="h-10 sm:h-11" />
            </div>
          </div>
        </div>

        <WKTextArea
          name="description"
          label="Company Description"
          required
          rows={4}
          className="resize-none"
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <WKSelect
            name="industry"
            label="Industry"
            placeholder="Select industry"
            required
            options={industries}
            className="h-10 sm:h-11"
          />
          <WKSelect
            name="size"
            label="Company Size"
            placeholder="Select company size"
            required
            options={companySizes}
            className="h-10 sm:h-11"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Step 2: Location & Details
const LocationDetailsStep = () => {
  return (
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
          <WKInput
            name="location"
            label="Headquarters Location"
            required
            className="h-10 sm:h-11"
          />
          <WKInput
            name="founded"
            label="Founded Year"
            type="text"
            className="h-10 sm:h-11"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="websiteUrl" className="text-sm font-medium">
            Company Website
          </label>
          <div className="flex items-center space-x-2">
            <Globe className="text-muted-foreground h-4 w-4" />
            <WKInput
              name="websiteUrl"
              label=""
              type="text"
              className="h-10 sm:h-11"
            />
          </div>
        </div>

        <div className="bg-muted rounded-lg p-3 sm:p-4">
          <h4 className="mb-2 text-sm font-medium sm:text-base">
            Why add these details?
          </h4>
          <ul className="text-muted-foreground space-y-1 text-xs sm:text-sm">
            <li>• Location helps candidates find relevant opportunities</li>
            <li>• Company website builds trust and credibility</li>
            <li>• Founded year shows company stability and experience</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Step 3: Media & Contact
const MediaContactStep = () => {
  const { watch } = useFormContext<CompanyFormData>();
  const formData = watch();

  return (
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
            <label htmlFor="contactEmail" className="text-sm font-medium">
              Contact Email <span className="text-destructive ml-1">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <Mail className="text-muted-foreground h-4 w-4" />
              <WKInput
                name="contactEmail"
                label=""
                type="email"
                required
                className="h-10 sm:h-11"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="contactPhone" className="text-sm font-medium">
              Contact Phone
            </label>
            <div className="flex items-center space-x-2">
              <Phone className="text-muted-foreground h-4 w-4" />
              <WKInput
                name="contactPhone"
                label=""
                type="text"
                className="h-10 sm:h-11"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Logo</label>
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
            <label className="text-sm font-medium">
              Cover Image (Optional)
            </label>
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
                <span className="wrap-break-words">
                  {formData.name || "Not set"}
                </span>
              </p>
              <p>
                <strong>Industry:</strong> {formData.industry || "Not set"}
              </p>
              <p>
                <strong>Size:</strong> {formData.size || "Not set"}
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <strong>Location:</strong>{" "}
                <span className="wrap-break-words">
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
  );
};

const CompanyCreationView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Company data:", data);

      // In real app, redirect to company dashboard
      // router.push('/company/dashboard');
    } catch (error) {
      console.error("Failed to create company:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const defaultValues: Partial<CompanyFormData> = {
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
  };

  return (
    <div className="mt-24 min-h-screen py-4 sm:py-8">
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

        <WkForm<CompanyFormData>
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        >
          <SlugAutoGenerator />

          {/* Step 1: Basic Information */}
          {currentStep === 1 && <BasicInfoStep />}

          {/* Step 2: Location & Details */}
          {currentStep === 2 && <LocationDetailsStep />}

          {/* Step 3: Media & Contact */}
          {currentStep === 3 && <MediaContactStep />}

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
        </WkForm>
      </div>
    </div>
  );
};

export default CompanyCreationView;
