import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, ProductProvider, CheckoutProvider } from '@/context';
import { Header, Footer } from '@/components/layout';
import { CartDrawer } from '@/components/cart';
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
} from '@/pages';
import './index.css';

export const App = () => {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <CheckoutProvider>
            <div className="app">
              <Header />
              <main className="main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
              </main>
              <Footer />
              <CartDrawer />
            </div>
          </CheckoutProvider>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
};
