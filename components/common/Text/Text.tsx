import { ReactNode, ElementType } from 'react';
import styles from './Text.module.css';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label';

type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

type TextColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'white';

interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  as?: ElementType;
  className?: string;
}

const defaultElements: Record<TextVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  label: 'label',
};

export const Text = ({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'default',
  align = 'left',
  as,
  className = '',
}: TextProps) => {
  const Component = as || defaultElements[variant];

  const classNames = [
    styles.text,
    styles[variant],
    styles[`weight-${weight}`],
    styles[`color-${color}`],
    styles[`align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classNames}>{children}</Component>;
};

export default function TextPreview() {
  return (
    <div>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="body">Body text with default styling.</Text>
      <Text variant="body-sm" color="muted">Small muted text</Text>
    </div>
  );
}
