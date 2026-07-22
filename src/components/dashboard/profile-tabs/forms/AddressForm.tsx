'use client';

import WKCheckbox from '@/components/form/WKCheckbox';
import WkForm from '@/components/form/WkForm';
import WKInput from '@/components/form/WkInput';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AddressDetailsFormData, addressDetailsSchema } from './profile.validation';

interface AddressFormProps {
  onSubmit: (data: AddressDetailsFormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<AddressDetailsFormData>;
  isLoading?: boolean;
}

const AddressFields = ({ prefix }: { prefix: 'presentAddress' | 'permanentAddress' }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div className="md:col-span-2">
      <WKInput name={`${prefix}.street`} label="Street Address" placeholder="123 Main St, Apt 4B" />
    </div>
    <WKInput name={`${prefix}.city`} label="City" placeholder="New York" />
    <WKInput name={`${prefix}.state`} label="State / Province" placeholder="NY" />
    <WKInput name={`${prefix}.zipCode`} label="Zip / Postal Code" placeholder="10001" />
    <WKInput name={`${prefix}.country`} label="Country" placeholder="USA" />
  </div>
);

const AddressFormContent = ({
  onCancel,
  isLoading,
}: {
  onCancel: () => void;
  isLoading?: boolean;
}) => {
  const { watch, setValue } = useFormContext<AddressDetailsFormData>();
  const sameAsPresent = watch('sameAsPresent');
  const presentAddress = watch('presentAddress');

  useEffect(() => {
    if (sameAsPresent && presentAddress) {
      setValue('permanentAddress', presentAddress);
    }
  }, [sameAsPresent, presentAddress, setValue]);

  return (
    <>
      <Tabs defaultValue="present" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="present">Present Address</TabsTrigger>
          <TabsTrigger value="permanent">Permanent Address</TabsTrigger>
        </TabsList>

        <TabsContent value="present" className="space-y-4">
          <AddressFields prefix="presentAddress" />
        </TabsContent>

        <TabsContent value="permanent" className="space-y-4">
          <div className="mb-4">
            <WKCheckbox name="sameAsPresent" label="Same as Present Address" />
          </div>
          <div className={sameAsPresent ? 'pointer-events-none opacity-50' : ''}>
            <AddressFields prefix="permanentAddress" />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Address'}
        </Button>
      </div>
    </>
  );
};

const normalizeSingleAddress = (addr: Record<string, unknown> | null | undefined) => {
  return {
    street: (addr?.street as string) || '',
    city: (addr?.city as string) || '',
    state: (addr?.state as string) || '',
    zipCode: (addr?.zipCode as string) || '',
    country: (addr?.country as string) || '',
  };
};

const normalizeAddressData = (
  data: Record<string, unknown> | null | undefined,
): AddressDetailsFormData => {
  if (!data) {
    return {
      presentAddress: normalizeSingleAddress(null),
      permanentAddress: normalizeSingleAddress(null),
      sameAsPresent: false,
    };
  }

  const present = (data.presentAddress as Record<string, unknown>) || (data.street ? data : null);
  const permanent = (data.permanentAddress as Record<string, unknown>) || null;

  return {
    presentAddress: normalizeSingleAddress(present),
    permanentAddress: normalizeSingleAddress(permanent),
    sameAsPresent: (data.sameAsPresent as boolean) ?? false,
  };
};

export const AddressForm = ({ onSubmit, onCancel, defaultValues, isLoading }: AddressFormProps) => {
  const normalizedValues = normalizeAddressData(defaultValues);

  return (
    <WkForm<AddressDetailsFormData>
      onSubmit={onSubmit}
      defaultValues={normalizedValues}
      resolver={zodResolver(addressDetailsSchema)}
    >
      <AddressFormContent onCancel={onCancel} isLoading={isLoading} />
    </WkForm>
  );
};
