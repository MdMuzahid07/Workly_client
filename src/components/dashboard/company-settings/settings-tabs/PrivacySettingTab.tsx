/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";
import { Switch } from "@radix-ui/react-switch";
import { TabsContent } from "@radix-ui/react-tabs";
import { Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

const PrivacySettingTab = ({
  updateSettings,
  settings,
}: {
  updateSettings: any;
  settings: any;
}) => {
  return (
    <TabsContent value="privacy" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Privacy Settings
          </CardTitle>
          <CardDescription>
            Control your {`company's`} privacy and visibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Profile visibility</Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={settings.privacy.profileVisibility === "public"}
                  onChange={(e) =>
                    updateSettings(
                      "privacy",
                      "profileVisibility",
                      e.target.value,
                    )
                  }
                  className="text-primary"
                />
                <span>Public</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={settings.privacy.profileVisibility === "private"}
                  onChange={(e) =>
                    updateSettings(
                      "privacy",
                      "profileVisibility",
                      e.target.value,
                    )
                  }
                  className="text-primary"
                />
                <span>Private</span>
              </label>
            </div>
            <p className="text-muted-foreground text-sm">
              Public profiles are visible to all users, private profiles are
              only visible to logged-in users
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show team member count</Label>
              <p className="text-muted-foreground text-sm">
                Display how many employer accounts are linked to your company
              </p>
            </div>
            <Switch
              checked={settings.privacy.showEmployeeCount}
              onCheckedChange={(checked) =>
                updateSettings("privacy", "showEmployeeCount", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show salary ranges</Label>
              <p className="text-muted-foreground text-sm">
                Display salary ranges on job postings
              </p>
            </div>
            <Switch
              checked={settings.privacy.showSalaryRanges}
              onCheckedChange={(checked) =>
                updateSettings("privacy", "showSalaryRanges", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow direct messages</Label>
              <p className="text-muted-foreground text-sm">
                Let job seekers send direct messages to your company
              </p>
            </div>
            <Switch
              checked={settings.privacy.allowDirectMessages}
              onCheckedChange={(checked) =>
                updateSettings("privacy", "allowDirectMessages", checked)
              }
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PrivacySettingTab;
