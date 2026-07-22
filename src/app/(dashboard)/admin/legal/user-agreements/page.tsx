import AdminLegalEditorView from '@/view/dashboard/admin/legal/AdminLegalEditorView';

export const metadata = {
  title: 'Edit User Agreements | Admin Dashboard',
};

export default function AdminUserAgreementsPage() {
  return <AdminLegalEditorView title="User Agreements" slug="user-agreements" />;
}
