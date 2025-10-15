import { Metadata } from "next";
import CompanyView from "../../../view/company/CompanyView";

export const metadata: Metadata = {
  title: "Companies",
};
const page = () => {
  return (
    <>
      <CompanyView />
    </>
  );
};

export default page;
