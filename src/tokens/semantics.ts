import semanticColors from './figma/semantic-colors.json';
import semanticSizing from './figma/semantic-sizing.json';
import { getTokenReference } from './helpers';

export const semanticTokens = {
  colors: {
    borderGrey: getTokenReference(semanticColors, ['Border', 'astrea-border-grey']),
    borderGreyStrong: getTokenReference(semanticColors, ['Border', 'astrea-border-grey-strong']),
    borderGreyWeak: getTokenReference(semanticColors, ['Border', 'astrea-border-grey-weak']),
    borderBrand: getTokenReference(semanticColors, ['Border', 'astrea-border-brand']),
    surfaceBase: getTokenReference(semanticColors, ['Surface', 'astrea-surface-base']),
    surfaceGrey: getTokenReference(semanticColors, ['Surface', 'astrea-surface-grey']),
    surfaceGreyXWeak: getTokenReference(semanticColors, ['Surface', 'astrea-surface-grey-xweak']),
    surfaceGreyStrong: getTokenReference(semanticColors, ['Surface', 'astrea-surface-grey-strong']),
    surfaceBrandXWeak: getTokenReference(semanticColors, ['Surface', 'astrea-surface-brand-xweak']),
    surfaceBrandXXWeak: getTokenReference(semanticColors, ['Surface', 'astrea-surface-brand-xxweak']),
    textBrand: getTokenReference(semanticColors, ['Text', 'astrea-text-brand']),
    textBrandStrong: getTokenReference(semanticColors, ['Text', 'astrea-text-brand-strong']),
    textBrandXStrong: getTokenReference(semanticColors, ['Text', 'astrea-text-brand-xstrong']),
    textPrimary: getTokenReference(semanticColors, ['Text', 'astrea-text-primary']),
    textSecondary: getTokenReference(semanticColors, ['Text', 'astrea-text-secondary']),
    iconBrand: getTokenReference(semanticColors, ['Icon', 'astrea-icon-brand']),
    iconBrandStrong: getTokenReference(semanticColors, ['Icon', 'astrea-icon-brand-strong']),
    iconBrandXStrong: getTokenReference(semanticColors, ['Icon', 'astrea-icon-brand-xstrong']),
    iconGreyStrong: getTokenReference(semanticColors, ['Icon', 'astrea-icon-grey-strong']),
  },
  sizing: {
    borderNone: getTokenReference(semanticSizing, ['Border', 'border-none']),
    border1: getTokenReference(semanticSizing, ['Border', 'border-1']),
    border3: getTokenReference(semanticSizing, ['Border', 'border-3']),
    radiusNone: getTokenReference(semanticSizing, ['Radius', 'radius-none']),
    paddingM: getTokenReference(semanticSizing, ['Padding', 'padding-m']),
    paddingL: getTokenReference(semanticSizing, ['Padding', 'padding-l']),
    paddingXl: getTokenReference(semanticSizing, ['Padding', 'padding-xl']),
  },
} as const;
