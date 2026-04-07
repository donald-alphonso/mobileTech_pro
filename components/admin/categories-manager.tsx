'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase, type Category, type Brand } from '@/lib/supabase';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingBrand, setBrand] = useState<Brand | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showBrandForm, setShowBrandForm] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    slug: '',
    icon: '',
    image: ''
  });

  const [brandForm, setBrandForm] = useState({
    name: '',
    slug: '',
    logo: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesResult, brandsResult] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('brands').select('*').order('name')
      ]);

      if (categoriesResult.data) setCategories(categoriesResult.data);
      if (brandsResult.data) setBrands(brandsResult.data);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = categoryForm.slug || generateSlug(categoryForm.name);
      const data = { ...categoryForm, slug };

      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', editingCategory.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([data]);
        if (error) throw error;
      }

      resetCategoryForm();
      await fetchData();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = brandForm.slug || generateSlug(brandForm.name);
      const data = { ...brandForm, slug };

      if (editingBrand) {
        const { error } = await supabase
          .from('brands')
          .update(data)
          .eq('id', editingBrand.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('brands')
          .insert([data]);
        if (error) throw error;
      }

      resetBrandForm();
      await fetchData();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', description: '', slug: '', icon: '', image: '' });
    setEditingCategory(null);
    setShowCategoryForm(false);
  };

  const resetBrandForm = () => {
    setBrandForm({ name: '', slug: '', logo: '' });
    setBrand(null);
    setShowBrandForm(false);
  };

  const editCategory = (category: Category) => {
    setCategoryForm({
      name: category.name,
      description: category.description,
      slug: category.slug,
      icon: category.icon,
      image: category.image
    });
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const editBrand = (brand: Brand) => {
    setBrandForm({
      name: brand.name,
      slug: brand.slug,
      logo: brand.logo || ''
    });
    setBrand(brand);
    setShowBrandForm(true);
  };

  const deleteCategory = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const deleteBrand = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette marque ?')) return;
    
    try {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Gestion des Catégories et Marques</h2>
        <p className="text-gray-600">Organisez votre catalogue de produits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Catégories */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Catégories</h3>
            <Button onClick={() => setShowCategoryForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Catégorie
            </Button>
          </div>

          {showCategoryForm && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingCategory ? 'Modifier la Catégorie' : 'Nouvelle Catégorie'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cat-name">Nom *</Label>
                    <Input
                      id="cat-name"
                      value={categoryForm.name}
                      onChange={(e) => {
                        setCategoryForm({...categoryForm, name: e.target.value});
                        if (!categoryForm.slug) {
                          setCategoryForm(prev => ({...prev, slug: generateSlug(e.target.value)}));
                        }
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cat-description">Description *</Label>
                    <Textarea
                      id="cat-description"
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cat-slug">Slug</Label>
                    <Input
                      id="cat-slug"
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cat-icon">Icône (nom Lucide)</Label>
                    <Input
                      id="cat-icon"
                      value={categoryForm.icon}
                      onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
                      placeholder="Smartphone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cat-image">URL Image</Label>
                    <Input
                      id="cat-image"
                      value={categoryForm.image}
                      onChange={(e) => setCategoryForm({...categoryForm, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button type="button" variant="outline" onClick={resetCategoryForm}>
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <div className="text-xs text-gray-500">
                        Slug: {category.slug} • {category.product_count} produits
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editCategory(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Marques */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Marques</h3>
            <Button onClick={() => setShowBrandForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Marque
            </Button>
          </div>

          {showBrandForm && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingBrand ? 'Modifier la Marque' : 'Nouvelle Marque'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBrandSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand-name">Nom *</Label>
                    <Input
                      id="brand-name"
                      value={brandForm.name}
                      onChange={(e) => {
                        setBrandForm({...brandForm, name: e.target.value});
                        if (!brandForm.slug) {
                          setBrandForm(prev => ({...prev, slug: generateSlug(e.target.value)}));
                        }
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand-slug">Slug</Label>
                    <Input
                      id="brand-slug"
                      value={brandForm.slug}
                      onChange={(e) => setBrandForm({...brandForm, slug: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand-logo">URL Logo</Label>
                    <Input
                      id="brand-logo"
                      value={brandForm.logo}
                      onChange={(e) => setBrandForm({...brandForm, logo: e.target.value})}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button type="button" variant="outline" onClick={resetBrandForm}>
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {brands.map((brand) => (
              <Card key={brand.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold">{brand.name}</h4>
                      <div className="text-xs text-gray-500">
                        Slug: {brand.slug} • {brand.product_count} produits
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editBrand(brand)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteBrand(brand.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}