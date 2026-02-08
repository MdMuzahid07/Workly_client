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
        className="h-7 w-[130px] rounded-lg text-xs"
        aria-label="Select time period"
      >
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem value="7days">Last 7 days</SelectItem>
        <SelectItem value="14days">Last 14 days</SelectItem>
        <SelectItem value="lastMonth">Last month</SelectItem>
        <SelectItem value="3months">Last 3 months</SelectItem>
        <SelectItem value="overall">Overall</SelectItem>
      </SelectContent>
    </Select>
  );
}
