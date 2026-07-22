/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Loader2, MapPin, X } from 'lucide-react';
import { Label } from '../../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';

interface LocationOption {
  name: string;
  count: number;
}

const LocationWise = ({
  updateFilters,
  filters,
  locationOptions,
  locationsLoading,
}: {
  updateFilters: any;
  filters: any;
  locationOptions: LocationOption[];
  locationsLoading?: boolean;
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="h-4 w-4" />
          Location
          {locationOptions.length > 0 && (
            <span className="text-muted-foreground text-xs font-normal">
              ({locationOptions.length})
            </span>
          )}
        </Label>
        {filters.location && (
          <button
            type="button"
            onClick={() => updateFilters({ location: '' })}
            className="text-primary hover:text-primary/80 flex cursor-pointer items-center gap-1 text-xs font-medium"
          >
            Clear <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {locationsLoading ? (
        <div className="flex items-center justify-center py-3">
          <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
          <span className="text-muted-foreground ml-2 text-xs">Loading locations...</span>
        </div>
      ) : locationOptions.length === 0 ? (
        <div className="text-muted-foreground py-2 text-xs">No locations available</div>
      ) : (
        <RadioGroup
          value={filters.location}
          onValueChange={(value) =>
            updateFilters({ location: value === filters.location ? '' : value })
          }
          className="max-h-48 space-y-1.5 overflow-y-auto pr-1"
        >
          {locationOptions.map((item: LocationOption) => (
            <div key={item.name} className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={item.name} id={`location-${item.name}`} />
                <Label
                  htmlFor={`location-${item.name}`}
                  className="cursor-pointer text-sm font-normal"
                >
                  {item.name}
                </Label>
              </div>
              <span className="text-muted-foreground text-xs tabular-nums">{item.count}</span>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
};

export default LocationWise;
