import semanticColors from './figma/semantic-colors.json';
import semanticSizing from './figma/semantic-sizing.json';
import { collectTokenReferences, createTokenCollection } from './helpers';

export const semanticTokens = {
  colors: createTokenCollection(semanticColors),
  sizing: createTokenCollection(semanticSizing),
  all: {
    colors: collectTokenReferences(createTokenCollection(semanticColors)),
    sizing: collectTokenReferences(createTokenCollection(semanticSizing)),
  },
} as const;
