export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  isNew: boolean;
  weight: string;
  ingredients: string[];
}

export type ProductCategory =
  | 'chocolate'
  | 'gummy'
  | 'hard-candy'
  | 'lollipops'
  | 'sour'
  | 'licorice'
  | 'caramel'
  | 'seasonal';

export interface ProductFilters {
  category: ProductCategory | null;
  priceRange: PriceRange;
  inStockOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';

export interface ProductContextState {
  products: Product[];
  featuredProducts: Product[];
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
}

export interface ProductContextActions {
  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory) => Product[];
}

export type ProductContextValue = ProductContextState & ProductContextActions;
