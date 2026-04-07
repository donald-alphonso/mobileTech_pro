'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductsManager } from './products-manager';
import { LeadsManager } from './leads-manager';
import { CategoriesManager } from './categories-manager';
import { DashboardStats } from './dashboard-stats';
import { Package, Users, FolderOpen, BarChart3, Settings } from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin - MobileTech Pro</h1>
          <p className="text-gray-600">Gérez vos produits, leads et contenu</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Statistiques</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Produits</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Leads</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center space-x-2">
              <FolderOpen className="h-4 w-4" />
              <span>Catégories</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Paramètres</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="products">
            <ProductsManager />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManager />
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Paramètres</h2>
              <p className="text-gray-600">Configuration du site et paramètres avancés (à venir)</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}