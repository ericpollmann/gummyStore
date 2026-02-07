import { useProducts } from '@/context/ProductContext';
import { ProductProvider } from '@/context/ProductContext';
import { ProductCategory, SortOption } from '@/types/product';
import { Text } from '@/components/common/Text/Text';
import { Button } from '@/components/common/Button/Button';
import { categories } from '@/data/products';
import { formatCategoryName } from '@/utils/formatters';
import styles from './ProductFilters.module.css';

interface ProductFiltersProps {
  showCategoryFilter?: boolean;
  showPriceFilter?: boolean;
  showSortFilter?: boolean;
  showStockFilter?: boolean;
}

export const ProductFilters = ({
  showCategoryFilter = true,
  showPriceFilter = true,
  showSortFilter = true,
  showStockFilter = true,
}: ProductFiltersProps) => {
  const { filters, setFilters, resetFilters, products } = useProducts();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'newest', label: 'Newest' },
  ];

  const handleCategoryChange = (category: ProductCategory | null) => {
    setFilters({ category });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ sortBy: e.target.value as SortOption });
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setFilters({
      priceRange: {
        ...filters.priceRange,
        [type]: value,
      },
    });
  };

  const handleStockToggle = () => {
    setFilters({ inStockOnly: !filters.inStockOnly });
  };

  const hasActiveFilters =
    filters.category !== null ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 100 ||
    filters.inStockOnly ||
    filters.searchQuery !== '';

  return (
    <aside className={styles.filters}>
      <div className={styles.header}>
        <Text variant="h4" weight="semibold">Filters</Text>
        {hasActiveFilters && (
          <Button variant="ghost" size="xs" onClick={resetFilters}>
            Clear all
          </Button>
        )}
      </div>

      <div className={styles.resultCount}>
        <Text variant="body-sm" color="muted">
          Showing {products.length} products
        </Text>
      </div>

      {showSortFilter && (
        <div className={styles.section}>
          <Text variant="label" weight="medium" className={styles.sectionTitle}>
            Sort by
          </Text>
          <select
            className={styles.select}
            value={filters.sortBy}
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {showCategoryFilter && (
        <div className={styles.section}>
          <Text variant="label" weight="medium" className={styles.sectionTitle}>
            Category
          </Text>
          <div className={styles.categoryList}>
            <button
              className={`${styles.categoryItem} ${
                filters.category === null ? styles.active : ''
              }`}
              onClick={() => handleCategoryChange(null)}
            >
              <span>All Categories</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryItem} ${
                  filters.category === cat.id ? styles.active : ''
                }`}
                onClick={() => handleCategoryChange(cat.id as ProductCategory)}
              >
                <span>{formatCategoryName(cat.id)}</span>
                <span className={styles.count}>{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showPriceFilter && (
        <div className={styles.section}>
          <Text variant="label" weight="medium" className={styles.sectionTitle}>
            Price Range
          </Text>
          <div className={styles.priceInputs}>
            <div className={styles.priceInput}>
              <span className={styles.priceSymbol}>$</span>
              <input
                type="number"
                min="0"
                max={filters.priceRange.max}
                value={filters.priceRange.min}
                onChange={(e) =>
                  handlePriceChange('min', Number(e.target.value))
                }
                className={styles.input}
              />
            </div>
            <span className={styles.priceSeparator}>to</span>
            <div className={styles.priceInput}>
              <span className={styles.priceSymbol}>$</span>
              <input
                type="number"
                min={filters.priceRange.min}
                value={filters.priceRange.max}
                onChange={(e) =>
                  handlePriceChange('max', Number(e.target.value))
                }
                className={styles.input}
              />
            </div>
          </div>
        </div>
      )}

      {showStockFilter && (
        <div className={styles.section}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={handleStockToggle}
            />
            <span className={styles.checkmark} />
            <Text variant="body-sm">In stock only</Text>
          </label>
        </div>
      )}
    </aside>
  );
};

export default function ProductFiltersPreview() {
  return (
    <ProductProvider>
      <ProductFilters />
    </ProductProvider>
  );
}
