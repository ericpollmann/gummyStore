import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/context';
import { Badge, Button, Text } from '@/components/common';
import { formatCurrency } from '@/utils';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export const ProductCard = ({
  product,
  variant = 'default',
}: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className={`${styles.card} ${styles[variant]}`}
    >
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
    </Link>
  );
};
