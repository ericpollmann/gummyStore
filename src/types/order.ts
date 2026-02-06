import { CartItem, CartSummary } from './cart';

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  summary: CartSummary;
  shippingAddress: Address;
  billingAddress: Address;
  paymentInfo: Omit<PaymentInfo, 'cvv'>;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface CheckoutState {
  step: CheckoutStep;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  sameAsShipping: boolean;
  paymentInfo: PaymentInfo | null;
  isProcessing: boolean;
  error: string | null;
}

export type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

export interface CheckoutContextActions {
  setStep: (step: CheckoutStep) => void;
  setShippingAddress: (address: Address) => void;
  setBillingAddress: (address: Address) => void;
  setSameAsShipping: (value: boolean) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  processOrder: () => Promise<Order | null>;
  resetCheckout: () => void;
}

export type CheckoutContextValue = CheckoutState & CheckoutContextActions;
