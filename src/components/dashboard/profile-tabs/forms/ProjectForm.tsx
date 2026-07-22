'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import WKDatePicker from '../../../form/WKDatePicker';
import WkForm from '../../../form/WkForm';
import WKInput from '../../../form/WkInput';
import WKTextArea from '../../../form/WkTextArea';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { ProjectFormData, projectSchema } from './profile.validation';

const TechnologiesInput = () => {
  const { watch, setValue } = useFormContext();
  const currentTechs = watch('technologies') || [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.currentTarget.value.trim();
      if (val && !currentTechs.includes(val)) {
        setValue('technologies', [...currentTechs, val]);
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (tech: string) => {
    setValue(
      'technologies',
      currentTechs.filter((t: string) => t !== tech),
    );
  };

  return (
    <div className="space-y-2">
      <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Technologies Used
      </label>
      <div className="mb-2 flex flex-wrap gap-2">
        {currentTechs.map((tech: string) => (
          <Badge key={tech} variant="secondary" className="gap-1 pr-1">
            {tech}
            <X
              className="hover:text-destructive h-3 w-3 cursor-pointer"
              onClick={() => removeTag(tech)}
            />
          </Badge>
        ))}
      </div>
      <input
        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Type technology and press Enter (e.g. React)"
        onKeyDown={handleKeyDown}
      />
      <p className="text-muted-foreground text-[0.8rem]">Press Enter to add tags</p>
    </div>
  );
};

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<ProjectFormData>;
  isLoading?: boolean;
}

export const ProjectForm = ({ onSubmit, onCancel, defaultValues, isLoading }: ProjectFormProps) => {
  return (
    <WkForm<ProjectFormData>
      onSubmit={onSubmit}
      defaultValues={
        {
          ...defaultValues,
          technologies: defaultValues?.technologies || [],
        } as unknown as ProjectFormData
      }
      resolver={zodResolver(projectSchema)}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <WKInput
            name="title"
            label="Project Title"
            placeholder="e.g. E-Commerce Platform"
            required
          />
        </div>

        <WKInput name="projectUrl" label="Live URL" placeholder="https://..." />
        <WKInput name="repoUrl" label="Repository URL" placeholder="https://github.com/..." />

        <WKDatePicker name="startDate" label="Start Date" />
        <WKDatePicker name="endDate" label="End Date" />

        <div className="md:col-span-2">
          <TechnologiesInput />
        </div>

        <div className="md:col-span-2">
          <WKTextArea
            name="description"
            label="Project Description"
            placeholder="Describe the project, your role, and the outcome..."
            className="min-h-[120px]"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Project'}
        </Button>
      </div>
    </WkForm>
  );
};
