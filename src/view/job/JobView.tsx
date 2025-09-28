/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Suspense } from "react";
import Industries from "../../components/main/jobs/Industries";
import JobCard from "../../components/main/jobs/JobCard";
import Searchbar from "../../components/main/jobs/Searchbar";
import Sidebar from "../../components/main/jobs/Sidebar";
import SidebarFilter from "../../components/main/jobs/filter/SidebarFilter";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useGetJobsQuery } from "../../redux/feature/job/jobApi";
import JobCardSkeleton from "../../skeleton/job/JobCardSkeleton";

const JobView = () => {
  const { data, isLoading, error } = useGetJobsQuery(undefined);
  console.log(data);

  return (
    <div className="bg-primary/2 pb-12">
      <Searchbar />
      <Industries />
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 pt-5 xl:px-0">
        <div className="col-span-12 md:col-span-4">
          <div className="sticky top-24 hidden md:flex">
            <ScrollArea className="h-[87dvh] w-full rounded-2xl">
              {
                //@ts-ignore
                <SidebarFilter className="w-full" />
              }
            </ScrollArea>
          </div>
          <div className="flex md:hidden">
            {
              //@ts-ignore
              <Sidebar />
            }
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="flex flex-col md:gap-4">
            {isLoading &&
              [...Array(6)].map((_, index) => <JobCardSkeleton key={index} />)}
            {error && (
              <div className="text-center text-red-500">
                Something went wrong, please try again later.
              </div>
            )}
            {data && data.jobs.length === 0 && (
              <div className="text-center">No jobs found.</div>
            )}
            {data &&
              data?.data?.map((job: any) => (
                //@ts-ignore
                <Suspense key={job?.id} fallback={<JobCardSkeleton />}>
                  <JobCard key={job?.id} {...job} />
                </Suspense>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobView;
