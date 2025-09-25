import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Building,
  Calendar,
  DollarSign,
  MapPin,
  Wifi,
} from "lucide-react";

interface Preference {
  jobType: string;
  expectedSalary: number;
  preferredLocation: string;
  remoteWork: boolean;
  industry: string;
  workExperience: string;
}

interface PreferencesSectionProps {
  preferences: Preference;
}

const JobPreference = ({ preferences }: PreferencesSectionProps) => {
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "FULL_TIME":
        return "bg-primary text-primary-foreground border-primary";
      case "PART_TIME":
        return "bg-chart-2 text-primary-foreground border-chart-2";
      case "CONTRACT":
        return "bg-chart-3 text-primary-foreground border-chart-3";
      case "FREELANCE":
        return "bg-chart-4 text-primary-foreground border-chart-4";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-card border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Job Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="bg-muted/40 flex items-start space-x-3 rounded-xl p-4">
              <Briefcase className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-muted-foreground mb-1 text-xs sm:text-sm">
                  Job Type
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${getJobTypeColor(preferences.jobType)}`}
                >
                  {preferences.jobType.replace("_", " ")}
                </Badge>
              </div>
            </div>

            <div className="bg-muted/40 flex items-start space-x-3 rounded-xl p-4">
              <DollarSign className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-muted-foreground mb-1 text-xs sm:text-sm">
                  Expected Salary
                </div>
                <div className="text-foreground text-sm font-medium sm:text-base">
                  {formatSalary(preferences.expectedSalary)}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/40 flex items-start space-x-3 rounded-xl p-4">
              <MapPin className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-muted-foreground mb-1 text-xs sm:text-sm">
                  Preferred Location
                </div>
                <div className="text-foreground truncate text-sm font-medium sm:text-base">
                  {preferences.preferredLocation}
                </div>
              </div>
            </div>

            <div className="bg-muted/40 flex items-start space-x-3 rounded-xl p-4">
              <Building className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-muted-foreground mb-1 text-xs sm:text-sm">
                  Industry
                </div>
                <div className="text-foreground text-sm font-medium sm:text-base">
                  {preferences.industry}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="bg-muted/40 flex items-start space-x-3 rounded-xl p-4">
              <Calendar className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-muted-foreground mb-1 text-xs sm:text-sm">
                  Experience Level
                </div>
                <div className="text-foreground text-sm font-medium sm:text-base">
                  {preferences.workExperience}
                </div>
              </div>
            </div>

            <div className="bg-muted/40 flex items-start space-x-3 rounded-xl p-4">
              <Wifi className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-muted-foreground mb-1 text-xs sm:text-sm">
                  Remote Work
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    preferences.remoteWork
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {preferences.remoteWork
                    ? "Open to Remote"
                    : "Office Preferred"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPreference;
