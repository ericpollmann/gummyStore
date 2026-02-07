import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>🍬</span>
              <span className={styles.logoText}>Sweet Dreams</span>
            </div>
            <p className={styles.tagline}>
              Your favorite candy destination since 2020. We bring sweetness to your doorstep!
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="18" cy="6" r="1.5"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Shop</h4>
            <ul className={styles.linksList}>
              <li><a href="/products">All Products</a></li>
              <li><a href="/products?category=chocolate">Chocolate</a></li>
              <li><a href="/products?category=gummy">Gummy</a></li>
              <li><a href="/products?category=sour">Sour</a></li>
              <li><a href="/products?category=lollipops">Lollipops</a></li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Help</h4>
            <ul className={styles.linksList}>
              <li><a href="/shipping">Shipping Info</a></li>
              <li><a href="/returns">Returns</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div className={styles.newsletter}>
            <h4 className={styles.linksTitle}>Stay Sweet!</h4>
            <p className={styles.newsletterText}>
              Subscribe for exclusive deals and new arrivals.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="your@email.com"
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Sweet Dreams Candy Store. All rights reserved.
          </p>
          <div className={styles.legal}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function FooterPreview() {
  return <Footer />;
}
