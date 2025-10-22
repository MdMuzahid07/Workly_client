"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateJobMutation } from "../../../redux/feature/job/jobApi";
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
  requirements: string;
  benefits: string;
  contactEmail: string;
  applicationDeadline: string;
  maxApplications: number;
  isFeatured: boolean;
  autoCloseApplications: boolean;
  skillsRequired: SkillRequired[];
}

const CreateNewJobForm = ({ onClose, companyId }: any) => {
  const [createJob, { isLoading }] = useCreateJobMutation();

  const handleSubmit = async (data: JobFormData) => {
    //! todo => company is undefined, need to fix it later
    console.log("Form Data Submitted:", data, "company id", ": => ", companyId);

    try {
      const payload = {
        ...data,
        companyId,
        salaryMin: Number(data.salaryMin),
        salaryMax: Number(data.salaryMax),
        maxApplications: Number(data.maxApplications),
        isActive: true,
        applicationDeadline: new Date(data.applicationDeadline).toISOString(),
      };

      await createJob(payload).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to create job:", error);
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
    requirements: "",
    benefits: "",
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

          <WKTextArea
            name="requirements"
            label="Requirements"
            required
            rows={4}
          />

          <WKTextArea name="benefits" label="Benefits" rows={3} />

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

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
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
