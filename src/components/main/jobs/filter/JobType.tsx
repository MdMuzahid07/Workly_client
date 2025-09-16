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
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Job Type</Label>
      <RadioGroup
        value={filters.jobType}
        onValueChange={(value) => updateFilters({ jobType: value })}
      >
        {["Fixed Price", "Hourly", "Contract", "Full-time"].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <RadioGroupItem value={type.toLowerCase()} id={`type-${type}`} />
            <Label htmlFor={`type-${type}`} className="cursor-pointer text-sm">
              {type}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default JobType;
