import { products } from './products';
import type { Product } from '@/types/product';
import type { CartItem, CartSummary } from '@/types/cart';
import type { Address, PaymentInfo } from '@/types/order';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noop = (..._args: any[]) => {};

export const SAMPLE_PRODUCT: Product = products[0];

export const SAMPLE_PRODUCTS: Product[] = products.slice(0, 6);

export const SAMPLE_CART_ITEM: CartItem = {
  product: products[0],
  quantity: 2,
};

export const SAMPLE_CART_ITEMS: CartItem[] = [
  { product: products[0], quantity: 2 },
  { product: products[1], quantity: 1 },
  { product: products[2], quantity: 3 },
];

export const SAMPLE_CART_SUMMARY: CartSummary = {
  subtotal: 62.96,
  tax: 5.04,
  shipping: 0,
  total: 68.0,
  itemCount: 6,
};

export const SAMPLE_ADDRESS: Address = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  phone: '5555555555',
  street: '123 Candy Lane',
  city: 'Sweetville',
  state: 'CA',
  zipCode: '90210',
  country: 'United States',
};

export const SAMPLE_PAYMENT: PaymentInfo = {
  cardNumber: '4111 1111 1111 1111',
  cardHolder: 'Jane Doe',
  expiryDate: '12/28',
  cvv: '123',
};
