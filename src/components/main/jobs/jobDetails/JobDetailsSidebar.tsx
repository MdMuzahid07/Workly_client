import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JobDetailsSidebar = ({ job }: { job: any }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Button className="bg-primary/100 hover:bg-primary mb-4 w-full text-white">
            Apply Now
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Save Job
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About {job.company}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Industry</span>
            <span className="font-medium">{job.industry}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Company Size</span>
            <span className="font-medium">{job.companySize}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Job Type</span>
            <span className="font-medium">{job.type}</span>
          </div>
          <Button variant="outline" className="mt-4 w-full bg-transparent">
            View Company Profile
          </Button>
        </CardContent>
      </Card>

      {/* Job Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Job Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Applications</span>
            <span className="font-medium">23</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Views</span>
            <span className="font-medium">156</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Posted</span>
            <span className="font-medium">{job.postedTime}</span>
          </div>
        </CardContent>
      </Card>

      {/* Similar Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border p-3">
            <h4 className="text-sm font-medium">Full Stack Developer</h4>
            <p className="text-xs text-gray-600">WebTech Inc • Remote</p>
            <p className="text-xs font-medium text-green-600">$30/hour</p>
          </div>
          <div className="rounded-xl border p-3">
            <h4 className="text-sm font-medium">React Developer</h4>
            <p className="text-xs text-gray-600">StartupXYZ • New York</p>
            <p className="text-xs font-medium text-green-600">$1500 fixed</p>
          </div>
          <div className="rounded-xl border p-3">
            <h4 className="text-sm font-medium">UI/UX Developer</h4>
            <p className="text-xs text-gray-600">DesignCorp • London</p>
            <p className="text-xs font-medium text-green-600">$28/hour</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailsSidebar;
