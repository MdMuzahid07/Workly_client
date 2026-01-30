import { Globe, MapPin } from "lucide-react";
import WKDatePicker from "../../../form/WKDatePicker";
import WKInput from "../../../form/WkInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
            placeholder="Dhaka,Bangladesh"
            label="Headquarters Location"
            required
            className="h-10 rounded-full sm:h-11"
          />
          <WKDatePicker
            name="founded"
            label="Founded Year"
            required={false}
            className="h-10 rounded-full sm:h-11"
          />
        </div>

        <WKInput
          name="websiteUrl"
          placeholder="example.com"
          label="Company Website"
          labelIcon={<Globe className="text-muted-foreground h-4 w-4" />}
          type="text"
          className="h-10 w-full flex-1 rounded-full sm:h-11"
        />

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
