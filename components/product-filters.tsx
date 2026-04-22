'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { X, Filter } from 'lucide-react';

interface ProductFiltersProps {
  initialCategories?: string[];
  onFiltersChange?: (filters: {
    categories: string[];
    brands: string[];
    priceRange: number[];
    inStockOnly: boolean;
  }) => void;
}

export function ProductFilters({ initialCategories = [], onFiltersChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedCategories(initialCategories);
  }, [initialCategories.join(',')]);

  const categories = [
    { id: 'smartphones', name: 'Smartphones', count: 0 },
    { id: 'ecouteurs', name: 'Écouteurs', count: 0 },
    { id: 'coques', name: 'Coques & Protection', count: 0 },
    { id: 'chargeurs', name: 'Chargeurs', count: 0 },
    { id: 'accessoires', name: 'Autres Accessoires', count: 0 }
  ];

  const brands = [
    { id: 'apple', name: 'Apple', count: 0 },
    { id: 'samsung', name: 'Samsung', count: 0 },
    { id: 'huawei', name: 'Huawei', count: 0 },
    { id: 'xiaomi', name: 'Xiaomi', count: 0 },
    { id: 'oneplus', name: 'OnePlus', count: 0 },
    { id: 'google', name: 'Google', count: 0 }
  ];

  const handleBrandChange = (brandId: string, checked: boolean) => {
    let newBrands: string[];
    if (checked) {
      newBrands = [...selectedBrands, brandId];
    } else {
      newBrands = selectedBrands.filter(id => id !== brandId);
    }
    setSelectedBrands(newBrands);
    
    // Notify parent component of filter changes
    if (onFiltersChange) {
      onFiltersChange({
        categories: selectedCategories,
        brands: newBrands,
        priceRange,
        inStockOnly
      });
    }
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    let newCategories: string[];
    if (checked) {
      newCategories = [...selectedCategories, categoryId];
    } else {
      newCategories = selectedCategories.filter(id => id !== categoryId);
    }
    setSelectedCategories(newCategories);
    
    // Notify parent component of filter changes
    if (onFiltersChange) {
      onFiltersChange({
        categories: newCategories,
        brands: selectedBrands,
        priceRange,
        inStockOnly
      });
    }
  };

  const handlePriceChange = (newPriceRange: number[]) => {
    setPriceRange(newPriceRange);
    
    // Notify parent component of filter changes
    if (onFiltersChange) {
      onFiltersChange({
        categories: selectedCategories,
        brands: selectedBrands,
        priceRange: newPriceRange,
        inStockOnly
      });
    }
  };

  const handleStockChange = (checked: boolean) => {
    setInStockOnly(checked);
    
    // Notify parent component of filter changes
    if (onFiltersChange) {
      onFiltersChange({
        categories: selectedCategories,
        brands: selectedBrands,
        priceRange,
        inStockOnly: checked
      });
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setInStockOnly(false);
    
    // Notify parent component of cleared filters
    if (onFiltersChange) {
      onFiltersChange({
        categories: [],
        brands: [],
        priceRange: [0, 2000],
        inStockOnly: false
      });
    }
  };

  const hasActiveFilters = selectedBrands.length > 0 || selectedCategories.length > 0 || inStockOnly || priceRange[0] > 0 || priceRange[1] < 2000;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Catégories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="flex-1 text-sm font-normal cursor-pointer flex items-center justify-between"
              >
                <span>{category.name}</span>
                <span className="text-gray-500">({category.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Prix</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={2000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{priceRange[0]}€</span>
            <span>{priceRange[1]}€</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Marques</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
              />
              <Label
                htmlFor={`brand-${brand.id}`}
                className="flex-1 text-sm font-normal cursor-pointer flex items-center justify-between"
              >
                <span>{brand.name}</span>
                <span className="text-gray-500">({brand.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Disponibilité</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => handleStockChange(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
            En stock uniquement
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-4 border-t">
          <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
            <X className="h-4 w-4 mr-2" />
            Effacer les filtres
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Mobile Filter Panel */}
      {isOpen && (
        <div className="lg:hidden bg-white border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filtres</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <FilterContent />
        </div>
      )}

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block bg-white rounded-lg border p-6 sticky top-24">
        <h3 className="font-semibold text-lg mb-6">Filtres</h3>
        <FilterContent />
      </div>
    </>
  );
}