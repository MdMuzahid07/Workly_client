import { Briefcase } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardHiringPipelineHeader = () => {
  return (
    <DashboardHeaderContainer>
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
    </DashboardHeaderContainer>
  );
};

export default DashboardHiringPipelineHeader;
