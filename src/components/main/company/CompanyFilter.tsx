import { Filter } from "lucide-react";
import { Badge } from "../../ui/badge";

const fakeTechs = [
  {
    id: 1,
    value: "Technology",
    label: "Technology",
  },
  {
    id: 2,
    value: "Startup",
    label: "Startup",
  },
  {
    id: 3,
    value: "Remote",
    label: "Remote",
  },
  {
    id: 4,
    value: "100+ employees",
    label: "100+ employees",
  },
];

const CompanyFilter = () => {
  return (
    <div className="mx-auto max-w-7xl rounded-lg bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-6 overflow-x-auto">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
        </div>
        <div className="flex gap-3">
          {fakeTechs?.map(({ id, label }) => (
            <Badge
              key={id}
              variant="outline"
              className="hover:bg-primary/2 cursor-pointer rounded-full"
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
