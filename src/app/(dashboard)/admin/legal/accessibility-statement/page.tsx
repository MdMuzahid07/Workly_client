import AdminLegalEditorView from "@/view/dashboard/admin/legal/AdminLegalEditorView";

export const metadata = {
  title: "Edit Accessibility Statement | Admin Dashboard",
};

export default function AdminAccessibilityStatementPage() {
  return (
    <AdminLegalEditorView
      title="Accessibility Statement"
      slug="accessibility-statement"
    />
  );
}
