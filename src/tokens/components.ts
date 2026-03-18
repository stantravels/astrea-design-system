import tabComponentColors from './figma/tab-component-colors.json';
import tabComponentSizing from './figma/tab-component-sizing.json';
import { getTokenReference, tokenCssVar } from './helpers';

export const componentTokens = {
  button: {
    primaryBackground: tokenCssVar('ast-button-primary-background'),
    primaryBackgroundHover: tokenCssVar('ast-button-primary-background-hover'),
    secondaryBackground: tokenCssVar('ast-button-secondary-background'),
    secondaryBorder: tokenCssVar('ast-button-secondary-border'),
  },
  input: {
    background: tokenCssVar('ast-input-background'),
    border: tokenCssVar('ast-input-border'),
    focusBorder: tokenCssVar('ast-input-border-focus'),
    dangerBorder: tokenCssVar('ast-input-border-danger'),
  },
  tab: {
    borderColor: getTokenReference(tabComponentColors, ['Border', 'astrea-tab-border-color']),
    borderColorHover: getTokenReference(tabComponentColors, ['Border', 'astrea-tab-border-color-hover']),
    borderColorPressed: getTokenReference(tabComponentColors, ['Border', 'astrea-tab-border-color-pressed']),
    borderColorActive: getTokenReference(tabComponentColors, ['Border', 'astrea-tab-border-color-active']),
    borderColorDisabled: getTokenReference(tabComponentColors, ['Border', 'astrea-tab-border-color-disabled']),
    fillColor: getTokenReference(tabComponentColors, ['Fill', 'astrea-tab-fill-color']),
    fillColorHover: getTokenReference(tabComponentColors, ['Fill', 'astrea-tab-fill-color-hover']),
    fillColorPressed: getTokenReference(tabComponentColors, ['Fill', 'astrea-tab-fill-color-pressed']),
    fillColorActive: getTokenReference(tabComponentColors, ['Fill', 'astrea-tab-fill-color-active']),
    fillColorDisabled: getTokenReference(tabComponentColors, ['Fill', 'astrea-tab-fill-color-disabled']),
    iconColor: getTokenReference(tabComponentColors, ['Icon', 'astrea-tab-icon-color']),
    iconColorHover: getTokenReference(tabComponentColors, ['Icon', 'astrea-tab-icon-color-hover']),
    iconColorPressed: getTokenReference(tabComponentColors, ['Icon', 'astrea-tab-icon-color-pressed']),
    iconColorActive: getTokenReference(tabComponentColors, ['Icon', 'astrea-tab-icon-color-active']),
    iconColorDisabled: getTokenReference(tabComponentColors, ['Icon', 'astrea-tab-icon-color-disabled']),
    textColor: getTokenReference(tabComponentColors, ['Text', 'astrea-tab-text-color']),
    textColorHover: getTokenReference(tabComponentColors, ['Text', 'astrea-tab-text-color-hover']),
    textColorPressed: getTokenReference(tabComponentColors, ['Text', 'astrea-tab-text-color-pressed']),
    textColorActive: getTokenReference(tabComponentColors, ['Text', 'astrea-tab-text-color-active']),
    textColorDisabled: getTokenReference(tabComponentColors, ['Text', 'astrea-tab-text-color-disabled']),
    borderWidthBase: getTokenReference(tabComponentSizing, ['astrea-tab-border-width-base']),
    borderWidthInactive: getTokenReference(tabComponentSizing, ['astrea-tab-border-width-inactive']),
    borderWidthActive: getTokenReference(tabComponentSizing, ['astrea-tab-border-width-active']),
    cornerRadius: getTokenReference(tabComponentSizing, ['astrea-tab-corner-radius']),
    elementSpacing: getTokenReference(tabComponentSizing, ['astrea-tab-element-spacing']),
    horizontalPadding: getTokenReference(tabComponentSizing, ['astrea-tab-h-padding']),
    verticalPadding: getTokenReference(tabComponentSizing, ['astrea-tab-v-padding']),
  },
} as const;
