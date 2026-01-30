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
      <h4 className="text-secondary-foreground font-medium">{title}</h4>
      <div className="text-secondary-foreground flex items-center gap-1 text-sm">
        <Building2 className="h-3 w-3" />
        <span>{company}</span>
        <span>•</span>
        <span>{location}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-green-600">{salary}</span>
        <span className="text-secondary-foreground text-xs capitalize">
          {type}
        </span>
      </div>
    </div>
  </div>
);

export default JobDetailsSimilarJobCard;
