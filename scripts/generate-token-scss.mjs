import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const figmaDir = path.join(rootDir, 'src', 'tokens', 'figma');
const stylesTokensDir = path.join(rootDir, 'src', 'styles', 'tokens');

function readJson(fileName) {
  const filePath = path.join(figmaDir, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function toKebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function normalizePart(value) {
  const trimmed = value.trim();
  if (/^-\d+$/.test(trimmed)) {
    return `neg-${trimmed.slice(1)}`;
  }
  return toKebab(trimmed);
}

function toCssString(value) {
  if (typeof value === 'string') {
    return value.includes(' ') ? `'${value}'` : value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'object' && value !== null && 'hex' in value && typeof value.hex === 'string') {
    return value.hex;
  }

  return '';
}

function flattenTokens(tree, pathParts = []) {
  const out = [];

  for (const [key, value] of Object.entries(tree)) {
    if (key.startsWith('$')) {
      continue;
    }

    if (value && typeof value === 'object' && '$type' in value && '$value' in value) {
      out.push({
        path: [...pathParts, key],
        type: value.$type,
        value: value.$value,
        aliasData: value.$extensions?.['com.figma.aliasData'],
      });
      continue;
    }

    if (value && typeof value === 'object') {
      out.push(...flattenTokens(value, [...pathParts, key]));
    }
  }

  return out;
}

function primitiveVarName(pathParts, kind) {
  const parts = pathParts.map(normalizePart);
  if (kind === 'color') {
    return `--pri-color-${parts.join('-')}`;
  }

  if (kind === 'size') {
    return `--pri-size-${parts.slice(1).join('-')}`;
  }

  return `--pri-${parts.join('-')}`;
}

function toSemanticVarName(pathParts) {
  return `--sem-${pathParts.map(normalizePart).join('-')}`;
}

function toComponentVarName(pathParts) {
  return `--com-${pathParts.map(normalizePart).join('-')}`;
}

function createPrimitiveScss(primitiveTrees) {
  const allTokens = primitiveTrees.flatMap(({ tree, kind }) =>
    flattenTokens(tree).map((token) => ({ ...token, kind })),
  );
  const lines = allTokens
    .map((token) => {
      const name = primitiveVarName(token.path, token.kind);
      const value = toCssString(token.value);
      return `  ${name}: ${value};`;
    })
    .sort();

  return `// Auto-generated from src/tokens/figma primitive exports.\n// Run: npm run tokens:generate\n\n@mixin astrea-primitive-tokens {\n${lines.join('\n')}\n}\n`;
}

function aliasToPrimitiveVar(aliasTargetName) {
  if (!aliasTargetName) {
    return null;
  }

  const pathParts = aliasTargetName.split('/').map((part) => part.trim()).filter(Boolean);
  if (pathParts.length === 0) {
    return null;
  }

  const group = normalizePart(pathParts[0] ?? '');
  const kind = group === 'size' ? 'size' : group.startsWith('font-') || group === 'line-height' ? 'typography' : 'color';
  return primitiveVarName(pathParts, kind);
}

function aliasToSemanticVar(aliasTargetName) {
  if (!aliasTargetName) {
    return null;
  }

  const pathParts = aliasTargetName.split('/').map((part) => part.trim()).filter(Boolean);
  if (pathParts.length === 0) {
    return null;
  }

  return toSemanticVarName(pathParts);
}

function createSemanticScss(semanticTrees) {
  const allTokens = semanticTrees.flatMap(({ tree }) => flattenTokens(tree));
  const lines = allTokens
    .map((token) => {
      const name = toSemanticVarName(token.path);
      const aliasVar = aliasToPrimitiveVar(token.aliasData?.targetVariableName);
      const value = aliasVar ? `var(${aliasVar})` : toCssString(token.value);
      return `  ${name}: ${value};`;
    })
    .sort();

  return `// Auto-generated from src/tokens/figma semantic exports.\n// Run: npm run tokens:generate\n\n@mixin astrea-semantic-tokens {\n${lines.join('\n')}\n}\n`;
}

function createTabComponentScss(tabTrees) {
  const allTokens = tabTrees.flatMap(({ tree, namespace }) =>
    flattenTokens(tree).map((token) => ({ ...token, namespace })),
  );
  const lines = allTokens
    .map((token) => {
      const name = toComponentVarName([token.namespace, ...token.path]);
      const aliasVar = aliasToSemanticVar(token.aliasData?.targetVariableName);
      const value = aliasVar ? `var(${aliasVar})` : toCssString(token.value);
      return `  ${name}: ${value};`;
    })
    .sort();

  return `// Auto-generated from src/tokens/figma component exports.\n// Run: npm run tokens:generate\n\n@mixin astrea-component-tokens {\n${lines.join('\n')}\n}\n`;
}

function main() {
  const primitivesColors = readJson('primitive_color.json');
  const primitivesSizing = readJson('primitive_size.json');
  const primitivesTypography = readJson('primitive_typography.json');

  const semanticColors = readJson('semantic_color.json');
  const semanticSizing = readJson('semantic_size.json');
  const componentTabColors = readJson('component_tab_color.json');
  const componentTabSizing = readJson('component_tab_size.json');
  const componentFocus = readJson('component_focus.json');

  const primitiveScss = createPrimitiveScss([
    { tree: primitivesColors, kind: 'color' },
    { tree: primitivesSizing, kind: 'size' },
    { tree: primitivesTypography, kind: 'typography' },
  ]);
  const semanticScss = createSemanticScss([
    { tree: semanticColors },
    { tree: semanticSizing },
  ]);
  const componentScss = createTabComponentScss([
    { tree: componentTabColors, namespace: 'tab' },
    { tree: componentTabSizing, namespace: 'tab' },
    { tree: componentFocus, namespace: 'focus' },
  ]);

  fs.writeFileSync(path.join(stylesTokensDir, '_primitive.generated.scss'), primitiveScss);
  fs.writeFileSync(path.join(stylesTokensDir, '_semantic.generated.scss'), semanticScss);
  fs.writeFileSync(path.join(stylesTokensDir, '_component.generated.scss'), componentScss);

  process.stdout.write('Generated SCSS token files:\n');
  process.stdout.write('- src/styles/tokens/_primitive.generated.scss\n');
  process.stdout.write('- src/styles/tokens/_semantic.generated.scss\n');
  process.stdout.write('- src/styles/tokens/_component.generated.scss\n');
}

main();
