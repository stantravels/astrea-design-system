import clsx from 'clsx';
import { normalizeCounterValue } from './Counter.utils';
import styles from './Counter.module.css';

export interface CounterProps {
  value?: number | string;
  active?: boolean;
  className?: string;
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
