import { MapPin, Globe } from "lucide-react";
import WKInput from "../../../form/WkInput";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../ui/card";

const LocationDetailsStep = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Location & Company Details
        </CardTitle>
        <CardDescription className="text-sm">
          Add location and founding information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <WKInput
            name="location"
            label="Headquarters Location"
            required
            className="h-10 sm:h-11"
          />
          <WKInput
            name="founded"
            label="Founded Year"
            type="text"
            className="h-10 sm:h-11"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="websiteUrl" className="text-sm font-medium">
            Company Website
          </label>
          <div className="flex items-center space-x-2">
            <Globe className="text-muted-foreground h-4 w-4" />
            <WKInput
              name="websiteUrl"
              label=""
              type="text"
              className="h-10 sm:h-11"
            />
          </div>
        </div>

        <div className="bg-muted rounded-lg p-3 sm:p-4">
          <h4 className="mb-2 text-sm font-medium sm:text-base">
            Why add these details?
          </h4>
          <ul className="text-muted-foreground space-y-1 text-xs sm:text-sm">
            <li>• Location helps candidates find relevant opportunities</li>
            <li>• Company website builds trust and credibility</li>
            <li>• Founded year shows company stability and experience</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDetailsStep;
