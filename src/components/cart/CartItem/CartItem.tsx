import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context';
import { Text } from '@/components/common';
import { formatCurrency } from '@/utils';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
  variant?: 'default' | 'compact';
}

export const CartItem = ({ item, variant = 'default' }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stockQuantity) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  return (
    <div className={`${styles.item} ${styles[variant]}`}>
      <img src={product.image} alt={product.name} className={styles.image} />

      <div className={styles.details}>
        <Text variant="body" weight="medium" className={styles.name}>
          {product.name}
        </Text>
        <Text variant="body-sm" color="muted">
          {formatCurrency(product.price)} each
        </Text>
      </div>

      <div className={styles.quantity}>
        <button
          className={styles.quantityButton}
          onClick={handleDecrease}
          aria-label="Decrease quantity"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
          </svg>
        </button>
        <span className={styles.quantityValue}>{quantity}</span>
        <button
          className={styles.quantityButton}
          onClick={handleIncrease}
          disabled={quantity >= product.stockQuantity}
          aria-label="Increase quantity"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <div className={styles.price}>
        <Text variant="body" weight="semibold" color="primary">
          {formatCurrency(product.price * quantity)}
        </Text>
      </div>

      <button
        className={styles.removeButton}
        onClick={() => removeItem(product.id)}
        aria-label="Remove item"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
};
