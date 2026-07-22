import { Building2 } from 'lucide-react';
import Link from 'next/link';

const JobDetailsSimilarJobCard = ({
  id,
  title,
  company,
  location,
  salary,
  type = 'full-time',
}: {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type?: string;
}) => (
  <Link href={`/jobs/${id}`} className="block">
    <div className="hover:bg-primary/5 hover:border-primary/30 border-border/40 light:border-gray-200 cursor-pointer rounded-2xl border p-4 transition-all">
      <div className="space-y-2">
        <h4 className="text-secondary-foreground group-hover:text-primary font-semibold transition-colors">
          {title}
        </h4>
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Building2 className="h-3 w-3 shrink-0" />
          <span className="truncate">{company}</span>
          <span>•</span>
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{salary}</span>
          <span className="text-muted-foreground text-[11px] font-medium capitalize">{type}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default JobDetailsSimilarJobCard;
