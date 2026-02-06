import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Text } from '@/components/common';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  query: string;
  results: Product[];
  isLoading?: boolean;
}

export const SearchResults = ({
  query,
  results,
  isLoading = false,
}: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <Text color="muted">Searching...</Text>
      </div>
    );
  }

  if (!query) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🔍</span>
        <Text variant="h4" weight="medium">No results found</Text>
        <Text color="muted">
          We could not find any candies matching &quot;{query}&quot;
        </Text>
        <Text variant="body-sm" color="muted">
          Try a different search term or browse our categories
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.results}>
      <div className={styles.header}>
        <Text color="muted">
          Found <strong>{results.length}</strong> result{results.length !== 1 && 's'} for &quot;{query}&quot;
        </Text>
      </div>
      <div className={styles.grid}>
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
