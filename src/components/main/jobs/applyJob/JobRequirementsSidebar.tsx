import { Users } from "lucide-react";
import BenefitsList from "./BenefitsList";
import RequirementsList from "./RequirementsList";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JobRequirementsSidebar = ({ jobData }: any) => {
  console.log(jobData, "jobData in JobRequirementsSidebar");

  return (
    <div className="space-y-6">
      <RequirementsList
        title="Requirements"
        items={jobData?.requirements}
        icon={Users}
      />
      <BenefitsList items={jobData?.benefits} />
    </div>
  );
};

export default JobRequirementsSidebar;
