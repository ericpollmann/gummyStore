import { Link, useNavigate, MemoryRouter } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { ProductProvider } from '@/context/ProductContext';
import { CartProvider } from '@/context/CartContext';
import { SearchBar } from '@/components/search/SearchBar/SearchBar';
import styles from './Header.module.css';

export const Header = () => {
  const { summary, toggleCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🍬</span>
          <span className={styles.logoText}>Sweet Dreams</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/products" className={styles.navLink}>Shop</Link>
          <Link to="/products?category=chocolate" className={styles.navLink}>Chocolate</Link>
          <Link to="/products?category=gummy" className={styles.navLink}>Gummy</Link>
        </nav>

        <div className={styles.search}>
          <SearchBar
            onSearch={(query) => navigate(`/products?search=${query}`)}
            suggestions={products}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.cartButton} onClick={toggleCart}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {summary.itemCount > 0 && (
              <span className={styles.cartBadge}>{summary.itemCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default function HeaderPreview() {
  return (
    <MemoryRouter>
      <ProductProvider>
        <CartProvider>
          <Header />
        </CartProvider>
      </ProductProvider>
    </MemoryRouter>
  );
}
