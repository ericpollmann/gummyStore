import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts, useCart } from '@/context';
import { Container } from '@/components/layout';
import { ProductCarousel } from '@/components/product';
import { Button, Text, Badge } from '@/components/common';
import { formatCurrency, formatCategoryName } from '@/utils';
import styles from './ProductDetailPage.module.css';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, getProductsByCategory } = useProducts();
  const { addItem, isInCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <Container>
        <div className={styles.notFound}>
          <Text variant="h2">Product not found</Text>
          <Link to="/products">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 8);

  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={styles.page}>
      <Container>
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`}>
            {formatCategoryName(product.category)}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className={styles.product}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img src={product.image} alt={product.name} />
              {product.isNew && (
                <Badge variant="secondary" className={styles.badge}>New</Badge>
              )}
              {discount > 0 && (
                <Badge variant="danger" className={styles.badge}>
                  {discount}% OFF
                </Badge>
              )}
            </div>
          </div>

          <div className={styles.details}>
            <Text variant="caption" color="muted" className={styles.category}>
              {formatCategoryName(product.category)}
            </Text>

            <Text variant="h2" weight="bold">{product.name}</Text>

            <div className={styles.rating}>
              <span className={styles.stars}>
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </span>
              <Text>{product.rating.toFixed(1)}</Text>
              <Text color="muted">({product.reviewCount} reviews)</Text>
            </div>

            <div className={styles.price}>
              <Text variant="h3" weight="bold" color="primary">
                {formatCurrency(product.price)}
              </Text>
              {product.originalPrice && (
                <Text color="muted" className={styles.originalPrice}>
                  {formatCurrency(product.originalPrice)}
                </Text>
              )}
            </div>

            <Text color="muted" className={styles.description}>
              {product.description}
            </Text>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <Text variant="caption" color="muted">Weight</Text>
                <Text weight="medium">{product.weight}</Text>
              </div>
              <div className={styles.metaItem}>
                <Text variant="caption" color="muted">Availability</Text>
                <Text weight="medium" color={product.inStock ? 'success' : 'danger'}>
                  {product.inStock ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
                </Text>
              </div>
            </div>

            <div className={styles.tags}>
              {product.tags.map((tag) => (
                <Badge key={tag} variant="default" rounded>
                  {tag}
                </Badge>
              ))}
            </div>

            {product.inStock && (
              <div className={styles.actions}>
                <div className={styles.quantity}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={styles.quantityButton}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stockQuantity, quantity + 1))
                    }
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
                <Button size="lg" onClick={handleAddToCart} fullWidth>
                  {inCart
                    ? `Add More (${cartQuantity} in cart)`
                    : 'Add to Cart'}
                </Button>
              </div>
            )}

            <div className={styles.ingredients}>
              <Text variant="body" weight="medium">Ingredients</Text>
              <Text color="muted" variant="body-sm">
                {product.ingredients.join(', ')}
              </Text>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className={styles.related}>
            <ProductCarousel
              products={relatedProducts}
              title="You May Also Like"
            />
          </section>
        )}
      </Container>
    </div>
  );
};
