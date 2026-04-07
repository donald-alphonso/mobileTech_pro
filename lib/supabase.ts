import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if environment variables are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabase);
};

// Types pour la base de données
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  original_price?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  category: string;
  in_stock: boolean;
  rating: number;
  reviews_count: number;
  slug: string;
  is_featured: boolean;
  is_promotion: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  contact_method: 'email' | 'phone' | 'both';
  product_name?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
  icon: string;
  image: string;
  product_count: number;
  created_at: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  product_count: number;
  created_at: string;
}