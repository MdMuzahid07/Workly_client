import { FileText } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardApplicationsHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-lg p-2">
          <FileText className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-foreground text-2xl font-bold">Applications</h1>
          <p className="text-muted-foreground text-sm">
            Review and manage all job applications
          </p>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardApplicationsHeader;
