import AdminLegalEditorView from "@/view/dashboard/admin/legal/AdminLegalEditorView";

export const metadata = {
  title: "Edit Accessibility Statement | Admin Dashboard",
};

export default function AdminAccessibilityStatementPage() {
  const defaultValues = {
    title: "Accessibility Statement",
    lastUpdated: "March 14, 2026",
    intro:
      "Workly_job is committed to providing a platform that is accessible to the widest possible audience.",
    content:
      "1. Our Commitment\n\nWorkly_job is committed to providing a platform that is accessible to the widest possible audience...",
  };

  return (
    <AdminLegalEditorView
      title="Accessibility Statement"
      defaultValues={defaultValues}
    />
  );
}
