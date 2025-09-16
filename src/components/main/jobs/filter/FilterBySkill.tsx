/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@radix-ui/react-checkbox";
import { Tag, X } from "lucide-react";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";

const FilterBySkill = ({
  filters,
  skillOptions,
  removeSkill,
  toggleSkill,
}: {
  filters: any;
  skillOptions: any;
  removeSkill: any;
  toggleSkill: any;
}) => {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Tag className="h-4 w-4" />
        Skills
      </Label>

      {/* Selected Skills */}
      {filters.skills.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {filters.skills.map((skill: any) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-auto p-0 hover:bg-transparent"
                onClick={() => removeSkill(skill)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Available Skills */}
      <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto">
        {skillOptions.map((skill: any) => (
          <div key={skill} className="flex items-center space-x-2">
            <Checkbox
              id={`skill-${skill}`}
              checked={filters.skills.includes(skill)}
              onCheckedChange={() => toggleSkill(skill)}
            />
            <Label
              htmlFor={`skill-${skill}`}
              className="cursor-pointer text-sm"
            >
              {skill}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBySkill;
