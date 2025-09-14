import CompanyDetailsView from "../../../../view/company/CompanyDetailsView";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <CompanyDetailsView params={params} />
    </>
  );
};

export default page;
