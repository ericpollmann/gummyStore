import { useState } from 'react';
import { Link, Navigate, MemoryRouter } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import { ProductProvider } from '@/context/ProductContext';
import { CartProvider } from '@/context/CartContext';
import { CheckoutProvider } from '@/context/CheckoutContext';
import { Container } from '@/components/layout/Container/Container';
import { CheckoutForm } from '@/components/checkout/CheckoutForm/CheckoutForm';
import { CartSummary } from '@/components/cart/CartSummary/CartSummary';
import { Text } from '@/components/common/Text/Text';
import { Button } from '@/components/common/Button/Button';
import styles from './CheckoutPage.module.css';

export const CheckoutPage = () => {
  const { items, summary } = useCart();
  const { resetCheckout } = useCheckout();
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  if (items.length === 0 && !orderComplete) {
    return <Navigate to="/cart" replace />;
  }

  if (orderComplete) {
    return (
      <Container>
        <div className={styles.success}>
          <div className={styles.successIcon}>🎉</div>
          <Text variant="h2" weight="bold" align="center">
            Order Confirmed!
          </Text>
          <Text color="muted" align="center">
            Thank you for your order. We have received your payment and will ship your items shortly.
          </Text>
          <div className={styles.orderInfo}>
            <Text variant="body-sm" color="muted">Order Number</Text>
            <Text variant="h4" weight="semibold">{orderComplete}</Text>
          </div>
          <Text variant="body-sm" color="muted" align="center">
            A confirmation email has been sent to your email address.
          </Text>
          <Link to="/products">
            <Button
              size="lg"
              onClick={() => {
                resetCheckout();
                setOrderComplete(null);
              }}
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.header}>
          <Link to="/cart" className={styles.backLink}>
            ← Back to Cart
          </Link>
          <Text variant="h2" weight="bold">Checkout</Text>
        </div>

        <div className={styles.layout}>
          <main className={styles.main}>
            <CheckoutForm onOrderComplete={setOrderComplete} />
          </main>

          <aside className={styles.sidebar}>
            <div className={styles.orderSummary}>
              <Text variant="h4" weight="semibold" className={styles.summaryTitle}>
                Order Summary
              </Text>
              <div className={styles.summaryItems}>
                {items.map((item) => (
                  <div key={item.product.id} className={styles.summaryItem}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemInfo}>
                      <Text variant="body-sm" weight="medium">
                        {item.product.name}
                      </Text>
                      <Text variant="caption" color="muted">
                        Qty: {item.quantity}
                      </Text>
                    </div>
                    <Text variant="body-sm" weight="medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Text>
                  </div>
                ))}
              </div>
              <CartSummary summary={summary} />
            </div>

            <div className={styles.guarantee}>
              <div className={styles.guaranteeItem}>
                <span>🔒</span>
                <Text variant="caption" color="muted">
                  Secure 256-bit SSL encryption
                </Text>
              </div>
              <div className={styles.guaranteeItem}>
                <span>🚚</span>
                <Text variant="caption" color="muted">
                  Free shipping on orders $50+
                </Text>
              </div>
              <div className={styles.guaranteeItem}>
                <span>↩️</span>
                <Text variant="caption" color="muted">
                  30-day return policy
                </Text>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default function CheckoutPagePreview() {
  return (
    <MemoryRouter>
      <ProductProvider>
        <CartProvider>
          <CheckoutProvider>
            <CheckoutPage />
          </CheckoutProvider>
        </CartProvider>
      </ProductProvider>
    </MemoryRouter>
  );
}
