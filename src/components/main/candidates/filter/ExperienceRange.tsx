/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Slider } from "../../../ui/slider";

const ExperienceRange = ({
  updateFilters,
  filters,
}: {
  updateFilters: any;
  filters: any;
}) => {
  const handleRangeChange = (value: number[]) => {
    updateFilters({ experienceRange: value });
  };

  const handleInputChange = (index: number, val: string) => {
    const num = parseInt(val) || 0;
    const newRange = [...filters.experienceRange];
    newRange[index] = num;
    updateFilters({ experienceRange: newRange });
  };

  return (
    <div className="space-y-4">
      <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        Experience (Years)
      </Label>
      <div className="px-2">
        <Slider
          value={filters.experienceRange}
          onValueChange={handleRangeChange}
          max={30}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Input
            type="number"
            value={filters.experienceRange[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="focus-visible:ring-primary h-9 rounded-xl border-gray-100 bg-gray-50/50 px-3 text-center text-sm font-medium dark:border-slate-800 dark:bg-slate-900/50"
          />
        </div>
        <span className="text-muted-foreground font-medium">-</span>
        <div className="relative flex-1">
          <Input
            type="number"
            value={filters.experienceRange[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="focus-visible:ring-primary h-9 rounded-xl border-gray-100 bg-gray-50/50 px-3 text-center text-sm font-medium dark:border-slate-800 dark:bg-slate-900/50"
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceRange;
