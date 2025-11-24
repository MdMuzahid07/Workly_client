import { Users } from "lucide-react";
import { JobData } from "../../../../view/job/ApplyJobView";
import BenefitsList from "./BenefitsList";
import RequirementsList from "./RequirementsList";

const JobRequirementsSidebar = ({ jobData }: { jobData: JobData }) => {
  return (
    <div className="space-y-6">
      <RequirementsList
        title="Requirements"
        items={jobData.requirements}
        icon={Users}
      />
      <BenefitsList items={jobData.benefits} />
    </div>
  );
};

export default JobRequirementsSidebar;
