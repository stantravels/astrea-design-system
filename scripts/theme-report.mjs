import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const semanticDarkColorPath = path.join(rootDir, 'src', 'tokens', 'figma', 'semantic_color_dark.json');
const stylesTokensDir = path.join(rootDir, 'src', 'styles', 'tokens');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function flattenTokens(tree) {
  const out = [];

  function walk(value) {
    if (!value || typeof value !== 'object') {
      return;
    }

    if ('$type' in value && '$value' in value) {
      const codeSyntax = value.$extensions?.['com.figma.codeSyntax']?.WEB;
      const varName = codeSyntax?.match(/var\((--[a-z0-9-]+)\)/i)?.[1];

      if (varName) {
        out.push(varName);
      }

      return;
    }

    Object.entries(value).forEach(([key, child]) => {
      if (!key.startsWith('$')) {
        walk(child);
      }
    });
  }

  walk(tree);
  return out;
}

function parseVars(fileName) {
  const content = fs.readFileSync(path.join(stylesTokensDir, fileName), 'utf8');
  return Object.fromEntries([...content.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]));
}

function resolveVar(name, vars, seen = new Set()) {
  let value = vars[name] ?? name;

  while (value?.startsWith('var(')) {
    const nextName = value.match(/var\((--[a-z0-9-]+)/)?.[1];

    if (!nextName || seen.has(nextName)) {
      return value;
    }

    seen.add(nextName);
    value = vars[nextName];
  }

  return value;
}

function hexToRgb(hex) {
  if (!hex?.startsWith('#')) {
    return null;
  }

  const normalizedHex = hex.slice(1);

  if (normalizedHex.length !== 6) {
    return null;
  }

  return [
    Number.parseInt(normalizedHex.slice(0, 2), 16),
    Number.parseInt(normalizedHex.slice(2, 4), 16),
    Number.parseInt(normalizedHex.slice(4, 6), 16),
  ];
}

function channelToLinear(channel) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb) {
  const [red, green, blue] = rgb.map(channelToLinear);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground, background) {
  const foregroundRgb = hexToRgb(foreground);
  const backgroundRgb = hexToRgb(background);

  if (!foregroundRgb || !backgroundRgb) {
    return null;
  }

  const foregroundLuminance = luminance(foregroundRgb);
  const backgroundLuminance = luminance(backgroundRgb);

  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
}

const contrastChecks = [
  ['body text on canvas', '--sem-text-primary', '--sem-surface-grey-xweak'],
  ['body secondary on canvas', '--sem-text-secondary', '--sem-surface-grey-xweak'],
  ['surface card text', '--sem-text-primary', '--sem-surface-base'],
  ['tab regular text', '--com-tab-text-color', '--com-tab-fill-color'],
  ['tab hover text', '--com-tab-text-color-hover', '--com-tab-fill-color-hover'],
  ['tab active text', '--com-tab-text-color-active', '--com-tab-fill-color-active'],
  ['counter inactive text', '--com-counter-text-color', '--com-counter-fill-color'],
  ['counter active text', '--com-counter-text-color-active', '--com-counter-fill-color-active'],
  ['link regular default', '--com-link-regular-text-color', '--sem-surface-grey-xweak'],
  ['link regular selected', '--com-link-regular-text-color-selected', '--com-link-regular-fill-color-selected'],
  ['link inverse default', '--com-link-inverse-text-color', '--sem-surface-brand-xxxstrong'],
  ['link inverse hover', '--com-link-inverse-text-color-hover', '--com-link-inverse-fill-color-hover'],
  ['link inverse pressed', '--com-link-inverse-text-color-pressed', '--com-link-inverse-fill-color-pressed'],
  ['link inverse selected', '--com-link-inverse-text-color-selected', '--com-link-inverse-fill-color-selected'],
  ['link inverse visited', '--com-link-inverse-text-color-visited', '--sem-surface-brand-xxxstrong'],
  ['link inverse disabled', '--com-link-inverse-text-color-disabled', '--sem-surface-brand-xxxstrong'],
];

const primitiveVars = parseVars('_primitive.generated.scss');
const semanticVars = parseVars('_semantic.generated.scss');
const semanticDarkVars = parseVars('_semantic.dark.generated.scss');
const componentVars = parseVars('_component.generated.scss');
const expectedDarkVars = new Set(flattenTokens(readJson(semanticDarkColorPath)));
const declaredDarkVars = new Set(Object.keys(semanticDarkVars).filter((name) => expectedDarkVars.has(name)));
const missingDarkVars = [...expectedDarkVars].filter((name) => !declaredDarkVars.has(name)).sort();

process.stdout.write('Theme token report\n');
process.stdout.write(`- dark semantic color vars expected: ${expectedDarkVars.size}\n`);
process.stdout.write(`- dark semantic color vars declared: ${declaredDarkVars.size}\n`);
process.stdout.write(`- missing dark semantic color vars: ${missingDarkVars.length}\n`);

if (missingDarkVars.length > 0) {
  missingDarkVars.forEach((name) => process.stdout.write(`  - ${name}\n`));
}

function reportContrast(modeName, modeVars) {
  const vars = {
    ...primitiveVars,
    ...semanticVars,
    ...modeVars,
    ...componentVars,
  };
  const failures = [];

  process.stdout.write(`\n${modeName} contrast checks\n`);

  contrastChecks.forEach(([label, foregroundVar, backgroundVar]) => {
    const foreground = resolveVar(foregroundVar, vars);
    const background = resolveVar(backgroundVar, vars);
    const ratio = contrastRatio(foreground, background);
    const passed = ratio !== null && ratio >= 4.5;

    process.stdout.write(`- ${label}: ${ratio?.toFixed(2) ?? 'n/a'}\n`);

    if (!passed) {
      failures.push(`${modeName} ${label}: ${foregroundVar}=${foreground} on ${backgroundVar}=${background}`);
    }
  });

  return failures;
}

const contrastFailures = [
  ...reportContrast('Light', {}),
  ...reportContrast('Dark', semanticDarkVars),
];

if (missingDarkVars.length > 0 || contrastFailures.length > 0) {
  process.exitCode = 1;
  process.stdout.write('\nTheme token report: FAILED\n');

  contrastFailures.forEach((failure) => process.stdout.write(`- ${failure}\n`));
} else {
  process.stdout.write('\nTheme token report: OK\n');
}
