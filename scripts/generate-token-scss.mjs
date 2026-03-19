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

function toPrimitiveVarName(pathParts) {
  return `--astrea-primitive-${pathParts.map(toKebab).join('-')}`;
}

function toSemanticVarName(pathParts) {
  return `--astrea-semantic-${pathParts.map(toKebab).join('-')}`;
}

function toTabVarName(pathParts) {
  const normalized = pathParts.length > 1 ? pathParts.slice(1) : pathParts;
  return `--${normalized.map(toKebab).join('-')}`;
}

function createPrimitiveScss(primitiveTrees) {
  const allTokens = primitiveTrees.flatMap(({ tree }) => flattenTokens(tree));
  const lines = allTokens
    .map((token) => {
      const name = toPrimitiveVarName(token.path);
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

  return toPrimitiveVarName(pathParts);
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
  const allTokens = tabTrees.flatMap(({ tree }) => flattenTokens(tree));
  const lines = allTokens
    .map((token) => {
      const name = toTabVarName(token.path);
      const aliasVar = aliasToSemanticVar(token.aliasData?.targetVariableName);
      const value = aliasVar ? `var(${aliasVar})` : toCssString(token.value);
      return `  ${name}: ${value};`;
    })
    .sort();

  return `// Auto-generated from src/tokens/figma tab component exports.\n// Run: npm run tokens:generate\n\n@mixin astrea-tab-component-tokens {\n${lines.join('\n')}\n}\n`;
}

function main() {
  const primitivesColors = readJson('primitives-colors.json');
  const primitivesSizing = readJson('primitives-sizing.json');
  const primitivesTypography = readJson('typography-desktop.json');

  const semanticColors = readJson('semantic-colors.json');
  const semanticSizing = readJson('semantic-sizing.json');
  const tabComponentColors = readJson('tab-component-colors.json');
  const tabComponentSizing = readJson('tab-component-sizing.json');

  const primitiveScss = createPrimitiveScss([
    { tree: primitivesColors },
    { tree: primitivesSizing },
    { tree: primitivesTypography },
  ]);
  const semanticScss = createSemanticScss([
    { tree: semanticColors },
    { tree: semanticSizing },
  ]);
  const tabScss = createTabComponentScss([
    { tree: tabComponentColors },
    { tree: tabComponentSizing },
  ]);

  fs.writeFileSync(path.join(stylesTokensDir, '_primitive.generated.scss'), primitiveScss);
  fs.writeFileSync(path.join(stylesTokensDir, '_semantic.generated.scss'), semanticScss);
  fs.writeFileSync(path.join(stylesTokensDir, '_tab.generated.scss'), tabScss);

  process.stdout.write('Generated SCSS token files:\n');
  process.stdout.write('- src/styles/tokens/_primitive.generated.scss\n');
  process.stdout.write('- src/styles/tokens/_semantic.generated.scss\n');
  process.stdout.write('- src/styles/tokens/_tab.generated.scss\n');
}

main();
