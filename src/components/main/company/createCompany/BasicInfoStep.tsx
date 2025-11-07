import { Building2 } from "lucide-react";
import WKInput from "../../../form/WkInput";
import WKSelect from "../../../form/WkSelect";
import WKTextArea from "../../../form/WkTextArea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../ui/card";

const BasicInfoStep = ({
  industries,
  companySizes,
}: {
  industries: { label: string; value: string }[];
  companySizes: { label: string; value: string }[];
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
            required
            className="h-10 sm:h-11"
          />
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Company URL Slug <span className="text-destructive ml-1">*</span>
            </label>
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0">
              <span className="text-muted-foreground truncate text-xs sm:mr-2 sm:text-sm">
                workly.com/company/
              </span>
              <WKInput name="slug" label="" required className="h-10 sm:h-11" />
            </div>
          </div>
        </div>

        <WKTextArea
          name="description"
          label="Company Description"
          required
          rows={4}
          className="resize-none"
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <WKSelect
            name="industry"
            label="Industry"
            placeholder="Select industry"
            required
            options={industries}
            className="h-10 sm:h-11"
          />
          <WKSelect
            name="size"
            label="Company Size"
            placeholder="Select company size"
            required
            options={companySizes}
            className="h-10 sm:h-11"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoStep;
