'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ROUTES } from '@/lib/routes';

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      if (!isSupabaseConfigured() || !supabase) {
        router.push(ROUTES.adminLogin);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!session) {
        router.push(ROUTES.adminLogin);
        return;
      }
      setChecking(false);
    };

    checkAuth();

    const { data: subscription } = supabase?.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push(ROUTES.adminLogin);
    }) ?? { data: null };

    return () => {
      cancelled = true;
      subscription?.subscription.unsubscribe();
    };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <AdminDashboard />;
}
