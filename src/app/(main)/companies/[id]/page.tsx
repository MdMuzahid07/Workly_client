import { Metadata } from "next";
import CompanyDetailsView from "../../../../view/company/CompanyDetailsView";

export const metadata: Metadata = {
  title: "Company Details",
};

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <CompanyDetailsView params={params} />
    </>
  );
};

export default page;
