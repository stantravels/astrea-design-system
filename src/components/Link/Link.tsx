import type { AnchorHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Counter } from '../Counter/Counter';
import { Icon } from '../Icon/Icon';
import styles from './Link.module.css';

export type LinkType = 'Text link' | 'Subtle link' | 'Menu link';
export type LinkStyle = 'Regular' | 'Inverse';
export type LinkState =
  | 'Default'
  | 'Hover'
  | 'Pressed'
  | 'Focused'
  | 'Disabled'
  | 'Visited';

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'style' | 'type'> {
  type?: LinkType;
  style?: LinkStyle;
  state?: LinkState;
  text?: string;
  showIconBefore?: boolean;
  iconBefore?: string;
  showIconAfter?: boolean;
  iconAfter?: string;
  showText?: boolean;
  showCounter?: boolean;
  counter?: string;
  selected?: boolean;
}

function normalizeState(type: LinkType, state: LinkState) {
  if (type === 'Menu link' && state === 'Visited') {
    return 'Default';
  }

  return state;
}

export function Link({
  type = 'Text link',
  style = 'Regular',
  state = 'Default',
  text = 'Link',
  showIconBefore = false,
  iconBefore = 'information',
  showIconAfter = false,
  iconAfter = 'arrow_right',
  showText = true,
  showCounter = false,
  counter = '2',
  selected = false,
  className,
  href = '#',
  onClick,
  ...props
}: LinkProps) {
  const normalizedState = normalizeState(type, state);
  const resolvedState = type === 'Menu link' && selected && normalizedState !== 'Disabled'
    ? 'Selected'
    : normalizedState;
  const isDisabled = resolvedState === 'Disabled';
  const isSelected = resolvedState === 'Selected';
  const hasTrailing = showCounter || showIconAfter;

  return (
    <a
      {...props}
      aria-disabled={isDisabled || undefined}
      className={clsx(styles.root, resolvedState === 'Focused' && 'astrea-focus-ring', className)}
      data-state={resolvedState}
      data-style={style}
      data-type={type}
      href={isDisabled ? undefined : href}
      onClick={(event) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      }}
      tabIndex={isDisabled ? -1 : props.tabIndex}
    >
      <span className={styles.leading}>
        {showIconBefore ? (
          <span className={styles.icon}>
            <Icon name={iconBefore} size={24} />
          </span>
        ) : null}
        {showText ? <span className={styles.text}>{text}</span> : null}
      </span>
      {hasTrailing ? (
        <span className={styles.trailing}>
          {showCounter ? <Counter active={isSelected} value={counter} /> : null}
          {showIconAfter ? (
            <span className={styles.icon}>
              <Icon name={iconAfter} size={24} />
            </span>
          ) : null}
        </span>
      ) : null}
    </a>
  );
}
