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

export function tokenCssVar(name: string) {
  return `var(--${name})`;
}
