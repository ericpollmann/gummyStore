import { ReactNode, MouseEvent, ChangeEvent, FormEvent } from 'react';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export type ColorScheme =
  | 'pink'
  | 'purple'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonClickHandler {
  (event: MouseEvent<HTMLButtonElement>): void;
}

export interface InputChangeHandler {
  (event: ChangeEvent<HTMLInputElement>): void;
}

export interface SelectChangeHandler {
  (event: ChangeEvent<HTMLSelectElement>): void;
}

export interface FormSubmitHandler {
  (event: FormEvent<HTMLFormElement>): void;
}

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
