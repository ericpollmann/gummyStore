import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '../ProductCard/ProductCard';
import { Text } from '@/components/common/Text/Text';
import { SAMPLE_PRODUCTS } from '@/data/samples';
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
  const { addItem, isInCart } = useCart();

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
        <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <ProductCard
            product={product}
            inCart={isInCart(product.id)}
            onAddToCart={addItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default function ProductGridPreview() {
  return (
    <div className={styles.grid}>
      {SAMPLE_PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
