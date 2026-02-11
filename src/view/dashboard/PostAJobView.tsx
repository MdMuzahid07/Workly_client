"use client";

import DashboardPostAJobHeader from "../../components/dashboard/dashboard-nav/header/DashboardPostAJobHeader";
import CreateNewJobForm from "../../components/dashboard/job/CreateNewJobForm";

const PostAJobView = () => {
  return (
    <div className="min-h-screen pt-16">
      <DashboardPostAJobHeader />
      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        <div className="bg-card rounded-xl border p-6 md:p-8">
          <CreateNewJobForm />
        </div>
      </div>
    </div>
  );
};

export default PostAJobView;
