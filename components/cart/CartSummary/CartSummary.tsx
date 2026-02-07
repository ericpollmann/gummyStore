import { useCart } from '@/context';
import { Text } from '@/components/common';
import { formatCurrency } from '@/utils';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
  showDetails?: boolean;
}

export const CartSummary = ({ showDetails = true }: CartSummaryProps) => {
  const { summary } = useCart();

  return (
    <div className={styles.summary}>
      {showDetails && (
        <>
          <div className={styles.row}>
            <Text color="muted">Subtotal ({summary.itemCount} items)</Text>
            <Text weight="medium">{formatCurrency(summary.subtotal)}</Text>
          </div>
          <div className={styles.row}>
            <Text color="muted">Shipping</Text>
            <Text weight="medium">
              {summary.shipping === 0 ? (
                <span className={styles.free}>FREE</span>
              ) : (
                formatCurrency(summary.shipping)
              )}
            </Text>
          </div>
          <div className={styles.row}>
            <Text color="muted">Tax</Text>
            <Text weight="medium">{formatCurrency(summary.tax)}</Text>
          </div>
          {summary.shipping > 0 && (
            <div className={styles.freeShipping}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <Text variant="caption" color="muted">
                Add {formatCurrency(50 - summary.subtotal)} more for free shipping!
              </Text>
            </div>
          )}
          <div className={styles.divider} />
        </>
      )}
      <div className={styles.total}>
        <Text variant="h4" weight="semibold">Total</Text>
        <Text variant="h4" weight="bold" color="primary">
          {formatCurrency(summary.total)}
        </Text>
      </div>
    </div>
  );
};
