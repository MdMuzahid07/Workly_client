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

export const TIME_PERIOD_OPTIONS: { value: TimePeriod; label: string }[] = [
  { value: "7days", label: "Last 7 days" },
  { value: "14days", label: "Last 14 days" },
  { value: "lastMonth", label: "Last month" },
  { value: "3months", label: "Last 3 months" },
  { value: "overall", label: "All time" },
];

interface TimePeriodFilterProps {
  value: TimePeriod;
  onChange: (value: TimePeriod) => void;
  className?: string;
}

export function TimePeriodFilter({
  value,
  onChange,
  className,
}: TimePeriodFilterProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as TimePeriod)}>
      <SelectTrigger
        className={`border-border h-8 w-[140px] cursor-pointer rounded-full text-xs font-medium ${className ?? ""}`}
        aria-label="Select time period"
      >
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {TIME_PERIOD_OPTIONS.map((opt) => (
          <SelectItem
            key={opt.value}
            className="cursor-pointer rounded-lg text-xs font-medium"
            value={opt.value}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
