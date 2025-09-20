/* eslint-disable @typescript-eslint/no-explicit-any */
import { TabsContent } from "@radix-ui/react-tabs";
import { Building2, Eye, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Textarea } from "../../ui/textarea";

const CompanyProfileOverviewTab = ({
  currentProfile,
  isEditing,
  updateField,
  editedProfile,
}: {
  currentProfile: any;
  isEditing: boolean;
  updateField: any;
  editedProfile: any;
}) => {
  return (
    <TabsContent value="overview" className="space-y-6">
      {/* Company Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Total Jobs
                </p>
                <p className="text-primary text-2xl font-bold">
                  {currentProfile.stats.totalJobs}
                </p>
              </div>
              <Building2 className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Applications
                </p>
                <p className="text-primary text-2xl font-bold">
                  {currentProfile.stats.totalApplications}
                </p>
              </div>
              <Users className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Employees
                </p>
                <p className="text-primary text-2xl font-bold">
                  {currentProfile.stats.totalEmployees}
                </p>
              </div>
              <Users className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Profile Views
                </p>
                <p className="text-primary text-2xl font-bold">
                  {currentProfile.stats.profileViews}
                </p>
              </div>
              <Eye className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Description */}
      <Card>
        <CardHeader>
          <CardTitle>About {currentProfile.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedProfile.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              placeholder="Describe your company..."
            />
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {currentProfile.description}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedProfile.mission}
              onChange={(e) => updateField("mission", e.target.value)}
              rows={3}
              placeholder="What is your company's mission?"
            />
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {currentProfile.mission}
            </p>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CompanyProfileOverviewTab;
