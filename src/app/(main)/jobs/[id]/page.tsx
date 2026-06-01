import { Metadata } from "next";
import JobDetailsView from "../../../../view/job/details/JobDetailsView";

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
