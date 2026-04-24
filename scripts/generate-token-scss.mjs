import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const figmaDir = path.join(rootDir, 'src', 'tokens', 'figma');
const stylesTokensDir = path.join(rootDir, 'src', 'styles', 'tokens');

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(figmaDir, fileName), 'utf8'));
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

function colorObjectToCss(value) {
  if (!value || typeof value !== 'object' || !('components' in value) || !Array.isArray(value.components)) {
    return '';
  }

  const [red = 0, green = 0, blue = 0] = value.components;
  const alpha = typeof value.alpha === 'number' ? value.alpha : 1;
  const rgb = [red, green, blue].map((component) => Math.round(component * 255));

  if (alpha < 1) {
    return `rgba(${rgb.join(', ')}, ${alpha})`;
  }

  if ('hex' in value && typeof value.hex === 'string' && value.hex.length > 0) {
    return value.hex;
  }

  return `rgb(${rgb.join(', ')})`;
}

function toCssString(value) {
  if (typeof value === 'string') {
    return value.includes(' ') ? `'${value}'` : value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'object' && value !== null) {
    return colorObjectToCss(value);
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
        codeSyntax: value.$extensions?.['com.figma.codeSyntax']?.WEB,
      });
      continue;
    }

    if (value && typeof value === 'object') {
      out.push(...flattenTokens(value, [...pathParts, key]));
    }
  }

  return out;
}

function cssVarFromCodeSyntax(codeSyntax) {
  if (typeof codeSyntax !== 'string') {
    return null;
  }

  const match = codeSyntax.match(/var\((--[a-z0-9-]+)\)/i);
  return match?.[1] ?? null;
}

function primitiveVarName(pathParts, kind) {
  const parts = pathParts.map(normalizePart);

  if (kind === 'color') {
    return `--pri-color-${parts.join('-')}`;
  }

  if (kind === 'size' && parts[0] === 'size') {
    return `--pri-size-${parts.slice(1).join('-')}`;
  }

  return `--pri-${parts.join('-')}`;
}

function semanticVarName(pathParts) {
  return `--sem-${pathParts.map(normalizePart).join('-')}`;
}

function componentVarName(pathParts) {
  return `--com-${pathParts.map(normalizePart).join('-')}`;
}

function linkModeVarName(baseName, modeName) {
  if (!baseName.startsWith('--com-link-')) {
    return baseName;
  }

  return `--com-link-${normalizePart(modeName)}-${baseName.slice('--com-link-'.length)}`;
}

function aliasToVar(aliasData) {
  const targetName = aliasData?.targetVariableName;
  const targetSetName = aliasData?.targetVariableSetName ?? '';

  if (!targetName) {
    return null;
  }

  const pathParts = targetName.split('/').map((part) => part.trim()).filter(Boolean);
  if (pathParts.length === 0) {
    return null;
  }

  if (targetSetName.startsWith('Primitive /')) {
    const primitiveKind = targetSetName.includes('Color')
      ? 'color'
      : targetSetName.includes('Size')
        ? 'size'
        : 'typography';
    return primitiveVarName(pathParts, primitiveKind);
  }

  if (targetSetName.startsWith('Semantic /')) {
    return semanticVarName(pathParts);
  }

  if (targetSetName.startsWith('Component /')) {
    return componentVarName(pathParts);
  }

  return null;
}

function tokenVarName(token, fallbackName) {
  return cssVarFromCodeSyntax(token.codeSyntax) ?? fallbackName;
}

function createScssFile(title, mixinName, tokens) {
  const lines = tokens
    .map(({ name, value }) => `  ${name}: ${value};`)
    .sort();

  return `// Auto-generated from src/tokens/figma ${title} exports.\n// Run: npm run tokens:generate\n\n@mixin ${mixinName} {\n${lines.join('\n')}\n}\n`;
}

function main() {
  const primitiveFiles = [
    { fileName: 'primitive_color.json', kind: 'color' },
    { fileName: 'primitive_size.json', kind: 'size' },
    { fileName: 'primitive_typography.json', kind: 'typography' },
  ];
  const semanticFiles = ['semantic_color.json', 'semantic_size.json'];
  const darkSemanticFiles = ['semantic_color_dark.json'];
  const componentFiles = [
    'component_tab_color.json',
    'component_tab_size.json',
    'component_focus_color.json',
    'component_focus_size.json',
    'component_counter_color.json',
    'component_counter_size.json',
    'component_link_size.json',
  ];
  const linkModeFiles = [
    { fileName: 'component_link_color_regular.json', modeName: 'regular' },
    { fileName: 'component_link_color_inverse.json', modeName: 'inverse' },
  ];

  const primitiveTokens = primitiveFiles.flatMap(({ fileName, kind }) =>
    flattenTokens(readJson(fileName)).map((token) => ({
      name: tokenVarName(token, primitiveVarName(token.path, kind)),
      value: toCssString(token.value),
    })),
  );

  const semanticTokens = semanticFiles.flatMap((fileName) =>
    flattenTokens(readJson(fileName)).map((token) => ({
      name: tokenVarName(token, semanticVarName(token.path)),
      value: aliasToVar(token.aliasData) ? `var(${aliasToVar(token.aliasData)})` : toCssString(token.value),
    })),
  );
  const darkSemanticTokens = darkSemanticFiles.flatMap((fileName) =>
    flattenTokens(readJson(fileName)).map((token) => ({
      name: tokenVarName(token, semanticVarName(token.path)),
      value: aliasToVar(token.aliasData) ? `var(${aliasToVar(token.aliasData)})` : toCssString(token.value),
    })),
  );

  const componentTokens = componentFiles.flatMap((fileName) =>
    flattenTokens(readJson(fileName)).map((token) => ({
      name: tokenVarName(token, componentVarName(token.path)),
      value: aliasToVar(token.aliasData) ? `var(${aliasToVar(token.aliasData)})` : toCssString(token.value),
    })),
  );
  const linkModeTokens = linkModeFiles.flatMap(({ fileName, modeName }) =>
    flattenTokens(readJson(fileName)).map((token) => {
      const defaultName = componentVarName(token.path);
      const baseName = tokenVarName(token, defaultName);

      return {
        name: linkModeVarName(baseName, modeName),
        value: aliasToVar(token.aliasData) ? `var(${aliasToVar(token.aliasData)})` : toCssString(token.value),
      };
    }),
  );

  fs.writeFileSync(
    path.join(stylesTokensDir, '_primitive.generated.scss'),
    createScssFile('primitive', 'astrea-primitive-tokens', primitiveTokens),
  );
  fs.writeFileSync(
    path.join(stylesTokensDir, '_semantic.generated.scss'),
    createScssFile('semantic', 'astrea-semantic-tokens', semanticTokens),
  );
  fs.writeFileSync(
    path.join(stylesTokensDir, '_semantic.dark.generated.scss'),
    createScssFile('dark semantic', 'astrea-semantic-dark-tokens', darkSemanticTokens),
  );
  fs.writeFileSync(
    path.join(stylesTokensDir, '_component.generated.scss'),
    createScssFile('component', 'astrea-component-tokens', [...componentTokens, ...linkModeTokens]),
  );

  process.stdout.write('Generated SCSS token files:\n');
  process.stdout.write('- src/styles/tokens/_primitive.generated.scss\n');
  process.stdout.write('- src/styles/tokens/_semantic.generated.scss\n');
  process.stdout.write('- src/styles/tokens/_semantic.dark.generated.scss\n');
  process.stdout.write('- src/styles/tokens/_component.generated.scss\n');
}

main();
