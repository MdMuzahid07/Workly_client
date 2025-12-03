"use client";

import { JwtPayload, jwtDecode } from "jwt-decode";
import { toast } from "sonner";
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

const CreateNewJobForm = ({ onClose }: CreateNewJobFormProps) => {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const user = useAppSelector((state) => state.auth.user);
  const decodedToken = jwtDecode<AuthTokenPayload>(
    localStorage.getItem("accessToken") || "",
  );

  const userCompanyId = decodedToken?.companyId || user?.companyId;

  console.log(userCompanyId, "userCompanyId");

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
    location: "",
    isRemote: false,
    salaryMin: 0,
    salaryMax: 0,
    currency: "BDT",
    description: "",
    requirements: [],
    benefits: [],
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
          <WKInput name="title" label="Job Title" required />

          <div className="grid gap-4 sm:grid-cols-2">
            <WKInput name="discipline" label="Discipline" required />

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

            <WKInput name="location" label="Location" required />
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
