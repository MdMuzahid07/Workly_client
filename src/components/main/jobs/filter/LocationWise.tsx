/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin } from "lucide-react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

const LocationWise = ({
  updateFilters,
  filters,
  locationOptions,
}: {
  updateFilters: any;
  filters: any;
  locationOptions: any;
}) => {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <MapPin className="h-4 w-4" />
        Location
      </Label>
      <RadioGroup
        value={filters.location}
        onValueChange={(value) => updateFilters({ location: value })}
      >
        {locationOptions.map((location: any) => (
          <div key={location} className="flex items-center space-x-2">
            <RadioGroupItem value={location} id={`location-${location}`} />
            <Label
              htmlFor={`location-${location}`}
              className="cursor-pointer text-sm"
            >
              {location}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default LocationWise;
