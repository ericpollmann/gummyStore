import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/context';
import { Container } from '@/components/layout';
import { ProductGrid, ProductFilters } from '@/components/product';
import { Text } from '@/components/common';
import { ProductCategory } from '@/types';
import { formatCategoryName } from '@/utils';
import styles from './ProductsPage.module.css';

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const { products, filters, setFilters } = useProducts();

  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const searchParam = searchParams.get('search');

  useEffect(() => {
    if (categoryParam) {
      setFilters({ category: categoryParam });
    }
    if (searchParam) {
      setFilters({ searchQuery: searchParam });
    }
  }, [categoryParam, searchParam, setFilters]);

  const pageTitle = filters.category
    ? formatCategoryName(filters.category)
    : filters.searchQuery
    ? `Search Results for "${filters.searchQuery}"`
    : 'All Products';

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Container>
          <Text variant="h2" weight="bold">{pageTitle}</Text>
          <Text color="muted">
            {products.length} {products.length === 1 ? 'product' : 'products'} available
          </Text>
        </Container>
      </div>

      <Container>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <ProductFilters />
          </aside>
          <main className={styles.main}>
            <ProductGrid products={products} columns={3} />
          </main>
        </div>
      </Container>
    </div>
  );
};
