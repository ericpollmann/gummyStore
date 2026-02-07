import { useState } from 'react';
import { PaymentInfo } from '@/types/order';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { Text } from '@/components/common/Text/Text';
import { validateCardNumber, validateExpiryDate, validateCVV, validateRequired } from '@/utils/validators';
import { formatCardNumber } from '@/utils/formatters';
import { noop } from '@/data/samples';
import styles from './PaymentForm.module.css';

interface PaymentFormProps {
  onSubmit: (paymentInfo: PaymentInfo) => void;
  onBack: () => void;
}

export const PaymentForm = ({ onSubmit, onBack }: PaymentFormProps) => {
  const [formData, setFormData] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof PaymentInfo, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value.replace(/\D/g, '').slice(0, 16));
    } else if (field === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      if (cleaned.length >= 2) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      } else {
        formattedValue = cleaned;
      }
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    if (!validateRequired(formData.cardHolder)) {
      newErrors.cardHolder = 'Cardholder name is required';
    }
    if (!validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date';
    }
    if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Text variant="h4" weight="semibold" className={styles.title}>
        Payment Information
      </Text>

      <div className={styles.cardPreview}>
        <div className={styles.cardFront}>
          <div className={styles.cardChip} />
          <div className={styles.cardNumber}>
            {formData.cardNumber || '•••• •••• •••• ••••'}
          </div>
          <div className={styles.cardDetails}>
            <div>
              <span className={styles.cardLabel}>Card Holder</span>
              <span className={styles.cardValue}>
                {formData.cardHolder || 'YOUR NAME'}
              </span>
            </div>
            <div>
              <span className={styles.cardLabel}>Expires</span>
              <span className={styles.cardValue}>
                {formData.expiryDate || 'MM/YY'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Input
        label="Card Number"
        value={formData.cardNumber}
        onChange={(e) => handleChange('cardNumber', e.target.value)}
        error={errors.cardNumber}
        placeholder="1234 5678 9012 3456"
        fullWidth
      />

      <Input
        label="Cardholder Name"
        value={formData.cardHolder}
        onChange={(e) => handleChange('cardHolder', e.target.value)}
        error={errors.cardHolder}
        placeholder="John Doe"
        fullWidth
      />

      <div className={styles.row}>
        <Input
          label="Expiry Date"
          value={formData.expiryDate}
          onChange={(e) => handleChange('expiryDate', e.target.value)}
          error={errors.expiryDate}
          placeholder="MM/YY"
          fullWidth
        />
        <Input
          label="CVV"
          type="password"
          value={formData.cvv}
          onChange={(e) => handleChange('cvv', e.target.value)}
          error={errors.cvv}
          placeholder="•••"
          fullWidth
        />
      </div>

      <div className={styles.secure}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <Text variant="caption" color="muted">
          Your payment information is secure and encrypted
        </Text>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg">
          Review Order
        </Button>
      </div>
    </form>
  );
};

export default function PaymentFormPreview() {
  return <PaymentForm onSubmit={noop} onBack={noop} />;
}
