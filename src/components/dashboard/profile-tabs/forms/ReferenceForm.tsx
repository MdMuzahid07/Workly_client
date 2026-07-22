'use client';

import WkForm from '@/components/form/WkForm';
import WKInput from '@/components/form/WkInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCheck } from 'lucide-react';
import { ReferenceFormData, referenceSchema } from './profile.validation';

interface ReferenceFormProps {
  onSubmit: (data: ReferenceFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<ReferenceFormData>;
}

export const ReferenceForm = ({
  onSubmit,
  onCancel,
  isLoading,
  defaultValues,
}: ReferenceFormProps) => {
  return (
    <WkForm<ReferenceFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues || {}}
      resolver={zodResolver(referenceSchema)}
    >
      <div className="space-y-4">
        <WKInput
          name="name"
          label="Reference Name"
          placeholder="e.g. Jane Doe"
          required
          labelIcon={<UserCheck className="text-primary h-4 w-4" />}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <WKInput name="company" label="Company" placeholder="e.g. Tech Corp" required />
          <WKInput
            name="position"
            label="Position"
            placeholder="e.g. Engineering Manager"
            required
          />
        </div>

        <WKInput
          name="relationship"
          label="Relationship"
          placeholder="e.g. Former Manager"
          required
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <WKInput
            name="email"
            label="Email"
            placeholder="jane@example.com"
            required
            type="email"
          />
          <WKInput name="phone" label="Phone (Optional)" placeholder="+1234567890" />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Reference'}
        </Button>
      </div>
    </WkForm>
  );
};
