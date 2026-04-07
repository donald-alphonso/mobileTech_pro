'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase, type Product } from '@/lib/supabase';
import { Plus, Search, Edit, Trash2, Eye, Star } from 'lucide-react';
import { ProductForm } from './product-form';

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_featured: !product.is_featured })
        .eq('id', product.id);

      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={() => {
          setShowForm(false);
          setEditingProduct(null);
          fetchProducts();
        }}
        onCancel={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Produits</h2>
          <p className="text-gray-600">Gérez votre catalogue de produits</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Produit
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-gray-600">
          {filteredProducts.length} produit(s) trouvé(s)
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <CardDescription>{product.brand}</CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    {product.is_featured && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Vedette
                      </Badge>
                    )}
                    {product.is_promotion && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Promo
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {product.images && product.images.length > 0 && (
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {product.price}€
                    </span>
                    <Badge variant={product.in_stock ? "default" : "secondary"}>
                      {product.in_stock ? "En stock" : "Rupture"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>⭐ {product.rating}</span>
                    <span>•</span>
                    <span>{product.reviews_count} avis</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFeatured(product)}
                  >
                    <Star className={`h-4 w-4 ${product.is_featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingProduct(product);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={`/produit/${product.slug}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Aucun produit ne correspond à votre recherche.' : 'Commencez par ajouter votre premier produit.'}
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un Produit
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}