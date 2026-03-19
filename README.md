# Astrea Design System

React + TypeScript + Vite + Storybook starter for the Astrea design system.

## Scripts

- `npm run dev` starts the local playground
- `npm run storybook` starts Storybook
- `npm run build` builds the package playground
- `npm run build-storybook` builds the Storybook site
- `npm run figma:parse` validates local Code Connect files
- `npm run figma:publish` publishes Code Connect mappings to Figma
- `npm run figma:unpublish` removes published Code Connect mappings from Figma

## Structure

- `src/tokens` primitive, semantic, and component token references
- `src/foundations` shared layout, typography, and breakpoint definitions
- `src/components` reusable UI components and colocated stories
- `src/styles` global styles and CSS custom properties
- `figma.config.json` Code Connect config for future Figma mappings

## Figma Code Connect

1. Create a Figma personal access token with `File content: Read` and `Code Connect: Write`.
2. Add it to a local `.env` file as `FIGMA_ACCESS_TOKEN=...`.
3. Replace placeholder component node URLs with real Figma component URLs.
4. Run `npm run figma:parse` locally, then `npm run figma:publish`.

## Token Sync From Figma JSON

Проект использует 3 уровня токенов:
- `primitive` -> базовые значения
- `semantic` -> алиасы на primitive
- `component` -> алиасы на semantic (сейчас подключен слой Tab)

Короткий рабочий цикл после новой выгрузки из Figma:

1. Обновите JSON-файлы в `src/tokens/figma`:
   - `primitives-colors.json`
   - `primitives-sizing.json`
   - `typography-desktop.json`
   - `semantic-colors.json`
   - `semantic-sizing.json`
   - `tab-component-colors.json`
   - `tab-component-sizing.json`
2. Сгенерируйте SCSS-токены:
   - `npm run tokens:generate`
3. Проверьте синхронизацию:
   - `npm run tokens:sync-report`
4. Запустите визуальную проверку в Storybook:
   - `npm run storybook`

Что генерируется автоматически:
- `src/styles/tokens/_primitive.generated.scss`
- `src/styles/tokens/_semantic.generated.scss`
- `src/styles/tokens/_tab.generated.scss`

Важно:
- generated-файлы не редактируются вручную;
- ручные developer-friendly алиасы и составные переменные хранятся в `src/styles/tokens/_aliases.scss`;
- точка сборки всех токенов: `src/styles/tokens.scss`.
