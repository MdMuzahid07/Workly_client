"use client";

import CreateJobFromSkillSection from "@/components/dashboard/job/CreateJobFromSkillSection";
import StringArrayField from "@/components/dashboard/job/StringArrayField";
import WKTextArea from "@/components/form/WkTextArea";

export default function Step2JobDetails() {
  return (
    <div className="animate-in fade-in-50 space-y-6 duration-300">
      <div>
        <h2 className="text-foreground text-lg font-semibold">Job Details</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Describe the role and what {`you're`} looking for
        </p>
      </div>

      <div className="space-y-4">
        {/* Description */}
        <WKTextArea
          name="description"
          label="Job Description"
          placeholder="Provide a detailed description of the role, responsibilities, and what makes this opportunity unique..."
          required
          rows={6}
        />

        {/* Requirements */}
        <StringArrayField
          fieldName="requirements"
          label="Requirements"
          placeholder="Enter a requirement..."
          required
        />

        {/* Skills Section - JobSkill table */}
        <CreateJobFromSkillSection />
      </div>
    </div>
  );
}
