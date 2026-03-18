import { useId, useState } from 'react';
import { Tab, type TabProps, type TabState } from '../Tab/Tab';
import styles from './Tabs.module.css';

export interface TabNavigationItem {
  value: string;
  text: string;
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
  const selectedValue = selected ?? internalValue;

  const handleSelect = (nextValue: string) => {
    if (selected === undefined) {
      setInternalValue(nextValue);
    }

    onSelectedChange?.(nextValue);
  };

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
            aria-selected={isSelected}
            className={styles.button}
            role="tab"
            tabIndex={isSelected ? 0 : -1}
            type="button"
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
