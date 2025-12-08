"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";

interface SubcategoriesArrayFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const SubcategoriesArrayField = ({
  name,
  label = "Subcategories",
  placeholder = "Enter subcategory name...",
}: SubcategoriesArrayFieldProps) => {
  const { watch, setValue } = useFormContext();
  const items = watch(name) || [];

  const addItem = () => {
    setValue(name, ["", ...items], { shouldValidate: true });
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_: string, i: number) => i !== index);
    setValue(name, updatedItems, { shouldValidate: true });
  };

  const updateItem = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setValue(name, updatedItems, { shouldValidate: true });
  };

  return (
    <ScrollArea className="max-h-[70vh]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{label}</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
            className="h-8"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Subcategory
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="text-muted-foreground border-primary/20 rounded-lg border border-dashed p-4 text-center text-sm">
            No subcategories added yet. Click {`"Add Subcategory"`} to get
            started.
          </div>
        ) : (
          <ScrollArea className="max-h-72 pr-2">
            <div className="space-y-3">
              {items.map((item: string, index: number) => (
                <div
                  key={index}
                  className="border-primary/30 flex items-center gap-2 rounded-lg border p-3"
                >
                  <Input
                    type="text"
                    value={item}
                    onChange={(e) => updateItem(index, e.target.value)}
                    placeholder={placeholder}
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
          </ScrollArea>
        )}
      </div>
    </ScrollArea>
  );
};

export default SubcategoriesArrayField;
