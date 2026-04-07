import { redirect } from 'next/navigation';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

export const metadata = {
  title: 'Dashboard Admin - MobileTech Pro',
  description: 'Interface d\'administration pour gérer les produits et les leads',
};

export default function AdminPage() {
  // TODO: Ajouter la vérification d'authentification admin
  // const { user, isAdmin } = await checkAdminAuth();
  // if (!isAdmin) redirect('/admin/login');

  return <AdminDashboard />;
}