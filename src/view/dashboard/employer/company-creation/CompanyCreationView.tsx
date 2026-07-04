"use client";
import WkForm from "@/components/form/WkForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import BasicInfoStep from "../../../../components/main/company/createCompany/BasicInfoStep";
import LocationDetailsStep from "../../../../components/main/company/createCompany/LocationDetailsStep";
import MediaContactStep from "../../../../components/main/company/createCompany/MediaContactStep";
import { updateUser } from "../../../../redux/feature/auth/authSlice";
import { useGetCategoriesQuery } from "../../../../redux/feature/category/categoryApi";
import { useCreateCompanyMutation } from "../../../../redux/feature/company/companyApi";
import { useAppDispatch } from "../../../../redux/hooks";

export interface CompanyFormData {
  name: string;
  slug: string;
  description: string;
  industryId: string;
  size: string;
  location: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
  founded: string;
  logoUrl: string;
  coverUrl: string;
}

const companySizes = [
  { value: "1-10", label: "1-10 staff" },
  { value: "11-50", label: "11-50 staff" },
  { value: "51-200", label: "51-200 staff" },
  { value: "201-500", label: "201-500 staff" },
  { value: "501-1000", label: "501-1000 staff" },
  { value: "1000+", label: "1000+ staff" },
];

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

const defaultValues: Partial<CompanyFormData> = {
  name: "",
  slug: "",
  description: "",
  industryId: "",
  size: "",
  location: "",
  websiteUrl: "https://",
  contactEmail: "",
  contactPhone: "",
  founded: "",
  logoUrl: "",
  coverUrl: "",
};

const CompanyCreationView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createCompany, { isLoading }] = useCreateCompanyMutation();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true);

    try {
      const payload = {
        ...data,
        founded: data.founded ? new Date(data.founded).toISOString() : null,
        websiteUrl: data.websiteUrl,
      };
      const result = await createCompany(payload).unwrap();

      if (result && result.success) {
        toast.success("Company created successfully!");
        dispatch(
          updateUser({
            companyId: result.data.id || "",
          }),
        );
        router.push("/employer");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to create company:", error);
      toast.error(`${error?.data?.errorSources?.message || "Unknown error"}`);
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

        {/* progress steps */}
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
            <div className="text-muted-foreground grid grid-cols-3 text-center text-xs sm:flex sm:space-x-16 sm:text-sm">
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

          {currentStep === 1 && (
            <BasicInfoStep
              industries={categories?.data || []}
              companySizes={companySizes}
              loadingIndustries={categoriesLoading}
            />
          )}

          {currentStep === 2 && <LocationDetailsStep />}

          {currentStep === 3 && <MediaContactStep />}

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
                  disabled={isSubmitting || isLoading}
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
