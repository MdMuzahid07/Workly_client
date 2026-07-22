import AdminLegalEditorView from '@/view/dashboard/admin/legal/AdminLegalEditorView';

export const metadata = {
  title: 'Edit Cookie Policy | Admin Dashboard',
};

export default function AdminCookiePolicyPage() {
  return <AdminLegalEditorView title="Cookie Policy" slug="cookie-policy" />;
}
