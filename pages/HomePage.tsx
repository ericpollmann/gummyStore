import { Link } from 'react-router-dom';
import { useProducts } from '@/context';
import { Container } from '@/components/layout';
import { ProductCarousel } from '@/components/product';
import { Button, Text } from '@/components/common';
import { categories } from '@/data/products';
import { formatCategoryName } from '@/utils';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const { featuredProducts, products } = useProducts();

  const newArrivals = products.filter((p) => p.isNew);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <Text variant="h1" weight="bold" className={styles.heroTitle}>
                Sweet Dreams{' '}
                <span className={styles.gradient}>Come True</span>
              </Text>
              <Text variant="body" color="muted" className={styles.heroSubtitle}>
                Discover our handpicked collection of premium candies from around
                the world. From artisan chocolates to nostalgic favorites,
                satisfy your sweet tooth today!
              </Text>
              <div className={styles.heroActions}>
                <Link to="/products">
                  <Button size="lg">Shop Now</Button>
                </Link>
                <Link to="/products?category=chocolate">
                  <Button size="lg" variant="outline">
                    Explore Chocolates
                  </Button>
                </Link>
              </div>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <Text variant="h3" weight="bold" color="primary">200+</Text>
                  <Text variant="caption" color="muted">Products</Text>
                </div>
                <div className={styles.stat}>
                  <Text variant="h3" weight="bold" color="primary">50K+</Text>
                  <Text variant="caption" color="muted">Happy Customers</Text>
                </div>
                <div className={styles.stat}>
                  <Text variant="h3" weight="bold" color="primary">4.9</Text>
                  <Text variant="caption" color="muted">Rating</Text>
                </div>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.candyEmoji}>🍬</div>
              <div className={styles.floatingCandy} style={{ top: '10%', left: '10%' }}>🍫</div>
              <div className={styles.floatingCandy} style={{ top: '20%', right: '15%' }}>🍭</div>
              <div className={styles.floatingCandy} style={{ bottom: '30%', left: '5%' }}>🍩</div>
              <div className={styles.floatingCandy} style={{ bottom: '10%', right: '10%' }}>🧁</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className={styles.section}>
        <Container>
          <div className={styles.sectionHeader}>
            <Text variant="h2" weight="semibold">Shop by Category</Text>
            <Text color="muted">Find your favorite treats</Text>
          </div>
          <div className={styles.categories}>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>
                  {category.id === 'chocolate' && '🍫'}
                  {category.id === 'gummy' && '🐻'}
                  {category.id === 'hard-candy' && '🍬'}
                  {category.id === 'lollipops' && '🍭'}
                  {category.id === 'sour' && '🍋'}
                  {category.id === 'licorice' && '⚫'}
                  {category.id === 'caramel' && '🍯'}
                  {category.id === 'seasonal' && '🎄'}
                </div>
                <Text weight="medium">{formatCategoryName(category.id)}</Text>
                <Text variant="caption" color="muted">
                  {category.count} items
                </Text>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className={styles.section}>
        <Container>
          <ProductCarousel
            products={featuredProducts}
            title="Featured Treats"
            autoPlay
          />
        </Container>
      </section>

      {/* Banner Section */}
      <section className={styles.banner}>
        <Container>
          <div className={styles.bannerContent}>
            <div className={styles.bannerText}>
              <Text variant="h2" weight="bold" color="white">
                Free Shipping on Orders Over $50!
              </Text>
              <Text color="white" className={styles.bannerSubtext}>
                Plus get 10% off your first order with code: SWEETDREAMS
              </Text>
              <Link to="/products">
                <Button size="lg" variant="secondary">
                  Start Shopping
                </Button>
              </Link>
            </div>
            <div className={styles.bannerEmoji}>🎁</div>
          </div>
        </Container>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className={styles.section}>
          <Container>
            <ProductCarousel products={newArrivals} title="New Arrivals" />
          </Container>
        </section>
      )}

      {/* Why Choose Us */}
      <section className={styles.section}>
        <Container>
          <div className={styles.sectionHeader}>
            <Text variant="h2" weight="semibold">Why Choose Sweet Dreams?</Text>
            <Text color="muted">We are committed to bringing you the best</Text>
          </div>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🌟</div>
              <Text variant="h4" weight="medium">Premium Quality</Text>
              <Text color="muted" align="center">
                We source only the finest candies from trusted artisans worldwide
              </Text>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🚚</div>
              <Text variant="h4" weight="medium">Fast Delivery</Text>
              <Text color="muted" align="center">
                Free shipping on orders over $50, delivered right to your door
              </Text>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>💝</div>
              <Text variant="h4" weight="medium">Gift Ready</Text>
              <Text color="muted" align="center">
                Beautiful packaging options perfect for any occasion
              </Text>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔒</div>
              <Text variant="h4" weight="medium">Secure Shopping</Text>
              <Text color="muted" align="center">
                Your payment and personal info are always protected
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
