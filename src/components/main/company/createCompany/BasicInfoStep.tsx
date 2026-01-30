import { Building2 } from "lucide-react";
import WKInput from "../../../form/WkInput";
import WKSelect from "../../../form/WkSelect";
import WKTextArea from "../../../form/WkTextArea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

const BasicInfoStep = ({
  industries,
  companySizes,
  loadingIndustries,
}: {
  industries: {
    id: string;
    name: string;
    slug: string;
    active: boolean;
    description: string;
    icon: string;
    subcategories: [];
    createdAt: string;
    updatedAt: string;
  }[];
  companySizes: { label: string; value: string }[];
  loadingIndustries: boolean;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Building2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Basic Company Information
        </CardTitle>
        <CardDescription className="text-sm">
          Tell us about your company&apos;s core details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <WKInput
            name="name"
            label="Company Name"
            labelIcon={<Building2 className="text-muted-foreground h-4 w-4" />}
            required
            className="h-10 rounded-full sm:h-11"
          />

          <div className="space-y-2">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0">
              <span className="text-muted-foreground mt-[22px] inline-block truncate text-xs sm:text-sm">
                workly.com/company/
              </span>
              <WKInput
                name="slug"
                label="Company Slug"
                required
                className="h-10 rounded-full px-0 sm:h-11"
                disabled={true}
              />
            </div>
          </div>
        </div>

        <WKTextArea
          name="description"
          label="Company Description"
          placeholder="Describe your company..."
          required
          rows={4}
          className="resize-none"
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <WKSelect
            name="industryId"
            label="Industry"
            placeholder={loadingIndustries ? "Loading..." : "Select Industry"}
            required
            options={
              industries?.map(
                (cat: { id: string; name: string; slug: string }) => ({
                  value: cat.id,
                  label: cat.name,
                }),
              ) || []
            }
            className="h-10 w-full rounded-full sm:h-11"
          />
          <WKSelect
            name="size"
            label="Company Size"
            placeholder="Select company size"
            required
            options={companySizes}
            className="h-10 w-full rounded-full sm:h-11"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoStep;
