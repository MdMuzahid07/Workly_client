import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, Calendar, Eye, FileText, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import JobDetailsSimilarJobCard from "./JobDetailsSimilarJobCard";

interface Company {
  id: string;
  name: string;
  industry?: string;
  size?: string;
  description?: string;
}

interface Job {
  id: string;
  title: string;
  company: Company;
  industry?: string;
  companySize?: string;
  jobType?: string;
  type?: string;
  createdAt?: string;
  postedTime?: string;
  viewCount?: number;
  applyCount?: number;
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="text-foreground/50 h-4 w-4" />
        <span className="text-foreground/60">{label}</span>
      </div>
      <span className="text-foreground/90 font-medium">{value}</span>
    </div>
    <Separator />
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
    <div className="flex items-center justify-between">
      <span className="text-foreground/60">{label}</span>
      <span className="text-foreground/90 font-medium">{value}</span>
    </div>
    <Separator />
  </>
);

const JobDetailsSidebar = ({
  job,
  onApply,
  onSave,
  isSaving,
  onViewCompany,
}: JobDetailsSidebarProps) => {
  const router = useRouter();
  const companyName = job.company?.name || "Unknown Company";
  const industry = job.industry || job.company?.industry || "Not specified";
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

  const similarJobs = [
    {
      title: "Full Stack Developer",
      company: "WebTech Inc",
      location: "Remote",
      salary: "$30/hour",
      type: "contract",
    },
    {
      title: "React Developer",
      company: "StartupXYZ",
      location: "New York",
      salary: "$1500 fixed",
      type: "fixed-price",
    },
    {
      title: "UI/UX Developer",
      company: "DesignCorp",
      location: "London",
      salary: "$28/hour",
      type: "contract",
    },
  ];

  const handleApply = () => {
    onApply?.();
  };

  const handleSave = () => {
    onSave?.();
  };

  const handleViewCompany = () => {
    onViewCompany?.();
    // router.push(`/companies/${job.company?.id}`);
    router.push(`/companies/1`);
  };

  return (
    <aside className="space-y-6">
      <Card className="sticky top-22">
        <CardContent className="p-6">
          <div className="space-y-3">
            <Link href={`/jobs/${job?.id}/apply`}>
              <Button
                className="bg-primary text-card w-full py-2.5 font-medium"
                onClick={handleApply}
                size="lg"
              >
                Apply Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className="hover:bg-primary/10 hover:text-foreground w-full border-gray-300 font-medium"
              onClick={handleSave}
              size="lg"
              disabled={isSaving}
            >
              {isSaving ? "Loading..." : "Save Job"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="text-foreground/60 h-5 w-5" />
            About {companyName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CompanyInfoItem label="Industry" value={industry} />
          <CompanyInfoItem label="Company Size" value={companySize} />
          <CompanyInfoItem label="Job Type" value={jobType} />

          <Button
            variant="outline"
            className="dark:hover:bg-primary text-foreground dark:text-light mt-4 w-full border-gray-300"
            onClick={handleViewCompany}
          >
            <Users className="mr-2 h-4 w-4" />
            View Company Profile
          </Button>
        </CardContent>
      </Card>

      <Card>
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

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Similar Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {similarJobs.map((similarJob, index) => (
            <JobDetailsSimilarJobCard
              key={index}
              title={similarJob.title}
              company={similarJob.company}
              location={similarJob.location}
              salary={similarJob.salary}
              type={similarJob.type}
            />
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default JobDetailsSidebar;
