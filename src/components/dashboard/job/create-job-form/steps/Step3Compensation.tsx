'use client';

import WKInput from '@/components/form/WkInput';
import WKSelect from '@/components/form/WkSelect';
import StringArrayField from '@/components/dashboard/job/StringArrayField';

export default function Step3Compensation() {
  return (
    <div className="animate-in fade-in-50 space-y-6 duration-300">
      <div>
        <h2 className="text-foreground text-lg font-semibold">Compensation & Benefits</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Define the salary range and benefits package
        </p>
      </div>

      <div className="space-y-4">
        {/* Salary Range */}
        <div className="grid gap-4 sm:grid-cols-3">
          <WKInput
            name="salaryMin"
            label="Minimum Salary"
            type="number"
            placeholder="e.g., 50000"
          />

          <WKInput
            name="salaryMax"
            label="Maximum Salary"
            type="number"
            placeholder="e.g., 80000"
          />

          <WKSelect
            className="w-full"
            name="currency"
            label="Currency"
            placeholder="Select"
            required
            options={[
              { value: 'BDT', label: 'BDT (৳)' },
              { value: 'USD', label: 'USD ($)' },
              { value: 'EUR', label: 'EUR (€)' },
              { value: 'GBP', label: 'GBP (£)' },
              { value: 'INR', label: 'INR (₹)' },
            ]}
          />
        </div>

        {/* Benefits */}
        <StringArrayField fieldName="benefits" label="Benefits" placeholder="Enter a benefit..." />
      </div>
    </div>
  );
}
