import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export const Spinner = ({
  size = 'md',
  color = 'primary',
  className = '',
}: SpinnerProps) => {
  const classNames = [styles.spinner, styles[size], styles[color], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <div className={styles.ring} />
    </div>
  );
};

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay = ({ message = 'Loading...' }: LoadingOverlayProps) => (
  <div className={styles.overlay}>
    <Spinner size="lg" />
    <p className={styles.message}>{message}</p>
  </div>
);

export default function SpinnerPreview() {
  return <Spinner />;
}
