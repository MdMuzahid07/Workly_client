/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Input } from "../../../ui/input";

const CompanyProfileDetailsTab = ({
  updateField,
  isEditing,
  editedProfile,
  currentProfile,
}: {
  updateField: any;
  isEditing: boolean;
  editedProfile: any;
  currentProfile: any;
}) => {
  return (
    <TabsContent value="details" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Basic details about your company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Name</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  {currentProfile.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              {isEditing ? (
                <Select
                  value={editedProfile.industry}
                  onValueChange={(value) => updateField("industry", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-muted-foreground text-sm">
                  {currentProfile.industry}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Size</Label>
              {isEditing ? (
                <Select
                  value={editedProfile.size}
                  onValueChange={(value) => updateField("size", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10 employees">
                      1-10 employees
                    </SelectItem>
                    <SelectItem value="11-50 employees">
                      11-50 employees
                    </SelectItem>
                    <SelectItem value="51-200 employees">
                      51-200 employees
                    </SelectItem>
                    <SelectItem value="201-500 employees">
                      201-500 employees
                    </SelectItem>
                    <SelectItem value="501-1000 employees">
                      501-1000 employees
                    </SelectItem>
                    <SelectItem value="1000+ employees">
                      1000+ employees
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-muted-foreground text-sm">
                  {currentProfile.size}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Founded</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.founded}
                  onChange={(e) => updateField("founded", e.target.value)}
                  type="number"
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  {currentProfile.founded}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Location</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  {currentProfile.location}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.websiteUrl}
                  onChange={(e) => updateField("websiteUrl", e.target.value)}
                  type="url"
                />
              ) : (
                <a
                  href={currentProfile.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  {currentProfile.websiteUrl}
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Contact Email</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.contactEmail}
                  onChange={(e) => updateField("contactEmail", e.target.value)}
                  type="email"
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  {currentProfile.contactEmail}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Contact Phone</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.contactPhone}
                  onChange={(e) => updateField("contactPhone", e.target.value)}
                  type="tel"
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  {currentProfile.contactPhone}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CompanyProfileDetailsTab;
