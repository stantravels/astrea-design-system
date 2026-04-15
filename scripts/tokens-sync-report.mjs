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

function tokenVarName(token, fallbackName) {
  return cssVarFromCodeSyntax(token.codeSyntax) ?? fallbackName;
}

function parseDeclaredVars(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return new Set(content.match(/--[a-z0-9-]+(?=\s*:)/g) ?? []);
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
  const primitiveFiles = [
    { fileName: 'primitive_color.json', kind: 'color' },
    { fileName: 'primitive_size.json', kind: 'size' },
    { fileName: 'primitive_typography.json', kind: 'typography' },
  ];
  const semanticFiles = ['semantic_color.json', 'semantic_size.json'];
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

  const primitiveExpected = new Set(
    primitiveFiles.flatMap(({ fileName, kind }) =>
      flattenTokens(readJson(fileName)).map((token) => tokenVarName(token, primitiveVarName(token.path, kind))),
    ),
  );
  const semanticExpected = new Set(
    semanticFiles.flatMap((fileName) =>
      flattenTokens(readJson(fileName)).map((token) => tokenVarName(token, semanticVarName(token.path))),
    ),
  );
  const componentExpected = new Set(
    componentFiles.flatMap((fileName) =>
      flattenTokens(readJson(fileName)).map((token) => tokenVarName(token, componentVarName(token.path))),
    ),
  );
  linkModeFiles.forEach(({ fileName, modeName }) => {
    flattenTokens(readJson(fileName)).forEach((token) => {
      const defaultName = componentVarName(token.path);
      const baseName = tokenVarName(token, defaultName);
      componentExpected.add(linkModeVarName(baseName, modeName));
    });
  });

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
