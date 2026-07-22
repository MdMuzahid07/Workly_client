'use client';

import WKDatePicker from '@/components/form/WKDatePicker';
import WkForm from '@/components/form/WkForm';
import WKInput from '@/components/form/WkInput';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { CertificationFormData, certificationSchema } from './profile.validation';

interface CertificationFormProps {
  onSubmit: (data: CertificationFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<CertificationFormData>;
}

export const CertificationForm = ({
  onSubmit,
  onCancel,
  isLoading,
  defaultValues,
}: CertificationFormProps) => {
  const [activeTab, setActiveTab] = useState('link');

  return (
    <WkForm<CertificationFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues || {}}
      resolver={zodResolver(certificationSchema)}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <WKInput
            name="name"
            label="Certification Name"
            placeholder="e.g. AWS Certified Solutions Architect"
            required
          />
        </div>
        <WKInput
          name="organization"
          label="Issuing Organization"
          placeholder="e.g. Amazon Web Services"
          required
        />
        <WKInput name="credentialId" label="Credential ID" placeholder="Optional" />

        <WKDatePicker name="issueDate" label="Issue Date" required />
        <WKDatePicker name="expirationDate" label="Expiration Date" />

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm leading-none font-medium">Credential Proof</label>
          <Tabs
            defaultValue="link"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="link">Credential URL</TabsTrigger>
              <TabsTrigger value="file">Upload Certificate</TabsTrigger>
            </TabsList>
            <TabsContent value="link" className="pt-4">
              <WKInput name="credentialUrl" label="Credential URL" placeholder="https://..." />
            </TabsContent>
            <TabsContent value="file" className="pt-4">
              <div className="flex w-full items-center justify-center">
                <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="mb-3 h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500">Upload Certificate PDF/Image</p>
                  </div>
                  <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                </label>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Certification'}
        </Button>
      </div>
    </WkForm>
  );
};
