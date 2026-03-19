type TokenValue = string | number | { hex?: string };

type TokenLeaf = {
  $type: string;
  $value: TokenValue;
  $extensions?: {
    'com.figma.aliasData'?: {
      targetVariableName?: string;
      targetVariableSetName?: string;
    };
  };
};

type TokenTree = {
  [key: string]: TokenLeaf | TokenTree | unknown;
};

export type TokenCollection = {
  [key: string]: TokenReference | TokenCollection;
};

export interface TokenReference {
  name: string;
  type: string;
  value: string | number;
  alias?: {
    targetName?: string;
    targetSetName?: string;
  };
}

function isTokenLeaf(value: unknown): value is TokenLeaf {
  return typeof value === 'object' && value !== null && '$type' in value && '$value' in value;
}

function isTokenTree(value: unknown): value is TokenTree {
  return typeof value === 'object' && value !== null;
}

export function isTokenReference(value: unknown): value is TokenReference {
  return typeof value === 'object' && value !== null && 'name' in value && 'value' in value && 'type' in value;
}

function readTokenValue(value: TokenValue): string | number {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  return value.hex ?? '';
}

export function getTokenReference(tree: TokenTree, path: string[]): TokenReference {
  const token = path.reduce<unknown>((currentValue, segment) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return undefined;
    }

    return (currentValue as Record<string, unknown>)[segment];
  }, tree);

  if (!isTokenLeaf(token)) {
    throw new Error(`Token not found: ${path.join('.')}`);
  }

  return {
    name: path.join('/'),
    type: token.$type,
    value: readTokenValue(token.$value),
    alias: {
      targetName: token.$extensions?.['com.figma.aliasData']?.targetVariableName,
      targetSetName: token.$extensions?.['com.figma.aliasData']?.targetVariableSetName,
    },
  };
}

export function createTokenCollection(tree: TokenTree, path: string[] = []): TokenCollection {
  const collection: TokenCollection = {};

  for (const [key, value] of Object.entries(tree)) {
    if (key.startsWith('$')) {
      continue;
    }

    if (isTokenLeaf(value)) {
      collection[key] = {
        name: [...path, key].join('/'),
        type: value.$type,
        value: readTokenValue(value.$value),
        alias: {
          targetName: value.$extensions?.['com.figma.aliasData']?.targetVariableName,
          targetSetName: value.$extensions?.['com.figma.aliasData']?.targetVariableSetName,
        },
      };
      continue;
    }

    if (isTokenTree(value)) {
      collection[key] = createTokenCollection(value, [...path, key]);
    }
  }

  return collection;
}

export function collectTokenReferences(collection: TokenCollection): TokenReference[] {
  return Object.values(collection).flatMap((value) => {
    if (isTokenReference(value)) {
      return [value];
    }

    return collectTokenReferences(value);
  });
}

export function tokenCssVar(name: string) {
  return `var(--${name})`;
}
