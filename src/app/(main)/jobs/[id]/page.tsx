import { Metadata } from "next";
import JobDetailsView from "../../../../view/job/JobDetailsView";

export const metadata: Metadata = {
  title: "Job Details",
};

const page = () => {
  return (
    <>
      <JobDetailsView />
    </>
  );
};

export default page;
