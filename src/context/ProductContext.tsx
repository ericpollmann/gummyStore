import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  ProductContextValue,
  ProductFilters,
  Product,
  ProductCategory,
} from '@/types';
import { products as mockProducts } from '@/data/products';

const defaultFilters: ProductFilters = {
  category: null,
  priceRange: { min: 0, max: 100 },
  inStockOnly: false,
  sortBy: 'name-asc',
  searchQuery: '',
};

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [filters, setFiltersState] = useState<ProductFilters>(defaultFilters);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const setFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const getProductById = useCallback((id: string): Product | undefined => {
    return mockProducts.find((p) => p.id === id);
  }, []);

  const getProductsByCategory = useCallback(
    (category: ProductCategory): Product[] => {
      return mockProducts.filter((p) => p.category === category);
    },
    []
  );

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    switch (filters.sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [filters]);

  const featuredProducts = useMemo(() => {
    return mockProducts.filter((p) => p.featured);
  }, []);

  const value: ProductContextValue = {
    products: filteredProducts,
    featuredProducts,
    filters,
    isLoading,
    error,
    setFilters,
    resetFilters,
    getProductById,
    getProductsByCategory,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextValue => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
