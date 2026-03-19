import primitiveColors from './figma/primitives-colors.json';
import primitiveSizing from './figma/primitives-sizing.json';
import typographyDesktop from './figma/typography-desktop.json';
import { collectTokenReferences, createTokenCollection } from './helpers';

export const primitiveTokens = {
  colors: createTokenCollection(primitiveColors),
  sizing: createTokenCollection(primitiveSizing),
  typography: createTokenCollection(typographyDesktop),
  all: {
    colors: collectTokenReferences(createTokenCollection(primitiveColors)),
    sizing: collectTokenReferences(createTokenCollection(primitiveSizing)),
    typography: collectTokenReferences(createTokenCollection(typographyDesktop)),
  },
} as const;
