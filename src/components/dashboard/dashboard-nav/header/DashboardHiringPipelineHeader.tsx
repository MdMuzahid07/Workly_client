import { Briefcase } from "lucide-react";

const DashboardHiringPipelineHeader = () => {
  return (
    <header className="border-border bg-card sticky top-0 z-50 border-b">
      <div className="container mx-auto h-18 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Briefcase className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-2xl font-bold">
              Hiring Pipeline
            </h1>
            <p className="text-muted-foreground text-sm">
              Track and manage applications through your hiring process
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHiringPipelineHeader;
