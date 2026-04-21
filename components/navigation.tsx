'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Smartphone, Search, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES, catalogueWithSearch } from '@/lib/routes';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: ROUTES.home, label: 'Accueil' },
    { href: ROUTES.catalogue, label: 'Catalogue' },
    { href: ROUTES.about, label: 'À Propos' },
    { href: ROUTES.contact, label: 'Contact' },
  ];

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    router.push(catalogueWithSearch(trimmed));
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={ROUTES.home} className="flex items-center space-x-2 font-bold text-xl text-blue-600">
            <Smartphone className="h-8 w-8" />
            <span>MobileTech Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-blue-600 ${
                  isActive(item.href) ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <label htmlFor="nav-search" className="sr-only">Recherche</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="nav-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Recherche"
                    className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                  />
                </div>
              </form>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                01 23 45 67 89
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 transition-colors hover:text-blue-600 ${
                    isActive(item.href) ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t space-y-3">
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <label htmlFor="nav-search-mobile" className="sr-only">Recherche</label>
                  <div className="relative w-full">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="nav-search-mobile"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Recherche"
                      className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                  </div>
                </form>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  01 23 45 67 89
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}