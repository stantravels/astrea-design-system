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

function flattenTokens(tree, pathParts = []) {
  const out = [];
  for (const [key, value] of Object.entries(tree)) {
    if (key.startsWith('$')) {
      continue;
    }

    if (value && typeof value === 'object' && '$type' in value && '$value' in value) {
      out.push({
        path: [...pathParts, key],
      });
      continue;
    }

    if (value && typeof value === 'object') {
      out.push(...flattenTokens(value, [...pathParts, key]));
    }
  }
  return out;
}

function toPrimitiveVarName(pathParts, kind) {
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

function parseDeclaredVars(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/--[a-z0-9-]+(?=\s*:)/g) ?? [];
  return new Set(matches);
}

function reportSection(title, expected, declared) {
  const missing = [...expected].filter((name) => !declared.has(name)).sort();
  const extra = [...declared].filter((name) => !expected.has(name)).sort();

  process.stdout.write(`\n${title}\n`);
  process.stdout.write(`- expected: ${expected.size}\n`);
  process.stdout.write(`- declared: ${declared.size}\n`);
  process.stdout.write(`- missing: ${missing.length}\n`);
  process.stdout.write(`- extra: ${extra.length}\n`);

  if (missing.length > 0) {
    process.stdout.write('missing vars:\n');
    missing.slice(0, 50).forEach((name) => process.stdout.write(`  - ${name}\n`));
    if (missing.length > 50) {
      process.stdout.write(`  ... and ${missing.length - 50} more\n`);
    }
  }

  if (extra.length > 0) {
    process.stdout.write('extra vars:\n');
    extra.slice(0, 50).forEach((name) => process.stdout.write(`  - ${name}\n`));
    if (extra.length > 50) {
      process.stdout.write(`  ... and ${extra.length - 50} more\n`);
    }
  }

  return missing.length === 0 && extra.length === 0;
}

function main() {
  const primitiveExpected = new Set(
    [
      ...flattenTokens(readJson('primitive_color.json')).map((token) => toPrimitiveVarName(token.path, 'color')),
      ...flattenTokens(readJson('primitive_size.json')).map((token) => toPrimitiveVarName(token.path, 'size')),
      ...flattenTokens(readJson('primitive_typography.json')).map((token) => toPrimitiveVarName(token.path, 'typography')),
    ]
  );

  const semanticExpected = new Set(
    [flattenTokens(readJson('semantic_color.json')), flattenTokens(readJson('semantic_size.json'))]
      .flat()
      .map((token) => toSemanticVarName(token.path)),
  );
  const componentExpected = new Set(
    [
      ...flattenTokens(readJson('component_tab_color.json')).map((token) => toComponentVarName(['tab', ...token.path])),
      ...flattenTokens(readJson('component_tab_size.json')).map((token) => toComponentVarName(['tab', ...token.path])),
      ...flattenTokens(readJson('component_focus.json')).map((token) => toComponentVarName(['focus', ...token.path])),
    ],
  );

  const primitiveDeclared = parseDeclaredVars(path.join(stylesTokensDir, '_primitive.generated.scss'));
  const semanticDeclared = parseDeclaredVars(path.join(stylesTokensDir, '_semantic.generated.scss'));
  const componentDeclared = parseDeclaredVars(path.join(stylesTokensDir, '_component.generated.scss'));

  const primitiveOk = reportSection('Primitive tokens', primitiveExpected, primitiveDeclared);
  const semanticOk = reportSection('Semantic tokens', semanticExpected, semanticDeclared);
  const componentOk = reportSection('Component tokens', componentExpected, componentDeclared);

  if (!primitiveOk || !semanticOk || !componentOk) {
    process.exitCode = 1;
    process.stdout.write('\nToken sync report: FAILED\n');
    return;
  }

  process.stdout.write('\nToken sync report: OK\n');
}

main();
