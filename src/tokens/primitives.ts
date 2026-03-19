import primitiveColors from './figma/primitives-colors.json';
import primitiveSizing from './figma/primitives-sizing.json';
import typographyDesktop from './figma/typography-desktop.json';
import { getTokenReference } from './helpers';

export const primitiveTokens = {
  colors: {
    brand500: getTokenReference(primitiveColors, ['Brand', 'brand-500']),
    brand600: getTokenReference(primitiveColors, ['Brand', 'brand-600']),
    brand700: getTokenReference(primitiveColors, ['Brand', 'brand-700']),
    brand800: getTokenReference(primitiveColors, ['Brand', 'brand-800']),
    brand900: getTokenReference(primitiveColors, ['Brand', 'brand-900']),
    grey500: getTokenReference(primitiveColors, ['Greyscale', 'grey-500']),
    grey600: getTokenReference(primitiveColors, ['Greyscale', 'grey-600']),
    grey700: getTokenReference(primitiveColors, ['Greyscale', 'grey-700']),
    grey300: getTokenReference(primitiveColors, ['Greyscale', 'grey-300']),
    grey200: getTokenReference(primitiveColors, ['Greyscale', 'grey-200']),
    white: getTokenReference(primitiveColors, ['Greyscale', 'white']),
  },
  sizing: {
    scale0: getTokenReference(primitiveSizing, ['Scale', '0']),
    scale1: getTokenReference(primitiveSizing, ['Scale', '1']),
    scale3: getTokenReference(primitiveSizing, ['Scale', '3']),
    scale8: getTokenReference(primitiveSizing, ['Scale', '8']),
    scale12: getTokenReference(primitiveSizing, ['Scale', '12']),
    scale16: getTokenReference(primitiveSizing, ['Scale', '16']),
  },
  typography: {
    fontFamilyBody: getTokenReference(typographyDesktop, ['Family', 'font-family-body']),
    fontWeightRegular: getTokenReference(typographyDesktop, ['Weight', 'font-weight-regular']),
    fontWeightSemibold: getTokenReference(typographyDesktop, ['Weight', 'font-weight-semibold']),
    fontSize2xs: getTokenReference(typographyDesktop, ['Size', 'font-size-2xs']),
    fontSizeM: getTokenReference(typographyDesktop, ['Size', 'font-size-m']),
    lineHeightBody: getTokenReference(typographyDesktop, ['Line-height', 'line-height-body']),
  },
} as const;
