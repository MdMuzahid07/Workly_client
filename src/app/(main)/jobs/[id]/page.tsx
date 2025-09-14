import JobDetailsView from "../../../../view/job/JobDetailsView";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <JobDetailsView params={params} />
    </>
  );
};

export default page;
