/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";
import { Switch } from "@radix-ui/react-switch";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Input } from "../../../ui/input";

const JobPostingManagementTab = ({
  updateSettings,
  settings,
}: {
  updateSettings: any;
  settings: any;
}) => {
  return (
    <TabsContent value="general" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Posting Settings</CardTitle>
          <CardDescription>
            Configure how your job postings behave
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-expire jobs</Label>
              <p className="text-muted-foreground text-sm">
                Automatically expire job postings after a set period
              </p>
            </div>
            <Switch
              checked={settings.jobPosting.autoExpireJobs}
              onCheckedChange={(checked) =>
                updateSettings("jobPosting", "autoExpireJobs", checked)
              }
            />
          </div>

          {settings.jobPosting.autoExpireJobs && (
            <div className="space-y-2">
              <Label htmlFor="expiryDays">Job expiry (days)</Label>
              <Input
                id="expiryDays"
                type="number"
                value={settings.jobPosting.jobExpiryDays}
                onChange={(e) =>
                  updateSettings(
                    "jobPosting",
                    "jobExpiryDays",
                    parseInt(e.target.value),
                  )
                }
                className="w-32"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require approval for job posts</Label>
              <p className="text-muted-foreground text-sm">
                All job posts must be approved before going live
              </p>
            </div>
            <Switch
              checked={settings.jobPosting.requireApproval}
              onCheckedChange={(checked) =>
                updateSettings("jobPosting", "requireApproval", checked)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxJobs">Maximum active jobs</Label>
            <Input
              id="maxJobs"
              type="number"
              value={settings.jobPosting.maxActiveJobs}
              onChange={(e) =>
                updateSettings(
                  "jobPosting",
                  "maxActiveJobs",
                  parseInt(e.target.value),
                )
              }
              className="w-32"
            />
            <p className="text-muted-foreground text-sm">
              Maximum number of jobs that can be active at once
            </p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default JobPostingManagementTab;
