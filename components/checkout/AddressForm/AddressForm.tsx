import { useState } from 'react';
import { Address } from '@/types';
import { Input, Button, Text } from '@/components/common';
import { validateEmail, validatePhone, validateZipCode, validateRequired } from '@/utils';
import styles from './AddressForm.module.css';

interface AddressFormProps {
  title: string;
  initialValues?: Partial<Address>;
  onSubmit: (address: Address) => void;
  submitLabel?: string;
}

export const AddressForm = ({
  title,
  initialValues,
  onSubmit,
  submitLabel = 'Continue',
}: AddressFormProps) => {
  const [formData, setFormData] = useState<Partial<Address>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    ...initialValues,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Address, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.firstName || '')) {
      newErrors.firstName = 'First name is required';
    }
    if (!validateRequired(formData.lastName || '')) {
      newErrors.lastName = 'Last name is required';
    }
    if (!validateEmail(formData.email || '')) {
      newErrors.email = 'Valid email is required';
    }
    if (!validatePhone(formData.phone || '')) {
      newErrors.phone = 'Valid phone number is required';
    }
    if (!validateRequired(formData.street || '')) {
      newErrors.street = 'Street address is required';
    }
    if (!validateRequired(formData.city || '')) {
      newErrors.city = 'City is required';
    }
    if (!validateRequired(formData.state || '')) {
      newErrors.state = 'State is required';
    }
    if (!validateZipCode(formData.zipCode || '')) {
      newErrors.zipCode = 'Valid ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData as Address);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Text variant="h4" weight="semibold" className={styles.title}>
        {title}
      </Text>

      <div className={styles.row}>
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={errors.firstName}
          fullWidth
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          error={errors.lastName}
          fullWidth
        />
      </div>

      <div className={styles.row}>
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          fullWidth
        />
        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="(555) 555-5555"
          fullWidth
        />
      </div>

      <Input
        label="Street Address"
        value={formData.street}
        onChange={(e) => handleChange('street', e.target.value)}
        error={errors.street}
        fullWidth
      />

      <Input
        label="Apartment, suite, etc. (optional)"
        value={formData.apartment}
        onChange={(e) => handleChange('apartment', e.target.value)}
        fullWidth
      />

      <div className={styles.row}>
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          error={errors.city}
          fullWidth
        />
        <Input
          label="State"
          value={formData.state}
          onChange={(e) => handleChange('state', e.target.value)}
          error={errors.state}
          fullWidth
        />
        <Input
          label="ZIP Code"
          value={formData.zipCode}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          error={errors.zipCode}
          fullWidth
        />
      </div>

      <Button type="submit" fullWidth size="lg">
        {submitLabel}
      </Button>
    </form>
  );
};
