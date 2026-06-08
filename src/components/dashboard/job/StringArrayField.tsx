"use client";
import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobFormData } from "./create-job-form";

interface StringArrayFieldProps {
  fieldName: "benefits" | "requirements";
  label: string;
  placeholder?: string;
  required?: boolean;
}

const StringArrayField = ({
  fieldName,
  label,
  placeholder,
  required = false,
}: StringArrayFieldProps) => {
  const { watch, setValue } = useFormContext<JobFormData>();
  const items = watch(fieldName) || [];

  const addItem = () => {
    setValue(fieldName, ["", ...items]);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setValue(fieldName, updatedItems);
  };

  const updateItem = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setValue(fieldName, updatedItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          className="h-8"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add {label}
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-muted-foreground border-primary/20 rounded-lg border border-dashed p-4 text-center text-sm">
          No {label.toLowerCase()} added yet. Click {`"Add ${label}"`} to get
          started.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="border-primary/30 flex items-center gap-2 rounded-lg border p-3"
            >
              <Input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="text-destructive hover:text-destructive h-8 w-8 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StringArrayField;
