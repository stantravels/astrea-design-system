import primitiveColors from './figma/primitive_color.json';
import primitiveSizing from './figma/primitive_size.json';
import typographyDesktop from './figma/primitive_typography.json';
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
