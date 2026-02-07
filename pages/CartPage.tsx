import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context';
import { Container } from '@/components/layout';
import { CartItem, CartSummary } from '@/components/cart';
import { Button, Text } from '@/components/common';
import styles from './CartPage.module.css';

export const CartPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Container>
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🛒</span>
          <Text variant="h2" weight="semibold">Your cart is empty</Text>
          <Text color="muted" align="center">
            Looks like you have not added any sweet treats yet. Start shopping to fill up your cart!
          </Text>
          <Link to="/products">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.header}>
          <Text variant="h2" weight="bold">Shopping Cart</Text>
          <button className={styles.clearButton} onClick={clearCart}>
            Clear all
          </button>
        </div>

        <div className={styles.layout}>
          <div className={styles.items}>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <aside className={styles.sidebar}>
            <CartSummary />
            <Button
              size="lg"
              fullWidth
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
            <Link to="/products" className={styles.continueLink}>
              <Text color="muted" variant="body-sm">
                ← Continue Shopping
              </Text>
            </Link>
          </aside>
        </div>
      </Container>
    </div>
  );
};
