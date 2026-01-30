import DashboardPostAJobHeader from "../../components/dashboard/dashboard-nav/header/DashboardPostAJobHeader";
import CreateNewJobForm from "../../components/dashboard/job/CreateNewJobForm";

const PostAJobView = () => {
  return (
    <div>
      <DashboardPostAJobHeader />
      <div className="container mx-auto space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <div className="bg-card rounded-2xl p-6 md:p-10">
          <CreateNewJobForm />
        </div>
      </div>
    </div>
  );
};

export default PostAJobView;
