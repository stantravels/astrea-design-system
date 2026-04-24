import { useId, useRef, useState } from 'react';
import { Tab, type TabProps, type TabState } from '../Tab/Tab';
import styles from './Tabs.module.css';

export interface TabNavigationItem {
  value: string;
  text: string;
  panelId?: string;
  iconBefore?: TabProps['iconBefore'];
  iconAfter?: TabProps['iconAfter'];
  counter?: string;
}

export interface TabNavigationProps {
  items: readonly TabNavigationItem[];
  selected?: string;
  defaultSelected?: string;
  onSelectedChange?: (value: string) => void;
  ariaLabel?: string;
}

interface TabNavigationBaseProps extends TabNavigationProps {
  layout: 'Horizontal' | 'Vertical';
}

function TabNavigationBase({
  items,
  selected,
  defaultSelected,
  onSelectedChange,
  ariaLabel = 'Tab navigation',
  layout,
}: TabNavigationBaseProps) {
  const generatedId = useId();
  const fallbackValue = defaultSelected ?? items[0]?.value ?? '';
  const [internalValue, setInternalValue] = useState(fallbackValue);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [pressedValue, setPressedValue] = useState<string | null>(null);
  const [focusedValue, setFocusedValue] = useState<string | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const itemValues = items.map((item) => item.value);
  const firstValue = itemValues[0] ?? '';
  const selectedCandidate = selected ?? internalValue;
  const selectedValue = itemValues.includes(selectedCandidate) ? selectedCandidate : firstValue;
  const focusableCandidate = focusedValue ?? selectedValue;
  const focusableValue = itemValues.includes(focusableCandidate) ? focusableCandidate : firstValue;

  const handleSelect = (nextValue: string) => {
    if (selected === undefined) {
      setInternalValue(nextValue);
    }

    onSelectedChange?.(nextValue);
  };

  const focusItem = (nextValue: string) => {
    setFocusedValue(nextValue);
    buttonRefs.current[nextValue]?.focus();
  };

  const moveFocus = (currentValue: string, direction: 'next' | 'previous' | 'first' | 'last') => {
    const currentIndex = items.findIndex((item) => item.value === currentValue);

    if (currentIndex === -1 || items.length === 0) {
      return;
    }

    if (direction === 'first') {
      focusItem(items[0].value);
      return;
    }

    if (direction === 'last') {
      focusItem(items[items.length - 1].value);
      return;
    }

    const delta = direction === 'next' ? 1 : -1;
    const nextIndex = (currentIndex + delta + items.length) % items.length;
    focusItem(items[nextIndex].value);
  };

  const isHorizontal = layout === 'Horizontal';

  const getVisualState = (value: string): TabState => {
    if (pressedValue === value) {
      return 'Pressed';
    }

    if (hoveredValue === value) {
      return 'Hover';
    }

    if (focusedValue === value) {
      return 'Focused';
    }

    return 'Default';
  };

  return (
    <div
      aria-label={ariaLabel}
      aria-orientation={isHorizontal ? 'horizontal' : 'vertical'}
      className={styles.root}
      data-layout={layout}
      role="tablist"
    >
      {items.map((item) => {
        const isSelected = item.value === selectedValue;

        return (
          <button
            key={item.value}
            id={`${generatedId}-${item.value}`}
            aria-controls={item.panelId}
            aria-selected={isSelected}
            className={styles.button}
            role="tab"
            tabIndex={item.value === focusableValue ? 0 : -1}
            type="button"
            ref={(element) => {
              buttonRefs.current[item.value] = element;
            }}
            onBlur={() => {
              setFocusedValue((currentValue) =>
                currentValue === item.value ? null : currentValue,
              );
              setPressedValue((currentValue) =>
                currentValue === item.value ? null : currentValue,
              );
            }}
            onClick={() => handleSelect(item.value)}
            onFocus={() => setFocusedValue(item.value)}
            onKeyDown={(event) => {
              if (event.key === 'Home') {
                event.preventDefault();
                moveFocus(item.value, 'first');
                return;
              }

              if (event.key === 'End') {
                event.preventDefault();
                moveFocus(item.value, 'last');
                return;
              }

              if ((isHorizontal && event.key === 'ArrowRight') || (!isHorizontal && event.key === 'ArrowDown')) {
                event.preventDefault();
                moveFocus(item.value, 'next');
                return;
              }

              if ((isHorizontal && event.key === 'ArrowLeft') || (!isHorizontal && event.key === 'ArrowUp')) {
                event.preventDefault();
                moveFocus(item.value, 'previous');
                return;
              }

              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleSelect(item.value);
              }
            }}
            onMouseEnter={() => setHoveredValue(item.value)}
            onMouseLeave={() => {
              setHoveredValue((currentValue) =>
                currentValue === item.value ? null : currentValue,
              );
              setPressedValue((currentValue) =>
                currentValue === item.value ? null : currentValue,
              );
            }}
            onMouseUp={() =>
              setPressedValue((currentValue) =>
                currentValue === item.value ? null : currentValue,
              )
            }
            onPointerDown={() => setPressedValue(item.value)}
          >
            <Tab
              counter={item.counter}
              iconAfter={item.iconAfter}
              iconBefore={item.iconBefore}
              layout={layout}
              selected={isSelected}
              showCounter={Boolean(item.counter)}
              showIconAfter={Boolean(item.iconAfter)}
              showIconBefore={Boolean(item.iconBefore)}
              state={getVisualState(item.value)}
              text={item.text}
            />
          </button>
        );
      })}
    </div>
  );
}

export function HorizontalTabNavigation(props: TabNavigationProps) {
  return <TabNavigationBase {...props} layout="Horizontal" />;
}

export function VerticalTabNavigation(props: TabNavigationProps) {
  return <TabNavigationBase {...props} layout="Vertical" />;
}
