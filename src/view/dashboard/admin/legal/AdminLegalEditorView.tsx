"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKTextArea from "@/components/form/WkTextArea";
import DashboardAdminLegalHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminLegalHeader";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface AdminLegalEditorViewProps {
  title: string;
  defaultValues: FieldValues;
}

const AdminLegalEditorView = ({
  title,
  defaultValues,
}: AdminLegalEditorViewProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (data: FieldValues) => {
    setIsSaving(true);
    console.log(`Saving ${title}:`, data);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success(`${title} updated successfully!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminLegalHeader
        title={title}
        isSaving={isSaving}
        onSave={() => document.getElementById("legal-form-submit")?.click()}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 pb-20 sm:px-6 lg:px-8">
        <Card className="bg-card border-border/50 rounded-2xl border shadow-none">
          <CardContent className="p-8">
            <WkForm onSubmit={handleSubmit} defaultValues={defaultValues}>
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <WKInput
                    name="title"
                    label="Document Title"
                    placeholder="e.g. Privacy Policy"
                    required
                  />
                  <WKInput
                    name="lastUpdated"
                    label="Last Updated Date"
                    placeholder="e.g. March 14, 2026"
                    required
                  />
                </div>

                <Separator className="opacity-50" />

                <div className="space-y-6">
                  <h3 className="text-lg font-bold">Introduction Section</h3>
                  <WKTextArea
                    name="intro"
                    label="Introduction Text"
                    placeholder="Overview of the document..."
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold">Main Content</h3>
                  <p className="text-muted-foreground text-sm italic">
                    Note: In a production environment, this would be a rich-text
                    editor (WYSIWYG).
                  </p>
                  <WKTextArea
                    name="content"
                    label="Body Content"
                    placeholder="Detailed legal sections..."
                    rows={20}
                    required
                  />
                </div>

                <button id="legal-form-submit" type="submit" className="hidden">
                  Submit
                </button>
              </div>
            </WkForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLegalEditorView;
