import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context';
import { CartItem } from '../CartItem';
import { CartSummary } from '../CartSummary';
import { Button, Text } from '@/components/common';
import styles from './CartDrawer.module.css';

export const CartDrawer = () => {
  const { items, isOpen, closeCart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <Text variant="h4" weight="semibold">Shopping Cart</Text>
          <button className={styles.closeButton} onClick={closeCart}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🛒</span>
            <Text variant="h4" weight="medium">Your cart is empty</Text>
            <Text color="muted" align="center">
              Looks like you have not added any sweet treats yet!
            </Text>
            <Button onClick={closeCart}>Start Shopping</Button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} variant="compact" />
              ))}
            </div>

            <div className={styles.footer}>
              <CartSummary showDetails={false} />
              <div className={styles.actions}>
                <Button variant="outline" fullWidth onClick={handleViewCart}>
                  View Cart
                </Button>
                <Button fullWidth onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
              <button className={styles.clearButton} onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
