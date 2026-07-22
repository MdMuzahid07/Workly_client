/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import WKCheckbox from '@/components/form/WKCheckbox';
import WkForm from '@/components/form/WkForm';
import WKInput from '@/components/form/WkInput';
import WKSelect from '@/components/form/WkSelect';
import { Button } from '@/components/ui/button';
import { useGetCategoriesQuery } from '@/redux/feature/category/categoryApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { JobPreferenceFormData, jobPreferenceSchema } from './profile.validation';

interface JobPreferenceFormProps {
  onSubmit: (data: JobPreferenceFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<JobPreferenceFormData>;
}

const JOB_TYPE_OPTIONS = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'FREELANCE', label: 'Freelance' },
] as const;

const EXPERIENCE_LEVEL_OPTIONS = [
  { value: 'Intern', label: 'Intern' },
  { value: 'Junior', label: 'Junior' },
  { value: 'Mid-Level', label: 'Mid-Level' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Lead', label: 'Lead' },
] as const;

export const JobPreferenceForm = ({
  onSubmit,
  onCancel,
  isLoading,
  defaultValues,
}: JobPreferenceFormProps) => {
  const { data: categoriesResponse } = useGetCategoriesQuery(undefined);

  const categoryOptions = useMemo(() => {
    if (!categoriesResponse?.data) return [];
    return categoriesResponse.data.map((cat: any) => ({
      value: cat.name,
      label: cat.name,
    }));
  }, [categoriesResponse]);

  return (
    <WkForm<JobPreferenceFormData>
      onSubmit={onSubmit}
      resolver={zodResolver(jobPreferenceSchema) as any}
      defaultValues={{
        jobType: 'FULL_TIME',
        expectedSalary: 0,
        preferredLocation: '',
        industry: '',
        workExperience: '',
        remoteWork: false,
        ...defaultValues,
      }}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <WKSelect
            name="jobType"
            label="Job Type"
            placeholder="Select job type"
            options={JOB_TYPE_OPTIONS}
            required
          />

          <WKInput
            name="expectedSalary"
            label="Expected Salary ($)"
            type="number"
            placeholder="e.g. 50000"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <WKInput
            name="preferredLocation"
            label="Preferred Location"
            placeholder="e.g. Remote, New York"
            required
          />

          <WKSelect
            name="industry"
            label="Industry"
            placeholder="Select Industry"
            options={categoryOptions}
            required
          />
        </div>

        <WKSelect
          name="workExperience"
          label="Experience Level"
          placeholder="Select level"
          options={EXPERIENCE_LEVEL_OPTIONS}
          required
        />

        <WKCheckbox name="remoteWork" label="Open to Remote Work" />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </WkForm>
  );
};
