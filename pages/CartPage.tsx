import { Link, useNavigate, MemoryRouter } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ProductProvider } from '@/context/ProductContext';
import { CartProvider } from '@/context/CartContext';
import { Container } from '@/components/layout/Container/Container';
import { CartItem } from '@/components/cart/CartItem/CartItem';
import { CartSummary } from '@/components/cart/CartSummary/CartSummary';
import { Button } from '@/components/common/Button/Button';
import { Text } from '@/components/common/Text/Text';
import styles from './CartPage.module.css';

export const CartPage = () => {
  const { items, summary, clearCart, updateQuantity, removeItem } = useCart();
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
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <aside className={styles.sidebar}>
            <CartSummary summary={summary} />
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

export default function CartPagePreview() {
  return (
    <MemoryRouter>
      <ProductProvider>
        <CartProvider>
          <CartPage />
        </CartProvider>
      </ProductProvider>
    </MemoryRouter>
  );
}
