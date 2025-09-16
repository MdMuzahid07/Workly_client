/* eslint-disable @typescript-eslint/no-explicit-any */
import { DollarSign } from "lucide-react";
import { Label } from "../../../ui/label";
import { Slider } from "../../../ui/slider";

const BudgetRange = ({
  updateFilters,
  filters,
}: {
  updateFilters: any;
  filters: any;
}) => {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <DollarSign className="h-4 w-4" />
        Budget Range
      </Label>
      <div className="px-2">
        <Slider
          value={filters.budgetRange}
          onValueChange={(value) =>
            updateFilters({ budgetRange: value as [number, number] })
          }
          max={10000}
          min={0}
          step={100}
          className="w-full"
        />
        <div className="text-muted-foreground mt-2 flex justify-between text-xs">
          <span>${filters.budgetRange[0]}</span>
          <span>${filters.budgetRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetRange;
