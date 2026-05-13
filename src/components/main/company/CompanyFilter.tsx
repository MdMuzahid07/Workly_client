import { Layers } from "lucide-react";
import { useGetCategoriesQuery } from "../../../redux/feature/category/categoryApi";
import { Badge } from "../../ui/badge";

interface CompanyFilterProps {
  selectedFilter?: string;
  onFilterChange: (value: string) => void;
}

const CompanyFilter = ({
  selectedFilter,
  onFilterChange,
}: CompanyFilterProps) => {
  const { data: industries, isLoading } = useGetCategoriesQuery({
    type: "company",
  });

  if (isLoading) {
    return (
      <div className="w-full bg-transparent">
        <div className="flex items-center gap-4 pb-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-8 w-24 animate-pulse rounded-full bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Use data.data if it's wrapped, otherwise use industries directly
  const industryList = industries?.data || industries || [];

  return (
    <div className="w-full bg-transparent">
      <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto pb-2 sm:gap-6">
        <div className="text-foreground flex shrink-0 items-center gap-2 text-sm font-bold tracking-wider uppercase">
          <Layers className="text-primary h-4 w-4" />
          <span>Filters</span>
        </div>
        <div className="flex shrink-0 gap-2 pr-4 sm:pr-0">
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          industryList?.map((industry: any) => {
            const isSelected = selectedFilter === industry.name;
            return (
              <Badge
                key={industry.id}
                variant={isSelected ? "default" : "secondary"}
                className={`cursor-pointer rounded-full border-gray-100 px-5 py-2 text-xs font-semibold shadow-sm transition-all duration-300 ${
                  isSelected
                    ? "bg-primary border-primary text-white"
                    : "hover:bg-primary hover:border-primary bg-white text-slate-600 hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                }`}
                onClick={() => onFilterChange(isSelected ? "" : industry.name)}
              >
                {industry.name}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyFilter;
