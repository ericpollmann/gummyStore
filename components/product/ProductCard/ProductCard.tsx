import { Product } from '@/types/product';
import { Badge } from '@/components/common/Badge/Badge';
import { Button } from '@/components/common/Button/Button';
import { Text } from '@/components/common/Text/Text';
import { formatCurrency } from '@/utils/formatters';
import { SAMPLE_PRODUCT, noop } from '@/data/samples';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
  inCart?: boolean;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({
  product,
  variant = 'default',
  inCart = false,
  onAddToCart,
}: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <div className={styles.badges}>
          {product.isNew && (
            <Badge variant="secondary" size="sm">New</Badge>
          )}
          {product.originalPrice && (
            <Badge variant="danger" size="sm">Sale</Badge>
          )}
          {!product.inStock && (
            <Badge variant="default" size="sm">Out of Stock</Badge>
          )}
        </div>
        <div className={styles.overlay}>
          <Button
            size="sm"
            variant={inCart ? 'secondary' : 'primary'}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {inCart ? 'In Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <Text variant="caption" color="muted" className={styles.category}>
          {product.category.replace('-', ' ')}
        </Text>
        <Text variant="body" weight="medium" className={styles.name}>
          {product.name}
        </Text>
        <div className={styles.rating}>
          <span className={styles.stars}>
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <Text variant="caption" color="muted">
            ({product.reviewCount})
          </Text>
        </div>
        <div className={styles.priceRow}>
          <Text variant="body" weight="semibold" color="primary">
            {formatCurrency(product.price)}
          </Text>
          {product.originalPrice && (
            <Text
              variant="body-sm"
              color="muted"
              className={styles.originalPrice}
            >
              {formatCurrency(product.originalPrice)}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductCardPreview() {
  return <ProductCard product={SAMPLE_PRODUCT} onAddToCart={noop} />;
}
