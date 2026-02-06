import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  CheckoutContextValue,
  CheckoutState,
  CheckoutStep,
  Address,
  PaymentInfo,
  Order,
} from '@/types';
import { useCart } from './CartContext';

const initialState: CheckoutState = {
  step: 'shipping',
  shippingAddress: null,
  billingAddress: null,
  sameAsShipping: true,
  paymentInfo: null,
  isProcessing: false,
  error: null,
};

const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined
);

interface CheckoutProviderProps {
  children: ReactNode;
}

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [state, setState] = useState<CheckoutState>(initialState);
  const { items, summary, clearCart } = useCart();

  const setStep = useCallback((step: CheckoutStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const setShippingAddress = useCallback((address: Address) => {
    setState((prev) => ({ ...prev, shippingAddress: address }));
  }, []);

  const setBillingAddress = useCallback((address: Address) => {
    setState((prev) => ({ ...prev, billingAddress: address }));
  }, []);

  const setSameAsShipping = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, sameAsShipping: value }));
  }, []);

  const setPaymentInfo = useCallback((info: PaymentInfo) => {
    setState((prev) => ({ ...prev, paymentInfo: info }));
  }, []);

  const processOrder = useCallback(async (): Promise<Order | null> => {
    setState((prev) => ({ ...prev, isProcessing: true, error: null }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const order: Order = {
        id: `ORD-${Date.now()}`,
        items,
        summary,
        shippingAddress: state.shippingAddress!,
        billingAddress: state.sameAsShipping
          ? state.shippingAddress!
          : state.billingAddress!,
        paymentInfo: {
          cardNumber: state.paymentInfo!.cardNumber,
          cardHolder: state.paymentInfo!.cardHolder,
          expiryDate: state.paymentInfo!.expiryDate,
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      clearCart();
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        step: 'confirmation',
      }));

      return order;
    } catch {
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: 'Failed to process order. Please try again.',
      }));
      return null;
    }
  }, [items, summary, state, clearCart]);

  const resetCheckout = useCallback(() => {
    setState(initialState);
  }, []);

  const value: CheckoutContextValue = {
    ...state,
    setStep,
    setShippingAddress,
    setBillingAddress,
    setSameAsShipping,
    setPaymentInfo,
    processOrder,
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextValue => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
