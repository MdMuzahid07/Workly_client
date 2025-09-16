/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock } from "lucide-react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

const PostedWithin = ({
  updateFilters,
  filters,
}: {
  updateFilters: any;
  filters: any;
}) => {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Clock className="h-4 w-4" />
        Posted Within
      </Label>
      <RadioGroup
        value={filters.postedWithin}
        onValueChange={(value) => updateFilters({ postedWithin: value })}
      >
        {["Last 24 hours", "Last 3 days", "Last week", "Last month"].map(
          (time) => (
            <div key={time} className="flex items-center space-x-2">
              <RadioGroupItem value={time.toLowerCase()} id={`time-${time}`} />
              <Label
                htmlFor={`time-${time}`}
                className="cursor-pointer text-sm"
              >
                {time}
              </Label>
            </div>
          ),
        )}
      </RadioGroup>
    </div>
  );
};

export default PostedWithin;
