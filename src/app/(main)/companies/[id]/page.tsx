import { Metadata } from "next";
import CompanyDetailsView from "../../../../view/company/CompanyDetailsView";

export const metadata: Metadata = {
  title: "Company Details",
};

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <CompanyDetailsView params={params} />
    </>
  );
};

export default page;
