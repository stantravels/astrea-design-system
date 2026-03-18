import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    className,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      data-variant={variant}
      data-size={size}
      className={clsx(styles.root, fullWidth && styles.fullWidth, className)}
    >
      {leadingIcon ? (
        <span className={styles.icon}>
          <Icon name={leadingIcon} />
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
      {trailingIcon ? (
        <span className={styles.icon}>
          <Icon name={trailingIcon} />
        </span>
      ) : null}
    </button>
  );
});
