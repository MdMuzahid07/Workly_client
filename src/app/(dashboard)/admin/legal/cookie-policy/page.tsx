import AdminLegalEditorView from "@/view/dashboard/admin/legal/AdminLegalEditorView";

export const metadata = {
  title: "Edit Cookie Policy | Admin Dashboard",
};

export default function AdminCookiePolicyPage() {
  const defaultValues = {
    title: "Cookie Policy",
    lastUpdated: "March 14, 2026",
    intro:
      "Cookies are small text files that are placed on your computer by websites that you visit.",
    content:
      "1. What Are Cookies\n\nCookies are small text files that are placed on your computer by websites that you visit...",
  };

  return (
    <AdminLegalEditorView title="Cookie Policy" defaultValues={defaultValues} />
  );
}
