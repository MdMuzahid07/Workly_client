import AdminLegalEditorView from "@/view/dashboard/admin/legal/AdminLegalEditorView";

export const metadata = {
  title: "Edit Privacy Policy | Admin Dashboard",
};

export default function AdminPrivacyPolicyPage() {
  return <AdminLegalEditorView title="Privacy Policy" slug="privacy-policy" />;
}
