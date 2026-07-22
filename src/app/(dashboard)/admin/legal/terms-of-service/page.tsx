import AdminLegalEditorView from '@/view/dashboard/admin/legal/AdminLegalEditorView';

export const metadata = {
  title: 'Edit Terms of Service | Admin Dashboard',
};

export default function AdminTermsOfServicePage() {
  return <AdminLegalEditorView title="Terms of Service" slug="terms-of-service" />;
}
