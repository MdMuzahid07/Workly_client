"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TimePeriod =
  | "7days"
  | "14days"
  | "lastMonth"
  | "3months"
  | "overall";

interface TimePeriodFilterProps {
  value: TimePeriod;
  onChange: (value: TimePeriod) => void;
}

export function TimePeriodFilter({ value, onChange }: TimePeriodFilterProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as TimePeriod)}>
      <SelectTrigger
        className="border-border h-7 w-[130px] cursor-pointer rounded-full text-xs"
        aria-label="Select time period"
      >
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem className="cursor-pointer rounded-lg" value="7days">
          Last 7 days
        </SelectItem>
        <SelectItem className="cursor-pointer rounded-lg" value="14days">
          Last 14 days
        </SelectItem>
        <SelectItem className="cursor-pointer rounded-lg" value="lastMonth">
          Last month
        </SelectItem>
        <SelectItem className="cursor-pointer rounded-lg" value="3months">
          Last 3 months
        </SelectItem>
        <SelectItem className="cursor-pointer rounded-lg" value="overall">
          Overall
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
