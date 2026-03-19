import semanticColors from './figma/semantic_color.json';
import semanticSizing from './figma/semantic_size.json';
import { collectTokenReferences, createTokenCollection } from './helpers';

export const semanticTokens = {
  colors: createTokenCollection(semanticColors),
  sizing: createTokenCollection(semanticSizing),
  all: {
    colors: collectTokenReferences(createTokenCollection(semanticColors)),
    sizing: collectTokenReferences(createTokenCollection(semanticSizing)),
  },
} as const;
