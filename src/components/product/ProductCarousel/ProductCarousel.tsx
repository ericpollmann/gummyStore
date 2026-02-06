import { useState, useRef, useEffect } from 'react';
import { Product } from '@/types';
import { ProductCard } from '../ProductCard';
import { Text } from '@/components/common';
import styles from './ProductCarousel.module.css';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const ProductCarousel = ({
  products,
  title,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  useEffect(() => {
    if (!autoPlay || isHovered || products.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHovered, maxIndex, products.length]);

  if (products.length === 0) return null;

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title && (
        <div className={styles.header}>
          <Text variant="h3" weight="semibold">{title}</Text>
          <div className={styles.controls}>
            <button
              className={styles.navButton}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className={styles.navButton}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className={styles.wrapper}>
        <div
          ref={containerRef}
          className={styles.track}
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className={styles.slide}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {products.length > itemsPerView && (
        <div className={styles.dots}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.active : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
