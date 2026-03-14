import AdminLegalEditorView from "@/view/dashboard/admin/legal/AdminLegalEditorView";

export const metadata = {
  title: "Edit Privacy Policy | Admin Dashboard",
};

export default function AdminPrivacyPolicyPage() {
  const defaultValues = {
    title: "Privacy Policy",
    lastUpdated: "March 14, 2026",
    intro:
      "At Workly_job Corporation, we respect your privacy and are committed to protecting your personal data.",
    content:
      "1. Introduction\n\nAt Workly_job Corporation ('Workly', 'we', 'us', or 'our'), we respect your privacy and are committed to protecting your personal data...",
  };

  return (
    <AdminLegalEditorView
      title="Privacy Policy"
      defaultValues={defaultValues}
    />
  );
}
