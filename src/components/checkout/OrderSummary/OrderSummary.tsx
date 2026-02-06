import { useCart, useCheckout } from '@/context';
import { Text, Button } from '@/components/common';
import { formatCurrency, maskCardNumber } from '@/utils';
import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  onBack: () => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}

export const OrderSummary = ({
  onBack,
  onPlaceOrder,
  isProcessing,
}: OrderSummaryProps) => {
  const { items, summary } = useCart();
  const { shippingAddress, paymentInfo } = useCheckout();

  return (
    <div className={styles.summary}>
      <Text variant="h4" weight="semibold" className={styles.title}>
        Review Your Order
      </Text>

      <div className={styles.section}>
        <Text variant="body" weight="medium" className={styles.sectionTitle}>
          Shipping Address
        </Text>
        {shippingAddress && (
          <div className={styles.addressCard}>
            <Text>
              {shippingAddress.firstName} {shippingAddress.lastName}
            </Text>
            <Text color="muted">{shippingAddress.street}</Text>
            {shippingAddress.apartment && (
              <Text color="muted">{shippingAddress.apartment}</Text>
            )}
            <Text color="muted">
              {shippingAddress.city}, {shippingAddress.state}{' '}
              {shippingAddress.zipCode}
            </Text>
            <Text color="muted">{shippingAddress.phone}</Text>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <Text variant="body" weight="medium" className={styles.sectionTitle}>
          Payment Method
        </Text>
        {paymentInfo && (
          <div className={styles.paymentCard}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <div>
              <Text weight="medium">
                {maskCardNumber(paymentInfo.cardNumber)}
              </Text>
              <Text variant="caption" color="muted">
                {paymentInfo.cardHolder}
              </Text>
            </div>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <Text variant="body" weight="medium" className={styles.sectionTitle}>
          Order Items ({summary.itemCount})
        </Text>
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.product.id} className={styles.item}>
              <img
                src={item.product.image}
                alt={item.product.name}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <Text weight="medium">{item.product.name}</Text>
                <Text variant="body-sm" color="muted">
                  Qty: {item.quantity}
                </Text>
              </div>
              <Text weight="medium">
                {formatCurrency(item.product.price * item.quantity)}
              </Text>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.totals}>
        <div className={styles.totalRow}>
          <Text color="muted">Subtotal</Text>
          <Text>{formatCurrency(summary.subtotal)}</Text>
        </div>
        <div className={styles.totalRow}>
          <Text color="muted">Shipping</Text>
          <Text>
            {summary.shipping === 0 ? 'FREE' : formatCurrency(summary.shipping)}
          </Text>
        </div>
        <div className={styles.totalRow}>
          <Text color="muted">Tax</Text>
          <Text>{formatCurrency(summary.tax)}</Text>
        </div>
        <div className={styles.divider} />
        <div className={styles.totalRow}>
          <Text variant="h4" weight="semibold">Total</Text>
          <Text variant="h4" weight="bold" color="primary">
            {formatCurrency(summary.total)}
          </Text>
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          onClick={onPlaceOrder}
          isLoading={isProcessing}
        >
          Place Order
        </Button>
      </div>

      <Text variant="caption" color="muted" align="center">
        By placing your order, you agree to our Terms of Service and Privacy Policy
      </Text>
    </div>
  );
};
