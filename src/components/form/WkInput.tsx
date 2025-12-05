"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface WKInputProps {
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: "text" | "email" | "password" | "number";
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
}

const WKInput = ({
  size = "lg",
  required = false,
  type = "text",
  label,
  name,
  className,
  placeholder,
}: WKInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-9 text-sm",
    lg: "h-10",
  };

  const hasError = !!errors[name];

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={hasError ? "text-destructive" : ""}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        id={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          sizeClasses[size],
          hasError && "border-destructive focus-visible:ring-destructive",
          className,
        )}
      />
      {hasError && (
        <p className="text-destructive text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default WKInput;
