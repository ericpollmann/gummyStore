import { MemoryRouter } from 'react-router-dom';
import { useCheckout } from '@/context/CheckoutContext';
import { CheckoutProvider } from '@/context/CheckoutContext';
import { CartProvider } from '@/context/CartContext';
import { ProductProvider } from '@/context/ProductContext';
import { AddressForm } from '../AddressForm/AddressForm';
import { PaymentForm } from '../PaymentForm/PaymentForm';
import { OrderSummary } from '../OrderSummary/OrderSummary';
import { Text } from '@/components/common/Text/Text';
import { Badge } from '@/components/common/Badge/Badge';
import { noop } from '@/data/samples';
import styles from './CheckoutForm.module.css';

interface CheckoutFormProps {
  onOrderComplete: (orderId: string) => void;
}

export const CheckoutForm = ({ onOrderComplete }: CheckoutFormProps) => {
  const {
    step,
    setStep,
    shippingAddress,
    setShippingAddress,
    setPaymentInfo,
    processOrder,
    isProcessing,
  } = useCheckout();

  const steps = [
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ];

  const handlePlaceOrder = async () => {
    const order = await processOrder();
    if (order) {
      onOrderComplete(order.id);
    }
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.steps}>
        {steps.map((s, index) => (
          <div
            key={s.key}
            className={`${styles.step} ${
              step === s.key ? styles.active : ''
            } ${
              steps.findIndex((st) => st.key === step) > index
                ? styles.completed
                : ''
            }`}
          >
            <div className={styles.stepNumber}>
              {steps.findIndex((st) => st.key === step) > index ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <Text
              variant="body-sm"
              weight={step === s.key ? 'semibold' : 'normal'}
              color={step === s.key ? 'primary' : 'muted'}
            >
              {s.label}
            </Text>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        {step === 'shipping' && (
          <AddressForm
            title="Shipping Address"
            initialValues={shippingAddress || undefined}
            onSubmit={(address) => {
              setShippingAddress(address);
              setStep('payment');
            }}
            submitLabel="Continue to Payment"
          />
        )}

        {step === 'payment' && (
          <PaymentForm
            onSubmit={(paymentInfo) => {
              setPaymentInfo(paymentInfo);
              setStep('review');
            }}
            onBack={() => setStep('shipping')}
          />
        )}

        {step === 'review' && (
          <OrderSummary
            onBack={() => setStep('payment')}
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isProcessing}
          />
        )}
      </div>

      <div className={styles.guarantee}>
        <Badge variant="success" size="lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Secure Checkout
        </Badge>
        <Text variant="caption" color="muted">
          Your information is protected with 256-bit SSL encryption
        </Text>
      </div>
    </div>
  );
};

export default function CheckoutFormPreview() {
  return (
    <MemoryRouter>
      <ProductProvider>
        <CartProvider>
          <CheckoutProvider>
            <CheckoutForm onOrderComplete={noop} />
          </CheckoutProvider>
        </CartProvider>
      </ProductProvider>
    </MemoryRouter>
  );
}
