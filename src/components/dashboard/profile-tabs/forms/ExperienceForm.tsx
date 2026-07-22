/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import WKCheckbox from '@/components/form/WKCheckbox';
import WKDatePicker from '@/components/form/WKDatePicker';
import WkForm from '@/components/form/WkForm';
import WKInput from '@/components/form/WkInput';
import WKSelect from '@/components/form/WkSelect';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWatch } from 'react-hook-form';
import { EMPLOYMENT_TYPES, ExperienceFormData, experienceSchema } from './profile.validation';
import WKTextArea from '../../../form/WkTextArea';

// Helper component to conditionally disable end date
const ExperienceDateFields = () => {
  const currentlyWorking = useWatch({ name: 'currentlyWorking' });
  return (
    <>
      <WKDatePicker name="startDate" label="Start Date" required />
      <div className={currentlyWorking ? 'pointer-events-none opacity-50' : ''}>
        <WKDatePicker name="endDate" label="End Date" />
      </div>
    </>
  );
};

interface ExperienceFormProps {
  onSubmit: (data: ExperienceFormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<ExperienceFormData>;
  isLoading?: boolean;
}

export const ExperienceForm = ({
  onSubmit,
  onCancel,
  defaultValues,
  isLoading,
}: ExperienceFormProps) => {
  const employmentTypeOptions = EMPLOYMENT_TYPES.map((type) => ({
    value: type,
    label: type,
  }));

  return (
    <WkForm<ExperienceFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues as unknown as ExperienceFormData}
      resolver={zodResolver(experienceSchema) as any}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <WKInput
          name="designation"
          label="Designation / Job Title"
          placeholder="e.g. Senior Frontend Developer"
          required
        />
        <WKInput
          name="company"
          label="Company Name"
          placeholder="e.g. Tech Solutions Inc."
          required
        />

        <WKSelect
          name="employmentType"
          label="Employment Type"
          placeholder="Select Type"
          options={employmentTypeOptions}
        />
        <WKInput name="location" label="Location" placeholder="e.g. Remote / New York" />

        <ExperienceDateFields />

        <div className="pt-2 md:col-span-2">
          <WKCheckbox name="currentlyWorking" label="I am currently working here" />
        </div>

        <div className="md:col-span-2">
          <WKTextArea
            name="description"
            label="Job Description"
            placeholder="Describe your responsibilities and key achievements..."
            className="min-h-[120px]"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Experience'}
        </Button>
      </div>
    </WkForm>
  );
};
