'use client';

import { LayoutGrid, Plus, Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface SubcategoriesArrayFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const SubcategoriesArrayField = ({
  name,
  label = 'Sub-categories',
  placeholder = 'Enter subcategory name...',
}: SubcategoriesArrayFieldProps) => {
  const { watch, setValue } = useFormContext();
  const items = watch(name) || [];

  const addItem = () => {
    setValue(name, ['', ...items], { shouldValidate: true });
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
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-muted-foreground flex items-center gap-1.5 text-sm font-bold tracking-wider uppercase">
          <LayoutGrid className="text-primary h-4 w-4" />
          {label}
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          className="border-primary/25 hover:bg-primary/5 hover:text-primary h-8 rounded-full text-xs font-bold transition-all"
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          Add Subcategory
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-muted-foreground bg-muted/20 border-muted-foreground/20 rounded-xl border border-dashed p-6 text-center text-sm font-medium">
          No subcategories added yet. Click &quot;Add Subcategory&quot; to get started.
        </div>
      ) : (
        <div className="grid max-h-[220px] scrollbar-thin grid-cols-1 gap-2 overflow-y-auto pr-1.5">
          {items.map((item: string, index: number) => (
            <div
              key={index}
              className="border-input hover:border-primary/30 bg-muted/5 focus-within:border-primary focus-within:ring-primary/20 flex items-center gap-2 rounded-xl border p-2 transition-all focus-within:ring-1"
            >
              <Input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                placeholder={placeholder}
                className="flex-1 border-0 bg-transparent px-2 py-1 text-sm font-semibold focus-visible:ring-0"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 shrink-0 rounded-lg transition-colors"
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

export default SubcategoriesArrayField;
