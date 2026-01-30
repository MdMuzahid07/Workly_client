import { Metadata } from "next";
import JobView from "../../../view/job/JobView";

export const metadata: Metadata = {
  title: "Jobs",
};

const page = () => {
  return (
    <>
      <JobView />
    </>
  );
};

export default page;
