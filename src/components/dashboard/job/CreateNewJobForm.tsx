/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { JwtPayload, jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useGetCategoriesQuery } from "../../../redux/feature/category/categoryApi";
import { useCreateJobMutation } from "../../../redux/feature/job/jobApi";
import { useAppSelector } from "../../../redux/hooks";
import WKCheckbox from "../../form/WKCheckbox";
import WKDatePicker from "../../form/WKDatePicker";
import WkForm from "../../form/WkForm";
import WKInput from "../../form/WkInput";
import WKSelect from "../../form/WkSelect";
import WKTextArea from "../../form/WkTextArea";
import { Button } from "../../ui/button";
import CreateJobFromSkillSection, {
  SkillRequired,
} from "./CreateJobFromSkillSection";
import StringArrayField from "./StringArrayField";

export interface JobFormData {
  title: string;
  discipline: string;
  industryId: string;
  jobType: string;
  experienceLevel: string;
  location: string;
  isRemote: boolean;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  requirements: string[];
  benefits: string[];
  contactEmail: string;
  applicationDeadline: string;
  maxApplications: number;
  isFeatured: boolean;
  autoCloseApplications: boolean;
  skillsRequired: SkillRequired[];
}

interface AuthTokenPayload extends JwtPayload {
  companyId?: string | number;
}

interface CreateNewJobFormProps {
  onClose?: () => void;
}

const SubcategorySelect = ({ categories }: { categories: any }) => {
  const { watch } = useFormContext<JobFormData>();
  const selectedIndustry = watch("industryId");

  const subcategoryOptions = useMemo(() => {
    if (!categories?.data || !selectedIndustry) return [];

    const category = categories.data.find(
      (cat: any) => cat.id === selectedIndustry,
    );
    return (
      category?.subcategories.map((sub: string) => ({
        value: sub,
        label: sub,
      })) || []
    );
  }, [categories, selectedIndustry]);

  return (
    <WKSelect
      className="w-full"
      name="discipline"
      label="Discipline"
      placeholder={
        selectedIndustry ? "Select discipline" : "Select industry first"
      }
      required
      disabled={!selectedIndustry}
      options={subcategoryOptions}
    />
  );
};

const CreateNewJobForm = ({ onClose }: CreateNewJobFormProps) => {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);
  const decodedToken = jwtDecode<AuthTokenPayload>(
    localStorage.getItem("accessToken") || "",
  );

  const userCompanyId = decodedToken?.companyId || user?.companyId;

  const handleSubmit = async (data: JobFormData) => {
    try {
      const payload = {
        ...data,
        companyId: userCompanyId,
        salaryMin: Number(data.salaryMin),
        salaryMax: Number(data.salaryMax),
        maxApplications: Number(data.maxApplications),
        isActive: true,
        applicationDeadline: new Date(data.applicationDeadline).toISOString(),
        skillsRequired: data.skillsRequired.map((skill) => ({
          ...skill,
          experienceYears: Number(skill.experienceYears),
        })),
      };

      const response = await createJob(payload).unwrap();
      toast.success(response?.message ?? "Job created successfully");
      onClose?.();
    } catch (error) {
      const errorMessage =
        (error as { data?: { message?: string }; message?: string })?.data
          ?.message ??
        (error as { message?: string })?.message ??
        "Failed to create job";
      toast.error(errorMessage);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const defaultValues: Partial<JobFormData> = {
    title: "",
    discipline: "",
    jobType: "",
    experienceLevel: "",
    industryId: "",
    location: "",
    isRemote: false,
    salaryMin: 0,
    salaryMax: 0,
    currency: "BDT",
    description: "",
    requirements: [
      "Bachelor's degree in relevant field or equivalent experience",
      "Strong communication skills in English",
      "Proven problem-solving abilities",
      "Ability to work independently and in a team",
      "Adaptability to changing priorities and deadlines",
      "Strong work ethic and professional attitude",
      "Willingness to learn and develop new skills",
      "Ability to handle multiple tasks simultaneously",
      "Good interpersonal skills",
      "Critical thinking and analytical skills",
      "Positive attitude and enthusiasm",
      "Collaborative mindset",
      "Ability to work under pressure",
    ],
    benefits: [
      "Performance bonuses and yearly increments",
      "Festival bonuses (Eid bonuses)",
      "Provident fund contribution",
      "Medical insurance for employee and family",
      "Life insurance coverage",
      "Transportation or conveyance allowance",
      "Lunch or meal allowance",
      "Paid time off and sick leave",
      "Casual leave and earned leave",
      "Public holiday observance",
      "Prayer break facilities",
      "Training and skill development programs",
      "Online course subscriptions",
      "Mentorship programs",
      "Professional certification support",
      "Annual health checkups",
      "Gym membership or wellness programs",
      "Mental health support",
      "Ergonomic workspace setup",
      "Health and safety equipment",
      "Annual team outings or trips",
      "Free snacks and beverages",
      "Employee recognition programs",
      "Performance-based stock options",
    ],
    contactEmail: "",
    applicationDeadline: "",
    maxApplications: 100,
    isFeatured: false,
    autoCloseApplications: true,
    skillsRequired: [],
  };

  return (
    <WkForm<JobFormData> onSubmit={handleSubmit} defaultValues={defaultValues}>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <WKInput
              name="title"
              label="Job Title"
              placeholder="Write job title"
              required
            />

            <WKSelect
              name="jobType"
              label="Job Type"
              placeholder="Select type"
              className="w-full"
              required
              options={[
                { value: "FULL_TIME", label: "Full-time" },
                { value: "PART_TIME", label: "Part-time" },
                { value: "CONTRACT", label: "Contract" },
                { value: "INTERNSHIP", label: "Internship" },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <WKSelect
              className="w-full"
              name="experienceLevel"
              label="Experience Level"
              placeholder="Select level"
              required
              options={[
                { value: "Entry", label: "Entry Level" },
                { value: "Mid", label: "Mid-level" },
                { value: "Senior", label: "Senior" },
                { value: "Lead", label: "Lead" },
              ]}
            />

            <WKInput
              name="location"
              label="Location"
              placeholder="Add company location"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <WKSelect
              className="w-full"
              name="industryId"
              label="Industry"
              placeholder={categoriesLoading ? "Loading..." : "Select Industry"}
              required
              options={
                categories?.data?.map((cat: any) => ({
                  value: cat.id,
                  label: cat.name,
                })) || []
              }
            />
            <SubcategorySelect categories={categories} />
          </div>

          <WKCheckbox name="isRemote" label="Remote position" />

          <div className="grid gap-4 sm:grid-cols-3">
            <WKInput
              name="salaryMin"
              label="Minimum Salary"
              type="text"
              required
            />

            <WKInput
              name="salaryMax"
              label="Maximum Salary"
              type="text"
              required
            />

            <WKSelect
              className="w-full"
              name="currency"
              label="Currency"
              placeholder="Select"
              required
              options={[
                { value: "BDT", label: "BDT" },
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
              ]}
            />
          </div>

          <WKTextArea
            name="description"
            label="Job Description"
            placeholder="Write job description..."
            required
            rows={5}
          />

          <StringArrayField
            fieldName="requirements"
            label="Requirements"
            placeholder="Enter a requirement..."
            required
          />

          <StringArrayField
            fieldName="benefits"
            label="Benefits"
            placeholder="Enter a benefit..."
          />

          <CreateJobFromSkillSection />

          <div className="grid gap-4 sm:grid-cols-2">
            <WKInput
              name="contactEmail"
              label="Contact Email"
              type="email"
              placeholder="Add contact email"
              required
            />

            <WKDatePicker
              name="applicationDeadline"
              label="Application Deadline"
              required
              min={getTodayDate()}
            />
          </div>

          <WKInput
            name="maxApplications"
            label="Maximum Applications"
            type="text"
          />

          <div className="space-y-2">
            <WKCheckbox name="isFeatured" label="Mark as featured job" />
            <WKCheckbox
              name="autoCloseApplications"
              label="Auto-close when max applications reached"
            />
          </div>
        </div>

        <div className="border-primary/10 flex justify-end gap-3 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose ? onClose : undefined}
            className="bg-transparent"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Job Posting"}
          </Button>
        </div>
      </div>
    </WkForm>
  );
};

export default CreateNewJobForm;
