/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@radix-ui/react-switch";
import { TabsContent } from "@radix-ui/react-tabs";
import { Trash2 } from "lucide-react";
import { AlertDialogFooter, AlertDialogHeader } from "../../../ui/alert-dialog";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Input } from "../../../ui/input";

const BillingSettingTab = ({
  updateSettings,
  settings,
}: {
  updateSettings: any;
  settings: any;
}) => {
  return (
    <TabsContent value="billing" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>
            Manage your subscription and billing details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h3 className="font-medium">Current Plan</h3>
              <p className="text-muted-foreground text-sm">Professional Plan</p>
            </div>
            <Badge className="bg-primary/10 text-primary">Active</Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingEmail">Billing Email</Label>
            <Input
              id="billingEmail"
              type="email"
              value={settings.billing.billingEmail}
              onChange={(e) =>
                updateSettings("billing", "billingEmail", e.target.value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-renew subscription</Label>
              <p className="text-muted-foreground text-sm">
                Automatically renew your subscription each billing cycle
              </p>
            </div>
            <Switch
              checked={settings.billing.autoRenew}
              onCheckedChange={(checked) =>
                updateSettings("billing", "autoRenew", checked)
              }
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="w-full sm:w-auto">
                View Billing History
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Update Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions for your company account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Company Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your company account and remove all associated data including
                  jobs, applications, and employee records.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BillingSettingTab;
