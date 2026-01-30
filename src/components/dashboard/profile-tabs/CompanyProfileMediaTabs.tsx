/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { TabsContent } from "@radix-ui/react-tabs";
import { Upload } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

const CompanyProfileMediaTabs = ({
  isEditing,
  currentProfile,
}: {
  isEditing: any;
  currentProfile: any;
}) => {
  return (
    <TabsContent value="media" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Media</CardTitle>
          <CardDescription>
            Upload your company logo and cover image
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="border-border rounded-lg border-2 border-dashed py-6 pr-6 text-center">
                {currentProfile.logoUrl ? (
                  <div className="space-y-2">
                    <Avatar className="mx-auto h-16 w-16">
                      <AvatarImage
                        src={currentProfile.logoUrl || "/placeholder.svg"}
                        alt="Company logo"
                        className="h-24 w-24 rounded-full"
                      />
                      <AvatarFallback>Logo</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button type="button" variant="outline" size="sm">
                        Change Logo
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="text-muted-foreground mx-auto h-8 w-8" />
                    <p className="text-muted-foreground text-sm">
                      Upload company logo
                    </p>
                    {isEditing && (
                      <Button type="button" variant="outline" size="sm">
                        Choose File
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="border-border rounded-lg border-2 border-dashed p-6 text-center">
                <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground mb-2 text-sm">
                  Upload cover image
                </p>
                {isEditing && (
                  <Button type="button" variant="outline" size="sm">
                    Choose File
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CompanyProfileMediaTabs;
