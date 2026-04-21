'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Package, Users, ShoppingCart, TrendingUp, Eye, Star } from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalLeads: number;
  newLeads: number;
  featuredProducts: number;
  inStockProducts: number;
  averageRating: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalLeads: 0,
    newLeads: 0,
    featuredProducts: 0,
    inStockProducts: 0,
    averageRating: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setIsLoading(false);
      return;
    }
    try {
      // Statistiques des produits
      const { data: products } = await supabase
        .from('products')
        .select('id, is_featured, in_stock, rating');

      // Statistiques des leads
      const { data: leads } = await supabase
        .from('leads')
        .select('id, status, created_at');

      // Leads des 7 derniers jours
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const { data: newLeads } = await supabase
        .from('leads')
        .select('id')
        .gte('created_at', weekAgo.toISOString());

      if (products) {
        const totalProducts = products.length;
        const featuredProducts = products.filter(p => p.is_featured).length;
        const inStockProducts = products.filter(p => p.in_stock).length;
        const averageRating = products.reduce((sum, p) => sum + (p.rating || 0), 0) / totalProducts;

        setStats(prev => ({
          ...prev,
          totalProducts,
          featuredProducts,
          inStockProducts,
          averageRating: Math.round(averageRating * 10) / 10
        }));
      }

      if (leads) {
        setStats(prev => ({
          ...prev,
          totalLeads: leads.length,
          newLeads: newLeads?.length || 0
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Produits',
      value: stats.totalProducts,
      description: `${stats.inStockProducts} en stock`,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      description: `${stats.newLeads} cette semaine`,
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Produits Vedette',
      value: stats.featuredProducts,
      description: 'Mis en avant',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'Note Moyenne',
      value: stats.averageRating,
      description: 'Sur 5 étoiles',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mb-2" />
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>Dernières actions sur le site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Nouveau lead reçu il y a 2h</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">Produit mis à jour il y a 4h</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-sm">Nouveau produit ajouté hier</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Raccourcis vers les tâches courantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                + Ajouter un nouveau produit
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                📧 Répondre aux leads en attente
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                ⭐ Mettre à jour les produits vedette
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}