export const semanticTokens = {
  color: {
    surface: {
      canvas: 'var(--ast-color-surface-canvas)',
      subtle: 'var(--ast-color-surface-subtle)',
      elevated: 'var(--ast-color-surface-elevated)',
    },
    text: {
      primary: 'var(--ast-color-text-primary)',
      secondary: 'var(--ast-color-text-secondary)',
      inverse: 'var(--ast-color-text-inverse)',
      brand: 'var(--ast-color-text-brand)',
      danger: 'var(--ast-color-text-danger)',
      success: 'var(--ast-color-text-success)',
    },
    fill: {
      brandDefault: 'var(--ast-color-fill-brand-default)',
      brandHover: 'var(--ast-color-fill-brand-hover)',
      brandSubtle: 'var(--ast-color-fill-brand-subtle)',
      neutralSubtle: 'var(--ast-color-fill-neutral-subtle)',
      neutralHover: 'var(--ast-color-fill-neutral-hover)',
      dangerSubtle: 'var(--ast-color-fill-danger-subtle)',
    },
  },
} as const;
