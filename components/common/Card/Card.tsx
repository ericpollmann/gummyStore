import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card = ({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
  onClick,
}: CardProps) => {
  const classNames = [
    styles.card,
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : '',
    onClick ? styles.clickable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`${styles.header} ${className}`}>{children}</div>
);

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody = ({ children, className = '' }: CardBodyProps) => (
  <div className={`${styles.body} ${className}`}>{children}</div>
);

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className = '' }: CardFooterProps) => (
  <div className={`${styles.footer} ${className}`}>{children}</div>
);

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage = ({ src, alt, className = '' }: CardImageProps) => (
  <div className={`${styles.imageContainer} ${className}`}>
    <img src={src} alt={alt} className={styles.image} />
  </div>
);

export default function CardPreview() {
  return (
    <Card hoverable>
      <CardImage src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop" alt="Sample" />
      <CardHeader>Card Title</CardHeader>
      <CardBody>This is sample card body content.</CardBody>
      <CardFooter>Card footer</CardFooter>
    </Card>
  );
}
