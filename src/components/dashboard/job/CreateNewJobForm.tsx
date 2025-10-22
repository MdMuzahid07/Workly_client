// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Label } from "@radix-ui/react-label";

// import { useCreateJobMutation } from "../../../redux/feature/job/jobApi";
// import { Button } from "../../ui/button";
// import { Input } from "../../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../ui/select";
// import { Textarea } from "../../ui/textarea";

// const CreateNewJobForm = ({ onClose }: any) => {
//   const [createJob, { isLoading, isError, data }] = useCreateJobMutation();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     createJob(formData);
//   };

//   return (
//     <form className="space-y-6">
//       <div className="space-y-4">
//         {/* Job Title */}
//         <div className="space-y-2">
//           <Label htmlFor="title">Job Title *</Label>
//           <Input id="title" placeholder="e.g. Senior Frontend Developer" />
//         </div>

//         {/* Job Type and Experience Level */}
//         <div className="grid gap-4 sm:grid-cols-2">
//           <div className="space-y-2">
//             <Label htmlFor="type">Job Type *</Label>
//             <Select>
//               <SelectTrigger id="type">
//                 <SelectValue placeholder="Select type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="full-time">Full-time</SelectItem>
//                 <SelectItem value="part-time">Part-time</SelectItem>
//                 <SelectItem value="contract">Contract</SelectItem>
//                 <SelectItem value="internship">Internship</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="experience">Experience Level *</Label>
//             <Select>
//               <SelectTrigger id="experience">
//                 <SelectValue placeholder="Select level" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="entry">Entry Level</SelectItem>
//                 <SelectItem value="mid">Mid-level</SelectItem>
//                 <SelectItem value="senior">Senior</SelectItem>
//                 <SelectItem value="lead">Lead</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Location and Remote */}
//         <div className="grid gap-4 sm:grid-cols-2">
//           <div className="space-y-2">
//             <Label htmlFor="location">Location *</Label>
//             <Input id="location" placeholder="e.g. San Francisco, CA" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="remote">Work Mode *</Label>
//             <Select>
//               <SelectTrigger id="remote">
//                 <SelectValue placeholder="Select mode" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="onsite">On-site</SelectItem>
//                 <SelectItem value="remote">Remote</SelectItem>
//                 <SelectItem value="hybrid">Hybrid</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Salary Range */}
//         <div className="grid gap-4 sm:grid-cols-2">
//           <div className="space-y-2">
//             <Label htmlFor="salaryMin">Minimum Salary</Label>
//             <Input id="salaryMin" type="number" placeholder="80000" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="salaryMax">Maximum Salary</Label>
//             <Input id="salaryMax" type="number" placeholder="120000" />
//           </div>
//         </div>

//         {/* Description */}
//         <div className="space-y-2">
//           <Label htmlFor="description">Job Description *</Label>
//           <Textarea
//             id="description"
//             placeholder="Describe the role, responsibilities, and what you're looking for..."
//             className="min-h-[120px]"
//           />
//         </div>

//         {/* Requirements */}
//         <div className="space-y-2">
//           <Label htmlFor="requirements">Requirements *</Label>
//           <Textarea
//             id="requirements"
//             placeholder="List the key requirements and qualifications..."
//             className="min-h-[100px]"
//           />
//         </div>

//         {/* Skills */}
//         <div className="space-y-2">
//           <Label htmlFor="skills">Required Skills</Label>
//           <Input
//             id="skills"
//             placeholder="e.g. React, TypeScript, Node.js (comma separated)"
//           />
//         </div>

//         {/* Benefits */}
//         <div className="space-y-2">
//           <Label htmlFor="benefits">Benefits</Label>
//           <Textarea
//             id="benefits"
//             placeholder="List the benefits and perks..."
//             className="min-h-[80px]"
//           />
//         </div>

//         {/* Featured */}
//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             id="featured"
//             className="h-4 w-4 rounded text-green-600"
//           />
//           <Label htmlFor="featured" className="font-normal">
//             Mark as featured job
//           </Label>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onClose}
//           className="bg-transparent"
//         >
//           Cancel
//         </Button>
//         <Button type="submit">Create Job Posting</Button>
//       </div>
//     </form>
//   );
// };

// export default CreateNewJobForm;

"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateJobMutation } from "../../../redux/feature/job/jobApi";
import WKCheckbox from "../../form/WKCheckbox";
import WkForm from "../../form/WkForm";
import WKInput from "../../form/WkInput";
import WKSelect from "../../form/WkSelect";
import WKTextArea from "../../form/WkTextArea";
import { Button } from "../../ui/button";

interface JobFormData {
  title: string;
  type: string;
  experience: string;
  location: string;
  remote: string;
  salaryMin?: string;
  salaryMax?: string;
  description: string;
  requirements: string;
  skills?: string;
  benefits?: string;
  featured?: boolean;
}

const CreateNewJobForm = ({ onClose }: any) => {
  const [createJob, { isLoading }] = useCreateJobMutation();

  const handleSubmit = async (data: JobFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          formData.append(key, String(value));
        }
      });

      const response = await createJob(formData).unwrap();

      if (response) {
        console.log("Job created successfully:", response);
      }

      onClose();
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  const defaultValues: Partial<JobFormData> = {
    title: "",
    type: "",
    experience: "",
    location: "",
    remote: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    skills: "",
    benefits: "",
    featured: false,
  };

  return (
    <WkForm<JobFormData> onSubmit={handleSubmit} defaultValues={defaultValues}>
      <div className="space-y-6">
        <div className="space-y-4">
          <WKInput name="title" label="Job Title" required />

          <div className="grid gap-4 sm:grid-cols-2">
            <WKSelect
              name="type"
              label="Job Type"
              placeholder="Select type"
              required
              options={[
                { value: "full-time", label: "Full-time" },
                { value: "part-time", label: "Part-time" },
                { value: "contract", label: "Contract" },
                { value: "internship", label: "Internship" },
              ]}
            />

            <WKSelect
              name="experience"
              label="Experience Level"
              placeholder="Select level"
              required
              options={[
                { value: "entry", label: "Entry Level" },
                { value: "mid", label: "Mid-level" },
                { value: "senior", label: "Senior" },
                { value: "lead", label: "Lead" },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <WKInput name="location" label="Location" required />

            <WKSelect
              name="remote"
              label="Work Mode"
              placeholder="Select mode"
              required
              options={[
                { value: "onsite", label: "On-site" },
                { value: "remote", label: "Remote" },
                { value: "hybrid", label: "Hybrid" },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <WKInput name="salaryMin" label="Minimum Salary" type="text" />

            <WKInput name="salaryMax" label="Maximum Salary" type="text" />
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

          <WKInput name="skills" label="Required Skills" />

          <WKTextArea name="benefits" label="Benefits" rows={3} />

          <WKCheckbox name="featured" label="Mark as featured job" />
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
