import { Building2 } from "lucide-react";

const JobDetailsSimilarJobCard = ({
  title,
  company,
  location,
  salary,
  type = "full-time",
}: {
  title: string;
  company: string;
  location: string;
  salary: string;
  type?: string;
}) => (
  <div className="hover:bg-primary/5 light:border-gray-200 cursor-pointer rounded-2xl border p-4 transition-all">
    <div className="space-y-2">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <Building2 className="h-3 w-3" />
        <span>{company}</span>
        <span>•</span>
        <span>{location}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-green-600">{salary}</span>
        <span className="text-xs text-gray-500 capitalize">{type}</span>
      </div>
    </div>
  </div>
);

export default JobDetailsSimilarJobCard;
