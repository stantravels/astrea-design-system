import tabComponentColors from './figma/component_tab_color.json';
import tabComponentSizing from './figma/component_tab_size.json';
import focusComponent from './figma/component_focus.json';
import { getTokenReference } from './helpers';

export const componentTokens = {
  tab: {
    borderColor: getTokenReference(tabComponentColors, ['Border', 'color']),
    borderColorHover: getTokenReference(tabComponentColors, ['Border', 'color-hover']),
    borderColorPressed: getTokenReference(tabComponentColors, ['Border', 'color-pressed']),
    borderColorActive: getTokenReference(tabComponentColors, ['Border', 'color-active']),
    borderColorDisabled: getTokenReference(tabComponentColors, ['Border', 'color-disabled']),
    fillColor: getTokenReference(tabComponentColors, ['Fill', 'color']),
    fillColorHover: getTokenReference(tabComponentColors, ['Fill', 'color-hover']),
    fillColorPressed: getTokenReference(tabComponentColors, ['Fill', 'color-pressed']),
    fillColorActive: getTokenReference(tabComponentColors, ['Fill', 'color-active']),
    fillColorDisabled: getTokenReference(tabComponentColors, ['Fill', 'color-disabled']),
    iconColor: getTokenReference(tabComponentColors, ['Icon', 'color']),
    iconColorHover: getTokenReference(tabComponentColors, ['Icon', 'color-hover']),
    iconColorPressed: getTokenReference(tabComponentColors, ['Icon', 'color-pressed']),
    iconColorActive: getTokenReference(tabComponentColors, ['Icon', 'color-active']),
    iconColorDisabled: getTokenReference(tabComponentColors, ['Icon', 'color-disabled']),
    textColor: getTokenReference(tabComponentColors, ['Text', 'color']),
    textColorHover: getTokenReference(tabComponentColors, ['Text', 'color-hover']),
    textColorPressed: getTokenReference(tabComponentColors, ['Text', 'color-pressed']),
    textColorActive: getTokenReference(tabComponentColors, ['Text', 'color-active']),
    textColorDisabled: getTokenReference(tabComponentColors, ['Text', 'color-disabled']),
    borderWidthBase: getTokenReference(tabComponentSizing, ['border-width-base']),
    borderWidthInactive: getTokenReference(tabComponentSizing, ['border-width-inactive']),
    borderWidthActive: getTokenReference(tabComponentSizing, ['border-width-active']),
    cornerRadius: getTokenReference(tabComponentSizing, ['corner-radius']),
    gap: getTokenReference(tabComponentSizing, ['gap']),
    paddingX: getTokenReference(tabComponentSizing, ['padding-x']),
    paddingY: getTokenReference(tabComponentSizing, ['padding-y']),
  },
  focus: {
    borderColor: getTokenReference(focusComponent, ['border-color']),
    borderWidth: getTokenReference(focusComponent, ['border-width']),
    cornerRadius: getTokenReference(focusComponent, ['corner-radius']),
    paddingX: getTokenReference(focusComponent, ['padding-x']),
    paddingY: getTokenReference(focusComponent, ['padding-y']),
  },
} as const;
