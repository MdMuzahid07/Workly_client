import AdminLegalEditorView from "@/view/dashboard/admin/legal/AdminLegalEditorView";

export const metadata = {
  title: "Edit Terms of Service | Admin Dashboard",
};

export default function AdminTermsOfServicePage() {
  const defaultValues = {
    title: "Terms of Service",
    lastUpdated: "March 14, 2026",
    intro:
      "By accessing or using Workly_job, you agree to be bound by these terms.",
    content:
      "1. Acceptance of Terms\n\nBy accessing or using Workly_job (the 'Service'), you agree to be bound by these terms...",
  };

  return (
    <AdminLegalEditorView
      title="Terms of Service"
      defaultValues={defaultValues}
    />
  );
}
