import clsx from 'clsx';
import styles from './Counter.module.css';

export interface CounterProps {
  value?: string;
  active?: boolean;
  className?: string;
}

function normalizeCounterValue(value?: string) {
  if (value === undefined || value === null || value.trim() === '') {
    return '';
  }

  const numericValue = Number.parseInt(value, 10);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  if (numericValue >= 100) {
    return '99+';
  }

  return String(numericValue);
}

export function Counter({ value = '1', active = false, className }: CounterProps) {
  const displayValue = normalizeCounterValue(value);
  const isIndicator = displayValue === '';

  return (
    <span
      className={clsx(styles.root, className)}
      data-active={active}
      data-indicator={isIndicator}
    >
      {displayValue}
    </span>
  );
}
