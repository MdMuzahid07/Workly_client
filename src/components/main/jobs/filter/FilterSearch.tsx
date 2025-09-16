/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

const FilterSearch = ({
  updateFilters,
  filters,
}: {
  updateFilters: any;
  filters: any;
}) => {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Search className="h-4 w-4" />
        Search Jobs
      </Label>
      <Input
        placeholder="Search by title, company, or keywords..."
        value={filters.search}
        onChange={(e) => updateFilters({ search: e.target.value })}
        className="w-full rounded-full"
      />
    </div>
  );
};

export default FilterSearch;
