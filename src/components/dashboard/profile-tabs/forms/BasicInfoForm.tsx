"use client";

import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKTextArea from "@/components/form/WkTextArea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInfoFormData, basicInfoSchema } from "./profile.validation";

interface BasicInfoFormProps {
  defaultValues: BasicInfoFormData;
  onSubmit: (data: BasicInfoFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const BasicInfoForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: BasicInfoFormProps) => {
  return (
    <WkForm<BasicInfoFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      resolver={zodResolver(basicInfoSchema)}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <WKInput
          name="fullName"
          label="Full Name"
          placeholder="e.g. John Doe"
          required
        />
        <WKInput
          name="email"
          label="Email"
          placeholder="e.g. john@example.com"
          type="email"
          required
          disabled
        />
        <WKInput
          name="phone"
          label="Phone Number"
          placeholder="e.g. +1234567890"
          required
        />
        <WKInput
          name="location"
          label="Location"
          placeholder="e.g. New York, USA"
          required
        />
        <div className="md:col-span-2">
          <WKInput
            name="headline"
            label="Professional Headline"
            placeholder="e.g. Senior Full Stack Developer"
          />
        </div>
        <div className="md:col-span-2">
          <WKTextArea
            name="bio"
            label="Career Objective / Bio"
            placeholder="Write a short summary about yourself..."
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </WkForm>
  );
};
