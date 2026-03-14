import AdminLegalEditorView from "@/view/dashboard/admin/legal/AdminLegalEditorView";

export const metadata = {
  title: "Edit User Agreements | Admin Dashboard",
};

export default function AdminUserAgreementsPage() {
  const defaultValues = {
    title: "User Agreements",
    lastUpdated: "March 14, 2026",
    intro:
      "Specific legal agreements for different user roles and platform interactions.",
    content:
      "This document outlines the specific agreements required for Job Seekers, Employers, and other platform participants...",
  };

  return (
    <AdminLegalEditorView
      title="User Agreements"
      defaultValues={defaultValues}
    />
  );
}
