import { useId, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Tabs.module.css';

export interface TabsItem {
  value: string;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
  badge?: string;
}

export interface TabsProps {
  items: readonly TabsItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = 'Tabs',
  size = 'md',
  fullWidth = false,
}: TabsProps) {
  const generatedId = useId();
  const fallbackValue = defaultValue ?? items.find((item) => !item.disabled)?.value ?? '';
  const [internalValue, setInternalValue] = useState(fallbackValue);
  const selectedValue = value ?? internalValue;
  const activeItem = items.find((item) => item.value === selectedValue) ?? items[0];

  const handleSelect = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <div className={styles.root}>
      <div
        aria-label={ariaLabel}
        className={clsx(styles.list, fullWidth && styles.fullWidth)}
        data-size={size}
        role="tablist"
      >
        {items.map((item) => {
          const tabId = `${generatedId}-${item.value}-tab`;
          const panelId = `${generatedId}-${item.value}-panel`;
          const isSelected = item.value === activeItem?.value;

          return (
            <button
              key={item.value}
              id={tabId}
              type="button"
              role="tab"
              disabled={item.disabled}
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              data-selected={isSelected}
              className={styles.trigger}
              onClick={() => handleSelect(item.value)}
            >
              <span>{item.label}</span>
              {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
            </button>
          );
        })}
      </div>

      {activeItem?.content ? (
        <div
          id={`${generatedId}-${activeItem.value}-panel`}
          aria-labelledby={`${generatedId}-${activeItem.value}-tab`}
          className={styles.panel}
          role="tabpanel"
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}
