import { Counter } from '../Counter/Counter';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Tab.module.css';

export type TabState = 'Default' | 'Hover' | 'Disabled' | 'Focused' | 'Pressed';
export type TabLayout = 'Horizontal' | 'Vertical';

export interface TabProps {
  state?: TabState;
  layout?: TabLayout;
  selected?: boolean;
  counterActive?: boolean;
  text?: string;
  showIconBefore?: boolean;
  iconBefore?: IconName;
  showIconAfter?: boolean;
  iconAfter?: IconName;
  showCounter?: boolean;
  counter?: string;
}

export function Tab({
  state = 'Default',
  layout = 'Horizontal',
  selected = false,
  counterActive,
  text = 'Tab name',
  showIconBefore = true,
  iconBefore = 'information',
  showIconAfter = true,
  iconAfter,
  showCounter = false,
  counter = '2',
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
      {showCounter ? <Counter active={counterActive ?? selected} value={counter} /> : null}
      {showIconAfter && iconAfter ? (
        <span className={styles.icon}>
          <Icon name={iconAfter} size={16} />
        </span>
      ) : null}
    </div>
  );
}
