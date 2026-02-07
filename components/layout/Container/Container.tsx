import { ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = ({
  children,
  className = '',
  size = 'lg',
}: ContainerProps) => {
  const classNames = [styles.container, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
};
