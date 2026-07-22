'use client';

import WKCheckbox from '@/components/form/WKCheckbox';
import WKDatePicker from '@/components/form/WKDatePicker';
import WkForm from '@/components/form/WkForm';
import WKInput from '@/components/form/WkInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from 'react-hook-form';
import { VolunteerFormData, volunteerSchema } from './profile.validation';
import WKTextArea from '../../../form/WkTextArea';

interface VolunteerFormProps {
  onSubmit: (data: VolunteerFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<VolunteerFormData>;
}

const DateFields = () => {
  const { watch } = useFormContext<VolunteerFormData>();
  const currentlyVolunteering = watch('currentlyVolunteering');

  return (
    <div className="grid grid-cols-2 gap-4">
      <WKDatePicker name="startDate" label="Start Date" />
      <div className={currentlyVolunteering ? 'pointer-events-none opacity-50' : ''}>
        <WKDatePicker name="endDate" label="End Date" disabled={currentlyVolunteering} />
      </div>
    </div>
  );
};

export const VolunteerForm = ({
  onSubmit,
  onCancel,
  isLoading,
  defaultValues,
}: VolunteerFormProps) => {
  return (
    <WkForm<VolunteerFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues || { currentlyVolunteering: false }}
      resolver={zodResolver(volunteerSchema)}
    >
      <div className="space-y-4">
        <WKInput name="organization" label="Organization" placeholder="e.g. Red Cross" required />
        <WKInput name="role" label="Role" placeholder="e.g. Volunteer Coordinator" required />

        <DateFields />

        <WKCheckbox name="currentlyVolunteering" label="I am currently volunteering here" />

        <WKTextArea
          name="description"
          label="Description"
          placeholder="Describe your responsibilities and impact..."
          required
          className="min-h-[100px]"
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Volunteer Work'}
        </Button>
      </div>
    </WkForm>
  );
};
