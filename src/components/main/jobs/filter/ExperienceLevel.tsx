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
  const experienceLevels = [
    { label: "Entry Level", value: "Entry Level" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Expert", value: "Expert" },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Experience Level</Label>
      <RadioGroup
        value={filters.experienceLevel}
        onValueChange={(value) => updateFilters({ experienceLevel: value })}
      >
        {experienceLevels.map((level) => (
          <div key={level.value} className="flex items-center space-x-2">
            <RadioGroupItem value={level.value} id={`exp-${level.value}`} />
            <Label
              htmlFor={`exp-${level.value}`}
              className="cursor-pointer text-sm"
            >
              {level.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ExperienceLevel;
