import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  Building2,
  Calendar,
  Eye,
  FileText,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useGetJobsQuery } from "@/redux/feature/job/jobApi";
import JobDetailsSimilarJobCard from "./JobDetailsSimilarJobCard";

interface Company {
  id: string;
  name: string;
  slug: string;
  industry?: { name: string };
  size?: string;
  description?: string;
}

interface Job {
  id: string;
  title: string;
  company: Company;
  industry?: { name: string };
  companySize?: string;
  jobType?: string;
  type?: string;
  createdAt?: string;
  postedTime?: string;
  viewCount?: number;
  applyCount?: number;
  isSaved?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
}

interface JobDetailsSidebarProps {
  job: Job;
  onApply?: () => void;
  onSave?: () => void;
  onViewCompany?: () => void;
  isSaving?: boolean;
}

const STATS_ICONS = {
  applications: FileText,
  views: Eye,
  posted: Calendar,
} as const;

const StatItem = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <>
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
          <Icon className="text-primary h-4 w-4" />
        </div>
        <span className="text-muted-foreground text-sm font-medium">
          {label}
        </span>
      </div>
      <span className="text-foreground font-bold">{value}</span>
    </div>
    <div className="bg-border/20 h-px w-full" />
  </>
);

const CompanyInfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <>
    <div className="flex items-center justify-between py-1">
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <span className="text-foreground font-bold">{value}</span>
    </div>
    <div className="bg-border/20 h-px w-full" />
  </>
);

const formatJobType = (type: string) => {
  if (!type) return "";
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const JobDetailsSidebar = ({
  job,
  onApply,
  onSave,
  isSaving,
  onViewCompany,
}: JobDetailsSidebarProps) => {
  const router = useRouter();
  const companyName = job.company?.name || "Unknown Company";
  const industry =
    job.industry?.name || job.company?.industry?.name || "Not specified";
  const companySize = job.companySize || job.company?.size || "Not specified";
  const jobType = job.type || job.jobType || "Not specified";

  const postedTime =
    job.postedTime ||
    (job.createdAt
      ? new Date(job.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Recently");

  const stats = [
    {
      label: "Applications",
      value: job.applyCount || 0,
      icon: STATS_ICONS.applications,
    },
    { label: "Views", value: job.viewCount || 0, icon: STATS_ICONS.views },
    { label: "Posted", value: postedTime, icon: STATS_ICONS.posted },
  ];

  // Fetch similar jobs
  const { data: similarJobsData, isLoading: similarLoading } = useGetJobsQuery({
    limit: 10,
  });

  const similarJobsList = useMemo(() => {
    const raw = (similarJobsData?.data?.result ||
      similarJobsData?.data ||
      []) as Job[];
    const filtered = raw.filter((j: Job) => j.id !== job.id);

    // Filter by same industry
    const matching = filtered.filter(
      (j: Job) => (j.industry?.name || j.company?.industry?.name) === industry,
    );

    if (matching.length > 0) {
      return matching.slice(0, 3);
    }
    // Fallback to any other jobs if no industry matches
    return filtered.slice(0, 3);
  }, [similarJobsData, job.id, industry]);

  const handleApply = () => {
    onApply?.();
  };

  const handleSave = () => {
    onSave?.();
  };

  const handleViewCompany = () => {
    onViewCompany?.();
    if (job.company?.slug) {
      router.push(`/companies/${job.company.slug}`);
    }
  };

  return (
    <aside className="space-y-6">
      <Card className="border-primary/10 bg-background/50 sticky top-24 border backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Link href={`/jobs/${job?.id}/apply`} className="block w-full">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full text-lg font-bold shadow-lg transition-all hover:scale-[1.02]"
                onClick={handleApply}
              >
                Apply Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className={cn(
                "h-12 w-full border text-lg font-bold transition-all",
                job.isSaved
                  ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:text-primary"
                  : "hover:bg-primary/5 hover:text-primary border-primary/20",
              )}
              onClick={handleSave}
              disabled={isSaving}
            >
              <Bookmark
                className={cn(
                  "mr-2 h-5 w-5 transition-all duration-200",
                  job.isSaved ? "fill-primary" : "",
                )}
              />
              {isSaving ? "Saving..." : job.isSaved ? "Saved" : "Save Job"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Building2 className="text-primary h-4 w-4" />
            </div>
            About {companyName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CompanyInfoItem label="Industry" value={industry} />
          <CompanyInfoItem label="Company Size" value={companySize} />
          <CompanyInfoItem label="Job Type" value={jobType} />

          <Button
            variant="outline"
            className="hover:bg-primary/5 hover:text-primary border-primary/20 mt-4 w-full font-bold transition-all"
            onClick={handleViewCompany}
          >
            <Users className="mr-2 h-4 w-4" />
            View Company Profile
          </Button>
        </CardContent>
      </Card>

      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Job Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </CardContent>
      </Card>

      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Similar Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {similarLoading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-primary/10 animate-pulse space-y-2 rounded-2xl border p-4"
              >
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
                <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-slate-800" />
                <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-slate-800" />
              </div>
            ))
          ) : similarJobsList.length === 0 ? (
            <div className="text-muted-foreground py-4 text-center text-xs font-semibold">
              No similar jobs found
            </div>
          ) : (
            similarJobsList.map((similarJob: Job, index: number) => {
              const salaryStr =
                similarJob.salaryMin && similarJob.salaryMax
                  ? `$${Math.round(similarJob.salaryMin / 1000)}k - $${Math.round(similarJob.salaryMax / 1000)}k / yr`
                  : similarJob.salaryMin
                    ? `$${Math.round(similarJob.salaryMin / 1000)}k+ / yr`
                    : "Competitive Salary";
              return (
                <JobDetailsSimilarJobCard
                  key={similarJob.id || index}
                  id={similarJob.id}
                  title={similarJob.title}
                  company={similarJob.company?.name || "Verified Partner"}
                  location={similarJob.location || "Remote"}
                  salary={salaryStr}
                  type={formatJobType(similarJob.jobType || "Full-Time")}
                />
              );
            })
          )}
        </CardContent>
      </Card>
    </aside>
  );
};

export default JobDetailsSidebar;
