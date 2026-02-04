import { Layers } from "lucide-react";
import { Badge } from "../../ui/badge";

const fakeTechs = [
  { id: 1, value: "Technology", label: "Technology" },
  { id: 2, value: "Startup", label: "Startup" },
  { id: 3, value: "Remote", label: "Remote" },
  { id: 4, value: "Healthcare", label: "Healthcare" },
  { id: 5, value: "Finance", label: "Finance" },
  { id: 6, value: "Education", label: "Education" },
  { id: 7, value: "E-commerce", label: "E-commerce" },
];

const CompanyFilter = () => {
  return (
    <div className="w-full bg-transparent">
      <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto pb-2 sm:gap-6">
        <div className="text-foreground flex shrink-0 items-center gap-2 text-sm font-bold tracking-wider uppercase">
          <Layers className="text-primary h-4 w-4" />
          <span>Filters</span>
        </div>
        <div className="flex shrink-0 gap-2 pr-4 sm:pr-0">
          {fakeTechs?.map(({ id, label }) => (
            <Badge
              key={id}
              variant="secondary"
              className="hover:bg-primary hover:border-primary cursor-pointer rounded-full border-gray-100 bg-white px-5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyFilter;
