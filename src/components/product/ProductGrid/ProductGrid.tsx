import { Product } from '@/types';
import { ProductCard } from '../ProductCard';
import { Text } from '@/components/common';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
}

export const ProductGrid = ({
  products,
  columns = 4,
  emptyMessage = 'No products found',
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🍬</span>
        <Text variant="h4" weight="medium">{emptyMessage}</Text>
        <Text color="muted">Try adjusting your filters or search query</Text>
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${styles[`cols-${columns}`]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
