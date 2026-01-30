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
  //! backend expects: 24h, 3d, 1w, 1m =========>
  const timeOptions = [
    { label: "Last 24 hours", value: "24h" },
    { label: "Last 3 days", value: "3d" },
    { label: "Last week", value: "1w" },
    { label: "Last month", value: "1m" },
  ];

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
        {timeOptions.map((time) => (
          <div key={time.value} className="flex items-center space-x-2">
            <RadioGroupItem value={time.value} id={`time-${time.value}`} />
            <Label
              htmlFor={`time-${time.value}`}
              className="cursor-pointer text-sm"
            >
              {time.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PostedWithin;
