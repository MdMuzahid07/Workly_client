import ApplyJobView from "../../../../../view/job/apply/ApplyJobView";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <ApplyJobView jobId={id} />;
};

export default page;
