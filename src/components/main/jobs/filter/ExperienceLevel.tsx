/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

const ExperienceLevel = ({
  updateFilters,
  filters,
}: {
  updateFilters: any;
  filters: any;
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Experience Level</Label>
      <RadioGroup
        value={filters.experienceLevel}
        onValueChange={(value) => updateFilters({ experienceLevel: value })}
      >
        {["Entry Level", "Intermediate", "Expert"].map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <RadioGroupItem value={level.toLowerCase()} id={`exp-${level}`} />
            <Label htmlFor={`exp-${level}`} className="cursor-pointer text-sm">
              {level}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ExperienceLevel;
