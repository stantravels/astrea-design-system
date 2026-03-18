import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Input.module.css';

export type InputStatus = 'default' | 'error' | 'success';
export type InputSize = 'md' | 'lg';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  description?: string;
  message?: string;
  status?: InputStatus;
  inputSize?: InputSize;
  leadingIcon?: IconName;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    description,
    message,
    status = 'default',
    inputSize = 'md',
    leadingIcon,
    className,
    disabled,
    ...props
  },
  ref,
) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const messageId = message ? `${inputId}-message` : undefined;
    const ariaDescribedBy = [descriptionId, messageId].filter(Boolean).join(' ') || undefined;

    return (
      <label className={styles.field} htmlFor={inputId}>
        <span className={styles.header}>
          <span className={styles.label}>{label}</span>
          {description ? <span className={styles.description}>{description}</span> : null}
        </span>
        <span
          data-status={status}
          data-size={inputSize}
          className={clsx(styles.control, disabled && styles.disabled, className)}
        >
          {leadingIcon ? (
            <span className={styles.icon}>
              <Icon name={leadingIcon} />
            </span>
          ) : null}
          <input
            {...props}
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={ariaDescribedBy}
            className={styles.input}
          />
        </span>
        {message ? (
          <span id={messageId} data-status={status} className={styles.message}>
            {message}
          </span>
        ) : null}
      </label>
    );
  },
);
