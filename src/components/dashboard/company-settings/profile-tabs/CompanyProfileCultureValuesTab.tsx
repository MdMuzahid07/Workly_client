/* eslint-disable @typescript-eslint/no-explicit-any */
import { TabsContent } from "@radix-ui/react-tabs";
import { Award, X } from "lucide-react";
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

const CompanyProfileCultureValuesTab = ({
  currentProfile,
  isEditing,
  removeValue,
  addValue,
  addBenefit,
  removeBenefit,
}: {
  currentProfile: any;
  isEditing: boolean;
  removeValue: any;
  addValue: any;
  addBenefit: any;
  removeBenefit: any;
}) => {
  return (
    <TabsContent value="culture" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Values</CardTitle>
          <CardDescription>What principles guide your company?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {currentProfile.values.map((value: any, index: number) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {value}
                  {isEditing && (
                    <button
                      onClick={() => removeValue(value)}
                      className="text-muted-foreground hover:text-foreground ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a company value..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addValue(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    addValue(input.value);
                    input.value = "";
                  }}
                >
                  Add
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Benefits</CardTitle>
          <CardDescription>
            What benefits do you offer to employees?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {currentProfile.benefits.map((benefit: any, index: number) => (
                <Badge key={index} variant="outline" className="text-sm">
                  <Award className="mr-1 h-3 w-3" />
                  {benefit}
                  {isEditing && (
                    <button
                      onClick={() => removeBenefit(benefit)}
                      className="text-muted-foreground hover:text-foreground ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  placeholder="Add an employee benefit..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addBenefit(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    addBenefit(input.value);
                    input.value = "";
                  }}
                >
                  Add
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CompanyProfileCultureValuesTab;
