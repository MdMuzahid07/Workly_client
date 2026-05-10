/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardAdminLegalHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminLegalHeader";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKTextArea from "@/components/form/WkTextArea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetLegalDocumentQuery,
  useUpsertLegalDocumentMutation,
} from "@/redux/feature/legal/legalApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface AdminLegalEditorViewProps {
  title: string;
  slug: string;
}

const AdminLegalEditorView = ({
  title: defaultTitle,
  slug,
}: AdminLegalEditorViewProps) => {
  const { data, isLoading } = useGetLegalDocumentQuery(slug);
  const [upsertLegalDocument, { isLoading: isSaving }] =
    useUpsertLegalDocumentMutation();

  const legalDoc = data?.data;
  const displayTitle = legalDoc?.title || defaultTitle;

  const handleSubmit = async (formData: FieldValues) => {
    try {
      await upsertLegalDocument({ slug, ...formData }).unwrap();
      toast.success(`${displayTitle} updated successfully!`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update document");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 lg:pt-20">
        <div className="bg-background/95 border-b px-4 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Card className="border-border/50 rounded-2xl border shadow-none">
            <CardContent className="space-y-8 p-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const defaultValues = {
    title: legalDoc?.title || defaultTitle,
    lastUpdated:
      legalDoc?.lastUpdated ||
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    intro: legalDoc?.intro || "",
    content: legalDoc?.content || "",
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminLegalHeader
        title={`Edit ${displayTitle}`}
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
                    Note: You can use HTML tags here for formatting (e.g.
                    &lt;h2&gt;, &lt;ul&gt;, &lt;strong&gt;).
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
