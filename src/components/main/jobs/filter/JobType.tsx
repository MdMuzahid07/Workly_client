/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

const JobType = ({
  updateFilters,
  filters,
}: {
  updateFilters: any;
  filters: any;
}) => {
  const jobTypes = [
    { label: "Full-time", value: "FULL_TIME" },
    { label: "Part-time", value: "PART_TIME" },
    { label: "Contract", value: "CONTRACT" },
    { label: "Internship", value: "INTERNSHIP" },
    { label: "Freelance", value: "FREELANCE" },
    { label: "Remote", value: "REMOTE" },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Job Type</Label>
      <RadioGroup
        value={filters.jobType}
        onValueChange={(value) => updateFilters({ jobType: value })}
      >
        {jobTypes.map((type) => (
          <div key={type.value} className="flex items-center space-x-2">
            <RadioGroupItem value={type.value} id={`type-${type.value}`} />
            <Label
              htmlFor={`type-${type.value}`}
              className="cursor-pointer text-sm"
            >
              {type.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default JobType;
