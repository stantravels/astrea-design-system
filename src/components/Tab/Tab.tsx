import { Icon } from '../Icon/Icon';
import styles from './Tab.module.css';

export type TabState = 'Default' | 'Hover' | 'Disabled' | 'Focused' | 'Pressed';
export type TabLayout = 'Horizontal' | 'Vertical';

export interface TabProps {
  state?: TabState;
  layout?: TabLayout;
  selected?: boolean;
  text?: string;
  showIconBefore?: boolean;
  iconBefore?: string;
  showIconAfter?: boolean;
  iconAfter?: string;
  showCounter?: boolean;
  counter?: string;
}

export function Tab({
  state = 'Default',
  layout = 'Horizontal',
  selected = false,
  text = 'Tab name',
  showIconBefore = true,
  iconBefore,
  showIconAfter = true,
  iconAfter,
  showCounter = false,
  counter,
}: TabProps) {
  return (
    <div
      className={`${styles.root}${state === 'Focused' ? ' astrea-focus-ring' : ''}`}
      data-layout={layout}
      data-selected={selected}
      data-state={state}
    >
      {showIconBefore && iconBefore ? (
        <span className={styles.icon}>
          <Icon name={iconBefore} size={16} />
        </span>
      ) : null}
      <span className={styles.text}>{text}</span>
      {showCounter ? <span className={styles.counter}>{counter ?? '17'}</span> : null}
      {showIconAfter && iconAfter ? (
        <span className={styles.icon}>
          <Icon name={iconAfter} size={16} />
        </span>
      ) : null}
    </div>
  );
}
