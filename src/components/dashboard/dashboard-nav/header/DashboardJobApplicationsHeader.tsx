import { FileText } from "lucide-react";

const DashboardApplicationsHeader = () => {
  return (
    <header className="border-border bg-card sticky top-0 z-50 border-b">
      <div className="container mx-auto h-18 px-4 py-2.5 sm:px-6 lg:px-8">
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
      </div>
    </header>
  );
};

export default DashboardApplicationsHeader;
