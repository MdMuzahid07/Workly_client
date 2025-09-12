import FeaturedJobs from "../../../components/main/jobs/FeaturedJobs";
import Industries from "../../../components/main/jobs/Industries";
import Searchbar from "../../../components/main/jobs/Searchbar";

const page = () => {
  return (
    <>
      <Searchbar />
      <Industries />
      <FeaturedJobs />
    </>
  );
};

export default page;
