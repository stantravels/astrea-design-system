export const componentTokens = {
  button: {
    primaryBackground: 'var(--ast-button-primary-background)',
    primaryBackgroundHover: 'var(--ast-button-primary-background-hover)',
    secondaryBackground: 'var(--ast-button-secondary-background)',
    secondaryBorder: 'var(--ast-button-secondary-border)',
  },
  input: {
    background: 'var(--ast-input-background)',
    border: 'var(--ast-input-border)',
    focusBorder: 'var(--ast-input-border-focus)',
    dangerBorder: 'var(--ast-input-border-danger)',
  },
  tabs: {
    trackBackground: 'var(--ast-tabs-track-background)',
    indicatorBackground: 'var(--ast-tabs-indicator-background)',
  },
} as const;
