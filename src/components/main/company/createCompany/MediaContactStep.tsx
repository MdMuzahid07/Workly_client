import { Mail, Phone, Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CompanyFormData } from "../../../../view/dashboard/CompanyCreationView";
import WKInput from "../../../form/WkInput";
import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

const MediaContactStep = () => {
  const { watch } = useFormContext<CompanyFormData>();
  const formData = watch();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Media & Contact Information
        </CardTitle>
        <CardDescription className="text-sm">
          Add your logo and contact details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="contactEmail" className="text-sm font-medium">
              Contact Email <span className="text-destructive ml-1">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <Mail className="text-muted-foreground h-4 w-4" />
              <WKInput
                name="contactEmail"
                label=""
                type="email"
                required
                className="h-10 sm:h-11"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="contactPhone" className="text-sm font-medium">
              Contact Phone
            </label>
            <div className="flex items-center space-x-2">
              <Phone className="text-muted-foreground h-4 w-4" />
              <WKInput
                name="contactPhone"
                label=""
                type="text"
                className="h-10 sm:h-11"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Logo</label>
            <div className="border-border rounded-lg border-2 border-dashed p-4 text-center sm:p-6">
              <Upload className="text-muted-foreground mx-auto mb-2 h-6 w-6 sm:h-8 sm:w-8" />
              <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
                Upload your company logo (PNG, JPG up to 2MB)
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full bg-transparent sm:w-auto"
              >
                Choose File
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Cover Image (Optional)
            </label>
            <div className="border-border rounded-lg border-2 border-dashed p-4 text-center sm:p-6">
              <Upload className="text-muted-foreground mx-auto mb-2 h-6 w-6 sm:h-8 sm:w-8" />
              <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
                Upload a cover image for your company profile
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full bg-transparent sm:w-auto"
              >
                Choose File
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-primary/20 rounded-lg p-3 sm:p-4">
          <h4 className="mb-2 text-sm font-medium sm:text-base">
            📋 Review Your Information
          </h4>
          <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 sm:gap-4 sm:text-sm">
            <div className="space-y-1">
              <p>
                <strong>Company:</strong>{" "}
                <span className="wrap-break-words">
                  {formData.name || "Not set"}
                </span>
              </p>
              <p>
                <strong>Industry:</strong> {formData.industry || "Not set"}
              </p>
              <p>
                <strong>Size:</strong> {formData.size || "Not set"}
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <strong>Location:</strong>{" "}
                <span className="wrap-break-words">
                  {formData.location || "Not set"}
                </span>
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <span className="break-all">
                  {formData.websiteUrl || "Not set"}
                </span>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <span className="break-all">
                  {formData.contactEmail || "Not set"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaContactStep;
