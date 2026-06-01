import { Label } from "@radix-ui/react-label";
import { Switch } from "@radix-ui/react-switch";
import { TabsContent } from "@radix-ui/react-tabs";
import { Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

import type { CompanySettings } from "@/types/company-settings";

const NotificationSettingTab = ({
  updateSettings,
  settings,
}: {
  updateSettings: <
    K extends keyof CompanySettings,
    F extends keyof CompanySettings[K],
  >(
    section: K,
    field: F,
    value: CompanySettings[K][F],
  ) => void;
  settings: CompanySettings;
}) => {
  return (
    <TabsContent value="notifications" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose what notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email notifications</Label>
              <p className="text-muted-foreground text-sm">
                Receive general email notifications
              </p>
            </div>
            <Switch
              checked={settings.notifications.emailNotifications}
              onCheckedChange={(checked) =>
                updateSettings("notifications", "emailNotifications", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Application alerts</Label>
              <p className="text-muted-foreground text-sm">
                Get notified when someone applies to your jobs
              </p>
            </div>
            <Switch
              checked={settings.notifications.applicationAlerts}
              onCheckedChange={(checked) =>
                updateSettings("notifications", "applicationAlerts", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Job expiry reminders</Label>
              <p className="text-muted-foreground text-sm">
                Remind me when jobs are about to expire
              </p>
            </div>
            <Switch
              checked={settings.notifications.jobExpiryReminders}
              onCheckedChange={(checked) =>
                updateSettings("notifications", "jobExpiryReminders", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly reports</Label>
              <p className="text-muted-foreground text-sm">
                Receive weekly analytics and performance reports
              </p>
            </div>
            <Switch
              checked={settings.notifications.weeklyReports}
              onCheckedChange={(checked) =>
                updateSettings("notifications", "weeklyReports", checked)
              }
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default NotificationSettingTab;
